import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import UserSchema from "../schema";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const user = await prisma.user.findUnique({
    where: { id: id },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json(user);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const body = await request.json();
  const { id } = await params;

  const validatedBody = UserSchema.safeParse(body);
  if (!validatedBody.success) {
    return NextResponse.json({
      error: "Invalid request data",
      status: 400,
    });
  }

  const user = await prisma.user.findUnique({
    where: { id: id },
  });

  if (!user) {
    return NextResponse.json({ error: "User Not found" }, { status: 404 });
  }

  const updatedUser = await prisma.user.update({
    where: { id: id },
    data: { name: body.name, email: body.email },
  });

  return NextResponse.json(updatedUser, { status: 201 });
}

export async function DELETE( request:NextRequest, { params }: { params: Promise<{id : string}> }) {
  const  { id } = await params;
  
  const user = await prisma.user.findUnique({
    where: { id: id },
  });
  
  if (!user) {
    return NextResponse.json({ error: "User Not found" }, { status: 404 });
  }

   await prisma.user.delete({
    where: { id: id },
  });

  return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });
}