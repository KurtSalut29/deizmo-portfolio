import { useEffect, useState } from "react";

/**
 * Returns the `#id` of whichever section sits in the upper part of the viewport.
 * Shared by the desktop navbar and the mobile tab bar so both highlight the same item.
 */
export function useActiveSection(hrefs: readonly string[]) {
  const [active, setActive] = useState("");
  const key = hrefs.join(",");

  useEffect(() => {
    const sections = key
      .split(",")
      .map((href) => document.querySelector<HTMLElement>(href))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-35% 0px -60% 0px" },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [key]);

  return active;
}
