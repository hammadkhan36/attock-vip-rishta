"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setBusy(true);

    try {
      const supabase = createClient();

      if (mode === "register") {
        const { data, error } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        });

        if (error) {
          setMessage(error.message);
          return;
        }

        if (data.session) {
          window.location.assign("/dashboard");
          return;
        }

        setPassword("");
        setMessage(
          "Check your email for a confirmation link. If you already have an account, switch to Log in."
        );
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

        if (error) {
          setMessage(
            "Unable to log in. Check your email, password, and email confirmation."
          );
          return;
        }

        window.location.assign("/dashboard");
      }
    } catch {
      setMessage("Unable to connect. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="auth-shell">
      <section className="auth-card">
        <Link href="/" className="footer-brand">
          Attock VIP Rishta
        </Link>

        <h1>
          {mode === "login" ? "Welcome back." : "A new beginning."}
        </h1>

        <p>
          {mode === "login"
            ? "Log in to your account."
            : "Create your free account. We will ask for your mobile number after email confirmation."}
        </p>

        <form onSubmit={handleSubmit} className="auth-form">
          <label htmlFor="email">Email address</label>

          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            maxLength={254}
            disabled={busy}
          />

          <label htmlFor="password">Password</label>

          <input
            id="password"
            name="password"
            type="password"
            autoComplete={
              mode === "register" ? "new-password" : "current-password"
            }
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            minLength={mode === "register" ? 12 : undefined}
            required
            disabled={busy}
            aria-describedby={
              mode === "register" ? "password-help" : undefined
            }
          />

          {mode === "register" && (
            <small id="password-help">
              Use at least 12 characters and a unique password.
            </small>
          )}

          <button
            type="submit"
            className="button button-primary"
            disabled={busy}
          >
            {busy
              ? "Please wait..."
              : mode === "login"
                ? "Log in"
                : "Create account"}
          </button>
        </form>

        <p role="status" aria-live="polite" className="auth-message">
          {message}
        </p>

        <button
          type="button"
          className="text-button"
          disabled={busy}
          onClick={() => {
            setMode(mode === "login" ? "register" : "login");
            setMessage("");
            setPassword("");
          }}
        >
          {mode === "login"
            ? "New here? Create an account"
            : "Already registered? Log in"}
        </button>

        <p className="hero-note">
          Private testing is in progress. The service is not yet open
          to the public.
        </p>
      </section>
    </main>
  );
}