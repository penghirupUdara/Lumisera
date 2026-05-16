import { Playfair_Display } from "next/font/google";
import { cn } from "@/lib/utils";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export function Logo({ className, variant = "light" }: { className?: string, variant?: "light" | "dark" }) {
  const isDark = variant === "dark";
  return (
    <div className={cn("flex flex-col select-none", className)}>
      <span className={cn(
        "text-3xl sm:text-4xl tracking-tight leading-none", 
        playfair.className, 
        isDark ? "text-white" : "text-lumisera-800"
      )}>
        Lumisera
      </span>
      <span className={cn(
        "text-[0.55rem] sm:text-[0.65rem] font-medium tracking-wide mt-1 uppercase", 
        isDark ? "text-neutral-300" : "text-neutral-600"
      )}>
        Capturing Light, Preserving Moments
      </span>
    </div>
  );
}
