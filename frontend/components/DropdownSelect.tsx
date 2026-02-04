"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, Search } from "lucide-react";

interface Props {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}

export default function LovableSelect({
  label,
  value,
  options,
  onChange,
}: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Filter options
  const filteredOptions = useMemo(() => {
    return options.filter((opt) =>
      opt.toLowerCase().includes(query.toLowerCase())
    );
  }, [options, query]);

  return (
    <div className="relative space-y-2 text-left" ref={ref}>

      <label
  className="
    block text-sm font-medium

    text-emerald-600
    dark:text-purple-300
    dark:drop-shadow-[0_0_6px_rgba(168,85,247,0.8)]
  "
>
  {label}
</label>



      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="
          w-full h-12 px-4 rounded-xl flex items-center justify-between
          bg-white/70 dark:bg-white/5
          backdrop-blur-md
          border border-white/20 dark:border-white/10
          text-left text-black dark:text-white
          transition-all duration-300
          hover:border-green-400/50
          focus:outline-none
          focus:border-green-400
          focus:shadow-[0_0_20px_rgba(34,197,94,0.45)]
        "
      >
        <span
  className={`text-sm ${
    value ? "text-black dark:text-white" : "text-black/50 dark:text-white/40"
  }`}
>

          {value || "Select"}
        </span>
        <ChevronDown
          className={`w-4 h-4 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="
            absolute z-50 mt-2 w-full
            rounded-xl
            bg-white/95 dark:bg-zinc-900/95
            backdrop-blur-xl
            border border-white/20 dark:border-white/10
            shadow-xl
          "
        >
          {/* Search box */}
          <div className="flex items-center gap-2 px-3 py-2 border-b border-white/10">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input
              autoFocus
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              className="
                w-full bg-transparent outline-none
                text-sm text-black dark:text-white
                placeholder:text-muted-foreground
              "
            />
          </div>

          {/* Options */}
          <div className="max-h-64 overflow-y-auto">
            {filteredOptions.length === 0 && (
              <div className="px-4 py-3 text-sm text-muted-foreground">
                No results found
              </div>
            )}

            {filteredOptions.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                  setQuery("");
                }}
                className="
                  w-full px-4 py-2 text-left text-sm
                  text-black dark:text-white
                  hover:bg-green-500/10
                  transition-colors
                "
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
