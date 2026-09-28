import { useState } from "react";
import { supabase } from "../../config/supabase";

export default function AdminLogin({ onSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError("Incorrect email or password.");
      return;
    }
    onSuccess?.();
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-cream px-5 py-10 text-olive sm:px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-lg border border-olive/15 bg-white p-6 sm:p-8"
      >
        <p className="font-body text-[0.65rem] uppercase tracking-widest2 text-olive/55">
          The House of Maya
        </p>
        <h1 className="mt-2 font-accent text-3xl text-olive">Admin Login</h1>
        <p className="mt-2 font-body text-sm text-olive/65">
          Sign in to manage site content.
        </p>

        <label htmlFor="admin-email" className="mt-7 block font-body text-sm text-olive/70">
          Email
        </label>
        <input
          id="admin-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="username"
          required
          className="mt-1.5 w-full rounded-md border border-olive/20 bg-cream/50 px-3 py-2.5 font-body text-base text-olive outline-none transition-colors placeholder:text-olive/40 focus:border-olive"
        />

        <label htmlFor="admin-password" className="mt-4 block font-body text-sm text-olive/70">
          Password
        </label>
        <input
          id="admin-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
          className="mt-1.5 w-full rounded-md border border-olive/20 bg-cream/50 px-3 py-2.5 font-body text-base text-olive outline-none transition-colors placeholder:text-olive/40 focus:border-olive"
        />

        {error && (
          <p role="alert" className="mt-3 font-body text-sm text-red-700">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-full bg-olive px-6 py-3 font-body text-sm tracking-wide text-cream transition-colors hover:bg-olive-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </main>
  );
}