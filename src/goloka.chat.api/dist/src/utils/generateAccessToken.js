import jwt from "jsonwebtoken";
export const generateAccessToken = (payload, secret, expiresIn) => {
    return jwt.sign(payload, secret, {
        expiresIn,
    });
};
//# sourceMappingURL=generateAccessToken.js.map