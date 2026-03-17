import type { User } from "../types/user.type.js";
declare const createNewUser: (data: User) => Promise<{
    email: string;
    fullname: string;
    company: string;
    password: string;
    id: number;
}>;
export { createNewUser };
//# sourceMappingURL=userServices.d.ts.map