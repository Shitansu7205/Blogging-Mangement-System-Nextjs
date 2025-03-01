import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    mail: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    tenantId:{
        type: String,
    }
})



const User = mongoose.model.User || mongoose.model('User', userSchema)
export default User