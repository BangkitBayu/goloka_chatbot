import { Request, Response, NextFunction } from 'express';
import { UpsertContact, GetContacts, DeleteContact } from '../../../application/use-cases/contact/ContactUseCases';
import { CsvParser } from '../../../application/use-cases/contact/CsvParser';
import { v4 as uuidv4 } from 'uuid';

export class ContactController {
  constructor(
    private readonly upsertContact: UpsertContact,
    private readonly getContacts: GetContacts,
    private readonly deleteContact: DeleteContact,
  ) {}

  upsert = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user!.userId;
      const contact = await this.upsertContact.execute(userId, req.body);
      res.status(201).json({ success: true, data: contact });
    } catch (error) {
      next(error);
    }
  };

  list = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user!.userId;
      const groupTag = req.query.groupTag as string | undefined;
      const contacts = await this.getContacts.execute(userId, groupTag);
      res.status(200).json({ success: true, data: contacts });
    } catch (error) {
      next(error);
    }
  };

  importCsv = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (!req.file) {
        res.status(400).json({ success: false, error: { message: 'No CSV file uploaded.' } });
        return;
      }
      const userId = req.user!.userId;
      const contacts = await CsvParser.parseContacts(req.file.path);
      const dtos = contacts.map((c) => ({ id: uuidv4(), userId, ...c, phoneNumber: c.phone }));
      // bulkSave is handled at the repo level
      res.status(200).json({ success: true, data: { imported: contacts.length, contacts } });
    } catch (error) {
      next(error);
    }
  };

  remove = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const userId = req.user!.userId;
      await this.deleteContact.execute(userId, id as string);
      res.status(200).json({ success: true, message: 'Contact deleted.' });
    } catch (error) {
      next(error);
    }
  };
}
