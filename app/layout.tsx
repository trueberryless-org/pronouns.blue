import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppNav } from "@/components/AppNav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "pronouns.blue",
  description: "Share your names and pronouns with the ATProto network.",
};

const themeScript = `
(() => {
  try {
    const key = "pronounsblue-theme";
    const saved = localStorage.getItem(key);
    const theme = saved || "dark";
    document.documentElement.setAttribute("data-theme", theme);
  } catch {
    document.documentElement.setAttribute("data-theme", "dark");
  }
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen flex-col antialiased`}
      >
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <AppNav />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
