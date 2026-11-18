import { processAdminChatbotQuery } from "../src/lib/ai/admin-chatbot-engine";
import { prisma } from "../src/lib/prisma";

async function test() {
  const adminUser = await prisma.user.findFirst({
    where: { role: "ADMIN" },
  });

  console.log("Testing with admin:", adminUser?.name);

  const mockSession = adminUser
    ? {
        id: adminUser.id,
        name: adminUser.name,
        email: adminUser.email,
        role: adminUser.role as "ADMIN",
        phone: adminUser.phone,
      }
    : null;

  const testQueries = [
    "saya siapa?",
    "apa saja fitur di dashboard admin?",
    "berapa omzet dan pesanan hari ini?",
    "produk apa yang paling laris?",
    "produk apa yang sedang habis?",
    "siapa saja kasir yang terdaftar?",
    "ORD-20261001-001",
    "status notifikasi whatsapp",
  ];

  for (const q of testQueries) {
    console.log("\n========================================");
    console.log("QUESTION:", q);
    console.log("========================================");
    const answer = await processAdminChatbotQuery({
      message: q,
      user: mockSession,
    });
    console.log(answer);
  }

  await prisma.$disconnect();
}

test().catch(console.error);

