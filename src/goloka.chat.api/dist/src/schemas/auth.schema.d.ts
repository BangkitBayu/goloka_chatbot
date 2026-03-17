import * as z from "zod";
export declare const LoginSchema: z.ZodObject<{
    password: z.ZodString;
    email: z.ZodString;
    keepLogged: z.ZodDefault<z.ZodBoolean>;
}, z.core.$strip>;
export declare const RegisterSchema: z.ZodObject<{
    fullname: z.ZodString;
    company: z.ZodOptional<z.ZodString>;
    email: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
//# sourceMappingURL=auth.schema.d.ts.map