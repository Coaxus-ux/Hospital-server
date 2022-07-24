import express from "express";
import {
    registerDoctor,
    getDoctors,
    getDoctorsById
} from "../controllers/doctorController.js";

const router = express.Router();
router.post("/register", registerDoctor);
router.get("/getDoctors", getDoctors);
router.post("/get-doctor", getDoctorsById);

export default router;