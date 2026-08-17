import React from "react";
import {
  WandIcon,
  UploadIcon,
  LayersIcon,
  MicIcon,
  ShareIcon,
  ZapIcon,
  SparklesIcon,
} from "@/components/Icons";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";

export default function FeaturesSection() {
  const features = [
    {
      icon: <WandIcon className="w-6 h-6 text-purple-400" />,
      badge: "Text to Video",
      badgeVariant: "purple" as const,
      title: "Text-to-Cartoon Video Generation",
      description:
        "Type any descriptive scene or character action and watch our neural spatio-temporal video diffusion models animate smooth 60fps cartoon videos in seconds.",
      highlight: "Sub-5 second generation",
    },
    {
      icon: <UploadIcon className="w-6 h-6 text-pink-400" />,
      badge: "Photo to Toon",
      badgeVariant: "pink" as const,
      title: "Photo-to-Cartoon Animation",
      description:
        "Upload a selfie, portrait, or pet photo and transform it into a stylized 3D Pixar, anime, or comic avatar with dynamic motion turnarounds and facial expressions.",
      highlight: "Preserves identity & features",
    },
    {
      icon: <LayersIcon className="w-6 h-6 text-cyan-400" />,
      badge: "50+ Styles",
      badgeVariant: "cyan" as const,
      title: "Multiple Art & Animation Styles",
      description:
        "Seamlessly switch between Japanese Anime HD, 3D Pixar volumetric render, Marvel Comic Ink, Stop-Motion Claymation, Retro 1930s rubber-hose, and Watercolor.",
      highlight: "Custom LoRA style adapters",
    },
    {
      icon: <MicIcon className="w-6 h-6 text-amber-400" />,
      badge: "Audio & Speech",
      badgeVariant: "amber" as const,
      title: "Voice & Lip-Sync AI Narration",
      description:
        "Generate multi-lingual expressive character voices with automatic phoneme lip-sync matching for instant explainer videos, shorts, and storytelling.",
      highlight: "30+ languages supported",
    },
    {
      icon: <ShareIcon className="w-6 h-6 text-emerald-400" />,
      badge: "Social Ready",
      badgeVariant: "emerald" as const,
      title: "One-Click Export for Reels & TikTok",
      description:
        "Export in vertical 9:16 for TikTok, Instagram Reels, and YouTube Shorts, widescreen 16:9 for YouTube, or square 1:1 with transparent alpha channel PNG sequences.",
      highlight: "4K ProRes & MP4 export",
    },
    {
      icon: <ZapIcon className="w-6 h-6 text-purple-400" />,
      badge: "Zero Setup",
      badgeVariant: "purple" as const,
      title: "Fast Cloud Rendering (No GPU Needed)",
      description:
        "Run heavy AI video synthesis directly on our enterprise cloud clusters. Works instantly on any laptop, tablet, or phone with zero hardware setup.",
      highlight: "Zero local GPU required",
    },
  ];

  return (
    <section id="features" className="py-20 lg:py-28 relative scroll-mt-16">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-purple-900/10 blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="purple" size="md" dot>
            <span>Powerful AI Animation Suite</span>
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Everything you need to create <br className="hidden sm:inline" />
            <span className="gradient-text">studio-grade cartoon videos</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
            Designed for creators, marketers, educators, and studios who want to produce viral animations 100x faster than traditional keyframing.
          </p>
        </div>

        {/* 6 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, idx) => (
            <Card
              key={idx}
              variant="glass"
              hover={true}
              className="p-7 sm:p-8 flex flex-col justify-between space-y-6 group border-slate-800/80 hover:border-purple-500/40"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center group-hover:scale-110 group-hover:border-purple-500/50 transition-all duration-300 shadow-md">
                    {feature.icon}
                  </div>
                  <Badge variant={feature.badgeVariant} size="sm">
                    {feature.badge}
                  </Badge>
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-purple-200 transition-colors">
                  {feature.title}
                </h3>

                <p className="text-sm text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/60 flex items-center justify-between text-xs font-mono text-slate-400">
                <span className="text-purple-300 font-semibold">{feature.highlight}</span>
                <SparklesIcon className="w-3.5 h-3.5 text-purple-400/60 group-hover:text-purple-400 transition-colors" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
