import * as z from "zod";
const NewUserSchema = z.object({
    fullname: z.string({ error: "Fullname must be filled" }),
    company: z.string().optional(),
    email: z.email(),
    password: z
        .string("Password must be filled")
        .min(8, { error: "Password min length 8" }),
});
const UserSchema = z.object({
    fullname: z.string({ error: "Fullname must be filled" }),
    company: z.string().optional(),
    email: z.string("Email must be filled").email(),
    password: z
        .string("Password must be filled")
        .min(8, { error: "Password min length 8" }),
});
export { NewUserSchema, UserSchema };
//# sourceMappingURL=user.schema.js.map