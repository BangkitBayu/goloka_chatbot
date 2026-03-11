"use client";

import { useState } from "react";
import { Plus, Trash2, Bot, ToggleLeft, ToggleRight } from "lucide-react";
import { whatsappSessions, chatbotRules, ChatbotRule } from "@/lib/dummy-data";

const connectedSessions = whatsappSessions.filter((s) => s.status === "connected");

export default function ChatbotPage() {
  const [selectedNumber, setSelectedNumber] = useState(connectedSessions[0]?.id || "");
  const [rules, setRules] = useState<ChatbotRule[]>(chatbotRules);

  const addRule = () => {
    setRules((prev) => [...prev, { id: `rule-${Date.now()}`, keyword: "", response: "", active: true }]);
  };

  const deleteRule = (id: string) => setRules((prev) => prev.filter((r) => r.id !== id));

  const updateRule = (id: string, field: keyof ChatbotRule, value: string | boolean) =>
    setRules((prev) => prev.map((r) => (r.id === id ? { ...r, [field]: value } : r)));

  const activeCount = rules.filter((r) => r.active).length;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, width: "100%" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: "var(--text-primary)" }}>Chatbot Rules</h2>
          <p style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 2 }}>
            Define keyword triggers and automated replies for each number
          </p>
        </div>
        <button className="btn-primary" onClick={addRule}><Plus size={16} /> Add Rule</button>
      </div>

      {/* Number Selector */}
      <div className="card">
        <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "var(--text-muted)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.06em" }}>
          Apply chatbot to number
        </label>
        <select
          className="input-field"
          value={selectedNumber}
          onChange={(e) => setSelectedNumber(e.target.value)}
          style={{ cursor: "pointer" }}
        >
          {connectedSessions.map((s) => (
            <option key={s.id} value={s.id} style={{ background: "var(--bg-card)" }}>
              {s.label} — {s.phone}
            </option>
          ))}
        </select>
        <div style={{ display: "flex", alignItems: "center", gap: 20, marginTop: 14, paddingTop: 14, borderTop: "1px solid var(--border)" }}>
          <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--text-muted)" }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--success)", display: "inline-block" }} />
            {activeCount} active rules
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--text-muted)" }}>
            <Bot size={12} color="var(--text-muted)" />
            {rules.length} total configured
          </span>
        </div>
      </div>

      {/* Rules Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(480px, 1fr))", gap: 14 }}>
        {rules.map((rule, idx) => (
          <div
            key={rule.id}
            className="card"
            style={{
              borderColor: rule.active ? "var(--border-accent)" : "var(--border)",
              opacity: rule.active ? 1 : 0.6,
              transition: "opacity 0.2s, border-color 0.2s",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: "var(--accent-bg)", border: "1px solid var(--border-accent)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: "var(--accent-dark)" }}>#{idx + 1}</span>
                </div>
                <span style={{ fontSize: 12, color: "var(--text-muted)" }}>{rule.active ? "Active" : "Inactive"}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <button style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", transition: "color 0.2s" }} onClick={() => updateRule(rule.id, "active", !rule.active)}>
                  {rule.active ? <ToggleRight size={22} color="var(--accent)" /> : <ToggleLeft size={22} color="var(--text-muted)" />}
                </button>
                <button style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", transition: "color 0.2s" }} onClick={() => deleteRule(rule.id)}>
                  <Trash2 size={15} color="var(--danger)" />
                </button>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <div>
                <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "var(--text-muted)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  🔑 Keyword Trigger
                </label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="e.g. harga, promo, info"
                  value={rule.keyword}
                  onChange={(e) => updateRule(rule.id, "keyword", e.target.value)}
                />
                <p style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 4 }}>Matches incoming messages containing this keyword</p>
              </div>
              <div>
                <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "var(--text-muted)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  💬 Bot Response
                </label>
                <textarea
                  className="input-field"
                  placeholder="The bot will reply with this..."
                  rows={3}
                  value={rule.response}
                  onChange={(e) => updateRule(rule.id, "response", e.target.value)}
                />
              </div>
            </div>
          </div>
        ))}

        {/* Add Rule Card */}
        <button
          onClick={addRule}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            padding: "28px 20px",
            borderRadius: 16,
            border: `2px dashed var(--border-strong)`,
            background: "none",
            cursor: "pointer",
            fontSize: 13,
            color: "var(--text-muted)",
            transition: "all 0.2s",
            minHeight: 120,
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.color = "var(--text-primary)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border-strong)"; e.currentTarget.style.color = "var(--text-muted)"; }}
        >
          <Plus size={16} /> Add another rule
        </button>
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button className="btn-primary glow-secondary-sm">Save All Rules</button>
      </div>
    </div>
  );
}
