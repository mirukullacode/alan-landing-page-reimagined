import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";

export default function HeroSection() {
    return (
        <section className="relative min-h-screen w-full overflow-hidden">
            {/* HERO IMAGE */}
            <Image
                src="/hero-image.png"
                alt="Hero banner"
                fill
                priority
                sizes="100vw"
                className="object-cover object-center"
            />

            {/* OVERLAY */}
            <div className="absolute inset-0 bg-linear-to-b from-black/12 via-transparent to-black/40" />

            {/* CONTENT */}
            <div className="relative z-10 flex min-h-screen items-center justify-center px-5 sm:px-6">
                <div
                    className="
                        w-full max-w-4xl
                        -translate-y-20
                        text-center
                        sm:-translate-y-28
                        md:-translate-y-36
                        lg:-translate-y-48
                        xl:-translate-y-56
                    "
                >
                    {/* TITLE */}
                    <h1
                        className="
                            text-4xl
                            font-normal
                            leading-[1.05]
                            tracking-[-0.035em]
                            text-white
                            sm:text-5xl
                            md:text-6xl
                            lg:text-7xl
                            xl:text-[5.5rem]
                        "
                    >
                        Ship software. Faster.
                    </h1>

                    {/* DESCRIPTION */}
                    <p
                        className="
                            mx-auto
                            mt-4
                            max-w-[280px]
                            text-sm
                            leading-relaxed
                            text-white/75
                            sm:max-w-md
                            sm:text-base
                            md:mt-5
                            md:max-w-xl
                            md:text-lg
                        "
                    >
                        Alan orchestrates your agents, code, tests, and deployments.
                    </p>

                    {/* CTA */}
                    <div
                        className="
                            mt-6
                            flex
                            flex-col
                            items-center
                            justify-center
                            gap-3
                            sm:mt-7
                            sm:flex-row
                        "
                    >
                        {/* BOOK DEMO */}
                        <a
                            href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0avPMDgICCN1G-7MW48cxCdMjIJniYUwICWq2i7-dcJsKz9L6mdPhkVzQbJt1vuEWLPg0REwS0"
                            target="_blank"
                            rel="noreferrer"
                            className="
                                group
                                inline-flex
                                h-12
                                w-full
                                items-center
                                justify-center
                                gap-3
                                rounded-full
                                bg-white
                                px-6
                                text-sm
                                font-medium
                                text-black
                                shadow-[0_8px_30px_rgba(0,0,0,0.25)]
                                transition-all
                                duration-300
                                hover:-translate-y-0.5
                                hover:bg-white/90
                                hover:shadow-[0_12px_40px_rgba(255,255,255,0.15)]
                                active:translate-y-0
                                sm:w-auto
                            "
                        >
                            Book demo

                            <span
                                className="
                                    flex
                                    size-5
                                    items-center
                                    justify-center
                                    rounded-full
                                    bg-black/10
                                    transition-transform
                                    duration-300
                                    group-hover:translate-x-1
                                "
                            >
                                <ArrowRight className="size-3.5" />
                            </span>
                        </a>

                        {/* USE CASES */}
                        <a
                            href="https://tryalan.ai/use-cases/"
                            target="_blank"
                            rel="noreferrer"
                            className="w-full sm:w-auto"
                        >
                            <Button
                                variant="secondary"
                                size="lg"
                                className="
                                    h-12
                                    w-full
                                    rounded-full
                                    border
                                    border-white/15
                                    bg-white/6
                                    px-6
                                    text-sm
                                    font-medium
                                    text-white
                                    shadow-[0_8px_30px_rgba(0,0,0,0.2)]
                                    backdrop-blur-sm
                                    hover:bg-white/10
                                    sm:w-auto
                                "
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
