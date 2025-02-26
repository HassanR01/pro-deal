
import { NextResponse } from "next/server";
import Lead from "../../../models/leads";
import connectMongoDB from "../../../libs/mongoose";


export async function POST(req){
    const { name, phone, callMethod, inst, zone, maxBudget, minBudget, message } = await req.json()
    await connectMongoDB()
    await Lead.create({ name, phone, callMethod, inst, zone, maxBudget, minBudget, message })
    return NextResponse.json({message: 'Lead Created'} , {status: 201})
}


export async function GET(){
    await connectMongoDB()
    const leads = await Lead.find()
    return NextResponse.json({leads})
}
