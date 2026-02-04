"use client";

import { ChevronDown } from "lucide-react";

interface Props {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}

export default function SelectField({
  label,
  value,
  onChange,
  options,
}: Props) {
  return (
    <div className="space-y-2">
      <label className="text-sm text-muted-foreground">{label}</label>

      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="
            w-full px-4 py-2.5 rounded-xl
            flex items-center justify-between

            bg-white/70 dark:bg-white/5
            backdrop-blur-md
            border border-white/20 dark:border-white/10

            text-sm text-black dark:text-white

            transition-all duration-300
            hover:border-green-400/50
            focus:outline-none
            focus:border-green-400
            focus:shadow-[0_0_20px_rgba(34,197,94,0.45)]
          "

        >
        <option
  value=""
  className="bg-white text-black dark:bg-zinc-900 dark:text-white"
>
  Select
</option>

{options.map((o) => (
  <option
    key={o}
    value={o}
    className="bg-white text-black dark:bg-zinc-900 dark:text-white"
  >
    {o}
  </option>
))}

          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>

        <ChevronDown
          className="
            absolute right-3 top-1/2 -translate-y-1/2
            w-4 h-4 pointer-events-none
            text-black/60 dark:text-white/60
          "
        />
      </div>
    </div>
  );
}
