import mongoose, { Schema } from "mongoose";

const leadSchema = new Schema({
    name: String,
    phone: String,
    callMethod: String,
    inst: String,
    zone: String,
    maxBudget: Number,
    minBudget: Number,
    message: String,
}, {timestamps: true})

const Lead = mongoose.models.Lead || mongoose.model('Lead', leadSchema)

export default Lead;