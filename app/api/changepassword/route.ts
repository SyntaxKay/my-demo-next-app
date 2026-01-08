import bcrypt from "bcrypt";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/prisma/client";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  const { currentPassword, newPassword } = await request.json();
  if (!session || !session.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  if (!currentPassword || !newPassword) {
    return NextResponse.json({ message: "Missing fields" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!user || !user.hashPassword)
    return NextResponse.json({ error: "User Doesnt Exist" }, { status: 404 });

  const isValidPwd = await bcrypt.compare(currentPassword, user.hashPassword);

  if (!isValidPwd)
    return NextResponse.json(
      { error: "Current Password doesnt match" },
      { status: 400 }
    );

  const isCurrentPwd = await bcrypt.compare(newPassword, user.hashPassword);

  if (isCurrentPwd)
    return NextResponse.json(
      { error: "New Password and Current Password cannot be same" },
      { status: 400 }
    );

  const hashNewPassword = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: {
      email: session.user.email,
    },
    data: {
      hashPassword: hashNewPassword,
    },
  });

  return NextResponse.json(
    { message: "Password has been Changed" },
    { status: 201 }
  );
}
