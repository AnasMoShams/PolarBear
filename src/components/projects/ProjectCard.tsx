"use client";

import Image from "next/image";
import Link from "next/link";

import type { Project } from "@/data/projects";
import { useProjects } from "@/context/ProjectContext";

type ProjectCardProps = {
  project: Project;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  const { removeProject } = useProjects();

  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const confirmed = window.confirm(
      `Are you sure you want to delete "${project.name}"?`
    );

    if (!confirmed) return;

    removeProject(project.id);
  };

  return (
    <Link
      href={`/projects/${project.id}`}
      className="group block h-full"
    >
      <article className="relative h-full overflow-hidden rounded-[20px] border border-[var(--color-border)] bg-[var(--color-surface)] transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:border-[var(--color-primary)] hover:shadow-[0_0_30px_rgba(135,206,235,0.12)]">

        {/* Delete Button */}
        <button
          type="button"
          onClick={handleDelete}
          aria-label={`Delete ${project.name}`}
          className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-red-400/20 bg-black/70 text-red-400 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:border-red-400/40 hover:bg-red-500 hover:text-white"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3m-9 0h14"
            />
          </svg>
        </button>

        {/* Cover Image */}
        <div className="relative aspect-video overflow-hidden bg-[var(--color-background)]">
          <Image
            src={project.coverImage}
            alt={project.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70" />

          {/* Category */}
          <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-[var(--color-background)]/80 px-3 py-1 text-xs font-medium text-[var(--color-primary)] backdrop-blur-sm">
            {project.category}
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col p-5">

          <h3 className="text-xl font-semibold text-white transition-colors duration-300 group-hover:text-[var(--color-primary)]">
            {project.name}
          </h3>

          {/* Tags */}
          {project.tags.length > 0 && (
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
          )}

          {/* Description */}
          <p className="mt-4 line-clamp-3 text-sm leading-6 text-[var(--color-text-secondary)]">
            {project.description}
          </p>

          {/* Footer */}
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