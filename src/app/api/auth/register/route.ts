import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { name, email, username, password } = await req.json();

    if (!name || !email || !username || !password) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { username }
        ]
      }
    });

    if (existingUser) {
      return NextResponse.json({ error: "Email or username already taken" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        username,
        password: hashedPassword,
        // Create default packages
        packages: {
          create: [
            {
              name: "Basic Session",
              description: "Perfect for quick portrait sessions.",
              price: 500000,
              features: ["1 Hour Session", "50 Edited Photos", "Online Gallery"]
            },
            {
              name: "Premium Package",
              description: "Ideal for weddings and full day events.",
              price: 2500000,
              features: ["8 Hours Coverage", "Unlimited Photos", "Printed Album", "1 Videographer"]
            }
          ]
        }
      }
    });

    return NextResponse.json({ success: true, user: { id: user.id, username: user.username } });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
