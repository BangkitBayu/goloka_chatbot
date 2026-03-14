import { type Request, type Response } from "express";
import { createNewUser, findUserByEmail } from "../services/userServices.js";
import { google } from "googleapis";
import { generateAccessToken } from "../utils/generateAccessToken.js";

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

export const handleOauth = async (req: Request, res: Response) => {
  res.redirect(authorizationUrl);
};

export const handleOauthCallback = async (req: Request, res: Response) => {
  const { code } = req.query;

  const { tokens } = await oauth2Client.getToken(code as string);

  oauth2Client.setCredentials(tokens);

  const oauth2 = google.oauth2({
    auth: oauth2Client,
    version: "v2",
  });

  const { data } = await oauth2.userinfo.get();

  if (!data)
    return res.status(404).json({
      status: "failed",
      message: "Failed to get data",
      data: data,
    });

  const existsUser = await findUserByEmail(data.email as string);

  if (!existsUser) {
    const newUser = await createNewUser({
      fullname: data.name as string,
      email: data.email as string,
      avatar: data.picture as string,
    });

    return res.status(201).json({
      status: "success",
      message: "User created",
      data: {
        id: (newUser as { id: number }).id, //memaksa ts untuk type casting id ke number
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

  const secret = process.env.JWT_SECRET as string;

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
};
