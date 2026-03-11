"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle, MessageCircle } from "lucide-react";
import { faqItems } from "@/lib/dummy-data";

export default function FaqPage() {
  const [openId, setOpenId] = useState<string | null>(faqItems[0].id);
  const toggle = (id: string) => setOpenId((prev) => (prev === id ? null : id));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, width: "100%" }}>
      {/* Hero */}
      <div
        style={{
          borderRadius: 20,
          padding: "28px 36px",
          textAlign: "center",
          background: "linear-gradient(135deg, var(--accent-bg) 0%, var(--bg-card) 60%)",
          border: "1px solid var(--border-accent)",
        }}
      >
        <div style={{ width: 52, height: 52, borderRadius: 16, background: "var(--accent-bg)", border: "1px solid var(--border-accent)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
          <HelpCircle size={24} color="var(--accent)" />
        </div>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: "var(--text-primary)", marginBottom: 6 }}>Frequently Asked Questions</h2>
        <p style={{ fontSize: 13, color: "var(--text-muted)" }}>Everything you need to know about GOLOKA WhatsApp Blast</p>
      </div>

      {/* FAQ items in 2 columns */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, alignItems: "start" }}>
        {faqItems.map((item) => {
          const isOpen = openId === item.id;
          return (
            <div
              key={item.id}
              style={{
                borderRadius: 14,
                overflow: "hidden",
                border: `1px solid ${isOpen ? "var(--border-accent)" : "var(--border)"}`,
                background: isOpen ? "var(--accent-bg)" : "var(--bg-card)",
                transition: "all 0.2s ease",
              }}
            >
              <button
                onClick={() => toggle(item.id)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 12,
                  padding: "16px 18px",
                  textAlign: "left",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 28, height: 28, borderRadius: 8, background: isOpen ? "var(--accent-bg)" : "var(--bg-base)", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <MessageCircle size={13} color={isOpen ? "var(--accent)" : "var(--text-muted)"} />
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>{item.question}</span>
                </div>
                <div style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s", flexShrink: 0 }}>
                  <ChevronDown size={15} color={isOpen ? "var(--accent)" : "var(--text-muted)"} />
                </div>
              </button>
              {isOpen && (
                <div style={{ padding: "0 18px 16px" }}>
                  <div style={{ height: 1, background: "var(--border-accent)", marginBottom: 12 }} />
                  <p style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.65 }}>{item.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Contact Support */}
      <div
        className="card"
        style={{ display: "flex", alignItems: "center", gap: 20 }}
      >
        <div style={{ width: 46, height: 46, borderRadius: 12, background: "var(--accent-bg)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <MessageCircle size={20} color="var(--accent)" />
        </div>
        <div style={{ flex: 1 }}>
          <p style={{ fontWeight: 600, color: "var(--text-primary)", fontSize: 14 }}>Still have questions?</p>
          <p style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>Our support team is ready to help anytime.</p>
        </div>
        <a href="mailto:support@goloka.id" className="btn-secondary" style={{ flexShrink: 0, fontSize: 13 }}>
          Contact Support
        </a>
      </div>
    </div>
  );
}
