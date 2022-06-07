import express from "express";
const router = express.Router();
import {
    registerPatient
} from "../controllers/patientController.js";

router.post("/register", registerPatient);

export default router;