import { NextResponse } from 'next/server'
import db from "@/lib/db"


export async function DELETE(request) {
    const { id } = await request.json()
    try {
        await db.query("DELETE FROM todos WHERE id = ?", [id])
        return NextResponse.json({ message: "Todo deleted successfully" })
    } catch (error) {
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 })
    }
}       
