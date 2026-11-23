"use client";

/**
- Sectiunea de produs (#colectie).
- Pozele: public/nightfall/01-cadran.jpg ... 05-capac-spate.jpg (toate 4:5).
- Tot ce e marcat TODO trebuie verificat de tine inainte sa fie pus live.
 */

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { INSTAGRAM } from "@/lib/site";


const PRODUCT = {
  name: "Nightfall Edition",
  price: "1.299 lei",
  stock: "O singură bucată disponibilă", // TODO: actualizeaza cand se vinde
  intro:
    "Complet negru: carcasă, brățară și cadran. Oțelul e sablat fin, așa că nu face reflexii. De la distanță pare mat și discret, iar de aproape vezi granulația pe fiecare za.",
};

const PHOTOS = [
  { src: "/nightfall/02-pe-mana.jpg", alt: "Nightfall Edition purtat la mână, în mașină" },
  { src: "/nightfall/03-bratara.jpg", alt: "Brățara din oțel frosted și închizătoarea ascunsă" },
  { src: "/nightfall/04-set-complet.jpg", alt: "Ceasul în cutia originală Casio, cu cardurile de garanție și manualul" },
  { src: "/nightfall/05-capac-spate.jpg", alt: "Capacul din spate original Casio GA-2100, cu gravura modulului 5611" },
];

const SPECS = [
  { label: "Modul", value: "Casio G-Shock GA-2100 original (5611)" },
  { label: "Carcasă și brățară", value: "Oțel inoxidabil, finisaj frosted negru" },
  { label: "Cadran", value: "Custom, negru, fără logo" },
  { label: "Funcții", value: "Ora pe glob, cronometru, timer, alarme, iluminare LED" },
  { label: "Diametru carcasă", value: "44 mm" }, // TODO: masoara-l tu
  { label: "Închidere", value: "Tip fluture, ascunsă" },
];

const DETAILS = [
  {
    title: "Ce primești în cutie",
    body: [
      "Ceasul Nightfall Edition, asamblat și reglat pe mărimea ta.",
      "Cutia originală Casio G-Shock, cardurile de garanție și manualul.",
      "Carcasa și cureaua originale din rășină. Poți readuce oricând ceasul la forma de fabrică.",
      "Cheiță pentru ajustarea brățării.",
    ],
  },
  {
    title: "Rezistența la apă",
    body: [
      "Modulul Casio are din fabrică 20 BAR. La montare carcasa se deschide, deci nu pot garanta etanșeitatea inițială.",
      "Ceasul rezistă la ploaie și stropi. Nu e pentru înot, duș sau scufundare.",
    ],
  },
  {
    title: "Comandă și livrare",
    body: [
      // TODO: confirma termenul si metoda de plata
      "Îmi scrii pe Instagram, stabilim mărimea brățării și îl trimit prin curier în 1–3 zile lucrătoare.",
      "Plata se face la livrare.",
    ],
  },
];

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Product() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const order = INSTAGRAM;


  return (
    <section id="colectie" className="scroll-mt-20 bg-black py-20 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
        {/* Galerie */}
        <div className="lg:col-span-7">
          <div className="relative aspect-4/5 overflow-hidden bg-zinc-950">
            <AnimatePresence initial={false} mode="popLayout">
              <motion.div
                key={active}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: reduce ? 1 : 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: EASE }}
              >
                <Image
                  src={PHOTOS[active].src}
                  alt={PHOTOS[active].alt}
                  fill
                  sizes="(min-width: 1024px) 56vw, 100vw"
                  className="object-cover"
                  priority={active === 0}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-3 grid grid-cols-5 gap-3" role="group" aria-label="Alege fotografia">
            {PHOTOS.map((p, i) => (
              <button
                key={p.src}
                type="button"
                onClick={() => setActive(i)}
                aria-label={p.alt}
                aria-pressed={i === active}
                className={`relative aspect-4/5 overflow-hidden outline-none transition focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black ${
                  i === active ? "opacity-100 ring-1 ring-white" : "opacity-40 hover:opacity-80"
                }`}
              >
                <Image src={p.src} alt="" fill sizes="12vw" className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Informatii */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(3rem,6vw,5rem)] font-bold uppercase leading-[0.9] tracking-tight text-white">
              {PRODUCT.name}
            </h2>

            <div className="mt-6 flex items-baseline justify-between gap-4 border-b border-white/15 pb-6">
              <p className="font-[family-name:var(--font-display)] text-3xl font-semibold text-white">
                {PRODUCT.price}
              </p>
              <p className="text-xs text-white/50">{PRODUCT.stock}</p>
            </div>

            <p className="mt-6 max-w-[52ch] text-sm leading-relaxed text-white/70">
              {PRODUCT.intro}
            </p>

                        <a
              href={INSTAGRAM}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex w-full justify-center border border-white/40 px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-white transition hover:border-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              Comandă ceasul
            </a>
             <p className="mt-3 text-center text-xs text-white/50">
              Plătești la livrare. Îl primești reglat pe încheietura ta.
            </p>

            <dl className="mt-10 divide-y divide-white/10 border-y border-white/10">
              {SPECS.map((s) => (
                <div key={s.label} className="grid grid-cols-[9rem_1fr] gap-4 py-3 text-sm">
                  <dt className="text-white/50">{s.label}</dt>
                  <dd className="text-white">{s.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-2 divide-y divide-white/10 border-b border-white/10">
              {DETAILS.map((d) => (
                <details key={d.title} className="group py-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium text-white outline-none focus-visible:underline [&::-webkit-details-marker]:hidden">
                    {d.title}
                    <span
                      aria-hidden
                      className="text-lg leading-none text-white/50 transition-transform group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <div className="mt-3 space-y-2 text-sm leading-relaxed text-white/60">
                    {d.body.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>
                </details>
              ))}
            </div>

            <p className="mt-6 text-xs leading-relaxed text-white/35">
              Modul Casio original, cu carcasă, brățară și cadran aftermarket, asamblat de Off
              Hour. Off Hour nu este afiliat și nu este aprobat de Casio.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}