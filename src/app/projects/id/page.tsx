import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";

type ProjectPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProjectDetailsPage({ params }: ProjectPageProps) {
  // Resolve params for Next.js 15+ compatibility
  const { id } = await params;
  const project = projects.find((p) => p.id === id);

  // If project not found, trigger 404 page
  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[var(--color-background)] px-6 py-16 md:px-10 lg:px-16">
      <article className="mx-auto max-w-5xl">
        
        {/* Header Section */}
        <header className="mb-12 text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-[var(--color-primary)]">
            {project.category}
          </p>
          <h1 className="mb-6 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            {project.name}
          </h1>
          <div className="flex flex-wrap justify-center gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-1.5 text-sm text-[var(--color-text-secondary)]"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        {/* Hero / Cover Image */}
        <div className="relative mb-16 aspect-video w-full overflow-hidden rounded-[20px] border border-[var(--color-border)] bg-[var(--color-surface)]">
          <Image
            src={project.coverImage}
            alt={`${project.name} cover`}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1200px) 100vw, 1200px"
          />
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          
          {/* Main Content (Left Side) */}
          <div className="lg:col-span-2">
            <section className="mb-16">
              <h2 className="mb-6 text-2xl font-semibold text-white">About the Project</h2>
              <p className="text-base leading-relaxed text-[var(--color-text-secondary)] md:text-lg">
                {project.description}
              </p>
            </section>

            {/* Dynamic Gallery */}
            <section>
              <h2 className="mb-6 text-2xl font-semibold text-white">Gallery</h2>
              <div className="flex flex-col gap-8">
                {project.images.map((image, index) => (
                  <div
                    key={index}
                    className="relative aspect-video w-full overflow-hidden rounded-[12px] border border-[var(--color-border)] bg-[var(--color-surface)] transition-transform duration-300 hover:scale-[1.02]"
                  >
                    <Image
                      src={image}
                      alt={`${project.name} screenshot ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1200px) 100vw, 800px"
                    />
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar (Right Side) */}
          <aside className="space-y-10">
            
            {/* Technologies */}
            <div className="rounded-[20px] border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
              <h3 className="mb-4 text-lg font-semibold text-white">Technologies Used</h3>
              <ul className="flex flex-col gap-3">
                {project.technologies.map((tech) => (
                  <li
                    key={tech}
                    className="flex items-center gap-3 text-sm text-[var(--color-text-secondary)]"
                  >
                    <span className="h-2 w-2 rounded-full bg-[var(--color-primary)]" />
                    {tech}
                  </li>
                ))}
              </ul>
            </div>

            {/* GitHub Call To Action */}
            <div className="rounded-[20px] border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
              <h3 className="mb-4 text-lg font-semibold text-white">Source Code</h3>
              <p className="mb-6 text-sm text-[var(--color-text-secondary)]">
                Check out the repository on GitHub to see the code behind this project.
              </p>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex w-full items-center justify-center gap-2 rounded-full bg-[var(--color-primary)] px-6 py-3 text-sm font-medium text-[#05080d] transition-all hover:bg-[var(--color-primary-hover)] hover:shadow-[0_0_20px_rgba(135,206,235,0.2)]"
              >
                View on GitHub
                <svg
                  className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7zM5 5h4V3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-4h-2v4H5V5z" />
                </svg>
              </a>
            </div>

            {/* Back to Projects */}
            <div className="pt-4">
              <Link
                href="/projects"
                className="group flex items-center gap-2 text-sm text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-primary)]"
              >
                <span className="transition-transform duration-300 group-hover:-translate-x-1">
                  ←
                </span>
                Back to Projects
              </Link>
            </div>
          </aside>
          
        </div>
      </article>
    </main>
  );
}