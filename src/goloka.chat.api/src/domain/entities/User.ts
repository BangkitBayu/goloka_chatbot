import { Entity } from '../base/Entity';
import { Email } from '../value-objects/Email';
import { QuotaExceededError } from '../errors/AppError';

export type UserRole = 'ADMIN' | 'USER';

export interface UserProps {
  email: string;
  password: string;
  name: string;
  role: UserRole;
  quota: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * User Domain Entity
 * Contains identity and business rules around the user.
 */
export class User extends Entity<string> {
  private _email: Email;
  private _password: string;
  private _name: string;
  private _role: UserRole;
  private _quota: number;
  private _isActive: boolean;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  private constructor(id: string, props: UserProps) {
    super(id);
    this._email = Email.create(props.email);
    this._password = props.password;
    this._name = props.name;
    this._role = props.role;
    this._quota = props.quota;
    this._isActive = props.isActive;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  static create(id: string, props: UserProps): User {
    return new User(id, props);
  }

  /** Business rule: check if user still has blast quota */
  hasQuota(needed = 1): boolean {
    return this._isActive && this._quota >= needed;
  }

  /** Decrements quota — throws if insufficient */
  decrementQuota(amount = 1): void {
    if (!this.hasQuota(amount)) {
      throw new QuotaExceededError();
    }
    this._quota -= amount;
  }

  get email(): string {
    return this._email.value;
  }
  get password(): string {
    return this._password;
  }
  get name(): string {
    return this._name;
  }
  get role(): UserRole {
    return this._role;
  }
  get quota(): number {
    return this._quota;
  }
  get isActive(): boolean {
    return this._isActive;
  }
}
