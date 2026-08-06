"use client";

import { useState } from "react";
import Link from "next/link";

import { navigation } from "@/constants/navigation";
import Button from "@/components/ui/Button";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="text-white text-2xl"
        aria-label="Toggle menu"
      >
        {open ? "✕" : "☰"}
      </button>

      {open && (
        <div className="absolute left-0 top-20 w-full border-t border-[var(--color-border)] bg-[var(--color-background)] p-6">
          <nav className="flex flex-col gap-6">
            {navigation.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-white hover:text-[var(--color-primary)]"
              >
                {item.label}
              </Link>
            ))}

            <Button variant="outline">
              Resume
            </Button>
          </nav>
        </div>
      )}
    </div>
  );
}