const { doctorModel } = require("../../model/doctor.schema");
const { patientModel } = require("../../model/patient.schema");
const { mappingModel } = require("../../model/mapping.schema");
const { HandleGenericAPIError } = require("../../utils/controller.helper");

const assignDoctor = async (req, res, next) => {
  try {
    const { patient, doctor, assignedBy, notes } = req.body;

    if (!patient || !doctor || !assignedBy) {
      return res.status(400).json({
        isSuccess: false,
        message: "patient, doctor, and assignedBy are required",
        data: {},
      });
    }
    const patientExists = await patientModel.findById(patient);
    const doctorExists = await doctorModel.findById(doctor);

    if (!patientExists || !doctorExists) {
      return res.status(404).json({
        isSuccess: false,
        message: "Invalid patient or doctor ID",
        data: {},
      });
    }

    const mapping = await mappingModel.create({
      patient,
      doctor,
      assignedBy,
      notes,
    });
    res.status(201).json({
      isSuccess: true,
      message: "patient and doctor mapping sucessfully",
      data: mapping,
    });
  } catch (err) {
    HandleGenericAPIError("assignDoctor", res, err);
  }
};

const getAllMappings = async (req, res, next) => {
  try {
    const mappings = await mappingModel
      .find()
      .populate("patient", "name gender phone")
      .populate("doctor", "name specialization phone")
      .populate("assignedBy", "name email");

    res.status(200).json({
      isSuccess: true,
      message: "data fetched sucessfully",
      data: mappings,
    });
  } catch (error) {
    HandleGenericAPIError("getAllMappings", res, err);
  }
};

const getDoctorsByPatient = async (req, res, next) => {
  try {
    const { patient_id } = req.params;

    const mappings = await mappingModel
      .find({ patient: patient_id })
      .populate("doctor", "name specialization")
      .populate("patient", "name");

    if (!mappings || mappings.length === 0) {
      return res.status(404).json({
        isSuccess: false,
        message: "No doctors assigned to this patient",
        data: mappings,
      });
    }

    res.status(200).json({
      isSucess: true,
      message: "get doctor by patient is fetched",
      patient: mappings[0].patient.name,
      doctors: mappings.map((m) => ({
        name: m.doctor.name,
        specialization: m.doctor.specialization,
      })),
    });
  } catch (error) {
    HandleGenericAPIError("getDoctorsByPatient", res, err);
  }
};
const removeMapping = async (req, res, next) => {
  try {
    const { id } = req.params;
    const mapping = await mappingModel.findByIdAndDelete(id);
    if (!mapping) {
      return res.status(404).json({
        isSuccess: false,
        message: "Mapping not found",
        data: {},
      });
    }

    res.status(200).json({
      isSuccess: true,
      message: "Doctor removed from patient successfully",
      data: mapping,
    });
  } catch (error) {
    HandleGenericAPIError("removeMapping", res, err);
  }
};

module.exports = {
  assignDoctor,
  getAllMappings,
  getDoctorsByPatient,
  removeMapping,
};
