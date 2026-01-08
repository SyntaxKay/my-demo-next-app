import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import { userDataSchema } from "./schema";
import { prisma } from "@/prisma/client";

export async function POST(request: NextRequest) {
  try {
    const { username, email, password } = await request.json();
    const validatedData = userDataSchema.safeParse({
      username,
      email,
      password,
    });

    if (!validatedData.success)
      return NextResponse.json(
        { error: "Invalid Data entered" },
        { status: 400 }
      );

    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: email }, { username: username }],
      },
    });

    if (user)
      return NextResponse.json(
        { field: "username", error: "User Already Exist" },
        { status: 409 }
      );

    const hashPassword = await bcrypt.hash(password, 10);

    const userData = await prisma.user.create({
      data: {
        username: username,
        email: email,
        hashPassword: hashPassword,
      },
    });

    return NextResponse.json({ email: userData.email }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
