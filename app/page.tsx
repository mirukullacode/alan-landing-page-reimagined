import About from "@/components/About";
import ContextLayer from "@/components/ContextLayer";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import Herosection from "@/components/Herosection";

export default function Home() {
  return (
    <div className="bg-[#0a0a0a]">
      <Herosection />
      <About />
      <ContextLayer />
      <FAQ />
      <Footer />
    </div>
  );
}
