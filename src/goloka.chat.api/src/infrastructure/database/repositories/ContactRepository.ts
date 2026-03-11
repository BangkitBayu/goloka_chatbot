import { PrismaClient } from '@prisma/client';
import { IContactRepository, CreateContactDTO } from '../../../domain/repositories/IContactRepository';
import { Contact } from '../../../domain/entities/Contact';
import { getPrismaClient } from '../prisma/prismaClient';

function mapToContact(r: any): Contact {
  return Contact.create(r.id, {
    userId: r.userId,
    name: r.name,
    phoneNumber: r.phoneNumber,
    groupTag: r.groupTag ?? null,
    createdAt: r.createdAt,
    updatedAt: r.updatedAt,
  });
}

/**
 * ContactRepository — Prisma implementation of IContactRepository.
 */
export class ContactRepository implements IContactRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = getPrismaClient();
  }

  async findById(id: string): Promise<Contact | null> {
    const r = await this.prisma.contact.findUnique({ where: { id } });
    return r ? mapToContact(r) : null;
  }

  async findByUserId(userId: string, groupTag?: string): Promise<Contact[]> {
    const records = await this.prisma.contact.findMany({
      where: { userId, ...(groupTag ? { groupTag } : {}) },
      orderBy: { name: 'asc' },
    });
    return records.map(mapToContact);
  }

  async save(data: CreateContactDTO): Promise<Contact> {
    const r = await this.prisma.contact.upsert({
      where: { userId_phoneNumber: { userId: data.userId, phoneNumber: data.phoneNumber } },
      create: {
        id: data.id,
        userId: data.userId,
        name: data.name,
        phoneNumber: data.phoneNumber,
        groupTag: data.groupTag ?? null,
      },
      update: { name: data.name, groupTag: data.groupTag ?? null },
    });
    return mapToContact(r);
  }

  async bulkSave(contacts: CreateContactDTO[]): Promise<number> {
    let count = 0;
    for (const contact of contacts) {
      await this.save(contact);
      count++;
    }
    return count;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.contact.delete({ where: { id } });
  }
}
