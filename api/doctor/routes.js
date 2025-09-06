const express = require("express");
const { doctorValidator, isDoctorexist } = require("./doctor.dto");
const {
  getAllDoctorData,
  addDoctorController,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
} = require("./doctor.controller");
const doctorRouter = express.Router();

doctorRouter.post("/", doctorValidator, addDoctorController);
doctorRouter.get("/", getAllDoctorData);

doctorRouter
  .route("/:id")
  .all(isDoctorexist)
  .get(getDoctorById)
  .patch(updateDoctor)
  .delete(deleteDoctor);

module.exports = { doctorRouter };
