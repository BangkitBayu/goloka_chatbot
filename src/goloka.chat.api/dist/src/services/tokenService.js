var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import crypto from "crypto";
import prisma from "../utils/prisma.js";
import { setNextDate } from "../utils/setNextDate.js";
export const storeNewRefreshToken = (refreshToken, countDate, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedRefreshToken = crypto
        .createHash("sha256")
        .update(refreshToken)
        .digest("hex");
    yield prisma.refresh_Token.create({
        data: {
            token: hashedRefreshToken,
            createdAt: new Date(),
            expiredAt: new Date(setNextDate(countDate)),
            userId: userId,
        },
    });
});
export const checkStoredToken = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.refresh_Token.count({
        where: {
            userId: userId,
        },
    });
});
//# sourceMappingURL=tokenService.js.map