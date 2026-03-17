"use client";

import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, Wifi, ArrowRight, Sun, Moon } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import Link from "next/link";
import authService from "@/services/auth.service";
import { redirect } from "next/navigation";
import Cookies from "js-cookie";

const features = [
  "Connect unlimited WhatsApp numbers",
  "Send bulk messages to thousands instantly",
  "Automate replies with chatbot rules",
  "Detailed delivery analytics & reports",
];

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { theme, toggleTheme } = useTheme();

  const authSvc = new authService();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await authSvc.login(email, password);
    if (response.success) {
      Cookies.set("token", response.data.token, { expires: 7 });
      redirect("/dashboard");
    }
  };


  return (
    <div style={{ display: "flex", width: "100%", minHeight: "100vh" }}>
      {/* Left – Brand Panel */}
      <div
        style={{
          flex: "0 0 42%",
          background:
            "linear-gradient(160deg, #0A0A0A 0%, #1A1A00 60%, #0A0A0A 100%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "48px 56px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* BG glow */}
        <div
          style={{
            position: "absolute",
            top: "30%",
            left: "20%",
            width: 400,
            height: 400,
            background:
              "radial-gradient(circle, rgba(250,204,21,0.08) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: 14,
              background: "linear-gradient(135deg, #FACC15, #CA8A04)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Wifi size={20} color="#0F0F0F" strokeWidth={2.5} />
          </div>
          <div>
            <span
              style={{
                fontWeight: 900,
                fontSize: 16,
                letterSpacing: "0.18em",
                color: "#FACC15",
              }}
            >
              GOLOKA
            </span>
            <p style={{ fontSize: 10, color: "#71717A", marginTop: -2 }}>
              WhatsApp Blast
            </p>
          </div>
        </div>

        {/* Center content */}
        <div>
          <p
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: "#CA8A04",
              letterSpacing: "0.12em",
              marginBottom: 12,
            }}
          >
            WELCOME BACK
          </p>
          <h1
            style={{
              fontSize: 38,
              fontWeight: 900,
              color: "#EAEAEA",
              lineHeight: 1.15,
              marginBottom: 20,
            }}
          >
            Blast smarter,
            <br />
            not harder.
          </h1>
          <p
            style={{
              fontSize: 14,
              color: "#71717A",
              lineHeight: 1.7,
              marginBottom: 36,
            }}
          >
            GOLOKA powers your WhatsApp marketing at scale. Reach thousands of
            customers with a few clicks.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {features.map((f) => (
              <div
                key={f}
                style={{ display: "flex", alignItems: "center", gap: 12 }}
              >
                <div
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    background: "rgba(250,204,21,0.12)",
                    border: "1px solid rgba(250,204,21,0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    fontSize: 11,
                    color: "white",
                  }}
                >
                  ✓
                </div>
                <span style={{ fontSize: 13, color: "#A1A1AA" }}>{f}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <p style={{ fontSize: 11, color: "#52525B" }}>
          © 2026 GOLOKA. All rights reserved.
        </p>
      </div>

      {/* Right – Form Panel */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "48px 64px",
          background: "var(--bg-card)",
          position: "relative",
        }}
      >
        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          style={{
            position: "absolute",
            top: 24,
            right: 24,
            width: 38,
            height: 38,
            borderRadius: 10,
            background: "var(--bg-hover)",
            border: "1px solid var(--border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "var(--text-muted)",
          }}
        >
          {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
        </button>

        <div style={{ width: "100%", maxWidth: 400 }}>
          <h2
            style={{
              fontSize: 26,
              fontWeight: 800,
              color: "var(--text-primary)",
              marginBottom: 6,
            }}
          >
            Sign in to GOLOKA
          </h2>
          <p
            style={{
              fontSize: 14,
              color: "var(--text-muted)",
              marginBottom: 32,
            }}
          >
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              style={{
                color: "var(--accent-dark)",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Create one free
            </Link>
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
              marginBottom: 24,
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--accent)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--border-strong)";
            }}
          >
            {/* Google G logo inline SVG */}
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </button>

          {/* Divider */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              marginBottom: 24,
            }}
          >
            <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
            <span style={{ fontSize: 12, color: "var(--text-muted)" }}>
              or sign in with email
            </span>
            <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
          </div>

          {/* Form */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: 12,
                  fontWeight: 600,
                  color: "var(--text-muted)",
                  marginBottom: 6,
                }}
              >
                Email Address
              </label>
              <div style={{ position: "relative" }}>
                <Mail
                  size={15}
                  color="var(--text-muted)"
                  style={{
                    position: "absolute",
                    left: 14,
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                />
                <input
                  type="email"
                  className="input-field"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ paddingLeft: 38 }}
                />
              </div>
            </div>

            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 6,
                }}
              >
                <label
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: "var(--text-muted)",
                  }}
                >
                  Password
                </label>
                <a
                  href="#"
                  style={{
                    fontSize: 12,
                    color: "var(--accent-dark)",
                    textDecoration: "none",
                    fontWeight: 500,
                  }}
                >
                  Forgot password?
                </a>
              </div>
              <div style={{ position: "relative" }}>
                <Lock
                  size={15}
                  color="var(--text-muted)"
                  style={{
                    position: "absolute",
                    left: 14,
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  className="input-field"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ paddingLeft: 38, paddingRight: 42 }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: 12,
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "var(--text-muted)",
                  }}
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <input
                type="checkbox"
                id="remember"
                style={{ width: 15, height: 15, accentColor: "#FACC15" }}
              />
              <label
                htmlFor="remember"
                style={{
                  fontSize: 13,
                  color: "var(--text-muted)",
                  cursor: "pointer",
                }}
              >
                Keep me signed in for 30 days
              </label>
            </div>

              <button
                onClick={handleLogin}
                className="btn-primary glow-secondary"
                style={{
                  width: "100%",
                  justifyContent: "center",
                  fontSize: 15,
                  padding: "13px 20px",
                  marginTop: 4,
                }}
              >
                Sign In <ArrowRight size={16} />
              </button>
          </div>

          <p
            style={{
              textAlign: "center",
              fontSize: 12,
              color: "var(--text-muted)",
              marginTop: 28,
            }}
          >
            By signing in you agree to our{" "}
            <a
              href="#"
              style={{ color: "var(--accent-dark)", textDecoration: "none" }}
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="#"
              style={{ color: "var(--accent-dark)", textDecoration: "none" }}
            >
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
