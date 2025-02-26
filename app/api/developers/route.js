
import { NextResponse } from "next/server"
import connectMongoDB from "../../../libs/mongoose"
import Developer from "../../../models/developers"

export async function POST(req) {
    const { name, description, projects, properties,image, visitors } = await req.json()
    await connectMongoDB()
    await Developer.create({ name, description, projects, properties,image, visitors })
    return NextResponse.json({ message: 'Developer created' }, { status: 200 })
}   

export async function GET(){
    await connectMongoDB()
    const developers = await Developer.find()
    return NextResponse.json({developers})
}
