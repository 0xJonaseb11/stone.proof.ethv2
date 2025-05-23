"use client";

import { useEffect } from "react";
import StoneProof from "../components/landing/Header/StoneProof";
import { ShieldAlert } from "lucide-react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex items-center justify-center min-h-screen p-4 sm:p-6 md:p-8 bg-[#060910]">
      <div className="w-full max-w-md p-4 sm:p-6 md:p-8 bg-[#10131A] rounded-xl shadow-lg border border-[#23262F] text-center">
        <div className="flex flex-col items-center gap-3 sm:gap-4 md:gap-6">
          <StoneProof size="lg" />

          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-[#FF4747]/20 rounded-full">
            <ShieldAlert className="w-6 h-6 sm:w-8 sm:h-8 text-[#FF4747]" />
          </div>

          <div className="space-y-2 sm:space-y-3">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#FF4747]">Something went wrong!</h2>
            <p className="text-gray-400 text-xs sm:text-sm md:text-base max-w-[280px] sm:max-w-[320px] mx-auto">
              We encountered an unexpected error. Please try again or contact support if the issue persists.
            </p>
          </div>

          <button
            onClick={() => reset()}
            className="mt-2 sm:mt-4 px-4 sm:px-6 py-2 sm:py-3 bg-[#258AFF] hover:bg-[#258AFF]/90 text-white text-sm sm:text-base rounded-lg transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            Try again
          </button>
        </div>
      </div>
    </div>
  );
}
