import express from "express";
import {
    createAppointment,
    getAppointments,
    getAppointment,
    updateAppointment,
    deleteAppointment,
    getAppointmentByuser
} from "../controllers/appointmentController.js";
const router = express.Router();
router.post("/create", createAppointment);
router.get("/getAppointment", getAppointments);
router.post("/getDoctorAppointments", getAppointment);
router.post("/updateAppointment", updateAppointment);
router.post("/getAppointmentByuser", getAppointmentByuser);
router.delete("/deleteAppointment", deleteAppointment);
export default router;