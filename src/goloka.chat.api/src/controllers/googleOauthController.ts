import { type Request, type Response } from "express";
import { NewUserSchema } from "../schemas/user.schema.js";
import { createNewUser } from "../services/userServices.js";
import { google } from "googleapis";

const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  "http://localhost:5000/auth/google/callback",
);

const scopes = [
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/userinfo.profile",
];

const authorizationUrl = oauth2Client.generateAuthUrl({
  access_type: "offline",
  scope: scopes,
  include_granted_scopes: true,
});

export const handleOauthSignup = async (req: Request, res: Response) => {
  res.redirect(authorizationUrl);
};
