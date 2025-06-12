import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 bg-[#060910]">
      <div className="w-full max-w-md p-4 sm:p-6 md:p-8 bg-[#10131A] rounded-xl shadow-lg border border-[#23262F] text-center">
        <div className="flex flex-col items-center gap-3 sm:gap-4 md:gap-6">
          <Image
            src="/dashboard/stone_proof_logo.svg"
            alt="StoneProof"
            width={80}
            height={80}
            className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24"
          />

          <div className="space-y-2 sm:space-y-3">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#FF4747]">404 Not Found</h2>
            <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-[280px] sm:max-w-[320px] mx-auto">
              Oops! The page you're looking for seems to not exist.
            </p>
          </div>

          <Link
            href="/"
            className="mt-2 sm:mt-4 px-4 sm:px-6 py-2 sm:py-3 bg-[#258AFF] hover:bg-[#258AFF]/90 text-white text-sm sm:text-base rounded-lg transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
