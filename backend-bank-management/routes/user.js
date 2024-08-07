import express from "express";
import bcrypt from "bcrypt";
import AnotherModel from "../models/User.js";
import Otp from "../models/Otp.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import i18next from "i18next";

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { t } = req;
  try {
    console.log("signup API called");

    const { fullname, email, password, phoneNum, confirmPassword } = req.body;

    console.log(fullname, req.body);

    if (!fullname || !email || !password || !phoneNum || !confirmPassword) {
      return res.status.json({ msg: t('MISSING_FIELD') });
    }

    if (password.length < 8) {
      return res.status(400).json({ msg: t('PASSWORD_TOO_SHORT') });
    }

    if (password !== confirmPassword) {
      console.log("password and confirmpassword do not match");
      return res.json({
        status: false,
        message: t('PASSWORD_MISMATCH'),
      });
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      return res.status(400).json({ msg: t('INVALID_EMAIL') });
    }

    const user = await AnotherModel.findOne({ email });
    if (user) {
      return res.json({ message: t('USER_ALREADY_REGISTERED') });
    }

    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    const otpExpiresAt = new Date(Date.now() + 2 * 60000);

    const newOtp = new Otp({ email, otp, expiresAt: otpExpiresAt });
    await newOtp.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "meeramuskan08@gmail.com",
        pass: "fryn rgtt trsn hlkr",
      },
    });

    const mailOptions = {
      from: "meeramuskan08@gmail.com",
      to: email,
      subject: "Your OTP for Signup",
      text: `Your OTP is ${otp}. It is valid for 2 minutes.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.json({ message: t('INTERNAL_SERVER_ERROR') });
      } else {
        console.log("Email sent: " + info.response);
        return res.json({ status: true, message: t('OTP_SENT') });
      }
    });
  } catch (error) {
    console.error("Error in signup API:", error);
    return res
      .status(500)
      .json({ status: false, message: t('INTERNAL_SERVER_ERROR') });
  }
});

router.post("/verify-otp", async (req, res) => {
  console.log("Verify-otp called");
  const { t } = req;
  try {
    const { email, otp, fullname, phoneNum, password } = req.body;
    console.log(req.body);

    const otpRecord = await Otp.findOne({ email, otp });
    if (!otpRecord) {
      return res
        .status(400)
        .json({ status: false, message: t('INVALID_OTP') });
    }

    if (otpRecord.expiresAt < new Date()) {
      return res
        .status(400)
        .json({ status: false, message: t('OTP_EXPIRED') });
    }

    const hashPassword = await bcrypt.hash(password, 8);
    const newUser = new AnotherModel({
      fullname,
      email,
      phoneNum,
      password: hashPassword,
      isVerified: true,
    });

    await newUser.save();
    await Otp.deleteOne({ email, otp });

    const token = jwt.sign({ id: newUser._id }, "JWT_SECRET", {
      expiresIn: "2h",
    });
    const savedUser = newUser;
    return res.json({
      status: true,
      message: t('REGISTERED_SUCCESSFULLY'),
      token,
      savedUser,
    });
  } catch (error) {
    console.error("Error in verify-otp API:", error);
    return res
      .status(500)
      .json({ status: false, message: t('INTERNAL_SERVER_ERROR') });
  }
});

router.get("/user/:id", async (req, res) => {
  const { t } = req;
  try {
    const user = await AnotherModel.findById(req.params.id).select("-password"); // Exclude password field
    if (!user) {
      return res.status(404).json({ message: t('USER_NOT_FOUND') });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  console.log("login API is called");
  const { t } = req;
  const { email } = req.body;
  console.log(req.body);

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {
    return res.status(400).json({ field: "email", msg: t('INVALID_EMAIL') });
  }

  const user = await AnotherModel.findOne({ email });
  if (!user) { return res.json({ field: "email", msg: t('USER_NOT_REGISTERED'), });
  }

  const validpassword = await bcrypt.compare(req.body.password, user.password);
  if (!validpassword) {
    return res
      .status(400)
      .json({ field: "password", msg: t('INCORRECT_PASSWORD') });
  }
  const token = jwt.sign({ id: user._id }, process.env.KEY, {
    expiresIn: "1h",
  });
  res.cookie("token", token, { httpOnly: true, maxAge: 3600000 });
  // const { password, ...loggeduser } = user._doc;
  return res.json({
    status: true,
    msg: t('LOGIN_SUCCESSFULLY'),
    //  loggeduser
    token,
  });
});

router.post("/forgotpassword", async (req, res) => {
  console.log("forgot-password API called");
  const { t } = req;
  const { email } = req.body;
  console.log(req.body);

  try {
    const user = await AnotherModel.findOne({ email });
    if (!user) {
      return res.json({ message: t('USER_NOT_REGISTERED') });
    }

    const token = jwt.sign({ id: user._id }, process.env.KEY, {
      expiresIn: "5m",
    });

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "meeramuskan08@gmail.com",
        pass: "fryn rgtt trsn hlkr",
      },
    });

    var mailOptions = {
      from: "meeramuskan08@gmail.com",
      to: email,
      subject: "Reset Password Link to generate a new password ",
      text: `http://localhost:3000/resetpassword/${token}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return res.json({ message: t('OTP_ERROR') });
      } else {
        console.log("Email sent: " + info.response);
        return res.json({ status: true, message: t('OTP_SENT') });
      }
    });
  } catch (err) {
    console.log(err);
  }
});

