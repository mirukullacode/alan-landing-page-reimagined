"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const CARDS_DATA = [
  {
    id: "card-1",
    tag: "01 / Code Review",
    title: "Review every PR with agents that know your standards",
    image:
      "https://i.pinimg.com/736x/15/14/9d/15149d5a2ebc7e8bfacab2ade20485f5.jpg",
  },
  {
    id: "card-2",
    tag: "02 / Test Coverage",
    title: "Coverage that climbs, suits that stay green",
    image:
      "https://i.pinimg.com/736x/e2/70/63/e2706368415c911033e9c4f5827a7d99.jpg",
  },
  {
    id: "card-3",
    tag: "03 / Migrations",
    title: "Modernizations as a program, not a weekend project",
    image:
      "https://i.pinimg.com/1200x/b9/82/f4/b982f4af9cb6df60cab1b27b8e3ad57b.jpg",
  },
  {
    id: "card-4",
    tag: "04 / Automations",
    title: "Recurring engineering work as a repeatable workflow",
    image:
      "https://i.pinimg.com/736x/f4/28/2f/f4282f5e07fac477deb7be7888c31c24.jpg",
  },
  {
    id: "card-5",
    tag: "05 / Team Standards",
    title: "Your best workflow becomes everyone's default",
    image:
      "https://i.pinimg.com/736x/29/c2/b4/29c2b4182b36889366500a2e396b5742.jpg",
  },
];

