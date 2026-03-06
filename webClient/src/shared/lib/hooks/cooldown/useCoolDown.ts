import { useCallback, useEffect, useRef, useState } from 'react';

type Options = {
    initialSeconds?: number;
    autoStart?: boolean;
};

export function useCooldown(
    seconds: number,
    { initialSeconds = seconds, autoStart = false }: Options = {},
) {
    const [secondsLeft, setSecondsLeft] = useState(() =>
        autoStart && initialSeconds > 0 ? initialSeconds : 0,
    );
    const intervalRef = useRef<number | null>(null);

    const clear = useCallback(() => {
        if (intervalRef.current !== null) {
            window.clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    }, []);

    const start = useCallback(
        (value: number = initialSeconds) => {
            if (value <= 0) return;
            setSecondsLeft(value);
        },
        [initialSeconds],
    );

    const reset = useCallback(() => {
        clear();
        setSecondsLeft(0);
    }, [clear]);

    useEffect(() => {
        if (secondsLeft <= 0) {
            clear();
            return;
        }

        clear();
        intervalRef.current = window.setInterval(() => {
            setSecondsLeft((current) => (current <= 1 ? 0 : current - 1));
        }, 1000);

        return clear;
    }, [secondsLeft, clear]);

    const isCoolingDown = secondsLeft > 0;

    return {
        secondsLeft,
        isCoolingDown,
        canRun: !isCoolingDown,
        start,
        reset,
    };
}
