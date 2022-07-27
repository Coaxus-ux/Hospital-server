import express from "express";
import {
    createAppointmentData,
    getAppointmentData
} from "../controllers/appointmentDataController.js";
const router = express.Router();
router.post("/create-appointmentData", createAppointmentData);
router.post("/getAppointmentData", getAppointmentData);

export default router;