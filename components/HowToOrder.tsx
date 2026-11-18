/**
 * Sectiunea "Cum comanzi" (#comanda).
 * Butoanele de comanda sunt in Hero si la produs, aici doar explicam pasii.
 * TODO: confirma termenul de livrare si metoda de plata.
 */

const STEPS = [
  {
    title: "Îmi scrii",
    body: "Pe WhatsApp sau pe Instagram. Îți răspund eu, nu un bot, de obicei în aceeași zi.",
  },
  {
    title: "Stabilim mărimea",
    body: "Îmi spui circumferința încheieturii. Scot zalele în plus înainte să-l trimit, ca să-l porți direct din cutie.",
  },
  {
    title: "Îl primești",
    body: "Îl trimit prin curier în 1–3 zile lucrătoare. Plătești la livrare, după ce vezi coletul.",
  },
];

export default function HowToOrder() {
  return (
    <section id="comanda" className="scroll-mt-20 border-t border-white/10 bg-black py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="font-[family-name:var(--font-display)] text-[clamp(2.75rem,5.5vw,4.75rem)] font-bold uppercase leading-[0.92] tracking-tight text-white">
          Cum comanzi
        </h2>
        <p className="mt-5 max-w-[52ch] text-sm leading-relaxed text-white/70">
          Fără cont, fără card, fără coș. Vorbim direct și îți fac ceasul pe mărimea ta.
        </p>

        <ol className="mt-14 grid gap-px bg-white/10 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <li key={s.title} className="bg-black pb-8 pt-6 md:pr-10 md:[&:not(:first-child)]:pl-10">
              <span
                aria-hidden
                className="font-[family-name:var(--font-display)] text-6xl font-bold leading-none text-white/15"
              >
                {i + 1}
              </span>
              <h3 className="mt-5 text-base font-medium text-white">{s.title}</h3>
              <p className="mt-2 max-w-[38ch] text-sm leading-relaxed text-white/60">{s.body}</p>
            </li>
          ))}
        </ol>

      </div>
    </section>
  );
}