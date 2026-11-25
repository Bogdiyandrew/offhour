"use client";

/**
 * SETUP:
 * 1. app/layout.tsx: Barlow_Condensed cu subsets ["latin", "latin-ext"] si variable "--font-display".
 * 2. public/hero-watch.jpg = ceas-prezentare-v4.jpg
 * Headerul e fixed si transparent, deci hero-ul ocupa tot ecranul si trece pe sub el.
 */

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import ScrollLink from "@/components/ScrollLink";

const COPY = {
  eyebrow: "Custom G-Shock",
  line1: "Primul lucru",
  sub: "Un G-Shock original, îmbrăcat în carcasă și brățară de oțel cu finisaj frosted.",
};

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Hero() {
  const reduce = useReducedMotion();

  const fade = (delay: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay, ease: EASE },
  });

  return (
    <section className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-black">
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
      <div className="absolute inset-x-0 top-0 -z-10 h-[64%] bg-[linear-gradient(to_top,#0E1013_0%,rgba(14,16,19,0.6)_22%,rgba(14,16,19,0)_50%)] lg:hidden" />
      <div className="absolute inset-0 -z-10 hidden lg:block bg-[linear-gradient(to_right,#0E1013_26%,rgba(14,16,19,0.8)_36%,rgba(14,16,19,0.1)_60%,rgba(14,16,19,0.3)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 -z-10 hidden h-1/3 lg:block bg-gradient-to-t from-black to-transparent" />

      <div className="mx-auto w-full max-w-7xl px-6 pb-8 pt-28 lg:px-8 lg:pb-28 lg:pt-36">
        <motion.p
          {...fade(0.2)}
          className="mb-5 hidden text-[11px] font-medium uppercase tracking-[0.35em] text-white/70 sm:block"
        >
          {COPY.eyebrow}
        </motion.p>

                <h1 className="font-[family-name:var(--font-display)] text-[clamp(2.6rem,13.5vw,4.25rem)] lg:text-[clamp(2.75rem,min(7vw,11vh),6.5rem)] font-bold uppercase leading-[0.92] tracking-tight text-white">
          <motion.span {...fade(0.35)} className="block whitespace-nowrap">
            {COPY.line1}
          </motion.span>
          <motion.span {...fade(0.5)} className="mt-[0.12em] block text-white/40">
            {/* rupt in doua randuri egale, ca titlul sa nu intre peste cadran */}
            <span className="block whitespace-nowrap">pe care îl</span>
            <span className="block whitespace-nowrap">observă la tine</span>
          </motion.span>
        </h1>

        <div className="mt-8 lg:mt-10">
          <motion.div {...fade(0.7)} className="max-w-lg">
            <p className="text-base leading-relaxed text-white/75">{COPY.sub}</p>
            <ScrollLink
              to="colectie"
              className="mt-6 inline-flex w-full justify-center bg-white px-10 py-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-black transition duration-300 hover:bg-white/85 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:w-auto"
            >
              Vezi ceasul
            </ScrollLink>
          </motion.div>
        </div>
      </div>
    </section>
  );
}