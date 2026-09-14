import { supabase } from "./client";

export async function uploadProjectImage(
  file: File,
  projectSlug: string,
  fileName: string
) {
  const filePath = `${projectSlug}/${fileName}`;

  const { error } = await supabase.storage
    .from("project-images")
    .upload(filePath, file, {
      upsert: true,
    });

  if (error) {
    throw error;
  }

  const {
    data: { publicUrl },
  } = supabase.storage
    .from("project-images")
    .getPublicUrl(filePath);

  return publicUrl;
}