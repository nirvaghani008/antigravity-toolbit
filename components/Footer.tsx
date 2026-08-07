"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SparklesIcon, CheckIcon, ArrowRightIcon } from "./Icons";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }
    setError("");
    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800/80 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-slate-800">
          {/* Column 1: Brand */}
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                <SparklesIcon className="w-5 h-5" />
              </div>
              <span className="font-bold text-lg text-white">ToonForge AI</span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              Turn any prompt or photo into high-definition AI cartoon character art in seconds. Built with state-of-the-art diffusion neural networks.
            </p>
            {/* Alternate names badge */}
            <div className="text-[11px] text-slate-500 pt-1">
              <span>Also known as: </span>
              <span className="text-slate-400">ToonCraft AI • CartoonGen Pro</span>
            </div>
            {/* ToolBit Featured Badge */}
            <div className="pt-2">
              <a
                href="https://toolbit.ai/ai-tool/antigravity-toolbit-vercel-app?ref=embed"
                target="_blank"
                rel="noopener noreferrer"
                style={{ cursor: "pointer" }}
                data-tb-secret="e09378e17b1816fb0023d89608b02cf377904267e3143b6a"
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

          {/* Column 2: Navigation */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider">Product</h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/#features" className="hover:text-indigo-400 transition-colors">Features</Link>
              </li>
              <li>
                <Link href="/#how-it-works" className="hover:text-indigo-400 transition-colors">How It Works</Link>
              </li>
              <li>
                <Link href="/#gallery" className="hover:text-indigo-400 transition-colors">AI Art Showcase</Link>
              </li>
              <li>
                <Link href="/#pricing" className="hover:text-indigo-400 transition-colors">Pricing Plans</Link>
              </li>
              <li>
                <Link href="/#try-demo" className="hover:text-indigo-400 transition-colors">Interactive Generator</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider">Company</h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/about" className="hover:text-indigo-400 transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-indigo-400 transition-colors">Contact & Support</Link>
              </li>
              <li>
                <a href="#privacy" className="hover:text-indigo-400 transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="#terms" className="hover:text-indigo-400 transition-colors">Terms of Service</a>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="space-y-3 md:col-span-1">
            <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider">Stay Updated</h3>
            <p className="text-xs text-slate-400">
              Get the latest AI model updates, new art styles, and prompt tips directly to your inbox.
            </p>
            {subscribed ? (
              <div className="p-3 bg-emerald-950/60 border border-emerald-800 rounded-lg text-emerald-300 text-xs flex items-center gap-2">
                <CheckIcon className="w-4 h-4 text-emerald-400" />
                <span>Subscribed! Check your inbox soon.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex items-center gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(""); }}
                    placeholder="Enter your email"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                  <button
                    type="submit"
                    className="px-3 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-medium transition-colors flex items-center gap-1"
                  >
                    <span>Join</span>
                    <ArrowRightIcon className="w-3.5 h-3.5" />
                  </button>
                </div>
                {error && <p className="text-[11px] text-rose-400">{error}</p>}
              </form>
            )}
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} ToonForge AI Inc. All rights reserved. Powered by Neural Diffusion Engine.</p>
          <div className="flex items-center gap-4">
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-slate-300 transition-colors">Twitter</a>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-slate-300 transition-colors">GitHub</a>
            <a href="https://discord.com" target="_blank" rel="noreferrer" className="hover:text-slate-300 transition-colors">Discord</a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-slate-300 transition-colors">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
