import type { HTMLAttributes } from "react";

export function TechnicalBadge({
  children,
  className = "",
  ...props
}: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={`inline-flex items-center gap-2 border border-brand-cyan/30 bg-brand-cyan/[0.06] px-3 py-2 font-mono text-[0.66rem] uppercase tracking-[0.18em] text-brand-cyan ${className}`}
      {...props}
    >
      <span className="h-1.5 w-1.5 bg-brand-amber shadow-[0_0_12px_rgba(244,185,31,.8)]" />
      {children}
    </span>
  );
}
