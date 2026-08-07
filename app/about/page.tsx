import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CTASection from "@/components/CTASection";
import TechStackSection from "@/components/TechStackSection";
import { SparklesIcon, CheckIcon, ArrowRightIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "About Us | ToonForge AI",
  description:
    "Learn about ToonForge AI's mission, founding story, state-of-the-art neural diffusion technology, and the team bringing AI cartoon character design to creators worldwide.",
};

export default function AboutPage() {
  const differentiators = [
    {
      title: "Specialized Latent Diffusion Weights",
      description:
        "Unlike general-purpose image generators, our AI model is specifically fine-tuned for character linework, lighting turnarounds, and facial expression integrity.",
    },
    {
      title: "Real-Time Multi-Style Engine",
      description:
        "Switch between 3D Pixar render, Japanese anime, cute chibi, and classic comic art styles instantly without rewriting complex prompts.",
    },
    {
      title: "Commercial-Ready High Resolution",
      description:
        "Export 4K resolution character PNGs with transparent backgrounds and vector path compatibility ready for print and merchandise.",
    },
    {
      title: "Privacy & Safe AI Architecture",
      description:
        "Your input prompts and photo reference uploads are processed in private, isolated GPU compute environments that respect creator IP.",
    },
  ];

  const teamMembers = [
    {
      name: "Dr. Alex Rivers",
      role: "Co-Founder & Chief AI Scientist",
      bio: "Former generative AI researcher with 8+ years experience training latent diffusion and neural rendering models.",
      photo: "/images/hero-cartoon.jpg",
    },
    {
      name: "Sarah Chen",
      role: "Co-Founder & Head of Product",
      bio: "Ex-Pixar digital artist turned product strategist dedicated to empowering creators with intuitive AI tools.",
      photo: "/images/gallery/anime-1.jpg",
    },
    {
      name: "Marcus Vance",
      role: "Lead ML Systems Engineer",
      bio: "TensorRT & GPU infrastructure specialist building real-time sub-3-second AI inference pipelines.",
      photo: "/images/gallery/3d-1.jpg",
    },
  ];

  const stats = [
    { label: "Characters Generated", value: "500,000+" },
    { label: "AI Art Styles Unlocked", value: "50+" },
    { label: "Active Global Creators", value: "100,000+" },
    { label: "Avg Generation Time", value: "< 2.8 Sec" },
  ];

  return (
    <div className="space-y-16 pb-12">
      {/* Hero Banner */}
      <section className="pt-12 sm:pt-20 pb-6 text-center max-w-4xl mx-auto px-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-indigo-400 mb-6">
          <SparklesIcon className="w-4 h-4" />
          <span>Empowering Global Creativity</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          About <span className="gradient-text">ToonForge AI</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto mt-4 leading-relaxed">
          We are building the future of character illustration — making professional-grade cartoon character design accessible to everyone with AI.
        </p>
      </section>

      {/* Stats Counter Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 rounded-2xl bg-slate-900/60 border border-slate-800">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center space-y-1">
              <div className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                {stat.value}
              </div>
              <div className="text-xs text-slate-400 font-mono">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Our Mission & Story */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Text */}
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase text-indigo-400">Our Purpose</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Democratizing Character Illustration for Storytellers
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Every story, game, and brand begins with a compelling character. Historically, commissioning custom character design required thousands of dollars and weeks of waiting.
            </p>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              We founded ToonForge AI in 2024 to break down those barriers. By fine-tuning state-of-the-art diffusion neural networks specifically on character anatomy, lighting, and art aesthetics, we enable anyone to turn plain text or photos into production-ready cartoon characters in seconds.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <Link
                href="/#try-demo"
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-all shadow-md shadow-indigo-600/20 flex items-center gap-2"
              >
                <span>Try ToonForge AI Now</span>
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Visual Card */}
          <div className="relative aspect-square w-full rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 group">
            <Image
              src="/images/hero-cartoon.jpg"
              alt="ToonForge AI Story"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-slate-950/80 backdrop-blur-md border border-slate-800">
              <p className="text-xs text-indigo-300 font-mono">
                &quot;Our mission is to help 10 million creators bring their imaginary characters to life.&quot;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="bg-slate-950 py-16 border-y border-slate-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-mono uppercase px-3 py-1 rounded-full bg-slate-900 text-slate-400 border border-slate-800">
              Why Choose Us
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              What Makes ToonForge AI Different
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Built specifically for character design — not generic stock photo generation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {differentiators.map((diff, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center gap-2 text-indigo-400">
                  <div className="w-6 h-6 rounded-md bg-indigo-950 border border-indigo-800 flex items-center justify-center text-indigo-400 shrink-0">
                    <CheckIcon className="w-3.5 h-3.5" />
                  </div>
                  <h3 className="text-sm font-semibold text-white">{diff.title}</h3>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed pl-8">
                  {diff.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Technology Deep Dive */}
      <TechStackSection />

      {/* Meet the Team */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-mono uppercase px-3 py-1 rounded-full bg-slate-900 text-slate-400 border border-slate-800">
            The Minds Behind ToonForge
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Meet Our Leadership Team
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            A passionate team of AI researchers, artists, and engineers working together.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 text-center space-y-4 hover:border-slate-700 transition-colors"
            >
              <div className="relative w-24 h-24 mx-auto rounded-full overflow-hidden border-2 border-indigo-500/40 bg-slate-800">
                <Image
                  src={member.photo}
                  alt={member.name}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-white">{member.name}</h3>
                <p className="text-xs text-indigo-400 font-mono">{member.role}</p>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CTASection />
      </div>
    </div>
  );
}
