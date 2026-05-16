import ProjectCard from "@/components/ui/ProjectCard";
import SelectedProject from "@/components/ui/SelectedProject";

export default function ProjectsPage() {
  return (
    <main className="flex flex-1 justify-center px-12 py-12 sm:py-20">
      <section className="w-full max-w-6xl">
        <h1 className="text-4xl font-black text-zinc-950 dark:text-zinc-50">
          Projects
        </h1>
        <div className="mt-10">
          <SelectedProject
            title="TiramAi - From Concept to Creation"
            description="Built TiramAi, an AI-driven mobile code generation and self-healing engine. It generates full Flutter apps from user text or voice prompts and continuously evolves them. Users can report issues or suggest improvements directly from the app. TiramAi analyzes feedback, regenerates affected screens, and automatically updates the apps to Play Store and App Store."
            imageAlt="TiramAi project preview"
            primaryAction={{
              label: "View Beta Apps on Play Store",
              href: "#",
            }}
            secondaryAction={{
              label: "View TiramAI",
              href: "#",
            }}
          />
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <ProjectCard
            title="CareAlert - Wellness Monitoring App"
            description="Migrated the CareAlert mobile app to Flutter, improving scalability, stability, and maintenance efficiency."
            href="#"
            color="rose"
          />
          <ProjectCard
            title="CareAlert - Wellness Monitoring App"
            description="Migrated the CareAlert mobile app to Flutter, improving scalability, stability, and maintenance efficiency."
            href="#"
            color="blue"
          />
          <ProjectCard
            title="CareAlert - Wellness Monitoring App"
            description="Migrated the CareAlert mobile app to Flutter, improving scalability, stability, and maintenance efficiency."
            href="#"
            color="green"
          />
          <ProjectCard
            title="CareAlert - Wellness Monitoring App"
            description="Migrated the CareAlert mobile app to Flutter, improving scalability, stability, and maintenance efficiency."
            href="#"
            color="yellow"
          />
        </div>
      </section>
    </main>
  );
}
