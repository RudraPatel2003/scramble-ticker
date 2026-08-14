import { ReactNode } from "react";

import { useAppContext } from "../../context/app-context.ts";

export function Scramble(): ReactNode {
  const { scramble } = useAppContext();

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
