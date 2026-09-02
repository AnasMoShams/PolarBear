"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import { projects as initialProjects } from "@/data/projects";

export type Project = {
  id: string;
  name: string;
  category: string;
  tags: string[];
  description: string;
  technologies: string[];
  coverImage: string;
  images: string[];
  githubUrl: string;
};

type ProjectContextType = {
  projects: Project[];
  addProject: (project: Omit<Project, "id">) => void;
  removeProject: (id: string) => void;
};

const ProjectContext = createContext<ProjectContextType | undefined>(
  undefined
);

const STORAGE_KEY = "polarbear-projects";

export const ProjectProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [projectsList, setProjectsList] =
    useState<Project[]>(initialProjects);

  const [isLoaded, setIsLoaded] = useState(false);

  /*
   * Load projects from localStorage
   */
  useEffect(() => {
    try {
      const savedProjects = localStorage.getItem(STORAGE_KEY);

      if (savedProjects) {
        const parsedProjects: Project[] = JSON.parse(savedProjects);

        if (Array.isArray(parsedProjects)) {
          setProjectsList(parsedProjects);
        }
      }
    } catch (error) {
      console.error("Failed to load projects:", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  /*
   * Save projects whenever the list changes
   */
  useEffect(() => {
    if (!isLoaded) return;

    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(projectsList)
      );
    } catch (error) {
      console.error("Failed to save projects:", error);
    }
  }, [projectsList, isLoaded]);

  /*
   * Add new project
   */
  const addProject = (
    newProjectData: Omit<Project, "id">
  ) => {
    const newProject: Project = {
      id: Date.now().toString(),
      ...newProjectData,
    };

    setProjectsList((currentProjects) => {
      const updatedProjects = [
        newProject,
        ...currentProjects,
      ];

      // Save immediately
      try {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(updatedProjects)
        );
      } catch (error) {
        console.error("Failed to save new project:", error);
      }

      return updatedProjects;
    });
  };

  /*
   * Remove project
   */
  const removeProject = (id: string) => {
    setProjectsList((currentProjects) => {
      const updatedProjects = currentProjects.filter(
        (project) => project.id !== id
      );

      // Save immediately after deletion
      try {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(updatedProjects)
        );
      } catch (error) {
        console.error("Failed to save deleted project:", error);
      }

      return updatedProjects;
    });
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