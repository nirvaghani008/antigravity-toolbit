"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CheckIcon, ZapIcon, ArrowRightIcon } from "@/components/Icons";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";

export default function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      name: "Free Starter",
      badge: "Free Forever",
      badgeVariant: "neutral" as const,
      description: "Perfect for testing prompts and exploring AI cartoon styles.",
      monthlyPrice: "$0",
      annualPrice: "$0",
      billingPeriod: "forever",
      cta: "Start Free",
      ctaVariant: "secondary" as const,
      popular: false,
      features: [
        "30 video render credits / month",
        "Standard 720p HD resolution",
        "5 Core art styles (Pixar, Anime, Comic)",
        "Standard generation queue (~5s)",
        "Watermarked video export",
        "Personal non-commercial use",
      ],
    },
    {
      name: "Creator Pro",
      badge: "Most Popular",
      badgeVariant: "pink" as const,
      description: "For YouTubers, TikTokers, marketers, and solo creators building an audience.",
      monthlyPrice: "$19",
      annualPrice: "$14",
      billingPeriod: "per month, billed annually",
      cta: "Get Creator Pro",
      ctaVariant: "primary" as const,
      popular: true,
      features: [
        "500 video render credits / month",
        "Full 4K Ultra-HD & 60fps rendering",
        "All 50+ Cartoon, Anime & Clay styles",
        "AI Voice synthesis & Auto Lip-Sync",
        "No watermarks on video or PNGs",
        "Full Commercial Rights & monetization",
        "Priority high-speed cloud queue",
        "Multi-aspect ratio exports (9:16, 16:9, 1:1)",
      ],
    },
    {
      name: "Studio / Agency",
      badge: "Enterprise Speed",
      badgeVariant: "purple" as const,
      description: "For production studios, creative agencies, and high-volume marketing teams.",
      monthlyPrice: "$59",
      annualPrice: "$44",
      billingPeriod: "per month, billed annually",
      cta: "Launch Studio Plan",
      ctaVariant: "secondary" as const,
      popular: false,
      features: [
        "2,500 video render credits / month",
        "Custom LoRA character model fine-tuning",
        "Unlimited parallel batch rendering",
        "Dedicated cloud GPU cluster nodes",
        "ProRes 4444 transparent alpha export",
        "REST API access for programmatic pipelines",
        "5 Team seats included",
        "Dedicated 24/7 account manager & SLA",
      ],
    },
  ];

  return (
    <section id="pricing" className="py-20 lg:py-28 relative scroll-mt-16">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-purple-900/10 blur-[150px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <Badge variant="purple" size="md" dot>
            <span>Transparent Pricing</span>
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Simple plans for creators <br className="hidden sm:inline" />
            <span className="gradient-text">of every scale</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-400">
            Start completely free with zero credit card required. Upgrade when you need 4K rendering and commercial rights.
          </p>

          {/* Billing Switcher Toggle */}
          <div className="inline-flex items-center gap-3 p-1.5 rounded-full bg-slate-900/90 border border-slate-800 backdrop-blur-md">
            <button
              type="button"
              onClick={() => setIsAnnual(false)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                !isAnnual
                  ? "bg-purple-600 text-white shadow-md shadow-purple-600/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Monthly Billing
            </button>
            <button
              type="button"
              onClick={() => setIsAnnual(true)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                isAnnual
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md shadow-purple-600/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <span>Annual Billing</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                Save 25%
              </span>
            </button>
          </div>
        </div>

        {/* 3 Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, idx) => (
            <Card
              key={idx}
              variant={plan.popular ? "glow" : "glass"}
              hover={true}
              className={`p-7 sm:p-9 flex flex-col justify-between relative ${
                plan.popular
                  ? "ring-2 ring-purple-500/60 shadow-2xl shadow-purple-900/30 bg-slate-900/90"
                  : "border-slate-800/80 hover:border-slate-700"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="px-3.5 py-1 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white text-[11px] font-bold uppercase tracking-wider shadow-lg shadow-purple-600/40">
                    🔥 Most Popular Choice
                  </span>
                </div>
              )}

              <div className="space-y-6">
                {/* Plan Name & Tag */}
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                  <Badge variant={plan.badgeVariant} size="sm">
                    {plan.badge}
                  </Badge>
                </div>

                <p className="text-xs sm:text-sm text-slate-400 min-h-[40px] leading-relaxed">
                  {plan.description}
                </p>

                {/* Price Display */}
                <div className="space-y-1 pb-4 border-b border-slate-800">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                      {isAnnual ? plan.annualPrice : plan.monthlyPrice}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      / month
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono block">
                    {isAnnual && plan.annualPrice !== "$0"
                      ? "Billed annually ($168/year)"
                      : plan.billingPeriod}
                  </span>
                </div>

                {/* Checklist */}
                <div className="space-y-3">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 block">
                    What&apos;s Included:
                  </span>
                  <ul className="space-y-2.5">
                    {plan.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <CheckIcon className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                        <span className="leading-tight">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Card Action Button */}
              <div className="pt-8">
                <Link href="#demo" className="block w-full">
                  <Button
                    variant={plan.ctaVariant}
                    size="lg"
                    className="w-full font-bold shadow-md"
                    rightIcon={<ArrowRightIcon className="w-4 h-4" />}
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>

        {/* Guarantee Banner */}
        <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-white flex items-center justify-center sm:justify-start gap-2">
              <ZapIcon className="w-4 h-4 text-amber-400" />
              <span>Need custom volume or on-premise model weights?</span>
            </h4>
            <p className="text-xs text-slate-400">
              We provide dedicated private clusters, custom art style fine-tuning, and enterprise SLA contracts.
            </p>
          </div>
          <Link href="/contact" className="shrink-0">
            <Button variant="outline" size="sm">
              Contact Enterprise Sales
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
