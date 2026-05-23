import { ExternalLink, Play } from "lucide-react";
import Image from "next/image";
import Button from "@/components/ui/Button";
import type { ProjectAction } from "@/app/lib/projects";

type SelectedProjectProps = {
  title: string;
  description: string;
  imageAlt: string;
  imageSrc?: string;
  primaryAction?: ProjectAction;
  secondaryAction?: ProjectAction;
};

function getActionIcon(icon: ProjectAction["icon"]) {
  if (icon === "external") {
    return <ExternalLink size={18} />;
  }

  if (icon === "play") {
    return <Play size={18} fill="currentColor" />;
  }

  return undefined;
}

export default function SelectedProject({
  title,
  description,
  imageAlt,
  imageSrc,
  primaryAction,
  secondaryAction,
}: SelectedProjectProps) {
  return (
    <article className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-center">
      <div className="overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        {imageSrc ? (
          <div className="relative aspect-video">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              loading="eager"
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        ) : (
          <div
            className="relative aspect-video overflow-hidden bg-[#071236] p-6 text-white"
            role="img"
            aria-label={imageAlt}
          >
            <p className="text-lg font-black tracking-wide">
              TIRAM<span className="text-orange-500">AI</span>
            </p>
            <div className="mt-12 max-w-xs">
              <p className="text-3xl font-black leading-tight">
                Your Idea to Apps
              </p>
              <p className="text-3xl font-black leading-tight text-orange-500">
                No Developers
              </p>
              <p className="text-3xl font-black leading-tight">Needed</p>
              <p className="mt-4 max-w-56 text-xs leading-relaxed text-white/80">
                AI-powered app creation from prompt to product.
              </p>
            </div>
            <div className="absolute bottom-8 right-14 h-40 w-20 rounded-2xl border-4 border-zinc-950 bg-white p-2 shadow-xl">
              <div className="mx-auto h-2 w-8 rounded-full bg-zinc-950" />
              <div className="mt-6 space-y-2">
                <div className="h-2 rounded bg-zinc-200" />
                <div className="h-2 rounded bg-zinc-200" />
                <div className="h-12 rounded bg-orange-100" />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 h-20 w-full rounded-t-[50%] bg-white" />
            <div className="absolute right-24 top-16 h-20 w-20 rounded-full bg-sky-200/70" />
          </div>
        )}
      </div>

      <div>
        <h2 className="text-xl font-black leading-tight text-zinc-950 sm:text-2xl dark:text-zinc-50">
          {title}
        </h2>
        <div className="mt-5 space-y-4 text-sm leading-7 text-zinc-800 sm:text-base dark:text-zinc-200">
          {description.split("\n\n").map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        {(primaryAction || secondaryAction) && (
          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
            {primaryAction && (
              <Button
                href={primaryAction.href}
                icon={getActionIcon(primaryAction.icon)}
                iconPosition={primaryAction.iconPosition}
                target={primaryAction.openInNewTab ? "_blank" : undefined}
                className="whitespace-nowrap px-4 py-3 text-xs sm:px-6 sm:text-sm"
              >
                {primaryAction.label}
              </Button>
            )}
            {secondaryAction && (
              <Button
                href={secondaryAction.href}
                variant="outlined"
                icon={getActionIcon(secondaryAction.icon)}
                iconPosition={secondaryAction.iconPosition}
                target={secondaryAction.openInNewTab ? "_blank" : undefined}
                className="whitespace-nowrap px-4 py-3 text-xs sm:px-6 sm:text-sm"
              >
                {secondaryAction.label}
              </Button>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
