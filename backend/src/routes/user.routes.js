import express from "express";
import {
  getAllUsers,
  getUserById,
  loginUser,
  registerUser,
} from "../controllers/user.controller.js";

const router = express.Router();

router.route("/").get(getAllUsers);

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

router.route("/:id").get(getUserById);

export default router;
