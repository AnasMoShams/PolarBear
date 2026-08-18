import Link from "next/link";

import Container from "@/components/layout/Container";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[calc(100vh-80px)] items-center overflow-hidden"
      style={{
        backgroundImage: "url('/images/hero.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/65" />

      {/* Hero Content */}
      <Container className="relative z-10">
        <div className="max-w-3xl">
          {/* Name */}
          <p className="mb-4 text-lg font-medium text-[var(--color-primary)] sm:text-xl">
            Anas Mo.Shams
          </p>

          {/* Main Title */}
          <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            Computer Science & Mathematics Student
            <span className="mt-2 block text-[var(--color-primary)]">
              Interested in AI, Machine Learning & Data Science
            </span>
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-2xl text-base leading-7 text-[var(--color-text-secondary)] sm:text-lg">
            I build ML models, analyze data, create dashboards, and work on
            problem-solving projects. I&apos;m currently learning Deep Learning
            and working on projects focused on understanding and monitoring
            computer system activity.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            {/* Projects */}
            <Link
              href="#projects"
              className="inline-flex items-center justify-center rounded-[20px] bg-[var(--color-primary)] px-6 py-3 font-medium text-black transition-all duration-300 hover:bg-[var(--color-primary-hover)]"
            >
              View My Projects
            </Link>

            {/* About */}
            <Link
              href="#about"
              className="inline-flex items-center justify-center rounded-[20px] border border-white px-6 py-3 font-medium text-white transition-all duration-300 hover:bg-white hover:text-black"
            >
              About Me
            </Link>

            {/* Contact */}
            <Link
              href="#contact"
              className="inline-flex items-center justify-center rounded-[20px] border border-white px-6 py-3 font-medium text-white transition-all duration-300 hover:bg-white hover:text-black"
            >
              Contact Me
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}