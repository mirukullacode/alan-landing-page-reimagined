import About from "@/components/About";
import Herosection from "@/components/Herosection";
import HowItWorks from "@/components/HowItWorks";

export default function Home() {
  return (
    <main className="w-full">
      <Herosection />
      <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
        <About />
      </div>
    </main>
  );
}
