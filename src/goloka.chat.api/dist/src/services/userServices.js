var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { hashPassword } from "../utils/password.js";
import prisma from "../utils/prisma.js";
const createNewUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { fullname, company, email, password } = data;
    const existEmail = yield prisma.user.count({
        where: { email: email },
    });
    if (existEmail > 0) {
        return existEmail;
    }
    const hashedPassword = yield hashPassword(password);
    return yield prisma.user.create({
        data: {
            fullname: fullname,
            company: company,
            email: email,
            password: hashedPassword,
        },
    });
});
export { createNewUser };
//# sourceMappingURL=userServices.js.map