"use client";

import { ReactLenis } from "lenis/react";

function SmoothScrolling({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{ duration: 1.2, smoothWheel: true, wheelMultiplier: 1.5 }}
    >
      {children}
    </ReactLenis>
  );
}

export default SmoothScrolling;
