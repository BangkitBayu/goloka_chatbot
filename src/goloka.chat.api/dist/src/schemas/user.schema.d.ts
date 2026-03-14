import * as z from "zod";
declare const NewUserSchema: z.ZodObject<{
    fullname: z.ZodString;
    company: z.ZodOptional<z.ZodString>;
    email: z.ZodEmail;
    password: z.ZodString;
}, z.core.$strip>;
declare const UserSchema: z.ZodObject<{
    fullname: z.ZodString;
    company: z.ZodOptional<z.ZodString>;
    email: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
export { NewUserSchema, UserSchema };
//# sourceMappingURL=user.schema.d.ts.map