router.post("/reset-password/:token", async (req, res) => {
  console.log("reset-password API called");
  const { t } = req;
  const { token } = req.params;

  const { password, confirmPassword } = req.body;
  console.log(req.body);

  if (password !== confirmPassword) {
    console.log("password and confirm password do not match");
    return res.json({
      status: false,
      message: t('PASSWORD_MISMATCH'),
    });
  }
  try {
    const decoded = await jwt.verify(token, process.env.KEY);
    const id = decoded.id;
    const hashpassword = await bcrypt.hash(password, 8);
    await AnotherModel.findByIdAndUpdate(
      { _id: id },
      { password: hashpassword }
    );
    return res.json({
      status: true,
      message: t('PASSWORD_UPDATED'),
    });
  } catch (err) {
    console.log(err);
    return res.json({ message: t('INVALID_TOKEN') });
  }
});

router.put("/changepassword/:id", async (req, res) => {
  console.log("Changed-password API is called");
  const { t } = req;
  console.log("key request body", req.body);
  const { id } = req.params;
  console.log(id);
  const { newpassword, oldpassword, confirmPassword } = req.body;
  console.log(req.body);

  try {
    const user = await AnotherModel.findById(id);
    if (!user) {
      return res
        .status(404)
        .json({ field: "id", msg: t('USER_NOT_FOUND') });
    }

    const validpassword = await bcrypt.compare(oldpassword, user.password);
    if (!validpassword) {
      return res
        .status(400)
        .json({
          field: "oldpassword",
          msg: t('INCORRECT_PASSWORD'),
        });
    }

    if (newpassword !== confirmPassword) {
      return res
        .status(400)
        .json({
          field: "confirmpassword",
          msg: t('PASSWORD_MISMATCH'),
        });
    }

    const salt = bcrypt.genSaltSync(8);
    const hashpassword = await bcrypt.hash(newpassword.toString(), salt);

    const updatedLoggedUser = await AnotherModel.findByIdAndUpdate(id, {
      password: hashpassword,
    });
    return res.json({
      status: true,
      msg: t('PASSWORD_UPDATED'),
      updatedLoggedUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: t('ERROR') });
  }
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, "../uploads/profiles");
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage });

router.put("/updateprofile/:id", upload.single("profileImage"), async (req, res) => {
    console.log("Updateprofile API is called");
    const { t } = req;
    console.log("params", req.params);
    const { id } = req.params;
    console.log("id is", id);
    const data  = req.body;
    console.log("data is", data);

    if (req.file) {
      data.profileImage = `/uploads/profiles/${req.file.filename}`;
    }

    try {
      const updatedProfileUser = await AnotherModel.findByIdAndUpdate(
        { _id: id },
        { $set: data },
        { new: true }
      );
      console.log("updated data is:", updatedProfileUser )
      return res.json({
        status: true,
        message: t('PROFILE_UPDATED'),
        updatedProfileUser,
      });
    } catch (error) {
      console.log(error);
    }
  }
);

export { router as UserRouter };
