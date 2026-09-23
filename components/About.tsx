import Stickycards from "./sticky-cards";

export default function About() {
  return (
    <section className="pt-8 pb-12">
      <div className="mx-auto max-w-6xl px-2 sm:px-4 mb-2">
        <h1 className="text-3xl font-medium leading-tight text-white md:text-5xl">
          Alan is the control plane for software delivery. <br />
          These are the workflows teams run when coding agents need shared
          context, orchestration, verification, and human checkpoints.
        </h1>
      </div>
      <Stickycards />
    </section>
  );
}