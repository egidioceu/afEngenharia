import { motion, type HTMLMotionProps } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

type InteractiveButtonProps = Omit<HTMLMotionProps<"a">, "children"> & {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  showArrow?: boolean;
};

const variants = {
  primary:
    "border-brand-amber bg-brand-amber text-brand-ink shadow-amber hover:bg-[#ffd14f]",
  secondary:
    "border-white/20 bg-white/[0.045] text-white hover:border-brand-cyan/60 hover:bg-white/[0.08]",
  ghost: "border-transparent bg-transparent text-brand-navy hover:text-brand-blue",
};

export function InteractiveButton({
  children,
  variant = "primary",
  showArrow = true,
  className = "",
  ...props
}: InteractiveButtonProps) {
  return (
    <motion.a
      whileHover={{ y: -3 }}
      whileTap={{ y: 0, scale: 0.975 }}
      transition={{ type: "spring", stiffness: 420, damping: 24 }}
      className={`group inline-flex min-h-12 items-center justify-center gap-3 border px-5 font-display text-sm font-semibold tracking-[-0.02em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-cyan ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
      {showArrow && (
        <ArrowUpRight
          aria-hidden="true"
          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      )}
    </motion.a>
  );
}
