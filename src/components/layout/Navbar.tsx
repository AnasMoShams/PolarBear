import Link from "next/link";

import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import { navigation } from "@/constants/navigation";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-background)]/80 backdrop-blur-md">
      <Container className="flex h-20 items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold text-[var(--color-primary)]"
        >
          PolarBear
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {navigation.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-white transition-colors duration-300 hover:text-[var(--color-primary)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Resume Button */}
        <div className="flex items-center gap-4">

  <div className="hidden md:block">
    <Button variant="outline">
      Resume
    </Button>
  </div>

  <MobileMenu />

</div>
      </Container>
    </header>
  );
}