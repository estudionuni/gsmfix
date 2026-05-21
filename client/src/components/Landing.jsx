import { useState } from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Services from "./Services";
import WhyUs from "./WhyUs";
import PromoBanner from "./PromoBanner";
import FAQ from "./FAQ";
import Reviews from "./Reviews";
import Contact from "./Contact";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";

export default function Landing() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className="pt-16">
        <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <main>
          <Hero />
          <Services />
          <WhyUs />
          <PromoBanner />
          <FAQ />
          <Reviews />
          <Contact />
          <Footer />
        </main>
      </div>
      <ScrollToTop />
    </>
  );
}
