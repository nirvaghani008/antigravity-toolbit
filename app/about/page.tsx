import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  SparklesIcon,
  WandIcon,
  LayersIcon,
  ZapIcon,
  ShieldIcon,
  ArrowRightIcon,
  CpuIcon,
} from "@/components/Icons";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "About Us — Democratizing Animation with AI",
  description:
    "Discover ToonForge AI's mission to make professional-grade cartoon animation and video synthesis accessible to every creator, educator, and studio worldwide.",
  openGraph: {
    title: "About ToonForge AI — Our Story, Vision & Technology",
    description:
      "Learn how we are revolutionizing animation production through latent video diffusion models and real-time cartoon style transfer.",
  },
};

export default function AboutPage() {
  const values = [
    {
      title: "Radical Accessibility",
      badge: "Inclusivity",
      badgeVariant: "purple" as const,
      description:
        "Animation has traditionally required years of training, expensive software licenses, and render farms. We believe any person with an idea should be able to produce studio-grade cartoons in seconds.",
      icon: <SparklesIcon className="w-6 h-6 text-purple-400" />,
    },
    {
      title: "Boundless Creativity",
      badge: "Artistic Freedom",
      badgeVariant: "pink" as const,
      description:
        "We build AI tools to augment human storytelling, not replace it. Our models offer granular control over emotion, lighting, art styles, and pacing so creators remain the ultimate directors.",
      icon: <WandIcon className="w-6 h-6 text-pink-400" />,
    },
    {
      title: "Real-Time Velocity",
      badge: "Instant Gratification",
      badgeVariant: "cyan" as const,
      description:
        "By optimizing neural inference down to sub-2-second render latencies, we turn animation from a painful weeks-long slog into an interactive, real-time creative flow state.",
      icon: <ZapIcon className="w-6 h-6 text-cyan-400" />,
    },
    {
      title: "Ethical & Creator-First AI",
      badge: "Responsible AI",
      badgeVariant: "emerald" as const,
      description:
        "We respect creator copyright and train our specialized models ethically. Our users maintain 100% commercial ownership of everything they create, and prompts remain private.",
      icon: <ShieldIcon className="w-6 h-6 text-emerald-400" />,
    },
  ];

  const pipelineSteps = [
    {
      step: "01",
      title: "Multimodal Prompt & Asset Encoder",
      description:
        "Our language & vision encoders interpret natural text descriptions, character traits, and uploaded photo/video references into dense semantic latent vectors.",
      badge: "Semantic Understanding",
      icon: <WandIcon className="w-5 h-5 text-purple-400" />,
    },
    {
      step: "02",
      title: "Spatio-Temporal Video Diffusion Model",
      description:
        "A proprietary recurrent video diffusion backbone generates cohesive motion trajectories frame-by-frame, ensuring temporal stability and natural character physics.",
      badge: "Temporal Motion Synthesis",
      icon: <CpuIcon className="w-5 h-5 text-pink-400" />,
    },
    {
      step: "03",
      title: "Style Adapter & 4K Super-Resolution",
      description:
        "Fine-tuned LoRA neural adapters apply distinct artistic aesthetics (Pixar 3D, Anime, Comic Ink, Clay) followed by real-time 4K 60fps upscaling.",
      badge: "Artistic Rendering",
      icon: <LayersIcon className="w-5 h-5 text-cyan-400" />,
    },
  ];

  const team = [
    {
      name: "Dr. Alex Rivers",
      role: "Co-Founder & Chief AI Scientist",
      bio: "Former generative AI researcher with 8+ years experience training latent diffusion and spatio-temporal video architectures.",
      avatar: "/images/hero-cartoon.jpg",
      initials: "AR",
    },
    {
      name: "Elena Vance",
      role: "Co-Founder & Head of Animation",
      bio: "Ex-Pixar digital artist and visual storyteller passionate about democratizing character animation for independent storytellers.",
      avatar: "/images/gallery/anime-1.jpg",
      initials: "EV",
    },
    {
      name: "Marcus Chen",
      role: "Lead ML Systems Engineer",
      bio: "GPU infrastructure and TensorRT specialist architecting sub-2-second distributed inference pipelines.",
      avatar: "/images/gallery/3d-1.jpg",
      initials: "MC",
    },
    {
      name: "Maya Patel",
      role: "VP of Product & Creator Ecosystem",
      bio: "Former creator tools product lead dedicated to building intuitive UX for content creators on YouTube, TikTok, and Reels.",
      avatar: "/images/gallery/pixar-1.jpg",
      initials: "MP",
    },
  ];

  return (
    <div className="space-y-20 pb-20">
      
      {/* 1. Hero Intro Section */}
      <section className="pt-12 sm:pt-20 pb-8 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="inline-flex items-center gap-2">
          <Badge variant="purple" size="md" dot>
            <span>Our Mission & Vision</span>
          </Badge>
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
          Democratizing animation for <br className="hidden sm:inline" />
          <span className="gradient-text">every storyteller on Earth</span>
        </h1>
        <p className="text-base sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal">
          We believe that bringing cartoon characters and animated worlds to life shouldn&apos;t be restricted to massive Hollywood studios with multi-million dollar budgets.
        </p>
      </section>

      {/* 2. Our Story Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-slate-900/40 border border-slate-800/80 rounded-3xl p-8 sm:p-12 lg:p-16">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-purple-400 font-bold uppercase tracking-wider">
              <span>Chapter 01: The Origin</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              From tedious keyframing to instant creative magic
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-slate-300 leading-relaxed">
              <p>
                In 2023, our founding team of animation veterans and machine learning researchers sat in a studio watching an artist spend four weeks drawing 480 individual frames for a 20-second cartoon sequence. The storytelling was brilliant, but the bottleneck of manual drawing was crushing.
              </p>
              <p>
                We asked ourselves a simple question: <em>What if you could articulate your vision in plain words or sketch a single character turnaround, and have neural networks handle the complex spatio-temporal in-betweening, lighting, and cel-shading?</em>
              </p>
              <p>
                ToonForge AI was born from that vision. Today, our platform empowers over 100,000 YouTubers, viral TikTok creators, teachers, and independent studios to generate millions of seconds of broadcast-quality cartoon video every month.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden aspect-square border border-purple-500/30 shadow-2xl shadow-purple-950/50">
              <Image
                src="/images/hero-cartoon.jpg"
                alt="ToonForge AI Story and Mission"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-950/80 backdrop-blur-md border border-slate-800">
                <p className="text-xs font-bold text-white">ToonForge Neural Engine v2.0</p>
                <p className="text-[11px] text-slate-400">Trained on over 50+ hand-crafted animation aesthetics</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Our Values Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="pink" size="md" dot>
            <span>Guiding Principles</span>
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Our Core <span className="gradient-text">Values</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            The foundational pillars guiding our research, product engineering, and creator community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {values.map((val, idx) => (
            <Card
              key={idx}
              variant="glass"
              hover={true}
              className="p-7 sm:p-8 space-y-4 border-slate-800/80 hover:border-purple-500/40"
            >
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-center shadow-md">
                  {val.icon}
                </div>
                <Badge variant={val.badgeVariant} size="sm">
                  {val.badge}
                </Badge>
              </div>
              <h3 className="text-xl font-bold text-white">{val.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                {val.description}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* 4. How Our AI Works (Pipeline Explainer) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="cyan" size="md" dot>
            <span>Under The Hood</span>
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            How our generative <span className="gradient-text">AI pipeline works</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            A non-technical look at how your prompts transform into fluid 60fps cartoon animations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pipelineSteps.map((p, idx) => (
            <Card
              key={idx}
              variant="glass"
              hover={true}
              className="p-7 space-y-5 border-slate-800/80 hover:border-purple-500/40 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-black font-mono gradient-text">
                    {p.step}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-center">
                    {p.icon}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-white">{p.title}</h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {p.description}
                </p>
              </div>
              <div className="pt-3 border-t border-slate-800/80">
                <span className="text-[11px] font-mono text-purple-300 font-semibold">
                  {p.badge}
                </span>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* 5. Team Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="amber" size="md" dot>
            <span>Leadership & Engineering</span>
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Meet the team behind <span className="gradient-text">ToonForge AI</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            A passionate group of animators, computer vision researchers, and product engineers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, idx) => (
            <Card
              key={idx}
              variant="glass"
              hover={true}
              className="p-6 text-center space-y-4 border-slate-800/80 hover:border-purple-500/40 flex flex-col items-center"
            >
              <div className="w-24 h-24 rounded-2xl overflow-hidden relative bg-gradient-to-tr from-purple-600 to-pink-500 p-0.5 shadow-xl shadow-purple-950/40">
                <div className="w-full h-full rounded-[14px] overflow-hidden bg-slate-900 relative">
                  {member.avatar ? (
                    <Image
                      src={member.avatar}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-bold text-lg text-purple-200">
                      {member.initials}
                    </div>
                  )}
                </div>
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-white">{member.name}</h3>
                <p className="text-xs font-semibold text-purple-400">{member.role}</p>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">{member.bio}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* 6. Bottom CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-purple-950/60 via-slate-900 to-pink-950/60 border border-purple-800/40 text-center space-y-6 shadow-2xl">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Start creating your cartoon videos today
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
            Experience the future of generative animation with 30 free video credits. No installation or credit card required.
          </p>
          <div className="flex justify-center gap-4 pt-2">
            <Link href="/#demo">
              <Button
                variant="primary"
                size="lg"
                leftIcon={<SparklesIcon className="w-5 h-5 text-amber-300" />}
                rightIcon={<ArrowRightIcon className="w-5 h-5" />}
              >
                Generate First Video Free
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
