const { NextResponse } = require("next/server");

export function GET() {
    return NextResponse.json("solicitando ticket")
}

export function POST() {
    return NextResponse.json("creando ticket")
}