const { doctorModel } = require("../../model/doctor.schema");
const { HandleGenericAPIError } = require("../../utils/controller.helper");

const addDoctorController = async (req, res) => {
  try {
    const { _id: createdBy } = req.user;
    const exist = await doctorModel.findOne({ email: req.body.email });
    if (exist) {
      return res.status(400).json({
        isSuccess: false,
        message: "doctor already exist",
        data: {},
      });
    }

    const patient = await doctorModel.create({ ...req.body, createdBy });

    res.status(201).json({
      isSuccess: true,
      message: "doctor added successfully",
      data: patient,
    });
  } catch (err) {
    HandleGenericAPIError("addDoctorController", res, err);
  }
};

const getAllDoctorData = async (req, res) => {
  try {
    const doctorsData = await doctorModel
      .find({ createdBy: req.user._id })
      .lean();
    if (!doctorsData) {
      return req.status(400).json({
        isSuccess: false,
        message: "no doctor is created by user",
        data: {},
      });
    }

    res.status(200).json({
      isSuccess: true,
      message: "doctors data fetched successfully",
      data: patientsData,
    });
  } catch (err) {
    HandleGenericAPIError("getAllDoctorData", res, err);
  }
};

const getDoctorById = async (req, res) => {
  try {
    const doctor = await doctorModel.findById(req.params.id).lean();

    res.status(200).json({
      isSuccess: true,
      message: "doctor found",
      data: doctor,
    });
  } catch (err) {
    HandleGenericAPIError("getDoctorById", res, err);
  }
};

const updateDoctor = async (req, res) => {
  try {
    const updatedDoctor = await doctorModel.findByIdAndUpdate(
      req.params.id,
      req.body
    );

    res.status(201).json({
      isSucess: true,
      message: "patient data updated sucessfully",
      data: updatedDoctor,
    });
  } catch (err) {
    HandleGenericAPIError("updateDoctor", res, err);
  }
};

const deleteDoctor = async (req, res) => {
  try {
  } catch (err) {
    HandleGenericAPIError("deleteDoctor", res, err);
  }
};
module.exports = {
  addDoctorController,
  getAllDoctorData,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
};
