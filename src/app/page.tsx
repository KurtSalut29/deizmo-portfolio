import {
  ArrowDown,
  ArrowUp,
  ArrowUpRight,
  BarChart3,
  Bot,
  Building2,
  FileText,
  GraduationCap,
  Hash,
  LayoutTemplate,
  Mail,
  MapPin,
  MousePointerClick,
  Palette,
  Phone,
  Users,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { CertificateDeck } from "@/components/certificate-deck";
import { CopyButton } from "@/components/copy-button";
import { Navbar } from "@/components/navbar";
import { ProgressNav } from "@/components/progress-nav";
import { RoleSwitcher } from "@/components/role-switcher";
import { certificates, focus, navLinks, principles, profile, skills, stratfai } from "@/lib/content";

const [emailUser, emailDomain] = profile.email.split("@");

const container = "mx-auto w-full max-w-[1200px] px-5 sm:px-8 lg:px-12";

const delay = (i: number) => ({ "--i": i }) as CSSProperties;
const stagger = (ms: number) => ({ "--d": ms }) as CSSProperties;

/** The page's layout-grid columns: 4 on phones, 12 on large screens, fading at the edges. */
function Guides() {
  return (
    <div aria-hidden="true" className="guides-mask pointer-events-none absolute inset-0">
      <div className={`${container} relative grid h-full grid-cols-4 lg:grid-cols-12`}>
        {Array.from({ length: 12 }, (_, i) => (
          <span key={i} className={`guide h-full w-px ${i >= 4 ? "hidden lg:block" : ""}`} style={delay(i)} />
        ))}
        <span className="guide absolute top-0 right-5 h-full w-px sm:right-8 lg:right-12" style={delay(12)} />
      </div>
    </div>
  );
}

/** Two slow-moving blue lights. */
function Aurora({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <div className="aurora-a absolute -top-[20%] right-[-10%] size-[640px] rounded-full bg-[radial-gradient(circle,rgb(47_107_240/0.38),transparent_65%)]" />
      <div className="aurora-b absolute top-[30%] -left-[18%] size-[560px] rounded-full bg-[radial-gradient(circle,rgb(96_165_250/0.18),transparent_65%)]" />
    </div>
  );
}

function SectionLabel({ children, index }: { children: ReactNode; index: string }) {
  return (
    <p className="flex items-center gap-3 font-mono text-[13px] font-medium tracking-[0.08em] text-accent uppercase">
      <span className="text-muted">{index}</span>
      <span aria-hidden="true" className="h-px w-8 bg-[linear-gradient(90deg,var(--c-blue),transparent)]" />
      {children}
    </p>
  );
}

const h2 = "mt-5 text-[1.9rem] leading-[1.08] font-extrabold tracking-[-0.03em] sm:text-[2.7rem] lg:text-[3.25rem]";

const highlightIcons: Record<string, LucideIcon> = {
  roles: Users,
  ai: Bot,
  tracking: Hash,
  reports: BarChart3,
};

const principleIcons: Record<string, LucideIcon> = {
  simple: LayoutTemplate,
  attractive: Palette,
  easy: MousePointerClick,
};

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only z-[70] rounded-md bg-blue px-4 py-2 font-semibold text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>

      <Navbar />

      <main id="main">
        {/* ───────────── Hero ───────────── */}
        <section id="top" aria-label="Introduction" className="relative overflow-hidden">
          <Aurora />
          <Guides />

          <div
            className={`${container} relative grid items-center gap-12 pt-12 pb-20 sm:pt-16 lg:grid-cols-12 lg:gap-0 lg:pt-36 lg:pb-28`}
          >
            {/* Text */}
            <div className="text-center lg:col-span-7 lg:text-left">
              <p
                className="enter panel inline-flex items-center gap-2.5 rounded-full py-1.5 pr-4 pl-2 text-[13px] font-medium text-text"
                style={delay(0)}
              >
                <span className="relative grid size-5 place-items-center rounded-full bg-blue/20">
                  <span className="absolute size-5 animate-ping rounded-full bg-blue/30 [animation-duration:2.4s]" />
                  <span className="size-2 rounded-full bg-blue" />
                </span>
                Open to front-end developer roles
              </p>

              <h1 className="mt-7 text-[clamp(3.1rem,13.5vw,7.5rem)] leading-[0.9] font-black tracking-[-0.045em]">
                <span className="line-mask">
                  <span style={delay(0)}>{profile.firstName}</span>
                </span>
                <span className="line-mask">
                  <span style={delay(1)} className="text-gradient">
                    {profile.lastName}.
                  </span>
                </span>
              </h1>

              <p
                className="enter mx-auto mt-7 max-w-xl text-lg leading-relaxed sm:text-xl lg:mx-0"
                style={delay(1)}
              >
                <span className="font-semibold text-text">{profile.role}</span> who designs and develops websites
                that are simple, attractive, and easy to use.
              </p>

              <div
                className="enter mx-auto mt-9 grid max-w-sm grid-cols-2 gap-3 sm:flex sm:max-w-none sm:justify-center lg:justify-start"
                style={delay(2)}
              >
                <a
                  href="#project"
                  className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-blue px-3 text-[15px] font-semibold whitespace-nowrap text-white shadow-[0_14px_30px_-12px_var(--c-glow)] transition-[background-color,translate] duration-300 hover:-translate-y-0.5 hover:bg-blue-hover min-[360px]:px-5 min-[360px]:text-base sm:px-6"
                >
                  See my project
                  <ArrowDown
                    aria-hidden="true"
                    className="hidden size-4 transition-transform duration-300 ease-snap group-hover:translate-y-0.5 min-[400px]:block"
                  />
                </a>
                <Link
                  href="/resume"
                  className="panel inline-flex h-12 items-center justify-center gap-2 rounded-xl px-3 text-[15px] font-semibold whitespace-nowrap text-text transition-[translate] duration-300 hover:-translate-y-0.5 min-[360px]:px-5 min-[360px]:text-base sm:px-6"
                >
                  <FileText aria-hidden="true" className="size-4" />
                  Résumé
                </Link>
              </div>

              <ul
                className="enter mt-10 flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm lg:justify-start"
                style={delay(3)}
              >
                {[
                  { icon: GraduationCap, text: profile.degree },
                  { icon: Building2, text: profile.school },
                  { icon: MapPin, text: "Almeria, Biliran" },
                ].map(({ icon: Icon, text }) => (
                  <li key={text} className="inline-flex items-center gap-2">
                    <Icon aria-hidden="true" className="size-4 text-accent" />
                    {text}
                  </li>
                ))}
              </ul>
            </div>

            {/* Portrait */}
            <figure
              className="enter order-first mx-auto w-[min(72vw,300px)] lg:order-none lg:col-span-4 lg:col-start-9 lg:w-full"
              style={delay(1)}
            >
              <div className="relative">
                <div
                  aria-hidden="true"
                  className="absolute inset-x-8 -bottom-8 h-24 rounded-full bg-blue/45 blur-3xl"
                />
                <div className="ring-light relative rounded-[30px] p-px">
                  <div className="relative overflow-hidden rounded-[29px] bg-surface p-2.5">
                    <div className="relative aspect-[4/5] overflow-hidden rounded-[22px] bg-white">
                      <Image
                        src={profile.photo}
                        alt="Portrait of Jhuana Deizmo in a black blazer and white shirt."
                        fill
                        preload
                        quality={90}
                        sizes="(min-width: 1024px) 380px, 72vw"
                        className="object-cover object-[50%_20%]"
                      />
                      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-[linear-gradient(transparent,rgb(10_15_30/0.78))]" />
                      <figcaption className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3 text-left text-white">
                        <span>
                          <span className="block font-display text-lg leading-tight font-bold">{profile.fullName}</span>
                          <span className="block text-xs text-white/75">{profile.role}</span>
                        </span>
                        <span className="rounded-full bg-white/15 px-2.5 py-1 font-mono text-[11px] backdrop-blur">
                          BSCS
                        </span>
                      </figcaption>
                    </div>
                  </div>
                </div>
              </div>
            </figure>
          </div>
        </section>

        {/* ───────────── About ───────────── */}
        <section id="about" aria-labelledby="about-title" className="relative border-t border-line py-20 lg:py-32">
          <div className={`${container} grid gap-14 lg:grid-cols-12 lg:gap-0`}>
            <div data-reveal="" className="lg:col-span-6">
              <SectionLabel index="01">About</SectionLabel>
              <h2 id="about-title" className={h2}>
                Websites that people find <span className="text-gradient">easy to use.</span>
              </h2>
              <p className="mt-7 text-lg leading-[1.75]">{profile.careerGoal}</p>
              <div className="mt-8 flex flex-wrap gap-2">
                {principles.map((p) => (
                  <span key={p.key} className="panel rounded-full px-4 py-1.5 text-sm font-semibold text-text">
                    {p.title}
                  </span>
                ))}
              </div>
            </div>

            <ol className="relative lg:col-span-5 lg:col-start-8">
              <span
                aria-hidden="true"
                className="absolute top-6 bottom-6 left-[11px] w-px bg-[linear-gradient(180deg,var(--c-blue),var(--c-line)_70%,transparent)]"
              />
              {focus.map((item, i) => (
                <li
                  key={item.label}
                  data-reveal=""
                  style={stagger(i * 120)}
                  className="relative pb-5 pl-10 last:pb-0"
                >
                  <span
                    aria-hidden="true"
                    className={`absolute top-7 left-1 size-[15px] rounded-full border-2 border-page ${
                      i === 0 ? "bg-blue shadow-[0_0_0_4px_rgb(47_107_240/0.2)]" : "bg-line"
                    }`}
                  />
                  <div className="panel panel-hover rounded-2xl p-5 sm:p-6">
                    <p className="font-mono text-xs font-medium tracking-[0.1em] text-accent uppercase">{item.label}</p>
                    <p className="mt-2 font-display text-lg font-bold text-text sm:text-xl">{item.title}</p>
                    <p className="mt-1.5 text-[0.95rem] leading-relaxed">{item.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ───────────── Project ───────────── */}
        <section
          id="project"
          aria-labelledby="project-title"
          className="relative overflow-hidden border-t border-line py-20 lg:py-32"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgb(47_107_240/0.16),transparent_65%)]"
          />
          <div className={`${container} relative`}>
            <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-0">
              <div data-reveal="" className="lg:col-span-7">
                <SectionLabel index="02">Project</SectionLabel>
                <h2 id="project-title" className={h2}>
                  <span className="text-gradient">{stratfai.name}</span>
                </h2>
                <p className="mt-4 max-w-xl font-display text-xl font-semibold text-text sm:text-2xl">
                  {stratfai.title}
                </p>
              </div>
              <div data-reveal="" style={stagger(120)} className="flex flex-wrap gap-2 lg:col-span-5 lg:justify-end">
                {stratfai.tags.map((tag) => (
                  <span key={tag} className="panel rounded-full px-3.5 py-1.5 font-mono text-xs text-text">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div data-reveal="" style={stagger(150)} className="mt-10 grid gap-4 md:grid-cols-2 lg:mt-12">
              <div className="panel rounded-2xl p-6">
                <p className="font-mono text-xs tracking-[0.1em] text-accent uppercase">What it is</p>
                <p className="mt-3 leading-relaxed text-text/90">{stratfai.description}</p>
              </div>
              <div className="panel rounded-2xl p-6">
                <p className="font-mono text-xs tracking-[0.1em] text-accent uppercase">Purpose</p>
                <p className="mt-3 leading-relaxed text-text/90">{stratfai.purpose}</p>
              </div>
            </div>

            <ul className="mt-4 grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 lg:grid-cols-4">
              {stratfai.highlights.map((h, i) => {
                const Icon = highlightIcons[h.key];
                return (
                  <li key={h.key} data-reveal="" style={stagger(i * 90)}>
                    <div className="panel panel-hover h-full rounded-2xl p-5">
                      <span className="grid size-10 place-items-center rounded-xl bg-blue/15 text-accent">
                        <Icon aria-hidden="true" className="size-5" />
                      </span>
                      <p className="mt-4 font-display font-bold text-text">{h.title}</p>
                      <p className="mt-1 text-sm leading-relaxed">{h.text}</p>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div data-reveal="" className="mt-16 lg:mt-20">
              <p className="mb-5 font-display text-lg font-bold text-text">Explore it by user role</p>
              <RoleSwitcher views={stratfai.views} project={stratfai.name} />
            </div>
          </div>
        </section>

        {/* ───────────── Skills ───────────── */}
        <section id="skills" aria-labelledby="skills-title" className="border-t border-line py-20 lg:py-32">
          <div className={container}>
            <div data-reveal="" className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-0">
              <div className="lg:col-span-7">
                <SectionLabel index="03">Skills</SectionLabel>
                <h2 id="skills-title" className={h2}>
                  The languages I <span className="text-gradient">build with.</span>
                </h2>
              </div>
              <p className="text-lg leading-relaxed lg:col-span-4 lg:col-start-9">
                Four languages for building the web, guided by three things every page should be.
              </p>
            </div>

            <ul className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
              {skills.map((skill, i) => (
                <li key={skill.ext} data-reveal="" style={stagger(i * 90)}>
                  <div className="panel panel-hover group relative h-full overflow-hidden rounded-2xl p-5 sm:p-6">
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute -top-5 -right-2 font-display text-[6.5rem] leading-none font-black text-text/[0.05] transition-transform duration-700 ease-snap group-hover:-translate-x-2"
                    >
                      {skill.name[0]}
                    </span>
                    <p className="relative font-mono text-xl font-medium text-accent sm:text-2xl">{skill.ext}</p>
                    <h3 className="relative mt-8 text-lg font-bold sm:mt-12 sm:text-xl">{skill.name}</h3>
                    <p className="relative mt-1.5 text-sm leading-relaxed sm:text-[0.95rem]">{skill.text}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div data-reveal="" className="panel mt-4 grid overflow-hidden rounded-2xl md:grid-cols-3 lg:mt-5">
              {principles.map((p, i) => {
                const Icon = principleIcons[p.key];
                return (
                  <div
                    key={p.key}
                    className={`flex gap-4 p-6 ${i > 0 ? "border-t border-line md:border-t-0 md:border-l" : ""}`}
                  >
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-blue text-white shadow-[0_10px_24px_-10px_var(--c-glow)]">
                      <Icon aria-hidden="true" className="size-5" />
                    </span>
                    <div>
                      <p className="font-display text-lg font-bold text-text">{p.title}</p>
                      <p className="mt-1 text-sm leading-relaxed">{p.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ───────────── Certificates ───────────── */}
        <section
          id="certificates"
          aria-labelledby="certificates-title"
          className="border-t border-line py-20 lg:py-32"
        >
          <div className={container}>
            <div data-reveal="" className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-0">
              <div className="lg:col-span-7">
                <SectionLabel index="04">Certificates</SectionLabel>
                <h2 id="certificates-title" className={h2}>
                  Courses I&apos;ve <span className="text-gradient">completed.</span>
                </h2>
              </div>
              <p className="text-lg leading-relaxed lg:col-span-4 lg:col-start-9">
                {certificates.length} certificates in AI literacy and networking. Shuffle through them or open the
                original PDF.
              </p>
            </div>
            <div
              data-reveal=""
              style={stagger(120)}
              className="panel relative mt-12 overflow-hidden rounded-[28px] p-5 sm:p-8 lg:mt-14 lg:p-12"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-32 -left-20 size-[460px] rounded-full bg-[radial-gradient(circle,rgb(47_107_240/0.18),transparent_65%)]"
              />
              <div className="relative">
                <CertificateDeck items={certificates} />
              </div>
            </div>
          </div>
        </section>

        {/* ───────────── Contact ───────────── */}
        <section id="contact" aria-labelledby="contact-title" className="border-t border-line py-20 lg:py-32">
          <div className={container}>
            <div
              data-reveal=""
              className="relative overflow-hidden rounded-[32px] border border-blue/30 bg-[linear-gradient(160deg,#16255a,#0b1330_60%)] px-5 py-14 text-center sm:px-10 lg:py-20"
            >
              <Aurora className="opacity-90" />
              <div
                aria-hidden="true"
                className="guides-mask pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgb(255_255_255/0.06)_1px,transparent_1px)] bg-[length:calc(100%/6)_100%] lg:bg-[length:calc(100%/12)_100%]"
              />

              <div className="relative">
                <p className="font-mono text-[13px] font-medium tracking-[0.08em] text-[#9cc0ff] uppercase">
                  05 · Contact
                </p>
                <h2
                  id="contact-title"
                  className="mx-auto mt-5 max-w-3xl text-[1.9rem] leading-[1.08] font-extrabold tracking-[-0.03em] text-white sm:text-[2.7rem] lg:text-[3.5rem]"
                >
                  Looking for a front&#8209;end developer?
                </h2>
                <p className="mx-auto mt-5 max-w-lg text-lg leading-relaxed text-white/70">
                  I&apos;m ready to grow in a front-end role. Send me an email or give me a call.
                </p>

                <a
                  href={`mailto:${profile.email}`}
                  className="mt-10 inline-block font-display text-[clamp(1.05rem,5vw,2.1rem)] font-bold text-white [overflow-wrap:anywhere] decoration-[#7ea8ff] decoration-2 underline-offset-8 hover:underline"
                >
                  {emailUser}@<wbr />
                  {emailDomain}
                </a>

                <div className="mx-auto mt-9 grid max-w-sm gap-3 min-[420px]:grid-cols-2 sm:flex sm:max-w-none sm:justify-center">
                  <a
                    href={`mailto:${profile.email}`}
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-white px-6 font-semibold text-[#0a0f1e] transition-[translate,background-color] duration-300 hover:-translate-y-0.5 hover:bg-[#dfe8ff]"
                  >
                    <Mail aria-hidden="true" className="size-4" />
                    Send email
                  </a>
                  <CopyButton value={profile.email} label="Copy email" variant="onDark" />
                  <a
                    href={profile.phoneHref}
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/5 px-6 font-semibold text-white transition-colors hover:bg-white/10 min-[420px]:col-span-2"
                  >
                    <Phone aria-hidden="true" className="size-4" />
                    {profile.phone}
                  </a>
                </div>

                <div className="mx-auto mt-12 flex max-w-2xl flex-col items-center justify-center gap-3 border-t border-white/10 pt-8 text-sm text-white/70 sm:flex-row sm:gap-8">
                  <span className="inline-flex items-center gap-2">
                    <MapPin aria-hidden="true" className="size-4 text-[#9cc0ff]" />
                    {profile.location}
                  </span>
                  <Link href="/resume" className="group inline-flex items-center gap-1.5 font-semibold text-white">
                    View my résumé
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-line">
        <div className={`${container} pt-12 pb-[calc(env(safe-area-inset-bottom)+6.5rem)] lg:pb-10`}>
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <a href="#top" className="inline-flex items-center gap-3 self-start">
              <span className="grid size-10 place-items-center rounded-xl bg-blue font-mono text-sm font-semibold text-white">
                JD
              </span>
              <span>
                <span className="block font-display text-lg font-bold text-text">{profile.name}</span>
                <span className="block text-sm">{profile.role}</span>
              </span>
            </a>
            <nav aria-label="Footer" className="grid grid-cols-3 gap-x-6 gap-y-3 text-sm md:flex md:gap-6">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} className="transition-colors hover:text-text">
                  {link.label}
                </a>
              ))}
              <Link href="/resume" className="transition-colors hover:text-text">
                Résumé
              </Link>
            </nav>
          </div>
          <div className="mt-10 flex flex-col gap-4 border-t border-line pt-6 font-mono text-xs sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 {profile.fullName}</p>
            <a href="#top" className="group inline-flex items-center gap-2 text-text hover:text-accent">
              Back to top
              <ArrowUp
                aria-hidden="true"
                className="size-3.5 transition-transform duration-300 ease-snap group-hover:-translate-y-0.5"
              />
            </a>
          </div>
        </div>
      </footer>

      <ProgressNav />
    </>
  );
}
