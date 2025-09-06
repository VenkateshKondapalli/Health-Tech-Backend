const mongoose = require("mongoose");
const validator = require("validator");

const { Schema, model } = mongoose;

const patientSchema = new Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Patient must be associated with a user"],
    },
    name: {
      type: String,
      required: [true, " name is required"],
      trim: true,
      minlength: [2, " name must be at least 2 characters long"],
      maxlength: [50, "name cannot exceed 50 characters"],
    },
    gender: {
      type: String,
      enum: {
        values: ["Male", "Female", "Other"],
        message: "Gender must be Male, Female, or Other",
      },
      required: [true, "Gender is required"],
    },
    dateOfBirth: {
      type: Date,
      required: [true, "Date of birth is required"],
      validate: {
        validator: function (v) {
          return v < new Date();
        },
        message: "Date of birth must be in the past",
      },
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      match: [/^[0-9]{10}$/, "Phone number must be 10 digits"],
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      uniqued: true,
      validate: {
        validator: validator.isEmail,
        message: "email is not valid",
      },
    },
    address: {
      street: {
        type: String,
        trim: true,
        maxlength: 100,
      },
      city: {
        type: String,
        trim: true,
        maxlength: 50,
      },
      state: {
        type: String,
        trim: true,
        maxlength: 50,
      },
      country: {
        type: String,
        trim: true,
        default: "India",
      },
    },
    bloodGroup: {
      type: String,
      enum: {
        values: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
        message: "Invalid blood group",
      },
    },
    medicalHistory: {
      type: [String],
      default: [],
      validate: {
        validator: (arr) => arr.length <= 20,
        message: "Medical history cannot exceed 20 entries",
      },
    },
    currentMedications: {
      type: [String],
      default: [],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const patientModel = model("patient", patientSchema);

module.exports = { patientModel };
