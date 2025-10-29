"use client";

import React from "react";
import Link from "next/link";

// This layout doesn't use any Wagmi hooks, it's just a simple layout component
export default function LicenseLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {/* License Portal Navigation */}
      <div className="navbar bg-base-200 sticky top-0 z-50 shadow-sm">
        <div className="navbar-start">
          <Link href="/licenses" className="btn btn-ghost normal-case text-xl">
            🪪 StoneProof Licenses
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-2">
            <li>
              <Link href="/licenses" className="btn btn-ghost btn-sm">
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/licenses/apply" className="btn btn-ghost btn-sm">
                Apply
              </Link>
            </li>
            <li>
              <Link href="/licenses/review" className="btn btn-ghost btn-sm">
                Review
              </Link>
            </li>
            <li>
              <Link href="/licenses/active" className="btn btn-ghost btn-sm">
                Active Licenses
              </Link>
            </li>
            <li>
              <Link href="/licenses/compliance" className="btn btn-ghost btn-sm">
                Compliance
              </Link>
            </li>
          </ul>
        </div>

        <div className="navbar-end">
          <Link href="/" className="btn btn-ghost btn-sm">
            ← Back to Main App
          </Link>
        </div>
      </div>

      {/* Children will be wrapped by the root layout's providers */}
      {children}
    </div>
  );
}
