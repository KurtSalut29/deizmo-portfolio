import { ArrowLeft, Download } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { PrintButton } from "@/components/print-button";
import { profile, resume } from "@/lib/content";

export const metadata: Metadata = {
  title: "Résumé · Jhuana Deizmo",
  description:
    "ATS-friendly résumé of Jhuana Deizmo, BS Computer Science student and aspiring Front-End Developer.",
};

const sheetFont = "font-[Arial,Helvetica,sans-serif]";

// Kept deliberately plain: one column, standard headings, real text, no tables or icons,
// so applicant tracking systems can parse it.
function ResumeSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-5 break-inside-avoid-page">
      <h2 className={`${sheetFont} border-b border-black pb-1 text-[11pt] font-bold tracking-[0.06em] text-black`}>
        {title}
      </h2>
      <div className="mt-2">{children}</div>
    </section>
  );
}

export default function ResumePage() {
  return (
    <div className="min-h-dvh bg-[#e8e8e6] py-6 sm:py-10 print:bg-white print:py-0">
      <div className="mx-auto mb-6 flex max-w-[210mm] flex-wrap items-center justify-between gap-3 px-4 sm:px-0 print:hidden">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-700 hover:text-black"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          Back to portfolio
        </Link>
        <div className="flex gap-2">
          <PrintButton />
          <a
            href={profile.resumePdf}
            download
            className="inline-flex h-10 items-center gap-2 rounded-full bg-black px-4 text-sm font-semibold text-white transition-colors hover:bg-neutral-800"
          >
            <Download aria-hidden="true" className="size-4" />
            Download PDF
          </a>
        </div>
      </div>

      <article
        className={`${sheetFont} mx-auto max-w-[210mm] bg-white px-6 py-8 text-[10.5pt] leading-[1.45] text-black shadow-[0_20px_50px_-28px_rgba(0,0,0,0.45)] sm:rounded-sm sm:px-[16mm] sm:py-[14mm] print:max-w-none print:p-0 print:shadow-none`}
      >
        <header className="text-center">
          <h1 className={`${sheetFont} text-[20pt] leading-tight font-bold tracking-[0.02em] text-black`}>
            JHUANA C. DEIZMO
          </h1>
          <p className="mt-0.5 text-[11pt] font-semibold text-black">{resume.headline}</p>
          <p className="mt-1.5">
            {profile.location} | {profile.phone} | {profile.email}
          </p>
        </header>

        <ResumeSection title="PROFESSIONAL SUMMARY">
          <p>{resume.summary}</p>
        </ResumeSection>

        <ResumeSection title="EDUCATION">
          <p className="font-bold">{profile.degreeLong}</p>
          <p>{profile.school}</p>
        </ResumeSection>

        <ResumeSection title="SKILLS">
          <ul className="list-disc space-y-0.5 pl-5">
            {resume.skills.map((group) => (
              <li key={group.label}>
                <span className="font-bold">{group.label}:</span> {group.items}
              </li>
            ))}
          </ul>
        </ResumeSection>

        <ResumeSection title="PROJECTS">
          <div className="space-y-3">
            {resume.projects.map((project) => (
              <div key={project.name} className="break-inside-avoid">
                <h3 className={`${sheetFont} text-[10.5pt] font-bold text-black`}>
                  {project.name} | {project.subtitle}
                </h3>
                <ul className="mt-1 list-disc space-y-0.5 pl-5">
                  {project.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </ResumeSection>

        <ResumeSection title="CERTIFICATIONS">
          <ul className="list-disc space-y-0.5 pl-5">
            {resume.certifications.map((cert) => (
              <li key={cert.name}>
                <span className="font-bold">{cert.name}</span>, {cert.issuer}, {cert.date}
              </li>
            ))}
          </ul>
        </ResumeSection>
      </article>
    </div>
  );
}
