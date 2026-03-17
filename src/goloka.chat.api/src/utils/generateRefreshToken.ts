import crypto from "crypto";

export const generateRefreshToken = (size: number, encoding: string) => {
  return crypto.randomBytes(size).toString(encoding as BufferEncoding);
};
