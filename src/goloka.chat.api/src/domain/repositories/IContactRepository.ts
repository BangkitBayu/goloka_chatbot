import { Contact } from '../entities/Contact';

export interface CreateContactDTO {
  id: string;
  userId: string;
  name: string;
  phoneNumber: string;
  groupTag?: string | null;
}

/**
 * IContactRepository — domain contract for contact persistence.
 */
export interface IContactRepository {
  findById(id: string): Promise<Contact | null>;
  findByUserId(userId: string, groupTag?: string): Promise<Contact[]>;
  save(data: CreateContactDTO): Promise<Contact>;
  bulkSave(contacts: CreateContactDTO[]): Promise<number>;
  delete(id: string): Promise<void>;
}
