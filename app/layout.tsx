import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ViewTransitions } from "next-view-transitions";
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
  icons: {
    icon: "/pronouns.blue-round.svg",
    shortcut: "/pronouns.blue-round.svg",
  },
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
    <ViewTransitions>
      <html lang="en" data-theme="dark" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen flex-col antialiased`}
        >
          <script dangerouslySetInnerHTML={{ __html: themeScript }} />
          <AppNav />
          <main className="flex flex-1 flex-col">{children}</main>
          <footer className="border-t border-[var(--border)] py-4 text-center text-xs text-[var(--muted)]">
            <nav className="flex flex-wrap justify-center gap-x-5 gap-y-1">
              <a href="/privacy" className="hover:text-[var(--text)]">
                Privacy Policy
              </a>
              <a href="/credits" className="hover:text-[var(--text)]">
                Credits
              </a>
              <a
                href="https://github.com/trueberryless-org/pronouns.blue"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--text)]"
              >
                GitHub
              </a>
            </nav>
          </footer>
        </body>
      </html>
    </ViewTransitions>
  );
}
