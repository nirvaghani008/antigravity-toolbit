"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  WandIcon,
  SparklesIcon,
  TwitterIcon,
  YouTubeIcon,
  DiscordIcon,
  TikTokIcon,
  GitHubIcon,
  ArrowRightIcon,
  CheckIcon,
} from "@/components/Icons";
import Button from "@/components/ui/Button";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && /\S+@\S+\.\S+/.test(email)) {
      setSubscribed(true);
      setEmail("");
    }
  };

  const productLinks = [
    { label: "Text to Cartoon Video", href: "/#features" },
    { label: "Photo to Animation", href: "/#features" },
    { label: "AI Voice & Lip-Sync", href: "/#features" },
    { label: "Art Styles Library", href: "/#showcase" },
    { label: "Cloud Video Studio", href: "/#demo" },
    { label: "Pricing & Plans", href: "/#pricing" },
  ];

  const companyLinks = [
    { label: "About ToonForge", href: "/about" },
    { label: "Our Story & Vision", href: "/about" },
    { label: "AI Pipeline & Tech", href: "/about" },
    { label: "Careers", href: "/about" },
    { label: "Contact Support", href: "/contact" },
  ];

  const resourceLinks = [
    { label: "Prompt Engineering Guide", href: "/#how-it-works" },
    { label: "Video Aspect Ratios", href: "/#faq" },
    { label: "Creator Showcase", href: "/#showcase" },
    { label: "Commercial Licensing", href: "/#faq" },
    { label: "API Documentation", href: "/contact" },
  ];

  const legalLinks = [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Ethical AI Policy", href: "/about" },
    { label: "DMCA & Copyright", href: "#" },
  ];

  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 text-slate-400 text-sm mt-auto relative overflow-hidden">
      {/* Subtle background glow effect */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[250px] bg-gradient-to-t from-purple-900/10 via-fuchsia-900/5 to-transparent blur-3xl pointer-events-none" />

      {/* Top Newsletter & Banner Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 border-b border-slate-900">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-800/60 text-xs font-semibold text-purple-300">
              <SparklesIcon className="w-3.5 h-3.5" />
              <span>Weekly AI Animation Drops</span>
            </div>
            <h3 className="text-2xl font-bold text-white tracking-tight">
              Get the latest prompt presets & art styles
            </h3>
            <p className="text-sm text-slate-400">
              Join 50,000+ creators receiving our free weekly AI video prompts, new style weights, and creator masterclasses.
            </p>

            {/* ToolBit Featured Badge */}
            <div className="pt-3">
              <a
                href="https://toolbit.ai/ai-tool/antigravity-toolbit-ei18yinqs-nirvaghani008-6911s-projects-v?ref=embed"
                target="_blank"
                rel="noopener noreferrer"
                style={{ cursor: "pointer" }}
                data-tb-secret="2ec8d209becedaa00918d2e8ee046a6fa442a064cf770da3"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://cdn.toolbit.ai/external-share-img/light-featured.svg"
                  alt="Featured on ToolBit.ai - Antigravity Toolbit"
                  style={{ display: "block", width: "250px", height: "76px" }}
                  width="250"
                  height="76"
                />
              </a>
            </div>
          </div>

          <div className="lg:col-span-6">
            {subscribed ? (
              <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-800/80 flex items-center gap-3 text-emerald-300">
                <div className="w-8 h-8 rounded-full bg-emerald-900/80 flex items-center justify-center shrink-0">
                  <CheckIcon className="w-5 h-5 text-emerald-200" />
                </div>
                <div>
                  <p className="font-semibold text-sm">You&apos;re on the VIP list!</p>
                  <p className="text-xs text-emerald-300/80">Check your inbox for this week&apos;s 10 trending cartoon video prompts.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your creator email..."
                  required
                  className="flex-1 bg-slate-900/90 border border-slate-800 text-slate-100 placeholder-slate-500 text-sm rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500"
                />
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  rightIcon={<ArrowRightIcon className="w-4 h-4" />}
                  className="shrink-0"
                >
                  Subscribe
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main Links Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-6 lg:grid-cols-12 gap-8">
          {/* Brand Info (4 cols) */}
          <div className="col-span-2 md:col-span-6 lg:col-span-4 space-y-4">
            <Link href="/" className="flex items-center gap-2.5 group focus:outline-none">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 via-fuchsia-500 to-orange-500 p-0.5 shadow-md shadow-purple-600/30">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <WandIcon className="w-4 h-4 text-purple-400" />
                </div>
              </div>
              <span className="font-extrabold text-lg tracking-tight text-white">
                ToonForge <span className="gradient-text">AI</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Turn any idea into animated magic — powered by AI. Generate stunning cartoon-style videos and images from text, photos, or clips in seconds. No animation skills required.
            </p>
            <div className="flex items-center gap-3 text-slate-400 pt-2">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center hover:text-white hover:border-purple-500/50 hover:bg-purple-950/30 transition-colors"
              >
                <TwitterIcon className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center hover:text-white hover:border-purple-500/50 hover:bg-purple-950/30 transition-colors"
              >
                <YouTubeIcon className="w-4 h-4" />
              </a>
              <a
                href="https://discord.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Discord"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center hover:text-white hover:border-purple-500/50 hover:bg-purple-950/30 transition-colors"
              >
                <DiscordIcon className="w-4 h-4" />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center hover:text-white hover:border-purple-500/50 hover:bg-purple-950/30 transition-colors"
              >
                <TikTokIcon className="w-4 h-4" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center hover:text-white hover:border-purple-500/50 hover:bg-purple-950/30 transition-colors"
              >
                <GitHubIcon className="w-4 h-4" />
              </a>
            </div>

            {/* Server Status Badge */}
            <div className="pt-2 flex items-center gap-2 text-[11px] text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>All AI Render Nodes: <strong>Operational (99.98%)</strong></span>
            </div>
          </div>

          {/* Product Links (2 cols) */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Product
            </h4>
            <ul className="space-y-2 text-xs">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="hover:text-purple-300 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links (2 cols) */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Company
            </h4>
            <ul className="space-y-2 text-xs">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="hover:text-purple-300 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links (2 cols) */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Resources
            </h4>
            <ul className="space-y-2 text-xs">
              {resourceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="hover:text-purple-300 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links (2 cols) */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Legal
            </h4>
            <ul className="space-y-2 text-xs">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="hover:text-purple-300 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <p>© {new Date().getFullYear()} ToonForge AI, Inc. All rights reserved.</p>
        <p className="flex items-center gap-1">
          Crafted for storytellers, animators, and creator studios worldwide.
        </p>
      </div>
    </footer>
  );
}
