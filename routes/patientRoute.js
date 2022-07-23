import express from "express";
import {
    registerPatient,
    getPatientsByCitizenshipCard
} from "../controllers/patientController.js";
const router = express.Router();

router.post("/register", registerPatient);
router.post("/getPatientsByCitizenshipCard", getPatientsByCitizenshipCard);

export default router;