import express from "express";
const router = express.Router();
import {
    registerDoctor
} from "../controllers/doctorController.js";

router.post("/register", registerDoctor);

export default router;