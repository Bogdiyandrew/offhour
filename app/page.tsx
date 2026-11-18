import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Product from "@/components/Product";
import Atelier from "@/components/Atelier";
import HowToOrder from "@/components/HowToOrder";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div id="top" className="min-h-screen bg-zinc-950 text-zinc-100">
      <Header />
      <main>
        <Hero />
        <Product />
        <Atelier />
        <HowToOrder />
        <Faq />
      </main>
      <Footer />
    </div>
  );
}