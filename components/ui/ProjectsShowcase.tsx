"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Project } from "@/app/lib/projects";
import ProjectCard from "@/components/ui/ProjectCard";
import SelectedProject from "@/components/ui/SelectedProject";

type ProjectsShowcaseProps = {
  projects: Project[];
};

export default function ProjectsShowcase({ projects }: ProjectsShowcaseProps) {
  const selectedProjectRef = useRef<HTMLDivElement>(null);
  const hasSelectedProject = useRef(false);
  const initialProjectSlug = projects.find((project) => project.featured)?.slug;
  const [selectedSlug, setSelectedSlug] = useState(
    initialProjectSlug ?? projects[0]?.slug
  );

  const selectedProject = useMemo(
    () => projects.find((project) => project.slug === selectedSlug),
    [projects, selectedSlug]
  );

  const otherProjects = projects.filter(
    (project) => project.slug !== selectedProject?.slug
  );

  useEffect(() => {
    if (!hasSelectedProject.current) {
      return;
    }

    selectedProjectRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [selectedSlug]);

  if (!selectedProject) {
    return null;
  }

  function selectProject(slug: string) {
    hasSelectedProject.current = true;
    setSelectedSlug(slug);
  }

  return (
    <>
      <div ref={selectedProjectRef} className="mt-10 scroll-mt-24">
        <SelectedProject
          title={selectedProject.title}
          description={selectedProject.description}
          imageAlt={selectedProject.imageAlt}
          imageSrc={selectedProject.imageSrc}
          primaryAction={selectedProject.primaryAction}
          secondaryAction={selectedProject.secondaryAction}
        />
      </div>
      {otherProjects.length > 0 && (
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {otherProjects.map((project) => (
            <ProjectCard
              key={project.slug}
              title={project.title}
              description={project.description}
              color={project.color}
              onSelect={() => selectProject(project.slug)}
            />
          ))}
        </div>
      )}
    </>
  );
}
