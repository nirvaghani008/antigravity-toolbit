"use client";

import React, { useState } from "react";
import Image from "next/image";
import { SparklesIcon, WandIcon, DownloadIcon, RefreshIcon, CheckIcon, SlidersIcon } from "./Icons";

const STYLES = [
  { id: "pixar", name: "Pixar 3D", badge: "3D Animation", image: "/images/hero-cartoon.jpg" },
  { id: "anime", name: "Anime", badge: "Japanese Art", image: "/images/gallery/anime-1.jpg" },
  { id: "chibi", name: "Cute Chibi", badge: "Mini Stylized", image: "/images/hero-cartoon.jpg" },
  { id: "comic", name: "Comic Book", badge: "Pop Art", image: "/images/gallery/3d-1.jpg" },
  { id: "3d", name: "Cyber 3D", badge: "Unreal 5", image: "/images/gallery/3d-1.jpg" },
  { id: "disney", name: "Storybook", badge: "Classic", image: "/images/gallery/pixar-1.jpg" },
];

const PRESET_PROMPTS = [
  "Friendly AI robot wizard with glowing magic staff",
  "Stylish anime character in sleek gray blazer",
  "Cute 3D Pixar character with warm expression",
  "Tactical cyberpunk warrior in dark armor",
];

export default function InteractiveGeneratorDemo() {
  const [prompt, setPrompt] = useState("Friendly AI robot wizard with glowing magic staff");
  const [selectedStyle, setSelectedStyle] = useState(STYLES[0]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const steps = [
    "Encoding prompt tokens via CLIP Neural Text Model...",
    "Running latent diffusion sampling (50 steps)...",
    "Applying high-resolution neural upscaling...",
    "Finalizing character render!"
  ];

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    setStepIndex(0);

    // Simulate multi-step AI inference sequence
    const interval = setInterval(() => {
      setStepIndex((prev) => {
        if (prev >= steps.length - 1) {
          clearInterval(interval);
          setIsGenerating(false);
          return prev;
        }
        return prev + 1;
      });
    }, 600);
  };

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(`${prompt} --style ${selectedStyle.name}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div id="try-demo" className="w-full max-w-5xl mx-auto my-12 p-4 sm:p-6 bg-slate-900/90 border border-slate-800 rounded-2xl shadow-2xl backdrop-blur-xl">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 mb-6 border-b border-slate-800 gap-2">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-indigo-950 border border-indigo-800 text-indigo-400">
            <WandIcon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-white">Live AI Character Studio</h3>
            <p className="text-xs text-slate-400">Test ToonForge AI generator engine in real-time</p>
          </div>
        </div>
        <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-800 font-mono">
          ● Latent Diffusion v2.4 Active
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Control Panel */}
        <div className="lg:col-span-7 space-y-5">
          {/* Prompt Input */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center justify-between">
              <span>Character Prompt</span>
              <span className="text-[11px] text-slate-500">English • Detailed prompts work best</span>
            </label>
            <div className="relative">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={3}
                placeholder="Describe your character (e.g. A cyberpunk ninja holding a glowing sword, anime style)..."
                className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 resize-none transition-colors"
              />
            </div>
          </div>

          {/* Prompt Presets */}
          <div className="space-y-1.5">
            <span className="text-[11px] text-slate-400 font-medium">Quick Ideas:</span>
            <div className="flex flex-wrap gap-1.5">
              {PRESET_PROMPTS.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setPrompt(preset)}
                  className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-xs text-slate-300 transition-colors border border-slate-700/60"
                >
                  &quot;{preset.slice(0, 32)}...&quot;
                </button>
              ))}
            </div>
          </div>

          {/* Style Selector */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1">
              <SlidersIcon className="w-3.5 h-3.5 text-indigo-400" />
              <span>Select AI Art Style</span>
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-3 gap-2">
              {STYLES.map((style) => (
                <button
                  key={style.id}
                  type="button"
                  onClick={() => setSelectedStyle(style)}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    selectedStyle.id === style.id
                      ? "bg-indigo-950/80 border-indigo-500 text-white shadow-md shadow-indigo-950"
                      : "bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                  }`}
                >
                  <div className="font-semibold text-xs text-slate-200">{style.name}</div>
                  <div className="text-[10px] text-slate-400">{style.badge}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Action Button */}
          <button
            type="button"
            disabled={isGenerating}
            onClick={handleGenerate}
            className="w-full py-3.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-semibold text-sm transition-all shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <RefreshIcon className="w-4 h-4 animate-spin text-white" />
                <span>Generating Cartoon...</span>
              </>
            ) : (
              <>
                <SparklesIcon className="w-4 h-4 text-white" />
                <span>Generate Character Now</span>
              </>
            )}
          </button>
        </div>

        {/* Right Output Showcase */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center bg-slate-950 border border-slate-800 rounded-xl p-4 relative min-h-[340px]">
          {isGenerating ? (
            <div className="flex flex-col items-center justify-center text-center space-y-4 py-8">
              <div className="relative w-16 h-16 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-2 border-indigo-500/20 border-t-indigo-500 animate-spin" />
                <SparklesIcon className="w-8 h-8 text-indigo-400" />
              </div>
              <div className="space-y-1">
                <p className="text-xs font-mono text-indigo-400">{steps[stepIndex]}</p>
                <div className="w-48 bg-slate-900 rounded-full h-1.5 overflow-hidden mx-auto border border-slate-800">
                  <div
                    className="bg-indigo-500 h-full transition-all duration-300"
                    style={{ width: `${((stepIndex + 1) / steps.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full space-y-3">
              <div className="relative aspect-square w-full rounded-xl overflow-hidden border border-slate-800 bg-slate-900 group">
                <Image
                  src={selectedStyle.image}
                  alt="Generated AI Cartoon Character"
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-2 right-2 bg-slate-950/80 backdrop-blur-md px-2 py-1 rounded-md text-[10px] font-mono text-indigo-300 border border-slate-800">
                  1024 x 1024 • PNG
                </div>
              </div>

              {/* Action buttons under result */}
              <div className="flex items-center justify-between gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleCopyPrompt}
                  className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-lg text-xs font-medium border border-slate-800 transition-colors flex items-center gap-1.5"
                >
                  {copied ? (
                    <>
                      <CheckIcon className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <span>Copy Prompt</span>
                  )}
                </button>

                <a
                  href={selectedStyle.image}
                  download="toonforge-character.jpg"
                  className="px-3 py-1.5 bg-indigo-950 hover:bg-indigo-900 text-indigo-300 rounded-lg text-xs font-medium border border-indigo-800 transition-colors flex items-center gap-1.5"
                >
                  <DownloadIcon className="w-3.5 h-3.5" />
                  <span>Download</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
