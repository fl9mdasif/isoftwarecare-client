"use client";

import { Toaster } from "react-hot-toast";
import { ReduxProvider } from "@/redux/reduxProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider>
      {children}
      <Toaster
        position="bottom-right"
        toastOptions={{
          // Design tokens rather than literals, so toasts follow the theme
          // instead of staying dark on a light page.
          style: {
            background: "var(--surface-2)",
            color: "var(--text)",
            border: "1px solid var(--border-strong)",
            borderRadius: "var(--radius)",
            boxShadow: "var(--shadow-pop)",
            fontSize: ".9rem",
          },
          success: { iconTheme: { primary: "var(--acid)", secondary: "var(--on-accent)" } },
          error: { iconTheme: { primary: "var(--danger)", secondary: "var(--on-accent)" } },
        }}
      />
    </ReduxProvider>
  );
}
