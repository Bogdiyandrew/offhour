"use client";

/**
 * Link catre o sectiune de pe aceeasi pagina.
 * Deruleaza de fiecare data, chiar daca URL-ul are deja acelasi #hash
 * (Next <Link> nu face nimic in cazul asta).
 * to="top" duce sus de tot si nu are nevoie de niciun id pe pagina.
 */

import type { ComponentProps, MouseEvent } from "react";

type Props = Omit<ComponentProps<"a">, "href"> & { to: string };

export default function ScrollLink({ to, onClick, children, ...rest }: Props) {
  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    // lasa Ctrl/Cmd+click sa deschida in tab nou
    if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();

    const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const behavior: ScrollBehavior = smooth ? "smooth" : "auto";

    if (to === "top") {
      window.scrollTo({ top: 0, behavior });
      history.replaceState(null, "", window.location.pathname);
      return;
    }
    const el = document.getElementById(to);
    if (!el) return;
    el.scrollIntoView({ behavior, block: "start" });
    history.replaceState(null, "", `#${to}`);
  };

  return (
    <a href={to === "top" ? "#" : `#${to}`} onClick={handle} {...rest}>
      {children}
    </a>
  );
}