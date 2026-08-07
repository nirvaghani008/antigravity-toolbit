"use client";

import React, { useState } from "react";
import { ChevronDownIcon } from "./Icons";

interface FAQItemProps {
  question: string;
  answer: string;
}

export default function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-slate-800/80">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-4 text-left flex items-center justify-between gap-4 focus:outline-none group"
      >
        <span className="text-sm font-semibold text-slate-200 group-hover:text-indigo-400 transition-colors">
          {question}
        </span>
        <div className={`p-1 rounded-md text-slate-400 group-hover:text-white transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
          <ChevronDownIcon className="w-4 h-4" />
        </div>
      </button>

      {isOpen && (
        <div className="pb-4 text-xs text-slate-400 leading-relaxed space-y-2 animate-fadeIn">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}
