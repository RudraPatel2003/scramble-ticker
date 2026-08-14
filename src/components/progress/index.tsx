import { ReactNode } from "react";

import { useScrambleContext } from "../../context/scramble-context.ts";

export function Progress(): ReactNode {
  const { progress } = useScrambleContext();

  return (
    <div className="absolute inset-x-0 bottom-0 h-px bg-white/10">
      <div className="h-full bg-primary/50" style={{ width: `${progress * 100}%` }} />
    </div>
  );
}
