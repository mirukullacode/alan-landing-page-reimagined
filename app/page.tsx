import About from "@/components/About";
import Herosection from "@/components/Herosection";

export default function Home() {
  return (
    <>
      <Herosection />
      <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
        <About />
      </div>
    </>
  );
}
