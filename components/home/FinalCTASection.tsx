import React from "react";
import Link from "next/link";
import { SparklesIcon, ArrowRightIcon, CheckIcon } from "@/components/Icons";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

export default function FinalCTASection() {
  return (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      {/* Background glow meshes */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[450px] bg-gradient-to-r from-purple-600/25 via-fuchsia-600/20 to-orange-500/15 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl p-1 bg-gradient-to-r from-purple-500/50 via-pink-500/40 to-orange-500/40 shadow-2xl shadow-purple-950/60">
          <div className="rounded-[22px] bg-slate-950/90 p-8 sm:p-14 lg:p-16 text-center space-y-8 backdrop-blur-2xl border border-slate-800/80">
            
            {/* Top Pill */}
            <div className="inline-flex items-center gap-2">
              <Badge variant="purple" size="md" dot>
                <span>Zero Animation Skills Needed</span>
              </Badge>
            </div>

            {/* Headline */}
            <div className="space-y-4 max-w-3xl mx-auto">
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
                Ready to bring your stories to life with{" "}
                <span className="gradient-text">animated magic?</span>
              </h2>
              <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
                Join over 100,000 creators, YouTubers, and studios generating viral cartoon animations in seconds. Start with 30 free render credits today.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link href="#demo" className="w-full sm:w-auto">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto text-base px-9 py-4 font-bold shadow-2xl shadow-purple-600/40"
                  leftIcon={<SparklesIcon className="w-5 h-5 text-amber-300" />}
                  rightIcon={<ArrowRightIcon className="w-5 h-5" />}
                >
                  Start Animating Free
                </Button>
              </Link>
              <Link href="#pricing" className="w-full sm:w-auto">
                <Button
                  variant="secondary"
                  size="lg"
                  className="w-full sm:w-auto text-base px-8 py-4 font-semibold"
                >
                  View All Pricing & Plans
                </Button>
              </Link>
            </div>

            {/* Checklist Proof */}
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 pt-4 text-xs sm:text-sm text-slate-400 font-medium">
              <div className="flex items-center gap-2">
                <CheckIcon className="w-4 h-4 text-emerald-400" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="w-4 h-4 text-emerald-400" />
                <span>30 free credits on signup</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="w-4 h-4 text-emerald-400" />
                <span>Cancel or upgrade anytime</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
