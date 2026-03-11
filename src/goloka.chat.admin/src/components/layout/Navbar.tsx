"use client";

import { Bell, ChevronDown, Search, LogOut, User, Settings, Sun, Moon } from "lucide-react";
import { useState } from "react";
import { useTheme } from "@/context/ThemeContext";

interface NavbarProps {
  pageTitle: string;
}

export default function Navbar({ pageTitle }: NavbarProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <header
      className="glass sticky top-0 z-40"
      style={{
        height: 68,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 32px",
        flexShrink: 0,
      }}
    >
      {/* Page Title */}
      <div>
        <h1 style={{ fontSize: 15, fontWeight: 600, color: "var(--text-primary)" }}>{pageTitle}</h1>
        <p style={{ fontSize: 11, color: "var(--text-muted)" }}>
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      {/* Right area */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {/* Search */}
        <div
          className="hidden-mobile"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "7px 14px",
            borderRadius: 10,
            background: "var(--bg-hover)",
            border: "1px solid var(--border-strong)",
            color: "var(--text-muted)",
            fontSize: 13,
          }}
        >
          <Search size={13} />
          <span>Search...</span>
          <kbd
            style={{
              marginLeft: 8,
              fontSize: 10,
              padding: "2px 6px",
              borderRadius: 5,
              background: "var(--border-strong)",
              color: "var(--text-muted)",
              fontFamily: "monospace",
            }}
          >
            ⌘K
          </kbd>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          style={{
            width: 38,
            height: 38,
            borderRadius: 10,
            background: "var(--bg-hover)",
            border: "1px solid var(--border-strong)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "all 0.2s ease",
            color: "var(--text-primary)",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border-strong)")}
        >
          {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
        </button>

        {/* Notification */}
        <button
          style={{
            position: "relative",
            width: 38,
            height: 38,
            borderRadius: 10,
            background: "var(--bg-hover)",
            border: "1px solid var(--border-strong)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <Bell size={15} color="var(--text-primary)" />
          <span
            style={{
              position: "absolute",
              top: 6,
              right: 6,
              width: 14,
              height: 14,
              borderRadius: "50%",
              background: "#FACC15",
              color: "#0F0F0F",
              fontSize: 10,
              fontWeight: 800,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            3
          </span>
        </button>

        {/* User Dropdown */}
        <div style={{ position: "relative" }}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 12px",
              borderRadius: 10,
              background: "var(--bg-hover)",
              border: "1px solid var(--border-strong)",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #FACC15, #CA8A04)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 11,
                fontWeight: 800,
                color: "#0F0F0F",
              }}
            >
              SA
            </div>
            <span style={{ fontSize: 13, fontWeight: 500, color: "var(--text-primary)" }}>
              Salim Admin
            </span>
            <ChevronDown
              size={12}
              color="var(--text-muted)"
              style={{
                transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.2s",
              }}
            />
          </button>

          {dropdownOpen && (
            <div
              style={{
                position: "absolute",
                right: 0,
                top: "calc(100% + 8px)",
                width: 210,
                background: "var(--bg-card)",
                border: "1px solid var(--border-strong)",
                borderRadius: 14,
                overflow: "hidden",
                boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
                zIndex: 100,
              }}
            >
              <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--border)" }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>Salim Admin</p>
                <p style={{ fontSize: 11, color: "var(--text-muted)" }}>admin@goloka.id</p>
              </div>
              {[
                { label: "Profile", icon: User, href: "/settings" },
                { label: "Settings", icon: Settings, href: "/settings" },
              ].map(({ label, icon: Icon, href }) => (
                <a
                  key={label}
                  href={href}
                  onClick={() => setDropdownOpen(false)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "10px 16px",
                    fontSize: 13,
                    color: "var(--text-muted)",
                    textDecoration: "none",
                    transition: "background 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background = "var(--bg-hover)";
                    (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-primary)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                    (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-muted)";
                  }}
                >
                  <Icon size={13} />
                  {label}
                </a>
              ))}
              <div style={{ borderTop: "1px solid var(--border)" }}>
                <a
                  href="/login"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "10px 16px",
                    fontSize: 13,
                    color: "var(--danger)",
                    textDecoration: "none",
                    transition: "background 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background = "var(--danger-bg)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                  }}
                  onClick={() => setDropdownOpen(false)}
                >
                  <LogOut size={13} />
                  Logout
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
