"use client";

/**
 * Link catre o sectiune de pe aceeasi pagina.
 * Deruleaza de fiecare data, chiar daca URL-ul are deja acelasi #hash.
 * Daca Lenis e activ, deruleaza prin Lenis (altfel s-ar bate cap in cap cu el).
 * to="top" duce sus de tot si nu are nevoie de niciun id pe pagina.
 */

import type { ComponentProps, MouseEvent } from "react";
import { useLenis } from "lenis/react";

type Props = Omit<ComponentProps<"a">, "href"> & { to: string };

export default function ScrollLink({ to, onClick, children, ...rest }: Props) {
  const lenis = useLenis();

  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    // lasa Ctrl/Cmd+click sa deschida in tab nou
    if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();

    const el = to === "top" ? null : document.getElementById(to);
    if (to !== "top" && !el) return;

    if (lenis) {
      // Lenis respecta singur scroll-mt-* de pe sectiune (spatiul pentru header).
      // Un cadru mai tarziu: daca linkul e in meniul de pe mobil, meniul se inchide intai
      // si porneste Lenis la loc; altfel repornirea ar anula scroll-ul abia inceput.
      requestAnimationFrame(() => lenis.scrollTo(el ?? 0, { duration: 1.2, force: true }));
    } else {
      const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const behavior: ScrollBehavior = smooth ? "smooth" : "auto";
      if (el) el.scrollIntoView({ behavior, block: "start" });
      else window.scrollTo({ top: 0, behavior });
    }
    history.replaceState(null, "", el ? `#${to}` : window.location.pathname);
  };

  return (
    <a href={to === "top" ? "#" : `#${to}`} onClick={handle} {...rest}>
      {children}
    </a>
  );
}