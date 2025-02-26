import connectMongoDB from "@/libs/mongoose"
import Property from "@/models/properties"
import { NextResponse } from "next/server"

export async function POST(req) {
    const { title, category, image, description, location, position, bathrooms, bedrooms, area, startBudget, zone, developer } = await req.json()
    await connectMongoDB()
    await Property.create({ title, category, image, description, location, position, bathrooms, bedrooms, area, startBudget, zone, developer })
    return NextResponse.json({ message: 'Property Created' }, { status: 201 })
}

export async function GET() {
    await connectMongoDB()
    const properties = await Property.find()
    return NextResponse.json({ properties })
}

