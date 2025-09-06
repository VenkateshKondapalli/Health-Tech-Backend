const express = require("express");

const userRouter = express.Router();
router.post("/", assignDocto);
router.get("/", getAllMappings);
router.get("/:patient_id", getDoctorsByPatient);
router.delete("/:id", removeMapping);
module.exports = { userRouter };
