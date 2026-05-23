"use client";

import { MousePointerClick } from "lucide-react";

type ProjectCardColor = "rose" | "blue" | "green" | "yellow" | "purple";

type ProjectCardProps = {
  title: string;
  description: string;
  color?: ProjectCardColor;
  onSelect: () => void;
};

const colorClasses: Record<ProjectCardColor, string> = {
  rose: "bg-rose-50 dark:bg-rose-950/35",
  blue: "bg-blue-50 dark:bg-blue-950/35",
  green: "bg-green-50 dark:bg-green-950/35",
  yellow: "bg-yellow-50 dark:bg-yellow-950/35",
  purple: "bg-purple-50 dark:bg-purple-950/35",
};

export default function ProjectCard({
  title,
  description,
  color = "rose",
  onSelect,
}: ProjectCardProps) {
  const descriptionWords = description.split(" ");
  const shortDescription =
    descriptionWords.slice(0, 22).join(" ") +
    (descriptionWords.length > 22 ? "..." : "");

  const cardClasses = `block w-full cursor-pointer rounded-lg px-5 py-5 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background ${colorClasses[color]}`;

  const linkClasses =
    "inline-flex w-fit items-center gap-2 text-sm font-extrabold text-zinc-950 transition group-hover:text-primary dark:text-zinc-50";

  return (
    <button
      type="button"
      className={`group ${cardClasses}`}
      onClick={onSelect}
    >
      <h2 className="text-base font-extrabold leading-snug text-zinc-950 dark:text-zinc-50">
        {title}
      </h2>
      <p className="mt-3 max-w-2xl text-xs leading-relaxed text-zinc-700 sm:text-sm dark:text-zinc-300">
        {shortDescription}
      </p>
      <div className="mt-4">
        <span className={linkClasses}>
          Select Project
          <MousePointerClick size={16} strokeWidth={2} aria-hidden="true" />
        </span>
      </div>
    </button>
  );
}
