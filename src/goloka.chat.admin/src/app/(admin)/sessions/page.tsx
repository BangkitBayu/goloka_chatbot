"use client";

import { useState } from "react";
import {
  Smartphone,
  Plus,
  X,
  Wifi,
  WifiOff,
  RefreshCw,
  Clock,
  MessageSquare,
} from "lucide-react";
import { whatsappSessions, WhatsAppSession } from "@/lib/dummy-data";

export default function SessionsPage() {
  const [sessions, setSessions] = useState<WhatsAppSession[]>(whatsappSessions);
  const [showQRModal, setShowQRModal] = useState(false);

  const disconnectSession = (id: string) => {
    setSessions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: "disconnected" } : s))
    );
  };

  const reconnectSession = (id: string) => {
    setSessions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: "connected", lastActive: "Just now" } : s))
    );
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, width: "100%" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: "var(--text-primary)" }}>WhatsApp Sessions</h2>
          <p style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 2 }}>
            Manage your connected WhatsApp numbers
          </p>
        </div>
        <button className="btn-primary glow-secondary-sm" onClick={() => setShowQRModal(true)}>
          <Plus size={16} />
          Add New Number
        </button>
      </div>

      {/* Stats row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
        {[
          { label: "Connected", value: sessions.filter((s) => s.status === "connected").length, color: "var(--success)" },
          { label: "Disconnected", value: sessions.filter((s) => s.status === "disconnected").length, color: "var(--danger)" },
          { label: "Total Numbers", value: sessions.length, color: "var(--accent)" },
        ].map(({ label, value, color }) => (
          <div key={label} className="card" style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: color, flexShrink: 0 }} />
            <div>
              <p style={{ fontSize: 22, fontWeight: 800, color: "var(--text-primary)" }}>{value}</p>
              <p style={{ fontSize: 12, color: "var(--text-muted)" }}>{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Sessions Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))", gap: 14 }}>
        {sessions.map((session) => (
          <div
            key={session.id}
            className="card"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              borderColor: session.status === "connected" ? "rgba(74,222,128,0.15)" : "var(--border)",
            }}
          >
            {/* Icon */}
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 16,
                background: session.status === "connected" ? "var(--success-bg)" : "var(--danger-bg)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Smartphone size={22} color={session.status === "connected" ? "var(--success)" : "var(--danger)"} />
            </div>

            {/* Info */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                <p style={{ fontWeight: 600, fontSize: 14, color: "var(--text-primary)" }}>{session.label}</p>
                <span className={session.status === "connected" ? "badge-green" : "badge-red"}>
                  {session.status === "connected" ? (
                    <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Wifi size={10} /> Connected</span>
                  ) : (
                    <span style={{ display: "flex", alignItems: "center", gap: 4 }}><WifiOff size={10} /> Disconnected</span>
                  )}
                </span>
              </div>
              <p style={{ fontSize: 13, color: "var(--text-muted)" }}>{session.phone}</p>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 6, fontSize: 11, color: "var(--text-muted)" }}>
                <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Clock size={10} /> {session.lastActive}</span>
                <span style={{ display: "flex", alignItems: "center", gap: 4 }}><MessageSquare size={10} /> {session.messagesThisMonth.toLocaleString()} msgs</span>
              </div>
            </div>

            {/* Action */}
            <div style={{ flexShrink: 0 }}>
              {session.status === "disconnected" ? (
                <button className="btn-secondary" style={{ fontSize: 12, padding: "7px 14px" }} onClick={() => { setShowQRModal(true); }}>
                  <RefreshCw size={12} /> Reconnect
                </button>
              ) : (
                <button
                  className="btn-ghost"
                  style={{ fontSize: 12, padding: "7px 14px", color: "var(--danger)", borderColor: "var(--danger-bg)" }}
                  onClick={() => disconnectSession(session.id)}
                >
                  Disconnect
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* QR Modal */}
      {showQRModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 50,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0,0,0,0.7)",
            backdropFilter: "blur(6px)",
          }}
          onClick={(e) => e.target === e.currentTarget && setShowQRModal(false)}
        >
          <div
            style={{
              width: 420,
              background: "var(--bg-card)",
              border: "1px solid var(--border-accent)",
              borderRadius: 24,
              padding: 36,
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 20,
              boxShadow: "0 40px 80px rgba(0,0,0,0.4)",
            }}
          >
            <button
              onClick={() => setShowQRModal(false)}
              style={{
                position: "absolute",
                top: 16,
                right: 16,
                width: 32,
                height: 32,
                borderRadius: 8,
                border: "1px solid var(--border)",
                background: "var(--bg-hover)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "var(--text-muted)",
              }}
            >
              <X size={16} />
            </button>

            <div style={{ textAlign: "center" }}>
              <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", color: "var(--accent-dark)", marginBottom: 4 }}>STEP 1 OF 1</p>
              <h3 style={{ fontSize: 20, fontWeight: 800, color: "var(--text-primary)" }}>Scan QR Code</h3>
              <p style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 4 }}>
                Open WhatsApp → Linked Devices → Link a Device
              </p>
            </div>

            {/* QR Code */}
            <div
              style={{
                width: 220,
                height: 220,
                background: "#fff",
                borderRadius: 16,
                border: "4px solid #0F0F0F",
                boxShadow: "0 0 0 1px rgba(250,204,21,0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4, padding: 12 }}>
                {Array.from({ length: 49 }).map((_, i) => {
                  const corner = [0,1,2,7,8,14,35,41,42,44,45,46,47,48,36,43].includes(i);
                  const rand = (i * 37 + 13) % 3 !== 0;
                  return (
                    <div
                      key={i}
                      style={{
                        width: 14,
                        height: 14,
                        background: corner || rand ? "#0F0F0F" : "transparent",
                        borderRadius: 2,
                      }}
                    />
                  );
                })}
              </div>
              <div
                style={{
                  position: "absolute",
                  left: 8,
                  right: 8,
                  height: 2,
                  top: "50%",
                  background: "rgba(250,204,21,0.85)",
                  boxShadow: "0 0 8px rgba(250,204,21,0.6)",
                  animation: "bounce 1s infinite",
                }}
              />
            </div>

            <div style={{ textAlign: "center" }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: "var(--accent)", marginBottom: 4, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--accent)", display: "inline-block" }} />
                Waiting for scan...
              </p>
              <p style={{ fontSize: 12, color: "var(--text-muted)" }}>
                QR code expires in <strong style={{ color: "var(--text-primary)" }}>60s</strong>
              </p>
            </div>

            <button className="btn-ghost" style={{ width: "100%", justifyContent: "center", fontSize: 13 }}>
              <RefreshCw size={13} /> Refresh QR Code
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
