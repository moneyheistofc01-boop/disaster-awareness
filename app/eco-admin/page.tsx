"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LockKeyhole, Leaf, Loader2, ShieldCheck } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [loggingIn, setLoggingIn] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch("/api/admin", {
          method: "GET",
          cache: "no-store",
        });

        const data = await response.json();

        if (data.loggedIn) {
          router.replace("/admin/dashboard");
          return;
        }
      } catch {
        // Login page can still be used if session check fails.
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, [router]);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");
    setLoggingIn(true);

    try {
      const response = await fetch("/api/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "same-origin",
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data.message || "Username or password is incorrect.");
        setLoggingIn(false);
        return;
      }

      router.replace("/admin/dashboard");
    } catch {
      setError(
        "Server එක සමඟ සම්බන්ධ වීමට නොහැකි විය. නැවත උත්සාහ කරන්න."
      );
      setLoggingIn(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-white">
          <Loader2 className="animate-spin text-emerald-400" size={32} />
          <p className="text-sm text-slate-400">Checking security...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-5 py-10">
      <div className="w-full max-w-md">
        {/* Logo / Brand */}
        <div className="text-center mb-8">
          <div className="mx-auto mb-5 w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-400/20 flex items-center justify-center shadow-[0_0_50px_rgba(16,185,129,0.12)]">
            <Leaf
              size={38}
              className="text-emerald-400"
              strokeWidth={1.8}
            />
          </div>

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            සොබා සේනාංකය
          </h1>

          <p className="mt-2 text-slate-400 text-sm">
            Administration Portal
          </p>
        </div>

        {/* Login Card */}
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6 sm:p-8 shadow-2xl">
          <div className="flex items-center gap-3 mb-7">
            <div className="w-11 h-11 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
              <ShieldCheck
                size={23}
                className="text-emerald-400"
              />
            </div>

            <div>
              <h2 className="font-bold text-xl">
                Admin Login
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Authorized access only
              </p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Username */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-semibold text-slate-300 mb-2"
              >
                Username
              </label>

              <input
                id="username"
                type="email"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                placeholder="Enter username"
                autoComplete="username"
                required
                disabled={loggingIn}
                className="w-full h-13 rounded-2xl border border-white/10 bg-black/20 px-4 text-white placeholder:text-slate-600 outline-none transition focus:border-emerald-400/60 focus:ring-2 focus:ring-emerald-400/10 disabled:opacity-50"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-slate-300 mb-2"
              >
                Password
              </label>

              <div className="relative">
                <LockKeyhole
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                />

                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter password"
                  autoComplete="current-password"
                  required
                  disabled={loggingIn}
                  className="w-full h-13 rounded-2xl border border-white/10 bg-black/20 pl-11 pr-4 text-white placeholder:text-slate-600 outline-none transition focus:border-emerald-400/60 focus:ring-2 focus:ring-emerald-400/10 disabled:opacity-50"
                />
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                {error}
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={loggingIn}
              className="w-full h-13 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black transition-all active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loggingIn ? (
                <>
                  <Loader2 size={19} className="animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  <LockKeyhole size={19} />
                  Sign in
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-white/5 text-center">
            <p className="text-[11px] leading-5 text-slate-600">
              This area is restricted to authorized administrators.
            </p>
          </div>
        </div>

        {/* Back */}
        <button
          type="button"
          onClick={() => router.push("/")}
          className="block mx-auto mt-6 text-sm text-slate-500 hover:text-emerald-400 transition-colors"
        >
          ← Back to website
        </button>
      </div>
    </main>
  );
}
