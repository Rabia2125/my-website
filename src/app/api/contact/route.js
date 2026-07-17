import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const body = await req.json();
    const contact = await prisma.contact.create({
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone,
        subject: body.subject,
        message: body.message,
      },
    });
    return Response.json({ success: true, contact });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}