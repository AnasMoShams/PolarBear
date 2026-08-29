import Image from "next/image";
import Link from "next/link";

import type { Project } from "@/data/projects";

type ProjectCardProps = {
  project: Project;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.id}`}
      className="group block h-full"
    >
      <article className="h-full overflow-hidden rounded-[20px] border border-[var(--color-border)] bg-[var(--color-surface)] transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:border-[var(--color-primary)] hover:shadow-[0_0_30px_rgba(135,206,235,0.12)]">
        <div className="relative aspect-video overflow-hidden bg-[var(--color-background)]">
          <Image
            src={project.coverImage}
            alt={project.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70" />

          <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-[var(--color-background)]/80 px-3 py-1 text-xs font-medium text-[var(--color-primary)] backdrop-blur-sm">
            {project.category}
          </div>
        </div>

        <div className="flex flex-col p-5">
          <h3 className="text-xl font-semibold text-white transition-colors duration-300 group-hover:text-[var(--color-primary)]">
            {project.name}
          </h3>

          <div className="mt-3 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[var(--color-border)] px-3 py-1 text-xs text-[var(--color-text-secondary)]"
              >
                {tag}
              </span>
            ))}
          </div>

          <p className="mt-4 line-clamp-3 text-sm leading-6 text-[var(--color-text-secondary)]">
            {project.description}
          </p>

          <div className="mt-6 flex items-center justify-between border-t border-[var(--color-border)] pt-4">
            <span className="text-sm font-medium text-white transition-colors duration-300 group-hover:text-[var(--color-primary)]">
              View Project
            </span>

            <span
              aria-hidden="true"
              className="text-lg text-[var(--color-primary)] transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}