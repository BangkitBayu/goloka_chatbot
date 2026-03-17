import jwt from 'jsonwebtoken';
import { IUserRepository } from '../../../domain/repositories/IUserRepository';
import { Password } from '../../../domain/value-objects/Password';
import { UnauthorizedError } from '../../../domain/errors/AppError';
import { LoginUserRequest, LoginUserResponse } from '../../dtos';

/**
 * LoginUser Use Case
 * Verifies credentials and returns a signed JWT token.
 */
export class LoginUser {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(request: LoginUserRequest): Promise<LoginUserResponse> {
    // 1. Find user by email
    const user = await this.userRepository.findByEmail(request.email);
    if (!user) {
      throw new UnauthorizedError('Invalid email or password.');
    }

    // 2. Check account active
    if (!user.isActive) {
      throw new UnauthorizedError('Your account has been deactivated.');
    }

    // 3. Verify password
    const password = Password.fromHashed(user.password);
    const isValid = await password.compare(request.password);
    if (!isValid) {
      throw new UnauthorizedError('Invalid email or password.');
    }

    // 4. Sign JWT
    const secret = process.env.JWT_SECRET!;
    const expiresIn = (process.env.JWT_EXPIRES_IN || '7d') as jwt.SignOptions['expiresIn'];
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role, quota: user.quota, name: user.name },
      secret,
      { expiresIn },
    );

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        quota: user.quota,
      },
    };
  }
}
