"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const TOP_ITEMS = [
    { number: "01", title: "PRDs & Docs", subtitle: "Intent & decisions" },
    { number: "02", title: "Tasks & Issues", subtitle: "Work & constraints" },
    { number: "03", title: "Tests", subtitle: "Quality & signals" },
    { number: "04", title: "Deploys", subtitle: "Releases & changes" },
    { number: "05", title: "Agent Runs", subtitle: "Actions & outcomes" },
];

const BOTTOM_ITEMS = [
    {
        icon: "cube",
        title: "Unified Memory",
        description: "Persistent, versioned, and queryable.",
    },
    {
        icon: "graph",
        title: "Relationship Graph",
        description: "Understands how everything connects.",
    },
    {
        icon: "pulse",
        title: "Real-time Signals",
        description: "Telemetry, logs, and feedback in.",
    },
    {
        icon: "loop",
        title: "Learning Loop",
        description: "Every run improves the model.",
    },
];

function Words({
    text,
    className,
}: {
    text: string;
    className: string;
}) {
    return (
        <>
            {text.split(" ").map((word, i) => (
                <span
                    key={i}
                    className={`${className} inline-block opacity-0`}
                >
                    {word}
                    {i < text.split(" ").length - 1
                        ? "\u00A0"
                        : ""}
                </span>
            ))}
        </>
    );
}

function Icon({ type }: { type: string }) {
    if (type === "cube") {
        return (
            <svg
                viewBox="0 0 24 24"
                className="h-7 w-7"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
            >
                <path d="M12 3 20 7.5 12 12 4 7.5 12 3Z" />
                <path d="M4 7.5V16.5L12 21V12" />
                <path d="M20 7.5V16.5L12 21" />
            </svg>
        );
    }

    if (type === "graph") {
        return (
            <svg
                viewBox="0 0 24 24"
                className="h-7 w-7"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
            >
                <circle cx="6" cy="6" r="2.5" />
                <circle cx="18" cy="5" r="2.5" />
                <circle cx="7" cy="18" r="2.5" />
                <circle cx="18" cy="17" r="2.5" />

                <path d="M8 7.2 15.7 5.8" />
                <path d="M7.2 8.5 7 15.5" />
                <path d="M9 17.5 15.8 17" />
                <path d="M16.8 7.3 18 14.5" />
            </svg>
        );
    }

    if (type === "pulse") {
        return (
            <svg
                viewBox="0 0 32 24"
                className="h-7 w-7"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M2 13h6l3-9 5 16 3-9h6l2 2h3" />
            </svg>
        );
    }

    return (
        <svg
            viewBox="0 0 24 24"
            className="h-7 w-7"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M20 6v5h-5" />
            <path d="M4 18v-5h5" />
            <path d="M6.5 9A7 7 0 0 1 20 11" />
            <path d="M17.5 15A7 7 0 0 1 4 13" />
        </svg>
    );
}

