"use client";

interface Props {
  label: string;
  value: string;
  onChange: (v: string) => void;
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
}


export default function NumberField({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  placeholder,  
}: Props) {

  return (
    <div className="space-y-2">
      <label
  className="
    block text-sm font-medium text-left

    text-emerald-600
    dark:text-purple-300
    dark:drop-shadow-[0_0_6px_rgba(168,85,247,0.8)]
  "
>
  {label}
</label>



      <input
        type="number"
        value={value === "" ? "" : Number(value)}
        onChange={(e) => onChange(e.target.value)}
        min={min}
        max={max}
        step={step}
        placeholder={placeholder}
        className="
        w-full px-4 py-2.5 rounded-xl
        bg-white/70 dark:bg-white/5
        backdrop-blur-md
        border border-white/20 dark:border-white/10

        text-sm text-black dark:text-white
        placeholder:text-black/40 dark:placeholder:text-white/40

        focus:outline-none
        focus:border-purple-400
        focus:shadow-[0_0_20px_rgba(168,85,247,0.45)]
        "

        />

    </div>
  );
}
