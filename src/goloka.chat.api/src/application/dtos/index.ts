// Auth DTOs
export interface RegisterUserRequest {
  email: string;
  password: string;
  name: string;
}

export interface RegisterUserResponse {
  id: string;
  email: string;
  name: string;
  role: string;
  quota: number;
}

export interface LoginUserRequest {
  email: string;
  password: string;
}

export interface LoginUserResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
    quota: number;
  };
}

// Campaign DTOs
export interface CreateCampaignRequest {
  sessionId: string;
  name: string;
  messageContent: string;
  mediaUrl?: string;
  scheduledAt?: string;
}

export interface SendBlastRequest {
  campaignId: string;
  recipients?: string[]; // phone numbers from manual input or CSV
  groupTag?: string;     // optional: target contacts by group tag
}

export interface SendBlastResult {
  campaignId: string;
  total: number;
  sent: number;
  failed: number;
}

// Session DTOs
export interface CreateSessionRequest {
  phoneNumber: string;
  method?: 'qr' | 'pairing';
}

export interface CreateSessionResponse {
  sessionId: string;
  phoneNumber: string;
  status: string;
}

// Contact DTOs
export interface UpsertContactRequest {
  name: string;
  phoneNumber: string;
  groupTag?: string;
}

// Chatbot DTOs
export interface CreateChatbotRuleRequest {
  sessionId: string;
  triggerKeyword: string;
  responseMessage: string;
}

// JWT Payload
export interface JwtPayload {
  userId: string;
  email: string;
  role: string;
}
