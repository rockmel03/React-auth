import express from "express";
import {
  getAllUsers,
  getUserById,
  loginUser,
  registerUser,
} from "../controllers/user.controller";

const router = express.Router();

router.route("/").get(getAllUsers);

router.route("/register").post(registerUser);
router.route("/login").get(loginUser);

router.route("/:id").get(getUserById);

export default router;
