import express from "express";
import { register, login, updateUser } from "../controllers/authController.js";
import authencticateUser from "../middleware/auth.js";
const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
// router.route("/login").get(login);
router.route("/updateUser").patch(authencticateUser, updateUser);

export default router;
