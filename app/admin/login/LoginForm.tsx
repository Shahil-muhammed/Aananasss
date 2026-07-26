"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Turnstile } from "@marsidev/react-turnstile";
import { createClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    if (!turnstileToken) {
      setLoading(false);
      setError("Please complete the CAPTCHA.");
      return;
    }

    // Verify Turnstile token first
    const verifyResponse = await fetch("/api/turnstile/verify", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        token: turnstileToken,
    }),
    });

    const verifyResult = await verifyResponse.json();

    if (!verifyResult.success) {
    setLoading(false);
    setError("CAPTCHA verification failed.");
    return;
    }

    // Only login after successful verification
    const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    router.push("/admin/dashboard");
    router.refresh();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md rounded-xl bg-white p-8 shadow-xl"
      >
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Ananas Admin Portal
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Sign in to manage your restaurant.
          </p>
        </div>

        <div className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Email
            </label>

            <input
              type="email"
              placeholder="admin@example.com"
              className="w-full rounded-lg border border-gray-300 p-3 outline-none transition focus:border-green-600"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Password
            </label>

            <input
              type="password"
              placeholder="••••••••"
              className="w-full rounded-lg border border-gray-300 p-3 outline-none transition focus:border-green-600"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex justify-center">
            <Turnstile
              siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
              onSuccess={(token) => setTurnstileToken(token)}
              onExpire={() => setTurnstileToken("")}
              onError={() => {
                setTurnstileToken("");
                setError("CAPTCHA verification failed. Please try again.");
              }}
            />
          </div>

          {error && (
            <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-green-700 py-3 font-medium text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Signing In..." : "Login"}
          </button>

          <div className="flex items-center justify-between text-sm">
            <Link
              href="/admin/forgot-password"
              className="text-green-700 hover:underline"
            >
              Forgot Password?
            </Link>

            <Link href="/" className="text-gray-500 hover:text-gray-700">
              ← Back to Website
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}