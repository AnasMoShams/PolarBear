"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import { navigation } from "@/constants/navigation";
import MobileMenu from "./MobileMenu";
import LogoutButton from "@/components/auth/LogoutButton";

export default function Navbar() {
  const { isAdmin } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-background)]/80 backdrop-blur-md">
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
                className="text-sm font-medium text-white transition-colors duration-300 hover:text-[var(--color-primary)]"
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            <Button variant="outline">Resume</Button>
          </div>

          <div className="hidden md:block">
            <LogoutButton />
          </div>

          <MobileMenu />
        </div>
      </Container>
    </header>
  );
}
