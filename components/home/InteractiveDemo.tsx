"use client";

import React, { useState, useEffect } from "react";
import {
  SparklesIcon,
  PlayIcon,
  PauseIcon,
  WandIcon,
  VideoIcon,
  SlidersIcon,
  VolumeIcon,
  RefreshIcon,
  DownloadIcon,
  UploadIcon,
  ZapIcon,
} from "@/components/Icons";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

interface StyleOption {
  id: string;
  name: string;
  badge: string;
  color: string;
  gradient: string;
  sampleImg?: string;
  description: string;
}

const STYLES: StyleOption[] = [
  {
    id: "pixar",
    name: "3D Pixar Animation",
    badge: "Most Popular",
    color: "from-blue-500 via-indigo-500 to-purple-500",
    gradient: "linear-gradient(135deg, #3b82f6, #6366f1, #a855f7)",
    sampleImg: "/images/hero-cartoon.jpg",
    description: "Volumetric cinematic lighting, expressive eyes, and soft subsurface skin rendering.",
  },
  {
    id: "anime",
    name: "Japanese Anime HD",
    badge: "Trending",
    color: "from-pink-500 via-rose-500 to-purple-600",
    gradient: "linear-gradient(135deg, #ec4899, #f43f5e, #9333ea)",
    sampleImg: "/images/gallery/anime-1.jpg",
    description: "Crisp cel-shading, dynamic speed lines, vibrant pastel colors, and Studio Ghibli vibes.",
  },
  {
    id: "comic",
    name: "Marvel Comic Ink",
    badge: "Bold",
    color: "from-amber-500 via-orange-600 to-red-600",
    gradient: "linear-gradient(135deg, #f59e0b, #ea580c, #dc2626)",
    sampleImg: "/images/gallery/3d-1.jpg",
    description: "Heavy crosshatching ink outlines, halftone dot textures, and high-contrast shadows.",
  },
  {
    id: "claymation",
    name: "Claymation Stop-Motion",
    badge: "Unique",
    color: "from-emerald-500 via-teal-600 to-cyan-600",
    gradient: "linear-gradient(135deg, #10b981, #0d9488, #0891b2)",
    sampleImg: "/images/gallery/pixar-1.jpg",
    description: "Tactile plasticine fingerprints, handcrafted 12fps stop-motion frame jitter, and rich clay textures.",
  },
  {
    id: "cyberpunk",
    name: "Cyberpunk Neon Toon",
    badge: "Sci-Fi",
    color: "from-cyan-400 via-fuchsia-500 to-purple-600",
    gradient: "linear-gradient(135deg, #22d3ee, #d946ef, #9333ea)",
    sampleImg: "/images/gallery/anime-1.jpg",
    description: "Neon holographic rim lighting, glowing visor overlays, and futuristic synthwave gradients.",
  },
];

const PRESET_PROMPTS = [
  "A courageous steampunk fox captain steering an airship above misty cloud mountains",
  "A futuristic cute delivery robot racing a neon hoverboard through a rainy Tokyo alley",
  "A baby phoenix learning to fly in a magical enchanted crystal cavern, glowing embers",
  "A superhero squirrel in a golden cape landing heroically on a giant acorn in Central Park",
  "A cozy wizard cat brewing an iridescent bubbly potion in a miniature treehouse laboratory",
];

