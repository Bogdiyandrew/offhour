"use client";

/**
 * SETUP (ca inainte):
 * 1. app/layout.tsx:
 *      import { Barlow_Condensed } from "next/font/google";
 *      const display = Barlow_Condensed({ subsets: ["latin", "latin-ext"], weight: ["500", "600", "700"], variable: "--font-display" });
 *      ... <body className={display.variable}> ...
 *    ("latin-ext" e necesar pentru ă, ț, ș)
 * 2. public/hero-watch.jpg = ceas-prezentare-v4.jpg
 * 3. Linkul de Instagram se schimba in lib/site.ts.
 */

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { INSTAGRAM } from "@/lib/site";

const COPY = {
  eyebrow: "Custom G-Shock · Asamblat manual",
  line1: "Bază Casio.",
  line2: "Oțel negru.",
  sub: "Un G-Shock original, îmbrăcat în carcasă și brățară de oțel cu finisaj frosted. Fiecare ceas e montat de mână, o bucată pe rând.",
};

// Doar lucruri adevarate si verificabile.
const SPECS = [
  { label: "Modul", value: "Casio GA-2100" },
  { label: "Carcasă", value: "Oțel inoxidabil" },
  { label: "Finisaj", value: "Frosted Black" },
];

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Hero() {
  const reduce = useReducedMotion();

  const fade = (delay: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay, ease: EASE },
  });

  return (
    <section className="relative isolate flex min-h-[calc(100svh-5rem)] items-end overflow-hidden bg-black">
      {/* Poza: pe desktop impinsa spre dreapta, ca titlul sa nu cada peste cadran */}
      <motion.div
        className="absolute inset-x-0 top-0 -z-10 h-[64%] lg:inset-y-0 lg:left-[26%] lg:right-[-10%] lg:h-auto"
        initial={{ scale: reduce ? 1 : 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.4, ease: EASE }}
      >
        <Image
          src="/hero-watch.jpg"
          alt="Ceas Off Hour negru, cu finisaj frosted, ținut pe o mănușă albă"
          fill
          priority
          sizes="(min-width: 1024px) 84vw, 100vw"
          className="object-cover object-[50%_36%] lg:object-[50%_42%] lg:[mask-image:linear-gradient(to_right,transparent,black_30%)]"
        />
      </motion.div>

      {/* Mobil: intunecare de jos in sus. Desktop: stanga neagra, se deschide spre ceas. */}
      <div className="absolute inset-x-0 top-0 -z-10 h-[64%] bg-[linear-gradient(to_top,#000_0%,rgba(0,0,0,0.6)_22%,rgba(0,0,0,0)_50%)] lg:hidden" />
      <div className="absolute inset-0 -z-10 hidden lg:block bg-[linear-gradient(to_right,#000_26%,rgba(0,0,0,0.8)_36%,rgba(0,0,0,0.1)_60%,rgba(0,0,0,0.3)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 -z-10 hidden h-1/3 lg:block bg-gradient-to-t from-black to-transparent" />

      <div className="mx-auto w-full max-w-7xl px-6 pb-8 pt-10 lg:px-8 lg:pb-12 lg:pt-24">
        <motion.p
          {...fade(0.2)}
          className="mb-5 hidden text-[11px] font-medium sm:block uppercase tracking-[0.35em] text-white/70"
        >
          {COPY.eyebrow}
        </motion.p>

        <h1 className="font-[family-name:var(--font-display)] text-[clamp(3.25rem,min(9.5vw,15vh),9rem)] font-bold uppercase leading-[0.9] tracking-tight text-white">
          <motion.span {...fade(0.35)} className="block whitespace-nowrap">
            {COPY.line1}
          </motion.span>
          <motion.span {...fade(0.5)} className="mt-[0.1em] block whitespace-nowrap text-white/40">
            {COPY.line2}
          </motion.span>
        </h1>

        <div className="mt-8 flex flex-col gap-7 border-t lg:mt-10 border-white/15 pt-8 lg:flex-row lg:items-end lg:justify-between">
          <motion.div {...fade(0.7)} className="max-w-lg">
            <p className="text-sm leading-relaxed text-white/70">{COPY.sub}</p>
            <div className="mt-6 grid grid-cols-1 gap-3 sm:flex sm:flex-wrap">
              <a
                href={INSTAGRAM}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex justify-center border border-white bg-white px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-black transition hover:bg-transparent hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                Comandă pe Instagram
              </a>
              <Link
                href="#colectie"
                className="hidden justify-center border border-white/40 px-8 sm:inline-flex py-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-white transition hover:border-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                Vezi ceasul
              </Link>
            </div>
          </motion.div>

          <motion.dl {...fade(0.85)} className="grid grid-cols-3 gap-6 lg:gap-10">
            {SPECS.map((s) => (
              <div key={s.label}>
                <dt className="text-[10px] uppercase tracking-[0.25em] text-white/50">
                  {s.label}
                </dt>
                <dd className="mt-1 text-xs font-medium text-white">{s.value}</dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </div>
    </section>
  );
}