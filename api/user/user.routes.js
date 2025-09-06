const express = require("express");
const {
  assignDoctor,
  getAllMappings,
  getDoctorsByPatient,
  removeMapping,
} = require("./user.controller");

const userRouter = express.Router();
router.post("/", assignDoctor);
router.get("/", getAllMappings);
router.get("/:patient_id", getDoctorsByPatient);
router.delete("/:id", removeMapping);
module.exports = { userRouter };
