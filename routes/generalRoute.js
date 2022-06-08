import express from "express";
const router = express.Router();
import {
    loginUser
} from "../controllers/loginController.js";
import {
    confirm
} from "../controllers/ConfirmUserController.js";

router.post("/login", loginUser);
router.get("/confirm/:token", confirm);
export default router;