export default function InteractiveDemo() {
  const [activeTab, setActiveTab] = useState<"text" | "photo" | "video">("text");
  const [selectedStyle, setSelectedStyle] = useState<StyleOption>(STYLES[0]);
  const [prompt, setPrompt] = useState(PRESET_PROMPTS[0]);
  const [motionIntensity, setMotionIntensity] = useState(75);
  const [enableAudio, setEnableAudio] = useState(true);
  const [aspectRatio, setAspectRatio] = useState<"9:16" | "16:9" | "1:1">("16:9");

  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(100);
  const [isPlaying, setIsPlaying] = useState(true);
  const [videoFrame, setVideoFrame] = useState(0);
  const [copied, setCopied] = useState(false);

  // Playback frame loop animation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && !isGenerating) {
      interval = setInterval(() => {
        setVideoFrame((prev) => (prev >= 100 ? 0 : prev + 1));
      }, 40);
    }
    return () => clearInterval(interval);
  }, [isPlaying, isGenerating]);

  const handleGenerate = () => {
    setIsGenerating(true);
    setProgress(0);
    setIsPlaying(false);

    const startTime = Date.now();
    const duration = 1800; // 1.8s simulation

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(pct);

      if (pct >= 100) {
        clearInterval(timer);
        setIsGenerating(false);
        setIsPlaying(true);
        setVideoFrame(0);
      }
    }, 40);
  };

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full relative max-w-6xl mx-auto rounded-3xl p-1 bg-gradient-to-b from-purple-500/30 via-pink-500/20 to-slate-900/80 shadow-2xl shadow-purple-950/40">
      <div className="bg-slate-950/90 rounded-[22px] p-4 sm:p-7 backdrop-blur-2xl border border-slate-800/80">
        
        {/* Top Control Bar: Mode Tabs & Aspect Ratio */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
          {/* Mode Switcher */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-900/90 border border-slate-800 rounded-xl">
            <button
              type="button"
              onClick={() => setActiveTab("text")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 ${
                activeTab === "text"
                  ? "bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white shadow-md shadow-purple-600/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <WandIcon className="w-3.5 h-3.5" />
              <span>Text to Video</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("photo")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 ${
                activeTab === "photo"
                  ? "bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white shadow-md shadow-purple-600/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <UploadIcon className="w-3.5 h-3.5" />
              <span>Photo to Toon</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("video")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 ${
                activeTab === "video"
                  ? "bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white shadow-md shadow-purple-600/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <VideoIcon className="w-3.5 h-3.5" />
              <span>Clip Stylizer</span>
            </button>
          </div>

          {/* Aspect Ratio Switcher */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider hidden sm:inline">
              Format:
            </span>
            <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-lg p-1">
              {(["16:9", "9:16", "1:1"] as const).map((ratio) => (
                <button
                  key={ratio}
                  type="button"
                  onClick={() => setAspectRatio(ratio)}
                  className={`px-2.5 py-1 rounded text-xs font-mono font-medium transition-all ${
                    aspectRatio === ratio
                      ? "bg-purple-600/40 text-purple-200 border border-purple-500/50"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {ratio} {ratio === "9:16" ? "(Shorts)" : ratio === "16:9" ? "(YouTube)" : "(Square)"}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6 items-start">
          
          {/* Left Column: Prompt, Style Selector & Settings (6 cols) */}
          <div className="lg:col-span-6 space-y-5">
            {/* Prompt Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <SparklesIcon className="w-3.5 h-3.5 text-purple-400" />
                  {activeTab === "text"
                    ? "Animation Prompt"
                    : activeTab === "photo"
                    ? "Photo Subject & Style Prompt"
                    : "Video Clip Animation Prompt"}
                </label>
                <button
                  type="button"
                  onClick={handleCopyPrompt}
                  className="text-[11px] text-purple-400 hover:text-purple-300 transition-colors"
                >
                  {copied ? "✓ Copied" : "Copy Prompt"}
                </button>
              </div>

              <div className="relative">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  rows={3}
                  placeholder="Describe your cartoon character and animation action..."
                  className="w-full bg-slate-900/90 border border-slate-800 text-slate-100 placeholder-slate-500 text-sm rounded-xl p-3.5 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 resize-none font-sans"
                />
              </div>

              {/* Preset prompt pills */}
              <div className="space-y-1.5">
                <span className="text-[11px] text-slate-500 font-mono">Quick Inspiration Presets:</span>
                <div className="flex flex-wrap gap-1.5">
                  {PRESET_PROMPTS.map((p, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setPrompt(p)}
                      className={`text-[11px] px-2.5 py-1 rounded-lg border transition-all text-left truncate max-w-[260px] ${
                        prompt === p
                          ? "bg-purple-950/80 border-purple-500/60 text-purple-200"
                          : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Art Style Selector Cards */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center justify-between">
                <span>Select Cartoon Animation Style</span>
                <span className="text-[11px] text-purple-400 font-normal">
                  {selectedStyle.name}
                </span>
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {STYLES.map((style) => {
                  const isSelected = selectedStyle.id === style.id;
                  return (
                    <button
                      key={style.id}
                      type="button"
                      onClick={() => setSelectedStyle(style)}
                      className={`p-2.5 rounded-xl border text-left transition-all duration-200 relative overflow-hidden ${
                        isSelected
                          ? "bg-slate-800/90 border-purple-500 shadow-md shadow-purple-950/40 ring-1 ring-purple-500"
                          : "bg-slate-900/50 border-slate-800/80 hover:border-slate-700 hover:bg-slate-850"
                      }`}
                    >
                      <div
                        className={`w-full h-1.5 rounded-full mb-2 bg-gradient-to-r ${style.color}`}
                      />
                      <div className="flex items-center justify-between gap-1">
                        <span
                          className={`text-xs font-bold block truncate ${
                            isSelected ? "text-white" : "text-slate-300"
                          }`}
                        >
                          {style.name}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400 block mt-0.5">
                        {style.badge}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Fine-Tuning Sliders: Motion Intensity & Lip-Sync Audio */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-medium flex items-center gap-1">
                    <SlidersIcon className="w-3.5 h-3.5 text-purple-400" />
                    Motion Dynamics
                  </span>
                  <span className="font-mono text-purple-300">{motionIntensity}%</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={motionIntensity}
                  onChange={(e) => setMotionIntensity(Number(e.target.value))}
                  className="w-full accent-purple-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[9px] text-slate-500 font-mono">
                  <span>Subtle (24fps)</span>
                  <span>High Energy (60fps)</span>
                </div>
              </div>

              <div className="space-y-1.5 flex flex-col justify-between">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-medium flex items-center gap-1">
                    <VolumeIcon className="w-3.5 h-3.5 text-pink-400" />
                    AI Lip-Sync & Audio
                  </span>
                  <span className="font-mono text-xs text-pink-300">
                    {enableAudio ? "Enabled" : "Muted"}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setEnableAudio(!enableAudio)}
                  className={`w-full py-1.5 px-3 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-2 border ${
                    enableAudio
                      ? "bg-pink-950/40 border-pink-700/60 text-pink-200"
                      : "bg-slate-900 border-slate-800 text-slate-400"
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${enableAudio ? "bg-pink-400 animate-pulse" : "bg-slate-600"}`} />
                  {enableAudio ? "Synthesize Character Voice" : "Export Silent Animation"}
                </button>
              </div>
            </div>

            {/* Big Action Button */}
            <div>
              <Button
                type="button"
                onClick={handleGenerate}
                isLoading={isGenerating}
                variant="primary"
                size="lg"
                className="w-full shadow-xl shadow-purple-600/30 text-sm sm:text-base py-3.5 font-bold"
                leftIcon={<ZapIcon className="w-5 h-5 text-amber-300" />}
              >
                {isGenerating
                  ? `Rendering Animation (${progress}%)`
                  : "Generate Cartoon Animation Now"}
              </Button>
              <div className="flex items-center justify-between mt-2 text-[11px] text-slate-500 px-1">
                <span>⚡ Cloud inference: ~1.8 seconds</span>
                <span>✨ Free tier: 30 credits available</span>
              </div>
            </div>
          </div>

          {/* Right Column: Live Simulated Video Canvas (6 cols) */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <div className="w-full relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800/90 shadow-2xl aspect-video flex flex-col justify-between group">
              
              {/* Top Video Overlay Bar */}
              <div className="z-20 p-3 bg-gradient-to-b from-black/80 via-black/40 to-transparent flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="purple" size="sm" dot>
                    LIVE PREVIEW
                  </Badge>
                  <span className="text-[11px] font-mono text-slate-300 bg-black/60 px-2 py-0.5 rounded border border-white/10">
                    {selectedStyle.name}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-300">
                  <span className="px-1.5 py-0.5 rounded bg-black/60 font-mono text-[10px] text-emerald-400 border border-emerald-500/30">
                    60 FPS 4K
                  </span>
                </div>
              </div>

              {/* Canvas Center / Video Simulation Visual */}
              <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden bg-slate-950">
                {/* Background Art with animated zoom & subtle pan */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-all duration-700 filter"
                  style={{
                    backgroundImage: `url(${selectedStyle.sampleImg || "/images/hero-cartoon.jpg"})`,
                    transform: isPlaying
                      ? `scale(${1 + (videoFrame % 50) * 0.0015}) translateY(${(videoFrame % 20) * 0.2 - 2}px)`
                      : "scale(1)",
                  }}
                />

                {/* Cyberpunk / Particle / Mesh Lighting Overlay */}
                <div
                  className="absolute inset-0 opacity-40 mix-blend-overlay pointer-events-none"
                  style={{
                    background: selectedStyle.gradient,
                  }}
                />

                {/* Animated scanline & shine beam */}
                {isPlaying && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent w-full h-full animate-shimmer pointer-events-none" />
                )}

                {/* If Generating: Shimmer Progress Screen */}
                {isGenerating && (
                  <div className="absolute inset-0 z-30 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center space-y-4">
                    <div className="w-16 h-16 rounded-2xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-400 animate-spin">
                      <SparklesIcon className="w-8 h-8" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-base font-bold text-white">
                        Synthesizing Latent Video Frames...
                      </h4>
                      <p className="text-xs text-slate-400 max-w-xs font-mono">
                        Applying {selectedStyle.name} style weights & spatio-temporal diffusion
                      </p>
                    </div>
                    {/* Progress bar */}
                    <div className="w-64 h-2 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                      <div
                        className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-amber-500 transition-all duration-100 ease-out"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <span className="text-xs font-mono text-purple-300 font-bold">{progress}% Complete</span>
                  </div>
                )}
              </div>

              {/* Bottom Video Controls Scrubber Bar */}
              <div className="z-20 p-3.5 bg-gradient-to-t from-black/90 via-black/60 to-transparent space-y-2">
                {/* Timeline bar */}
                <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden cursor-pointer">
                  <div
                    className="h-full bg-gradient-to-r from-purple-400 to-pink-500 transition-all duration-75"
                    style={{ width: `${videoFrame}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-xs text-slate-200">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                      aria-label={isPlaying ? "Pause" : "Play"}
                    >
                      {isPlaying ? (
                        <PauseIcon className="w-4 h-4" />
                      ) : (
                        <PlayIcon className="w-4 h-4 ml-0.5" />
                      )}
                    </button>
                    <span className="font-mono text-[11px] text-slate-300">
                      00:0{Math.floor((videoFrame / 100) * 8)} / 00:08
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setVideoFrame(0);
                        setIsPlaying(true);
                      }}
                      className="p-1.5 text-slate-400 hover:text-white transition-colors"
                      title="Replay"
                    >
                      <RefreshIcon className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      className="px-3 py-1 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
                    >
                      <DownloadIcon className="w-3.5 h-3.5" />
                      <span>Download MP4</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom info banner below canvas */}
            <div className="w-full mt-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="font-medium text-slate-300">Commercial License Included</span>
              </div>
              <div className="flex items-center gap-3 text-[11px]">
                <span className="hover:text-purple-300 cursor-pointer">MP4 / ProRes</span>
                <span>•</span>
                <span className="hover:text-purple-300 cursor-pointer">Transparent PNGs</span>
                <span>•</span>
                <span className="hover:text-purple-300 cursor-pointer">Reels & TikTok Ready</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
