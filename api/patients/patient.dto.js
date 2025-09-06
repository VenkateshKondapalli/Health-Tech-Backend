const { patientModel } = require("../../model/patient.schema");
const { HandleGenericAPIError } = require("../../utils/controller.helper");

const addNewPatientValidator = async (req, res, next) => {
  try {
    const { name, gender, dateOfBirth, phone } = req.body;

    if (!name || !gender || !dateOfBirth || !phone) {
      return res.status(400).json({
        isSucess: false,
        message: "name ,gender, date of birth and phone are required",
        data: {},
      });
    }
    next();
  } catch (err) {
    HandleGenericAPIError("addNewPatientValidator", res, err);
  }
};

const isPatientexist = async (req, res, next) => {
  try {
    const exist = await patientModel.findById(req.params.id).lean();
    if (!exist) {
      return res.status(404).json({
        isSuccess: false,
        message: "patient not exist",
        data: {},
      });
    }
    next();
  } catch (err) {
    HandleGenericAPIError("isPatientexist", res, err);
  }
};
module.exports = { addNewPatientValidator, isPatientexist };
