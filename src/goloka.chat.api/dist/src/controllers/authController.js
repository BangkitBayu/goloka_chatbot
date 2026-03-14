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
import { createNewUser, findUserByEmail } from "../services/userServices.js";
import { LoginSchema, RegisterSchema } from "../schemas/auth.schema.js";
import { verifyPassword } from "../utils/password.js";
import { generateAccessToken } from "../utils/generateAccessToken.js";
import { generateRefreshToken } from "../utils/generateRefreshToken.js";
import { checkStoredToken, storeNewRefreshToken, } from "../services/tokenService.js";
import cookieParser from "cookie-parser";
const handleRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = RegisterSchema.safeParse(req.body);
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
    const payload = LoginSchema.safeParse(req.body);
    if (!payload.success)
        return res
            .status(422)
            .json({ status: "error", errors: payload.error.flatten() });
    const user = yield findUserByEmail(payload.data.email);
    if (!user)
        return res.status(404).json({ status: "error", message: "User not found" });
    if (user.password !== "" &&
        (yield verifyPassword(user.password, req.body.password)) !== true)
        return res
            .status(422)
            .json({ status: "error", message: "Incorrect password" });
    const newRefreshToken = generateRefreshToken(32, "hex");
    //Opsi 1:  user tidak pilih login 30 hari
    if (!payload.data.keepLogged) {
        const newAccessToken = generateAccessToken({
            id: user.id,
            fullname: user.fullname,
            email: user.email,
        }, process.env.JWT_SECRET, `${15 * 60}`);
        const existsToken = yield checkStoredToken(user.id);
        if (existsToken == 1) {
            res.cookie("refreshToken", newRefreshToken, {
                maxAge: 86400, //1 hari,
                httpOnly: true,
                sameSite: true,
                secure: true,
            });
            return res.status(200).json({
                status: "success",
                message: "Login success",
                data: {
                    access_token: newAccessToken,
                    token_type: "Bearer",
                    expires_in: 15 * 60,
                    user: {
                        id: user.id,
                        fullname: user.fullname,
                        email: user.email,
                    },
                },
            });
        }
        try {
            yield storeNewRefreshToken(newRefreshToken, 1, user.id);
            res.cookie("refreshToken", newRefreshToken, {
                maxAge: 86400, //1 hari,
                httpOnly: true,
                sameSite: true,
                secure: true,
            });
            return res.status(200).json({
                status: "success",
                message: "Login success",
                data: {
                    access_token: newAccessToken,
                    token_type: "Bearer",
                    expires_in: 15 * 60,
                    user: {
                        id: user.id,
                        fullname: user.fullname,
                        email: user.email,
                    },
                },
            });
        }
        catch (error) {
            return res.status(500).json({
                status: "error",
                message: "Invalid request",
            });
        }
    }
    //Opsi 2: ketika user tetap login 30 hari
    const newAccessToken = generateAccessToken({
        id: user.id,
        fullname: user.fullname,
        email: user.email,
    }, process.env.JWT_SECRET, `${15 * 60}`);
    const existsToken = yield checkStoredToken(user.id);
    if (existsToken == 1) {
        res.cookie("refreshToken", newRefreshToken, {
            maxAge: 2592000, //30 hari,
            httpOnly: true,
            sameSite: true,
            secure: true,
        });
        return res.status(200).json({
            status: "success",
            message: "Login success",
            data: {
                access_token: newAccessToken,
                token_type: "Bearer",
                expires_in: 15 * 60,
                user: {
                    id: user.id,
                    fullname: user.fullname,
                    email: user.email,
                },
            },
        });
    }
    try {
        yield storeNewRefreshToken(newRefreshToken, 30, user.id);
        res.cookie("refreshToken", newRefreshToken, {
            maxAge: 2592000, //30 hari,
            httpOnly: true,
            sameSite: true,
            secure: true,
        });
        return res.status(200).json({
            status: "success",
            message: "Login success",
            data: {
                access_token: newAccessToken,
                token_type: "Bearer",
                expires_in: 15 * 60,
                user: {
                    id: user.id,
                    fullname: user.fullname,
                    email: user.email,
                },
            },
        });
    }
    catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Invalid request",
        });
    }
});
export { handleRegister, handleLogin };
//# sourceMappingURL=authController.js.map