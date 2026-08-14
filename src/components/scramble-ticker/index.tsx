import { ReactNode } from "react";

import { Controls } from "../controls/index.tsx";
import { Header } from "../header/index.tsx";
import { Progress } from "../progress/index.tsx";
import { Scramble } from "../scramble/index.tsx";

export function ScrambleTicker(): ReactNode {
  return (
    <main className="relative flex h-full flex-col bg-surface">
      <Header title="Scramble Ticker">
        <Controls />
      </Header>

      <div className="flex grow items-center justify-center px-6 pb-4">
        <Scramble />
      </div>

      <Progress />
    </main>
  );
}