export default function Stickycards() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLElement>(null);

  const muchMoreRef = useRef<HTMLDivElement>(null);
  const howItWorksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!stickyRef.current) return;

      const cards = gsap.utils.toArray<HTMLElement>(
        ".sticky-cards .card"
      );

      const totalCards = cards.length;

      if (!totalCards) return;

      /*
       * ------------------------------------------------------------
       * CONFIG
       * ------------------------------------------------------------
       */

      const cardYOffset = 4;
      const cardScaleStep = 0.05;

      const stepInterval = 1.2;
      const stepDuration = 1;

      /*
       * ------------------------------------------------------------
       * INITIAL CARD STATES
       * ------------------------------------------------------------
       */

      cards.forEach((card, index) => {
        gsap.set(card, {
          xPercent: -50,
          yPercent: -50 + index * cardYOffset,
          scale: 1 - index * cardScaleStep,
          rotationX: 0,
          opacity: 1,
          transformOrigin: "center bottom",
        });
      });

      /*
       * ------------------------------------------------------------
       * MUCH MORE INITIAL STATE
       * ------------------------------------------------------------
       */

      if (muchMoreRef.current) {
        gsap.set(muchMoreRef.current, {
          xPercent: -50,
          yPercent: -50,
          opacity: 0,
          scale: 0.88,
        });
      }

      /*
       * ------------------------------------------------------------
       * HOW IT WORKS INITIAL STATE
       * ------------------------------------------------------------
       *
       * It lives INSIDE the same pinned section.
       *
       * It is NOT pinned separately.
       */

      if (howItWorksRef.current) {
        const heading = howItWorksRef.current.querySelector(
          ".how-it-works-heading"
        );

        const badge = howItWorksRef.current.querySelector(
          ".how-it-works-badge"
        );

        const subtitle = howItWorksRef.current.querySelector(
          ".how-it-works-subtitle"
        );

        if (heading) {
          gsap.set(heading, {
            x: "100vw",
          });
        }

        if (badge) {
          gsap.set(badge, {
            x: "100vw",
          });
        }

        if (subtitle) {
          gsap.set(subtitle, {
            x: "100vw",
          });
        }
      }

      /*
       * ------------------------------------------------------------
       * MUCH MORE ELEMENTS
       * ------------------------------------------------------------
       */

      const muchMoreText = muchMoreRef.current?.querySelectorAll(
        ".much-more-label, .much-more-title, .much-more-btn"
      );

      const muchMoreArrow = muchMoreRef.current?.querySelector(
        ".much-more-arrow"
      );

      /*
       * ------------------------------------------------------------
       * MAIN TIMELINE
       * ------------------------------------------------------------
       */

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stickyRef.current,

          start: "top top",

          /*
           * Cards + Much More + How It Works
           * all happen inside this ONE pinned timeline.
           */
          end: () => `+=${window.innerHeight * 7.5}px`,

          pin: true,
          pinSpacing: true,

          scrub: 1.4,

          invalidateOnRefresh: true,

          anticipatePin: 1,
        },
      });

      /*
       * ------------------------------------------------------------
       * CARD STACK ANIMATION
       * ------------------------------------------------------------
       */

      for (let step = 0; step < totalCards; step++) {
        const currentCard = cards[step];

        const timePos = step * stepInterval;

        /*
         * Current card flies away.
         */
        tl.to(
          currentCard,
          {
            yPercent: -230,
            rotationX: 25,
            opacity: 0,
            duration: stepDuration,
            ease: "power2.inOut",
          },
          timePos
        );

        /*
         * Cards behind move forward.
         */
        for (
          let behind = step + 1;
          behind < totalCards;
          behind++
        ) {
          const behindCard = cards[behind];

          const newRelativePos =
            behind - (step + 1);

          tl.to(
            behindCard,
            {
              yPercent:
                -50 + newRelativePos * cardYOffset,

              scale:
                1 - newRelativePos * cardScaleStep,

              duration: stepDuration,

              ease: "power2.inOut",
            },
            timePos
          );
        }

        /*
         * --------------------------------------------------------
         * LAST CARD → MUCH MORE
         * --------------------------------------------------------
         */

        if (
          step === totalCards - 1 &&
          muchMoreRef.current
        ) {
          const muchMoreStart =
            timePos + 0.15;

          /*
           * Much More appears.
           */
          tl.to(
            muchMoreRef.current,
            {
              opacity: 1,
              scale: 1,
              duration: stepDuration,
              ease: "power2.out",
            },
            muchMoreStart
          );
        }
      }

      /*
       * ------------------------------------------------------------
       * HOW IT WORKS TRANSITION
       * ------------------------------------------------------------
       *
       * IMPORTANT:
       *
       * This happens AFTER Much More has appeared.
       *
       * The user scrolls again.
       *
       * Much More moves left.
       * How It Works enters from right.
       * Background changes black → white.
       * Text changes white → black.
       * All at the same time.
       * ------------------------------------------------------------
       */

      if (
        muchMoreRef.current &&
        howItWorksRef.current
      ) {
        const transitionStart =
          totalCards * stepInterval + 0.8;

        const transitionDuration = 2;

        const heading =
          howItWorksRef.current.querySelector(
            ".how-it-works-heading"
          );

        const badge =
          howItWorksRef.current.querySelector(
            ".how-it-works-badge"
          );

        const subtitle =
          howItWorksRef.current.querySelector(
            ".how-it-works-subtitle"
          );

        /*
         * --------------------------------------------------------
         * MUCH MORE → MOVE LEFT
         * --------------------------------------------------------
         */

        tl.to(
          muchMoreRef.current,
          {
            xPercent: -170,
            ease: "none",
            duration: transitionDuration,
          },
          transitionStart
        );

        /*
         * --------------------------------------------------------
         * MUCH MORE → BLACK TEXT
         * --------------------------------------------------------
         */

        if (muchMoreText) {
          tl.to(
            muchMoreText,
            {
              color: "#000000",
              duration: transitionDuration,
              ease: "power2.inOut",
            },
            transitionStart
          );
        }

        /*
         * Arrow circle → dark/light version.
         */

        if (muchMoreArrow) {
          tl.to(
            muchMoreArrow,
            {
              backgroundColor:
                "rgba(0,0,0,0.06)",

              color: "#000000",

              duration: transitionDuration,

              ease: "power2.inOut",
            },
            transitionStart
          );
        }

        /*
         * --------------------------------------------------------
         * BACKGROUND BLACK → WHITE
         * --------------------------------------------------------
         */

        tl.to(
          stickyRef.current,
          {
            backgroundColor: "#ffffff",

            duration: transitionDuration,

            ease: "power2.inOut",
          },
          transitionStart
        );

        /*
         * --------------------------------------------------------
         * HOW IT WORKS HEADING → ENTER FROM RIGHT
         * --------------------------------------------------------
         */

        if (heading) {
          tl.to(
            heading,
            {
              x: "-15vw",

              duration: transitionDuration,

              ease: "power3.out",
            },
            transitionStart
          );
        }

        /*
         * Badge enters with heading.
         */

        if (badge) {
          tl.to(
            badge,
            {
              x: "0",

              duration: transitionDuration,

              ease: "power3.out",
            },
            transitionStart + 0.15
          );
        }

        /*
         * Subtitle enters slightly later.
         */

        if (subtitle) {
          tl.to(
            subtitle,
            {
              x: "0",

              duration: transitionDuration,

              ease: "power3.out",
            },
            transitionStart + 0.25
          );
        }
      }

      /*
       * ------------------------------------------------------------
       * REFRESH
       * ------------------------------------------------------------
       */

      ScrollTrigger.sort();

      ScrollTrigger.refresh();
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="sticky-cards-wrapper w-full"
    >
      <section
        ref={stickyRef}
        className="
          sticky-cards
          relative
          h-screen
          w-full
          overflow-hidden
          bg-black
          select-none
        "
      >
        {/* ======================================================
            MUCH MORE
        ======================================================= */}

        <div
          ref={muchMoreRef}
          className="
            much-more-reveal
            absolute
            left-1/2
            top-1/2
            z-20
            w-[90%]
            max-w-4xl
            -translate-y-1/2
            text-center
          "
        >
          <p
            className="
              much-more-label
              mb-3
              font-mono
              text-xs
              uppercase
              tracking-[0.25em]
              text-white/50
            "
          >
            And
          </p>

          <h2
            className="
              much-more-title
              mb-8
              font-[var(--font-instrument-serif)]
              text-7xl
              font-normal
              leading-none
              tracking-tight
              text-white
              sm:text-8xl
              md:text-9xl
            "
          >
            Much more
          </h2>

          <a
            href="https://tryalan.ai/use-cases/"
            target="_blank"
            rel="noreferrer"
            className="
              much-more-btn
              group
              inline-flex
              items-center
              gap-3
              pb-2
              text-xl
              font-medium
              text-white/90
              transition-colors
              duration-300
              md:text-2xl
            "
          >
            <span>Explore all use-cases</span>

            <span
              className="
                much-more-arrow
                flex
                size-8
                items-center
                justify-center
                rounded-full
                bg-white/10
                text-white
                transition-transform
                duration-300
                group-hover:translate-x-1
              "
            >
              <ArrowRight className="size-4" />
            </span>
          </a>
        </div>

        {/* ======================================================
            HOW IT WORKS
           
            PRESENTATIONAL ONLY.

            NO ScrollTrigger.
            NO PIN.
        ======================================================= */}

        <div
          ref={howItWorksRef}
          className="
            how-it-works-layer
            pointer-events-none
            absolute
            inset-0
            z-30
            overflow-hidden
          "
        >
          {/* Top row */}

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

          {/* Main heading */}

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

          {/* Bottom content */}

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

        {/* ======================================================
            CARDS
        ======================================================= */}

        <div className="cards absolute inset-0 z-10">
          {CARDS_DATA.map((card) => (
            <div
              key={card.id}
              id={card.id}
              className="card"
            >
              <div className="col">
                <p>{card.tag}</p>

                <h1>{card.title}</h1>
              </div>

              <div className="col">
                <Image
                  src={card.image}
                  alt={card.title}
                  width={800}
                  height={600}
                  unoptimized
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}