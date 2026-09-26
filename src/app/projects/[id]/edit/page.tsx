import { redirect } from "next/navigation";

import AddProjectForm from "@/components/projects/AddProjectForm";
import { createClient } from "@/utils/supabase/server";

type EditProjectPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditProjectPage({
  params,
}: EditProjectPageProps) {
  const { id } = await params;

  const supabase = await createClient();

  // Check authentication
  const { data: claimsData } = await supabase.auth.getClaims();

  if (!claimsData?.claims) {
    redirect(`/login?next=/projects/${id}/edit`);
  }

  // Load the project
  const { data: project, error } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", id)
    .single();

  if (error || !project) {
    redirect("/projects");
  }

  // Convert Supabase project to the Project shape
  const mappedProject = {
    id: project.slug,
    name: project.title,
    type: project.type,
    category: project.category,
    tags: project.tags ?? [],
    description: project.description ?? "",
    technologies: project.technologies ?? [],
    coverImage: project.cover_image ?? "",
    images: project.gallery_images ?? [],
    githubUrl: project.github_url ?? "",
    problem: project.problem ?? undefined,
    whatIDid: project.what_i_did ?? undefined,
    whatCameOfIt: project.what_came_of_it ?? undefined,
  };

  return (
    <main className="relative min-h-screen px-4 py-24 sm:px-6 lg:px-8">
      <div
        className="fixed inset-0 -z-20 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: "url('/images/hero.jpg')" }}
      />

      <div className="fixed inset-0 -z-10 bg-[var(--color-background)]/85" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto mb-8 max-w-3xl">
          <a
            href={`/projects/${id}`}
            className="flex items-center gap-2 text-sm font-medium text-sky-400 transition-colors hover:text-sky-300"
          >
            <span>←</span> Back to Project
          </a>
        </div>

        <AddProjectForm project={mappedProject} />
      </div>
    </main>
  );
}