"use client";

import React, { useState } from "react";
import { ChevronDownIcon } from "@/components/Icons";

export interface AccordionItem {
  id: string;
  question: string;
  answer: React.ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];
  defaultOpenId?: string;
  allowMultiple?: boolean;
  className?: string;
}

export const Accordion = ({
  items,
  defaultOpenId,
  allowMultiple = false,
  className = "",
}: AccordionProps) => {
  const [openIds, setOpenIds] = useState<string[]>(
    defaultOpenId ? [defaultOpenId] : []
  );

  const toggleItem = (id: string) => {
    if (allowMultiple) {
      setOpenIds((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    } else {
      setOpenIds((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className={`space-y-3.5 ${className}`}>
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);
        return (
          <div
            key={item.id}
            className={`rounded-2xl transition-all duration-300 border ${
              isOpen
                ? "bg-slate-900/80 border-purple-500/40 shadow-lg shadow-purple-950/20"
                : "bg-slate-900/40 border-slate-800/80 hover:border-slate-700/80"
            }`}
          >
            <button
              type="button"
              onClick={() => toggleItem(item.id)}
              className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
              aria-expanded={isOpen}
            >
              <span
                className={`text-base sm:text-lg font-semibold transition-colors duration-200 ${
                  isOpen ? "text-purple-200" : "text-slate-100 hover:text-white"
                }`}
              >
                {item.question}
              </span>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                  isOpen
                    ? "bg-purple-600/30 text-purple-300 rotate-180"
                    : "bg-slate-800 text-slate-400"
                }`}
              >
                <ChevronDownIcon className="w-4 h-4" />
              </div>
            </button>
            <div
              className={`grid transition-all duration-300 ease-in-out ${
                isOpen
                  ? "grid-rows-[1fr] opacity-100 px-5 sm:px-6 pb-5 sm:pb-6"
                  : "grid-rows-[0fr] opacity-0 px-5 sm:px-6 pb-0"
              }`}
            >
              <div className="overflow-hidden">
                <div className="text-sm sm:text-base text-slate-300 leading-relaxed pt-1 border-t border-slate-800/60">
                  {item.answer}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;
