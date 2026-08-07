"use client";

import React, { useState } from "react";
import Link from "next/link";
import InteractiveGeneratorDemo from "@/components/InteractiveGeneratorDemo";
import TechStackSection from "@/components/TechStackSection";
import FeatureCard from "@/components/FeatureCard";
import GalleryGrid from "@/components/GalleryGrid";
import PricingCard, { PricingPlan } from "@/components/PricingCard";
import TestimonialCard from "@/components/TestimonialCard";
import FAQItem from "@/components/FAQItem";
import CTASection from "@/components/CTASection";
import {
  SparklesIcon,
  WandIcon,
  CpuIcon,
  ZapIcon,
  LayersIcon,
  DownloadIcon,
  ShieldIcon,
  SlidersIcon,
  ArrowRightIcon,
  UserIcon,
} from "@/components/Icons";

export default function HomePage() {
  const [isAnnual, setIsAnnual] = useState(false);

  // Features List (6 Cards)
  const features = [
    {
      icon: <WandIcon className="w-6 h-6" />,
      title: "Text-to-Character AI Generation",
      description:
        "Transform plain text prompts into intricate, stylized cartoon characters with accurate expressions, poses, and clothing.",
      badge: "Core AI",
    },
    {
      icon: <LayersIcon className="w-6 h-6" />,
      title: "Multiple Art Styles",
      description:
        "Switch seamlessly between Japanese Anime, 3D Pixar render, Cute Chibi, Vintage Comic Book, and Disney Storybook aesthetics.",
      badge: "50+ Styles",
    },
    {
      icon: <UserIcon className="w-6 h-6" />,
      title: "Custom Face-to-Cartoon Conversion",
      description:
        "Upload a reference selfie or portrait photo and let our neural style adapter convert your face into a stylized cartoon avatar.",
      badge: "Photo to Toon",
    },
    {
      icon: <DownloadIcon className="w-6 h-6" />,
      title: "High-Resolution 4K Downloads",
      description:
        "Export transparent PNGs, crisp vector SVG paths, and high-resolution 4K images perfect for print, merchandise, or gaming.",
      badge: "4K Export",
    },
    {
      icon: <SlidersIcon className="w-6 h-6" />,
      title: "Character Customization Engine",
      description:
        "Fine-tune character outfits, hair color, emotional expressions, lighting direction, and background environments effortlessly.",
      badge: "Full Control",
    },
    {
      icon: <ZapIcon className="w-6 h-6" />,
      title: "Ultra-Fast Generation Engine",
      description:
        "Powered by optimized TensorRT inference pipelines, generating complete multi-angle character variations in under 3 seconds.",
      badge: "< 3 Seconds",
    },
  ];

  // How It Works Steps (4 Steps)
  const steps = [
    {
      number: "01",
      title: "Describe Your Character or Upload Photo",
      description:
        "Type a descriptive prompt (e.g. 'A cheerful cyberpunk wizard in a purple robe') or upload a portrait reference image.",
      icon: <WandIcon className="w-5 h-5" />,
    },
    {
      number: "02",
      title: "Choose Your Art Style & Model",
      description:
        "Select from 3D Pixar render, Anime, Chibi, Comic Book, or Classic Storybook style adapters with a single click.",
      icon: <SlidersIcon className="w-5 h-5" />,
    },
    {
      number: "03",
      title: "AI Generates Multiple Variations",
      description:
        "Our neural latent diffusion engine renders 4 distinct high-resolution variations in seconds for you to preview.",
      icon: <CpuIcon className="w-5 h-5" />,
    },
    {
      number: "04",
      title: "Download or Refine Character",
      description:
        "Download high-res transparent PNGs, request variations, or edit lighting and outfit details in real-time.",
      icon: <DownloadIcon className="w-5 h-5" />,
    },
  ];

  // Use Cases (6 Cards)
  const useCases = [
    {
      title: "Social Media Avatars",
      description: "Stand out on Twitter, Instagram, and LinkedIn with a custom, memorable AI cartoon avatar.",
      icon: "🎨",
    },
    {
      title: "YouTube & Twitch Profiles",
      description: "Create branded channel avatars, VTuber concepts, and stream overlays for your online brand.",
      icon: "🎮",
    },
    {
      title: "Game Character Concepts",
      description: "Rapidly prototype hero and NPC character concept art for indie video game development.",
      icon: "⚔️",
    },
    {
      title: "Book & Story Illustrations",
      description: "Illustrate children's storybooks, graphic novels, and digital webcomics with consistent characters.",
      icon: "📚",
    },
    {
      title: "Branding & Company Mascots",
      description: "Design friendly corporate mascots and app onboarding avatars that build emotional connection.",
      icon: "🚀",
    },
    {
      title: "Personalized Gifts",
      description: "Turn family, friends, or pets into adorable cartoon artwork for custom prints and mugs.",
      icon: "🎁",
    },
  ];

  // Pricing Plans
  const pricingPlans: PricingPlan[] = [
    {
      name: "Free",
      monthlyPrice: 0,
      annualPrice: 0,
      description: "Perfect for trying out ToonForge AI character generation.",
      features: [
        "10 Free character generations / month",
        "Standard resolution (1024 x 1024)",
        "Access to 5 popular art styles",
        "Personal non-commercial license",
        "Community support",
      ],
      ctaText: "Start Free",
      ctaHref: "#try-demo",
    },
    {
      name: "Pro Creator",
      monthlyPrice: 19,
      annualPrice: 15,
      description: "Ideal for creators, streamers, and indie game developers.",
      isPopular: true,
      features: [
        "500 High-speed character generations / month",
        "High-resolution 4K & Transparent PNG exports",
        "All 50+ AI Art Styles unlocked",
        "Face-to-Cartoon photo conversion model",
        "Full commercial usage rights",
        "Priority GPU queue (< 3 sec render)",
      ],
      ctaText: "Get Pro Creator",
      ctaHref: "#try-demo",
    },
    {
      name: "Unlimited & Business",
      monthlyPrice: 49,
      annualPrice: 39,
      description: "For agencies, studios, and high-volume digital publishers.",
      features: [
        "Unlimited AI character generations",
        "Vector SVG export & source files",
        "Custom LoRA model fine-tuning support",
        "API access & batch generation script",
        "Dedicated account manager",
        "24/7 Priority support",
      ],
      ctaText: "Upgrade to Unlimited",
      ctaHref: "#try-demo",
    },
  ];

  // Testimonials (4 Cards)
  const testimonials = [
    {
      quote:
        "ToonForge AI saved us weeks of pre-production time on our indie game. Generating character turnarounds in Pixar style took seconds instead of days!",
      name: "Elena Rostova",
      role: "Lead Character Designer @ PixelForge Games",
      avatar: "/images/gallery/anime-1.jpg",
      rating: 5,
    },
    {
      quote:
        "The face-to-cartoon feature is mind-blowing. I turned my real portrait into a Twitch mascot that my audience absolutely loves. 10/10 tool!",
      name: "Marcus Vance",
      role: "Streamer & Content Creator",
      avatar: "/images/gallery/pixar-1.jpg",
      rating: 5,
    },
    {
      quote:
        "I illustrated an entire 24-page children's book using ToonForge AI. The style consistency across different poses and scenes is unmatched.",
      name: "Sophia Martinez",
      role: "Children's Book Author",
      avatar: "/images/gallery/3d-1.jpg",
      rating: 5,
    },
    {
      quote:
        "Fast, reliable, and ridiculously fun to use. The 4K transparent PNG export feature alone makes this worth every penny for our marketing team.",
      name: "David Chen",
      role: "Creative Director @ Spark Media",
      avatar: "/images/hero-cartoon.jpg",
      rating: 5,
    },
  ];

  // FAQs (6 Items)
  const faqs = [
    {
      question: "Is ToonForge AI free to use?",
      answer:
        "Yes! We offer a Free Tier that includes 10 free AI character generations per month with standard resolution downloads. No credit card is required to sign up.",
    },
    {
      question: "What AI models power ToonForge AI?",
      answer:
        "ToonForge AI is powered by specialized latent diffusion models fine-tuned with custom LoRA neural weights for character design, line art precision, and 3D lighting consistency.",
    },
    {
      question: "Can I use the generated cartoon characters commercially?",
      answer:
        "Yes! Pro and Unlimited subscribers receive full commercial usage rights, allowing you to use your generated cartoon characters in merchandise, games, books, and advertising.",
    },
    {
      question: "What image resolution and format do I receive?",
      answer:
        "Free tier users get 1024x1024 PNG files. Pro and Unlimited tier users can export up to 4K resolution (4096x4096), transparent background PNGs, and vector SVG files.",
    },
    {
      question: "Do I need any prior digital art or design skills?",
      answer:
        "None at all! Simply type a plain English text prompt describing what you want (or upload a photo), pick your preferred style, and our AI does all the heavy lifting.",
    },
    {
      question: "Is my uploaded photo and prompt data kept private?",
      answer:
        "Absolutely. Your uploaded photos are processed ephemerally in encrypted GPU memory and are never shared or used to train public models without your explicit permission.",
    },
  ];

  return (
    <div className="space-y-20 pb-12">
      {/* 2. HERO SECTION */}
      <section className="relative pt-12 sm:pt-20 pb-12 overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-indigo-600/10 rounded-full blur-[120px] -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-indigo-400 shadow-sm">
              <SparklesIcon className="w-4 h-4 text-indigo-400" />
              <span>Next-Gen AI Character Generator</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>

            {/* Tagline Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight sm:leading-none">
              Turn Any Idea Into a{" "}
              <span className="gradient-text">Cartoon Character</span> — Instantly, with AI
            </h1>

            {/* Subheadline */}
            <p className="text-sm sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Describe your dream character or upload a selfie. ToonForge AI transforms text prompts into high-definition 3D, Anime, Chibi, and Comic cartoon avatars in seconds.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link
                href="#try-demo"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2"
              >
                <WandIcon className="w-4 h-4" />
                <span>Generate Your Character Free</span>
              </Link>
              <Link
                href="#gallery"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl text-sm font-semibold text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-colors flex items-center justify-center gap-2"
              >
                <span>See Examples</span>
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <ShieldIcon className="w-4 h-4 text-indigo-400" />
                <span>Powered by Stable Diffusion & DALL-E-class models</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ZapIcon className="w-4 h-4 text-indigo-400" />
                <span>No design skills needed</span>
              </div>
              <div className="flex items-center gap-1.5">
                <DownloadIcon className="w-4 h-4 text-indigo-400" />
                <span>Instant 4K Export</span>
              </div>
            </div>
          </div>

          {/* Interactive AI Showcase Component */}
          <InteractiveGeneratorDemo />
        </div>
      </section>

      {/* 3. AI TECH / POWERED BY SECTION */}
      <TechStackSection />

      {/* 4. FEATURES SECTION */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-mono uppercase px-3 py-1 rounded-full bg-slate-900 text-slate-400 border border-slate-800">
            Platform Capabilities
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Everything You Need to Create AI Cartoon Characters
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            From prompt engineering to high-res transparent exports, our toolkit gives you full creative freedom.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <FeatureCard key={idx} {...feature} />
          ))}
        </div>
      </section>

      {/* 5. HOW IT WORKS SECTION */}
      <section id="how-it-works" className="bg-slate-950 py-16 border-y border-slate-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-mono uppercase px-3 py-1 rounded-full bg-indigo-950/80 text-indigo-400 border border-indigo-800/60">
              Simple 4-Step Process
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              From Idea to Cartoon in 4 Steps
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              No complicated software or drawing tablets needed. Simply prompt and download.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="relative p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4 hover:border-indigo-500/40 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-black text-indigo-500/80 font-mono">
                    {step.number}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-indigo-950 text-indigo-400 flex items-center justify-center">
                    {step.icon}
                  </div>
                </div>
                <h3 className="text-sm font-semibold text-white">{step.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. GALLERY / SHOWCASE SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-mono uppercase px-3 py-1 rounded-full bg-slate-900 text-slate-400 border border-slate-800">
            Community Creations
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            AI Generated Cartoon Showcase
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Explore sample character avatars rendered across different AI art styles. Click any character to zoom.
          </p>
        </div>

        <GalleryGrid />
      </section>

      {/* 7. USE CASES SECTION */}
      <section className="bg-slate-950 py-16 border-y border-slate-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-mono uppercase px-3 py-1 rounded-full bg-slate-900 text-slate-400 border border-slate-800">
              Versatile Applications
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Designed for Creators & Professionals
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Whether you need a social avatar, game mascot, or book illustration, ToonForge AI fits your workflow.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map((uc, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-slate-700 transition-colors space-y-3"
              >
                <div className="text-2xl">{uc.icon}</div>
                <h3 className="text-sm font-semibold text-white">{uc.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{uc.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. PRICING SECTION */}
      <section id="pricing" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <span className="text-xs font-mono uppercase px-3 py-1 rounded-full bg-slate-900 text-slate-400 border border-slate-800">
            Transparent Pricing
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Simple Plans for Every Creator
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Start free. Upgrade as your character creation needs grow.
          </p>

          {/* Monthly / Annual Toggle Switcher */}
          <div className="inline-flex items-center gap-3 p-1 rounded-xl bg-slate-900 border border-slate-800">
            <button
              type="button"
              onClick={() => setIsAnnual(false)}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                !isAnnual ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              Monthly Billing
            </button>
            <button
              type="button"
              onClick={() => setIsAnnual(true)}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                isAnnual ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              <span>Annual Billing</span>
              <span className="px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px]">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch pt-4">
          {pricingPlans.map((plan, idx) => (
            <PricingCard key={idx} plan={plan} isAnnual={isAnnual} />
          ))}
        </div>
      </section>

      {/* 9. TESTIMONIALS SECTION */}
      <section className="bg-slate-950 py-16 border-y border-slate-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-mono uppercase px-3 py-1 rounded-full bg-indigo-950/80 text-indigo-400 border border-indigo-800/60">
              Loved by 100K+ Creators
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              What Creators Are Saying
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Discover how indie game devs, authors, and streamers use ToonForge AI daily.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((t, idx) => (
              <TestimonialCard key={idx} {...t} />
            ))}
          </div>
        </div>
      </section>

      {/* 10. FAQ SECTION */}
      <section id="faq" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="text-center space-y-3">
          <span className="text-xs font-mono uppercase px-3 py-1 rounded-full bg-slate-900 text-slate-400 border border-slate-800">
            Got Questions?
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Everything you need to know about ToonForge AI character generation and licenses.
          </p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 divide-y divide-slate-800">
          {faqs.map((faq, idx) => (
            <FAQItem key={idx} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </section>

      {/* 11. FINAL CTA SECTION */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CTASection />
      </div>
    </div>
  );
}
