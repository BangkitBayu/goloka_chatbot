import jwt from "jsonwebtoken";

export const generateAccessToken = (payload: object, secret: string, expiresIn: string) => {
  return jwt.sign(payload, secret, {
    expiresIn,
  });
};
