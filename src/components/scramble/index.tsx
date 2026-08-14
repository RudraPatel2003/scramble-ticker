import { ReactNode } from "react";

import { useScrambleContext } from "../../context/scramble-context.ts";

export function Scramble(): ReactNode {
  const { scramble } = useScrambleContext();

  return (
    <p
      className={`text-center font-mono text-base leading-relaxed tracking-wide text-balance ${
        scramble ? "text-emphasis" : "text-primary/50 italic"
      }`}
    >
      {scramble ?? "Generating scramble…"}
    </p>
  );
}
