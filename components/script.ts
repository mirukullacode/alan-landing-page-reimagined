import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

export function initStickyCards() {
  if (typeof window === "undefined") return;

  const lenis = new Lenis();
  lenis.on("scroll", ScrollTrigger.update);
  const tickerUpdate = (time: number) => {
    lenis.raf(time * 1000);
  };
  gsap.ticker.add(tickerUpdate);
  gsap.ticker.lagSmoothing(0);

  const cards = document.querySelectorAll<HTMLElement>(".sticky-cards .card");
  const totalCards = cards.length;
  if (totalCards === 0) return;

  const segmentSize = 1 / totalCards;
  const cardYOffset = 5;
  const cardScaleStep = 0.075;

  cards.forEach((card, index) => {
    gsap.set(card, {
      xPercent: -50,
      yPercent: -50 + index * cardYOffset,
      scale: 1 - index * cardScaleStep,
    });
  });

  const trigger = ScrollTrigger.create({
    trigger: ".sticky-cards",
    start: "top top",
    end: `+=${window.innerHeight * 6}px`,
    pin: true,
    pinSpacing: true,
    scrub: 1,
    onUpdate: (self) => {
      const progress = self.progress;
      const activeIndex = Math.min(
        Math.floor(progress / segmentSize),
        totalCards - 1
      );
      const segProgress = (progress - activeIndex * segmentSize) / segmentSize;

      cards.forEach((card, index) => {
        if (index < activeIndex) {
          gsap.set(card, {
            yPercent: -250,
            rotationX: 35,
          });
        } else if (index === activeIndex) {
          gsap.set(card, {
            yPercent: gsap.utils.interpolate(-50, -250, segProgress),
            rotationX: gsap.utils.interpolate(0, 35, segProgress),
            scale: 1,
          });
        } else {
          const behindIndex = index - activeIndex;
          const currentYOffset = (behindIndex - segProgress) * cardYOffset;
          const currentScale = 1 - (behindIndex - segProgress) * cardScaleStep;
          gsap.set(card, {
            yPercent: -50 + currentYOffset,
            rotationX: 0,
            scale: currentScale,
          });
        }
      });
    },
  });

  return () => {
    gsap.ticker.remove(tickerUpdate);
    lenis.destroy();
    trigger.kill();
  };
}