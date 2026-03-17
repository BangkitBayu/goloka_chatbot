import * as z from "zod";
export declare const UserSchema: z.ZodObject<{
    fullname: z.ZodString;
    company: z.ZodOptional<z.ZodString>;
    email: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
//# sourceMappingURL=user.schema.d.ts.map