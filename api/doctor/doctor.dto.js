const { doctorModel } = require("../../model/doctor.schema");
const { HandleGenericAPIError } = require("../../utils/controller.helper");

const doctorValidator = (req, res, next) => {
  try {
    const {
      name,
      gender,
      dateOfBirth,
      specialization,
      qualification,
      experienceYears,
      phone,
      email,
    } = req.body;

    if (
      !name ||
      !gender ||
      !dateOfBirth ||
      !specialization ||
      !qualification ||
      !experienceYears ||
      !phone ||
      !email
    ) {
      return res.status(400).json({
        isSuccess: false,
        message:
          "Required fields: name, gender, dateOfBirth, specialization, qualification, experienceYears, phone, email",
        data: {},
      });
    }

    next();
  } catch (err) {
    HandleGenericAPIError("doctorValidator", res, err);
  }
};

const isDoctorexist = async (req, res, next) => {
  try {
  } catch (err) {
    HandleGenericAPIError("isDoctorexist", res, err);
  }
};
module.exports = { doctorValidator, isDoctorexist };
