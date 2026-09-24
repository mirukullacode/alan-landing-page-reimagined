"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AsciiHand from "./Asciihand";
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const NAV = [
    { label: "Work", href: "/" },
    { label: "About", href: "/about" },
    { label: "Journal", href: "/journal" },
    { label: "Contact", href: "/contact" },
];

const DESCRIPTION =
    "Alan is the control plane for software delivery. These are the workflows teams run when coding agents need shared context, orchestration, verification, and human checkpoints.";

const Letters = ({ text }: { text: string }) => (
    <>
        {text.split("").map((ch, i) => (
            <span key={i} className="title-char inline-block will-change-transform">
                {ch}
            </span>
        ))}
    </>
);

export default function Footer() {
    const rootRef = useRef<HTMLElement>(null);
    const leftProgress = useRef({ v: 0 });
    const rightProgress = useRef({ v: 0 });

    useEffect(() => {
        const root = rootRef.current;
        if (!root) return;

        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduce) {
            leftProgress.current.v = 1;
            rightProgress.current.v = 1;
            return;
        }

        const ctx = gsap.context(() => {
            gsap.set(".nav-line", { yPercent: 115 });
            gsap.set(".desc-word", { yPercent: 115 });
            gsap.set(".title-char", { yPercent: 140 });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: root,
                    start: "top 75%",
                    toggleActions: "play none none reverse",
                },
            });

            tl.to(".nav-line", {
                yPercent: 0,
                duration: 0.8,
                ease: "power3.out",
                stagger: 0.08,
            })
                .to(
                    ".desc-word",
                    { yPercent: 0, duration: 0.7, ease: "power3.out", stagger: 0.018 },
                    "-=0.5"
                )
                .to(
                    ".title-char",
                    { yPercent: 0, duration: 1.1, ease: "power4.out", stagger: 0.05 },
                    "-=0.4"
                )
                .to(
                    leftProgress.current,
                    { v: 1, duration: 2, ease: "power2.inOut" },
                    "-=0.9"
                )
                .to(
                    rightProgress.current,
                    { v: 1, duration: 2, ease: "power2.inOut" },
                    "<0.15"
                );
        }, root);

        return () => ctx.revert();
    }, []);

    return (
        <footer
            ref={rootRef}
            className="relative h-screen min-h-[560px] w-full overflow-hidden bg-[#111111] text-white"
        >
            {/* TOP LEFT NAV */}
            <nav className="absolute left-4 top-4 z-30 flex flex-col text-[18px] leading-[1.35] text-white/85 md:left-5 md:top-5">
                {NAV.map(({ label, href }) => (
                    <Link
                        key={href}
                        href={href}
                        className="block overflow-hidden transition-opacity hover:opacity-50"
                    >
                        <span className="nav-line block">{label}</span>
                    </Link>
                ))}
            </nav>

            {/* TOP RIGHT DESCRIPTION */}
            <p className="absolute right-4 top-4 z-30 w-[280px] text-[18px] leading-[1.4] text-white/80 md:right-5 md:top-5 md:w-[390px] lg:w-[390px]">
                {DESCRIPTION.split(" ").map((word, i) => (
                    <span key={i}>
                        <span className="inline-block overflow-hidden pb-[1px] align-top">
                            <span className="desc-word inline-block">{word}</span>
                        </span>{" "}
                    </span>
                ))}
            </p>
            {/* ASCII HANDS */}
            <div className="pointer-events-none absolute inset-0 z-10">
                <AsciiHand
                    src="/left-hand.png"
                    from="left"
                    progressRef={leftProgress}
                    cell={12}
                    radius={190}
                    className="absolute left-[-16%] top-[46%] aspect-square w-[95vw] -translate-y-1/2 md:left-[-14%] md:w-[68vw]"
                />
                <AsciiHand
                    src="/right-hand.png"
                    from="right"
                    progressRef={rightProgress}
                    cell={12}
                    radius={190}
                    className="absolute right-[-16%] top-[46%] aspect-square w-[95vw] -translate-y-1/2 md:right-[-14%] md:w-[68vw]"
                />
            </div>

            {/* GIANT TITLE */}
            <div className="absolute bottom-[1.5vw] left-0 z-10 flex w-full items-end justify-between px-3 md:px-5">
                <h2 className="whitespace-nowrap text-[19vw] font-medium leading-[0.72] tracking-[-0.06em]">
                    <Letters text="Try" />
                </h2>
                <h2 className="whitespace-nowrap text-[19vw] font-medium leading-[0.72] tracking-[-0.06em]">
                    <Letters text="Alan" />
                </h2>
                <h2 className="whitespace-nowrap text-[19vw] font-medium leading-[0.72] tracking-[-0.06em]">
                    <Letters text="AI " />
                </h2>
            </div>
        </footer>
    );
}