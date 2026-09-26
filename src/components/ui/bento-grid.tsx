import type { HTMLAttributes, ReactNode } from "react";

type BentoGridProps = HTMLAttributes<HTMLDivElement>;

type BentoItemProps = HTMLAttributes<HTMLElement> & {
  eyebrow: string;
  title: string;
  description: string;
  metric?: string;
  metricLabel?: string;
  icon: ReactNode;
};

export function BentoGrid({ className = "", ...props }: BentoGridProps) {
  return (
    <div
      className={`grid grid-cols-1 gap-4 md:grid-cols-6 md:auto-rows-[15rem] ${className}`}
      {...props}
    />
  );
}

export function BentoItem({
  eyebrow,
  title,
  description,
  metric,
  metricLabel,
  icon,
  className = "",
  ...props
}: BentoItemProps) {
  return (
    <article
      className={`group relative overflow-hidden border border-white/10 bg-white/[0.035] p-6 transition-colors duration-300 hover:border-brand-cyan/40 md:p-7 ${className}`}
      {...props}
    >
      <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 [background:linear-gradient(120deg,rgba(88,181,225,.09),transparent_48%)]" />
      <div className="relative flex h-full flex-col">
        <div className="mb-auto flex items-start justify-between gap-6">
          <span className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-brand-cyan">
            {eyebrow}
          </span>
          <div className="text-brand-amber">{icon}</div>
        </div>
        {metric && (
          <div className="mb-5">
            <div className="font-display text-4xl font-semibold tracking-[-0.06em] text-white">
              {metric}
            </div>
            <div className="mt-1 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-brand-line">
              {metricLabel}
            </div>
          </div>
        )}
        <h3 className="font-display text-xl font-medium tracking-[-0.03em] text-white">
          {title}
        </h3>
        <p className="mt-2 max-w-md text-sm leading-6 text-brand-line">
          {description}
        </p>
      </div>
    </article>
  );
}
