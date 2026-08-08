"use client";

import { useEffect, useRef, useState } from "react";

interface UseCountdownReturn {
  readonly seconds:    number;
  readonly isFinished: boolean;
  readonly restart:    () => void;
}

/**
 * Reusable countdown timer hook.
 * @param initialSeconds  Total seconds to count down from (default 60).
 */
export function useCountdown(initialSeconds = 60): UseCountdownReturn {
  const [seconds, setSeconds]   = useState(initialSeconds);
  const intervalRef             = useRef<ReturnType<typeof setInterval> | null>(null);

  const clear = (): void => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const start = (): void => {
    clear();
    setSeconds(initialSeconds);
    intervalRef.current = setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) { clear(); return 0; }
        return s - 1;
      });
    }, 1000);
  };

  // Start on mount, clean up on unmount
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    start();
    return clear;
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return { seconds, isFinished: seconds === 0, restart: start };
}
