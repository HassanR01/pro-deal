import connectMongoDB from "@/libs/mongoose"
import Zone from "@/models/zones"
import { NextResponse } from "next/server"

export async function POST(req){
    const { name,image, location, position, projects, properties } = await req.json()
    await connectMongoDB()
    await Zone.create({ name, image, location, position, projects, properties })
    return NextResponse.json({message: "Zone Created"} , {status: 201})
}

export async function GET(){
    await connectMongoDB()
    const zones = await Zone.find()
    return NextResponse.json({zones})
}
