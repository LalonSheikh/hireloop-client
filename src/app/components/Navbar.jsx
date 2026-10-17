"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button, Link as HeroLink } from "@heroui/react";
import { Menu, X, Briefcase } from "lucide-react";
import { signOut, useSession } from "@/lib/auth-client";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session, isPending } = useSession();
  const pathname = usePathname();
  const user = session?.user;

  const handleSignOut = async () => {
    await signOut();
  };

  // বেস নেভ লিংকস
  const baseLinks = [
    { label: "Browse Jobs", href: "/jobs" },
    { label: "Companies", href: "/companies" },
    { label: "Pricing", href: "/plans" },
  ];

  const dashboardLinkMap = {
    seeker: "/dashboard/seeker",
    recruiter: "/dashboard/recruiter",
    admin: "/dashboard/admin",
  };

  // ডায়নামিকালি লিংক তৈরি করা যাতে প্রতি রেন্ডারে ডুপ্লিকেট না হয়
  const NAV_LINKS = [...baseLinks];
  if (user?.email) {
    NAV_LINKS.push({
      label: "Dashboard",
      href: dashboardLinkMap[user?.role || "seeker"],
    });
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0a0a0c]/90 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo — left aligned */}
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-600">
            <Briefcase className="h-4.5 w-4.5 text-white" strokeWidth={2.25} />
          </span>
          <span className="text-sm font-semibold leading-tight text-white">
            Hire<span className="text-violet-500">Loop</span>
          </span>
        </Link>

        {/* Everything else — right aligned as one group */}
        <div className="hidden items-center gap-6 md:flex">
          <ul className="flex items-center gap-8">
            {NAV_LINKS.map((link, index) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href || index}>
                  <HeroLink
                    asChild
                    underline="hover"
                    className={
                      isActive
                        ? "text-sm font-medium text-white"
                        : "text-sm font-medium text-white/70 transition-colors hover:text-white"
                    }
                  >
                    <Link
                      href={link.href}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {link.label}
                    </Link>
                  </HeroLink>
                </li>
              );
            })}
          </ul>

          {/* Vertical divider before Sign In */}
          <span className="h-5 w-px bg-white/15" aria-hidden="true" />

          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-white/80">
                  Hi, {user.name}
                </span>
                <Button onClick={handleSignOut} variant="ghost" size="sm" className="text-white/70 hover:text-white">
                  Sign Out
                </Button>
              </div>
            ) : (
              <HeroLink asChild underline="hover" className="text-sm font-medium text-white/70 hover:text-white">
                <Link href="/auth/signin">Sign In</Link>
              </HeroLink>
            )}

            {!user && (
              <Button
                asChild
                variant="primary"
                size="sm"
                className="rounded-full bg-white px-5 text-[#0a0a0c] hover:bg-white/90"
              >
                <Link href="/auth/signup">Get Started</Link>
              </Button>
            )}
          </div>
        </div>

        {/* Mobile toggle */}
        <button
          className="inline-flex items-center justify-center rounded-md p-2 text-white/80 md:hidden"
          onClick={() => setIsMenuOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="border-t border-white/10 md:hidden">
          <ul className="flex flex-col gap-1 px-4 py-4">
            {NAV_LINKS.map((link, index) => (
              <li key={link.href || index}>
                <Link
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block rounded-md px-2 py-2.5 text-sm font-medium text-white/80 hover:bg-white/5 hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="mt-3 flex flex-col gap-2 border-t border-white/10 pt-3">
              {user ? (
                <Button
                  onClick={() => {
                    handleSignOut();
                    setIsMenuOpen(false);
                  }}
                  variant="ghost"
                  className="w-full justify-start rounded-md px-2 py-2.5 text-sm font-medium text-red-400 hover:bg-white/5"
                >
                  Sign Out
                </Button>
              ) : (
                <>
                  <Link
                    href="/auth/signin"
                    onClick={() => setIsMenuOpen(false)}
                    className="block rounded-md px-2 py-2.5 text-sm font-medium text-white/80 hover:bg-white/5 hover:text-white"
                  >
                    Sign In
                  </Link>
                  <Button
                    asChild
                    variant="primary"
                    className="w-full rounded-full bg-white text-[#0a0a0c] hover:bg-white/90"
                  >
                    <Link href="/auth/signup" onClick={() => setIsMenuOpen(false)}>
                      Get Started
                    </Link>
                  </Button>
                </>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}