export default function ContextLayer() {
    const sectionRef = useRef<HTMLElement>(null);

    const topItemsRef = useRef<HTMLDivElement>(null);
    const bottomItemsRef = useRef<HTMLDivElement>(null);
    const contextLayerRef = useRef<HTMLDivElement>(null);

    const topLinesRef = useRef<SVGSVGElement>(null);
    const bottomLinesRef = useRef<SVGSVGElement>(null);

    const topItemEls = useRef<(HTMLDivElement | null)[]>([]);
    const bottomItemEls = useRef<(HTMLDivElement | null)[]>([]);

    const topLineEls = useRef<(SVGLineElement | null)[]>([]);
    const topDotEls = useRef<(SVGCircleElement | null)[]>([]);

    const bottomLineEls = useRef<(SVGLineElement | null)[]>([]);
    const bottomDotEls = useRef<(SVGCircleElement | null)[]>([]);

    useEffect(() => {
        const section = sectionRef.current;
        const box = contextLayerRef.current;

        if (!section || !box) return;

        const primeLine = (
            line: SVGLineElement | null
        ) => {
            if (!line) return;

            const length =
                line.getTotalLength();

            gsap.set(line, {
                strokeDasharray: length,
                strokeDashoffset: length,
            });
        };

        const layout = () => {
            const sectionRect =
                section.getBoundingClientRect();

            const boxRect =
                box.getBoundingClientRect();

            const w = sectionRect.width;
            const h = sectionRect.height;

            topLinesRef.current?.setAttribute(
                "viewBox",
                `0 0 ${w} ${h}`
            );

            bottomLinesRef.current?.setAttribute(
                "viewBox",
                `0 0 ${w} ${h}`
            );

            const boxTop =
                boxRect.top -
                sectionRect.top;

            const boxBottom =
                boxRect.bottom -
                sectionRect.top;


            topItemEls.current.forEach(
                (el, i) => {
                    if (!el) return;

                    const r =
                        el.getBoundingClientRect();

                    const x =
                        r.left +
                        r.width / 2 -
                        sectionRect.left;

                    const y1 =
                        r.bottom -
                        sectionRect.top +
                        24;

                    const line =
                        topLineEls.current[i];

                    const dot =
                        topDotEls.current[i];

                    if (line) {
                        line.setAttribute(
                            "x1",
                            String(x)
                        );

                        line.setAttribute(
                            "x2",
                            String(x)
                        );

                        line.setAttribute(
                            "y1",
                            String(y1)
                        );

                        line.setAttribute(
                            "y2",
                            String(boxTop)
                        );
                    }

                    if (dot) {
                        dot.setAttribute(
                            "cx",
                            String(x)
                        );

                        dot.setAttribute(
                            "cy",
                            String(boxTop)
                        );
                    }
                }
            );


            bottomItemEls.current.forEach(
                (el, i) => {
                    if (!el) return;

                    const r =
                        el.getBoundingClientRect();

                    const x =
                        r.left +
                        r.width / 2 -
                        sectionRect.left;

                    const y2 =
                        r.top -
                        sectionRect.top -
                        24;

                    const line =
                        bottomLineEls.current[i];

                    const dot =
                        bottomDotEls.current[i];

                    if (line) {
                        line.setAttribute(
                            "x1",
                            String(x)
                        );

                        line.setAttribute(
                            "x2",
                            String(x)
                        );

                        line.setAttribute(
                            "y1",
                            String(boxBottom)
                        );

                        line.setAttribute(
                            "y2",
                            String(y2)
                        );
                    }

                    if (dot) {
                        dot.setAttribute(
                            "cx",
                            String(x)
                        );

                        dot.setAttribute(
                            "cy",
                            String(boxBottom)
                        );
                    }
                }
            );

            topLineEls.current.forEach(
                primeLine
            );

            bottomLineEls.current.forEach(
                primeLine
            );
        };

        layout();

        let resizeTimer: number;

        const onResize = () => {
            window.clearTimeout(
                resizeTimer
            );

            resizeTimer = window.setTimeout(
                () => {
                    layout();
                    ScrollTrigger.refresh();
                },
                150
            );
        };

        window.addEventListener(
            "resize",
            onResize
        );

        const ctx = gsap.context(() => {
            const topWords =
                topItemsRef.current?.querySelectorAll(
                    ".top-word"
                );

            const bottomWords =
                bottomItemsRef.current?.querySelectorAll(
                    ".bottom-word"
                );

            const bottomIcons =
                bottomItemsRef.current?.querySelectorAll(
                    ".context-bottom-icon"
                );

            gsap.set(
                topItemEls.current,
                {
                    y: -15,
                }
            );

            gsap.set(
                bottomItemEls.current,
                {
                    y: 20,
                }
            );

            if (bottomIcons?.length) {
                gsap.set(
                    bottomIcons,
                    {
                        opacity: 0,
                        y: 10,
                    }
                );
            }

            if (
                topDotEls.current.length
            ) {
                gsap.set(
                    topDotEls.current,
                    {
                        opacity: 0,
                        scale: 0,
                        transformOrigin:
                            "center center",
                    }
                );
            }

            if (
                bottomDotEls.current.length
            ) {
                gsap.set(
                    bottomDotEls.current,
                    {
                        opacity: 0,
                        scale: 0,
                        transformOrigin:
                            "center center",
                    }
                );
            }

            gsap.set(box, {
                opacity: 0,
                scaleX: 0,
                transformOrigin:
                    "center center",
            });

            const tl =
                gsap.timeline({
                    scrollTrigger: {
                        trigger: section,

                        start: "top top",

                        end: () =>
                            `+=${window.innerHeight * 5.5}px`,

                        pin: true,

                        pinSpacing: true,

                        scrub: 0.9,

                        invalidateOnRefresh: true,

                        anticipatePin: 1,
                    },
                });


            tl.addLabel("top");

            tl.to(
                topItemEls.current,
                {
                    y: 0,
                    duration: 0.9,
                    ease: "power2.out",
                },
                "top"
            );

            if (topWords?.length) {
                tl.to(
                    topWords,
                    {
                        opacity: 1,
                        duration: 0.4,
                        stagger: 0.04,
                        ease: "power1.out",
                    },
                    "top"
                );
            }


            tl.addLabel(
                "topLines",
                "top+=0.9"
            );

            if (
                topLineEls.current.length
            ) {
                tl.to(
                    topLineEls.current,
                    {
                        strokeDashoffset: 0,
                        duration: 1,
                        ease: "power1.inOut",
                    },
                    "topLines"
                );
            }

            if (
                topDotEls.current.length
            ) {
                tl.to(
                    topDotEls.current,
                    {
                        opacity: 1,
                        scale: 1,
                        duration: 0.35,
                        stagger: 0.18,
                        ease: "back.out(2.2)",
                    },
                    "topLines+=1"
                );
            }


            tl.addLabel(
                "layer",
                `topLines+=1+${topDotEls.current.length * 0.18 + 0.15}`
            );

            tl.to(
                box,
                {
                    opacity: 1,
                    scaleX: 1,
                    duration: 1.2,
                    ease: "power3.out",
                },
                "layer+=0.25"
            );


            tl.addLabel(
                "bottomLines",
                "layer+=1.1"
            );

            if (
                bottomLineEls.current.length
            ) {
                tl.to(
                    bottomLineEls.current,
                    {
                        strokeDashoffset: 0,
                        duration: 1,
                        ease: "power1.inOut",
                    },
                    "bottomLines"
                );
            }


            if (
                bottomDotEls.current.length
            ) {
                tl.to(
                    bottomDotEls.current,
                    {
                        opacity: 1,
                        scale: 1,
                        duration: 0.35,
                        stagger: 0.18,
                        ease: "back.out(2.2)",
                    },
                    "bottomLines+=1"
                );
            }


            tl.addLabel(
                "bottomItems",
                `bottomLines+=1+${bottomDotEls.current.length * 0.18 + 0.1}`
            );

            tl.to(
                bottomItemEls.current,
                {
                    y: 0,
                    duration: 0.8,
                    stagger: 0.08,
                    ease: "power2.out",
                },
                "bottomItems"
            );

            if (bottomIcons?.length) {
                tl.to(
                    bottomIcons,
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.5,
                        stagger: 0.08,
                        ease: "power2.out",
                    },
                    "bottomItems"
                );
            }

            if (bottomWords?.length) {
                tl.to(
                    bottomWords,
                    {
                        opacity: 1,
                        duration: 0.35,
                        stagger: 0.03,
                        ease: "power1.out",
                    },
                    "bottomItems+=0.15"
                );
            }


            const refreshTimer =
                window.setTimeout(() => {
                    layout();
                    ScrollTrigger.refresh();
                }, 150);

            return () => {
                window.clearTimeout(
                    refreshTimer
                );
            };
        }, sectionRef);

        return () => {
            window.removeEventListener(
                "resize",
                onResize
            );

            window.clearTimeout(
                resizeTimer
            );

            ctx.revert();
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            className="
                relative
                h-screen
                w-full
                overflow-hidden
                bg-[#090a0d]
                text-white
            "
        >

            <div
                ref={topItemsRef}
                className="
                    absolute
                    left-0
                    right-0
                    top-0
                    z-10
                    mx-auto
                    grid
                    w-full
                    max-w-[1400px]
                    grid-cols-5
                    px-8
                    pt-8
                    sm:px-12
                    lg:px-20
                "
            >
                {TOP_ITEMS.map(
                    (item, i) => (
                        <div
                            key={
                                item.number
                            }
                            ref={(el) => {
                                topItemEls.current[
                                    i
                                ] = el;
                            }}
                            className="
                                context-top-item
                                min-w-0
                            "
                        >
                            <p
                                className="
                                    font-mono
                                    text-xs
                                    font-semibold
                                    tracking-wider
                                    text-[#4da8ff]
                                "
                            >
                                <Words
                                    text={
                                        item.number
                                    }
                                    className="top-word"
                                />
                            </p>

                            <h3
                                className="
                                    mt-3
                                    text-sm
                                    font-semibold
                                    tracking-tight
                                    text-white
                                    sm:text-base
                                    lg:text-lg
                                "
                            >
                                <Words
                                    text={
                                        item.title
                                    }
                                    className="top-word"
                                />
                            </h3>

                            <p
                                className="
                                    mt-2
                                    font-mono
                                    text-[10px]
                                    tracking-wide
                                    text-white/45
                                    sm:text-xs
                                "
                            >
                                <Words
                                    text={
                                        item.subtitle
                                    }
                                    className="top-word"
                                />
                            </p>
                        </div>
                    )
                )}
            </div>


            <svg
                ref={topLinesRef}
                className="
                    pointer-events-none
                    absolute
                    left-0
                    top-0
                    z-0
                    h-full
                    w-full
                "
                preserveAspectRatio="none"
            >
                {TOP_ITEMS.map(
                    (item, i) => (
                        <line
                            key={
                                item.number
                            }
                            ref={(el) => {
                                topLineEls.current[
                                    i
                                ] = el;
                            }}
                            stroke="rgba(150,160,180,0.35)"
                            strokeWidth="1"
                        />
                    )
                )}

                {TOP_ITEMS.map(
                    (item, i) => (
                        <circle
                            key={
                                item.number
                            }
                            ref={(el) => {
                                topDotEls.current[
                                    i
                                ] = el;
                            }}
                            r="5"
                            fill="#4da8ff"
                        />
                    )
                )}
            </svg>


            <div
                ref={contextLayerRef}
                className="
                    absolute
                    left-[4%]
                    right-[4%]
                    top-[42%]
                    z-20
                    flex
                    h-[112px]
                    items-center
                    justify-between
                    overflow-hidden
                    bg-white
                    px-7
                    text-black
                    shadow-[0_20px_80px_rgba(255,255,255,0.06)]
                    sm:px-10
                    lg:px-14
                "
            >

                <div className="flex min-w-0 items-center gap-5">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center">
                        <div className="relative h-8 w-6">
                            <span className="absolute left-0 top-2 h-5 w-1.5 rounded-full bg-black" />

                            <span className="absolute left-2.5 top-0 h-8 w-1.5 rounded-full bg-black" />

                            <span className="absolute right-0 top-2 h-5 w-1.5 rounded-full bg-black" />
                        </div>
                    </div>

                    <h2 className="truncate text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">
                        Alan Context Layer
                    </h2>
                </div>


                <div className="hidden items-center gap-3 lg:flex">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#4da8ff]" />

                    <span className="font-mono text-xs font-bold uppercase tracking-[0.2em]">
                        Live
                    </span>
                </div>


                <div className="hidden items-end gap-2 md:flex">
                    {[8, 11, 14, 18, 22, 27, 32, 38].map(
                        (height, index) => (
                            <span
                                key={index}
                                className="w-3 bg-blue-600"
                                style={{
                                    height: `${height}px`,
                                    opacity:
                                        0.35 +
                                        index *
                                        0.08,
                                }}
                            />
                        )
                    )}
                </div>


                <div className="hidden max-w-[130px] font-mono text-[10px] font-bold uppercase leading-relaxed tracking-wider text-black/60 lg:block">
                    Compounds with
                    <br />
                    every run
                </div>
            </div>


            <svg
                ref={bottomLinesRef}
                className="
                    pointer-events-none
                    absolute
                    left-0
                    top-0
                    z-10
                    h-full
                    w-full
                "
                preserveAspectRatio="none"
            >
                {BOTTOM_ITEMS.map(
                    (item, i) => (
                        <line
                            key={
                                item.title
                            }
                            ref={(el) => {
                                bottomLineEls.current[
                                    i
                                ] = el;
                            }}
                            stroke="rgba(150,160,180,0.35)"
                            strokeWidth="1"
                        />
                    )
                )}

                {BOTTOM_ITEMS.map(
                    (item, i) => (
                        <circle
                            key={
                                item.title
                            }
                            ref={(el) => {
                                bottomDotEls.current[
                                    i
                                ] = el;
                            }}
                            r="3"
                            fill="#4da8ff"
                        />
                    )
                )}
            </svg>


            <div
                ref={bottomItemsRef}
                className="
                    absolute
                    bottom-0
                    left-0
                    right-0
                    z-20
                    mx-auto
                    grid
                    w-full
                    max-w-[1200px]
                    grid-cols-4
                    px-8
                    pb-10
                    sm:px-12
                    lg:px-16
                "
            >
                {BOTTOM_ITEMS.map(
                    (item, i) => (
                        <div
                            key={
                                item.title
                            }
                            ref={(el) => {
                                bottomItemEls.current[
                                    i
                                ] = el;
                            }}
                            className="
                                context-bottom-item
                                flex
                                min-w-0
                                flex-col
                                items-center
                                text-center
                            "
                        >
                            <div className="context-bottom-icon mb-4 text-white">
                                <Icon
                                    type={
                                        item.icon
                                    }
                                />
                            </div>

                            <h3 className="text-sm font-semibold tracking-tight text-white sm:text-base">
                                <Words
                                    text={
                                        item.title
                                    }
                                    className="bottom-word"
                                />
                            </h3>

                            <p className="mt-3 max-w-[190px] font-mono text-[10px] leading-relaxed text-white/45 sm:text-xs">
                                <Words
                                    text={
                                        item.description
                                    }
                                    className="bottom-word"
                                />
                            </p>
                        </div>
                    )
                )}
            </div>
        </section>
    );
}