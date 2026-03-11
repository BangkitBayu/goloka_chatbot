import {
  PrismaClient,
  Role,
  SessionStatus,
  CampaignStatus,
} from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  // 1. Clean up existing data (Optional - Hati-hati jangan di prod)
  await prisma.chatbotRule.deleteMany();
  await prisma.broadcastCampaign.deleteMany();
  await prisma.contact.deleteMany();
  await prisma.whatsAppSession.deleteMany();
  await prisma.user.deleteMany();

  const saltRounds = 10;
  const hashedAdminPassword = await bcrypt.hash("admin123", saltRounds);
  const hashedUserPassword = await bcrypt.hash("user123", saltRounds);

  // 2. Seed Users
  const admin = await prisma.user.create({
    data: {
      email: "admin@goloka.id",
      password: hashedAdminPassword,
      name: "Salim Admin",
      role: Role.ADMIN,
      quota: 999999,
    },
  });

  const regularUser = await prisma.user.create({
    data: {
      email: "customer@gmail.com",
      password: hashedUserPassword,
      name: "Budi Santoso",
      role: Role.USER,
      quota: 500,
    },
  });

  // 3. Seed WhatsApp Sessions (Simulasi nomor yang sudah konek)
  const session1 = await prisma.whatsAppSession.create({
    data: {
      userId: regularUser.id,
      phoneNumber: "6281234567890",
      status: SessionStatus.CONNECTED,
      sessionData: { connectedAt: new Date().toISOString() }, // Dummy data baileys
    },
  });

  // 4. Seed Contacts (Data dummy buat target blast)
  await prisma.contact.createMany({
    data: [
      {
        userId: regularUser.id,
        name: "Andi Reseller",
        phoneNumber: "628111111111",
        groupTag: "reseller",
      },
      {
        userId: regularUser.id,
        name: "Siti Member",
        phoneNumber: "628222222222",
        groupTag: "vip",
      },
      {
        userId: regularUser.id,
        name: "Budi Toko",
        phoneNumber: "628333333333",
        groupTag: "regular",
      },
    ],
  });

  // 5. Seed Broadcast Campaigns (Simulasi riwayat blast)
  await prisma.broadcastCampaign.create({
    data: {
      userId: regularUser.id,
      sessionId: session1.id,
      name: "Promo Ramadhan 2026",
      messageContent:
        "Halo {name}, dapatkan diskon 50% untuk layanan Goloka di bulan suci ini!",
      status: CampaignStatus.DONE,
      sentCount: 150,
      failedCount: 2,
    },
  });

  await prisma.broadcastCampaign.create({
    data: {
      userId: regularUser.id,
      sessionId: session1.id,
      name: "Follow Up Reseller",
      messageContent: "Info stok terbaru sudah ready ya bosku!",
      status: CampaignStatus.QUEUED,
      sentCount: 0,
    },
  });

  // 6. Seed Chatbot Rules
  await prisma.chatbotRule.createMany({
    data: [
      {
        userId: regularUser.id,
        sessionId: session1.id,
        triggerKeyword: "p",
        responseMessage:
          "Halo! Mohon maaf, gunakan kata kunci yang sopan ya. Ada yang bisa kami bantu?",
      },
      {
        userId: regularUser.id,
        sessionId: session1.id,
        triggerKeyword: "harga",
        responseMessage:
          "Berikut list harga layanan kami:\n1. Basic: 50rb\n2. Pro: 150rb\nKetik *ORDER* untuk memesan.",
      },
    ],
  });

  console.log("✅ Seeding GOLOKA Database Success!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
