"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  SparklesIcon,
  PlayIcon,
  ArrowRightIcon,
} from "@/components/Icons";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";

interface GalleryItem {
  id: string;
  title: string;
  category: "pixar" | "anime" | "comic" | "claymation" | "cyberpunk" | "watercolor";
  styleName: string;
  prompt: string;
  ratio: "9:16" | "16:9" | "1:1";
  image: string;
  badge: string;
  fps: string;
  duration: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "1",
    title: "Cosmic Adventurer & Starlight Companion",
    category: "pixar",
    styleName: "3D Pixar Cinematic",
    prompt: "An adventurous boy with glowing goggles exploring a floating nebula island with a cute starlight sprite",
    ratio: "16:9",
    image: "/images/hero-cartoon.jpg",
    badge: "Trending",
    fps: "60 FPS",
    duration: "10s",
  },
  {
    id: "2",
    title: "Cyberpunk Blade Girl in Neon Rain",
    category: "anime",
    styleName: "Japanese Anime HD",
    prompt: "A cyber-samurai anime heroine standing atop a skyscraper under glowing hologram rain in Neo Tokyo",
    ratio: "9:16",
    image: "/images/gallery/anime-1.jpg",
    badge: "Viral Shorts",
    fps: "60 FPS",
    duration: "15s",
  },
  {
    id: "3",
    title: "Vintage Detective In Shadowed Alley",
    category: "comic",
    styleName: "Marvel Comic Ink",
    prompt: "A gritty 1940s fedora detective casting long crosshatched shadows under a flickering neon streetlight",
    ratio: "1:1",
    image: "/images/gallery/3d-1.jpg",
    badge: "Staff Pick",
    fps: "24 FPS",
    duration: "8s",
  },
  {
    id: "4",
    title: "Enchanted Baker Dragon in Miniature Treehouse",
    category: "claymation",
    styleName: "Claymation Stop-Motion",
    prompt: "A tiny clay-textured friendly dragon happily rolling pastry dough with handcrafted stop-motion jitter",
    ratio: "16:9",
    image: "/images/gallery/pixar-1.jpg",
    badge: "Tactile",
    fps: "12 FPS",
    duration: "12s",
  },
  {
    id: "5",
    title: "Hoverboard Courier Racing Through Clouds",
    category: "cyberpunk",
    styleName: "Cyberpunk Neon Toon",
    prompt: "A high-speed neon hoverboard delivery rider dodging holographic drones above a floating metropolis",
    ratio: "9:16",
    image: "/images/gallery/anime-1.jpg",
    badge: "High Energy",
    fps: "60 FPS",
    duration: "10s",
  },
  {
    id: "6",
    title: "Dreamy Whispering Forest Spirit",
    category: "watercolor",
    styleName: "Watercolor Storybook",
    prompt: "A gentle fox with pastel watercolor bloom ears wandering through sun-dappled mossy forest ruins",
    ratio: "16:9",
    image: "/images/hero-cartoon.jpg",
    badge: "Pastel Bloom",
    fps: "30 FPS",
    duration: "14s",
  },
];

export default function StyleGallerySection() {
  const [filter, setFilter] = useState<string>("all");

  const categories = [
    { id: "all", label: "All Styles" },
    { id: "pixar", label: "3D Pixar" },
    { id: "anime", label: "Anime HD" },
    { id: "comic", label: "Comic Ink" },
    { id: "claymation", label: "Claymation" },
    { id: "cyberpunk", label: "Cyberpunk" },
    { id: "watercolor", label: "Watercolor" },
  ];

  const filteredItems =
    filter === "all"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === filter);

  return (
    <section id="showcase" className="py-20 lg:py-28 relative scroll-mt-16">
      {/* Background glow */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-pink-900/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <Badge variant="cyan" size="md" dot>
              <span>50+ Animation Models</span>
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Explore infinite <span className="gradient-text">cartoon styles</span>
            </h2>
            <p className="text-base text-slate-400">
              Browse community-generated animations created with text prompts and photo uploads.
            </p>
          </div>

          {/* Link to Generator */}
          <Link href="#demo">
            <Button
              variant="outline"
              size="md"
              leftIcon={<SparklesIcon className="w-4 h-4" />}
            >
              Generate Your Own Style
            </Button>
          </Link>
        </div>

        {/* Filter Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setFilter(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                filter === cat.id
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-600/30"
                  : "bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <Card
              key={item.id}
              variant="glass"
              hover={true}
              className="group overflow-hidden border-slate-800/80 hover:border-purple-500/40 flex flex-col justify-between"
            >
              {/* Image & Video Thumbnail Container */}
              <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-black/40" />

                {/* Top Badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <Badge variant="purple" size="sm">
                    {item.styleName}
                  </Badge>
                  <span className="text-[10px] font-mono bg-black/70 px-2 py-0.5 rounded text-emerald-400 border border-emerald-500/30">
                    {item.fps} • {item.duration}
                  </span>
                </div>

                {/* Center Play Button Overlay on Hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Link href="#demo">
                    <div className="w-12 h-12 rounded-full bg-purple-600/90 text-white flex items-center justify-center shadow-xl shadow-purple-900/50 hover:scale-110 transition-transform">
                      <PlayIcon className="w-5 h-5 ml-0.5" />
                    </div>
                  </Link>
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white group-hover:text-purple-200 transition-colors truncate">
                    {item.title}
                  </h3>
                  <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">
                    {item.ratio}
                  </span>
                </div>

                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  &ldquo;{item.prompt}&rdquo;
                </p>

                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                  <Link
                    href="#demo"
                    className="text-xs font-semibold text-purple-400 hover:text-purple-300 flex items-center gap-1 transition-colors"
                  >
                    <span>Animate with this style</span>
                    <ArrowRightIcon className="w-3.5 h-3.5" />
                  </Link>
                  <span className="text-[11px] text-slate-400">{item.badge}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
