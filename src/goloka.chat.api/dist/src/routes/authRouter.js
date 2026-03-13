import express, {} from "express";
const app = express();
const router = app.router;
import { handleSignup } from "../controllers/authController.js";
import { handleOauthCallback, handleOauth, } from "../controllers/googleOauthController.js";
router.post("/signup", handleSignup);
// Oauth route
router.get("/", handleOauth);
router.get("/callback", handleOauthCallback);
export default router;
//# sourceMappingURL=authRouter.js.map