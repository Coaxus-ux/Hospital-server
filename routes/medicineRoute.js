import express from "express";
import { createMedicine, getMedicines, updateMedicine } from "../controllers/MedicineController.js";
const router = express.Router();
router.post("/create-medicine", createMedicine);
router.get("/get-medicine", getMedicines);
router.put("/update-medicine", updateMedicine);
export default router;