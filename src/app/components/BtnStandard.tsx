"use client";

type Props = {
  label: string;
  tailwind?: string;
  onClick?: () => void;
};

export default function BtnStandard({ label, tailwind, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className={`text-sm border-2 px-2 py-0.5 text-neutral-200 bg-stone-600
      text-center sm:text-xl sm:px-3 sm:py-1 hover:scale-105 ${tailwind}`}
    >
      {label}
    </button>
  );
}
