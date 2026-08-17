import React from "react";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      helperText,
      className = "",
      id,
      rows = 4,
      ...props
    },
    ref
  ) => {
    const textareaId =
      id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-xs font-semibold text-slate-200 tracking-wide"
          >
            {label}
          </label>
        )}
        <div className="relative rounded-xl overflow-hidden">
          <textarea
            id={textareaId}
            ref={ref}
            rows={rows}
            className={`w-full bg-slate-900/80 border text-slate-100 placeholder-slate-500 text-sm rounded-xl p-4 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/80 disabled:opacity-50 disabled:cursor-not-allowed resize-y ${
              error
                ? "border-rose-500/80 focus:ring-rose-500/50 focus:border-rose-500"
                : "border-slate-800 hover:border-slate-700"
            } ${className}`}
            {...props}
          />
        </div>
        {error && <p className="text-xs text-rose-400 mt-1">{error}</p>}
        {!error && helperText && (
          <p className="text-xs text-slate-400 mt-1">{helperText}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
export default Textarea;
