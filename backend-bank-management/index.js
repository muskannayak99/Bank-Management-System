import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import { UserRouter } from "./routes/user.js";
import { AddCustomerRouter } from "./routes/addcustomer.js";
import cookieParser from "cookie-parser";
import { StaffRouter } from "./routes/staff.js";
import { TransactionRouter } from "./routes/transaction.js";
import bodyParser from "body-parser";
import i18n from './i18n/i18n.config.js';
import i18nextMiddleware from 'i18next-http-middleware';


dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(i18nextMiddleware.handle(i18n))

// Routes
app.use("/auth", UserRouter);
app.use("/customer", AddCustomerRouter);
app.use("/staff", StaffRouter);
app.use("/transaction", TransactionRouter);

app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));

// MongoDB
mongoose
  .connect(process.env.MONGODB_CONNECTION_URL, {})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
