import { cn } from "@/lib/utils";

export default function CricketBatIcon({
  className,
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("w-6 h-6", className)}
    >
      <path d="M4 20L8 16" />
      <path d="M8 16L12 12" />
      <rect x="11" y="4" width="4" height="12" rx="1" transform="rotate(45 13 10)" />
      <circle cx="19" cy="5" r="3" />
      <path d="M17.5 3.5C18 4.5 18 5.5 17.5 6.5" />
      <path d="M20.5 3.5C20 4.5 20 5.5 20.5 6.5" />
    </svg>
  );
}
