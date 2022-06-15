import express from "express";
import {
    loginUser
} from "../controllers/loginController.js";
import {
    confirm
} from "../controllers/confirmUserController.js";
import {
    JWTValidator
} from "../controllers/JWTValidator.js";
const router = express.Router();

router.post("/login", loginUser);
router.get("/confirm/:token", confirm);
router.get("/JWTValidator/:jwtToken", JWTValidator)
export default router;