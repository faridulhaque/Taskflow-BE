const UserModel = require("../models/user.model");

const fs = require("fs");
const path = require("path");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const isExisted = await UserModel.findOne({ email });

    if (isExisted?._id) {
      res.status(409).json({ message: "Email already in use" });
    } else {
      const salt = await bcrypt.genSalt();

      const passwordHash = await bcrypt.hash(password, salt);
      const newUser = new UserModel({
        name,
        email,
        password: passwordHash,
      });

      const savedUser = await newUser.save();
      const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET);

      res.status(200).json({ data: null, token });
    }
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email: email });
    if (!user?._id) {
      return res.status(400).json({ message: "User not found" });
    } else {
      const isMatched = await bcrypt.compare(password, user.password);

      if (!isMatched) {
        return res.status(404).json({ message: "Password did not match" });
      } else {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        res.status(200).json({ data: null, token });
      }
    }
  } catch (error) {
    next(error);
  }
};

const forgotPassword = async (req, res, next) => {
  console.log("forgot password hit -------------------------------");
  try {
    const { email } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user?._id) {
      return res.status(400).json({ message: "Email is not in use" });
    }

    const publicKey = process.env.MAILJET_PUBLIC_KEY;
    const privateKey = process.env.MAILJET_PRIVATE_KEY;
    const senderEmail = process.env.MAILJET_SENDER_EMAIL;
    const auth = Buffer.from(`${publicKey}:${privateKey}`).toString("base64");

    const code = Math.floor(1000 + Math.random() * 9000);

    await UserModel.updateOne({ email }, { passwordResetCode: code });

    const response = await fetch("https://api.mailjet.com/v3.1/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${auth}`,
      },
      body: JSON.stringify({
        Messages: [
          {
            From: { Email: senderEmail, Name: "TaskFlow Support" },
            To: [{ Email: email, Name: user.name || "User" }],
            Subject: "Your password reset code",
            TextPart: `Your verification code is ${code}`,
            HTMLPart: `<h3>Hello ${user.name || "User"},</h3>
                       <p>Your password reset code is <b>${code}</b>.</p>
                       <p>This code will expire soon.</p>`,
          },
        ],
      }),
    });

    const data = await response.json();

    if (response.ok) {
      res.status(200).json({ data: { email: user.email } });
    } else {
      res.status(500).json({ message: "Failed to send email", data });
    }
  } catch (error) {
    next(error);
  }
  // return res.JSON({ data: {} });
};

const recoverPassword = async (req, res, next) => {
  try {
    const { email, code, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user || !user?.passwordResetCode)
      return res.status(401).json({ data: false });

    if (user.passwordResetCode !== code) {
      return res.status(401).json({ data: false });
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    await UserModel.updateOne(
      { email },
      { password: passwordHash, passwordResetCode: null }
    );

    res.status(200).json({ data: true });
  } catch (error) {
    next(error);
  }
};

const googleOnboarding = async (req, res, next) => {
  try {
    const { name, email } = req.body;

    const isExisted = await UserModel.findOne({ email });

    if (isExisted?._id) {
      const token = jwt.sign({ id: isExisted._id }, process.env.JWT_SECRET);

      res.status(200).json({ data: { message: "Login successful" }, token });
    } else {
      const newUser = new UserModel({
        name,
        email,
      });

      const savedUser = await newUser.save();
      const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET);

      res
        .status(200)
        .json({ data: { message: "Registration successful" }, token });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  forgotPassword,
  recoverPassword,
  googleOnboarding,
};
