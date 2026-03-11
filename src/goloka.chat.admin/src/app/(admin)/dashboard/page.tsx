import {
  MessageSquare,
  Users,
  Smartphone,
  TrendingUp,
  Activity,
  ArrowUpRight,
  Zap,
  Bot,
} from "lucide-react";
import { dashboardStats, blastCampaigns, whatsappSessions } from "@/lib/dummy-data";

const stats = [
  {
    label: "Messages Sent",
    value: dashboardStats.totalMessagesSent.toLocaleString(),
    change: "+12.4%",
    icon: MessageSquare,
    color: "#FACC15",
    bgVar: "var(--accent-bg)",
    borderColor: "var(--border-accent)",
  },
  {
    label: "Total Recipients",
    value: dashboardStats.totalRecipients.toLocaleString(),
    change: "+8.1%",
    icon: Users,
    color: "var(--success)",
    bgVar: "var(--success-bg)",
    borderColor: "rgba(74,222,128,0.2)",
  },
  {
    label: "Active Numbers",
    value: String(dashboardStats.activeNumbers),
    change: "Online",
    icon: Smartphone,
    color: "var(--info)",
    bgVar: "var(--info-bg)",
    borderColor: "rgba(96,165,250,0.2)",
  },
  {
    label: "Success Rate",
    value: `${dashboardStats.successRate}%`,
    change: "+0.6%",
    icon: TrendingUp,
    color: "var(--purple)",
    bgVar: "var(--purple-bg)",
    borderColor: "rgba(167,139,250,0.2)",
  },
];

const statusClass: Record<string, string> = {
  completed: "badge-green",
  running: "badge-yellow",
  scheduled: "badge-yellow",
  failed: "badge-red",
};

export default function DashboardPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, width: "100%" }}>
      {/* Welcome Banner */}
      <div
        style={{
          borderRadius: 20,
          padding: "28px 36px",
          position: "relative",
          overflow: "hidden",
          background: "linear-gradient(135deg, var(--accent-bg) 0%, var(--bg-card) 60%)",
          border: "1px solid var(--border-accent)",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            width: 300,
            height: 300,
            background: "radial-gradient(circle, var(--accent-bg) 0%, transparent 70%)",
            transform: "translate(60px, -80px)",
            pointerEvents: "none",
          }}
        />
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", color: "var(--accent-dark)", marginBottom: 4 }}>
          WELCOME BACK
        </p>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: "var(--text-primary)", marginBottom: 4 }}>
          Good morning, Salim 👋
        </h2>
        <p style={{ fontSize: 13, color: "var(--text-muted)" }}>
          You have{" "}
          <span style={{ color: "var(--accent)", fontWeight: 600 }}>2 active blasts</span> running today and{" "}
          <span style={{ color: "var(--accent)", fontWeight: 600 }}>3 numbers</span> connected.
        </p>
      </div>

      {/* Stats Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
        {stats.map(({ label, value, change, icon: Icon, color, bgVar, borderColor }) => (
          <div key={label} className="card">
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20 }}>
              <div
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 12,
                  background: bgVar,
                  border: `1px solid ${borderColor}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon size={18} color={color} />
              </div>
              <span style={{ fontSize: 11, fontWeight: 600, color: "var(--success)", display: "flex", alignItems: "center", gap: 2 }}>
                <ArrowUpRight size={11} />
                {change}
              </span>
            </div>
            <p style={{ fontSize: 26, fontWeight: 800, color: "var(--text-primary)", marginBottom: 2 }}>{value}</p>
            <p style={{ fontSize: 12, color: "var(--text-muted)" }}>{label}</p>
          </div>
        ))}
      </div>

      {/* Two Column */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 16 }}>
        {/* Recent Blasts */}
        <div className="card">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Zap size={15} color="var(--accent)" />
              <span style={{ fontWeight: 600, fontSize: 14, color: "var(--text-primary)" }}>Recent Campaigns</span>
            </div>
            <a href="/blast" style={{ fontSize: 12, color: "var(--accent)", textDecoration: "none" }}>
              View all →
            </a>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {blastCampaigns.map((c) => (
              <div
                key={c.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "14px 16px",
                  borderRadius: 12,
                  background: "var(--bg-base)",
                  border: "1px solid var(--border)",
                }}
              >
                <div>
                  <p style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>{c.name}</p>
                  <p style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 2 }}>
                    {c.scheduledAt} · {c.recipients.toLocaleString()} recipients
                  </p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  {c.status === "running" && (
                    <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "var(--text-muted)" }}>
                      <Activity size={11} color="var(--accent)" />
                      {Math.round((c.sent / c.recipients) * 100)}%
                    </span>
                  )}
                  <span className={statusClass[c.status]}>{c.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Sessions */}
        <div className="card">
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
            <Bot size={15} color="var(--info)" />
            <span style={{ fontWeight: 600, fontSize: 14, color: "var(--text-primary)" }}>Active Sessions</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {whatsappSessions
              .filter((s) => s.status === "connected")
              .map((s) => (
                <div
                  key={s.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "12px 14px",
                    borderRadius: 12,
                    background: "var(--bg-base)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <div
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: "50%",
                      background: "var(--success-bg)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Smartphone size={14} color="var(--success)" />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 12, fontWeight: 600, color: "var(--text-primary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {s.label}
                    </p>
                    <p style={{ fontSize: 11, color: "var(--text-muted)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {s.phone}
                    </p>
                  </div>
                  <div style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--success)", flexShrink: 0 }} />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
