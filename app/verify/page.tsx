"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function VerifyPage() {
  const params = useSearchParams();
  const token = params.get("token");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("Verifying your account...");
  const [error, setError] = useState("");

  useEffect(() => {
    async function verify() {
      if (!token) {
        setError("Missing verification token.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`/api/verify?token=${encodeURIComponent(token)}`);
        const data = await res.json();
        if (!res.ok) {
          setError(data?.error || "Verification failed");
        } else {
          setMessage(data?.message || "Account verified successfully");
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : "Verification failed";
        setError(message);
      } finally {
        setLoading(false);
      }
    }

    verify();
  }, [token]);

  return (
    <main className="min-h-[70vh] flex items-center justify-center p-6">
      <div className="max-w-lg w-full rounded-xl border p-6 bg-white shadow-sm">
        <h1 className="text-2xl font-bold mb-3">Email Verification</h1>
        {loading ? <p>{message}</p> : null}
        {!loading && error ? <p className="text-red-600">{error}</p> : null}
        {!loading && !error ? <p className="text-green-700">{message}</p> : null}
        <div className="mt-5">
          <Link className="text-blue-600 hover:underline" href="/auth">
            Go to login
          </Link>
        </div>
      </div>
    </main>
  );
}
