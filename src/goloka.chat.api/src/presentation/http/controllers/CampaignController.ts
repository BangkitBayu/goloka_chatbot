import { Request, Response, NextFunction } from 'express';
import { CreateCampaign } from '../../../application/use-cases/campaign/CreateCampaign';
import { SendBlastMessage } from '../../../application/use-cases/campaign/SendBlastMessage';
import { ICampaignRepository } from '../../../domain/repositories/ICampaignRepository';
import { NotFoundError, ForbiddenError } from '../../../domain/errors/AppError';
import { CsvParser } from '../../../application/use-cases/contact/CsvParser';

export class CampaignController {
  constructor(
    private readonly createCampaign: CreateCampaign,
    private readonly sendBlastMessage: SendBlastMessage,
    private readonly campaignRepository: ICampaignRepository,
  ) {}

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user!.userId;
      const campaign = await this.createCampaign.execute(userId, req.body);
      res.status(201).json({ success: true, data: campaign });
    } catch (error) {
      next(error);
    }
  };

  list = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user!.userId;
      const campaigns = await this.campaignRepository.findByUserId(userId);
      res.status(200).json({ success: true, data: campaigns });
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const campaignId = id as string; 
      const userId = req.user!.userId;
      const campaign = await this.campaignRepository.findById(campaignId);
      if (!campaign) throw new NotFoundError("Campaign");
      if (campaign.userId !== userId) throw new ForbiddenError();
      res.status(200).json({ success: true, data: campaign });
    } catch (error) {
      next(error);
    }
  };

  send = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const userId = req.user!.userId;

      // If CSV file uploaded, parse recipients from it
      let recipients: string[] = req.body.recipients || [];
      if (req.file) {
        const contacts = await CsvParser.parseContacts(req.file.path);
        recipients = [...recipients, ...CsvParser.extractPhones(contacts)];
      }

      const result = await this.sendBlastMessage.execute(userId, {
        campaignId: id as string,
        recipients,
        groupTag: req.body.groupTag,
      });

      res.status(200).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  };
}
