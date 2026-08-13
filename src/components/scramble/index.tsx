import { ReactNode } from "react";

type ScrambleProps = {
  scramble: string | null;
};

export function Scramble({ scramble }: ScrambleProps): ReactNode {
  return (
    <p className="text-center font-mono text-sm text-balance text-primary">
      {scramble ?? "Generating scramble…"}
    </p>
  );
}
