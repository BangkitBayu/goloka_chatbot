import express, { type Request, type Response } from "express";
const app = express();
const router = app.router;

import { handleSignup } from "../controllers/authController.js";
import { handleOauthSignup } from "../controllers/googleOauthController.js";

router.post("/signup", handleSignup);
router.get("/" ,handleOauthSignup );

export default router;
