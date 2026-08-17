"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SparklesIcon,
  WandIcon,
  MenuIcon,
  XIcon,
  ArrowRightIcon,
} from "@/components/Icons";
import Button from "@/components/ui/Button";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Features", href: "/#features" },
    { name: "How It Works", href: "/#how-it-works" },
    { name: "Showcase", href: "/#showcase" },
    { name: "Pricing", href: "/#pricing" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-slate-950/80 backdrop-blur-xl border-b border-purple-500/15 shadow-xl shadow-slate-950/50 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group focus:outline-none"
            aria-label="ToonForge AI Home"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-fuchsia-500 to-orange-500 p-0.5 shadow-lg shadow-purple-600/30 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <WandIcon className="w-5 h-5 text-purple-400 group-hover:text-pink-400 transition-colors" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white flex items-center gap-1.5">
                ToonForge <span className="gradient-text font-black">AI</span>
              </span>
              <span className="text-[10px] text-purple-300/80 -mt-1 font-mono font-medium tracking-widest uppercase">
                Cartoon & Video AI
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-900/60 border border-slate-800/80 backdrop-blur-md rounded-full px-4 py-1.5 shadow-inner">
            {navLinks.map((link) => {
              const isActive =
                link.href === pathname ||
                (link.href.startsWith("/#") && pathname === "/");
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-xs font-medium px-3.5 py-1.5 rounded-full transition-all duration-200 ${
                    isActive
                      ? "text-white bg-purple-600/30 text-purple-300 font-semibold"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <Link href="/#pricing">
              <Button variant="ghost" size="sm" className="text-slate-300">
                Sign In
              </Button>
            </Link>
            <Link href="/#demo">
              <Button
                variant="primary"
                size="sm"
                leftIcon={<SparklesIcon className="w-3.5 h-3.5" />}
                rightIcon={<ArrowRightIcon className="w-3.5 h-3.5" />}
              >
                Generate Now
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <Link href="/#demo">
              <Button variant="primary" size="sm" className="text-xs px-3 py-1.5">
                Try Free
              </Button>
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <XIcon className="w-5 h-5" />
              ) : (
                <MenuIcon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="sm:hidden mt-4 p-5 rounded-2xl bg-slate-900/95 border border-purple-500/20 backdrop-blur-2xl space-y-4 shadow-2xl animate-fadeIn">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-200 hover:text-white hover:bg-purple-900/20 transition-colors flex items-center justify-between"
                >
                  <span>{link.name}</span>
                  <ArrowRightIcon className="w-4 h-4 text-slate-500" />
                </Link>
              ))}
            </div>
            <div className="pt-3 border-t border-slate-800 flex flex-col gap-2.5">
              <Link
                href="/#demo"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full"
              >
                <Button
                  variant="primary"
                  size="md"
                  className="w-full"
                  leftIcon={<SparklesIcon className="w-4 h-4" />}
                >
                  Generate First Video Free
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
