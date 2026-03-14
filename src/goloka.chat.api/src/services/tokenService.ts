import crypto from "crypto";
import prisma from "../utils/prisma.js";
import { setNextDate } from "../utils/setNextDate.js";

export const storeNewRefreshToken = async (
  refreshToken: string,
  countDate: number,
  userId: number,
) => {
  const nextDate = setNextDate(countDate);
  const hashedRefreshToken = crypto
    .createHash("sha256")
    .update(refreshToken)
    .digest("hex");

  await prisma.refresh_Token.create({
    data: {
      token: hashedRefreshToken,
      createdAt: new Date(),
      expiredAt: new Date(setNextDate(countDate)),
      userId: userId,
    },
  });
};
