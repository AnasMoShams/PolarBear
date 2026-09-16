import { redirect } from "next/navigation";
import AddProjectForm from "@/components/projects/AddProjectForm";
import { createClient } from "@/utils/supabase/server";

export default async function AddProjectPage() {
  const supabase = await createClient();
  const { data: claimsData } = await supabase.auth.getClaims();

  if (!claimsData?.claims) {
    redirect("/login?next=/projects/add");
  }

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
            href="/projects"
            className="flex items-center gap-2 text-sm font-medium text-sky-400 transition-colors hover:text-sky-300"
          >
            <span>&larr;</span> Back to Projects
          </a>
        </div>

        <AddProjectForm />
      </div>
    </main>
  );
}
