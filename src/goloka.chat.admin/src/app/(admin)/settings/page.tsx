"use client";

import { useState } from "react";
import { User, Lock, Save, Eye, EyeOff, CheckCircle } from "lucide-react";

type Tab = "profile" | "security";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("profile");
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [saved, setSaved] = useState(false);
  const [profile, setProfile] = useState({ name: "Salim Admin", email: "admin@goloka.id", phone: "+62 812-3456-7890", company: "PT Goloka Digital" });

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2500); };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, width: "100%" }}>
      <div>
        <h2 style={{ fontSize: 20, fontWeight: 800, color: "var(--text-primary)" }}>Settings</h2>
        <p style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 2 }}>Manage your account information and security</p>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 4, padding: 4, borderRadius: 12, background: "var(--bg-hover)", border: "1px solid var(--border)", width: "fit-content" }}>
        {[
          { id: "profile" as Tab, label: "Profile", icon: User },
          { id: "security" as Tab, label: "Security", icon: Lock },
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 18px",
              borderRadius: 9,
              fontSize: 13,
              fontWeight: 500,
              background: activeTab === id ? "var(--accent)" : "transparent",
              color: activeTab === id ? "#0F0F0F" : "var(--text-muted)",
              border: "none",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            <Icon size={14} /> {label}
          </button>
        ))}
      </div>

      {/* Profile Tab */}
      {activeTab === "profile" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 20 }}>
          <div className="card" style={{ display: "flex", flexDirection: "column", gap: 22 }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)" }}>Profile Information</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {[
                { label: "Full Name", key: "name", type: "text", placeholder: "Your full name" },
                { label: "Email Address", key: "email", type: "email", placeholder: "your@email.com" },
                { label: "Phone Number", key: "phone", type: "tel", placeholder: "+62 xxx-xxxx-xxxx" },
                { label: "Company", key: "company", type: "text", placeholder: "Company name" },
              ].map(({ label, key, type, placeholder }) => (
                <div key={key}>
                  <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "var(--text-muted)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                    {label}
                  </label>
                  <input
                    type={type}
                    className="input-field"
                    placeholder={placeholder}
                    value={profile[key as keyof typeof profile]}
                    onChange={(e) => setProfile((p) => ({ ...p, [key]: e.target.value }))}
                  />
                </div>
              ))}
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 12, paddingTop: 8 }}>
              {saved && (
                <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--success)" }}>
                  <CheckCircle size={14} /> Changes saved!
                </span>
              )}
              <button className="btn-primary" onClick={handleSave}><Save size={14} /> Save Changes</button>
            </div>
          </div>

          {/* Avatar card */}
          <div className="card" style={{ display: "flex", flexDirection: "column", gap: 20, alignItems: "center" }}>
            <div
              style={{
                width: 100,
                height: 100,
                borderRadius: 24,
                background: "linear-gradient(135deg, #FACC15, #CA8A04)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 900,
                fontSize: 28,
                color: "#0F0F0F",
              }}
            >
              SA
            </div>
            <div style={{ textAlign: "center" }}>
              <p style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)" }}>Salim Admin</p>
              <p style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>admin@goloka.id</p>
            </div>
            <div style={{ width: "100%", padding: "12px 0", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", display: "flex", flexDirection: "column", gap: 8 }}>
              <p style={{ fontSize: 11, color: "var(--text-muted)", textAlign: "center" }}>JPG, PNG or GIF. Max 2MB.</p>
            </div>
            <button className="btn-ghost" style={{ width: "100%", justifyContent: "center", fontSize: 13 }}>Upload Photo</button>
            <span className="badge-yellow" style={{ fontSize: 11 }}>Pro Plan</span>
          </div>
        </div>
      )}

      {/* Security Tab */}
      {activeTab === "security" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          <div className="card" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div>
              <h3 style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)", marginBottom: 2 }}>Change Password</h3>
              <p style={{ fontSize: 12, color: "var(--text-muted)" }}>Use at least 8 characters including letters and numbers.</p>
            </div>
            {[
              { label: "Current Password", show: showOld, toggle: () => setShowOld(!showOld), id: "old" },
              { label: "New Password", show: showNew, toggle: () => setShowNew(!showNew), id: "new" },
              { label: "Confirm New Password", show: showConfirm, toggle: () => setShowConfirm(!showConfirm), id: "confirm" },
            ].map(({ label, show, toggle, id }) => (
              <div key={id}>
                <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "var(--text-muted)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  {label}
                </label>
                <div style={{ position: "relative" }}>
                  <input id={id} type={show ? "text" : "password"} className="input-field" placeholder="••••••••" style={{ paddingRight: 42 }} />
                  <button type="button" onClick={toggle} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)" }}>
                    {show ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>
            ))}
            <div style={{ display: "flex", justifyContent: "flex-end", paddingTop: 4 }}>
              <button className="btn-primary"><Lock size={14} /> Update Password</button>
            </div>
          </div>

          {/* Danger Zone */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div className="card">
              <h3 style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)", marginBottom: 6 }}>Two-Factor Authentication</h3>
              <p style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 14 }}>Add an extra layer of security to your account.</p>
              <button className="btn-secondary" style={{ fontSize: 12 }}>Enable 2FA</button>
            </div>
            <div style={{ borderRadius: 16, padding: 20, background: "var(--danger-bg)", border: "1px solid rgba(239,68,68,0.15)" }}>
              <h3 style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)", marginBottom: 4 }}>Danger Zone</h3>
              <p style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 14 }}>Permanently delete your account. This cannot be undone.</p>
              <button style={{ fontSize: 13, fontWeight: 600, padding: "8px 16px", borderRadius: 10, background: "var(--danger-bg)", border: "1px solid rgba(239,68,68,0.25)", color: "var(--danger)", cursor: "pointer" }}>
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
