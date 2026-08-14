import { ReactNode } from "react";

import { NextIcon } from "../icons/next-icon.tsx";
import { PauseIcon } from "../icons/pause-icon.tsx";
import { PlayIcon } from "../icons/play-icon.tsx";
import { SettingsIcon } from "../icons/settings-icon.tsx";

type ControlsProps = {
  isPlaying: boolean;
  msRemaining: number;
  onNext: () => void;
  onToggle: () => void;
}

const BUTTON_CLASS_NAME = "cursor-pointer transition-colors hover:text-white";

/** Rounded up so the countdown reads 10 down to 1 instead of 9 down to 0. */
function formatCountdown(msRemaining: number): string {
  return `${Math.ceil(msRemaining / 1000)}s`;
}

export function Controls({
  isPlaying,
  msRemaining,
  onNext,
  onToggle,
}: ControlsProps): ReactNode {
  return (
    <div className="flex items-center gap-3 no-drag">
      <span className="font-mono text-xs tabular-nums">{formatCountdown(msRemaining)}</span>

      <button className={BUTTON_CLASS_NAME} onClick={onToggle} type="button">
        {isPlaying ? <PauseIcon className="size-4" /> : <PlayIcon className="size-4" />}
      </button>

      <button className={BUTTON_CLASS_NAME} onClick={onNext} type="button">
        <NextIcon className="size-4" />
      </button>

      {/* Not wired up yet. */}
      <button className={BUTTON_CLASS_NAME} type="button">
        <SettingsIcon className="size-4" />
      </button>
    </div>
  );
}
