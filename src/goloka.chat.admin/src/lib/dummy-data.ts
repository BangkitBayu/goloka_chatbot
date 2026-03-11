// ──────────────────────────────────────────
// WhatsApp Sessions
// ──────────────────────────────────────────
export interface WhatsAppSession {
  id: string;
  label: string;
  phone: string;
  status: "connected" | "disconnected" | "pending";
  lastActive: string;
  messagesThisMonth: number;
}

export const whatsappSessions: WhatsAppSession[] = [
  {
    id: "wa-001",
    label: "Marketing Primary",
    phone: "+62 812-3456-7890",
    status: "connected",
    lastActive: "Just now",
    messagesThisMonth: 4312,
  },
  {
    id: "wa-002",
    label: "Sales Channel",
    phone: "+62 857-9988-1122",
    status: "connected",
    lastActive: "3 min ago",
    messagesThisMonth: 2891,
  },
  {
    id: "wa-003",
    label: "Support Line",
    phone: "+62 811-5543-2210",
    status: "disconnected",
    lastActive: "2 hours ago",
    messagesThisMonth: 1024,
  },
  {
    id: "wa-004",
    label: "Promo Broadcast",
    phone: "+62 821-7766-3344",
    status: "connected",
    lastActive: "15 min ago",
    messagesThisMonth: 7550,
  },
  {
    id: "wa-005",
    label: "Regional East",
    phone: "+62 838-4412-9900",
    status: "disconnected",
    lastActive: "Yesterday",
    messagesThisMonth: 340,
  },
];

// ──────────────────────────────────────────
// Blast Campaigns
// ──────────────────────────────────────────
export interface BlastCampaign {
  id: string;
  name: string;
  sender: string;
  recipients: number;
  sent: number;
  failed: number;
  status: "completed" | "running" | "scheduled" | "failed";
  scheduledAt: string;
}

export const blastCampaigns: BlastCampaign[] = [
  {
    id: "blast-001",
    name: "Ramadan Promo 2025",
    sender: "+62 812-3456-7890",
    recipients: 5200,
    sent: 5200,
    failed: 12,
    status: "completed",
    scheduledAt: "Mar 10, 2026 09:00",
  },
  {
    id: "blast-002",
    name: "New Product Launch",
    sender: "+62 857-9988-1122",
    recipients: 3100,
    sent: 1400,
    failed: 3,
    status: "running",
    scheduledAt: "Mar 11, 2026 10:30",
  },
  {
    id: "blast-003",
    name: "Flash Sale Weekend",
    sender: "+62 821-7766-3344",
    recipients: 8000,
    sent: 0,
    failed: 0,
    status: "scheduled",
    scheduledAt: "Mar 13, 2026 08:00",
  },
];

// ──────────────────────────────────────────
// Chatbot Rules
// ──────────────────────────────────────────
export interface ChatbotRule {
  id: string;
  keyword: string;
  response: string;
  active: boolean;
}

export const chatbotRules: ChatbotRule[] = [
  {
    id: "rule-001",
    keyword: "harga",
    response: "Halo! Untuk info harga produk kami, silakan kunjungi: https://goloka.id/pricing 😊",
    active: true,
  },
  {
    id: "rule-002",
    keyword: "promo",
    response: "Ada promo menarik minggu ini! Diskon 20% untuk semua paket. Gunakan kode: GOLOKA20",
    active: true,
  },
  {
    id: "rule-003",
    keyword: "bantuan",
    response: "Tim support kami siap membantu Anda! Silakan hubungi kami di support@goloka.id atau balas pesan ini.",
    active: false,
  },
  {
    id: "rule-004",
    keyword: "order",
    response: "Terima kasih sudah berminat! Ketik 'PESAN' untuk memulai proses pemesanan, atau klik link berikut: https://goloka.id/order",
    active: true,
  },
  {
    id: "rule-005",
    keyword: "lokasi",
    response: "Kami berlokasi di Jl. Sudirman No. 88, Jakarta Pusat. Buka Senin–Jumat 09.00–18.00 WIB.",
    active: true,
  },
];

// ──────────────────────────────────────────
// Pricing Plans
// ──────────────────────────────────────────
export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  pricePeriod: string;
  highlight: boolean;
  badge?: string;
  features: { label: string; value: string; included: boolean }[];
  ctaLabel: string;
}

