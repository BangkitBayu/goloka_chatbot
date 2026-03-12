import type { User } from "../types/user.type.js";
declare const createNewUser: (data: User) => Promise<number | {
    email: string;
    fullname: string;
    company: string | null;
    password: string;
    avatar: string | null;
    phoneNumber: string | null;
    id: number;
}>;
export { createNewUser };
//# sourceMappingURL=userServices.d.ts.map