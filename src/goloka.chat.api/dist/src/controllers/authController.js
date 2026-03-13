var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import {} from "express";
import { NewUserSchema } from "../schemas/user.schema.js";
import { createNewUser } from "../services/userServices.js";
const handleRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = NewUserSchema.safeParse(req.body);
    if (!payload.success)
        return res
            .status(422)
            .json({ status: "error", errors: payload.error.flatten() });
    const user = yield createNewUser(payload.data);
    if (user == 1) {
        return res.status(409).json({
            status: "failed",
            message: "Email already exist",
        });
    }
    return res.status(201).json({
        status: "success",
        message: "User created",
        data: user,
    });
});
const handleLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json("success");
});
export { handleRegister, handleLogin };
//# sourceMappingURL=authController.js.map