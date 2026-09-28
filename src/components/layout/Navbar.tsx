"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useAuth } from "@/context/AuthContext";

import Container from "@/components/layout/Container";

import { navigation } from "@/constants/navigation";

import MobileMenu from "./MobileMenu";

import LogoutButton from "@/components/auth/LogoutButton";

export default function Navbar() {
  const pathname = usePathname();
  const { isAdmin } = useAuth();

  return (
    <header className="absolute top-0 left-0 z-50 w-full bg-transparent">
      <Container className="flex h-20 items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-bold text-[var(--color-primary)]"
        >
          PolarBear
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navigation.map((item) => {
            if (item.href === "/projects/add" && !isAdmin) {
              return null;
            }

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`relative text-sm font-medium transition-colors duration-300 ${
                  pathname === item.href
                    ? "text-sky-400 after:absolute after:-bottom-2 after:left-0 after:h-0.5 after:w-full after:rounded-full after:bg-sky-400"
                    : "text-white hover:text-sky-400"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            <LogoutButton />
          </div>

          <MobileMenu />
        </div>
      </Container>
    </header>
  );
}
