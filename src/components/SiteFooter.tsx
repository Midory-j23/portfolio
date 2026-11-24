"use client";

import WildHuntFooter from "@/components/ui/wild-hunt-footer";
import { profile } from "@/data/content";
import { usePerfLite } from "@/hooks/usePerfLite";

/** The Wild Hunt footer in its original vermilion: the visual reference for the whole site. */
export function SiteFooter() {
  const lite = usePerfLite();

  return (
    <WildHuntFooter
      wordmark="MOHAMMAD"
      preset="vermilion"
      tagline="Software developer · React, TypeScript & AI products"
      sideNote={`Based in ${profile.location.replace(/[[\]]/g, "")} · open to new work`}
      legal={`© ${new Date().getFullYear()} ${profile.name}`}
      colophon="Painting: Peter Nicolai Arbo, Åsgårdsreien (The Wild Hunt of Odin), 1872, public domain via Wikimedia Commons. The blackletter is drawn in cells; nothing on this sheet is a font."
      interactive={!lite}
      grain={lite ? 0 : 0.6}
      columns={[
        {
          title: "Explore",
          links: [
            { label: "About", href: "#about" },
            { label: "Experience", href: "#experience" },
            { label: "Projects", href: "#projects" },
            { label: "Skills", href: "#skills" },
          ],
        },
        {
          title: "Work",
          links: [
            { label: "Padibot", href: "#projects" },
            { label: "Company Chatbot", href: "#projects" },
            { label: "Dashboards", href: "#projects" },
          ],
        },
        {
          title: "Elsewhere",
          links: [
            { label: "LinkedIn", href: profile.linkedin },
            { label: "GitHub", href: profile.github },
          ],
        },
        {
          title: "Contact",
          links: [{ label: "Email me", href: `mailto:${profile.email}` }],
        },
      ]}
    />
  );
}