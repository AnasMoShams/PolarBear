import "./globals.css";

import type { Metadata } from "next";

import Navbar from "@/components/layout/Navbar";
import { ProjectProvider } from "@/context/ProjectContext";

export const metadata: Metadata = {
  title: "PolarBear",
  description: "Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ProjectProvider>
          <Navbar />
          {children}
        </ProjectProvider>
      </body>
    </html>
  );
}