const { NextResponse } = require("next/server");

export function GET() {
    return NextResponse.json("Obtiendo datos de la pagina")
}