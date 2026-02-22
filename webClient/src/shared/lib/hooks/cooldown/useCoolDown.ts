import { useEffect, useRef, useState } from "react";

type Options = {
    initialSeconds?: number;
    autoStart?: boolean;
};

export function useCooldown(
    seconds: number,
    { initialSeconds = seconds, autoStart = false }: Options = {},
) {
    const [secondsLeft, setSecondsLeft] = useState(0);
    const intervalRef = useRef<number | null>(null);

    const clear = () => {
        if (intervalRef.current !== null) {
            window.clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };

    const start = (value: number = initialSeconds) => {
        if (value <= 0) return;
        setSecondsLeft(value);
    };

    const reset = () => {
        clear();
        setSecondsLeft(0);
    };

    useEffect(() => {
        if (secondsLeft <= 0) {
            clear();
            return;
        }

        clear();
        intervalRef.current = window.setInterval(() => {
            setSecondsLeft((s) => (s <= 1 ? 0 : s - 1));
        }, 1000);

        return clear;
    }, [secondsLeft]);

    useEffect(() => {
        if (autoStart) start(initialSeconds);
        return clear;
    }, []);

    const isCoolingDown = secondsLeft > 0;

    return {
        secondsLeft,
        isCoolingDown,
        canRun: !isCoolingDown,
        start,
        reset,
    };
}
