import { z } from 'zod';

// Auth
export const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  name: z.string().min(2),
});

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

// Campaign
export const CreateCampaignSchema = z.object({
  sessionId: z.string().uuid(),
  name: z.string().min(1),
  messageContent: z.string().min(1),
  mediaUrl: z.string().url().optional(),
  scheduledAt: z.string().datetime().optional(),
});

export const SendBlastSchema = z.object({
  recipients: z.array(z.string()).optional(),
  groupTag: z.string().optional(),
});

// Session
export const CreateSessionSchema = z.object({
  phoneNumber: z.string().min(8),
});

// Contact
export const UpsertContactSchema = z.object({
  name: z.string().min(1),
  phoneNumber: z.string().min(8),
  groupTag: z.string().optional(),
});

// Chatbot
export const CreateChatbotRuleSchema = z.object({
  sessionId: z.string().uuid(),
  triggerKeyword: z.string().min(1),
  responseMessage: z.string().min(1),
});
