import Stickycards from "./sticky-cards";

export default function About() {
  return (
    <section className="w-full pt-16 pb-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 mb-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.25] tracking-tight text-white">
          <span className="block mb-3">
            Alan is the control plane for software delivery.
          </span>
          <span className="block text-white/80">
            These are the workflows teams run when coding agents need shared
            context, orchestration, verification, and human checkpoints.
          </span>
        </h1>
      </div>

      <Stickycards />
    </section>
  );
}