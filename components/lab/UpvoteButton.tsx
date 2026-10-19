"use client";

import React, { useState } from "react";

interface UpvoteButtonProps {
  slug: string;
  toolName: string;
  initialCount: number;
  initialVoted: boolean;
}

// Counts the vote straight away, then rolls back if the server refuses it.
export default function UpvoteButton({ slug, toolName, initialCount, initialVoted }: UpvoteButtonProps) {
  const [count, setCount] = useState(initialCount);
  const [voted, setVoted] = useState(initialVoted);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleVote = async () => {
    if (voted || pending) return;
    setError(null);
    setPending(true);
    setVoted(true);
    setCount((c) => c + 1);

    try {
      const res = await fetch(`/api/lab/tools/${slug}/upvote`, { method: "POST" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = (await res.json()) as { count: number };
      setCount(data.count);
    } catch {
      setVoted(false);
      setCount((c) => c - 1);
      setError("Your vote wasn't saved. Please try again.");
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={handleVote}
        disabled={voted || pending}
        aria-pressed={voted}
        aria-label={voted ? `You upvoted ${toolName}` : `Upvote ${toolName}`}
        className={`inline-flex items-center gap-3 rounded-xl border px-5 py-3 text-sm font-semibold transition-colors ${
          voted
            ? "border-purple-500/60 bg-purple-600/25 text-purple-100 cursor-default"
            : "border-slate-700 bg-slate-900 text-slate-100 hover:border-purple-500/60 cursor-pointer"
        }`}
      >
        <span aria-hidden="true">▲</span>
        <span>{voted ? "Upvoted" : "Upvote"}</span>
        <span className="font-mono text-purple-300" data-testid="upvote-count">
          {count}
        </span>
      </button>
      {error && (
        <p role="alert" className="text-xs text-rose-400">
          {error}
        </p>
      )}
    </div>
  );
}
