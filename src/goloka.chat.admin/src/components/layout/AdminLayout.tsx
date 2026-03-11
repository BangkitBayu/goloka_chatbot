"use client";

import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import { usePathname } from "next/navigation";

const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/sessions": "WhatsApp Sessions",
  "/blast": "New Blast Campaign",
  "/chatbot": "Chatbot Rules",
  "/pricing": "Pricing & Quota",
  "/settings": "Settings",
  "/faq": "FAQ & Help",
};

function getPageTitle(pathname: string): string {
  for (const [path, title] of Object.entries(pageTitles)) {
    if (pathname === path || pathname.startsWith(path + "/")) return title;
  }
  return "GOLOKA";
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const pageTitle = getPageTitle(pathname);

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        overflow: "hidden",
        background: "var(--bg-base)",
        transition: "background 0.25s ease",
      }}
    >
      <Sidebar />
      <div style={{ display: "flex", flexDirection: "column", flex: 1, minWidth: 0, overflow: "hidden" }}>
        <Navbar pageTitle={pageTitle} />
        <main
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "28px 36px",
            background: "var(--bg-base)",
            transition: "background 0.25s ease",
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
