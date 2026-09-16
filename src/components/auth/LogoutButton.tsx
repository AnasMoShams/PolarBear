"use client";

import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase/client";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/login");
    router.refresh();
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="text-sm font-medium text-white transition-colors hover:text-[var(--color-primary)]"
    >
      Logout
    </button>
  );
}
