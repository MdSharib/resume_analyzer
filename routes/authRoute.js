import express from "express";
import {
  registerController,
  loginController,
  VerifyMail,
  historyController
} from "../controllers/authController.js";

//router object
const router = express.Router();

//routing
router.post("/register", registerController);

//LOGIN || POST
router.post("/login", loginController);
router.get("/verify/:id", VerifyMail);
router.get("/history", historyController);

export default router;
