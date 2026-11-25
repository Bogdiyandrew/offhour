"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import ScrollLink from "@/components/ScrollLink";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { INSTAGRAM } from "@/lib/site";
import Logo from "@/components/Logo";
import { useLenis } from "lenis/react";

// Pe desktop: LEFT in stanga logo-ului, RIGHT in dreapta. Pe mobil apar toate in meniu.
// "despre" e sectiunea "Despre noi", pe care o facem mai tarziu.
// Pana exista un element cu id="despre", linkul nu face nimic.
const LEFT = [
  { id: "colectie", label: "Colectie" },
  { id: "despre", label: "Despre noi" },
  { id: "contact", label: "Contact" },
];
const RIGHT = [
  { id: "atelier", label: "Original vs. custom" },
  { id: "faq", label: "Întrebări" },
];
const NAV = [...LEFT, ...RIGHT];

const ORDER = INSTAGRAM;

export default function Header() {
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
   const lenis = useLenis();
  useEffect(() => setMounted(true), []);

  // Fundal dupa ce incepi sa derulezi; ascuns cand cobori, inapoi cand urci.
  useEffect(() => {
    // "last" se muta doar dupa o miscare clara, ca pasii mici (trackpad, telefon)
    // sa nu schimbe directia la fiecare pixel.
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
    lenis?.stop();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      lenis?.start();
      window.removeEventListener("keydown", onKey);
    };
  }, [open, lenis]);

  const solid = scrolled || open;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 w-full transition-[translate,background-color,border-color] duration-500 ${
          hidden && !open ? "-translate-y-full" : "translate-y-0"
        } ${
          solid
            ? "border-b border-white/10 bg-black/75 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        {/* Sus de tot headerul e transparent: o umbra fina de sus pastreaza meniul lizibil peste poza */}
        <div
          aria-hidden
          className={`pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/70 to-transparent transition-opacity duration-500 ${solid ? "opacity-0" : "opacity-100"}`}
        />
        <div className="relative z-10 mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-6 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:px-8">
          {/* Stanga: linkuri pe desktop, nimic pe mobil */}
          <nav aria-label="Principal stânga" className="hidden lg:block">
            <NavList items={LEFT} active={active} reduce={reduce} />
          </nav>

          {/* Centru: logo + nume */}
          <ScrollLink
            to="top"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 justify-self-center outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-black"
            aria-label="Off Hour, înapoi sus"
          >
            <Logo className="h-7 w-auto text-white" />
            <span
              aria-hidden
              className="whitespace-nowrap font-[family-name:var(--font-display)] text-[1.75rem] font-bold uppercase leading-none tracking-tight text-white"
            >
              Off Hour
            </span>
          </ScrollLink>

          {/* Dreapta: linkuri + Comandă pe desktop, meniul pe mobil */}
          <div className="flex items-center justify-end gap-3">
            <nav aria-label="Principal dreapta" className="hidden lg:block">
              <NavList items={RIGHT} active={active} reduce={reduce} />
            </nav>
            <a
              href={ORDER}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden border border-white/30 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition hover:border-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:inline-flex lg:ml-3"
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
                className={`absolute h-px w-6 bg-white transition-transform duration-300 ${open ? "rotate-45" : "-translate-y-[4px]"}`}
              />
              <span
                className={`absolute h-px w-6 bg-white transition-transform duration-300 ${open ? "-rotate-45" : "translate-y-[4px]"}`}
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
                        <ScrollLink
                          to={n.id}
                          onClick={() => setOpen(false)}
                          className={`block py-4 font-[family-name:var(--font-display)] text-[2.75rem] font-bold uppercase leading-none tracking-tight outline-none focus-visible:underline ${
                            active === n.id ? "text-white" : "text-white/45"
                          }`}
                        >
                          {n.label}
                        </ScrollLink>
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

/** Lista de linkuri de pe desktop, cu linia sodium sub sectiunea activa. */
function NavList({
  items,
  active,
  reduce,
}: {
  items: { id: string; label: string }[];
  active: string | null;
  reduce: boolean | null;
}) {
  return (
    <ul className="flex items-center gap-1">
      {items.map((n) => {
        const isActive = active === n.id;
        return (
          <li key={n.id} className="relative">
            <ScrollLink
              to={n.id}
              aria-current={isActive ? "true" : undefined}
              className={`block whitespace-nowrap px-4 py-2 text-sm outline-none transition-colors focus-visible:text-white focus-visible:underline ${
                isActive ? "text-white" : "text-white/80 hover:text-white"
              }`}
            >
              {n.label}
            </ScrollLink>
            {isActive && (
              <motion.span
                layoutId="nav-active"
                className="absolute inset-x-4 -bottom-0.5 h-0.5 bg-sodium"
                transition={{ duration: reduce ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
}