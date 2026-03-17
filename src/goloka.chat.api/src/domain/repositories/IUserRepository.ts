import { User } from '../entities/User';

export interface CreateUserDTO {
  id: string;
  email: string;
  password: string;
  name: string;
}

/**
 * IUserRepository — domain contract for user persistence.
 * Implemented by UserRepository in infrastructure layer.
 */
export interface IUserRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  save(user: CreateUserDTO): Promise<User>;
  updateQuota(userId: string, quota: number): Promise<void>;
  existsByEmail(email: string): Promise<boolean>;
}
