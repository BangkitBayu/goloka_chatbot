import express, {} from "express";
const app = express();
const router = app.router;
import { handleSignup } from "../controllers/authController.js";
import { handleOauthCallback, handleOauthSignup } from "../controllers/googleOauthController.js";
router.post("/signup", handleSignup);
router.get("/", handleOauthSignup);
router.get("/callback", handleOauthCallback);
export default router;
//# sourceMappingURL=authRouter.js.map