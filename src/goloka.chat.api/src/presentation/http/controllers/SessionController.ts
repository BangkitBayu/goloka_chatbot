import { Request, Response, NextFunction } from 'express';
import { CreateWhatsAppSession } from '../../../application/use-cases/session/CreateWhatsAppSession';
import { ISessionRepository } from '../../../domain/repositories/ISessionRepository';
import { IWhatsAppService } from '../../../application/services/IWhatsAppService';
import { NotFoundError, ForbiddenError } from '../../../domain/errors/AppError';

export class SessionController {
  constructor(
    private readonly createSession: CreateWhatsAppSession,
    private readonly sessionRepository: ISessionRepository,
    private readonly whatsAppService: IWhatsAppService,
  ) {}

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user!.userId;
      let qrCode: string | null = null;

      const result = await this.createSession.execute(userId, req.body, (qr) => {
        qrCode = qr;
      });

      res.status(201).json({ success: true, data: { ...result, qrCode } });
    } catch (error) {
      next(error);
    }
  };

  list = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user!.userId;
      const sessions = await this.sessionRepository.findByUserId(userId);
      res.status(200).json({ success: true, data: sessions });
    } catch (error) {
      next(error);
    }
  };

  disconnect = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const sessionId = id as string; 
      const userId = req.user!.userId;
      const session = await this.sessionRepository.findById(sessionId);
      if (!session) throw new NotFoundError('Session');
      if (session.userId !== userId) throw new ForbiddenError();
      await this.whatsAppService.disconnectSession(sessionId);
      await this.sessionRepository.updateStatus(sessionId, 'DISCONNECTED');
      res.status(200).json({ success: true, message: 'Session disconnected.' });
    } catch (error) {
      next(error);
    }
  };
}
