import React from "react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  badge?: string;
}

export default function FeatureCard({ icon, title, description, badge }: FeatureCardProps) {
  return (
    <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-950/30 group">
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 rounded-xl bg-indigo-950/80 border border-indigo-800/60 text-indigo-400 flex items-center justify-center group-hover:scale-110 transition-transform">
          {icon}
        </div>
        {badge && (
          <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
            {badge}
          </span>
        )}
      </div>
      <h3 className="text-base font-semibold text-white mb-2 group-hover:text-indigo-300 transition-colors">
        {title}
      </h3>
      <p className="text-xs text-slate-400 leading-relaxed">
        {description}
      </p>
    </div>
  );
}
