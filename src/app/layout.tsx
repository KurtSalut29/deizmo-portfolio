import type { Metadata, Viewport } from "next";
import { Red_Hat_Display, Red_Hat_Mono, Red_Hat_Text } from "next/font/google";
import { RevealObserver } from "@/components/reveal-observer";
import "./globals.css";

const display = Red_Hat_Display({
  variable: "--font-rh-display",
  subsets: ["latin"],
});

const text = Red_Hat_Text({
  variable: "--font-rh-text",
  subsets: ["latin"],
});

const mono = Red_Hat_Mono({
  variable: "--font-rh-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Jhuana Deizmo · Front-End Developer",
  description:
    "Portfolio of Jhuana Deizmo, a BS Computer Science student at Biliran Province State University who designs and develops websites that are simple, attractive, and easy to use.",
  authors: [{ name: "Jhuana C. Deizmo" }],
  openGraph: {
    title: "Jhuana Deizmo · Front-End Developer",
    description: "Project, skills, and certificates of Jhuana Deizmo, aspiring front-end developer.",
    type: "website",
  },
};

export const viewport: Viewport = {
  // Lets the progress bar sit above the iPhone home indicator via env(safe-area-inset-bottom).
  viewportFit: "cover",
  themeColor: "#0a0f1e",
};

// Runs before first paint. Her design is dark-first, so dark is the default until the
// visitor picks light. Also marks JS as available so scroll reveals may start hidden.
const themeScript = `(function(){try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark"){t="dark"}document.documentElement.setAttribute("data-theme",t)}catch(e){}document.documentElement.classList.add("js")})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="dark"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${display.variable} ${text.variable} ${mono.variable} antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-dvh">
        {children}
        <RevealObserver />
      </body>
    </html>
  );
}
