import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
    const { email, password } = await req.json();
    console.log(email,password);
    const [result] = await db.query("SELECT * FROM users WHERE email = ? AND password = ?", [email, password]);
    console.log(result);
    if (result.length > 0) {
        return NextResponse.json({ message: "Login successful" }, { status: 200 });
    } else {
        return NextResponse.json({ message: "Invalid Email or Password" }, { status: 401 });
    }
}
