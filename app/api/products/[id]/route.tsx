import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import ProductSchema from "../schema";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: {
      id: id,
    },
  });

  return NextResponse.json(product, { status: 200 });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const body = await request.json();
  const validatedBody = ProductSchema.safeParse(body);
  const { id } = await params;

  if (!validatedBody.success) {
    return NextResponse.json({
      message: "Invalid Data request",
      status: 401,
    });
  }

  const product = await prisma.product.findUnique({
    where: {
      id: id,
    },
  });

  if (!product) {
    return NextResponse.json(
      { message: "Product Doesnt Exist" },
      { status: 400 }
    );
  }

  const updateProduct = await prisma.product.update({
    where: {
      id: id,
    },
    data: {
      name: body.name,
      price: body.price,
    },
  });

  return NextResponse.json(updateProduct, { status: 201 });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: {
      id: id,
    },
  });

  if (!product) {
    return NextResponse.json(
      { message: "Product Doesnt Exist" },
      { status: 400 }
    );
  }

  await prisma.product.delete({
    where: {
      id: id,
    },
  });

  return NextResponse.json(
    { message: "Product Deleted Successfully" },
    { status: 200 }
  );
}
