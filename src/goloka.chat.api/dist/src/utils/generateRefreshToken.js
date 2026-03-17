import crypto from "crypto";
export const generateRefreshToken = (size, encoding) => {
    return crypto.randomBytes(size).toString(encoding);
};
//# sourceMappingURL=generateRefreshToken.js.map