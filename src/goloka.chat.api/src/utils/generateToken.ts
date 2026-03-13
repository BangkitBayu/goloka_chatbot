import jwt from "jsonwebtoken";

export const generateToken = (payload: object, secret: string, expiresIn: string) => {
  return jwt.sign(payload, secret, {
    expiresIn,
  });
};
