"use client";

import { cn } from "@/lib/utils";

export default function PredictorCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl glass-card border p-6 md:p-8",
        className
      )}
    >
      {children}
    </div>
  );
}
