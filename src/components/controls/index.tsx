import { ReactNode } from "react";

import { useScrambleContext } from "../../context/scramble-context.ts";
import { NextIcon } from "../icons/next-icon.tsx";
import { PauseIcon } from "../icons/pause-icon.tsx";
import { PlayIcon } from "../icons/play-icon.tsx";
import { SettingsIcon } from "../icons/settings-icon.tsx";

const BUTTON_CLASS_NAME =
  "cursor-pointer rounded-md p-2 text-primary transition-colors hover:bg-white/10 hover:text-emphasis";

function formatCountdown(millisecondsRemaining: number): string {
  return `${Math.ceil(millisecondsRemaining / 1000)}s`;
}

export function Controls(): ReactNode {
  const { isPlaying, millisecondsRemaining, next, toggle } = useScrambleContext();

  return (
    <div className="flex items-center gap-2 no-drag">
      <span className="w-8 text-right font-mono text-xs text-primary/70 tabular-nums">
        {formatCountdown(millisecondsRemaining)}
      </span>

      <button className={BUTTON_CLASS_NAME} onClick={toggle} type="button">
        {isPlaying ? <PauseIcon className="size-4" /> : <PlayIcon className="size-4" />}
      </button>

      <button className={BUTTON_CLASS_NAME} onClick={next} type="button">
        <NextIcon className="size-4" />
      </button>

      <button className={BUTTON_CLASS_NAME} onClick={() => window.api.openSettings()} type="button">
        <SettingsIcon className="size-4" />
      </button>
    </div>
  );
}
