import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="absolute top-5 left-1/2 z-50 w-[calc(100%-40px)] max-w-6xl -translate-x-1/2">
      <div className="flex h-14 items-center justify-between rounded-full border border-white/15 bg-white/6 px-6 shadow-[0_8px_30px_rgba(0,0,0,0.2)] backdrop-blur-sm">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center overflow-hidden rounded-full border border-white/20 bg-white/5">
            <Image
              src="/tryalanai_logo.jpg"
              alt="Alan logo"
              width={28}
              height={28}
              className="h-full w-full object-cover"
            />
          </div>

          <span className="text-sm font-medium tracking-wide text-white">
            Alan
          </span>
        </div>

        {/* Navigation */}
        <div className="hidden items-center gap-7 md:flex">
          {["Product", "How it works", "For teams", "Pricing", "Docs"].map(
            (item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replaceAll(" ", "-")}`}
                className="text-[13px] text-white/60 transition-colors duration-200 hover:text-white"
              >
                {item}
              </a>
            )
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">

          {/* Sign in */}
          <button
            className="
              rounded-full
              px-4
              py-2
              text-[13px]
              font-medium
              text-white/70
              transition-colors
              duration-200
              hover:bg-white/10
              hover:text-white
            "
          >
            Sign in
          </button>

          {/* Try Alan */}
          <button
            className="
              group
              inline-flex
              items-center
              gap-3
              rounded-full
              bg-white
              px-5
              py-2
              text-[13px]
              font-medium
              text-black
              transition-all
              duration-300
              hover:gap-4
              hover:bg-white/90
            "
          >
            <span>Try Alan</span>

            <ArrowRight
              className="
                size-4
                transition-transform
                duration-300
                group-hover:translate-x-1
              "
            />
          </button>

        </div>
      </div>
    </nav>
  );
}