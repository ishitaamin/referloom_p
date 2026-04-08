// src/routes/authRoutes.js
import express from "express";
import { register, login } from "../controllers/authController.js";
import upload from "../middlewares/upload.js";
const router = express.Router();

router.post(
  "/register",
  upload.fields([
    { name: "degreeProof", maxCount: 1 },
    { name: "idProof", maxCount: 1 },
  ]),
  register
);
router.post("/login", login);

export default router;
