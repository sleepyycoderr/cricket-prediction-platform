"use client";

import { useState } from "react";
import Header from "@/components/Header";
import TabNavigation from "@/components/TabNavigation";
import BackgroundEffects from "@/components/BackgroundEffects";
import WinnerPage from "./winner/page";
import ScorePage from "./score/page";



export default function HomePage() {
  const [activeTab, setActiveTab] = useState<
    "first-innings" | "second-innings"
  >("first-innings");

  return (
    <div className="min-h-screen bg-background">
      <BackgroundEffects />
      <Header />
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="glass-card mx-auto mt-10 max-w-4xl rounded-3xl p-10 text-center">

      {activeTab === "first-innings" ? (
  <div className="text-center text-xl font-semibold">
    <ScorePage />
  </div>
) : (
  <WinnerPage />
)}

      </main>

      <footer className="relative mt-24 flex justify-center overflow-visible">
  {/* 🌙 DARK MODE – purple glow */}
  <div className="absolute -top-6 h-32 w-[28rem] rounded-full 
                  bg-purple-500/40 blur-[90px] opacity-0 
                  dark:opacity-100 transition-opacity" />

  {/* ☀️ LIGHT MODE – green → yellow glow */}
  <div className="absolute -top-6 h-32 w-[28rem] rounded-full 
                  bg-gradient-to-r from-green-400/60 via-lime-400/60 to-yellow-400/60
                  blur-[90px] opacity-100 
                  dark:opacity-0 transition-opacity" />

  {/* Glass pill */}
  <div
    className="
      relative glass-card rounded-full px-10 py-3 text-sm
      text-black/80 dark:text-white/80
    "
  >
    • Built for Cricket Analytics by{" "}
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
  AISHWARYA SINGH
</span>

  </div>
</footer>


    </div>
  );
}
