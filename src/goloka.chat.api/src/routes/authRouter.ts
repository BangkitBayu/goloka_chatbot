import express, { type Request, type Response } from "express";
const app = express();
const router = app.router;

import { handleSignup } from "../controllers/authController.js";
import {
  handleOauthCallback,
  handleOauth,
} from "../controllers/googleOauthController.js";

router.post("/signup", handleSignup);
router.get("/", handleOauth);
router.get("/callback", handleOauthCallback);

export default router;
