import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "ToonForge AI — Turn Any Idea Into Animated Magic",
    template: "%s | ToonForge AI",
  },
  description:
    "Generate stunning cartoon-style videos and images from text, photos, or clips in seconds. AI-powered 3D Pixar, Anime, Comic Ink, and Claymation video generation without animation skills.",
  keywords: [
    "AI cartoon generator",
    "AI video generator",
    "text to cartoon video",
    "photo to animation AI",
    "cartoon video maker",
    "anime video generator",
    "3D Pixar style generator",
    "ToonForge AI",
    "AI animation software",
    "lip sync animation AI",
  ],
  authors: [{ name: "ToonForge AI Team" }],
  creator: "ToonForge AI",
  publisher: "ToonForge AI, Inc.",
  metadataBase: new URL("https://toonforge.ai"),
  openGraph: {
    title: "ToonForge AI — Turn Any Idea Into Animated Magic",
    description:
      "Generate stunning cartoon-style videos and images from text, photos, or clips in seconds. No animation skills required.",
    url: "https://toonforge.ai",
    siteName: "ToonForge AI",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/hero-cartoon.jpg",
        width: 1200,
        height: 630,
        alt: "ToonForge AI Cartoon Video Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ToonForge AI — AI Cartoon & Video Generator",
    description:
      "Generate stunning cartoon-style videos and images from text, photos, or clips in seconds.",
    images: ["/images/hero-cartoon.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="min-h-screen bg-[#06080f] text-slate-100 flex flex-col font-sans antialiased selection:bg-purple-600 selection:text-white">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
