import dotenv from "dotenv/config";
import makeWASocket, {
  useMultiFileAuthState,
  DisconnectReason,
  delay,
  fetchLatestBaileysVersion,
} from "@whiskeysockets/baileys";
import pino from "pino";
import { readCsv } from "./utils/csvReader.js";
import contactFormater from "./utils/contactFormater.js";

// KONFIGURASI
const waNumber = "6282112235774"; // Ganti dengan nomor lo
let isSendPairingCode = false;
let repliesHistory = new Set();

// KOSONGKAN HISTORY REPLY SETIAP 15 MENIT
setInterval(
  () => {
    repliesHistory.clear();
    console.log("🧹 History reply dibersihkan...");
  },
  15 * 60 * 1000,
);

async function startBot() {
  console.log("🚀 Memulai Goloka Engine...");

  const { state, saveCreds } = await useMultiFileAuthState("auth_info_baileys");
  const { version } = await fetchLatestBaileysVersion();

  const sock = makeWASocket({
    version,
    auth: state,
    logger: pino({ level: "silent" }),
    // WAJIB DI WINDOWS: Agar tidak dianggap bot/koneksi ilegal
    browser: ["Windows", "Chrome", "110.0.5481.178"],
    connectTimeoutMs: 60000,
    defaultQueryTimeoutMs: 0,
    keepAliveIntervalMs: 10000,
    generateHighQualityLinkPreview: true,
  });

  // SIMPAN CREDENTIALS
  sock.ev.on("creds.update", saveCreds);

  // HANDLE KONEKSI
  sock.ev.on("connection.update", async (update) => {
    const { connection, lastDisconnect, qr } = update;

    if (connection === "connecting") {
      console.log("⏳ Menghubungkan ke WhatsApp...");
    }

    // LOGIC PAIRING CODE UNTUK WINDOWS
    if (qr && !sock.authState.creds.registered && !isSendPairingCode) {
      isSendPairingCode = true;
      console.log("✨ Socket siap, menunggu pemicu pairing...");

      setTimeout(async () => {
        try {
          console.log(`👉 Meminta pairing code untuk: ${waNumber}`);
          const code = await sock.requestPairingCode(
            waNumber.replace(/\D/g, ""),
          );
          console.log(`\n========================================`);
          console.log(`🔥 PAIRING CODE GOLOKA: ${code}`);
          console.log(`========================================\n`);
        } catch (error) {
          console.error("❌ Gagal mendapatkan pairing code:", error);
          isSendPairingCode = false;
        }
      }, 6000); // Delay 6 detik agar handshake stabil
    }

    if (connection === "open") {
      console.log("✅ GOLOKA ENGINE: KONEKSI BERHASIL!");
      isSendPairingCode = false;

      // JALANKAN LOGIC BLAST SETELAH KONEK
      await runBlast(sock);
    }

    if (connection === "close") {
      isSendPairingCode = false;
      const statusCode = lastDisconnect?.error?.output?.statusCode;
      const shouldReconnect = statusCode !== DisconnectReason.loggedOut;

      console.log(`❌ Koneksi Terputus (Status: ${statusCode})`);

      if (shouldReconnect) {
        console.log("🔄 Mencoba menyambung ulang dalam 5 detik...");
        setTimeout(() => startBot(), 5000);
      } else {
        console.log(
          "🚪 Sesi keluar. Hapus folder auth_info_baileys untuk login ulang.",
        );
      }
    }
  });

  // HANDLE PESAN MASUK (CHATBOT)
  sock.ev.on("messages.upsert", async ({ messages, type }) => {
    if (type !== "notify") return;

    for (const msg of messages) {
      if (!msg.message || msg.key.fromMe) continue;

      const msgId = msg.key.id;
      if (repliesHistory.has(msgId)) continue;
      repliesHistory.add(msgId);

      const sender = msg.key.remoteJid;
      const text =
        msg.message.conversation || msg.message.extendedTextMessage?.text || "";
      const lowerText = text.toLowerCase();

      console.log(`📩 Pesan masuk dari ${sender}: ${text}`);

      if (lowerText.includes("mau")) {
        await sock.sendMessage(sender, {
          image: { url: "./media/img/brosur.jpg" },
          caption:
            "Berikut ini adalah brosur dari program *Goloka*. Untuk pendaftaran dan info lebih lanjut, hubungi tim kami: *Rangga Pratama Putra: 6285189081947*. Terima kasih! 😊🙏",
        });
      } else {
        await sock.sendMessage(sender, {
          text: "Silakan balas *MAU* untuk info lebih lanjut dari program *Goloka*. Tim kami akan segera membantu Anda. 😊🙏",
        });
      }
    }
  });
}

// FUNGSI UNTUK BLAST MESSAGE
async function runBlast(sock) {
  try {
    console.log("📦 Menyiapkan data blast...");
    const templates = await readCsv("./documents/chat_templates.csv");
    const contacts = await readCsv("./documents/contact.csv");

    const promoTemplate = templates.find((t) => t.name === "send_promotion");
    if (!promoTemplate)
      return console.log("⚠️ Template 'send_promotion' tidak ditemukan.");

    console.log(`🚀 Mulai mengirim blast ke ${contacts.length} kontak...`);

    for (const contact of contacts) {
      try {
        const recipient = `${contactFormater(contact.phone)}@s.whatsapp.net`;
        const message = promoTemplate.text.replace(
          /\[Nama Toko\]/g,
          `*${contact.name}*`,
        );

        await sock.sendMessage(recipient, { text: message });
        console.log(`✅ Terkirim ke: ${contact.name} (${contact.phone})`);

        // Jeda random 5-15 detik agar aman dari banned
        const delayMs = Math.floor(Math.random() * 10000) + 5000;
        await delay(delayMs);
      } catch (err) {
        console.log(`❌ Gagal mengirim ke ${contact.name}:`, err.message);
      }
    }
    console.log("🏁 Semua pesan blast telah diproses.");
  } catch (error) {
    console.error("❌ Error pada logic blast:", error);
  }
}

// JALANKAN BOT
startBot();
