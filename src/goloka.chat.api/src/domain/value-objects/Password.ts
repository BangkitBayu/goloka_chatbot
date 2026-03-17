import bcrypt from 'bcryptjs';
import { AppError } from '../errors/AppError';

/**
 * Password Value Object — handles hashing and verification.
 */
export class Password {
  private readonly _hashed: string;
  private readonly _isAlreadyHashed: boolean;

  private constructor(value: string, isAlreadyHashed: boolean) {
    this._hashed = value;
    this._isAlreadyHashed = isAlreadyHashed;
  }

  static create(plainText: string): Password {
    if (plainText.length < 8) {
      throw new AppError('Password must be at least 8 characters long.', 400);
    }
    return new Password(plainText, false);
  }

  static fromHashed(hashed: string): Password {
    return new Password(hashed, true);
  }

  async getHashedValue(): Promise<string> {
    if (this._isAlreadyHashed) return this._hashed;
    return bcrypt.hash(this._hashed, 12);
  }

  async compare(plainText: string): Promise<boolean> {
    const hashed = await this.getHashedValue();
    return bcrypt.compare(plainText, hashed);
  }
}
