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
          style: {
            background: "#12151D",
            color: "#F4F6FA",
            border: "1px solid rgba(255,255,255,.16)",
            borderRadius: "14px",
            fontSize: ".9rem",
          },
          success: { iconTheme: { primary: "#2EE6C5", secondary: "#06070A" } },
          error: { iconTheme: { primary: "#FF6B81", secondary: "#06070A" } },
        }}
      />
    </ReduxProvider>
  );
}
