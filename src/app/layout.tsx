import type { Metadata } from "next";
import "@/styles/globals.css";
export const metadata: Metadata = {
  title: "Free PDF Page Rotator - Rotate Individual or All Pages",
  description:
    "Rotate individual or all pages in your PDF effortlessly. No downloads or sign-ups. Fast, secure, and user-friendly. Try now!",
  keywords: "React,PDF,rotate",
  robots: "index,follow",
  icons: "https://pdf.ai/favicon.ico",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
