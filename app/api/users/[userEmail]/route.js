import { NextResponse } from "next/server"
import User from "../../../../models/users"
import connectMongoDB from "../../../../libs/mongoose"

export async function PUT(req , {params}){
    const { userEmail } = params
    const { newrole: role } = await req.json()
    await connectMongoDB()
    await User.findOneAndUpdate({email: userEmail}, { role })
    return NextResponse.json({ message: "user Updated"} , {status: 200})
}
