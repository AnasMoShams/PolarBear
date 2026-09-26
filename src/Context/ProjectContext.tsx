"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import { supabase } from "@/utils/supabase/client";

export type Project = {
  id: string;
  name: string;
  type: "professional" | "learning";
  category: string;
  tags: string[];
  description: string;
  technologies: string[];
  coverImage: string;
  images: string[];
  githubUrl: string;
  problem?: string;
  whatIDid?: string;
  whatCameOfIt?: string;
};

type ProjectContextType = {
  projects: Project[];
  addProject: (project: Omit<Project, "id">) => Promise<void>;
  updateProject: (
    id: string,
    project: Omit<Project, "id">
  ) => Promise<void>;
  removeProject: (id: string) => Promise<void>;
  isLoading: boolean;
};

const ProjectContext = createContext<ProjectContextType | undefined>(
  undefined
);

export const ProjectProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [projectsList, setProjectsList] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  /*
   * Convert Supabase project → Project used by the UI
   */
  const mapSupabaseProject = (project: any): Project => ({
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
  });

  /*
   * Load published projects from Supabase
   */
  useEffect(() => {
    const loadProjects = async () => {
      try {
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .eq("is_published", true)
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Failed to load projects:", error);
          return;
        }

        const mappedProjects: Project[] = (data ?? []).map(
          mapSupabaseProject
        );

        setProjectsList(mappedProjects);
      } finally {
        setIsLoading(false);
      }
    };

    loadProjects();
  }, []);

  /*
   * Create a URL-friendly slug
   */
  const createSlug = (name: string) => {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const createUniqueSlug = async (name: string) => {
    const baseSlug = createSlug(name);

    let slug = baseSlug;
    let counter = 2;

    while (true) {
      const { data, error } = await supabase
        .from("projects")
        .select("slug")
        .eq("slug", slug)
        .maybeSingle();

      if (error) {
        throw error;
      }

      if (!data) {
        return slug;
      }

      slug = `${baseSlug}-${counter}`;
      counter += 1;
    }
  };

  /*
   * Add new project to Supabase
   */
  const addProject = async (
    newProjectData: Omit<Project, "id">
  ) => {
    const slug = await createUniqueSlug(newProjectData.name);

    const { data, error } = await supabase
      .from("projects")
      .insert({
        title: newProjectData.name,
        slug,

        type: newProjectData.type,
        category: newProjectData.category,
        tags: newProjectData.tags ?? [],

        description: newProjectData.description,

        problem: newProjectData.problem ?? null,
        what_i_did: newProjectData.whatIDid ?? null,
        what_came_of_it: newProjectData.whatCameOfIt ?? null,

        technologies: newProjectData.technologies ?? [],

        github_url: newProjectData.githubUrl ?? "",

        cover_image: newProjectData.coverImage ?? "",
        gallery_images: newProjectData.images ?? [],

        is_published: true,
      })
      .select()
      .single();

    if (error) {
      console.error("Failed to add project:", error);
      throw error;
    }

    const newProject = mapSupabaseProject(data);

    setProjectsList((currentProjects) => [
      newProject,
      ...currentProjects,
    ]);
  };

  /*
   * Update existing project in Supabase
   */
  const updateProject = async (
    id: string,
    updatedProjectData: Omit<Project, "id">
  ) => {
    const { data, error } = await supabase
      .from("projects")
      .update({
        title: updatedProjectData.name,
        type: updatedProjectData.type,
        category: updatedProjectData.category,
        tags: updatedProjectData.tags ?? [],
        description: updatedProjectData.description,
        problem: updatedProjectData.problem ?? null,
        what_i_did: updatedProjectData.whatIDid ?? null,
        what_came_of_it: updatedProjectData.whatCameOfIt ?? null,
        technologies: updatedProjectData.technologies ?? [],
        github_url: updatedProjectData.githubUrl ?? "",
        cover_image: updatedProjectData.coverImage ?? "",
        gallery_images: updatedProjectData.images ?? [],
      })
      .eq("slug", id)
      .select()
      .single();

    if (error) {
      console.error("Failed to update project:", error);
      throw error;
    }

    const updatedProject = mapSupabaseProject(data);

    setProjectsList((currentProjects) =>
      currentProjects.map((project) =>
        project.id === id ? updatedProject : project
      )
    );
  };

  /*
   * Delete project from Supabase
   *
   * The UI uses slug as the project id,
   * so we delete using the slug.
   */
  const removeProject = async (id: string) => {
    const { error } = await supabase
      .from("projects")
      .delete()
      .eq("slug", id);

    if (error) {
      console.error("Failed to delete project:", error);
      throw error;
    }

    setProjectsList((currentProjects) =>
      currentProjects.filter((project) => project.id !== id)
    );
  };

  return (
    <ProjectContext.Provider
      value={{
        projects: projectsList,
        addProject,
        updateProject,
        removeProject,
        isLoading,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => {
  const context = useContext(ProjectContext);

  if (!context) {
    throw new Error(
      "useProjects must be used within a ProjectProvider"
    );
  }

  return context;
};
