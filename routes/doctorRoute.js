import express from "express";
import {
    registerDoctor,
    getDoctors,
    getDoctorsById,
    updateDoctor
} from "../controllers/doctorController.js";

const router = express.Router();
router.post("/register", registerDoctor);
router.get("/getDoctors", getDoctors);
router.post("/get-doctor", getDoctorsById);
router.post("/update-doctor", updateDoctor);
export default router;