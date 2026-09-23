"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

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

  useEffect(() => {
    // 1. Initialize Lenis Smooth Scroll with rich inertia & momentum
    const lenis = new Lenis({
      duration: 1.6,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.5,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    // 2. GSAP Card Stack Timeline with weighted buttery stretch
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".sticky-cards .card");
      const totalCards = cards.length;
      if (totalCards === 0 || !stickyRef.current) return;

      const cardYOffset = 4;
      const cardScaleStep = 0.05;
      const stepInterval = 1.2;
      const stepDuration = 1.0;

      // Position cards at initial stacked state
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

      // Position "Much more" behind cards
      if (muchMoreRef.current) {
        gsap.set(muchMoreRef.current, {
          xPercent: -50,
          yPercent: -50,
          opacity: 0,
          scale: 0.88,
        });
        const underline = muchMoreRef.current.querySelector(
          ".much-more-underline"
        );
        if (underline) {
          gsap.set(underline, { scaleX: 0, transformOrigin: "left center" });
        }
      }

      // Build ScrollTrigger Timeline with generous scroll distance & elastic scrub
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stickyRef.current,
          start: "top top",
          end: () => `+=${window.innerHeight * 7}px`,
          pin: true,
          pinSpacing: true,
          scrub: 1.8,
          invalidateOnRefresh: true,
        },
      });

      const underlineEl = muchMoreRef.current?.querySelector(
        ".much-more-underline"
      );

      for (let step = 0; step < totalCards; step++) {
        const currentCard = cards[step];
        const timePos = step * stepInterval;

        // Active card smoothly lifts, tilts, and floats upward
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

        // Cards behind gently slide forward to next stack slot
        for (let behind = step + 1; behind < totalCards; behind++) {
          const behindCard = cards[behind];
          const newRelativePos = behind - (step + 1);
          tl.to(
            behindCard,
            {
              yPercent: -50 + newRelativePos * cardYOffset,
              scale: 1 - newRelativePos * cardScaleStep,
              duration: stepDuration,
              ease: "power2.inOut",
            },
            timePos
          );
        }

        // On the final card peel, reveal "Much more"
        if (step === totalCards - 1 && muchMoreRef.current) {
          tl.to(
            muchMoreRef.current,
            {
              opacity: 1,
              scale: 1,
              duration: stepDuration,
              ease: "power2.out",
            },
            timePos + 0.1
          );

          if (underlineEl) {
            tl.to(
              underlineEl,
              {
                scaleX: 1,
                duration: stepDuration * 0.9,
                ease: "power2.out",
              },
              timePos + 0.2
            );
          }
        }
      }

      // Refresh ScrollTrigger to recalculate exact pin dimensions
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    }, containerRef);

    // 3. Cleanup on component unmount
    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      ctx.revert();
    };
  }, []);

  return (
    <div ref={containerRef} className="sticky-cards-wrapper w-full">
      <section ref={stickyRef} className="sticky-cards relative">
        {/* Centered "Much more" block right behind the card stack */}
        <div ref={muchMoreRef} className="much-more-reveal">
          <p className="text-xs uppercase tracking-[0.25em] text-white/50 mb-3 font-mono">
            And
          </p>

          <h2>Much more</h2>

          <a
            href="https://tryalan.ai/use-cases/"
            target="_blank"
            rel="noreferrer"
            className="much-more-btn group relative inline-flex items-center gap-3 pb-2 text-xl md:text-2xl font-medium text-white/90 transition-colors duration-300 hover:text-white"
          >
            <span>Explore all use-cases</span>
            <span className="flex size-7 items-center justify-center rounded-full bg-white/10 transition-transform duration-300">
              <ArrowRight className="size-4" />
            </span>
          </a>
        </div>

        {/* 5 Stacking 3D Sticky Cards */}
        <div className="cards">
          {CARDS_DATA.map((card) => (
            <div key={card.id} id={card.id} className="card">
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