import 'dotenv/config';
import express, { Application, Request, Response } from 'express';

import { authController, campaignController, sessionController, contactController, chatbotController } from './container';

import { createAuthRouter } from './presentation/http/routes/auth.routes';
import { createCampaignRouter } from './presentation/http/routes/campaign.routes';
import { createSessionRouter } from './presentation/http/routes/session.routes';
import { createContactRouter } from './presentation/http/routes/contact.routes';
import { createChatbotRouter } from './presentation/http/routes/chatbot.routes';
import { errorMiddleware } from './presentation/http/middlewares/error.middleware';

import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './infrastructure/config/swagger';

const app: Application = express();

// ── Swagger UI ──
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ── Global Middlewares ──
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Health Check ──
app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', app: 'GOLOKA Chat API', timestamp: new Date().toISOString() });
});

// ── API Routes ──
const API = '/api/v1';
app.use(`${API}/auth`,      createAuthRouter(authController));
app.use(`${API}/campaigns`, createCampaignRouter(campaignController));
app.use(`${API}/sessions`,  createSessionRouter(sessionController));
app.use(`${API}/contacts`,  createContactRouter(contactController));
app.use(`${API}/chatbot`,   createChatbotRouter(chatbotController));

// ── 404 Handler ──
app.use((_req: Request, res: Response) => {
  res.status(404).json({ success: false, error: { message: 'Route not found.', statusCode: 404 } });
});

// ── Global Error Handler (must be last) ──
app.use(errorMiddleware);

export default app;
