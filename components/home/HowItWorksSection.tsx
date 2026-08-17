import React from "react";
import Link from "next/link";
import {
  UploadIcon,
  SlidersIcon,
  CpuIcon,
  ShareIcon,
  SparklesIcon,
  ArrowRightIcon,
  CheckIcon,
} from "@/components/Icons";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";

export default function HowItWorksSection() {
  const steps = [
    {
      step: "01",
      title: "Upload or Describe",
      badge: "Input Stage",
      description:
        "Upload a portrait photo, video clip, or type a descriptive text prompt specifying your character, scene mood, and animation action.",
      icon: <UploadIcon className="w-6 h-6 text-purple-400" />,
      detail: "Supports TXT, JPG, PNG, MP4",
    },
    {
      step: "02",
      title: "Pick Your Art Style",
      badge: "Style Selection",
      description:
        "Choose from 50+ curated styles (3D Pixar, Anime, Comic Book, Claymation) and adjust motion intensity, camera zoom, and voiceover lip-sync.",
      icon: <SlidersIcon className="w-6 h-6 text-pink-400" />,
      detail: "1-Click style presets",
    },
    {
      step: "03",
      title: "AI Generates Video",
      badge: "Neural Rendering",
      description:
        "Our high-throughput spatio-temporal diffusion engine synthesizes smooth 60fps frames with consistent character identity and fluid physics.",
      icon: <CpuIcon className="w-6 h-6 text-cyan-400" />,
      detail: "Average 1.8s render time",
    },
    {
      step: "04",
      title: "Download & Share",
      badge: "Export & Publish",
      description:
        "Download pristine 4K video exports formatted for TikTok, Reels, YouTube, or download high-res transparent PNG sequence assets.",
      icon: <ShareIcon className="w-6 h-6 text-emerald-400" />,
      detail: "9:16, 16:9, 1:1, 4K ProRes",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 lg:py-28 bg-slate-950/40 relative scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="pink" size="md" dot>
            <span>Simple 4-Step Process</span>
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            From prompt to animated video <br className="hidden sm:inline" />
            <span className="gradient-text">in under 60 seconds</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
            No 3D modeling skills, keyframe rigging, or expensive rendering hardware needed. Just your imagination.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, idx) => (
            <Card
              key={idx}
              variant="glass"
              hover={true}
              className="p-6 sm:p-7 flex flex-col justify-between space-y-6 relative group border-slate-800/80 hover:border-purple-500/40"
            >
              {/* Step Number Top */}
              <div className="flex items-center justify-between">
                <span className="text-3xl font-black font-mono gradient-text opacity-90">
                  {step.step}
                </span>
                <div className="w-10 h-10 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {step.icon}
                </div>
              </div>

              <div className="space-y-2.5">
                <span className="text-[11px] font-mono text-purple-400 font-semibold tracking-wider uppercase">
                  {step.badge}
                </span>
                <h3 className="text-lg font-bold text-white group-hover:text-purple-200 transition-colors">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/60 flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                <CheckIcon className="w-3.5 h-3.5 text-emerald-400" />
                <span>{step.detail}</span>
              </div>
            </Card>
          ))}
        </div>

        {/* Bottom Callout */}
        <div className="text-center pt-4">
          <Link href="#demo">
            <Button
              variant="primary"
              size="md"
              leftIcon={<SparklesIcon className="w-4 h-4" />}
              rightIcon={<ArrowRightIcon className="w-4 h-4" />}
            >
              Try the Interactive Generator Now
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
