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
  const stickyRef = useRef<HTMLDivElement>(null);

  const muchMoreRef = useRef<HTMLDivElement>(null);
  const engineeringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const sticky = stickyRef.current;

      if (!sticky) return;

      const cards = gsap.utils.toArray<HTMLElement>(
        ".sticky-cards .card"
      );

      const totalCards = cards.length;

      if (!totalCards) return;


      const cardYOffset = 4;
      const cardScaleStep = 0.05;

      const stepInterval = 1.2;
      const stepDuration = 1;


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


      let underlineEl: Element | null = null;

      if (muchMoreRef.current) {
        gsap.set(muchMoreRef.current, {
          xPercent: -50,
          yPercent: -50,
          opacity: 0,
          scale: 0.88,
        });

        underlineEl = muchMoreRef.current.querySelector(
          ".much-more-underline"
        );

        if (underlineEl) {
          gsap.set(underlineEl, {
            scaleX: 0,
            transformOrigin: "left center",
          });
        }
      }


      if (engineeringRef.current) {
        gsap.set(engineeringRef.current, {
          x: "100vw",
          yPercent: -50,
        });
      }


      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sticky,

          start: "top top",

          end: () => `+=${window.innerHeight * 9}px`,

          pin: true,

          pinSpacing: true,

          scrub: 1.4,

          invalidateOnRefresh: true,

          anticipatePin: 1,
        },
      });


      let lastStepEnd = 0;

      for (let step = 0; step < totalCards; step++) {
        const currentCard = cards[step];

        const timePos = step * stepInterval;

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
                -50 +
                newRelativePos * cardYOffset,

              scale:
                1 -
                newRelativePos * cardScaleStep,

              duration: stepDuration,

              ease: "power2.inOut",
            },
            timePos
          );
        }


        if (
          step === totalCards - 1 &&
          muchMoreRef.current
        ) {
          const muchMoreStart =
            timePos + 0.1;

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

          if (underlineEl) {
            tl.to(
              underlineEl,
              {
                scaleX: 1,

                duration:
                  stepDuration * 0.9,

                ease: "power2.out",
              },
              muchMoreStart + 0.1
            );
          }

          lastStepEnd = Math.max(
            muchMoreStart + stepDuration,

            muchMoreStart +
            0.1 +
            stepDuration * 0.9
          );
        }
      }


      const transitionStart =
        lastStepEnd + 0.5;


      if (muchMoreRef.current) {
        tl.to(
          muchMoreRef.current,
          {
            xPercent: -160,

            opacity: 0,

            scale: 0.94,

            duration: 1.2,

            ease: "power2.inOut",
          },
          transitionStart
        );
      }


      if (engineeringRef.current) {
        tl.to(
          engineeringRef.current,
          {
            x: () => {
              const width =
                engineeringRef.current?.offsetWidth ?? 0;

              return -(window.innerWidth + width);
            },

            duration: 3.5,

            ease: "none",
          },
          transitionStart + 0.8
        );
      }


      const refreshTimer = window.setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);

      return () => {
        window.clearTimeout(refreshTimer);
      };
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
        "
      >

        <div
          ref={muchMoreRef}
          className="much-more-reveal"
        >
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-white/50">
            And
          </p>

          <h2>
            Much more
          </h2>

          <a
            href="https://tryalan.ai/use-cases/"
            target="_blank"
            rel="noreferrer"
            className="
              much-more-btn
              group
              relative
              inline-flex
              items-center
              gap-3
              pb-2
              text-xl
              font-medium
              text-white/90
              transition-colors
              duration-300
              hover:text-white
              md:text-2xl
            "
          >
            <span>
              Explore all use-cases
            </span>

            <span
              className="
                flex
                size-7
                items-center
                justify-center
                rounded-full
                bg-white/10
                transition-transform
                duration-300
                group-hover:translate-x-1
              "
            >
              <ArrowRight className="size-4" />
            </span>
          </a>
        </div>


        <div
          className="
            pointer-events-none
            absolute
            inset-0
            z-30
            flex
            items-center
            overflow-hidden
          "
        >
          <div
            ref={engineeringRef}
            className="
              absolute
              left-full
              top-1/2
              whitespace-nowrap
              will-change-transform
            "
          >
            <h2
              className="
                whitespace-nowrap
                font-[var(--font-instrument-serif)]
                text-[clamp(4.5rem,12vw,15rem)]
                font-normal
                leading-none
                tracking-tight
                text-white
              "
            >
              One Engineering Brain. One Execution Layer.
            </h2>
          </div>
        </div>

        <div className="cards">
          {CARDS_DATA.map((card) => (
            <div
              key={card.id}
              id={card.id}
              className="card"
            >
              <div className="col">
                <p>{card.tag}</p>

                <h1>
                  {card.title}
                </h1>
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