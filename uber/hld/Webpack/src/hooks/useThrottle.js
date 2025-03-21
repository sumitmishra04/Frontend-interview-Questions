import { useState, useEffect, useRef } from 'react';

export function useThrottle(value, interval) {
    const [throttledValue, setThrottledValue] = useState(value);
    const lastExecuted = useRef(Date.now());

    useEffect(() => {
        const now = Date.now();
        const timeElapsed = now - lastExecuted.current;

        if (timeElapsed >= interval) {
            setThrottledValue(value);
            lastExecuted.current = now;
        } else {
            const timerId = setTimeout(() => {
                setThrottledValue(value);
                lastExecuted.current = Date.now();
            }, interval - timeElapsed);

            return () => clearTimeout(timerId);
        }
    }, [value, interval]);

    return throttledValue;
}