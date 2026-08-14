import { ReactNode } from "react";

import { useAppContext } from "../../context/app-context.ts";
import { IconButton } from "../icon-button/index.tsx";
import { NextIcon } from "../icons/next-icon.tsx";
import { PauseIcon } from "../icons/pause-icon.tsx";
import { PlayIcon } from "../icons/play-icon.tsx";
import { SettingsIcon } from "../icons/settings-icon.tsx";

function formatCountdown(millisecondsRemaining: number): string {
  return `${Math.ceil(millisecondsRemaining / 1000)}s`;
}

export function Controls(): ReactNode {
  const { isPlaying, millisecondsRemaining, next, setScreen, toggle } = useAppContext();

  return (
    <>
      <span className="w-8 text-right font-mono text-xs text-primary/70 tabular-nums">
        {formatCountdown(millisecondsRemaining)}
      </span>

      <IconButton onClick={toggle}>
        {isPlaying ? <PauseIcon className="size-4" /> : <PlayIcon className="size-4" />}
      </IconButton>

      <IconButton onClick={next}>
        <NextIcon className="size-4" />
      </IconButton>

      <IconButton onClick={() => setScreen("settings")}>
        <SettingsIcon className="size-4" />
      </IconButton>
    </>
  );
}
