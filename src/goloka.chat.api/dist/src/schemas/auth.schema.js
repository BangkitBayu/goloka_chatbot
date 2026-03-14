import { UserSchema } from "./user.schema.js";
export const LoginSchema = UserSchema.pick({
    email: true,
    password: true,
});
//# sourceMappingURL=auth.schema.js.map