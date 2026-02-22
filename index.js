import makeWASocket, {
  useMultiFileAuthState,
  DisconnectReason,
  delay,
} from "@whiskeysockets/baileys";

import pino from "pino";
import { readCsv } from "./utils/readCsv.js";
import contactFormat from "./utils/contactFormat.js";
// import qrcode from "qrcode-terminal";

// Baca file template csv
const templates = await readCsv("./documents/chat_templates.csv", "utf-8");

const contacts = await readCsv("./documents/contact.csv", "utf-8");

// Untuk menampung chat yang sudah direply agar tidak execute pesan yang sama berkali kali
let repliesHistory = new Set();

setInterval(
  () => {
    repliesHistory.clear();
  },
  15 * 60 * 1000, // Kosongkan variabel setiap 15 menit
);

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState("auth_info_baileys");
  const sock = makeWASocket({
    auth: state,
    // printQRInTerminal: true,
    logger: pino({ level: "info" }),
    browser: ["Windows", "Chrome", "144.0.7559.135"],
  });

  sock.ev.on("creds.update", saveCreds);

  sock.ev.on("connection.update", async (update) => {
    const { connection, lastDisconnect } = update;

    // if (qr) {
    //   console.log("Scan QR Code berikut:");
    //   qrcode.generate(qr, { small: true });
    // }

    if (connection === "connecting") {
      if (!sock.authState.creds.registered) {
        console.log("pairing code");
        try {
          setTimeout(async () => {
            let code = await sock.requestPairingCode("6288994140379");
            console.log("Pairing code:", code);
          }, 3000);
          console.log("Requesting pairing code ...");
        } catch (error) {
          console.log("Failed to request pairing code:", error);
        }
      }
    }

    if (connection === "close") {
      const shouldReconnect =
        lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut;
      console.log(`Connection failed`);
      if (shouldReconnect) {
        startBot();
      }
    } else if (connection === "open") {
      console.log("Connection opened");

      try {
        // console.log(templates);

        // Ambil template send promosi
        const send_promotion = templates.filter(
          (row) => row.name == "send_promotion",
        );

        for (const tem of send_promotion) {
          for (const row of contacts) {
            try {
              const recipient = `${contactFormat(row.phone)}@s.whatsapp.net`;
              await sock.sendMessage(recipient, {
                text: tem.text.replace(/\[Nama Toko\]/g, `*${row.name}*`),
              });
              console.log("terkirim");
              delay(5000);
            } catch (error) {
              console.log("Error:", error);
            }
            // console.log("Tersimpan");
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
    sock.ev.on("messages.upsert", async ({ messages, type }) => {
      if (type === "notify") {
        for (let message of messages) {
          const msgId = message.key.id;

          if (repliesHistory.has(msgId)) return;

          repliesHistory.add(msgId);

          console.log(repliesHistory);

          if (!message.key.fromMe && message.message) {
            const sender = message.key.remoteJid;

            const reply =
              message.message.conversation ||
              message.message.extendedTextMessage?.text;

            console.log(
              `Received message from ${sender}: ${reply}, id: ${message.key.id}`,
            );

            // if (!sender.endsWith("@g.us")) {
            // Handle recipient mengirim mau
            if (reply?.toLowerCase() === "mau" || reply?.includes("mau")) {
              const imagePath = "./media/img/brosur.jpg";
              await sock.sendMessage(sender, {
                image: {
                  url: imagePath,
                },
                caption:
                  "Berikut ini adalah brosur dari program Goloka, untuk pendaftaran program dan info lebih lanjut, silahkan hubungi tim kami: *Rangga Pratama Putra:6285189081947*. Terimakasih atas waktu dan perhatian anda😊🙏",
              });
              // console.log("replyy");
            } else {
              const text =
                "Silahkan balas *MAU* untuk info lebih lanjut dari program Goloka dan anda akan segera terhubung dengan tim kami. Terimkasih atas waktu dan perhatian anda😊🙏.";
              await sock.sendMessage(sender, {
                text: text,
              });
              // console.log("replyy");
            }
            // }
          }
        }
      }
    });
  });
}

startBot();
