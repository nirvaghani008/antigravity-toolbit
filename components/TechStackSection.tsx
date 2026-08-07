import React from "react";
import { CpuIcon, WandIcon, LayersIcon, ShieldIcon } from "./Icons";

export default function TechStackSection() {
  return (
    <section className="py-16 bg-slate-950 border-y border-slate-800/60 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-mono uppercase px-3 py-1 rounded-full bg-indigo-950/80 text-indigo-400 border border-indigo-800/60">
            Powered By Neural AI Architecture
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            How Our AI Cartoon Engine Works
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            ToonForge AI combines state-of-the-art latent diffusion models, neural style-transfer adapters, and custom character upscalers to translate your prompts into crisp artwork in seconds.
          </p>
        </div>

        {/* 3 Tech Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-indigo-950 text-indigo-400 flex items-center justify-center">
              <CpuIcon className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-semibold text-white">Latent Diffusion Models</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Instead of generating pixels blindly, our AI works in a compact mathematical latent space. It iteratively removes noise to reveal high-resolution cartoon details with flawless consistency.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-indigo-950 text-indigo-400 flex items-center justify-center">
              <LayersIcon className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-semibold text-white">Neural Style Adapters (LoRA)</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Our fine-tuned LoRA weights allow instant style switching — from 3D Pixar render lighting to hand-drawn Japanese anime linework and classic comic book pop art.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-indigo-950 text-indigo-400 flex items-center justify-center">
              <WandIcon className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-semibold text-white">Neural Vector & Super-Resolution</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every character output is passed through an automated super-resolution pass, scaling your cartoon character up to 4K resolution with zero loss in line crispness.
            </p>
          </div>
        </div>

        {/* AI Stack Badges */}
        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-wrap items-center justify-center gap-6 text-slate-500 text-xs font-mono">
          <span className="flex items-center gap-1.5"><ShieldIcon className="w-4 h-4 text-indigo-400" /> Stable Diffusion Base</span>
          <span>•</span>
          <span>CLIP Text Encoder</span>
          <span>•</span>
          <span>Real-ESRGAN Upscaler</span>
          <span>•</span>
          <span>TensorRT Accelerated</span>
        </div>
      </div>
    </section>
  );
}
