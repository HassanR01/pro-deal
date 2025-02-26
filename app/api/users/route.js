import { NextResponse } from "next/server";
import User from "../../../models/users";
import connectMongoDB from "../../../libs/mongoose";

export async function POST(req) {
    const { role, name, email, image } = await req.json()
    await connectMongoDB()
    await User.create({ role, name, email, image })
    return NextResponse.json({ message: 'User Created' }, { status: 201 })
}

export async function GET() {
    await connectMongoDB()
    const users = await User.find()
    return NextResponse.json({ users })
}
