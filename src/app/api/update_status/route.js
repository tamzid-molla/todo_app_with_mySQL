import { NextResponse } from 'next/server'
import db from "@/lib/db"

export async function PUT(request) {
    const { id, status } = await request.json()
    try {
        await db.query("UPDATE todos SET status = ? WHERE id = ?", [status, id])
        return NextResponse.json({ message: "Status updated successfully" })
    } catch (error) {
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 })
    }
}
