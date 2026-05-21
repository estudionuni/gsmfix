import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import WhyUs from "./components/WhyUs";
import PromoBanner from "./components/PromoBanner";
import FAQ from "./components/FAQ";
import Reviews from "./components/Reviews";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

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
