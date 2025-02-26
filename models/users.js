import mongoose, { Schema } from "mongoose"

const userSchema = new Schema({
    role: {
        type: String,
        default: 'visitor'
    },
    name: String,
    email: String,
    image: String,
})

const User = mongoose.models.User || mongoose.model('User', userSchema)

export default User;