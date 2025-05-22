import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white">
      <Image src="/dashboard/stone_proof_logo.svg" alt="StoneProof" width={120} height={120} className="mb-12" />
      <h2 className="text-5xl font-bold mb-4">404 Not Found</h2>
      <p className="text-xl opacity-80 mb-8">Oops! The page you're looking for seems to not exist.</p>
      <Link
        href="/"
        className="px-8 py-3 text-lg font-semibold rounded-full bg-white text-[#1C3049] hover:bg-opacity-90 transition-all duration-200"
      >
        Return Home
      </Link>
    </div>
  );
}
