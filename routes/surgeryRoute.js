import express from "express";
import {
    createSurgery,
    getSurgeries
} from "../controllers/surgeryController.js";
const router = express.Router();
router.post("/create-surgery", createSurgery);
router.get("/get-surgeries", getSurgeries);
export default router;