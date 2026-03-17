import { v4 as uuidv4 } from 'uuid';
import { IContactRepository } from '../../../domain/repositories/IContactRepository';
import { NotFoundError } from '../../../domain/errors/AppError';
import { UpsertContactRequest } from '../../dtos';
import { Contact } from '../../../domain/entities/Contact';

export class UpsertContact {
  constructor(private readonly contactRepository: IContactRepository) {}

  async execute(userId: string, request: UpsertContactRequest): Promise<Contact> {
    return this.contactRepository.save({
      id: uuidv4(),
      userId,
      name: request.name,
      phoneNumber: request.phoneNumber,
      groupTag: request.groupTag ?? null,
    });
  }
}

export class GetContacts {
  constructor(private readonly contactRepository: IContactRepository) {}

  async execute(userId: string, groupTag?: string): Promise<Contact[]> {
    return this.contactRepository.findByUserId(userId, groupTag);
  }
}

export class DeleteContact {
  constructor(private readonly contactRepository: IContactRepository) {}

  async execute(userId: string, contactId: string): Promise<void> {
    const contact = await this.contactRepository.findById(contactId);
    if (!contact) throw new NotFoundError('Contact');
    if (contact.userId !== userId) throw new NotFoundError('Contact');
    await this.contactRepository.delete(contactId);
  }
}
