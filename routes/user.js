import express from "express";
import { authenticateToken } from "./userAuth.js";
import {
  signUp,
  signIn,
  getUserInfo,
  updateAddress,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/sign-up", signUp);
router.post("/sign-in", signIn);
router.get("/get-user-information", authenticateToken, getUserInfo);
router.put("/update-address", authenticateToken, updateAddress);

export default router;
