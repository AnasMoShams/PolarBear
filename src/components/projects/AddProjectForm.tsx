"use client";

import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useProjects } from "@/context/ProjectContext";

const categories = [
  "Data Analysis",
  "Data Science",
  "Machine Learning",
  "Software Engineering",
  "Operating Systems",
  "System Programming",
  "Other",
];

export default function AddProjectForm() {
  const router = useRouter();
  const { addProject } = useProjects();

  const [name, setName] = useState("");
  const [category, setCategory] = useState("Data Science");
  const [about, setAbout] = useState("");
  const [githubUrl, setGithubUrl] = useState("");

  const [techInput, setTechInput] = useState("");
  const [technologies, setTechnologies] = useState<string[]>([]);

  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [gallery, setGallery] = useState<string[]>([]);

  // Convert an uploaded image into a permanent Data URL.
  // This allows the image to be saved in localStorage.
  const fileToDataUrl = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result as string);
      };

      reader.onerror = () => {
        reject(new Error("Failed to read image"));
      };

      reader.readAsDataURL(file);
    });
  };

  // Add technology when pressing Enter
  const handleAddTechnology = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key !== "Enter") return;

    event.preventDefault();

    const newTechnology = techInput.trim();

    if (!newTechnology) return;

    if (technologies.includes(newTechnology)) {
      setTechInput("");
      return;
    }

    setTechnologies((current) => [
      ...current,
      newTechnology,
    ]);

    setTechInput("");
  };

  // Remove technology
  const removeTechnology = (technologyToRemove: string) => {
    setTechnologies((current) =>
      current.filter(
        (technology) => technology !== technologyToRemove,
      ),
    );
  };

  // Cover image
  const handleCoverImageChange = async (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    try {
      const imageDataUrl = await fileToDataUrl(file);

      setCoverImage(imageDataUrl);
    } catch (error) {
      console.error("Failed to load cover image:", error);

      alert("Failed to load cover image.");
    }

    event.target.value = "";
  };

  // Gallery images
  const handleGalleryChange = async (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const files = Array.from(event.target.files ?? []);

    const availableSlots = 10 - gallery.length;

    if (availableSlots <= 0) {
      event.target.value = "";
      return;
    }

    const filesToAdd = files.slice(0, availableSlots);

    try {
      const newImageUrls = await Promise.all(
        filesToAdd.map((file) => fileToDataUrl(file)),
      );

      setGallery((current) => [
        ...current,
        ...newImageUrls,
      ]);
    } catch (error) {
      console.error("Failed to load gallery images:", error);

      alert("Failed to load one or more gallery images.");
    }

    event.target.value = "";
  };

  // Remove gallery image
  const removeGalleryImage = (
    indexToRemove: number,
  ) => {
    setGallery((current) =>
      current.filter(
        (_, index) => index !== indexToRemove,
      ),
    );
  };

  // Remove cover image
  const removeCoverImage = () => {
    setCoverImage(null);
  };

  // Submit project
  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (!name.trim()) {
      alert("Please enter the project name.");
      return;
    }

    if (!coverImage) {
      alert("Please select a cover image.");
      return;
    }

    if (!about.trim()) {
      alert("Please describe your project.");
      return;
    }

    addProject({
      name: name.trim(),
      category,
      tags: [],
      description: about.trim(),
      technologies,
      coverImage,
      images: gallery,
      githubUrl: githubUrl.trim(),
    });

    alert("Project added successfully!");

    router.push("/projects");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-3xl rounded-[20px] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-xl md:p-8"
    >
      {/* Header */}
      <div className="mb-10">
        <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-[var(--color-primary)]">
          Project Management
        </p>

        <h1 className="text-3xl font-bold text-white">
          Add New Project
        </h1>

        <p className="mt-3 text-sm leading-6 text-[var(--color-text-secondary)]">
          Add the information and images that describe
          your project.
        </p>
      </div>

      {/* Project Information */}
      <section className="mb-10">
        <h2 className="mb-5 text-xl font-semibold text-white">
          Project Information
        </h2>

        {/* Project Name */}
        <div className="mb-6">
          <label
            htmlFor="project-name"
            className="mb-2 block text-sm font-medium text-gray-300"
          >
            Project Name
          </label>

          <input
            id="project-name"
            type="text"
            value={name}
            onChange={(event) =>
              setName(event.target.value)
            }
            placeholder="e.g. Windows Activity Monitor"
            className="w-full rounded-[20px] border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-3 text-white outline-none transition-colors placeholder:text-gray-600 focus:border-[var(--color-primary)]"
          />
        </div>

        {/* Category */}
        <div className="mb-6">
          <label
            htmlFor="project-category"
            className="mb-2 block text-sm font-medium text-gray-300"
          >
            Track / Category
          </label>

          <select
            id="project-category"
            value={category}
            onChange={(event) =>
              setCategory(event.target.value)
            }
            className="w-full rounded-[20px] border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-3 text-white outline-none transition-colors focus:border-[var(--color-primary)]"
          >
            {categories.map((item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            ))}
          </select>
        </div>

        {/* About */}
        <div>
          <label
            htmlFor="project-about"
            className="mb-2 block text-sm font-medium text-gray-300"
          >
            About Project
          </label>

          <textarea
            id="project-about"
            value={about}
            onChange={(event) =>
              setAbout(event.target.value)
            }
            rows={6}
            placeholder="Explain why you built the project, what it does, and what problem it solves..."
            className="w-full resize-none rounded-[20px] border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-3 text-white outline-none transition-colors placeholder:text-gray-600 focus:border-[var(--color-primary)]"
          />
        </div>
      </section>

      {/* Technologies */}
      <section className="mb-10">
        <h2 className="mb-2 text-xl font-semibold text-white">
          Technologies
        </h2>

        <p className="mb-5 text-sm text-[var(--color-text-secondary)]">
          Type a technology and press Enter to add it.
        </p>

        {/* Technology Tags */}
        {technologies.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {technologies.map((technology) => (
              <span
                key={technology}
                className="flex items-center gap-2 rounded-full border border-sky-400/20 bg-sky-400/10 px-3 py-1.5 text-sm text-sky-300"
              >
                {technology}

                <button
                  type="button"
                  onClick={() =>
                    removeTechnology(technology)
                  }
                  aria-label={`Remove ${technology}`}
                  className="text-sky-300 transition-colors hover:text-white"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}

        <input
          type="text"
          value={techInput}
          onChange={(event) =>
            setTechInput(event.target.value)
          }
          onKeyDown={handleAddTechnology}
          placeholder="e.g. Python, Pandas, Next.js..."
          className="w-full rounded-[20px] border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-3 text-white outline-none transition-colors placeholder:text-gray-600 focus:border-[var(--color-primary)]"
        />
      </section>

      {/* Images */}
      <section className="mb-10">
        <h2 className="mb-2 text-xl font-semibold text-white">
          Project Images
        </h2>

        <p className="mb-6 text-sm text-[var(--color-text-secondary)]">
          Choose a cover image and optionally add up
          to 10 gallery images.
        </p>

        {/* Cover Image */}
        <div className="mb-8">
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Cover Image{" "}
            <span className="text-[var(--color-primary)]">
              *
            </span>
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={handleCoverImageChange}
            className="block w-full cursor-pointer text-sm text-gray-400 file:mr-4 file:rounded-full file:border-0 file:bg-sky-400/10 file:px-4 file:py-2 file:text-sm file:font-medium file:text-sky-300 hover:file:bg-sky-400/20"
          />

          {coverImage && (
            <div className="relative mt-5 overflow-hidden rounded-[20px] border border-[var(--color-border)] bg-[var(--color-background)]">
              <img
                src={coverImage}
                alt="Cover preview"
                className="h-56 w-full object-cover"
              />

              <button
                type="button"
                onClick={removeCoverImage}
                className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/70 text-lg text-white transition-colors hover:bg-red-500"
                aria-label="Remove cover image"
              >
                ×
              </button>
            </div>
          )}
        </div>

        {/* Gallery */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-300">
              Gallery{" "}
              <span className="text-gray-500">
                (Optional)
              </span>
            </label>

            <span className="text-xs text-gray-500">
              {gallery.length} / 10
            </span>
          </div>

          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleGalleryChange}
            disabled={gallery.length >= 10}
            className="block w-full cursor-pointer text-sm text-gray-400 file:mr-4 file:rounded-full file:border-0 file:bg-sky-400/10 file:px-4 file:py-2 file:text-sm file:font-medium file:text-sky-300 hover:file:bg-sky-400/20 disabled:cursor-not-allowed disabled:opacity-50"
          />

          {gallery.length > 0 && (
            <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {gallery.map((image, index) => (
                <div
                  key={image}
                  className="group relative overflow-hidden rounded-[20px] border border-[var(--color-border)] bg-[var(--color-background)]"
                >
                  <img
                    src={image}
                    alt={`Gallery preview ${index + 1}`}
                    className="aspect-square w-full object-cover"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      removeGalleryImage(index)
                    }
                    className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/70 text-white transition-colors hover:bg-red-500"
                    aria-label={`Remove gallery image ${index + 1}`}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Source Code */}
      <section className="mb-10">
        <h2 className="mb-2 text-xl font-semibold text-white">
          Source Code
        </h2>

        <label
          htmlFor="github-url"
          className="mb-2 block text-sm font-medium text-gray-300"
        >
          GitHub URL
        </label>

        <input
          id="github-url"
          type="url"
          value={githubUrl}
          onChange={(event) =>
            setGithubUrl(event.target.value)
          }
          placeholder="https://github.com/AnasMoShams/..."
          className="w-full rounded-[20px] border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-3 text-white outline-none transition-colors placeholder:text-gray-600 focus:border-[var(--color-primary)]"
        />
      </section>

      {/* Actions */}
      <div className="flex flex-col-reverse gap-3 border-t border-[var(--color-border)] pt-6 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={() => router.push("/projects")}
          className="rounded-[20px] border border-[var(--color-border)] px-6 py-3 font-medium text-gray-400 transition-colors hover:border-white/20 hover:bg-white/5 hover:text-white"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="rounded-[20px] bg-[var(--color-primary)] px-6 py-3 font-medium text-[var(--color-background)] transition-all duration-300 hover:bg-[var(--color-primary-hover)] hover:shadow-[0_0_20px_rgba(135,206,235,0.2)]"
        >
          Add Project
        </button>
      </div>
    </form>
  );
}
