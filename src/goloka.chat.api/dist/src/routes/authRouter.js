import express, {} from "express";
const app = express();
const router = app.router;
import { handleSignup } from "../controllers/authController.js";
router.post("/signup", handleSignup);
export default router;
//# sourceMappingURL=authRouter.js.map