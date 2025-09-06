const { patientModel } = require("../../model/patient.schema");

const addNewPatientValidator = async (req, res, next) => {
  const { name, gender, dateOfBirth, phone } = req.body;

  if (!name || !gender || !dateOfBirth || !phone) {
    return res.status(400).json({
      isSucess: false,
      message: "name ,gender, date of birth and phone are required",
      data: {},
    });
  }
  next();
};

const isPatientexist = async (req, res, next) => {
  const exist = await patientModel.findById(req.params.id).lean();
  if (!exist) {
    return res.status(404).json({
      isSuccess: false,
      message: "patient not exist",
      data: {},
    });
  }
  next();
};
module.exports = { addNewPatientValidator, isPatientexist };
