import { notFound } from "next/navigation";
import Image from "next/image";
import { projects } from "@/data/projects";

type ProjectPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProjectDetailsPage({
  params,
}: ProjectPageProps) {
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
              <h2 className="mb-6 text-2xl font-semibold text-white">
                About the Project
              </h2>

              <p className="text-base leading-relaxed text-[var(--color-text-secondary)] md:text-lg">
                {project.description}
              </p>
            </section>

            {/* Dynamic Gallery */}
            <section>
              <h2 className="mb-6 text-2xl font-semibold text-white">Gallery</h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {project.images.map((image, index) => {
                  
                  const isLastOdd = 
                    project.images.length % 2 !== 0 && index === project.images.length - 1;

                  return (
                    <div
                      key={index}
                      className={`relative aspect-video w-full overflow-hidden rounded-[12px] border border-[var(--color-border)] bg-[var(--color-surface)] transition-transform duration-300 hover:scale-[1.02] ${
                        isLastOdd ? "md:col-span-2 md:w-1/2 md:mx-auto" : ""
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${project.name} screenshot ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  );
                })}
              </div>
            </section>
            </div>

          {/* Sidebar (Right Side) */}
          <aside className="space-y-10">
            {/* Technologies */}
            <div className="rounded-[20px] border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
              <h3 className="mb-4 text-lg font-semibold text-white">
                Technologies Used
              </h3>

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
              <h3 className="mb-4 text-lg font-semibold text-white">
                Source Code
              </h3>

              <div className="flex items-center gap-3">
                <p className="text-sm text-[var(--color-text-secondary)]">
                  For source code go to:
                </p>

                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View on GitHub"
                  className="group text-[var(--color-text-secondary)] transition-colors hover:text-white"
                >
                  <svg
                    className="h-6 w-6 transition-transform duration-300 group-hover:scale-110"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.699-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
                  </svg>
                </a>
              </div>
            </div>
          </aside>
        </div>
      </article>
    </main>
  );
}
