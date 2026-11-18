/**
 * Intrebari frecvente (#faq).
 * Raspunsuri scurte. Tot ce e TODO trebuie confirmat de tine.
 */

const FAQ = [
  {
    q: "E un Casio original?",
    a: "Da. Modulul, mecanismul și capacul din spate sunt Casio G-Shock GA-2100 originale, cu gravura la vedere. Carcasa, brățara și cadranul sunt montate de mine.",
  },
  {
    q: "Pot să înot cu el?",
    a: "Nu. Rezistă la ploaie și stropi, dar carcasa se deschide la montaj, așa că nu garantez cei 20 BAR din fabrică.",
  },
  {
    q: "Se potrivește pe încheietura mea?",
    // TODO: completeaza circumferinta maxima reala a bratarii
    a: "Brățara se scurtează scoțând zale. Îmi spui circumferința încheieturii când comanzi și îl trimit gata reglat.",
  },
  {
    q: "Pot să-l readuc la forma de fabrică?",
    a: "Da. Primești carcasa și cureaua originale din rășină, iar modulul se mută înapoi.",
  },
  {
    q: "Cum plătesc?",
    // TODO: confirma metoda de plata
    a: "La livrare, prin curier. Nu îți cer bani în avans.",
  },
  {
    q: "Ce fac dacă apare o problemă?",
    // TODO: hotaraste exact ce acoperi si scrie asta aici
    a: "Îmi scrii pe WhatsApp. Dacă e o problemă de la montaj, o repar eu.",
  },
];

export default function Faq() {
  return (
    <section id="faq" className="scroll-mt-20 border-t border-white/10 bg-zinc-950 py-20 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
        <h2 className="font-[family-name:var(--font-display)] text-[clamp(2.75rem,5.5vw,4.75rem)] font-bold uppercase leading-[0.92] tracking-tight text-white lg:col-span-4">
          Întrebări
        </h2>

        <div className="divide-y divide-white/10 border-y border-white/10 lg:col-span-8">
          {FAQ.map((f) => (
            <details key={f.q} className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-base font-medium text-white outline-none focus-visible:underline [&::-webkit-details-marker]:hidden">
                {f.q}
                <span
                  aria-hidden
                  className="shrink-0 text-2xl font-light leading-none text-white/50 transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="-mt-1 max-w-[60ch] pb-6 text-sm leading-relaxed text-white/60">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}