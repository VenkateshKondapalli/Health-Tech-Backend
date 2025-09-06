const { patientModel } = require("../../model/patient.schema");
const { HandleGenericAPIError } = require("../../utils/controller.helper");

const addPatientController = async (req, res) => {
  try {
    const { _id: createdBy } = req.user;
    const exist = await patientModel.findOne({ email: req.body.email });
    if (exist) {
      return res.status(400).json({
        isSuccess: false,
        message: "patient already exist",
        data: {},
      });
    }

    const patient = await patientModel.create({ ...req.body, createdBy });

    res.status(201).json({
      isSuccess: true,
      message: "patient added successfully",
      data: patient,
    });
  } catch (err) {
    HandleGenericAPIError("addPatientController", res, err);
  }
};

const getAllPatientsData = async (req, res) => {
  try {
    const patientsData = await patientModel
      .find({ createdBy: req.user._id })
      .lean();
    if (!patientsData) {
      return req.status(400).json({
        isSuccess: false,
        message: "no patients created by user",
        data: {},
      });
    }

    res.status(200).json({
      isSuccess: true,
      message: "patients data fetched successfully",
      data: patientsData,
    });
  } catch (err) {
    HandleGenericAPIError("getAllPatientsData", res, err);
  }
};

const getPatientById = async (req, res) => {
  try {
    const patient = await patientModel.findById(req.params.id).lean();

    res.status(200).json({
      isSuccess: true,
      message: "patient found",
      data: patient,
    });
  } catch (err) {
    HandleGenericAPIError("getPatientById", res, err);
  }
};

const updatePatient = async (req, res) => {
  try {
    const updatedpatient = await patientModel.findByIdAndUpdate(
      req.params.id,
      req.body
    );

    res.status(201).json({
      isSucess: true,
      message: "patient data updated sucessfully",
      data: updatedpatient,
    });
  } catch (err) {
    HandleGenericAPIError("updatePatient", res, err);
  }
};

const deletePatient = async (req, res) => {
  try {
    const deletedData = await patientModel.findByIdAndDelete(req.params.id);
    res.status(204).json({
      isSuccess: true,
      message: "patient deleted sucessfully",
      data: deletedData,
    });
  } catch (err) {
    HandleGenericAPIError("deletePatient", res, err);
  }
};
module.exports = {
  addPatientController,
  getAllPatientsData,
  getPatientById,
  updatePatient,
  deletePatient,
};
