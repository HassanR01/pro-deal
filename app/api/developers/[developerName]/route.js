import connectMongoDB from "@/libs/mongoose"
import Developer from "@/models/developers"
import { NextResponse } from "next/server"

export async function GET(req , {params}){
    const { developerName } = params
    await connectMongoDB()
    const developer = await Developer.findOne({name: developerName})
    return NextResponse.json({developer})
}

export async function PUT(req, { params }) {
    const { developerName } = params
    const { newname:name, newdescription:description, Dprojects:projects, Dproperties: properties, newimage:image } = await req.json()
    await connectMongoDB()
    await Developer.findOneAndUpdate({name: developerName}, { name, description, projects, properties, image })
    return NextResponse.json({message: 'Developer updated'}, {status: 200})
}

export async function DELETE(req , {params}){
    const { developerName } = params
    await connectMongoDB()
    await Developer.findOneAndDelete({name: developerName})
    return NextResponse.json({message: 'Developer Deleted'}, {status: 200})
}
