import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
    customerName: { type: String, required: true },
    accountNum: { type: String, required: true},
    balance: {type: String, required: true},
    withdraw: {type: String, required: true},
    deposit: {type: String, required: true},
    transactionDate: { type: String, required: true },
    accountStatus: { type: String, required: true },
    profileImage: { type: String, required: true },
})

const TransactionModel = mongoose.model("Transaction", TransactionSchema)

export default TransactionModel;