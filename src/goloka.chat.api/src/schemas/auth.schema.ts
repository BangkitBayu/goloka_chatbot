import { UserSchema } from "./user.schema.js";

export const LoginSchema = UserSchema.pick({
  email: true,
  password: true,
});

export const RegisterSchema = UserSchema;
