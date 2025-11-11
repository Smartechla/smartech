const { NextResponse } = require("next/server");
import { prisma } from "@/libs/prisma";

export async function GET() {
    const color = await prisma.style.findMany();
    return NextResponse.json(color)
}

export async function POST(req) {
    const {color} = await req.json()
    const newColor = await prisma.style.create({
        data:{
            color
        }
    })
    return NextResponse.json(newColor);
}
