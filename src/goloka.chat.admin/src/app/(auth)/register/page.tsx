"use client";

import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, User, Building2, Wifi, ArrowRight, Sun, Moon, CheckCircle } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import Link from "next/link";

const plans = [
  { id: "free", label: "Free", sub: "500 msgs/month", color: "var(--text-muted)" },
  { id: "pro", label: "Pro – Rp 299K/mo", sub: "20,000 msgs + API", color: "var(--accent)" },
  { id: "enterprise", label: "Enterprise", sub: "Unlimited everything", color: "var(--info)" },
];

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("free");
  const { theme, toggleTheme } = useTheme();

  return (
    <div style={{ display: "flex", width: "100%", minHeight: "100vh" }}>
      {/* Left – Brand Panel */}
      <div
        style={{
          flex: "0 0 38%",
          background: "linear-gradient(160deg, #0A0A0A 0%, #001A00 60%, #0A0A0A 100%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "48px 48px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", top: "25%", left: "10%", width: 350, height: 350, background: "radial-gradient(circle, rgba(250,204,21,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />

        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 42, height: 42, borderRadius: 14, background: "linear-gradient(135deg, #FACC15, #CA8A04)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Wifi size={20} color="#0F0F0F" strokeWidth={2.5} />
          </div>
          <div>
            <span style={{ fontWeight: 900, fontSize: 16, letterSpacing: "0.18em", color: "#FACC15" }}>GOLOKA</span>
            <p style={{ fontSize: 10, color: "#71717A", marginTop: -2 }}>WhatsApp Blast</p>
          </div>
        </div>

        <div>
          <p style={{ fontSize: 12, fontWeight: 700, color: "#CA8A04", letterSpacing: "0.12em", marginBottom: 12 }}>GET STARTED</p>
          <h1 style={{ fontSize: 34, fontWeight: 900, color: "#EAEAEA", lineHeight: 1.2, marginBottom: 16 }}>
            Join thousands of<br />smart marketers.
          </h1>
          <p style={{ fontSize: 13, color: "#71717A", lineHeight: 1.7, marginBottom: 32 }}>
            Create your free account in under 2 minutes. No credit card required.
          </p>

          {/* Mini plan cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {plans.map((p) => (
              <div
                key={p.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "12px 16px",
                  borderRadius: 12,
                  background: "rgba(255,255,255,0.03)",
                  border: `1px solid ${p.id === "pro" ? "rgba(250,204,21,0.2)" : "rgba(255,255,255,0.05)"}`,
                }}
              >
                <CheckCircle size={15} color={p.color} />
                <div>
                  <p style={{ fontSize: 13, fontWeight: 600, color: "#EAEAEA" }}>{p.label}</p>
                  <p style={{ fontSize: 11, color: "#71717A" }}>{p.sub}</p>
                </div>
                {p.id === "pro" && (
                  <span style={{ marginLeft: "auto", fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 99, background: "rgba(250,204,21,0.12)", color: "#FACC15", border: "1px solid rgba(250,204,21,0.2)" }}>
                    Popular
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        <p style={{ fontSize: 11, color: "#52525B" }}>© 2026 GOLOKA. All rights reserved.</p>
      </div>

      {/* Right – Form */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 64px",
          background: "var(--bg-card)",
          position: "relative",
          overflowY: "auto",
        }}
      >
        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          style={{ position: "absolute", top: 24, right: 24, width: 38, height: 38, borderRadius: 10, background: "var(--bg-hover)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "var(--text-muted)" }}
        >
          {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
        </button>

        <div style={{ width: "100%", maxWidth: 440 }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: "var(--text-primary)", marginBottom: 4 }}>Create your account</h2>
          <p style={{ fontSize: 14, color: "var(--text-muted)", marginBottom: 28 }}>
            Already have an account?{" "}
            <Link href="/login" style={{ color: "var(--accent-dark)", fontWeight: 600, textDecoration: "none" }}>Sign in</Link>
          </p>

          {/* Google */}
          <button
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              padding: "11px 16px",
              borderRadius: 12,
              background: "var(--bg-hover)",
              border: "1px solid var(--border-strong)",
              cursor: "pointer",
              fontSize: 14,
              fontWeight: 600,
              color: "var(--text-primary)",
              marginBottom: 22,
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--accent)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border-strong)"; }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Sign up with Google
          </button>

          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 22 }}>
            <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
            <span style={{ fontSize: 12, color: "var(--text-muted)" }}>or with email</span>
            <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
          </div>

          {/* Fields */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--text-muted)", marginBottom: 5 }}>Full Name</label>
                <div style={{ position: "relative" }}>
                  <User size={14} color="var(--text-muted)" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }} />
                  <input type="text" className="input-field" placeholder="Your name" style={{ paddingLeft: 34 }} />
                </div>
              </div>
              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--text-muted)", marginBottom: 5 }}>Company (Optional)</label>
                <div style={{ position: "relative" }}>
                  <Building2 size={14} color="var(--text-muted)" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }} />
                  <input type="text" className="input-field" placeholder="PT Example" style={{ paddingLeft: 34 }} />
                </div>
              </div>
            </div>

            <div>
              <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--text-muted)", marginBottom: 5 }}>Email Address</label>
              <div style={{ position: "relative" }}>
                <Mail size={14} color="var(--text-muted)" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }} />
                <input type="email" className="input-field" placeholder="you@example.com" style={{ paddingLeft: 34 }} />
              </div>
            </div>

            <div>
              <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--text-muted)", marginBottom: 5 }}>Password</label>
              <div style={{ position: "relative" }}>
                <Lock size={14} color="var(--text-muted)" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }} />
                <input type={showPassword ? "text" : "password"} className="input-field" placeholder="Min. 8 characters" style={{ paddingLeft: 34, paddingRight: 42 }} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)" }}>
                  {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            {/* Plan selection */}
            <div>
              <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--text-muted)", marginBottom: 8 }}>Select Plan</label>
              <div style={{ display: "flex", gap: 8 }}>
                {plans.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPlan(p.id)}
                    style={{
                      flex: 1,
                      padding: "10px 8px",
                      borderRadius: 10,
                      border: `1px solid ${selectedPlan === p.id ? "var(--accent)" : "var(--border-strong)"}`,
                      background: selectedPlan === p.id ? "var(--accent-bg)" : "var(--bg-hover)",
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                  >
                    <p style={{ fontSize: 12, fontWeight: 700, color: selectedPlan === p.id ? "var(--accent-dark)" : "var(--text-primary)", marginBottom: 2 }}>
                      {p.label.split(" –")[0]}
                    </p>
                    <p style={{ fontSize: 10, color: "var(--text-muted)" }}>{p.sub}</p>
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
              <input type="checkbox" id="terms" style={{ marginTop: 2, width: 15, height: 15, accentColor: "#FACC15" }} />
              <label htmlFor="terms" style={{ fontSize: 12, color: "var(--text-muted)", cursor: "pointer", lineHeight: 1.5 }}>
                I agree to the{" "}
                <a href="#" style={{ color: "var(--accent-dark)", textDecoration: "none" }}>Terms of Service</a>
                {" "}and{" "}
                <a href="#" style={{ color: "var(--accent-dark)", textDecoration: "none" }}>Privacy Policy</a>
              </label>
            </div>

            <Link href="/dashboard">
              <button className="btn-primary glow-secondary" style={{ width: "100%", justifyContent: "center", fontSize: 15, padding: "13px 20px" }}>
                Create Free Account <ArrowRight size={16} />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
