import express from "express";
import { createMedicine, getMedicines } from "../controllers/MedicineController.js";
const router = express.Router();
router.post("/create-medicine", createMedicine);
router.get("/get-medicine", getMedicines);
export default router;