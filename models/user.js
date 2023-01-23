const { Schema, model } = require("mongoose");
const Joi = require("joi");

const emailRegexp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

const userSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: emailRegexp,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    avatarURL: {
      type: String,
      required: true,
    },
    token: {
      type: String,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationCode: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);

const signupSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).max(30).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).max(30).required(),
});

const verifyEmailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
});

const schemas = {
  signupSchema,
  loginSchema,
  verifyEmailSchema,
};

const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
};
