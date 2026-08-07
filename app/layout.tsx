import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "ToonForge AI — Turn Any Idea Into a Cartoon Character Instantly",
    template: "%s | ToonForge AI",
  },
  description:
    "Generate custom, high-definition AI cartoon characters in seconds from simple text prompts or photo uploads. Powered by advanced latent diffusion neural models.",
  keywords: [
    "AI cartoon generator",
    "text to cartoon AI",
    "AI character generator",
    "photo to cartoon AI",
    "anime AI generator",
    "3D Pixar style generator",
    "ToonForge AI",
    "ToonCraft",
    "CartoonGen",
  ],
  openGraph: {
    title: "ToonForge AI — Turn Any Idea Into a Cartoon Character",
    description:
      "Create high-definition AI cartoon character art instantly. Free text-to-character generation with multiple art styles.",
    url: "https://toonforge.ai",
    siteName: "ToonForge AI",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ToonForge AI — AI Cartoon Character Generator",
    description: "Turn any prompt or photo into a custom cartoon character avatar with AI.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans antialiased selection:bg-indigo-500 selection:text-white">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
