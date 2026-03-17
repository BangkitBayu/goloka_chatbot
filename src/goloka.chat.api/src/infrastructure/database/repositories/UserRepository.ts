import { PrismaClient } from '@prisma/client';
import { IUserRepository, CreateUserDTO } from '../../../domain/repositories/IUserRepository';
import { User } from '../../../domain/entities/User';
import { getPrismaClient } from '../prisma/prismaClient';

function mapToUser(record: {
  id: string;
  email: string;
  password: string;
  name: string;
  role: 'ADMIN' | 'USER';
  quota: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}): User {
  return User.create(record.id, {
    email: record.email,
    password: record.password,
    name: record.name,
    role: record.role,
    quota: record.quota,
    isActive: record.isActive,
    createdAt: record.createdAt,
    updatedAt: record.updatedAt,
  });
}

/**
 * UserRepository — Prisma implementation of IUserRepository.
 * Lives in Infrastructure layer. Knows about Prisma, not referenced by domain.
 */
export class UserRepository implements IUserRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = getPrismaClient();
  }

  async findById(id: string): Promise<User | null> {
    const record = await this.prisma.user.findUnique({ where: { id } });
    return record ? mapToUser(record) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const record = await this.prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });
    return record ? mapToUser(record) : null;
  }

  async save(data: CreateUserDTO): Promise<User> {
    const record = await this.prisma.user.create({
      data: {
        id: data.id,
        email: data.email.toLowerCase().trim(),
        password: data.password,
        name: data.name,
        role: 'USER',
        quota: 100,
        isActive: true,
      },
    });
    return mapToUser(record);
  }

  async updateQuota(userId: string, quota: number): Promise<void> {
    await this.prisma.user.update({
      where: { id: userId },
      data: { quota },
    });
  }

  async existsByEmail(email: string): Promise<boolean> {
    const count = await this.prisma.user.count({
      where: { email: email.toLowerCase().trim() },
    });
    return count > 0;
  }
}
