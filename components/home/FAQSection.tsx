"use client";

import React from "react";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/Icons";
import Accordion, { AccordionItem } from "@/components/ui/Accordion";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

export default function FAQSection() {
  const faqItems: AccordionItem[] = [
    {
      id: "faq-1",
      question: "What kind of inputs can I use to generate cartoon videos?",
      answer:
        "You can generate cartoon videos and animations from three primary input methods: (1) Descriptive natural text prompts (e.g., 'A cyberpunk anime warrior dodging lasers on a neon hoverboard'), (2) Photo uploads (turning any selfie, portrait, or pet photo into a 3D Pixar, anime, or comic avatar), and (3) Short video clips (applying style transfer neural filters to transform live-action videos into animated sequences).",
    },
    {
      id: "faq-2",
      question: "How long can generated AI cartoon videos be?",
      answer:
        "Free Starter users can generate 5 to 8-second animated clips. Creator Pro and Studio members can render videos up to 30 seconds per single generation, or stitch multiple generated scenes together seamlessly using our scene extension pipeline for long-form YouTube and explainer videos.",
    },
    {
      id: "faq-3",
      question: "Do I own full commercial rights to the generated animations and images?",
      answer:
        "Yes! All videos, animations, character portraits, and assets generated under the Creator Pro and Studio plans include full commercial rights. You can freely monetize them on YouTube, TikTok, Instagram, sell merchandise, use them in client ad campaigns, or integrate them into indie video games and books.",
    },
    {
      id: "faq-4",
      question: "Do I need a powerful GPU or local hardware setup?",
      answer:
        "Not at all. The entire neural rendering process runs on our distributed, high-speed cloud GPU clusters. You can use ToonForge AI from any standard browser on a MacBook, Chromebook, Windows PC, iPad, or mobile smartphone without heating up your device or draining battery.",
    },
    {
      id: "faq-5",
      question: "What output formats, aspect ratios, and resolutions are supported?",
      answer:
        "ToonForge supports high-resolution MP4 video exports, lossless WebM, and ProRes 4444 with transparent alpha channels. You can export in standard widescreen (16:9 for YouTube and film), vertical portrait (9:16 for TikTok, Instagram Reels, and YouTube Shorts), or square (1:1 for social feeds) at up to 4K 60fps.",
    },
    {
      id: "faq-6",
      question: "Can I add custom voiceovers, sound effects, and lip-syncing?",
      answer:
        "Yes! Our AI voice synthesis engine allows you to type dialogue or upload your own recorded audio voiceover. The engine analyzes phonemes and automatically synchronizes the character's facial expressions and lip movements with realistic timing in over 30 languages.",
    },
    {
      id: "faq-7",
      question: "How does the subscription refund or cancellation policy work?",
      answer:
        "You can cancel your subscription at any time with a single click from your account dashboard. If you cancel, your plan remains active until the end of your current billing cycle. We also offer a 7-day money-back guarantee on all first-time Pro subscriptions if you are not satisfied with your results.",
    },
  ];

  return (
    <section id="faq" className="py-20 lg:py-28 relative scroll-mt-16 bg-slate-950/40">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <Badge variant="purple" size="md" dot>
            <span>Got Questions?</span>
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-base text-slate-400">
            Everything you need to know about our AI video models, commercial licenses, and rendering capabilities.
          </p>
        </div>

        {/* Accordion List */}
        <Accordion items={faqItems} defaultOpenId="faq-1" allowMultiple={false} />

        {/* Still Have Questions CTA */}
        <div className="p-8 rounded-2xl bg-gradient-to-r from-purple-950/40 via-slate-900 to-pink-950/40 border border-purple-800/40 text-center space-y-4">
          <h3 className="text-lg font-bold text-white">
            Have a question that isn&apos;t answered here?
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
            Our creator support team is available 24/7 to help you with prompt optimization, custom workflows, or enterprise plan questions.
          </p>
          <Link href="/contact" className="inline-block pt-1">
            <Button
              variant="outline"
              size="md"
              rightIcon={<ArrowRightIcon className="w-4 h-4" />}
            >
              Contact Support Team
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
