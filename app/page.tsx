import React from "react";
import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import StatsBar from "@/components/home/StatsBar";
import FeaturesSection from "@/components/home/FeaturesSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import StyleGallerySection from "@/components/home/StyleGallerySection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import PricingSection from "@/components/home/PricingSection";
import FAQSection from "@/components/home/FAQSection";
import FinalCTASection from "@/components/home/FinalCTASection";

export const metadata: Metadata = {
  title: "ToonForge AI — Turn Any Idea Into Animated Magic",
  description:
    "Generate stunning cartoon-style videos and images from text, photos, or clips in seconds. AI-powered 3D Pixar, Anime, Comic Ink, and Claymation video generation.",
  openGraph: {
    title: "ToonForge AI — AI Cartoon & Video Generator",
    description:
      "Turn text prompts, selfies, or video clips into stylized cartoon animations in seconds with AI. No animation skills required.",
    url: "https://toonforge.ai",
    siteName: "ToonForge AI",
    images: [
      {
        url: "/images/hero-cartoon.jpg",
        width: 1200,
        height: 630,
        alt: "ToonForge AI Cartoon Video Generator",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ToonForge AI — Turn Any Idea Into Animated Magic",
    description:
      "Generate stunning cartoon-style videos and images from text, photos, or clips in seconds.",
    images: ["/images/hero-cartoon.jpg"],
  },
};

export default function HomePage() {
  return (
    <div className="space-y-4">
      {/* 1. Hero Section + Interactive Generator */}
      <HeroSection />

      {/* 2. Stats & Trust Bar */}
      <StatsBar />

      {/* 3. Features Section (6 Cards) */}
      <FeaturesSection />

      {/* 4. How It Works (4 Steps) */}
      <HowItWorksSection />

      {/* 5. Style Gallery / Showcase */}
      <StyleGallerySection />

      {/* 6. Testimonials Section */}
      <TestimonialsSection />

      {/* 7. Pricing Section */}
      <PricingSection />

      {/* 8. FAQ Section */}
      <FAQSection />

      {/* 9. Final CTA Banner */}
      <FinalCTASection />
    </div>
  );
}
