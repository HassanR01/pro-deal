import { NextResponse } from "next/server"
import connectMongoDB from "../../../../libs/mongoose"
import Project from "../../../../models/projects"

export async function PUT(req, { params }) {
    const { projectName } = params
    const { newtitle: title, newimage: image, newstartBudget: startBudget, newdescription: description, newdeveloper: developer, newzone: zone, newlocation: location, newposition: position } = await req.json()
    await connectMongoDB()
    await Project.findOneAndUpdate({ title: projectName }, { title, image, startBudget, description, developer, zone, location, position })
    return NextResponse.json({ message: "Project Updated" }, { status: 200 })
}

export async function GET(req, { params }) {
    const { projectName } = params
    await connectMongoDB()
    const project = await Project.findOne({ title: projectName })
    return NextResponse.json({ project })
}

export async function DELETE(req, { params }) {
    const { projectName } = params
    await connectMongoDB()
    await Project.findOneAndDelete({ title: projectName })
    return NextResponse.json({ message: "Project Updated" }, { status: 200 })
}
