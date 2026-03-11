export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        background: "var(--bg-base)",
        transition: "background 0.25s ease",
      }}
    >
      {children}
    </div>
  );
}
