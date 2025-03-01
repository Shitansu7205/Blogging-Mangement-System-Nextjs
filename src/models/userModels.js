import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    mail: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    tenantId: {
        type: String,
        require: true
    },
    profileImage: {
        type: String,
        require: true
    }
})



const User = mongoose.model.User || mongoose.model('User', userSchema)
export default User