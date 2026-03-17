import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parser';
import { PhoneNumber } from '../../../domain/value-objects/PhoneNumber';

export interface CsvContact {
  name: string;
  phone: string;
  groupTag?: string;
}

/**
 * CsvParser — Parses a CSV file of contacts and returns valid phone numbers.
 * Expected CSV columns: name, phone, groupTag (optional)
 */
export class CsvParser {
  static parseContacts(filePath: string): Promise<CsvContact[]> {
    return new Promise((resolve, reject) => {
      const results: CsvContact[] = [];

      fs.createReadStream(filePath)
        .pipe(parse({ headers: true, trim: true }))
        .on('data', (row: Record<string, string>) => {
          const rawPhone = row['phone'] || row['Phone'] || row['phoneNumber'] || '';
          const name = row['name'] || row['Name'] || 'Unknown';
          const groupTag = row['groupTag'] || row['group_tag'] || undefined;

          try {
            const phoneVO = PhoneNumber.create(rawPhone);
            results.push({ name, phone: phoneVO.value, groupTag });
          } catch {
            // Skip invalid phone numbers
          }
        })
        .on('end', () => resolve(results))
        .on('error', reject);
    });
  }

  /** Extract just the phone numbers from parsed contacts */
  static extractPhones(contacts: CsvContact[]): string[] {
    return contacts.map((c) => c.phone);
  }
}
