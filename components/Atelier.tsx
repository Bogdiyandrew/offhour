"use client";

/**
 * Comparatie inainte / dupa (#atelier).
 * Poze necesare, AMBELE facute de tine, din acelasi unghi, la aceeasi distanta, pe acelasi fundal:
 *   public/nightfall/ga2100-original.jpg  -> GA-2100 negru de fabrica (carcasa din rasina)
 *   public/nightfall/01-cadran.jpg        -> Nightfall Edition
 * Cu cat se suprapun mai bine (ceasul in acelasi loc in cadru), cu atat efectul e mai puternic.
 */

import { useState } from "react";
import Image from "next/image";

const BEFORE = {
  src: "/nightfall/offhourclasic.jpg",
  alt: "Casio G-Shock GA-2100 negru, de fabrică, cu carcasă din rășină",
  label: "GA-2100 de fabrică",
};
const AFTER = {
  src: "/nightfall/01-cadran.jpg",
  alt: "Același ceas transformat în Off Hour Nightfall Edition, cu carcasă și brățară din oțel frosted",
  label: "Nightfall Edition",
};

export default function Atelier() {
  const [pos, setPos] = useState(50);

  return (
    <section id="atelier" className="scroll-mt-20 border-t border-white/10 bg-zinc-950 py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-16">
          <h2 className="font-[family-name:var(--font-display)] text-[clamp(2.75rem,5.5vw,4.75rem)] font-bold uppercase leading-[0.92] tracking-tight text-white lg:col-span-7">
            Același Casio
            <span className="mt-[0.18em] block text-white/40">Alt ceas.</span>
          </h2>
          <p className="max-w-[40ch] text-sm leading-relaxed text-white/70 lg:col-span-5 lg:pb-2">
            Modulul original rămâne neatins.
          </p>
        </div>

        <div className="relative mx-auto mt-14 aspect-4/5 max-w-2xl select-none overflow-hidden bg-black lg:mt-20">
          {/* Dupa: dedesubt, ocupa tot */}
          <Image src={AFTER.src} alt={AFTER.alt} fill sizes="(min-width: 768px) 672px, 100vw" className="object-cover" />

          {/* Inainte: deasupra, taiat la pozitia slider-ului */}
          <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
            <Image src={BEFORE.src} alt={BEFORE.alt} fill sizes="(min-width: 768px) 672px, 100vw" className="object-cover" />
          </div>

          {/* Linia si manerul */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 w-px bg-white"
            style={{ left: `${pos}%` }}
          >
            <div className="absolute top-1/2 left-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white bg-black/70 text-white backdrop-blur-sm">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 4 1.5 9 6 14M12 4l4.5 5L12 14" />
              </svg>
            </div>
          </div>

          <span className="pointer-events-none absolute top-4 left-4 bg-black/70 px-2.5 py-1 text-xs text-white backdrop-blur-sm">
            {BEFORE.label}
          </span>
          <span className="pointer-events-none absolute top-4 right-4 bg-white px-2.5 py-1 text-xs font-medium text-black">
            {AFTER.label}
          </span>

          {/* Controlul real: merge cu mouse, deget si tastatura */}
          <input
            type="range"
            min={0}
            max={100}
            step={0.5}
            value={pos}
            onChange={(e) => setPos(Number(e.target.value))}
            aria-label="Compară GA-2100 de fabrică cu Nightfall Edition"
            className="peer absolute inset-0 h-full w-full cursor-ew-resize appearance-none bg-transparent opacity-0"
          />
          <div className="pointer-events-none absolute inset-0 ring-2 ring-inset ring-white opacity-0 peer-focus-visible:opacity-100" />
        </div>

        <p className="mt-4 text-center text-xs text-white/40">Trage ca să compari.</p>
      </div>
    </section>
  );
}