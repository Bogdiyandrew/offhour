"use client";

/**
 * Hero cu animatii GSAP:
 *  1. La incarcare: poza apare usor, titlul urca rand cu rand din spatele unei masti,
 *     apoi textul si butonul.
 *  2. La scroll: poza se mareste putin, iar textul se estompeaza si urca.
 * Cine are "reduce motion" vede direct tot, fara animatii.
 *
 * SETUP:
 * 1. app/layout.tsx: Barlow_Condensed cu subsets ["latin", "latin-ext"] si variable "--font-display".
 * 2. public/hero-watch.jpg = ceas-prezentare-v4.jpg
 * Headerul e fixed si transparent, deci hero-ul ocupa tot ecranul si trece pe sub el.
 */

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import ScrollLink from "@/components/ScrollLink";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const COPY = {
  eyebrow: "Custom G-Shock",
  sub: "Un G-Shock original, îmbrăcat în carcasă și brățară de oțel cu finisaj frosted.",
};

// Fiecare rand al titlului, pe rand. dim = gri, restul alb plin.
const LINES = [
  { text: "Primul lucru", dim: false },
  { text: "pe care îl", dim: true },
  { text: "observă la tine", dim: true },
];

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // 1. Intrarea
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
        tl.set("[data-hero-content]", { autoAlpha: 1 })
          .from("[data-hero-photo]", { autoAlpha: 0, scale: 1.08, duration: 2.2, ease: "power2.out" }, 0)
          .from("[data-hero-eyebrow]", { autoAlpha: 0, y: 12, duration: 1 }, 0.25)
          .from("[data-hero-line]", { yPercent: 115, duration: 1.3, stagger: 0.12 }, 0.35)
          .from("[data-hero-sub]", { autoAlpha: 0, y: 16, duration: 1 }, 0.85)
          .from("[data-hero-cta]", { autoAlpha: 0, y: 16, duration: 1 }, 0.95);

        // 2. Scroll: poza se apropie, textul pleaca
        gsap.to("[data-hero-zoom]", {
          scale: 1.12,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
        gsap.to("[data-hero-content]", {
          autoAlpha: 0,
          y: -60,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "60% top", scrub: true },
        });
      });

      // Fara animatii: arata tot imediat
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-hero-content]", { autoAlpha: 1 });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-black">
      {/* Poza: pe desktop impinsa spre dreapta, ca titlul sa nu cada peste cadran.
          Doua straturi: unul pentru intrare (photo), unul pentru zoom-ul la scroll (zoom). */}
      <div
        data-hero-photo
        className="absolute inset-x-0 top-0 -z-10 h-[64%] overflow-hidden lg:inset-y-0 lg:left-[26%] lg:right-[-10%] lg:h-auto"
      >
        <div data-hero-zoom className="absolute inset-0 will-change-transform">
          <Image
            src="/hero-watch.jpg"
            alt="Ceas Off Hour negru, cu finisaj frosted, ținut pe o mănușă albă"
            fill
            priority
            sizes="(min-width: 1024px) 84vw, 100vw"
            className="object-cover object-[50%_36%] lg:object-[50%_42%] lg:[mask-image:linear-gradient(to_right,transparent,black_30%)]"
          />
        </div>
      </div>

      {/* Mobil: intunecare de jos in sus. Desktop: stanga neagra, se deschide spre ceas. */}
      <div className="absolute inset-x-0 top-0 -z-10 h-[64%] bg-[linear-gradient(to_top,#0E1013_0%,rgba(14,16,19,0.6)_22%,rgba(14,16,19,0)_50%)] lg:hidden" />
      <div className="absolute inset-0 -z-10 hidden lg:block bg-[linear-gradient(to_right,#0E1013_26%,rgba(14,16,19,0.8)_36%,rgba(14,16,19,0.1)_60%,rgba(14,16,19,0.3)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 -z-10 hidden h-1/3 lg:block bg-gradient-to-t from-black to-transparent" />

      {/* invisible pana porneste animatia, ca sa nu clipeasca textul la incarcare */}
      <div
        data-hero-content
        className="invisible mx-auto w-full max-w-7xl px-6 pb-8 pt-28 lg:px-8 lg:pb-28 lg:pt-36"
      >
        <p
          data-hero-eyebrow
          className="mb-5 hidden text-[11px] font-medium uppercase tracking-[0.35em] text-white/70 sm:block"
        >
          {COPY.eyebrow}
        </p>

        <h1 className="font-[family-name:var(--font-display)] text-[clamp(2.6rem,13.5vw,4.25rem)] font-bold uppercase leading-[0.92] tracking-tight text-white lg:text-[clamp(2.75rem,min(7vw,11vh),6.5rem)]">
          {LINES.map((l, i) => (
            // Masca: fiecare rand urca din spatele ei. Padding-ul lasa loc pentru Î, Ă si virgula de la Ș.
            <span
              key={l.text}
              className={`-my-[0.14em] block overflow-hidden py-[0.14em] ${i === 1 ? "mt-[0.12em]" : ""}`}
            >
              <span data-hero-line className={`block whitespace-nowrap ${l.dim ? "text-white/40" : ""}`}>
                {l.text}
              </span>
            </span>
          ))}
        </h1>

        <div className="mt-8 max-w-lg lg:mt-10">
          <p data-hero-sub className="text-base leading-relaxed text-white/75">
            {COPY.sub}
          </p>
          <div data-hero-cta>
            <ScrollLink
              to="colectie"
              className="mt-6 inline-flex w-full justify-center bg-white px-10 py-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-black transition duration-300 hover:bg-white/85 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:w-auto"
            >
              Vezi ceasul
            </ScrollLink>
          </div>
        </div>
      </div>
    </section>
  );
}