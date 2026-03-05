import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { TempoInit } from "@/components/tempo-init";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title:
    "Apprising Creatives - AI Solutions & Intelligent Systems | Transform Your Business",
  description:
    "Apprising Creatives provides cutting-edge AI solutions, machine learning integration, and intelligent systems for enterprises. Transform your business with scalable, custom AI solutions.",
  keywords:
    "AI solutions, machine learning, intelligent systems, AI integration, custom development, system architecture, technical consulting, enterprise AI",
  authors: [
    { name: "Apprising Creatives", url: "https://apprisingcreatives.com" },
  ],
  creator: "Apprising Creatives",
  openGraph: {
    type: "website",
    locale: "en_US",
    title:
      "Apprising Creatives - Enterprise AI Solutions & Intelligent Systems",
    description:
      "Transforming businesses with AI-powered solutions, machine learning integration, and scalable intelligent systems",
    url: "https://apprisingcreatives.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={inter.className} suppressHydrationWarning={true}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <TempoInit />
      </body>
    </html>
  );
}
