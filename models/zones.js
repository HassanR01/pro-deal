import mongoose, { Schema } from "mongoose"

const zoneSchema = new Schema({
    name: String,
    image: String,
    position: [],
    location: String,
    projects: [],
    properties: [],
}, { timestamps: true })

const Zone = mongoose.models.Zone || mongoose.model('Zone', zoneSchema)

export default Zone;