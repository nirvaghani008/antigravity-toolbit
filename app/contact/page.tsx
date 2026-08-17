"use client";

import React, { useState } from "react";
import {
  CheckIcon,
  ArrowRightIcon,
  ClockIcon,
  TwitterIcon,
  DiscordIcon,
  YouTubeIcon,
} from "@/components/Icons";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Select from "@/components/ui/Select";
import Accordion, { AccordionItem } from "@/components/ui/Accordion";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "General Inquiry",
    message: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const subjectOptions = [
    { value: "General Inquiry", label: "General Inquiry" },
    { value: "Creator Support", label: "Creator & Technical Support" },
    { value: "Business & Partnership", label: "Enterprise & Partnerships" },
    { value: "Press & Media", label: "Press & Media Inquiries" },
    { value: "Billing & Invoicing", label: "Billing & Subscription Invoicing" },
  ];

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.message.trim()) {
      newErrors.message = "Message cannot be empty";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters long";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);
    if (!validate()) return;

    setLoading(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to submit message");
      }

      setLoading(false);
      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        subject: "General Inquiry",
        message: "",
      });
    } catch (err: unknown) {
      setLoading(false);
      setServerError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    }
  };

  const contactFaqs: AccordionItem[] = [
    {
      id: "c-faq-1",
      question: "How fast does ToonForge customer support respond?",
      answer:
        "Our creator support team operates 24/7. We typically respond to support tickets within 2 hours during normal hours, and guaranteed under 24 hours for all general inquiries.",
    },
    {
      id: "c-faq-2",
      question: "Can I request custom animation models or style fine-tuning?",
      answer:
        "Yes! For studio and enterprise clients, our AI research team can train custom LoRA weights and characters tailored to your brand's unique intellectual property.",
    },
    {
      id: "c-faq-3",
      question: "Where can I report prompt bugs or model artifact glitches?",
      answer:
        "You can select 'Creator & Technical Support' in the form or join our official Discord server where our engineering team troubleshoots prompt questions in real time.",
    },
  ];

  return (
    <div className="space-y-16 pb-20">
      
      {/* Hero Header */}
      <section className="pt-12 sm:pt-20 pb-4 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="inline-flex items-center gap-2">
          <Badge variant="purple" size="md" dot>
            <span>24/7 Creator Support</span>
          </Badge>
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
          Get in <span className="gradient-text">Touch</span>
        </h1>
        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          We&apos;d love to hear from you. Have questions about AI video generation, enterprise clusters, custom styles, or partnerships? Reach out below.
        </p>
      </section>

      {/* Main Grid: Contact Form (7 cols) + Info Cards (5 cols) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left: Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <Card
              variant="glass"
              hover={false}
              className="p-6 sm:p-10 space-y-6 border-slate-800/80"
            >
              <div className="space-y-1.5 border-b border-slate-800 pb-5">
                <h2 className="text-2xl font-bold text-white">Send Us a Message</h2>
                <p className="text-xs text-slate-400">
                  Fill out the form below and a representative will reply within 24 hours.
                </p>
              </div>

              {serverError && (
                <div className="p-4 rounded-xl bg-rose-950/60 border border-rose-800/80 text-rose-300 text-xs">
                  {serverError}
                </div>
              )}

              {submitted ? (
                <div className="p-8 bg-emerald-950/60 border border-emerald-800/80 rounded-2xl text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-900/80 text-emerald-300 flex items-center justify-center mx-auto shadow-lg shadow-emerald-950/50">
                    <CheckIcon className="w-7 h-7 text-emerald-200" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-emerald-200">
                      Message Received!
                    </h3>
                    <p className="text-xs sm:text-sm text-emerald-300/80 max-w-md mx-auto leading-relaxed">
                      Thank you for contacting ToonForge AI. A member of our technical team has received your submission and will get back to you shortly.
                    </p>
                  </div>
                  <div className="pt-2">
                    <Button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      variant="outline"
                      size="sm"
                      className="text-emerald-300 border-emerald-700/60 hover:bg-emerald-900/30"
                    >
                      Send Another Message
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Your Name"
                      placeholder="e.g. Maya Lin"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      error={errors.name}
                      required
                    />

                    <Input
                      label="Email Address"
                      type="email"
                      placeholder="e.g. maya@studio.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      error={errors.email}
                      required
                    />
                  </div>

                  <Select
                    label="Subject / Topic"
                    options={subjectOptions}
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                  />

                  <Textarea
                    label="Your Message"
                    placeholder="Tell us about your project, questions regarding AI video styles, enterprise clusters, or feedback..."
                    rows={5}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    error={errors.message}
                    helperText="Please include any relevant project details or prompt questions."
                    required
                  />

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    isLoading={loading}
                    className="w-full font-bold shadow-xl shadow-purple-600/30 py-3.5"
                    rightIcon={<ArrowRightIcon className="w-4 h-4" />}
                  >
                    Send Message
                  </Button>
                </form>
              )}
            </Card>
          </div>

          {/* Right: Info Cards & Channels (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Support Channels Card */}
            <Card
              variant="glass"
              hover={false}
              className="p-6 sm:p-8 space-y-6 border-slate-800/80"
            >
              <h3 className="text-lg font-bold text-white">Direct Channels</h3>
              
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-purple-400 font-bold block">
                    Creator Support & Bugs
                  </span>
                  <a
                    href="mailto:support@toonforge.ai"
                    className="text-sm font-semibold text-white hover:text-purple-300 transition-colors block"
                  >
                    support@toonforge.ai
                  </a>
                  <p className="text-[11px] text-slate-400">
                    For account issues, prompt debugging, and video rendering help.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-pink-400 font-bold block">
                    Enterprise & Licensing
                  </span>
                  <a
                    href="mailto:partnerships@toonforge.ai"
                    className="text-sm font-semibold text-white hover:text-pink-300 transition-colors block"
                  >
                    partnerships@toonforge.ai
                  </a>
                  <p className="text-[11px] text-slate-400">
                    For agency volume, API licensing, and custom model training.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold block">
                    Press & Media Inquiries
                  </span>
                  <a
                    href="mailto:press@toonforge.ai"
                    className="text-sm font-semibold text-white hover:text-cyan-300 transition-colors block"
                  >
                    press@toonforge.ai
                  </a>
                  <p className="text-[11px] text-slate-400">
                    For interview requests, press kits, and event speaking.
                  </p>
                </div>
              </div>

              {/* SLA Response Note */}
              <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/50 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-purple-900/80 flex items-center justify-center shrink-0 text-purple-300">
                  <ClockIcon className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-purple-200">Response SLA</p>
                  <p className="text-[11px] text-purple-300/80">Average response time: &lt; 2 hours</p>
                </div>
              </div>

              {/* Community Links */}
              <div className="pt-2">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold block mb-3">
                  Join Creator Community
                </span>
                <div className="flex items-center gap-3">
                  <a
                    href="https://discord.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-purple-500/50 hover:bg-purple-950/20 text-slate-300 hover:text-white flex items-center justify-center gap-2 text-xs font-semibold transition-all"
                  >
                    <DiscordIcon className="w-4 h-4 text-purple-400" />
                    <span>Discord</span>
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-purple-500/50 hover:bg-purple-950/20 text-slate-300 hover:text-white flex items-center justify-center gap-2 text-xs font-semibold transition-all"
                  >
                    <TwitterIcon className="w-4 h-4 text-cyan-400" />
                    <span>Twitter/X</span>
                  </a>
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-purple-500/50 hover:bg-purple-950/20 text-slate-300 hover:text-white flex items-center justify-center gap-2 text-xs font-semibold transition-all"
                  >
                    <YouTubeIcon className="w-4 h-4 text-rose-400" />
                    <span>YouTube</span>
                  </a>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Mini Support FAQ */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 pt-6">
        <div className="text-center space-y-2">
          <Badge variant="purple" size="sm">
            Quick Support Answers
          </Badge>
          <h2 className="text-2xl font-bold text-white">Support FAQs</h2>
        </div>
        <Accordion items={contactFaqs} />
      </section>
    </div>
  );
}
