import express from "express";
import {
    registerDoctor
} from "../controllers/doctorController.js";
const router = express.Router();
router.post("/register", registerDoctor);

export default router;