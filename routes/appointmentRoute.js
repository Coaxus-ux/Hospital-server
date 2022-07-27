import express from "express";
import {
    createAppointment,
    getAppointments,
    getAppointment,
    updateAppointment,
    cancelAppointment,
    getAppointmentByuser,
    putAppointmentReady
} from "../controllers/appointmentController.js";
const router = express.Router();
router.post("/create", createAppointment);
router.get("/getAppointment", getAppointments);
router.post("/getDoctorAppointments", getAppointment);
router.post("/updateAppointment", updateAppointment);
router.post("/getAppointmentByuser", getAppointmentByuser);
router.post("/cancelAppointment", cancelAppointment);
router.put("/putAppointmentReady", putAppointmentReady);
export default router;