import { PauseIcon, PlayIcon, SettingsIcon, SkipForwardIcon } from "lucide-react";
import { ReactNode } from "react";

import { useAppContext } from "../../context/app-context.ts";
import { Button } from "../ui/button.tsx";

function formatCountdown(millisecondsRemaining: number): string {
  return `${Math.ceil(millisecondsRemaining / 1000)}s`;
}

export function Controls(): ReactNode {
  const { isPlaying, millisecondsRemaining, next, toggle } = useAppContext();

  return (
    <>
      <span className="w-8 text-right font-mono text-xs text-muted-foreground tabular-nums">
        {formatCountdown(millisecondsRemaining)}
      </span>

      <Button onClick={toggle} size="icon-sm" variant="ghost">
        {isPlaying ? <PauseIcon /> : <PlayIcon />}
      </Button>

      <Button onClick={next} size="icon-sm" variant="ghost">
        <SkipForwardIcon />
      </Button>

      <Button onClick={() => window.api.openSettings()} size="icon-sm" variant="ghost">
        <SettingsIcon />
      </Button>
    </>
  );
}
