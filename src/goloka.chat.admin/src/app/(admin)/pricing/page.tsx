import { Check, X, Zap, Building2, Sparkles } from "lucide-react";
import { pricingPlans, dashboardStats } from "@/lib/dummy-data";

const planIcons = [Zap, Sparkles, Building2];

export default function PricingPage() {
  const { quotaUsed, quotaTotal, plan: currentPlan } = dashboardStats;
  const quotaPct = Math.round((quotaUsed / quotaTotal) * 100);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 28, width: "100%" }}>
      {/* Header */}
      <div style={{ textAlign: "center", maxWidth: 560, margin: "0 auto" }}>
        <h2 style={{ fontSize: 24, fontWeight: 800, color: "var(--text-primary)", marginBottom: 8 }}>
          Simple, Transparent Pricing
        </h2>
        <p style={{ fontSize: 14, color: "var(--text-muted)" }}>
          Scale your WhatsApp marketing as your business grows. No hidden fees, cancel anytime.
        </p>
      </div>

      {/* Quota Widget */}
      <div
        style={{
          borderRadius: 18,
          padding: "20px 24px",
          background: "var(--accent-bg)",
          border: "1px solid var(--border-accent)",
          display: "flex",
          alignItems: "center",
          gap: 20,
        }}
      >
        <div style={{ width: 46, height: 46, borderRadius: 12, background: "rgba(250,204,21,0.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Sparkles size={20} color="var(--accent)" />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>Current Plan: {currentPlan}</p>
            <span className="badge-yellow">{currentPlan}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
            <div style={{ flex: 1, height: 6, borderRadius: 99, background: "var(--border-strong)", overflow: "hidden" }}>
              <div style={{ width: `${quotaPct}%`, height: "100%", background: "linear-gradient(90deg, #FACC15, #CA8A04)", borderRadius: 99 }} />
            </div>
            <span style={{ fontSize: 12, color: "var(--text-muted)", flexShrink: 0 }}>{quotaPct}%</span>
          </div>
          <p style={{ fontSize: 12, color: "var(--text-muted)" }}>
            {quotaUsed.toLocaleString()} / {quotaTotal.toLocaleString()} messages used this month
          </p>
        </div>
        <div style={{ textAlign: "right", flexShrink: 0 }}>
          <p style={{ fontSize: 11, color: "var(--text-muted)" }}>Resets in</p>
          <p style={{ fontSize: 16, fontWeight: 700, color: "var(--text-primary)" }}>19 days</p>
        </div>
      </div>

      {/* Plan cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }}>
        {pricingPlans.map((plan, idx) => {
          const Icon = planIcons[idx];
          const isCurrentPlan = plan.name === currentPlan;

          return (
            <div
              key={plan.id}
              style={{
                borderRadius: 20,
                background: "var(--bg-card)",
                border: `1px solid ${plan.highlight ? "var(--border-accent)" : "var(--border)"}`,
                padding: plan.highlight ? "28px" : "24px",
                display: "flex",
                flexDirection: "column",
                position: "relative",
                overflow: "hidden",
                boxShadow: plan.highlight ? "0 0 40px var(--accent-glow)" : "none",
                transition: "all 0.25s ease",
              }}
            >
              {plan.highlight && (
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: 200,
                    height: 200,
                    background: "radial-gradient(circle, var(--accent-bg) 0%, transparent 70%)",
                    transform: "translate(40px, -60px)",
                    pointerEvents: "none",
                  }}
                />
              )}
              {plan.badge && (
                <div style={{ marginBottom: 12 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 12px", borderRadius: 99, background: "var(--accent-bg)", border: "1px solid var(--border-accent)", color: "var(--accent-dark)" }}>
                    ⚡ {plan.badge}
                  </span>
                </div>
              )}
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
                <div style={{ width: 42, height: 42, borderRadius: 12, background: plan.highlight ? "var(--accent-bg)" : "var(--bg-base)", display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${plan.highlight ? "var(--border-accent)" : "var(--border)"}` }}>
                  <Icon size={18} color={plan.highlight ? "var(--accent)" : "var(--text-muted)"} />
                </div>
                <div>
                  <p style={{ fontWeight: 700, color: "var(--text-primary)", fontSize: 15 }}>{plan.name}</p>
                  {isCurrentPlan && <span className="badge-green" style={{ fontSize: 10 }}>Current Plan</span>}
                </div>
              </div>
              <div style={{ marginBottom: 22 }}>
                {plan.price === 0 ? (
                  <p style={{ fontSize: 32, fontWeight: 900, color: "var(--text-primary)" }}>Free</p>
                ) : (
                  <div style={{ display: "flex", alignItems: "flex-end", gap: 2 }}>
                    <span style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 4 }}>Rp</span>
                    <span style={{ fontSize: 32, fontWeight: 900, color: "var(--text-primary)" }}>{plan.price.toLocaleString("id-ID")}</span>
                    <span style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 5 }}>/{plan.pricePeriod}</span>
                  </div>
                )}
              </div>
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
                {plan.features.map((f) => (
                  <div key={f.label} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <div style={{ marginTop: 2, flexShrink: 0 }}>
                      {f.included
                        ? <Check size={13} color={plan.highlight ? "var(--accent)" : "var(--success)"} />
                        : <X size={13} color="var(--text-muted)" />}
                    </div>
                    <div style={{ flex: 1, display: "flex", justifyContent: "space-between", gap: 8 }}>
                      <span style={{ fontSize: 12, color: f.included ? "var(--text-primary)" : "var(--text-muted)" }}>{f.label}</span>
                      <span style={{ fontSize: 12, fontWeight: 600, color: f.included ? (plan.highlight ? "var(--accent-dark)" : "var(--text-primary)") : "var(--text-muted)", flexShrink: 0 }}>{f.value}</span>
                    </div>
                  </div>
                ))}
              </div>
              <button
                className={plan.highlight ? "btn-primary glow-secondary-sm" : "btn-ghost"}
                style={{ width: "100%", justifyContent: "center", ...(plan.highlight ? {} : { borderColor: "var(--border-strong)" }) }}
              >
                {plan.ctaLabel}
              </button>
            </div>
          );
        })}
      </div>
      <p style={{ textAlign: "center", fontSize: 12, color: "var(--text-muted)" }}>
        All prices in IDR · VAT may apply · Monthly billing · No contracts
      </p>
    </div>
  );
}
