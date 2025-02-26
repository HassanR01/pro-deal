import connectMongoDB from "@/libs/mongoose"
import Admin from "@/models/admins"
import { NextResponse } from "next/server"

export async function GET(req, { params }) {
    const { userEmail } = params
    await connectMongoDB()
    const admin = Admin.findOne({ email: userEmail })
    return NextResponse.json({admin})
}

export async function PUT(req, { params }) {
    const { userEmail } = params
    const { newname: name, newemail: email, newpassword: password} = await req.json()
    await Admin.findOneAndUpdate({email : userEmail}, { name, email, password })
    return NextResponse.json({message: 'Admin updated'}, {status: 200})
}

export async function DELETE(req , {params}){
    const { userEmail } = params
    await connectMongoDB()
    await Admin.findOneAndDelete({email: userEmail})
    return NextResponse.json({message: "Admin Deleted"} , {status : 200})
}
