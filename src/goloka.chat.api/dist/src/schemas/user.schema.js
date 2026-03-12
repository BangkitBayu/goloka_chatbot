import * as z from "zod";
const NewUserSchema = z.object({
    fullname: z.string({ error: "Fullname must be filled" }),
    company: z.string().optional(),
    email: z.email(),
    password: z
        .string("Password must be filled")
        .min(8, { error: "Password min length 8" }),
});
export { NewUserSchema };
//# sourceMappingURL=user.schema.js.map