/**
 * Intrebari frecvente (#faq).
 * Fiecare raspuns trebuie sa spuna ceva concret: cifre, nume, pasi.
 * Tot ce e marcat TODO e o promisiune: lasa-l doar daca il poti respecta.
 */

const FAQ: { q: string; a: string[] }[] = [
  {
    q: "E un Casio adevărat?",
    a: [
      "Da. Pornesc de la un G-Shock GA-2100 nou, cu cutie și acte. Modulul (mecanismul, afișajul, toate funcțiile) și capacul din spate cu gravura Casio rămân originale.",
      "Ce schimb eu: carcasa și brățara, înlocuite cu oțel inoxidabil și cadranul.",
    ],
  },
  {
    q: "Cât durează livrarea?",
    a: [
      "Livrez doar în România, prin SameDay. Îl trimit în 1–3 zile lucrătoare de la confirmarea comenzii și ajunge de obicei a doua zi după expediere.",
      "Primești numărul AWB pe Instagram, ca să știi unde e coletul.",
    ],
  },
  {
    q: "Și dacă nu-mi place când îl primesc?",
    a: [
      // TODO: hotaraste politica de retur si scrie-o exact aici
      "Dacă îl primești și nu e ce te așteptai, scrie-mi în 14 zile și stabilim returul. Ceasul trebuie să se întoarcă așa cum a plecat, cu cutia și tot ce era în ea.",
    ],
  },
  
  {
    q: "Se potrivește pe încheietura mea?",
    a: [
      // TODO: completeaza circumferinta minima si maxima reala
      "Brățara se scurtează scoțând zale. Când comanzi, îmi spui circumferința încheieturii (o măsori cu un fir de ață și o riglă) și îl trimit gata reglat.",
      "În cutie ai și cheița, dacă vrei să-l ajustezi mai târziu.",
    ],
  },
  {
    q: "Pot să înot cu el?",
    a: [
      "Nu. Modulul are din fabrică 20 BAR, dar la montaj carcasa se deschide, așa că nu pot garanta etanșeitatea inițială.",
      "Rezistă la ploaie, stropi și spălat pe mâini. Nu e pentru înot, duș sau scufundare.",
    ],
  },
   {
    q: "Pot să-mi fac unul personalizat?",
    a: [
      // TODO: confirma ce poti schimba si in cat timp ajung piesele
      "Da. Putem schimba cadranul, culoarea și finisajul carcasei sau brățara, în funcție de piesele pe care le pot aduce.",
      "Scrie-mi pe Instagram la @offhour.ro ce ai în minte. Îți spun ce se poate, cât costă și în cât timp e gata, înainte să plătești ceva.",
    ],
  },
   {
    q: "Oferi garanție?",
    a: [
      "Fiecare ceas pleacă cu garanție pe manoperă. Dacă ceva nu e în regulă cu montajul, scrie-mi și rezolv.",
    ],
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
                  className="shrink-0 text-2xl font-light leading-none text-white/50 transition group-open:rotate-45 group-open:text-sodium"
                >
                  +
                </span>
              </summary>
              <div className="-mt-1 max-w-[62ch] space-y-3 pb-6 text-sm leading-relaxed text-white/60">
                {f.a.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}