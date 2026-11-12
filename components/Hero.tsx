"use client";

/**
 * SETUP (o singura data):
 * 1. In app/layout.tsx incarci fontul si il expui ca variabila:
 *      import { Barlow_Condensed } from "next/font/google";
 *      const display = Barlow_Condensed({ subsets: ["latin"], weight: ["600", "700"], variable: "--font-display" });
 *      ... <body className={display.variable}> ...
 * 2. Pui poza in public/hero-watch.jpg (vezi nota de la sfarsit despre poza).
 * 3. Textele de mai jos sunt placeholder. Fiecare afirmatie trebuie sa fie adevarata
 *    pentru ceasul tau real (material, modul, garantie).
 */

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

const COPY = {
  eyebrow: "Custom G-Shock · Serie numerotată",
  line1: "Nu l-ai",
  line2: "văzut deja.",
  sub: "Fiecare ceas e asamblat manual, o bucată pe rând.",
  cta: "Vezi ceasurile",
  ctaHref: "#colectie",
};

// Verifica fiecare valoare. Nu scrie "316L" sau "garantie" daca nu poti dovedi / onora.
const SPECS = [
  { label: "Carcasă", value: "Oțel inoxidabil" },
  { label: "Modul", value: "Casio original" },
  { label: "Garanție", value: "12 luni pe manoperă" },
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
    <section className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-black">
      {/* Fundal: poza fullscreen cu zoom lent la intrare */}
      <motion.div
        className="absolute inset-0 -z-10"
        initial={{ scale: reduce ? 1 : 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.4, ease: EASE }}
      >
        <Image
          src="/hero-watch.jpg"
          alt="Ceas G-Shock custom pe mână"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      {/* Intunecare ca textul sa se citeasca peste orice poza */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black via-black/55 to-black/10" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.6)_100%)]" />

      <div className="mx-auto w-full max-w-7xl px-6 pb-12 pt-40 lg:px-8 lg:pb-16">
        <motion.p
          {...fade(0.2)}
          className="mb-5 text-[11px] font-medium uppercase tracking-[0.35em] text-white/70"
        >
          {COPY.eyebrow}
        </motion.p>

        <h1 className="font-[family-name:var(--font-display)] text-[clamp(3.5rem,13vw,11rem)] font-bold uppercase leading-[0.88] tracking-tight text-white">
          <motion.span {...fade(0.35)} className="block">
            {COPY.line1}
          </motion.span>
          <motion.span {...fade(0.5)} className="block text-white/40">
            {COPY.line2}
          </motion.span>
        </h1>

        <div className="mt-10 flex flex-col gap-8 border-t border-white/15 pt-8 lg:flex-row lg:items-end lg:justify-between">
          <motion.div {...fade(0.7)} className="max-w-sm">
            <p className="text-sm leading-relaxed text-white/70">{COPY.sub}</p>
            <Link
              href={COPY.ctaHref}
              className="mt-6 inline-flex border border-white px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-white hover:text-black"
            >
              {COPY.cta}
            </Link>
          </motion.div>

          <motion.dl {...fade(0.85)} className="grid grid-cols-3 gap-8">
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

/**
 * NOTA DESPRE POZA: hero-ul asta traieste sau moare din poza.
 * Ce functioneaza: ceasul pe mana, in lumina dura laterala, fundal negru sau
 * interior de masina, ceasul ocupand jumatatea dreapta (textul sta stanga-jos).
 * Ce NU functioneaza: ceas pe fundal alb, poza de produs decupata, poza luminoasa.
 */