import { ReactNode } from "react";

import { useScramble } from "../../hooks/use-scramble.ts";
import { Scramble } from "../scramble/index.tsx";
import { Controls } from "./controls.tsx";

export function App(): ReactNode {
  const { scramble, isPlaying, msRemaining, next, toggle } = useScramble();

  return (
    <main className="flex h-full flex-col justify-center gap-2 bg-black px-5 py-4 text-primary">
      <header className="flex items-center justify-between gap-4 select-none drag">
        <h1 className="text-sm font-medium tracking-wide">Scramble Ticker</h1>

        <Controls isPlaying={isPlaying} msRemaining={msRemaining} onNext={next} onToggle={toggle} />
      </header>

      <Scramble scramble={scramble} />
    </main>
  );
}
