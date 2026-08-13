import { randomScrambleForEvent } from "cubing/scramble";
import { useCallback, useEffect, useRef, useState } from "react";

/** WCA event ID for the 3x3x3 cube. */
const EVENT_ID = "333";

/** How long a single scramble stays on screen. */
const TICK_INTERVAL_MS = 10_000;

/** How often the countdown is refreshed while playing. */
const COUNTDOWN_INTERVAL_MS = 100;

export type ScrambleTicker = {
  /** The current scramble, or `null` while the first one is generating. */
  scramble: string | null;
  isPlaying: boolean;
  /** Time until the scramble is replaced. Frozen while paused. */
  msRemaining: number;
  /** Skip to a fresh scramble and restart the countdown. */
  next: () => void;
  toggle: () => void;
}

/** Drives a 3x3x3 scramble that is replaced every 10 seconds while playing. */
export function useScramble(): ScrambleTicker {
  const [scramble, setScramble] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [msRemaining, setMsRemaining] = useState(TICK_INTERVAL_MS);

  // Generation is async, so each request is tagged and only the newest one is
  // allowed to land. Unmounting bumps the tag to discard whatever is in flight.
  const requestId = useRef(0);

  // The countdown runs off a wall-clock deadline so it cannot drift. The
  // remaining time is mirrored into a ref so resuming picks up where it
  // stopped without making the interval effect depend on every tick.
  const deadline = useRef(0);
  const remaining = useRef(TICK_INTERVAL_MS);

  const setRemaining = useCallback((ms: number): void => {
    remaining.current = ms;

    setMsRemaining(ms);
  }, []);

  const generate = useCallback(async (): Promise<void> => {
    requestId.current += 1;
    const id = requestId.current;

    const alg = await randomScrambleForEvent(EVENT_ID);

    if (id === requestId.current) {
      setScramble(alg.toString());
    }
  }, []);

  const next = useCallback((): void => {
    deadline.current = Date.now() + TICK_INTERVAL_MS;

    setRemaining(TICK_INTERVAL_MS);

    void generate();
  }, [generate, setRemaining]);

  const toggle = useCallback((): void => {
    setIsPlaying((playing) => !playing);
  }, []);

  useEffect(() => {
    void generate();

    return (): void => {
      requestId.current += 1;
    };
  }, [generate]);

  useEffect(() => {
    if (!isPlaying) {
      return;
    }

    deadline.current = Date.now() + remaining.current;

    const intervalId = setInterval(() => {
      const left = deadline.current - Date.now();

      if (left > 0) {
        setRemaining(left);

        return;
      }

      deadline.current = Date.now() + TICK_INTERVAL_MS;

      setRemaining(TICK_INTERVAL_MS);

      void generate();
    }, COUNTDOWN_INTERVAL_MS);

    return (): void => clearInterval(intervalId);
  }, [generate, isPlaying, setRemaining]);

  return { scramble, isPlaying, msRemaining, next, toggle };
}
