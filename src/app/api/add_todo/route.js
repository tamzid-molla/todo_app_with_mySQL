import db from "@/lib/db"
import { getServerSession } from "next-auth";
import { NextResponse } from 'next/server'
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req) {
    try {
        const { email, todo } = await req.json();
        await db.query(`
            CREATE TABLE IF NOT EXISTS todos
            (
            id INT AUTO_INCREMENT PRIMARY KEY,
            email VARCHAR(255),
            todo VARCHAR(255),
            status VARCHAR(20) DEFAULT 'active',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
            `)
         await db.query("INSERT INTO todos (email, todo) VALUES (?, ?)", [email, todo]);

        return NextResponse.json({ message: "Todo added successfully" }, { status: 201 });
    } catch (error) {
       return NextResponse.json({ message: "Something went wrong" }, { status: 500 })
    }
}

export async function GET(req) {
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;
    
    try {
        console.log(email);
        const [res] = await db.query(`SELECT * FROM todos WHERE email = ?`, [email]);
        return NextResponse.json({ todos: res }, { status: 201 });
    } catch (error) {
       return NextResponse.json({ message: "Something went wrong" }, { status: 500 })
    }
}

export async function PUT(req) {
    const { id, todo } = await req.json();
    try {
        await db.query("UPDATE todos SET todo = ? WHERE id = ?", [todo, id]);
        return NextResponse.json({ message: "Todo updated successfully" }, { status: 201 });
    } catch (error) {
       return NextResponse.json({ message: "Something went wrong" }, { status: 500 })
    }
}
