import { projects } from "@/app/lib/projects";
import ProjectsShowcase from "@/components/ui/ProjectsShowcase";

export default function ProjectsPage() {
  return (
    <main className="flex flex-1 justify-center px-12 py-12 sm:py-20">
      <section className="w-full max-w-6xl">
        <h1 className="text-4xl font-black text-zinc-950 dark:text-zinc-50">
          Projects
        </h1>
        <ProjectsShowcase projects={projects} />
      </section>
    </main>
  );
}
