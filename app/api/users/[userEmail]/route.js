import connectMongoDB from "@/libs/mongoose"
import User from "@/models/users"
import { NextResponse } from "next/server"

export async function PUT(req , {params}){
    const { userEmail } = params
    const { newrole: role } = await req.json()
    await connectMongoDB()
    await User.findOneAndUpdate({email: userEmail}, { role })
    return NextResponse.json({ message: "user Updated"} , {status: 200})
}
