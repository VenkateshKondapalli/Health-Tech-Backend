const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      required: [true, "email is required"],
      unique: true,
      lowercase: true,
      validate: {
        validator: validator.isEmail,
        message: "Invalid Email",
      },
    },
    password: {
      type: String,
      trim: true,
      required: [true, "password is required"],
    },
    confirmPassword: {
      type: String,
      trim: true,
      required: [true, "password is required"],
      validate: {
        validator: function (cnfPassword) {
          return cnfPassword === this.password;
        },
        message: "passowrd doesnot match",
      },
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password.toString(), 12);
    this.confirmPassword = undefined;
  }
  next();
});

userSchema.methods.matchpassword = async function (enteredpassword) {
  return await bcrypt.compare(enteredpassword.toString(), this.password);
};

const userModel = model("user", userSchema);

module.exports = { userModel };
