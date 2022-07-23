import express from "express";
import {
    registerDoctor,
    getDoctors
} from "../controllers/doctorController.js";
const router = express.Router();
router.post("/register", registerDoctor);
router.get("/getDoctors", getDoctors);

export default router;