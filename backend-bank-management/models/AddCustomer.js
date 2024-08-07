import mongoose from "mongoose";

const AddcustomerSchema = new mongoose.Schema({
    customerName: { type: String, required: true },
    phoneNum: { type: String, required: true, minLength: 10 },
    email: { type: String, required: true },
    accountNum: { type: String, required: true, unique: true, minLength: 12 },
    registerDate: { type: String, required: true },
    accountType: { type: String, required: true },
    accountStatus: { type: String, required: true },
    description: { type: String, required: true },
    profileImage: {type: String, required: true }
})

const AddcustomerModel = mongoose.model("addcustomer", AddcustomerSchema)

export default AddcustomerModel;