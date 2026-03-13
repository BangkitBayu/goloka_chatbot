import type { User } from "../types/user.type.js";
import { hashPassword } from "../utils/password.js";
import prisma from "../utils/prisma.js";

const createNewUser = async (data: User) => {
  const { fullname, company, email, password, avatar } = data;

  const existEmail = await prisma.user.count({
    where: { email: email as string },
  });

  if (existEmail > 0) {
    return existEmail;
  }

  const hashedPassword = password ? await hashPassword(password) : "";

  return await prisma.user.create({
    data: {
      fullname: fullname as string,
      company: company as string,
      email: email as string,
      password: hashedPassword,
      avatar: avatar as string,
    },
  });
};

const findUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
};

export { createNewUser, findUserByEmail };
