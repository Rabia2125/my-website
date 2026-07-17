 'use server'
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function resolveQuery(id) {
  console.log("Action called for ID:", id); // Check terminal mein yeh print hota hai ya nahi

  await prisma.contact.update({
    where: { id: id },
    data: { status: 'Resolved' },
  });

  console.log("Database updated!");
  revalidatePath('/dashboard/queries');
  revalidatePath('/dashboard'); // Dashboard ko bhi refresh karein
}