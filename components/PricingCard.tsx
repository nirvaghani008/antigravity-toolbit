import React from "react";
import { CheckIcon, SparklesIcon } from "./Icons";

export interface PricingPlan {
  name: string;
  monthlyPrice: number;
  annualPrice: number;
  description: string;
  features: string[];
  isPopular?: boolean;
  ctaText: string;
  ctaHref: string;
}

interface PricingCardProps {
  plan: PricingPlan;
  isAnnual: boolean;
}

export default function PricingCard({ plan, isAnnual }: PricingCardProps) {
  const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;

  return (
    <div
      className={`relative rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 ${
        plan.isPopular
          ? "bg-slate-900 border-2 border-indigo-500 shadow-2xl shadow-indigo-950/50 scale-105 z-10"
          : "bg-slate-900/60 border border-slate-800 hover:border-slate-700"
      }`}
    >
      {plan.isPopular && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 bg-indigo-600 text-white font-semibold text-[11px] uppercase tracking-wider rounded-full flex items-center gap-1 shadow-md">
          <SparklesIcon className="w-3.5 h-3.5" />
          <span>Most Popular</span>
        </div>
      )}

      <div>
        <h3 className="text-lg font-bold text-white mb-1">{plan.name}</h3>
        <p className="text-xs text-slate-400 mb-6">{plan.description}</p>

        <div className="mb-6">
          <div className="flex items-baseline gap-1">
            <span className="text-3xl sm:text-4xl font-extrabold text-white">${price}</span>
            <span className="text-xs text-slate-400">/ month</span>
          </div>
          {isAnnual && plan.annualPrice > 0 && (
            <p className="text-[11px] text-emerald-400 mt-1 font-medium">Billed annually (Save 20%)</p>
          )}
        </div>

        <div className="space-y-3 mb-8">
          <p className="text-xs font-semibold text-slate-300 uppercase tracking-wider">What&apos;s included:</p>
          <ul className="space-y-2.5">
            {plan.features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                <div className="w-4 h-4 rounded-full bg-indigo-950 text-indigo-400 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckIcon className="w-3 h-3" />
                </div>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <a
        href={plan.ctaHref}
        className={`w-full py-3 px-4 rounded-xl text-xs font-semibold text-center transition-all ${
          plan.isPopular
            ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30"
            : "bg-slate-800 hover:bg-slate-700 text-slate-200"
        }`}
      >
        {plan.ctaText}
      </a>
    </div>
  );
}
