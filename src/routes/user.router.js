import { Router } from "express";
import UserController from "../controllers/user.controller.js";
import {
  registerAuth,
  loginAuth,
  jwtAuth,
} from "../middlewares/passportAuth.middleware.js";

const router = Router();

router.post("/register", registerAuth, UserController.register);
router.post("/login", loginAuth, UserController.login);
router.get("/current", jwtAuth, UserController.current);

router.get("/check", UserController.checkEmail);
router.get("/logout", UserController.logout);
router.post("/update", UserController.updatePassword);

router.post("/forgot", UserController.sendRecoveryMail);
router.post("/reset", UserController.resetPassword);

export default router;
