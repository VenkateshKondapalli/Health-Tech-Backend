const { patientModel } = require("../../model/patient.schema");

const addPatientController = async (req, res) => {
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
};

const getAllPatientsData = async (req, res) => {
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
};

const getPatientById = async (req, res) => {
  const patient = await patientModel.findById(req.params.id).lean();

  res.status(200).json({
    isSuccess: true,
    message: "patient found",
    data: patient,
  });
};

const updatePatient = async (req, res) => {
  const updatedpatient = await patientModel.findByIdAndUpdate(
    req.params.id,
    req.body
  );

  res.status(201).json({
    isSucess: true,
    message: "patient data updated sucessfully",
    data: updatedpatient,
  });
};

const deletePatient = async (req, res) => {
  const deletedData = await patientModel.findByIdAndDelete(req.params.id);
  res.status(204).json({
    isSuccess: true,
    message: "patient deleted sucessfully",
    data: deletedData,
  });
};
module.exports = {
  addPatientController,
  getAllPatientsData,
  getPatientById,
  updatePatient,
  deletePatient,
};
