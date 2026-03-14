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
import { google } from "googleapis";
import { generateAccessToken } from "../utils/generateAccessToken.js";
const oauth2Client = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, "http://localhost:5000/auth/google/callback");
const scopes = [
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
];
const authorizationUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
    include_granted_scopes: true,
});
export const handleOauth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.redirect(authorizationUrl);
});
export const handleOauthCallback = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code } = req.query;
    const { tokens } = yield oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    const oauth2 = google.oauth2({
        auth: oauth2Client,
        version: "v2",
    });
    const { data } = yield oauth2.userinfo.get();
    if (!data)
        return res.status(404).json({
            status: "failed",
            message: "Failed to get data",
            data: data,
        });
    const existsUser = yield findUserByEmail(data.email);
    if (!existsUser) {
        const newUser = yield createNewUser({
            fullname: data.name,
            email: data.email,
            avatar: data.picture,
        });
        return res.status(201).json({
            status: "success",
            message: "User created",
            data: {
                id: newUser.id, //memaksa ts untuk type casting id ke number
                fullname: data.name,
                email: data.email,
            },
        });
    }
    const payload = {
        id: existsUser.id,
        fullname: existsUser.fullname,
        email: existsUser.email,
    };
    const secret = process.env.JWT_SECRET;
    const token = generateAccessToken(payload, secret, "2d");
    return res.status(200).json({
        status: "success",
        message: "Login success",
        data: {
            id: existsUser.id,
            fullname: existsUser.fullname,
            email: existsUser.email,
        },
        token,
    });
    // return res
    //   .status(200)
    //   .redirect(`http://localhost:5000/auth-success?token=${token}`); ini skenario jika frontend redirect ke halaman sukses jika user berhasil login
});
//# sourceMappingURL=googleOauthController.js.map