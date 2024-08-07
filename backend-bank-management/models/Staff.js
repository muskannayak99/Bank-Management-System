import mongoose from "mongoose";

const StaffSchema = new mongoose.Schema({
  staffName: { type: String, required: true },
  staffPosition: { type: String, required: true },
  phoneNum: { type: String, required: true, minLength: 10 },
  email: { type: String, required: true, unique: true },
  staffSalary: { type: String, required: true },
  gender: { type: String, required: true },
  description: { type: String },
  profileImage: { type: String, required: true }
});

const StaffModel = mongoose.model("staff", StaffSchema);

export default StaffModel;
