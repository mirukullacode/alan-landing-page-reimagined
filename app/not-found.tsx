import Link from "next/link";
import OceanText404 from "@/components/Oceantext404";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "404 — Page not found",
};

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#111111] text-white">
      <OceanText404 />
      <Button
  className="
    group
    relative
    overflow-hidden
    border-2
    border-white
    bg-[#111111]
    text-white
    transition-all
    duration-500
    ease-[cubic-bezier(0.22,1,0.36,1)]
    hover:-translate-y-0.5
    hover:text-black
    hover:shadow-[0_8px_30px_rgba(255,255,255,0.12)]
  "
>
  <span
    className="
      absolute
      inset-0
      origin-bottom
      scale-y-0
      bg-white
      transition-transform
      duration-500
      ease-[cubic-bezier(0.22,1,0.36,1)]
      group-hover:scale-y-100
    "
  />

  <span className="relative z-10 flex items-center justify-between">
    <ArrowLeft/> Back to Home
  </span>
</Button>
<p className="pt-4">
  This page doesn't exist. Please go back to home.
</p>
    </main>
  );
}