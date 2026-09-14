"use client";

import { useState } from "react";
import { uploadProjectImage } from "@/utils/supabase/storage";
import { supabase } from "@/utils/supabase/client";

export default function StorageTestPage() {
  const [status, setStatus] = useState("");

  const handleUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    console.log("Current user:", user);
    console.log("User error:", userError);

    try {
      setStatus("Uploading...");

      const publicUrl = await uploadProjectImage(
        file,
        "storage-test",
        file.name
      );
      const { data: buckets, error: bucketsError } =
  await supabase.storage.listBuckets();

console.log("Buckets:", buckets);
console.log("Buckets error:", bucketsError);

      console.log("Uploaded image URL:", publicUrl);
      setStatus("Upload successful!");
    } catch (error) {
      console.error("Upload failed:", error);
      setStatus("Upload failed. Check the console.");
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6">
      <h1 className="text-2xl font-semibold">
        Supabase Storage Test
      </h1>

      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
      />

      {status && <p>{status}</p>}
    </main>
  );
}