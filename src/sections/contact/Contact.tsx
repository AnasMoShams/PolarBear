import Image from "next/image";
import {
  siFacebook,
  siGithub,
  siGmail,
  siInstagram,
  siWhatsapp,
} from "simple-icons";

import Container from "@/components/layout/Container";

const contactLinks = [
  {
    label: "Email",
    href: "mailto:anasm.shams981@gmail.com",
    icon: siGmail.path,
  },
  {
    label: "GitHub",
    href: "https://github.com/AnasMoShams",
    icon: siGithub.path,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/anas-mohamed-shams-507711288/?skipRedirect=true",
    icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/201015486970",
    icon: siWhatsapp.path,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/anas.shams.142/",
    icon: siFacebook.path,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/anas200shams/",
    icon: siInstagram.path,
  },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-[var(--color-border)] py-24"
      style={{
        backgroundImage:
          "linear-gradient(rgba(5, 8, 13, 0.88), rgba(5, 8, 13, 0.94)), url('/images/polar-bear-logo.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <Container>
        <div className="grid items-center gap-12 md:grid-cols-2">
          {/* Contact Image */}
          <div className="relative overflow-hidden rounded-[20px] border border-[var(--color-border)]">
            <Image
              src="/images/contact_photo.jpg"
              alt="Anas"
              width={600}
              height={700}
              className="h-auto w-full object-cover"
            />
          </div>

          {/* Contact Content */}
          <div>
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-[var(--color-primary)]">
              Get In Touch
            </p>

            <h2 className="text-4xl font-bold text-white md:text-5xl">
              Let&apos;s Work Together
            </h2>

            <p className="mt-6 max-w-xl text-lg leading-8 text-[var(--color-text-secondary)]">
              Have a project, idea, or opportunity? Feel free to reach out.
            </p>

            {/* Contact Links */}
            <div className="mt-8 flex flex-wrap gap-4">
              {contactLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    link.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  aria-label={link.label}
                  title={link.label}
                  className="flex h-14 w-14 items-center justify-center rounded-[20px] border border-white/20 bg-white/5 text-white transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-black"
                >
                  <svg
                    role="img"
                    viewBox="0 0 24 24"
                    className="h-6 w-6 fill-current"
                  >
                    <path d={link.icon} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}