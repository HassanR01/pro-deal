
import { NextResponse } from "next/server"
import connectMongoDB from "../../../libs/mongoose"
import Project from "../../../models/projects"

export async function POST(req) {
    const { title, image, startBudget, description, developer, zone, location, position } = await req.json()
    await connectMongoDB()
    await Project.create({ title, image, startBudget, description, developer, zone, location, position })
    return NextResponse.json({message: 'Project Created'} , {status: 201})
}

export async function GET(){
    await connectMongoDB()
    const projects = await Project.find()
    return NextResponse.json({projects})
}

