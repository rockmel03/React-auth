import express from "express";
import {
  getAllUsers,
  getUserById,
  loginUser,
  refreshUserTokens,
  registerUser,
} from "../controllers/user.controller.js";
import AuthMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route("/").get(AuthMiddleware, getAllUsers);

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/refresh-token").post(refreshUserTokens);

router.route("/:id").get(AuthMiddleware, getUserById);

export default router;
