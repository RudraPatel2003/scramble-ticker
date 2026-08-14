import { ReactNode } from "react";

import { useAppContext } from "../../context/app-context.ts";

export function Scramble(): ReactNode {
  const { scramble } = useAppContext();

  return (
    <div className="flex grow items-center justify-center rounded-xl border bg-card px-4">
      <p
        className={`text-center font-mono text-base leading-relaxed tracking-wide text-balance ${
          scramble ? "text-card-foreground" : "text-muted-foreground italic"
        }`}
      >
        {scramble ?? "Generating scramble…"}
      </p>
    </div>
  );
}
