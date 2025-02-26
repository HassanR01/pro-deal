
import { NextResponse } from "next/server";
import connectMongoDB from "../../../../libs/mongoose";
import Zone from "../../../../models/zones";

export async function PUT(req, { params }) {
    const { zoneName } = params
    const { newname: name, newimage: image, newposition: position, newlocation: location, Zprojects: projects, Zproperties: properties } = await req.json()
    await connectMongoDB()
    await Zone.findOneAndUpdate({name: zoneName }, { name, image, position, location, projects, properties })
    return NextResponse.json({ message: 'Zone Updated' }, { status: 200 })
}


export async function GET(req, { params }) {
    const { zoneName } = params
    await connectMongoDB()
    const zone = await Zone.findOne({name: zoneName })
    return NextResponse.json({ zone })
}


export async function DELETE(req, { params }) {
    const { zoneName } = params
    await connectMongoDB()
    await Zone.findOneAndDelete({name: zoneName })
    return NextResponse.json({ message: 'Zone Deleted' }, { status: 200 })
}
