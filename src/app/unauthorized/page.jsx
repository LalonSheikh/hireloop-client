import React from 'react';
import Link from 'next/link';
import { ShieldAlert, ArrowLeft, Home } from 'lucide-react';

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-md w-full bg-[#121212] border border-neutral-800 rounded-3xl p-8 sm:p-10 shadow-2xl text-center relative overflow-hidden">
        
        {/* Decorative background ambient glow */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-pink-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          {/* Alert Icon */}
          <div className="mx-auto w-16 h-16 bg-pink-950/60 border border-pink-900/50 rounded-2xl flex items-center justify-center text-pink-400 mb-6 shadow-lg">
            <ShieldAlert className="w-8 h-8" />
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-950/40 border border-pink-900/50 text-pink-400 text-xs font-semibold mb-4 shadow-sm">
            Access Restricted
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-3">
            Unauthorized Access
          </h1>

          <p className="text-neutral-400 text-sm leading-relaxed mb-8">
            You do not have the necessary permissions to view this page. Please make sure you are logged in with the correct account role.
          </p>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Link
              href="/auth/signin"
              className="w-full py-3.5 px-4 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white shadow-lg shadow-pink-600/20 transition-all"
            >
              <Home className="w-4 h-4" /> Sign In
            </Link>

            <Link
              href="/jobs"
              className="w-full py-3.5 px-4 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-all border border-neutral-700/50"
            >
              <ArrowLeft className="w-4 h-4" /> Browse Jobs
            </Link>
          </div>

          {/* Security Help Footer */}
          <p className="text-xs text-neutral-500 mt-6">
            If you think this is a mistake, please contact support.
          </p>
        </div>
      </div>
    </div>
  );
}