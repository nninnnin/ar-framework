import type { Metadata } from "next";

import "./globals.css";
import GlobalWrapper from "@/components/GlobalWrapper";

export const metadata: Metadata = {
  title: "AR Framework",
  description: "represented by Rebel9, produced by @justindglee",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        style={{
          height: "100dvh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <GlobalWrapper>
          <h1
            style={{
              backgroundColor: "#c4f551",
              padding: "0.5em",
            }}
          >
            ARF
          </h1>

          <div
            style={{
              backgroundColor: "black",
              flex: 1,
            }}
          >
            {children}
          </div>
        </GlobalWrapper>
      </body>
    </html>
  );
}
