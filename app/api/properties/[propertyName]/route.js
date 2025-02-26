import connectMongoDB from "@/libs/mongoose"
import Property from "@/models/properties"
import { NextResponse } from "next/server"

export async function PUT(req , {params}){
    const { propertyName } = params
    const { newtitle: title, newcategory: category, newimage: image, newdescription: description, newlocation: location, newposition: position, newbathrooms: bathrooms, newbedrooms: bedrooms, newarea: area, newstartBudget: startBudget, newzone: zone, newdeveloper: developer } = await req.json()
    await connectMongoDB()
    await Property.findOneAndUpdate({ title: propertyName }, { title, category, image, description, location, position, bathrooms, bedrooms, area, startBudget, zone, developer })
    return NextResponse.json({ message: 'Property Updated' }, { status: 200 })
}

export async function GET(req , {params}){
    const { propertyName } = params
    await connectMongoDB()
    const property = await Property.findOne({ title: propertyName })
    return NextResponse.json({property})
}

export async function DELETE(req , {params}){
    const { propertyName } = params
    await connectMongoDB()
    await Property.findOneAndDelete({ title: propertyName })
    return NextResponse.json({ message: 'Property Delete' }, { status: 200 })
}


