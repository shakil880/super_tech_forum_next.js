import bcrypt from "bcrypt";

import { prisma } from "@/lib/prisma";
import { registerSchema } from "@/lib/validators";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = registerSchema.safeParse(body);

    if (!validated.success) {
      return Response.json(
        {
          error: "Invalid registration details.",
          fieldErrors: validated.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { name, email, password } = validated.data;
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return Response.json({ error: "Email is already registered." }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });

    return Response.json({ user }, { status: 201 });
  } catch {
    return Response.json({ error: "Registration failed." }, { status: 500 });
  }
}