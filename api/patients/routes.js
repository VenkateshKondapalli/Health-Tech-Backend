const express = require("express");
const { addNewPatientValidator, isPatientexist } = require("./patient.dto");
const {
  addPatientController,
  getAllPatientsData,
  getPatientById,
  updatePatient,
  deletePatient,
} = require("./patient.controller");

const patientRouter = express.Router();

patientRouter.post("/", addNewPatientValidator, addPatientController);
patientRouter.get("/", getAllPatientsData);

patientRouter
  .route("/:id")
  .all(isPatientexist)
  .get(getPatientById)
  .patch(updatePatient)
  .delete(deletePatient);

module.exports = { patientRouter };
