"use client";

import { useState, useRef } from "react";
import {
  Upload,
  Download,
  Send,
  CheckCircle,
  Smartphone,
  Users,
  FileText,
} from "lucide-react";
import { whatsappSessions } from "@/lib/dummy-data";

const steps = [
  { id: 1, label: "Select Senders", icon: Smartphone },
  { id: 2, label: "Add Recipients", icon: Users },
  { id: 3, label: "Compose Message", icon: FileText },
];

const connectedSessions = whatsappSessions.filter((s) => s.status === "connected");

export default function BlastPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedSenders, setSelectedSenders] = useState<string[]>([]);
  const [recipients, setRecipients] = useState("");
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [message, setMessage] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const toggleSender = (id: string) =>
    setSelectedSenders((prev) => prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.name.endsWith(".csv")) setCsvFile(file);
  };

  const insertVariable = (v: string) => setMessage((m) => m + v);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, width: "100%" }}>
      {/* Header */}
      <div>
        <h2 style={{ fontSize: 20, fontWeight: 800, color: "var(--text-primary)" }}>New Blast Campaign</h2>
        <p style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 2 }}>
          Configure and send your WhatsApp blast in 3 simple steps
        </p>
      </div>

      {/* Step Indicator */}
      <div style={{ display: "flex", alignItems: "center" }}>
        {steps.map((step, idx) => (
          <div key={step.id} style={{ display: "flex", alignItems: "center", flex: 1 }}>
            <button
              style={{ display: "flex", alignItems: "center", gap: 10, background: "none", border: "none", cursor: "pointer" }}
              onClick={() => setCurrentStep(step.id)}
            >
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: "50%",
                  background: currentStep === step.id ? "var(--accent)" : currentStep > step.id ? "var(--success-bg)" : "var(--bg-hover)",
                  color: currentStep === step.id ? "#0F0F0F" : currentStep > step.id ? "var(--success)" : "var(--text-muted)",
                  border: currentStep === step.id ? "none" : `1px solid ${currentStep > step.id ? "rgba(74,222,128,0.3)" : "var(--border-strong)"}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  fontSize: 13,
                  boxShadow: currentStep === step.id ? "0 0 16px var(--accent-glow)" : "none",
                  flexShrink: 0,
                }}
              >
                {currentStep > step.id ? <CheckCircle size={14} /> : step.id}
              </div>
              <span style={{ fontSize: 13, fontWeight: 500, color: currentStep >= step.id ? "var(--text-primary)" : "var(--text-muted)" }}>
                {step.label}
              </span>
            </button>
            {idx < steps.length - 1 && (
              <div style={{ flex: 1, height: 1, margin: "0 16px", background: currentStep > step.id ? "rgba(74,222,128,0.3)" : "var(--border)" }} />
            )}
          </div>
        ))}
      </div>

      {/* Step 1 */}
      {currentStep === 1 && (
        <div className="card" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div>
            <h3 style={{ fontWeight: 600, color: "var(--text-primary)", fontSize: 15 }}>Select Sender Numbers</h3>
            <p style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>
              Messages are distributed across selected senders for natural delivery.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 12 }}>
            {connectedSessions.map((session) => {
              const checked = selectedSenders.includes(session.id);
              return (
                <label
                  key={session.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    padding: "14px 16px",
                    borderRadius: 12,
                    cursor: "pointer",
                    background: checked ? "var(--accent-bg)" : "var(--bg-base)",
                    border: `1px solid ${checked ? "var(--border-accent)" : "var(--border)"}`,
                    transition: "all 0.2s",
                  }}
                >
                  <input type="checkbox" checked={checked} onChange={() => toggleSender(session.id)} style={{ width: 16, height: 16, accentColor: "#FACC15" }} />
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: "var(--success-bg)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Smartphone size={15} color="var(--success)" />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>{session.label}</p>
                    <p style={{ fontSize: 11, color: "var(--text-muted)" }}>{session.phone}</p>
                  </div>
                  <span className="badge-green">Online</span>
                </label>
              );
            })}
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", paddingTop: 8 }}>
            <button className="btn-primary" disabled={selectedSenders.length === 0} onClick={() => setCurrentStep(2)}>
              Continue →
            </button>
          </div>
        </div>
      )}

      {/* Step 2 */}
      {currentStep === 2 && (
        <div className="card" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div>
            <h3 style={{ fontWeight: 600, color: "var(--text-primary)", fontSize: 15 }}>Define Recipients</h3>
            <p style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>
              Enter numbers manually or upload a CSV. Numbers must include country code (e.g. 62xxx).
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            {/* Manual */}
            <div>
              <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "var(--text-muted)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                Manual Entry
              </label>
              <textarea
                className="input-field"
                placeholder={"628123456789\n628987654321\n(one number per line)"}
                rows={6}
                value={recipients}
                onChange={(e) => setRecipients(e.target.value)}
              />
              <p style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 4 }}>
                {recipients.trim() ? recipients.trim().split("\n").filter(Boolean).length : 0} numbers entered
              </p>
            </div>
            {/* CSV */}
            <div>
              <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "var(--text-muted)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                Upload CSV
              </label>
              <div
                style={{
                  borderRadius: 12,
                  border: `2px dashed ${dragging ? "var(--accent)" : "var(--border-strong)"}`,
                  background: dragging ? "var(--accent-bg)" : "var(--bg-base)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                  padding: "32px 20px",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  minHeight: 155,
                }}
                onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileRef.current?.click()}
              >
                <div style={{ width: 46, height: 46, borderRadius: 12, background: "var(--accent-bg)", border: "1px solid var(--border-accent)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Upload size={20} color="var(--accent)" />
                </div>
                {csvFile ? (
                  <p style={{ fontSize: 13, fontWeight: 600, color: "var(--success)", textAlign: "center" }}>✓ {csvFile.name}</p>
                ) : (
                  <div style={{ textAlign: "center" }}>
                    <p style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>Drop CSV or click to upload</p>
                    <p style={{ fontSize: 11, color: "var(--text-muted)" }}>Up to 5,000 rows</p>
                  </div>
                )}
                <input ref={fileRef} type="file" accept=".csv" style={{ display: "none" }} onChange={(e) => e.target.files?.[0] && setCsvFile(e.target.files[0])} />
              </div>
              <button style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--accent)", background: "none", border: "none", cursor: "pointer", marginTop: 8 }}>
                <Download size={12} /> Download sample CSV template
              </button>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 8 }}>
            <button className="btn-ghost" onClick={() => setCurrentStep(1)}>← Back</button>
            <button className="btn-primary" disabled={!recipients.trim() && !csvFile} onClick={() => setCurrentStep(3)}>Continue →</button>
          </div>
        </div>
      )}

      {/* Step 3 */}
      {currentStep === 3 && (
        <div className="card" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div>
            <h3 style={{ fontWeight: 600, color: "var(--text-primary)", fontSize: 15 }}>Compose Your Message</h3>
            <p style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>
              Use placeholders — they&apos;ll be replaced with CSV column values before sending.
            </p>
          </div>
          {/* Variables */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
            {["{name}", "{phone}", "{company}", "{product}"].map((v) => (
              <button
                key={v}
                onClick={() => insertVariable(v)}
                style={{
                  fontSize: 12,
                  padding: "4px 12px",
                  borderRadius: 8,
                  background: "var(--accent-bg)",
                  border: "1px solid var(--border-accent)",
                  color: "var(--accent-dark)",
                  cursor: "pointer",
                  fontFamily: "monospace",
                  transition: "all 0.2s",
                }}
              >
                {v}
              </button>
            ))}
            <span style={{ fontSize: 11, color: "var(--text-muted)" }}>← Click to insert</span>
          </div>
          <div>
            <textarea
              className="input-field"
              placeholder={`Hello {name}! We have an exciting new promo just for you... 🎉`}
              rows={8}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
              <p style={{ fontSize: 11, color: "var(--text-muted)" }}>{message.length} chars · {Math.ceil(message.length / 160) || 1} segment(s)</p>
              <p style={{ fontSize: 11, color: "var(--text-muted)" }}>Max 4096 characters</p>
            </div>
          </div>
          {/* Summary */}
          <div style={{ padding: 16, borderRadius: 12, background: "var(--bg-base)", border: "1px solid var(--border)" }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>Blast Summary</p>
            {[
              { label: "Senders", value: `${selectedSenders.length} number(s)` },
              { label: "Recipients", value: csvFile ? `CSV: ${csvFile.name}` : `${recipients.trim().split("\n").filter(Boolean).length} manual` },
            ].map(({ label, value }) => (
              <div key={label} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 4 }}>
                <span style={{ color: "var(--text-muted)" }}>{label}</span>
                <span style={{ color: "var(--text-primary)", fontWeight: 500 }}>{value}</span>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 4 }}>
            <button className="btn-ghost" onClick={() => setCurrentStep(2)}>← Back</button>
            <button className="btn-primary glow-secondary" disabled={!message.trim()} style={{ fontSize: 15, padding: "12px 32px" }}>
              <Send size={16} /> Send Blast Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
