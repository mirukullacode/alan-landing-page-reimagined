import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";

export default function HeroSection() {
    const heroLift = -220;

    return (
        <section className="relative h-screen w-full overflow-hidden">
            <Image
                src="/hero-image.png"
                alt="Hero banner"
                fill
                priority
                className="object-cover"
            />

            <div className="absolute inset-0 bg-linear-to-b from-black/12 via-transparent to-black/40" />

            <div className="relative z-10 flex h-full items-center justify-center">
                <div
                    className="max-w-4xl px-2 text-center"
                    style={{ transform: `translateY(${heroLift}px)` }}
                >
                    <h1 className="text-4xl tracking-tight text-white md:text-5xl lg:text-7xl">
                        Ship software. Faster.
                    </h1>

                    <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-white/75 md:text-lg">
                        Alan orchestrates your agents, code, tests, and deployments.
                    </p>

                    <div className="mt-6 flex items-center justify-center gap-3">
                        <a
                            href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0avPMDgICCN1G-7MW48cxCdMjIJniYUwICWq2i7-dcJsKz9L6mdPhkVzQbJt1vuEWLPg0REwS0"
                            target="_blank"
                            rel="noreferrer"
                            className="group inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 text-sm font-medium text-black shadow-[0_8px_30px_rgba(0,0,0,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/90 hover:shadow-[0_12px_40px_rgba(255,255,255,0.15)] active:translate-y-0"
                        >
                            Book demo
                            <span className="flex size-5 items-center justify-center rounded-full bg-black/10 transition-transform duration-300 group-hover:translate-x-1">
                                <ArrowRight className="size-3.5" />
                            </span>
                        </a>

                        <a
                            href="https://tryalan.ai/use-cases/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <Button
                                variant="secondary"
                                size="lg"
                                className="h-12 rounded-full border border-white/15 bg-white/6 px-6 text-sm font-medium text-white shadow-[0_8px_30px_rgba(0,0,0,0.2)] backdrop-blur-sm hover:bg-white/10"
                            >
                                Use cases
                            </Button>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}