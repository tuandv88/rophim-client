import { cn } from "../../utils/cn";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2.5 select-none font-sans", className)}>
      <div className="relative flex h-9.5 w-9.5 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-[#B80610] shadow-[0_0_15px_rgba(229,9,20,0.4)] transition-all duration-300 hover:scale-105 hover:rotate-6">
        {/* Play Icon SVG */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="ml-0.5 h-4.5 w-4.5 text-white"
        >
          <path d="M5.055 7.06C5.005 7.014 4.97 6.955 4.97 6.89V17.11c0 .065.035.124.085.17L15.35 12 5.055 7.06Z" className="hidden" />
          <path d="M4.5 3.75a.75.75 0 0 0-1.125.65v15.184a.75.75 0 0 0 1.125.65l13.018-7.592a.75.75 0 0 0 0-1.3L4.5 3.75Z" />
        </svg>
        {/* Glowing Pulsing Effect */}
        <div className="absolute -inset-0.5 -z-10 rounded-xl bg-gradient-to-br from-brand to-red-500 opacity-20 blur-sm transition-opacity duration-300 group-hover:opacity-40" />
      </div>
      <span className="text-xl font-black tracking-wider text-white">
        RO<span className="text-brand">PHIM</span>
      </span>
    </div>
  );
}
