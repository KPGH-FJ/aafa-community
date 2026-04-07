import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AAFA - 为了AGI的降临，构建最真实的AI世界",
  description: "帮普通人看清AI真相，了解真实的AI世界、用好AI工具的社区。我们关注AI的真实与虚假，提供最前沿的AI资讯、最犀利的AI观点、最全面的AI产品推荐。",
  keywords: ["AI", "AGI", "人工智能", "AI社区", "AI工具", "AI资讯"],
  authors: [{ name: "AAFA" }],
  openGraph: {
    title: "AAFA - 为了AGI的降临，构建最真实的AI世界",
    description: "帮普通人看清AI真相，了解真实的AI世界、用好AI工具的社区。",
    type: "website",
    locale: "zh_CN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${inter.variable} h-full antialiased`}
    >
      <head>
        <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA_ID || ''} />
      </head>
      <body className="min-h-full flex flex-col bg-[#FAFAF8] text-[#2C2C2C]">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
