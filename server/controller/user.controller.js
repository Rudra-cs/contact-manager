const User = require("../models/User");
const bcrpt = require("bcryptjs");
const joi = require("joi");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.register = async (req, res) => {
  const userSchema = joi.object({
    fullName: joi
      .string()
      .required()
      .min(3)
      .pattern(new RegExp("^[a-zA-Z]{3,30}$")),
    email: joi.string().email().required(),
    password: joi.string().required().min(6).max(15),
  });
  try {
    let userFields = await userSchema.validateAsync(req.body);

    let user = await User.findOne({ email: userFields.email });
    if (!user) {
      user = new User(userFields);
      const salt = await bcrpt.genSalt(10);
      user.password = await bcrpt.hash(user.password, salt);
      await user.save();
      res.status(200).json({
        message: "User registered Successfully!",
        user,
      });
    } else {
      res.status(400).json({
        message: "User Already Exists!",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Something Went Wrong!",
      error: err,
    });
  }
};

exports.login = async (req, res) => {
  const loginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required().min(6).max(15),
  });
  try {
    const loginFields = await loginSchema.validateAsync(req.body);
    // WHether the user with the provided email exits or not
    let user = await User.findOne({ email: loginFields.email });

    if (!user) {
      res.status(400).json({
        message: "Username/Password doesn't Exist",
      });
    } else {
      const is_match = await bcrpt.compare(loginFields.password, user.password);
      if (!is_match) {
        res.status(400).json({
          message: "Username/Password doesn't Exist",
        });
      } else {
        const payload = {
          userData: {
            id: user._id,
          },
        };
        const token = await jwt.sign(payload, process.env.SECRET_KEY, {
          expiresIn: 7200,
        });
        res.status(200).json({
          message: "Logged In",
          user: { id: user._id, name: user.fullName },
          token,
        });
      }
    }
  } catch (err) {
    res.status(500).json({
      message: "Something Went Wrong",
      error: err,
    });
  }
};
