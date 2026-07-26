"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function DashboardPage() {
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();

    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6">
      <h1 className="text-4xl font-bold">
        Hello Admin 👋
      </h1>

      <button
        onClick={handleLogout}
        className="rounded-lg bg-red-600 px-6 py-3 text-white hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
}