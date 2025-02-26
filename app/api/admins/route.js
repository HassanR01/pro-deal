import connectMongoDB from "@/libs/mongoose"
import Admin from "@/models/admins"
import { NextResponse } from "next/server"

export async function POST(req){
    const { name, email, password } = await req.json()
    await connectMongoDB()
    await Admin.create({ name, email, password })
    return NextResponse.json({ message: "Admin Created" }, { status: 201 })
}

export async function GET(){
    await connectMongoDB()
    const admins = await Admin.find()
    return NextResponse.json({admins})
}
