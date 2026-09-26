import "./globals.css";

import type { Metadata } from "next";

import Navbar from "@/components/layout/Navbar";

import { ProjectProvider } from "@/context/ProjectContext";
import { AuthProvider } from "@/context/AuthContext";

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
        <AuthProvider>
          <ProjectProvider>
            <Navbar />
            {children}
          </ProjectProvider>
        </AuthProvider>
      </body>
    </html>
  );
}