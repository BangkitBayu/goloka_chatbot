import express, { type Request, type Response } from "express";
const app = express();
const router = app.router;

import { handleRegister } from "../controllers/authController.js";
import {
  handleOauthCallback,
  handleOauth,
} from "../controllers/googleOauthController.js";

router.post("/register", handleRegister);
router.post("/login")

// Oauth route
router.get("/", handleOauth);
router.get("/callback", handleOauthCallback);

export default router;
