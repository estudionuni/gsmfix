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

export default function Landing() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div>
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <div style={{ paddingTop: 64 }}>
        <Hero />
        <Services />
        <WhyUs />
        <PromoBanner />
        <FAQ />
        <Reviews />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}
