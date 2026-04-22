"use client";

import { FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Images from "../utils/image";

export default function AuthPage() {
  const router = useRouter();
  const { status } = useSession();

  const [mode, setMode] = useState<"login" | "signup">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [router, status]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");
    setBusy(true);

    try {
      if (mode === "signup") {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });
        const data = await res.json();

        if (!res.ok) {
          setError(data?.error || "Signup failed");
          return;
        }

        setMessage(data?.message || "Signup successful. Please verify your email.");
        setMode("login");
        setPassword("");
        return;
      }

      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setError(result.error);
        return;
      }

      router.push("/");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong";
      setError(message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen flex">
      <div className="hidden md:flex w-1/2 relative">
        <Image src={Images.Login} alt="Auth" fill className="object-cover" />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-white p-10">
          <h1 className="text-4xl font-bold">Welcome</h1>
          <p className="mt-2 text-gray-200">Secure login and email verification</p>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center bg-black px-6 py-10">
        <div className="w-full max-w-md bg-white/90 p-8 rounded-2xl shadow-xl">
          <h2 className="text-3xl font-bold mb-2 text-center">Job Portal</h2>
          <p className="text-gray-600 mb-6 text-center">
            {mode === "login" ? "Login to your account" : "Create your account"}
          </p>

          <div className="flex gap-2 mb-4">
            <button
              type="button"
              className={`w-1/2 py-2 rounded ${
                mode === "login" ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
              onClick={() => {
                setMode("login");
                setError("");
                setMessage("");
              }}
            >
              Login
            </button>
            <button
              type="button"
              className={`w-1/2 py-2 rounded ${
                mode === "signup" ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
              onClick={() => {
                setMode("signup");
                setError("");
                setMessage("");
              }}
            >
              Sign up
            </button>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {mode === "signup" && (
              <div>
                <label className="text-sm font-medium">Name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full mt-1 px-4 py-2 border rounded-lg"
                  type="text"
                  placeholder="Enter your name"
                  required
                />
              </div>
            )}

            <div>
              <label className="text-sm font-medium">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-1 px-4 py-2 border rounded-lg"
                type="email"
                placeholder="Enter email"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium">Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-1 px-4 py-2 border rounded-lg"
                type="password"
                placeholder="Enter password"
                required
              />
            </div>

            {error ? <p className="text-sm text-red-600">{error}</p> : null}
            {message ? <p className="text-sm text-green-700">{message}</p> : null}

            <button
              type="submit"
              disabled={busy}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-60"
            >
              {busy ? "Please wait..." : mode === "login" ? "Login" : "Create account"}
            </button>
          </form>

          <div className="flex items-center gap-2 my-6">
            <div className="flex-1 h-px bg-gray-300" />
            <span className="text-sm text-gray-600">OR</span>
            <div className="flex-1 h-px bg-gray-300" />
          </div>

          <button
            className="bg-white w-full flex items-center justify-center gap-2 p-2 rounded-lg shadow-md hover:shadow-lg transition border"
            onClick={() => signIn("google")}
          >
            <Image alt="Google" src={Images.google} width={20} height={20} />
            <span className="font-medium">Continue with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
}
