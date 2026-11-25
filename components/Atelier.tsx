"use client";

/**
 * Original vs. custom (#atelier).
 * Stanga: slider inainte / dupa. Dreapta: titlul sus, citatul jos, aliniat cu poza.
 * Poze (acelasi unghi, aceeasi distanta):
 *   public/nightfall/ga2100-original.jpg  -> GA-2100 de fabrica
 *   public/nightfall/01-cadran.jpg        -> Nightfall Edition
 */

import { useRef, useState } from "react";
import Image from "next/image";

// TODO: alege formularea care suna a tine
const QUOTE = {
  text: "Fiecare minut pe care îl petreci supărat îți fură șaizeci de secunde de fericire de pe cadranul vieții.",
  author: "Ralph Waldo Emerson"
};

const BEFORE = {
  src: "/nightfall/ga2100-original.jpg",
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
  const [dragging, setDragging] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  const moveTo = (clientX: number) => {
    const r = box.current?.getBoundingClientRect();
    if (!r) return;
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  };

  return (
    <section
      id="atelier"
      className="relative isolate scroll-mt-20 overflow-hidden border-t border-white/10 bg-black py-20 lg:py-32"
    >
      {/* Fundal: lumina rece in spatele ceasului, o urma calda langa citat, grain de film */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_45%_60%_at_30%_55%,rgba(150,170,200,0.09),transparent_70%)] max-lg:bg-[radial-gradient(ellipse_90%_40%_at_50%_45%,rgba(150,170,200,0.08),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_35%_40%_at_85%_85%,rgba(255,178,36,0.07),transparent_70%)]" />
        <div className="absolute inset-0 opacity-[0.09] mix-blend-overlay [background-image:url(/grain.svg)] [background-size:180px]" />
      </div>

      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
        {/* Titlu: pe mobil deasupra slider-ului, pe desktop in coloana din dreapta */}
        <h2 className="font-[family-name:var(--font-display)] text-[clamp(2.75rem,5vw,4.5rem)] font-bold uppercase leading-[0.92] tracking-tight text-white lg:order-2 lg:col-span-5 lg:col-start-8 lg:row-start-1 lg:self-start">
          Același Casio
          <span className="mt-[0.42em] block text-white/40">Alt ceas.</span>
        </h2>

        {/* Slider */}
        <div className="lg:order-1 lg:col-span-7 lg:row-span-2 lg:row-start-1">
          <div
            ref={box}
            className={`relative aspect-[4/5] touch-pan-y select-none overflow-hidden bg-black ring-1 ring-white/10 ${dragging ? "cursor-grabbing" : "cursor-ew-resize"}`}
            onPointerDown={(e) => {
              e.currentTarget.setPointerCapture(e.pointerId);
              setDragging(true);
              moveTo(e.clientX);
            }}
            onPointerMove={(e) => dragging && moveTo(e.clientX)}
            onPointerUp={() => setDragging(false)}
            onPointerCancel={() => setDragging(false)}
          >
            <Image
              src={AFTER.src}
              alt={AFTER.alt}
              fill
              sizes="(min-width: 1024px) 56vw, 100vw"
              className="pointer-events-none object-cover"
              draggable={false}
            />
            <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
              <Image
                src={BEFORE.src}
                alt={BEFORE.alt}
                fill
                sizes="(min-width: 1024px) 56vw, 100vw"
                className="pointer-events-none object-cover"
                draggable={false}
              />
            </div>

            <div aria-hidden className="pointer-events-none absolute inset-y-0 w-px bg-white" style={{ left: `${pos}%` }}>
              <div className="absolute top-1/2 left-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-sodium bg-black/70 text-sodium backdrop-blur-sm">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M6 4 1.5 9 6 14M12 4l4.5 5L12 14" />
                </svg>
              </div>
            </div>

            <span className="pointer-events-none absolute bottom-4 left-4 bg-black/70 px-2.5 py-1 text-xs text-white backdrop-blur-sm">
              {BEFORE.label}
            </span>
            <span className="pointer-events-none absolute right-4 bottom-4 bg-white px-2.5 py-1 text-xs font-medium text-black">
              {AFTER.label}
            </span>

            <input
              type="range"
              min={0}
              max={100}
              step={1}
              value={Math.round(pos)}
              onChange={(e) => setPos(Number(e.target.value))}
              aria-label="Compară GA-2100 de fabrică cu Nightfall Edition"
              className="peer sr-only"
            />
            <div className="pointer-events-none absolute inset-0 ring-2 ring-inset ring-white opacity-0 peer-focus-visible:opacity-100" />
          </div>
        </div>

        {/* Citat: pe desktop jos, aliniat cu marginea de jos a pozei */}
        <figure className="lg:order-3 lg:col-span-5 lg:col-start-8 lg:row-start-2 lg:self-end">
          <blockquote className="relative font-[family-name:var(--font-display)] text-[clamp(1.75rem,2.6vw,2.4rem)] font-medium leading-[1.12] text-white">
            {/* ghilimelele atarna in afara textului, ca la tipografia de revista */}
            <span aria-hidden className="absolute -left-[0.55em] -top-[0.05em] text-sodium">
              „
            </span>
            {QUOTE.text}
            <span aria-hidden className="text-sodium">”</span>
          </blockquote>
          <figcaption className="mt-6 flex items-center gap-3 text-sm text-white/50">
            <span aria-hidden className="h-px w-8 bg-sodium" />
            <span>
              <span className="text-white">{QUOTE.author}</span>
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}