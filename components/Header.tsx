import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-900 bg-zinc-950/85 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* Brand Logo */}
        <Link
          href="/"
          className="text-xl font-bold tracking-[0.25em] text-white uppercase"
        >
          OFF HOUR
        </Link>

        {/* Navigație minimalistă */}
        <nav className="hidden md:flex items-center gap-10 text-xs font-medium tracking-[0.2em] text-zinc-400 uppercase">
          <Link href="#colectie" className="transition hover:text-white">
            Colecție
          </Link>
          <Link href="#atelier" className="transition hover:text-white">
            Specificații
          </Link>
          <Link href="#garantie" className="transition hover:text-white">
            Calibrare & Garanție
          </Link>
        </nav>

        {/* CTA Header */}
        <Link
          href="#colectie"
          className="border border-zinc-700 bg-zinc-900 px-5 py-2.5 text-xs font-semibold tracking-[0.15em] text-white uppercase transition hover:border-white hover:bg-white hover:text-black"
        >
          Comandă
        </Link>
      </div>
    </header>
  );
}