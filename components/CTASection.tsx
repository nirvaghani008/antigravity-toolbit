import React from "react";
import Link from "next/link";
import { SparklesIcon, ArrowRightIcon } from "./Icons";

export default function CTASection() {
  return (
    <section className="my-16">
      <div className="relative rounded-3xl p-8 sm:p-12 bg-gradient-to-br from-slate-900 via-indigo-950/80 to-slate-950 border border-indigo-500/30 overflow-hidden shadow-2xl">
        {/* Subtle background glow */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-900/60 border border-indigo-700/60 text-indigo-300 text-xs font-semibold">
            <SparklesIcon className="w-4 h-4 text-indigo-400" />
            <span>Instant AI Art Generation • No Credit Card Required</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Start Creating Your AI Cartoon Character Now
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Join 100,000+ creators, game designers, and storytellers turning ideas into custom cartoon character avatars in seconds.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/#try-demo"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-semibold text-sm text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2"
            >
              <span>Generate Your Free Character</span>
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
            <Link
              href="/about"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-semibold text-sm text-slate-300 bg-slate-900/80 hover:bg-slate-800 border border-slate-700 transition-colors flex items-center justify-center"
            >
              <span>Learn About Our AI Engine</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
