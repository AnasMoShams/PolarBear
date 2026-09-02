"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import ProjectCard from "@/components/projects/ProjectCard";
import { useProjects } from "@/context/ProjectContext";

export default function ProjectsPage() {
  const { projects } = useProjects();

  const isAdmin = true;

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Extract categories dynamically from the current projects list
  const categories = useMemo(() => {
    const uniqueCategories = new Set(
      projects.map((project) => project.category)
    );

    return ["All", ...Array.from(uniqueCategories)];
  }, [projects]);

  // Filter projects
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory =
        selectedCategory === "All" ||
        project.category === selectedCategory;

      const searchLower = searchQuery.toLowerCase().trim();

      const matchesSearch =
        project.name.toLowerCase().includes(searchLower) ||
        project.description.toLowerCase().includes(searchLower) ||
        project.category.toLowerCase().includes(searchLower) ||
        project.technologies.some((technology) =>
          technology.toLowerCase().includes(searchLower)
        ) ||
        project.tags.some((tag) =>
          technology.toLowerCase().includes(searchLower)
        );

      return matchesCategory && matchesSearch;
    });
  }, [projects, searchQuery, selectedCategory]);

  return (
    <main className="min-h-screen bg-[var(--color-background)] px-6 py-16 md:px-10 lg:px-16">
      <section className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-12 max-w-2xl">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-[var(--color-primary)]">
            My Work
          </p>

          <h1 className="text-4xl font-bold text-white md:text-5xl">
            Projects
          </h1>

          <p className="mt-4 text-base leading-7 text-[var(--color-text-secondary)] md:text-lg">
            A collection of projects I have built while exploring data
            science, data analysis, machine learning, and other data-driven
            technologies.
          </p>
        </div>

        {/* Filters + Search + Add Project */}
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

          {/* Categories */}
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-[var(--color-primary)] text-[#05080d] shadow-[0_0_15px_rgba(135,206,235,0.3)]"
                    : "border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:border-[var(--color-primary)] hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search + Add Project */}
          <div className="flex w-full items-center gap-3 md:w-auto">

            {/* Search */}
            <div className="relative w-full md:w-72">
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-[20px] border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2.5 pl-11 text-sm text-white placeholder-[var(--color-text-secondary)] outline-none transition-colors focus:border-[var(--color-primary)]"
              />

              <svg
                className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-text-secondary)]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            {/* Add Project */}
            {isAdmin && (
              <Link
                href="/projects/add"
                className="whitespace-nowrap rounded-[20px] bg-[var(--color-primary)] px-4 py-2.5 text-sm font-medium text-[#05080d] transition-all duration-300 hover:scale-105 hover:bg-[var(--color-primary-hover)]"
              >
                + Add Project
              </Link>
            )}
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
              />
            ))}
          </div>
        ) : (
          <div className="flex h-48 w-full flex-col items-center justify-center rounded-[20px] border border-dashed border-[var(--color-border)] bg-[var(--color-surface)]">
            <p className="text-[var(--color-text-secondary)]">
              No projects found matching your criteria.
            </p>

            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="mt-4 text-sm text-[var(--color-primary)] hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}

      </section>
    </main>
  );
}
