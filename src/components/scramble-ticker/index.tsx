import { ReactNode } from "react";

import { useAppContext } from "../../context/app-context.ts";
import { Controls } from "../controls/index.tsx";
import { Header } from "../header/index.tsx";
import { Scramble } from "../scramble/index.tsx";
import { Progress } from "../ui/progress.tsx";

export function ScrambleTicker(): ReactNode {
  const { progress } = useAppContext();

  return (
    <main className="flex h-full flex-col gap-4 bg-background p-4">
      <Header title="Scramble Ticker">
        <Controls />
      </Header>

      <Scramble />

      <Progress value={progress * 100} />
    </main>
  );
}
