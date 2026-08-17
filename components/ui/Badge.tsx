import React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "purple" | "pink" | "cyan" | "emerald" | "amber" | "neutral";
  size?: "sm" | "md";
  dot?: boolean;
  children: React.ReactNode;
}

export const Badge = ({
  variant = "purple",
  size = "md",
  dot = false,
  className = "",
  children,
  ...props
}: BadgeProps) => {
  const sizeStyles = {
    sm: "text-[10px] px-2 py-0.5 font-medium tracking-wide",
    md: "text-xs px-3 py-1 font-semibold",
  };

  const variantStyles = {
    purple:
      "bg-purple-950/60 text-purple-300 border border-purple-800/60 shadow-[0_0_12px_rgba(168,85,247,0.15)]",
    pink:
      "bg-pink-950/60 text-pink-300 border border-pink-800/60 shadow-[0_0_12px_rgba(236,72,153,0.15)]",
    cyan:
      "bg-cyan-950/60 text-cyan-300 border border-cyan-800/60 shadow-[0_0_12px_rgba(6,182,212,0.15)]",
    emerald:
      "bg-emerald-950/60 text-emerald-300 border border-emerald-800/60 shadow-[0_0_12px_rgba(16,185,129,0.15)]",
    amber:
      "bg-amber-950/60 text-amber-300 border border-amber-800/60 shadow-[0_0_12px_rgba(245,158,11,0.15)]",
    neutral:
      "bg-slate-800/80 text-slate-300 border border-slate-700/60",
  };

  const dotColors = {
    purple: "bg-purple-400",
    pink: "bg-pink-400",
    cyan: "bg-cyan-400",
    emerald: "bg-emerald-400",
    amber: "bg-amber-400",
    neutral: "bg-slate-400",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {dot && (
        <span
          className={`w-1.5 h-1.5 rounded-full ${dotColors[variant]} animate-pulse`}
        />
      )}
      {children}
    </span>
  );
};

export default Badge;
