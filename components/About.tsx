import Stickycards from "./sticky-cards";
import TextReveal from "./TextReveal";

export default function About() {
  return (
    <section className="bg-[#0a0a0a] pt-8 pb-12">
      <div className="mx-auto max-w-6xl px-2 sm:px-4 mb-2">
        <TextReveal
          className="text-3xl font-medium leading-tight text-white md:text-5xl"
          text={
            "Alan is the control plane for software delivery.\nThese are the workflows teams run when coding agents need shared context, orchestration, verification, and human checkpoints."
          }
        />
      </div>
      <Stickycards />
    </section>
  );
}