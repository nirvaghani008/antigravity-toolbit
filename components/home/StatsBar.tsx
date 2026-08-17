import React from "react";
import { StarIcon, SparklesIcon, VideoIcon, UserIcon } from "@/components/Icons";

export default function StatsBar() {
  const stats = [
    {
      value: "500K+",
      label: "Videos Generated",
      sub: "Animated across 120+ countries",
      icon: <VideoIcon className="w-5 h-5 text-purple-400" />,
    },
    {
      value: "50+",
      label: "Art & Video Styles",
      sub: "Pixar, Anime, Comic, Clay & more",
      icon: <SparklesIcon className="w-5 h-5 text-pink-400" />,
    },
    {
      value: "4.9 ★",
      label: "Average Rating",
      sub: "From 25,000+ creator reviews",
      icon: <StarIcon className="w-5 h-5 text-amber-400" />,
    },
    {
      value: "120+",
      label: "Countries Reached",
      sub: "Global creator community",
      icon: <UserIcon className="w-5 h-5 text-cyan-400" />,
    },
  ];

  const trustedPlatforms = [
    "YouTube Shorts",
    "TikTok Creators",
    "Instagram Reels",
    "Twitch Streamers",
    "Indie Game Studios",
    "Creative Agencies",
  ];

  return (
    <section className="relative py-12 border-y border-slate-800/80 bg-slate-950/60 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Metric Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-5 sm:p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-purple-500/30 transition-all duration-300 group"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-xl bg-slate-800/80 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {stat.icon}
                </div>
                <span className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                  {stat.value}
                </span>
              </div>
              <p className="text-sm font-bold text-slate-200">{stat.label}</p>
              <p className="text-xs text-slate-400 mt-0.5">{stat.sub}</p>
            </div>
          ))}
        </div>

        {/* Trusted By Strip */}
        <div className="pt-2 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-slate-900">
          <span className="text-xs font-mono uppercase tracking-widest text-slate-400 font-semibold shrink-0">
            Trusted by creators across:
          </span>
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-3 sm:gap-6 text-xs font-semibold text-slate-400">
            {trustedPlatforms.map((platform, idx) => (
              <div
                key={idx}
                className="px-3.5 py-1.5 rounded-full bg-slate-900/60 border border-slate-800/60 text-slate-300 hover:text-purple-300 hover:border-purple-500/30 transition-colors"
              >
                {platform}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
