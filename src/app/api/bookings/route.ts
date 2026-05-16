import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const photographerId = formData.get("photographerId") as string;
    const clientName = formData.get("clientName") as string;
    const clientEmail = formData.get("clientEmail") as string;
    const clientPhone = formData.get("clientPhone") as string;
    const date = new Date(formData.get("date") as string);
    const eventType = formData.get("eventType") as any;
    const packageId = formData.get("packageId") as string;
    const notes = formData.get("notes") as string;

    const booking = await prisma.booking.create({
      data: {
        userId: photographerId,
        clientName,
        clientEmail,
        clientPhone,
        date,
        eventType,
        packageId,
        notes
      }
    });

    const photographer = await prisma.user.findUnique({
      where: { id: photographerId },
      select: { username: true, whatsapp: true }
    });

    // Auto generate WhatsApp link
    let redirectUrl = `/${photographer?.username}/booking/success`;
    if (photographer?.whatsapp) {
      const waText = encodeURIComponent(`Halo, saya ${clientName} telah melakukan booking untuk tanggal ${date.toLocaleDateString()}. Mohon konfirmasi.`);
      redirectUrl = `https://wa.me/${photographer.whatsapp}?text=${waText}`;
    }

    return NextResponse.redirect(new URL(redirectUrl, req.url), 303);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create booking" }, { status: 500 });
  }
}
