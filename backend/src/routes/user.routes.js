import express from "express";
import {
  getAllUsers,
  getUserById,
  loginUser,
  logoutUser,
  refreshUserTokens,
  registerUser,
} from "../controllers/user.controller.js";
import AuthMiddleware from "../middlewares/auth.middleware.js";
import verifyRoles from "../middlewares/verifyRoles.middleware.js";

const router = express.Router();

router
  .route("/")
  .get(AuthMiddleware, verifyRoles("admin", "editor"), getAllUsers);

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/refresh-token").post(refreshUserTokens);
router.route("/logout").get(logoutUser);

router.route("/:id").get(AuthMiddleware, getUserById);

export default router;
