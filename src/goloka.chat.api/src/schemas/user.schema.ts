import * as z from "zod";

export const UserSchema = z.object({
  fullname: z.string({ error: "Fullname must be filled" }),
  company: z.string().optional(),
  email: z.string("Email must be filled").email(),
  password: z
    .string("Password must be filled")
    .min(8, { error: "Password min length 8" }),
});
