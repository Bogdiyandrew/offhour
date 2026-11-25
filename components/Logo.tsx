/**
 * Logo Off Hour (luneta octogonala cu suruburi + H).
 * Ia culoarea textului (currentColor), deci il colorezi cu text-*.
 * Suruburile sunt gauri: prin ele se vede fundalul.
 */
export default function Logo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="3 33 128 68"
      fill="currentColor"
      fillRule="evenodd"
      className={className}
      role="img"
      aria-label="Off Hour"
    >
      <path d="M22.80 34.20 L50.20 34.20 L69.50 53.50 L69.50 80.90 L50.20 100.20 L22.80 100.20 L3.50 80.90 L3.50 53.50 Z M13.00 57.40 L13.00 77.00 L26.70 90.70 L46.30 90.70 L60.00 77.00 L60.00 57.40 L46.30 43.70 L26.70 43.70 Z M25.00 40.00 a2.0 2.0 0 1 0 4.0 0 a2.0 2.0 0 1 0 -4.0 0 Z M44.00 40.00 a2.0 2.0 0 1 0 4.0 0 a2.0 2.0 0 1 0 -4.0 0 Z M60.60 54.00 a2.0 2.0 0 1 0 4.0 0 a2.0 2.0 0 1 0 -4.0 0 Z M60.60 81.50 a2.0 2.0 0 1 0 4.0 0 a2.0 2.0 0 1 0 -4.0 0 Z M43.80 95.00 a2.0 2.0 0 1 0 4.0 0 a2.0 2.0 0 1 0 -4.0 0 Z M24.60 95.00 a2.0 2.0 0 1 0 4.0 0 a2.0 2.0 0 1 0 -4.0 0 Z M8.60 81.50 a2.0 2.0 0 1 0 4.0 0 a2.0 2.0 0 1 0 -4.0 0 Z M8.60 54.00 a2.0 2.0 0 1 0 4.0 0 a2.0 2.0 0 1 0 -4.0 0 Z" />
      <path d="M74.40 45.60 L86.90 34.40 L86.90 60.00 L70.00 75.00 L70.00 61.30 L74.40 58.10 Z M75.00 75.00 L90.60 60.00 L117.50 60.00 L117.50 45.60 L130.00 34.40 L130.00 88.80 L117.50 100.00 L117.50 73.80 L87.50 73.80 L87.50 88.80 L75.00 100.00 Z" />
    </svg>
  );
}