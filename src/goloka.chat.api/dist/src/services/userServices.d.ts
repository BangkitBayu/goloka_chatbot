import type { User } from "../types/user.type.js";
declare const createNewUser: (data: User) => Promise<number | {
    password: string;
    email: string;
    fullname: string;
    company: string | null;
    avatar: string | null;
    phoneNumber: string | null;
    id: number;
}>;
declare const findUserByEmail: (email: string) => Promise<{
    password: string;
    email: string;
    fullname: string;
    company: string | null;
    avatar: string | null;
    phoneNumber: string | null;
    id: number;
} | null>;
export { createNewUser, findUserByEmail };
//# sourceMappingURL=userServices.d.ts.map