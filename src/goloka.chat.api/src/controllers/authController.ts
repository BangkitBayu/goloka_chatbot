import { type Request, type Response } from "express";
import { createNewUser } from "../services/userServices.js";
import { LoginSchema, RegisterSchema } from "../schemas/auth.schema.js";

const handleRegister = async (req: Request, res: Response) => {
  const payload = RegisterSchema.safeParse(req.body);
  if (!payload.success)
    return res
      .status(422)
      .json({ status: "error", errors: payload.error.flatten() });

  const user = await createNewUser(payload.data);

  if (user == 1) {
    return res.status(409).json({
      status: "failed",
      message: "Email already exist",
    });
  }

  return res.status(201).json({
    status: "success",
    message: "User created",
    data: user,
  });
};

const handleLogin = async (req: Request, res: Response) => {
  const payload = LoginSchema.safeParse(req.body);
  if (!payload.success)
    return res
      .status(422)
      .json({ status: "error", errors: payload.error.flatten() });

  res.json(req.body);
};

export { handleRegister, handleLogin };
