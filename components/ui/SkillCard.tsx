import type { ReactNode } from "react";

type SkillCardProps = {
  icon: ReactNode;
  label: string;
};

export default function SkillCard({ icon, label }: SkillCardProps) {
  return (
    <div className="flex h-24 w-36 flex-col items-center justify-center gap-2 rounded-2xl bg-zinc-100 text-center shadow-sm transition hover:-translate-y-1 hover:bg-white hover:shadow-md dark:bg-zinc-900 dark:hover:bg-zinc-800">
      <div className="flex h-8 w-8 items-center justify-center">{icon}</div>
      <p className="text-xs font-medium text-zinc-900 dark:text-zinc-100">
        {label}
      </p>
    </div>
  );
}
