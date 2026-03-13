import express, {} from "express";
const app = express();
const router = app.router;
// Untuk security batasi ip yng sering request
import { handleLogin, handleRegister } from "../controllers/authController.js";
import { handleOauthCallback, handleOauth, } from "../controllers/googleOauthController.js";
import reqLimiter from "../utils/rateLimiter.js";
router.post("/register", handleRegister);
router.post("/login", reqLimiter, handleLogin);
// Oauth route
router.get("/", handleOauth);
router.get("/callback", handleOauthCallback);
export default router;
//# sourceMappingURL=authRouter.js.map