export const pricingPlans: PricingPlan[] = [
  {
    id: "free",
    name: "Free",
    price: 0,
    pricePeriod: "Forever",
    highlight: false,
    features: [
      { label: "WA Numbers", value: "1 Number", included: true },
      { label: "Messages / Month", value: "500 messages", included: true },
      { label: "Blast Campaigns", value: "3 / month", included: true },
      { label: "Chatbot Rules", value: "5 rules", included: true },
      { label: "CSV Upload", value: "Up to 100 rows", included: true },
      { label: "Priority Support", value: "—", included: false },
      { label: "API Access", value: "—", included: false },
      { label: "Analytics Dashboard", value: "—", included: false },
    ],
    ctaLabel: "Get Started Free",
  },
  {
    id: "pro",
    name: "Pro",
    price: 299000,
    pricePeriod: "Month",
    highlight: true,
    badge: "Most Popular",
    features: [
      { label: "WA Numbers", value: "5 Numbers", included: true },
      { label: "Messages / Month", value: "20,000 messages", included: true },
      { label: "Blast Campaigns", value: "Unlimited", included: true },
      { label: "Chatbot Rules", value: "50 rules", included: true },
      { label: "CSV Upload", value: "Up to 5,000 rows", included: true },
      { label: "Priority Support", value: "Email + Chat", included: true },
      { label: "API Access", value: "Full REST API", included: true },
      { label: "Analytics Dashboard", value: "Basic", included: true },
    ],
    ctaLabel: "Upgrade to Pro",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 999000,
    pricePeriod: "Month",
    highlight: false,
    features: [
      { label: "WA Numbers", value: "Unlimited", included: true },
      { label: "Messages / Month", value: "Unlimited", included: true },
      { label: "Blast Campaigns", value: "Unlimited", included: true },
      { label: "Chatbot Rules", value: "Unlimited", included: true },
      { label: "CSV Upload", value: "Unlimited rows", included: true },
      { label: "Priority Support", value: "24/7 Dedicated", included: true },
      { label: "API Access", value: "Full + Webhooks", included: true },
      { label: "Analytics Dashboard", value: "Advanced + Export", included: true },
    ],
    ctaLabel: "Contact Sales",
  },
];

// ──────────────────────────────────────────
// FAQ
// ──────────────────────────────────────────
export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const faqItems: FaqItem[] = [
  {
    id: "faq-001",
    question: "What is GOLOKA and how does it work?",
    answer:
      "GOLOKA is a WhatsApp Blast platform that lets you connect multiple WhatsApp numbers and send bulk messages to your contacts. Simply scan a QR code to link your number, upload a contact list or type numbers manually, compose your message, and hit Send.",
  },
  {
    id: "faq-002",
    question: "How do I connect my WhatsApp number?",
    answer:
      "Go to the Sessions page and click 'Add New Number'. A QR code will appear. Open WhatsApp on your phone, go to Settings → Linked Devices → Link a Device, and scan the QR code. The number will appear as Connected within seconds.",
  },
  {
    id: "faq-003",
    question: "Is it safe to use GOLOKA with my WhatsApp number?",
    answer:
      "GOLOKA uses the official WhatsApp Web multi-device protocol. However, please note that mass messaging may violate WhatsApp's Terms of Service. We recommend using dedicated numbers for marketing purposes and following WhatsApp's guidelines.",
  },
  {
    id: "faq-004",
    question: "What file format should my CSV contact list be in?",
    answer:
      "Your CSV should contain at minimum a 'phone' column with international-format numbers (e.g., 628123456789). You can also add 'name' and other columns to personalize messages using {name} placeholders. Download our sample template on the Blast page.",
  },
  {
    id: "faq-005",
    question: "Can I personalize messages for each recipient?",
    answer:
      "Yes! Use variables in your message like {name}, {phone}, or any custom column headers from your CSV. GOLOKA will automatically replace these with the corresponding values for each recipient before sending.",
  },
  {
    id: "faq-006",
    question: "How many messages can I send per day?",
    answer:
      "This depends on your plan. Free accounts can send up to 500 messages/month. Pro accounts up to 20,000/month, and Enterprise accounts have unlimited sends. To avoid bans, we also apply smart rate limiting per number.",
  },
  {
    id: "faq-007",
    question: "What is the Chatbot Builder feature?",
    answer:
      "The Chatbot Builder lets you define keyword-triggered auto-replies for each connected number. When an incoming message matches a keyword, GOLOKA automatically sends the configured response — great for FAQs, order confirmations, and support.",
  },
  {
    id: "faq-008",
    question: "How do I upgrade or cancel my plan?",
    answer:
      "You can upgrade anytime from the Pricing page. Cancellations take effect at the end of your billing cycle — you'll retain Pro/Enterprise features until then. Contact support@goloka.id for assistance.",
  },
];

// ──────────────────────────────────────────
// Dashboard Stats
// ──────────────────────────────────────────
export const dashboardStats = {
  totalMessagesSent: 24_180,
  totalRecipients: 18_430,
  activeNumbers: 3,
  successRate: 97.4,
  quotaUsed: 12340,
  quotaTotal: 20000,
  plan: "Pro",
};
