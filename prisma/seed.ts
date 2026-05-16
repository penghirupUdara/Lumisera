import { prisma } from "../src/lib/db";
import bcrypt from "bcryptjs";

async function main() {
  console.log("Seeding database...");

  const hashedPassword = await bcrypt.hash("password123", 10);

  const user = await prisma.user.upsert({
    where: { email: "johndoe@example.com" },
    update: {},
    create: {
      email: "johndoe@example.com",
      username: "johndoe",
      name: "John Doe Photography",
      password: hashedPassword,
      whatsapp: "6281281126207",
      heroTitle: "Capturing Your Best Moments",
      heroSubtitle: "Professional photography for weddings, graduations, and events.",
      heroImage: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069&auto=format&fit=crop",
      aboutText: "Hi, I'm John! With over 5 years of experience, I specialize in capturing the raw emotions and beautiful moments of your special day. Let's create memories that last forever.",
      packages: {
        create: [
          {
            name: "Graduation Basic",
            description: "1 Hour photoshoot for your graduation day.",
            price: 500000,
            features: ["1 Hour Session", "50 Edited Photos", "All Raw Files"]
          },
          {
            name: "Wedding Premium",
            description: "Full day coverage for your special day.",
            price: 5000000,
            features: ["8 Hours Coverage", "2 Photographers", "1 Videographer", "Printed Album", "Cinematic Video"]
          }
        ]
      },
      portfolios: {
        create: [
          { title: "Wedding 1", imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop" },
          { title: "Wedding 2", imageUrl: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069&auto=format&fit=crop" },
          { title: "Graduation", imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop" }
        ]
      }
    }
  });

  console.log(`Created user: ${user.username} with email: ${user.email} and password: password123`);

  // Create some dummy bookings
  const package1 = await prisma.package.findFirst({ where: { userId: user.id } });

  if (package1) {
    await prisma.booking.create({
      data: {
        userId: user.id,
        clientName: "Jane Smith",
        clientEmail: "jane@example.com",
        clientPhone: "081234567891",
        date: new Date(Date.now() + 86400000 * 5), // 5 days from now
        eventType: "WEDDING",
        packageId: package1.id,
        status: "PENDING",
        notes: "Looking forward to it!"
      }
    });
    console.log("Created dummy booking.");
  }

  console.log("Seeding complete!");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
