import express from "express";
const router = express.Router();
import {
    registerAdmin
} from "../controllers/adminController.js";

router.post("/register", registerAdmin);
export default router;