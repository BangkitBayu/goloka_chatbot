import * as z from "zod";
import { UserSchema } from "./user.schema.js";

export const LoginSchema = UserSchema.pick({
  email: true,
  password: true,
}).extend({
  keepLogged: z.boolean("Invalid value").default(false),
});

export const RegisterSchema = UserSchema;
