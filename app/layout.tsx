import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
});

export const metadata: Metadata = {
  title: "OFF HOUR | Custom Frosted Watch Atelier",
  description:
    "Ceasuri Casio GA-2100 modificate manual în carcase din oțel inoxidabil 316L cu finisaj frosted. Asamblate și calibrate individual.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro" className="dark scroll-smooth">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} font-sans bg-zinc-950 text-zinc-100 antialiased selection:bg-white selection:text-black`}
      >
        {children}
      </body>
    </html>
  );
}