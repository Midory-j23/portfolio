"use client";

import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

/** Fade + rise on scroll into view. */
export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "p";
}) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay, ease }}
    >
      {children}
    </Tag>
  );
}

/** Masked line-by-line headline reveal. Each entry is one line. */
export function LineReveal({
  lines,
  className,
  delay = 0,
  as: Tag = "h2",
  animateOnMount = false,
}: {
  lines: React.ReactNode[];
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3";
  animateOnMount?: boolean;
}) {
  // The trigger lives on the heading: an observer on the masked inner span
  // would never see it as visible (it is clipped by overflow-hidden).
  const trigger = animateOnMount
    ? { animate: "show" }
    : { whileInView: "show", viewport: { once: true, margin: "-60px" } };
  const MotionTag = motion[Tag];
  return (
    <MotionTag className={className} initial="hidden" variants={{ hidden: {}, show: {} }} {...trigger}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
          <motion.span
            className="block"
            variants={{
              hidden: { y: "110%" },
              show: { y: 0, transition: { duration: 1, delay: delay + i * 0.1, ease } },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
