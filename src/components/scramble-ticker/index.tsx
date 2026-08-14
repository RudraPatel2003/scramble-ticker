import { ReactNode } from "react";

import { Controls } from "../controls/index.tsx";
import { Progress } from "../progress/index.tsx";
import { Scramble } from "../scramble/index.tsx";

export function ScrambleTicker(): ReactNode {
  return (
    <main className="relative flex h-full flex-col bg-surface">
      <header className="flex items-center justify-between gap-4 px-6 select-none drag">
        <h1 className="text-xs font-medium tracking-widest text-primary/60 uppercase">
          Scramble Ticker
        </h1>

        <Controls />
      </header>

      <div className="flex grow items-center justify-center px-6 pb-4">
        <Scramble />
      </div>

      <Progress />
    </main>
  );
}
