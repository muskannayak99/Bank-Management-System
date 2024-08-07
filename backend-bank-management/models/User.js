import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNum: { type: String, required: true, minLength: 10 },
    password: { type: String, required: true, minLength: 8 },
    profileImage: { type: String},
    isVerified: { type: Boolean, default: false },
})

const AnotherModel = mongoose.model("User", userSchema)

export default AnotherModel; 