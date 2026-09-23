"use client";

import { forwardRef } from "react";

const HowItWorks = forwardRef<HTMLDivElement>(
    function HowItWorks(_, ref) {
        return (
            <div
                ref={ref}
                className="
          how-it-works-layer
          pointer-events-none
          absolute
          inset-0
          z-30
          overflow-hidden
        "
            >
                <div
                    className="
            absolute
            left-0
            right-0
            top-0
            mx-auto
            flex
            w-full
            max-w-7xl
            items-center
            justify-between
            px-6
            py-16
            sm:px-8
          "
                >
                    <div
                        className="
              how-it-works-badge
              rounded-full
              border
              border-black/15
              bg-black/[0.03]
              px-4
              py-1.5
              font-mono
              text-xs
              uppercase
              tracking-[0.2em]
              text-black/60
            "
                    >
                        How it works
                    </div>

                    <div
                        className="
              font-mono
              text-xs
              uppercase
              tracking-[0.2em]
              text-black/40
            "
                    >
                        Architecture
                    </div>
                </div>

                <div
                    className="
            absolute
            left-0
            top-1/2
            flex
            w-full
            -translate-y-1/2
            items-center
            overflow-visible
          "
                >
                    <h2
                        className="
              how-it-works-heading
              whitespace-nowrap
              font-[var(--font-instrument-serif)]
              text-[clamp(4.5rem,14vw,13rem)]
              font-normal
              leading-none
              tracking-tight
              text-black
              will-change-transform
            "
                    >
                        One Engineering Brain.
                    </h2>
                </div>

                <div
                    className="
            absolute
            bottom-0
            left-0
            right-0
            mx-auto
            flex
            w-full
            max-w-7xl
            items-end
            justify-between
            px-6
            py-16
            sm:px-8
          "
                >
                    <p
                        className="
              how-it-works-subtitle
              max-w-xl
              text-base
              font-light
              leading-relaxed
              text-black/70
              sm:text-lg
              md:text-xl
            "
                    >
                        A unified orchestration engine that coordinates
                        every coding agent, pull request, test suite,
                        and human checkpoint.
                    </p>

                    <span
                        className="
              hidden
              font-mono
              text-xs
              uppercase
              tracking-widest
              text-black/40
              sm:inline-block
            "
                    >
                        01 // Foundation
                    </span>
                </div>
            </div>
        );
    }
);

export default HowItWorks;