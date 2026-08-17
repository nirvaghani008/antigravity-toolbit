import React from "react";
import Link from "next/link";
import {
  SparklesIcon,
  VideoIcon,
  PlayIcon,
  ArrowRightIcon,
  ZapIcon,
  LayersIcon,
} from "@/components/Icons";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import InteractiveDemo from "./InteractiveDemo";

export default function HeroSection() {
  return (
    <section className="relative pt-6 sm:pt-12 pb-16 lg:pb-24 overflow-hidden">
      {/* Background Decorative Gradients & Mesh Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[550px] bg-gradient-to-tr from-purple-900/25 via-fuchsia-900/15 to-orange-900/10 blur-[130px] rounded-full pointer-events-none -z-10 animate-pulse-glow" />
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-purple-600/10 blur-[100px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-0 w-[400px] h-[400px] bg-pink-600/10 blur-[100px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header Text Area */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2">
            <Badge variant="purple" size="md" dot>
              <span className="font-semibold text-purple-200">
                ✨ Next-Gen AI Cartoon & Video Engine 2.0
              </span>
            </Badge>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1]">
            Turn any idea into{" "}
            <span className="gradient-text">animated magic</span> — powered by AI.
          </h1>

          {/* Sub-tagline */}
          <p className="text-base sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal">
            Generate stunning cartoon-style videos and images from text, photos, or clips in seconds. No animation skills required.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link href="#demo" className="w-full sm:w-auto">
              <Button
                variant="primary"
                size="lg"
                className="w-full sm:w-auto shadow-2xl shadow-purple-600/35 text-base px-8 py-4 font-bold"
                leftIcon={<SparklesIcon className="w-5 h-5 text-amber-300" />}
                rightIcon={<ArrowRightIcon className="w-5 h-5" />}
              >
                Generate Your First Video
              </Button>
            </Link>
            <Link href="#showcase" className="w-full sm:w-auto">
              <Button
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto text-base px-7 py-4 font-semibold"
                leftIcon={<PlayIcon className="w-4 h-4 text-purple-400" />}
              >
                Watch Demo Reel
              </Button>
            </Link>
          </div>

          {/* Value Props Strip */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 pt-4 text-xs sm:text-sm text-slate-400 font-medium">
            <div className="flex items-center gap-2">
              <ZapIcon className="w-4 h-4 text-amber-400" />
              <span>Zero GPU or hardware needed</span>
            </div>
            <div className="flex items-center gap-2">
              <LayersIcon className="w-4 h-4 text-purple-400" />
              <span>50+ Cartoon & Anime Art Styles</span>
            </div>
            <div className="flex items-center gap-2">
              <VideoIcon className="w-4 h-4 text-pink-400" />
              <span>Instant 4K 60fps Video Export</span>
            </div>
          </div>
        </div>

        {/* Interactive Studio Generator Playground */}
        <div id="demo" className="scroll-mt-24 pt-4">
          <InteractiveDemo />
        </div>
      </div>
    </section>
  );
}
