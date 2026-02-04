"use client";

import { Target } from "lucide-react";
import CricketBatIcon from "./icons/CricketBatIcon";
import { cn } from "@/lib/utils";

interface Props {
  activeTab: "first-innings" | "second-innings";
  onTabChange: (tab: "first-innings" | "second-innings") => void;
}

export default function TabNavigation({ activeTab, onTabChange }: Props) {
  const tabs = [
    {
      id: "first-innings" as const,
      label: "Cricket Score Predictor",
      sub: "First Innings",
      icon: CricketBatIcon,
    },
    {
      id: "second-innings" as const,
      label: "Match Winner Predictor",
      sub: "Second Innings",
      icon: Target,
    },
  ];

  return (
    <div className="max-w-5xl mx-auto mt-6 p-2 rounded-2xl glass-card flex gap-3">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const Icon = tab.icon;

        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "relative flex-1 px-6 py-4 rounded-xl text-left transition-all duration-300",
              "border backdrop-blur-xl",

              isActive
                ? [
                    /* 🌞 LIGHT MODE — SELECTED */
                    "bg-gradient-to-r from-green-400 via-lime-400 to-yellow-400",
                    "text-black",
                    "shadow-[0_0_30px_rgba(132,204,22,0.45)]",

                    /* 🌙 DARK MODE — SELECTED (PURPLE GLOW) */
                    "dark:bg-gradient-to-r dark:from-teal-400 dark:via-indigo-500 dark:to-purple-600",
                    "dark:text-black",
                    "dark:shadow-[0_0_45px_rgba(168,85,247,0.55)]",

                    "scale-[1.02]",
                  ]
                : [
                    /* 😌 INACTIVE TAB (BOTH MODES) */
                    "bg-white/60 text-black border-black/10 shadow-md",
                    "dark:bg-white/5 dark:text-white/70 dark:border-white/10 dark:shadow-none",
                    "hover:scale-[1.01]",
                  ]
            )}
          >
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "p-2 rounded-lg transition-colors",
                  isActive
                    ? "bg-white/40 dark:bg-black/20"
                    : "bg-black/5 dark:bg-white/10"
                )}
              >
                <Icon className="w-5 h-5" />
              </div>

              <div>
                <div className="font-semibold">{tab.label}</div>
                <div className="text-sm opacity-80">{tab.sub}</div>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
