import { prisma } from "@/libs/prisma";

const { NextResponse } = require("next/server");

export  async function GET(req,{params}) {
    const id = Number(await params.id)
    const color = await prisma.style.findUnique({
        where: {
           id
        }
    });
    return NextResponse.json(color)
}

export async function PUT(req, {params}) {
    const id = Number(await params.id)
    const data = await req.json();

    const update = await prisma.style.update({
        where: {
            id
        },
        data: data
    })
    return NextResponse.json(update)
}