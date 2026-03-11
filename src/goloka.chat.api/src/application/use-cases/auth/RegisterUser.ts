import { v4 as uuidv4 } from 'uuid';
import { IUserRepository } from '../../../domain/repositories/IUserRepository';
import { Password } from '../../../domain/value-objects/Password';
import { ConflictError } from '../../../domain/errors/AppError';
import { RegisterUserRequest, RegisterUserResponse } from '../../dtos';

/**
 * RegisterUser Use Case
 * Validates email uniqueness, hashes password, stores new user.
 */
export class RegisterUser {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(request: RegisterUserRequest): Promise<RegisterUserResponse> {
    // 1. Check email uniqueness
    const emailExists = await this.userRepository.existsByEmail(request.email);
    if (emailExists) {
      throw new ConflictError(`Email "${request.email}" is already registered.`);
    }

    // 2. Hash password via Password value object
    const password = Password.create(request.password);
    const hashedPassword = await password.getHashedValue();

    // 3. Persist user
    const user = await this.userRepository.save({
      id: uuidv4(),
      email: request.email,
      password: hashedPassword,
      name: request.name,
    });

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      quota: user.quota,
    };
  }
}
