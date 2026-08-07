"use client";

import React, { useState } from "react";
import Image from "next/image";
import { XIcon, DownloadIcon } from "./Icons";

export interface GalleryItem {
  id: string;
  title: string;
  category: "Anime" | "Pixar" | "Chibi" | "Comic" | "3D" | "Disney";
  image: string;
  prompt: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "1",
    title: "AI Arcane Robot Wizard",
    category: "Pixar",
    image: "/images/hero-cartoon.jpg",
    prompt: "Vibrant 3D Pixar style wizard bot holding a digital pen with glowing purple aura",
  },
  {
    id: "2",
    title: "Executive Anime Portrait",
    category: "Anime",
    image: "/images/gallery/anime-1.jpg",
    prompt: "Elegant modern anime character portrait in neutral blazer studio lighting",
  },
  {
    id: "3",
    title: "Cozy 3D Animated Avatar",
    category: "Pixar",
    image: "/images/gallery/pixar-1.jpg",
    prompt: "Warm 3D character portrait in neutral beige sweater studio lighting",
  },
  {
    id: "4",
    title: "Cyberpunk Tactical Operative",
    category: "3D",
    image: "/images/gallery/3d-1.jpg",
    prompt: "Cool 3D digital game avatar character, neutral dark tactical armor",
  },
  {
    id: "5",
    title: "Chibi Magic Apprentice",
    category: "Chibi",
    image: "/images/hero-cartoon.jpg",
    prompt: "Cute chibi character wizard with oversized hat and friendly smile",
  },
  {
    id: "6",
    title: "Vintage Comic Hero",
    category: "Comic",
    image: "/images/gallery/3d-1.jpg",
    prompt: "Bold comic book superhero line art in neutral pop art color palette",
  },
];

const CATEGORIES = ["All", "Anime", "Pixar", "Chibi", "Comic", "3D"];

export default function GalleryGrid() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const filteredItems = activeCategory === "All"
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <div id="gallery" className="space-y-8">
      {/* Category Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeCategory === cat
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                : "bg-slate-900 text-slate-400 border border-slate-800 hover:border-slate-700 hover:text-slate-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedItem(item)}
            className="group relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 cursor-pointer hover:border-indigo-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl shadow-slate-950"
          >
            <div className="relative aspect-square w-full">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            {/* Overlay tag */}
            <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-mono text-indigo-300 border border-slate-800">
              {item.category}
            </div>

            <div className="p-4 bg-slate-950/90 border-t border-slate-800/80 space-y-1">
              <h4 className="text-sm font-semibold text-white group-hover:text-indigo-400 transition-colors">
                {item.title}
              </h4>
              <p className="text-[11px] text-slate-400 truncate">
                &quot;{item.prompt}&quot;
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Zoom Lightbox */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl space-y-4 p-6 relative">
            <button
              type="button"
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
            >
              <XIcon className="w-5 h-5" />
            </button>

            <div className="relative aspect-square w-full rounded-xl overflow-hidden border border-slate-800">
              <Image
                src={selectedItem.image}
                alt={selectedItem.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-indigo-400 px-2 py-0.5 rounded bg-indigo-950 border border-indigo-800">
                  {selectedItem.category} AI Model
                </span>
                <span className="text-xs text-slate-500">1024 x 1024 High-Res</span>
              </div>
              <h3 className="text-base font-bold text-white">{selectedItem.title}</h3>
              <p className="text-xs text-slate-400 bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono">
                &quot;{selectedItem.prompt}&quot;
              </p>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="px-4 py-2 rounded-xl text-xs font-medium bg-slate-800 text-slate-300 hover:bg-slate-700"
              >
                Close
              </button>
              <a
                href={selectedItem.image}
                download={`${selectedItem.title.toLowerCase().replace(/\s+/g, "-")}.jpg`}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-1.5"
              >
                <DownloadIcon className="w-4 h-4" />
                <span>Download Sample</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
