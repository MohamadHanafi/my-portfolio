import { ExternalLink } from "lucide-react";
import Link from "next/link";

type ProjectCardColor = "rose" | "blue" | "green" | "yellow" | "purple";

type ProjectCardProps = {
  title: string;
  description: string;
  href: string;
  linkLabel?: string;
  color?: ProjectCardColor;
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
  href,
  linkLabel = "View Project",
  color = "rose",
}: ProjectCardProps) {
  const isExternal = href.startsWith("http");

  const cardClasses = `block w-full cursor-pointer rounded-lg px-5 py-5 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background ${colorClasses[color]}`;

  const linkClasses =
    "inline-flex w-fit items-center gap-2 text-sm font-extrabold text-zinc-950 transition group-hover:text-primary dark:text-zinc-50";

  const linkContent = (
    <>
      {linkLabel}
      <ExternalLink size={16} strokeWidth={2} aria-hidden="true" />
    </>
  );

  const cardContent = (
    <article>
      <h2 className="text-base font-extrabold leading-snug text-zinc-950 dark:text-zinc-50">
        {title}
      </h2>
      <p className="mt-3 max-w-2xl text-xs leading-relaxed text-zinc-700 sm:text-sm dark:text-zinc-300">
        {description}
      </p>
      <div className="mt-4">
        <span className={linkClasses}>{linkContent}</span>
      </div>
    </article>
  );

  if (isExternal) {
    return (
      <a href={href} className={`group ${cardClasses}`} target="_blank" rel="noreferrer">
        {cardContent}
      </a>
    );
  }

  return (
    <Link href={href} className={`group ${cardClasses}`}>
      {cardContent}
    </Link>
  );
}
