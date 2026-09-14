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
  addProject: (project: Omit<Project, "id">) => void;
  removeProject: (id: string) => void;
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
  const [isLoaded, setIsLoaded] = useState(false);

  /*
   * Load projects from Supabase
   */
  useEffect(() => {
    const loadProjects = async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("is_published", true)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Failed to load projects:", error);
        setIsLoaded(true);
        return;
      }

      const mappedProjects: Project[] = (data ?? []).map((project) => ({
        id: project.slug,
        name: project.title,
        type: project.type,
        category: project.category,
        tags: project.tags ?? [],
        description: project.description,
        technologies: project.technologies ?? [],
        coverImage: project.cover_image ?? "",
        images: project.gallery_images ?? [],
        githubUrl: project.github_url ?? "",
        problem: project.problem ?? undefined,
        whatIDid: project.what_i_did ?? undefined,
        whatCameOfIt: project.what_came_of_it ?? undefined,
      }));

      setProjectsList(mappedProjects);
      setIsLoaded(true);
    };

    loadProjects();
  }, []);

  /*
   * Add new project
   * Temporary: still local until we connect it to Supabase.
   */
  const addProject = (
    newProjectData: Omit<Project, "id">
  ) => {
    const newProject: Project = {
      id: Date.now().toString(),
      ...newProjectData,
    };

    setProjectsList((currentProjects) => [
      newProject,
      ...currentProjects,
    ]);
  };

  /*
   * Remove project
   * Temporary: still local until we connect it to Supabase.
   */
  const removeProject = (id: string) => {
    setProjectsList((currentProjects) =>
      currentProjects.filter((project) => project.id !== id)
    );
  };

  return (
    <ProjectContext.Provider
      value={{
        projects: projectsList,
        addProject,
        removeProject,
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