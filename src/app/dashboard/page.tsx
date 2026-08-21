"use client";

import { useEffect, useState } from "react";
import { createClient, User } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function DashboardPage() {
  // `any` ki jagah Supabase ka built-in `User | null` type use karein
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Current user Auth State check kar rahe hain
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-[#FAF6F0] p-8">
      <div className="mx-auto max-w-4xl rounded-2xl border border-[#D5DACD] bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-[#D5DACD]/40 pb-4">
          <h1 className="text-xl font-bold text-[#0A192F]">Dashboard</h1>
          <button
            onClick={handleLogout}
            className="rounded-xl border border-[#D5DACD] px-4 py-2 text-xs font-semibold text-[#0A192F] hover:bg-gray-50"
          >
            Log Out
          </button>
        </div>

        <div className="mt-6">
          <p className="text-sm text-[#0A192F]/70">
            Welcome back,{" "}
            <span className="font-semibold text-[#8C5A3C]">
              {user?.user_metadata?.full_name || user?.email}
            </span>
            !
          </p>
          <p className="mt-2 text-xs font-mono text-gray-500">
            Email: {user?.email}
          </p>
        </div>
      </div>
    </div>
  );
}