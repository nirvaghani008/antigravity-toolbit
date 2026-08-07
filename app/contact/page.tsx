"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  MailIcon,
  MapPinIcon,
  CheckIcon,
  ArrowRightIcon,
  SparklesIcon,
} from "@/components/Icons";

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

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.message.trim()) {
      newErrors.message = "Message cannot be empty";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters long";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    // Simulate server submission API latency
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "General Inquiry", message: "" });
    }, 800);
  };

  return (
    <div className="space-y-16 pb-12">
      {/* Hero Banner */}
      <section className="pt-12 sm:pt-20 pb-6 text-center max-w-4xl mx-auto px-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-indigo-400 mb-6">
          <MailIcon className="w-4 h-4" />
          <span>24/7 Creator Support</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Get in <span className="gradient-text">Touch</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto mt-4 leading-relaxed">
          Have questions about AI models, custom enterprise plans, or licensing? Our support team is here to help.
        </p>
      </section>

      {/* Main Content Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Contact Form (7 cols) */}
          <div className="lg:col-span-7 bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-white">Send Us a Message</h2>
              <p className="text-xs text-slate-400">Fill out the form below and we will get back to you within 24 hours.</p>
            </div>

            {submitted ? (
              <div className="p-6 bg-emerald-950/60 border border-emerald-800 rounded-xl space-y-3 animate-fadeIn">
                <div className="w-10 h-10 rounded-full bg-emerald-900/80 text-emerald-300 flex items-center justify-center">
                  <CheckIcon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-emerald-300">Message Received!</h3>
                <p className="text-xs text-emerald-200/80 leading-relaxed">
                  Thank you for reaching out to ToonForge AI support. A member of our team will respond to your email shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 bg-emerald-900 hover:bg-emerald-800 text-emerald-200 rounded-lg text-xs font-semibold transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name Input */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300">Your Name *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Alex Rivers"
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                    />
                    {errors.name && <p className="text-[11px] text-rose-400">{errors.name}</p>}
                  </div>

                  {/* Email Input */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300">Your Email *</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@example.com"
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                    />
                    {errors.email && <p className="text-[11px] text-rose-400">{errors.email}</p>}
                  </div>
                </div>

                {/* Subject Selector */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Subject</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Billing & Plans">Billing & Subscription Plans</option>
                    <option value="Enterprise & API Access">Enterprise API & Licensing</option>
                    <option value="Technical Support">Technical Support</option>
                  </select>
                </div>

                {/* Message Textarea */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Your Message *</label>
                  <textarea
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us how we can help you with AI character generation..."
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 resize-none"
                  />
                  {errors.message && <p className="text-[11px] text-rose-400">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white rounded-xl text-xs font-semibold transition-all shadow-md shadow-indigo-600/20 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    <span>Sending Message...</span>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <ArrowRightIcon className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Right Info Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Info Cards */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
              <h3 className="text-base font-bold text-white">Contact Information</h3>
              <ul className="space-y-4 text-xs text-slate-300">
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-950 text-indigo-400 flex items-center justify-center shrink-0">
                    <MailIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-white block">Email Support</span>
                    <span className="text-slate-400">support@toonforge.ai</span>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-950 text-indigo-400 flex items-center justify-center shrink-0">
                    <SparklesIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-white block">Support Hours</span>
                    <span className="text-slate-400">Monday – Friday: 9AM – 6PM EST</span>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-950 text-indigo-400 flex items-center justify-center shrink-0">
                    <MapPinIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-white block">Headquarters</span>
                    <span className="text-slate-400">ToonForge AI Labs, 450 AI Innovation Way, San Francisco, CA</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Quick FAQ Reference Box */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-950/60 to-slate-900 border border-indigo-800/50 space-y-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span>Looking for Quick Answers?</span>
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Check our Frequently Asked Questions section to find instant answers regarding free limits, commercial licensing, and image resolutions.
              </p>
              <Link
                href="/#faq"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-400 hover:text-indigo-300 pt-1"
              >
                <span>Read Home FAQs</span>
                <ArrowRightIcon className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Embedded Map Visual Placeholder */}
            <div className="relative h-48 rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 flex flex-col items-center justify-center text-center p-4">
              <MapPinIcon className="w-8 h-8 text-indigo-400 mb-2" />
              <span className="text-xs font-bold text-white">San Francisco HQ</span>
              <span className="text-[11px] text-slate-500 font-mono">37.7749° N, 122.4194° W</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
