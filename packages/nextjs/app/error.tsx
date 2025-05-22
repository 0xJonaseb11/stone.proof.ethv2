"use client";

import { useEffect } from "react";
import StoneProof from "../components/landing/Header/StoneProof";
import { ShieldAlert } from "lucide-react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-900">
      <div className="w-full max-w-md p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 text-center">
        <div className="flex flex-col items-center gap-4">
          <StoneProof size="lg" />

          <div className="inline-flex items-center justify-center w-16 h-16 bg-pink-700 rounded-full">
            <ShieldAlert className="w-8 h-8 text-red-300" />
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-red-400">Something went wrong!</h2>
            <p className="text-gray-300 text-sm">
              We encountered an unexpected error. Please try again or contact support if the issue persists.
            </p>
          </div>

          <button
            onClick={() => reset()}
            className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 flex items-center gap-2"
          >
            Try again
          </button>
        </div>
      </div>
    </div>
  );
}
