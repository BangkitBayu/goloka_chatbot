import { type Request, type Response } from "express";
import { NewUserSchema } from "../schemas/user.schema.js";
import { createNewUser } from "../services/userServices.js";

const handleSignup = async (req: Request, res: Response) => {
  const payload = NewUserSchema.safeParse(req.body);
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

  return res
    .status(201)
    .json({
      status: "success",
      message: "User created",
      data: user,
    })
};

export { handleSignup };
