import mongoose, { Schema, mongo } from "mongoose";

const propertySchema = new Schema({
    title: String,
    category: String,
    image: String,
    description: String,
    zone: String,
    developer: String,
    location: String,
    bathrooms: Number,
    bedrooms: Number,
    area: Number,
    startBudget: Number,
    position: [],

    visitors: Number,
})

const Property = mongoose.models.Property || mongoose.model("Property", propertySchema)

export default Property;