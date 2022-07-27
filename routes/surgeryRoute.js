import express from "express";
import {
    createSurgery,
    getSurgeries,
    updateSurgery
} from "../controllers/surgeryController.js";
const router = express.Router();
router.post("/create-surgery", createSurgery);
router.get("/get-surgeries", getSurgeries);
router.post("/update-surgery", updateSurgery);
export default router;