import { Suspense } from "react";
import VerifyClient from "./verify-client";

export default function VerifyPage() {
  return (
    <Suspense fallback={<main className="min-h-[70vh] flex items-center justify-center p-6">Loading...</main>}>
      <VerifyClient />
    </Suspense>
  );
}

