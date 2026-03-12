import type { User } from "../types/user.type.js";
import { hashPassword } from "../utils/password.js";
import prisma from "../utils/prisma.js";

const createNewUser = async (data: User) => {
  const { fullname, company, email, password } = data;

  const existEmail = await prisma.user.count({
    where: { email: email },
  });

  if(existEmail > 0) {
    return existEmail
  }

  const hashedPassword = await hashPassword(password);

  return await prisma.user.create({
    data: {
      fullname: fullname as string,
      company: company as string,
      email: email as string,
      password: hashedPassword,
    },
  });
};

export { createNewUser };
