import { randomScrambleForEvent } from "cubing/scramble";
import { useCallback, useEffect, useRef, useState } from "react";

const COUNTDOWN_INTERVAL_MILLISECONDS = 100;

export type ScrambleTickerContext = {
  scramble: string | null;
  isPlaying: boolean;
  millisecondsRemaining: number;
  progress: number;
  next: () => void;
  toggle: () => void;
};

export function useScramble(eventId: string, intervalSeconds: number): ScrambleTickerContext {
  const tickIntervalMilliseconds = intervalSeconds * 1000;

  const [scramble, setScramble] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [millisecondsRemaining, setMillisecondsRemaining] = useState(tickIntervalMilliseconds);

  const requestId = useRef(0);

  const deadline = useRef(0);
  const remaining = useRef(tickIntervalMilliseconds);

  const setRemaining = useCallback((milliseconds: number): void => {
    remaining.current = milliseconds;

    setMillisecondsRemaining(milliseconds);
  }, []);

  const generate = useCallback(async (): Promise<void> => {
    requestId.current += 1;
    const id = requestId.current;

    const algorithm = await randomScrambleForEvent(eventId);

    if (id === requestId.current) {
      setScramble(algorithm.toString());
    }
  }, [eventId]);

  const next = useCallback((): void => {
    deadline.current = Date.now() + tickIntervalMilliseconds;

    setRemaining(tickIntervalMilliseconds);

    void generate();
  }, [generate, setRemaining, tickIntervalMilliseconds]);

  const toggle = useCallback((): void => {
    setIsPlaying((playing) => !playing);
  }, []);

  useEffect(() => {
    next();

    return (): void => {
      requestId.current += 1;
    };
  }, [next]);

  useEffect(() => {
    if (!isPlaying) {
      return;
    }

    deadline.current = Date.now() + remaining.current;

    const intervalId = setInterval(() => {
      const millisecondsLeft = deadline.current - Date.now();

      if (millisecondsLeft > 0) {
        setRemaining(millisecondsLeft);

        return;
      }

      deadline.current = Date.now() + tickIntervalMilliseconds;

      setRemaining(tickIntervalMilliseconds);

      void generate();
    }, COUNTDOWN_INTERVAL_MILLISECONDS);

    return (): void => clearInterval(intervalId);
  }, [generate, isPlaying, setRemaining, tickIntervalMilliseconds]);

  return {
    scramble,
    isPlaying,
    millisecondsRemaining,
    progress: millisecondsRemaining / tickIntervalMilliseconds,
    next,
    toggle,
  };
}
