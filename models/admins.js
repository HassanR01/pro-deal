import mongoose, { Schema } from "mongoose";

const adminSchema = new Schema({
    name: String,
    email: String,
    password: String,
})

const Admin = mongoose.models.Admin || mongoose.model('Admin', adminSchema)

export default Admin;