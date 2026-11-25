"use client";

/**
 * Scroll fluid cu Lenis, legat de GSAP ScrollTrigger.
 * - Pe touch (telefon, tableta) Lenis lasa scroll-ul nativ: e mai natural acolo.
 * - Cine are "reduce motion" activat primeste scroll normal, fara Lenis.
 * Se pune o singura data, in app/layout.tsx, in jurul paginii.
 */

import { useEffect, useRef, useState, type ReactNode } from "react";
import { ReactLenis, type LenisRef } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "lenis/dist/lenis.css";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    setEnabled(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // Lenis merge pe ceasul GSAP, ca ScrollTrigger sa fie mereu sincronizat cu scroll-ul.
  useEffect(() => {
    if (!enabled) return;
    const update = (time: number) => lenisRef.current?.lenis?.raf(time * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    const lenis = lenisRef.current?.lenis;
    lenis?.on("scroll", ScrollTrigger.update);
    return () => {
      gsap.ticker.remove(update);
      lenis?.off("scroll", ScrollTrigger.update);
    };
  }, [enabled]);

  if (!enabled) return <>{children}</>;

  return (
    <ReactLenis root ref={lenisRef} options={{ autoRaf: false, lerp: 0.1, wheelMultiplier: 1 }}>
      {children}
    </ReactLenis>
  );
}