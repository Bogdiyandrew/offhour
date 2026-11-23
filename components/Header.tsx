"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { INSTAGRAM } from "@/lib/site";


const NAV = [
  { id: "colectie", label: "Nightfall" },
  { id: "atelier", label: "Original vs. custom" },
  { id: "faq", label: "Întrebări" },
];

const ORDER = INSTAGRAM;

/** Ora vizitatorului, ca in fereastra LCD de pe cadranul GA-2100. */
function LcdClock() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const hh = now ? String(now.getHours()).padStart(2, "0") : "--";
  const mm = now ? String(now.getMinutes()).padStart(2, "0") : "--";
  const blink = now ? now.getSeconds() % 2 === 0 : true;

  return (
    <span
      className="hidden items-center border border-[#5C6B8A]/50 bg-[#0B0E14] px-2 py-1 font-mono text-[13px] leading-none tracking-wider text-[#A9BAD8] [font-variant-numeric:tabular-nums] sm:inline-flex"
      aria-hidden
    >
      {hh}
      <span
        className={`motion-safe:transition-opacity ${blink ? "opacity-100" : "opacity-20"}`}
      >
        :
      </span>
      {mm}
    </span>
  );
}

export default function Header() {
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Fundal dupa ce incepi sa derulezi; ascuns cand cobori, inapoi cand urci.
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      if (y < 400) {
        setHidden(false);
        last = y;
        return;
      }
      const diff = y - last;
      if (Math.abs(diff) < 8) return;
      setHidden(diff > 0);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Sectiunea vizibila acum.
  useEffect(() => {
    const els = NAV.map((n) => document.getElementById(n.id)).filter(
      Boolean,
    ) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting);
        if (vis.length) setActive(vis[0].target.id);
        else if (window.scrollY < window.innerHeight * 0.5) setActive(null);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Meniul de pe mobil: blocheaza derularea si se inchide cu Escape.
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-[translate,background-color,border-color] duration-500 ${
          hidden && !open ? "-translate-y-full" : "translate-y-0"
        } ${solid ? "border-b border-white/10 bg-black/80 backdrop-blur-md" : "border-b border-transparent bg-black"}`}
      >
        <div className="relative z-10 mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-6 lg:px-8">
          <Link
            href="#top"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-black"
            aria-label="Off Hour, înapoi sus"
          >
            <span className="font-[family-name:var(--font-display)] text-[1.75rem] font-bold uppercase leading-none tracking-tight text-white">
              Off Hour
            </span>
            <LcdClock />
          </Link>

          <nav aria-label="Principal" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {NAV.map((n) => {
                const isActive = active === n.id;
                return (
                  <li key={n.id} className="relative">
                    <Link
                      href={`#${n.id}`}
                      aria-current={isActive ? "true" : undefined}
                      className={`block px-4 py-2 text-sm outline-none transition-colors focus-visible:text-white focus-visible:underline ${
                        isActive
                          ? "text-white"
                          : "text-white/55 hover:text-white"
                      }`}
                    >
                      {n.label}
                    </Link>
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-x-4 -bottom-0.5 h-px bg-white"
                        transition={{
                          duration: reduce ? 0 : 0.35,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      />
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={ORDER}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden border border-white bg-white px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-black transition hover:bg-transparent hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:inline-flex"
            >
              Comandă
            </a>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Închide meniul" : "Deschide meniul"}
              className="relative flex h-11 w-11 items-center justify-center outline-none focus-visible:ring-2 focus-visible:ring-white lg:hidden"
            >
              <span
                className={`absolute h-px w-6 bg-white transition-transform duration-300 ${open ? "rotate-45" : "-translate-y-1"}`}
              />
              <span
                className={`absolute h-px w-6 bg-white transition-transform duration-300 ${open ? "-rotate-45" : "translate-y-1"}`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Meniu mobil, pe tot ecranul (portal, ca sa nu fie prins de blur-ul headerului) */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                id="mobile-menu"
                className="fixed inset-0 z-40 flex flex-col bg-black px-6 pb-10 pt-28 lg:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduce ? 0 : 0.25 }}
              >
                <nav aria-label="Mobil">
                  <ul className="divide-y divide-white/10 border-y border-white/10">
                    {NAV.map((n, i) => (
                      <motion.li
                        key={n.id}
                        initial={{ opacity: 0, y: reduce ? 0 : 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.4,
                          delay: reduce ? 0 : 0.05 + i * 0.05,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      >
                        <Link
                          href={`#${n.id}`}
                          onClick={() => setOpen(false)}
                          className={`block py-4 font-[family-name:var(--font-display)] text-[2.75rem] font-bold uppercase leading-none tracking-tight outline-none focus-visible:underline ${
                            active === n.id ? "text-white" : "text-white/45"
                          }`}
                        >
                          {n.label}
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </nav>

                <a
                  href={ORDER}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="mt-auto flex justify-center border border-white bg-white px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-black"
                >
                  Comandă pe Instagram
                </a>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}