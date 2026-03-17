/**
 * container.ts — Manual Dependency Injection
 *
 * Wiring order (innermost → outermost):
 *   Infrastructure (Repositories + Adapters)
 *     → Application (Use Cases)
 *       → Presentation (Controllers)
 *
 * This file is the ONLY place that knows about concrete implementations.
 * Use cases and domain code remain decoupled from infrastructure.
 */

import { UserRepository } from './infrastructure/database/repositories/UserRepository';
import { CampaignRepository } from './infrastructure/database/repositories/CampaignRepository';
import { SessionRepository } from './infrastructure/database/repositories/SessionRepository';
import { ContactRepository } from './infrastructure/database/repositories/ContactRepository';
import { ChatbotRuleRepository } from './infrastructure/database/repositories/ChatbotRuleRepository';
import { BaileysAdapter } from './infrastructure/whatsapp/BaileysAdapter';

import { RegisterUser } from './application/use-cases/auth/RegisterUser';
import { LoginUser } from './application/use-cases/auth/LoginUser';
import { CreateCampaign } from './application/use-cases/campaign/CreateCampaign';
import { SendBlastMessage } from './application/use-cases/campaign/SendBlastMessage';
import { CreateWhatsAppSession } from './application/use-cases/session/CreateWhatsAppSession';
import { UpsertContact, GetContacts, DeleteContact } from './application/use-cases/contact/ContactUseCases';
import { CreateChatbotRule, GetChatbotRules, DeleteChatbotRule } from './application/use-cases/chatbot/ChatbotUseCases';

import { AuthController } from './presentation/http/controllers/AuthController';
import { CampaignController } from './presentation/http/controllers/CampaignController';
import { SessionController } from './presentation/http/controllers/SessionController';
import { ContactController } from './presentation/http/controllers/ContactController';
import { ChatbotController } from './presentation/http/controllers/ChatbotController';

// ──────────────────────────────────────────────
//  Infrastructure layer
// ──────────────────────────────────────────────
const userRepository       = new UserRepository();
const campaignRepository   = new CampaignRepository();
const sessionRepository    = new SessionRepository();
const contactRepository    = new ContactRepository();
const chatbotRuleRepository = new ChatbotRuleRepository();
const whatsAppService      = new BaileysAdapter();

// ──────────────────────────────────────────────
//  Application layer (Use Cases)
// ──────────────────────────────────────────────
const registerUser         = new RegisterUser(userRepository);
const loginUser            = new LoginUser(userRepository);
const createCampaign       = new CreateCampaign(campaignRepository, sessionRepository);
const sendBlastMessage     = new SendBlastMessage(
  campaignRepository,
  userRepository,
  sessionRepository,
  contactRepository,
  whatsAppService,
);
const createSession        = new CreateWhatsAppSession(sessionRepository, userRepository, whatsAppService);
const upsertContact        = new UpsertContact(contactRepository);
const getContacts          = new GetContacts(contactRepository);
const deleteContact        = new DeleteContact(contactRepository);
const createChatbotRule    = new CreateChatbotRule(chatbotRuleRepository, sessionRepository);
const getChatbotRules      = new GetChatbotRules(chatbotRuleRepository);
const deleteChatbotRule    = new DeleteChatbotRule(chatbotRuleRepository);

// ──────────────────────────────────────────────
//  Presentation layer (Controllers)
// ──────────────────────────────────────────────
export const authController     = new AuthController(registerUser, loginUser);
export const campaignController = new CampaignController(createCampaign, sendBlastMessage, campaignRepository);
export const sessionController  = new SessionController(createSession, sessionRepository, whatsAppService);
export const contactController  = new ContactController(upsertContact, getContacts, deleteContact);
export const chatbotController  = new ChatbotController(createChatbotRule, getChatbotRules, deleteChatbotRule);
