import React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "glass" | "subtle" | "glow" | "solid";
  hover?: boolean;
  children: React.ReactNode;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = "glass",
      hover = true,
      className = "",
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles = "rounded-2xl relative overflow-hidden";

    const variantStyles = {
      glass: "glass-panel text-slate-100",
      subtle: "glass-panel-subtle text-slate-100",
      glow: "gradient-border-card text-slate-100",
      solid: "bg-slate-900 border border-slate-800 text-slate-100",
    };

    const hoverStyles = hover ? "glass-panel-hover" : "";

    return (
      <div
        ref={ref}
        className={`${baseStyles} ${variantStyles[variant]} ${hoverStyles} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";
export default Card;
