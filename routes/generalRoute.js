import express from "express";
import {
    loginUser
} from "../controllers/loginController.js";
import {
    confirm
} from "../controllers/confirmUserController.js";
import {
    JWTValidator
} from "../helpers/JWTValidator.js";
import {
    getDepartments
} from "../controllers/departmentController.js";
import {
    passwordRecovery,
    newPassword
} from "../controllers/passwordRecoveryController.js";
const router = express.Router();

router.post("/login", loginUser);
router.get("/confirm/:token", confirm);
router.get("/JWTValidator/:jwtToken", JWTValidator);
router.get("/departments", getDepartments);
router.post("/passwordRecovery", passwordRecovery);
router.post("/newPassword", newPassword);
export default router;