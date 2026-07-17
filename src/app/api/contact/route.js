import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { PrismaClient } from '@prisma/client'; // 1. Prisma import karein

const resend = new Resend(process.env.RESEND_API_KEY);
const prisma = new PrismaClient(); // 2. Prisma initialize karein

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, phone, subject, message } = body;

    // 3. Database mein data save karein
    const newContact = await prisma.contact.create({
      data: {
        name,
        email,
        phone,
        subject,
        message,
      },
    });

    // 4. Email bhejein (jo aap pehle kar rahi thi)
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'rabiakhalid476@gmail.com',
      subject: `New Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    });

    return NextResponse.json({ success: true, newContact });
  } catch (error) {
    console.error("Database Error:", error); // Error check karne ke liye
    return NextResponse.json({ error: 'Failed to save data' }, { status: 500 });
  }
}