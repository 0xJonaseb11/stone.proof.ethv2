"use client";

import StoneProof from "../components/landing/Header/StoneProof";

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-900">
      <div className="w-full max-w-md p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 text-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-pulse">
            <StoneProof size="lg" />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            </div>
            <h2 className="text-2xl font-bold text-blue-400">Loading...</h2>
            <p className="text-gray-300 text-sm">Please wait while we initialize the application</p>
          </div>
        </div>
      </div>
    </div>
  );
}
