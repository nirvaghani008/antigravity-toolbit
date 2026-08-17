import React from "react";
import Image from "next/image";
import { StarIcon, CheckIcon } from "@/components/Icons";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Marcus Holloway",
      role: "YouTube Shorts Creator (1.4M Subs)",
      avatar: "/images/gallery/anime-1.jpg",
      initials: "MH",
      quote:
        "ToonForge AI cut my animation production time from 3 days per Short down to literally 15 minutes. The 3D Pixar render and Lip-Sync feature are so crisp my audience thought I hired a full animation studio.",
      metric: "Grew channel +420K subs in 3 months",
      rating: 5,
      styleUsed: "3D Pixar Cinematic",
    },
    {
      name: "Elena Rostova",
      role: "Lead Creative Director at VibeMedia",
      avatar: "/images/hero-cartoon.jpg",
      initials: "ER",
      quote:
        "We've generated over 200 animated cartoon ad spots for DTC eCommerce brands using ToonForge. The commercial licensing and 4K ProRes exports make it an absolute staple in our agency workflow.",
      metric: "Saved $18,000 in animator contractor costs",
      rating: 5,
      styleUsed: "Japanese Anime HD",
    },
    {
      name: "David K. Sterling",
      role: "Children's Book Author & Educator",
      avatar: "/images/gallery/3d-1.jpg",
      initials: "DS",
      quote:
        "As an independent author, turning my storybook characters into animated video teasers for TikTok was impossible before. The Claymation and Watercolor models captured the whimsical hand-drawn feel effortlessly.",
      metric: "5.2M viral views on TikTok",
      rating: 5,
      styleUsed: "Claymation Stop-Motion",
    },
    {
      name: "Aiko Tanaka",
      role: "Indie Game Art Lead, PixelWave Games",
      avatar: "/images/gallery/pixar-1.jpg",
      initials: "AT",
      quote:
        "The photo-to-cartoon and character turnaround consistency is unmatched. We used ToonForge to prototype 50+ animated NPC dialogue portraits for our upcoming RPG in a single weekend.",
      metric: "Reduced prototype cycle by 85%",
      rating: 5,
      styleUsed: "Marvel Comic Ink",
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-slate-950/60 relative border-y border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="amber" size="md" dot>
            <span>Creator Stories & Reviews</span>
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Loved by 100,000+ creators, <br className="hidden sm:inline" />
            <span className="gradient-text">animators, and viral studios</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
            See how creators are using ToonForge AI to build massive audiences and produce cinematic animations in minutes.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {testimonials.map((t, idx) => (
            <Card
              key={idx}
              variant="glass"
              hover={true}
              className="p-7 sm:p-8 flex flex-col justify-between space-y-6 border-slate-800/80 hover:border-purple-500/40"
            >
              <div className="space-y-4">
                {/* Star Rating & Style Badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <StarIcon key={i} className="w-4 h-4" />
                    ))}
                  </div>
                  <span className="text-[11px] font-mono text-purple-300 bg-purple-950/60 border border-purple-800/60 px-2.5 py-0.5 rounded-full">
                    {t.styleUsed}
                  </span>
                </div>

                {/* Quote */}
                <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              {/* Author & Metric Strip */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full overflow-hidden relative bg-gradient-to-tr from-purple-600 to-pink-500 p-0.5 shrink-0">
                    <div className="w-full h-full rounded-full overflow-hidden bg-slate-900 flex items-center justify-center font-bold text-xs text-purple-200">
                      {t.avatar ? (
                        <Image
                          src={t.avatar}
                          alt={t.name}
                          width={44}
                          height={44}
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        t.initials
                      )}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                      <span>{t.name}</span>
                      <CheckIcon className="w-3.5 h-3.5 text-emerald-400 inline" />
                    </h4>
                    <p className="text-xs text-slate-400">{t.role}</p>
                  </div>
                </div>

                <div className="hidden sm:block text-right">
                  <span className="text-xs font-mono text-emerald-400 font-semibold block">
                    {t.metric}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
