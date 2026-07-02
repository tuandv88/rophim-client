import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../../utils/cn";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "outline";
  children: ReactNode;
}

export function Button({ className, variant = "primary", children, ...props }: ButtonProps) {
  const variants = {
    primary: "bg-brand text-white hover:bg-red-700",
    ghost: "bg-transparent text-white hover:bg-white/10",
    outline: "border border-line bg-white/5 text-white hover:bg-white/10",
  };

  return (
    <button
      className={cn(
        "inline-flex min-h-10 items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50",
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
