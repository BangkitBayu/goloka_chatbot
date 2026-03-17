"use client";

import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Smartphone,
  Zap,
  Bot,
  CreditCard,
  Settings,
  HelpCircle,
  ChevronRight,
  Wifi,
  LogOut,
} from "lucide-react";
import { dashboardStats } from "@/lib/dummy-data";
import clsx from "clsx";
import { useEffect, useState } from "react";
import AuthService from "@/services/auth.service";
import Cookies from "js-cookie";

const navLinks = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/sessions", label: "WA Sessions", icon: Smartphone },
  { href: "/blast", label: "New Blast", icon: Zap },
  { href: "/chatbot", label: "Chatbot Rules", icon: Bot },
  { href: "/pricing", label: "Pricing & Quota", icon: CreditCard },
  { href: "/settings", label: "Settings", icon: Settings },
  { href: "/faq", label: "FAQ", icon: HelpCircle },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { quotaUsed, quotaTotal, plan, activeNumbers } = dashboardStats;
  const quotaPct = Math.round((quotaUsed / quotaTotal) * 100);
  const [user, setUser] = useState({
    name: "",
    email: "",
    activeNumbers,
  });

  const authSvc = new AuthService();

  useEffect(() => {
    const fetchUser = async () => {
      const user = await authSvc.me();
      console.log("user", user);
      setUser(user.data);
    };
    fetchUser();
  }, []);

  return (
    <aside
      style={{
        width: 260,
        background: "var(--bg-sidebar)",
        borderRight: "1px solid var(--border)",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        flexShrink: 0,
        transition: "background 0.25s ease",
      }}
    >
      {/* Logo */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "22px 24px",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: 12,
            background: "linear-gradient(135deg, #FACC15, #CA8A04)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Wifi size={18} color="#0F0F0F" strokeWidth={2.5} />
        </div>
        <div>
          <span
            style={{
              fontWeight: 900,
              fontSize: 13,
              letterSpacing: "0.18em",
              color: "var(--accent)",
            }}
          >
            GOLOKA
          </span>
          <p
            style={{
              fontSize: 10,
              color: "var(--text-muted)",
              marginTop: -2,
              letterSpacing: "0.06em",
            }}
          >
            WhatsApp Blast
          </p>
        </div>
      </div>

      {/* Nav */}
      <nav
        style={{
          flex: 1,
          padding: "12px",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {navLinks.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={clsx("sidebar-link", isActive && "active")}
            >
              <Icon size={17} strokeWidth={isActive ? 2.5 : 2} />
              <span>{label}</span>
              {isActive && (
                <ChevronRight
                  size={13}
                  style={{ marginLeft: "auto", opacity: 0.6 }}
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Quota Widget */}
      <div style={{ padding: "0 12px 8px" }}>
        <div
          style={{
            background: "var(--bg-glow-subtle)",
            border: "1px solid var(--border-accent)",
            borderRadius: 14,
            padding: "14px 16px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 8,
            }}
          >
            <span
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: "var(--text-primary)",
              }}
            >
              Monthly Quota
            </span>
            <span className="badge-yellow">{plan}</span>
          </div>
          <div
            style={{
              width: "100%",
              height: 5,
              borderRadius: 99,
              background: "var(--border-strong)",
              overflow: "hidden",
              marginBottom: 6,
            }}
          >
            <div
              style={{
                width: `${quotaPct}%`,
                height: "100%",
                background: "linear-gradient(90deg, #FACC15, #CA8A04)",
                borderRadius: 99,
              }}
            />
          </div>
          <p style={{ fontSize: 11, color: "var(--text-muted)" }}>
            {quotaUsed.toLocaleString()} / {quotaTotal.toLocaleString()} msgs
          </p>
        </div>
      </div>

      {/* User Profile */}
      <div style={{ padding: "0 12px 16px" }}>
        <a
          href="/login"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "10px 12px",
            borderRadius: 12,
            cursor: "pointer",
            transition: "background 0.2s",
            textDecoration: "none",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "var(--bg-hover)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "transparent")
          }
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #FACC15, #CA8A04)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 800,
              fontSize: 13,
              color: "#0F0F0F",
              flexShrink: 0,
            }}
          >
            SA
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: "var(--text-primary)",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {user.name}
            </p>
            <p
              style={{
                fontSize: 11,
                color: "var(--text-muted)",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {user.email}
            </p>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "var(--success)",
              }}
            />
            <span style={{ fontSize: 10, color: "var(--text-muted)" }}>
              {activeNumbers} active
            </span>
          </div>
        </a>
        {/* Logout */}
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            width: "100%",
            padding: "8px 12px",
            borderRadius: 10,
            border: "none",
            background: "none",
            cursor: "pointer",
            color: "var(--danger)",
            fontSize: 13,
            fontWeight: 500,
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "var(--danger-bg)")
          }
          onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
          onClick={() => {
            Cookies.remove("token");
            redirect("/login");
          }}
        >
          <LogOut size={14} />
          Sign out
        </button>
      </div>
    </aside>
  );
}
