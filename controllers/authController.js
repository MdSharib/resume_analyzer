import userModel from "../models/userModel.js";
import nodemailer from "nodemailer";
import { comparePassword, hashPassword } from "./../helpers/authHelper.js";
import JWT from "jsonwebtoken";


const sendVerifyMail = (user, email, user_id) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: "mdsharibdev@gmail.com",
        pass: "dmuwrkdimnkubdqb",
      },
    });

    const mailOptions = {
      from: "resumetestingnodemailer@gmail.com",
      to: email,
      subject: "Please Verify your mail", // Subject line
      html: `<p>Hello ${user}, please click here <a href="http://localhost:3000/verify/?id=${user_id}">Verify</a> your mail </p>`,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email has been sent to ", info.response);
      }
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const VerifyMail = async (req, res) => {
  try {
    const updatedUser = await userModel.findByIdAndUpdate(
      req.params.id,
      { $set: { isVerified: 1 } },
      { new: true, useFindAndModify: false }
    );
    res.status(200).send({
      success: true,
      message: "User Verified successfully",
    });
  } catch (error) {
    console.log(error.message);
  }
};

// registering the user
export const registerController = async (req, res) => {
  try {
    const { name, email,phone, password } = req.body;
    //validations
    if (!name) {
      return res.send({ error: "Name is Required" });
    }
    if (!email) {
      return res.send({ message: "Email is Required" });
    }
    if (!phone) {
      return res.send({ message: "Phone no is Required" });
    }
    if (!password) {
      return res.send({ message: "Password is Required" });
    }

    //check user
    const exisitingUser = await userModel.findOne({ email });

    if (exisitingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Register please login",
      });
    }

    //registering user
    const hashedPassword = await hashPassword(password);
    //save
    const user = await new userModel({
      name,
      email,
      phone,
      password: hashedPassword,
    }).save();

    if (user) {
      sendVerifyMail(name, email, user._id);
    }

    res.status(201).send({
      success: true,
      message: "User Register Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Errro in Registeration",
      error,
    });
  }
};


//POST LOGIN
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    //check user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registerd",
      });
    }
    // comparing current password with encrypted pass
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }
    //adding secret token from env
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        isVerified: user.isVerified,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};
