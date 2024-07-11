import express from "express";
import auth from "../middlewares/auth.js";
import {
  register,
  login,
  refreshToken,
  logout,
  logoutAll,
} from "../controllers/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refresh-token", refreshToken);
router.post("/logout", auth, logout);
router.post("/logoutAll", auth, logoutAll);

export default router;
