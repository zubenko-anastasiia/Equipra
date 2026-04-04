"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";

const easeOut = "cubic-bezier(0.16, 1, 0.3, 1)";

const useInView = <T extends HTMLElement>(
  options?: IntersectionObserverInit & { once?: boolean }
) => {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;

    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) {
          return;
        }

        if (entry.isIntersecting) {
          setInView(true);

          if (options?.once !== false) {
            observer.unobserve(node);
          }

          return;
        }

        if (options?.once === false) {
          setInView(false);
        }
      },
      {
        root: options?.root ?? null,
        rootMargin: options?.rootMargin ?? "-80px 0px",
        threshold: options?.threshold ?? 0.15,
      }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [options?.once, options?.root, options?.rootMargin, options?.threshold]);

  return { ref, inView };
};

type AnimatedImageSectionProps = {
  src: StaticImageData;
  alt: string;
  ariaLabel: string;
};

export function AnimatedImageSection({
  src,
  alt,
  ariaLabel,
}: AnimatedImageSectionProps) {
  const { ref, inView } = useInView<HTMLElement>({
    rootMargin: "-80px 0px",
  });

  return (
    <section
      ref={ref}
      aria-label={ariaLabel}
      className="relative w-full overflow-hidden bg-white"
    >
      <div
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(24px)",
          transition: `transform 0.85s ${easeOut} 0.12s, opacity 1s ease-out 0.2s`,
        }}
      >
        <Image
          src={src}
          alt={alt}
          className="h-auto w-full"
          priority={false}
          quality={85}
          sizes="100vw"
        />
      </div>
    </section>
  );
}
