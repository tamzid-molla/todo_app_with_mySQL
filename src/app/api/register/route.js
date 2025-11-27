import db from "@/lib/db"
import { NextResponse } from "next/server";

export async function POST(req){
    try {
        const { email, password } = await req.json();
       await db.query(`
            CREATE TABLE IF NOT EXISTS users(
            id INT AUTO_INCREMENT PRIMARY KEY,
            email varchar(255) UNIQUE NOT NULL,
            password varchar(255) NOT NULL
            )
            `)
         const [result] = await db.query(
      "INSERT INTO users (email, password) VALUES (?, ?)", [email, password]
        );
        console.log(result);
        return NextResponse.json({ message: "User registered" }, { status: 201 });
    } catch (error) {
        console.log(error);
         return NextResponse.json({ message: "User Not registered" }, { status: 500 });
    }
}