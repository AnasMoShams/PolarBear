import Image from "next/image";

import Container from "@/components/layout/Container";

export default function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden border-t border-[var(--color-border)] py-24"
      style={{
        backgroundImage: "url('/images/polar-bear-logo.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/75" />

      {/* Page Content */}
      <Container className="relative z-10">
        {/* Section Heading */}
        <div className="mb-16 max-w-2xl">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-[var(--color-primary)]">
            Get to know me
          </p>

          <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            About Me
          </h2>
        </div>

        {/* Main Content */}
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Academic Journey Visual */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-[20px] border border-[var(--color-border)] bg-[var(--color-surface)]/90 p-8 shadow-2xl backdrop-blur-sm sm:p-10">
              {/* Personal Image */}
              <div className="mb-8 flex justify-center">
                <div className="h-36 w-36 overflow-hidden rounded-full border-2 border-[var(--color-primary)] shadow-[0_0_40px_rgba(135,206,235,0.2)]">
                  <Image
                    src="/images/anas-contact.jpg"
                    alt="Anas Mo.Shams"
                    width={180}
                    height={180}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              {/* Academic Journey */}
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-[7px] top-2 h-[calc(100%-16px)] w-px bg-[var(--color-primary)]/30" />

                <div className="space-y-8">
                  {/* 2023 */}
                  <div className="relative flex gap-5">
                    <div className="relative z-10 mt-1 h-4 w-4 shrink-0 rounded-full border-2 border-[var(--color-primary)] bg-[var(--color-background)]" />

                    <div>
                      <p className="text-sm font-semibold text-[var(--color-primary)]">
                        2023
                      </p>

                      <h3 className="mt-1 text-lg font-semibold text-white">
                        Started University
                      </h3>

                      <p className="mt-1 text-sm leading-6 text-[var(--color-text-secondary)]">
                        Began studying at Capital University of Egypt.
                      </p>
                    </div>
                  </div>

                  {/* Academic Background */}
                  <div className="relative flex gap-5">
                    <div className="relative z-10 mt-1 h-4 w-4 shrink-0 rounded-full border-2 border-[var(--color-primary)] bg-[var(--color-background)]" />

                    <div>
                      <p className="text-sm font-semibold text-[var(--color-primary)]">
                        Academic Journey
                      </p>

                      <h3 className="mt-1 text-lg font-semibold text-white">
                        Mathematics & Computer Science
                      </h3>

                      <p className="mt-1 text-sm leading-6 text-[var(--color-text-secondary)]">
                        Explored mathematics, computer science, statistics,
                        artificial intelligence, and machine learning.
                      </p>
                    </div>
                  </div>

                  {/* Current Focus */}
                  <div className="relative flex gap-5">
                    <div className="relative z-10 mt-1 h-4 w-4 shrink-0 rounded-full border-2 border-[var(--color-primary)] bg-[var(--color-background)]" />

                    <div>
                      <p className="text-sm font-semibold text-[var(--color-primary)]">
                        Current Focus
                      </p>

                      <h3 className="mt-1 text-lg font-semibold text-white">
                        Data, ML & Deep Learning
                      </h3>

                      <p className="mt-1 text-sm leading-6 text-[var(--color-text-secondary)]">
                        Continuing to develop my Machine Learning skills while
                        learning Deep Learning.
                      </p>
                    </div>
                  </div>

                  {/* 2026 */}
                  <div className="relative flex gap-5">
                    <div className="relative z-10 mt-1 h-4 w-4 shrink-0 rounded-full border-2 border-[var(--color-primary)] bg-[var(--color-background)]" />

                    <div>
                      <p className="text-sm font-semibold text-[var(--color-primary)]">
                        2026
                      </p>

                      <h3 className="mt-1 text-lg font-semibold text-white">
                        Final Year
                      </h3>

                      <p className="mt-1 text-sm leading-6 text-[var(--color-text-secondary)]">
                        Continuing my journey toward becoming a Data Analyst
                        and Data Scientist.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* About Content */}
          <div>
            <div className="space-y-6">
              <p className="text-base leading-8 text-[var(--color-text-secondary)] sm:text-lg">
                I&apos;m Anas Mo.Shams, a 21-year-old Computer Science and
                Mathematics student from Cairo, currently in my final year at
                Capital University of Egypt. I started my university journey
                in 2023, studying both mathematics and computer science across
                a wide range of subjects.
              </p>

              <p className="text-base leading-8 text-[var(--color-text-secondary)] sm:text-lg">
                Throughout my studies, I explored areas such as linear
                algebra, calculus, real analysis, statistics, numerical
                analysis, algorithms, data structures, databases, operating
                systems, artificial intelligence, machine learning, NLP,
                computer graphics, and data science.
              </p>

              <p className="text-base leading-8 text-[var(--color-text-secondary)] sm:text-lg">
                During this journey, I discovered how much I enjoy working
                with data and machine learning. I see data as a field where I
                can keep learning, solve problems, and create things I
                genuinely enjoy. I don&apos;t consider myself an expert yet;
                I&apos;m still at the beginning of my journey and continuously
                working on improving my skills.
              </p>
            </div>

            {/* Current Focus */}
            <div className="mt-10">
              <h3 className="text-xl font-semibold text-white">
                Current Focus
              </h3>

              <p className="mt-3 leading-7 text-[var(--color-text-secondary)]">
    
                I&apos;m currently developing my skills in Machine Learning and
                learning Deep Learning. My goal is to become a Data Analyst and
                Data Scientist, building a career around something I genuinely
                enjoy. I&apos;m also gaining valuable practical experience through
                my training at{" "}
                <a
                  href="https://flyrank.ai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  FlyRank.ai
                </a>
                , where I receive great support and guidance that is helping me
                improve my skills and grow professionally.
              </p>ex
            </div>

            {/* Skills */}
            <div className="mt-10">
              <h3 className="text-xl font-semibold text-white">Skills</h3>

              <div className="mt-4 flex flex-wrap gap-3">
                {[
                  "Python",
                  "Machine Learning",
                  "Data Analysis",
                  "Databases",
                  "Deep Learning — Currently Learning",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="rounded-[20px] border border-[var(--color-border)] bg-[var(--color-surface)]/90 px-4 py-2 text-sm text-white backdrop-blur-sm transition-colors duration-300 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}