import Link from "next/link";
import { HANDLE, INSTAGRAM, TIKTOK } from "@/lib/site";

const NAV = [
  { href: "#colectie", label: "Nightfall Edition" },
  { href: "#atelier", label: "Original vs. custom" },
  { href: "#faq", label: "Întrebări" },
];

const SOCIAL = [
  { href: INSTAGRAM, label: "Instagram" },
  { href: TIKTOK, label: "TikTok" },
];

export default function Footer() {
  return (
    <footer className="overflow-hidden border-t border-white/10 bg-black">
      <div className="mx-auto max-w-7xl px-6 pt-16 lg:px-8 lg:pt-20">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12">
          <nav aria-label="Secțiuni" className="lg:col-span-4">
            <ul className="space-y-3 text-sm">
              {NAV.map((n) => (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    className="text-white/60 transition hover:text-white focus-visible:text-white focus-visible:underline"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <ul className="space-y-3 text-sm lg:col-span-4">
            {SOCIAL.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 transition hover:text-white focus-visible:text-white focus-visible:underline"
                >
                  {s.label} · {HANDLE}
                </a>
              </li>
            ))}
          </ul>

          <p className="max-w-[46ch] text-xs leading-relaxed text-white/40 sm:col-span-2 lg:col-span-4">
            Ceasurile Off Hour folosesc module Casio G-Shock originale, cu carcasă, brățară și
            cadran aftermarket. Off Hour nu este afiliat și nu este aprobat de Casio. G-Shock
            este marcă înregistrată Casio Computer Co., Ltd.
          </p>
        </div>

        <div className="mt-16 flex items-center justify-between border-t border-white/10 py-6 text-xs text-white/40">
          <span>© 2026 Off Hour</span>
          <a
            href="#top"
            className="transition hover:text-white focus-visible:text-white focus-visible:underline"
          >
            Sus
          </a>
        </div>
      </div>

      {/* Numele brandului, cat tot ecranul, taiat jos */}
      <p
        aria-hidden
        className="-mb-[0.04em] select-none whitespace-nowrap text-center font-[family-name:var(--font-display)] text-[25vw] font-bold uppercase leading-[0.8] tracking-tight text-white/[0.07]"
      >
        Off Hour
      </p>
    </footer>
  );
}