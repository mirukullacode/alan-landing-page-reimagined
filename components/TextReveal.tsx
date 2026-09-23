"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface TextRevealProps {
    text: string;
    className?: string;
}

export default function TextReveal({ text, className }: TextRevealProps) {
    const containerRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const ctx = gsap.context(() => {
            const words = gsap.utils.toArray<HTMLElement>(
                containerRef.current!.querySelectorAll(".reveal-word")
            );
            if (!words.length) return;

            gsap.set(words, { opacity: 0 });

            gsap.to(words, {
                opacity: 1,
                ease: "none",
                stagger: {
                    each: 1 / words.length,
                    from: "start",
                },
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 85%",
                    end: "bottom 55%",
                    scrub: 0.4,
                },
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const lines = text.split("\n");

    return (
        <h1 ref={containerRef} className={className}>
            {lines.map((line, lineIdx) => (
                <span key={lineIdx} className="block">
                    {line
                        .trim()
                        .split(" ")
                        .map((word, wordIdx) => (
                            <span
                                key={`${lineIdx}-${wordIdx}`}
                                className="reveal-word inline-block mr-[0.28em] will-change-[opacity]"
                            >
                                {word}
                            </span>
                        ))}
                </span>
            ))}
        </h1>
    );
}