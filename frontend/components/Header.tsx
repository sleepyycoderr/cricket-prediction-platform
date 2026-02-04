"use client";

import ThemeToggle from "./ThemeToggle";
import CricketBatIcon from "./icons/CricketBatIcon";

export default function Header() {
  return (
    <header className="glass-card mx-6 mt-6 rounded-2xl px-6 py-4 flex items-center justify-between">

      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-primary shadow-lg">
            <CricketBatIcon
  className="
    w-6 h-6
    text-primary-foreground
    drop-shadow-[0_0_8px_rgba(132,204,22,0.7)]
    dark:drop-shadow-[0_0_12px_rgba(168,85,247,0.9)]
  "
/>

          </div>
          <div>
            <h1 className="text-xl font-bold">
              <span
  className="
    font-medium
    text-transparent bg-clip-text
    bg-gradient-to-r from-green-500 via-lime-400 to-yellow-400
    drop-shadow-[0_0_10px_rgba(132,204,22,0.6)]
    dark:from-purple-400 dark:via-fuchsia-500 dark:to-indigo-400
    dark:drop-shadow-[0_0_12px_rgba(168,85,247,0.9)]
  "
>
  Cricket Prediction
</span>
{" "}
              <span>System</span>
            </h1>
            <p className="text-xs text-muted-foreground">
              AI - Cricket Match Analytics
            </p>
          </div>
        </div>

        <ThemeToggle />
      </div>
    </header>
  );
}
