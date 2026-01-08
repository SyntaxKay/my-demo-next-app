import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import ProductSchema from "./schema";

export async function GET(request: NextRequest) {
  const productList = await prisma.product.findMany();
  return NextResponse.json(productList);
}

export async function POST(request: NextRequest) {
    const body = await request.json()
    const validatedBody = ProductSchema.safeParse(body);

    if(!validatedBody.success){
        return NextResponse.json({
            error: "Invalid request data",
            status: 400
        })
    }

    const newProduct = await prisma.product.create({
        data: {
            name: body.name,
            price: body.price
        }
    })

    return NextResponse.json(newProduct, { status: 201 });    
}
