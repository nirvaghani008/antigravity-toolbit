import React from "react";
import Image from "next/image";
import { StarIcon } from "./Icons";

interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
  avatar: string;
  rating?: number;
}

export default function TestimonialCard({
  quote,
  name,
  role,
  avatar,
  rating = 5,
}: TestimonialCardProps) {
  return (
    <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-colors">
      <div className="space-y-4">
        {/* Rating Stars */}
        <div className="flex items-center gap-1 text-amber-400">
          {Array.from({ length: rating }).map((_, i) => (
            <StarIcon key={i} className="w-4 h-4" />
          ))}
        </div>
        <p className="text-xs sm:text-sm text-slate-300 italic leading-relaxed">
          &quot;{quote}&quot;
        </p>
      </div>

      {/* User info */}
      <div className="flex items-center gap-3 pt-6 mt-4 border-t border-slate-800/60">
        <div className="relative w-10 h-10 rounded-full overflow-hidden border border-slate-700 bg-slate-800">
          <Image
            src={avatar}
            alt={name}
            fill
            sizes="40px"
            className="object-cover"
          />
        </div>
        <div>
          <h4 className="text-xs font-semibold text-white">{name}</h4>
          <p className="text-[11px] text-slate-400">{role}</p>
        </div>
      </div>
    </div>
  );
}
