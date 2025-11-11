import { useState, useEffect, useCallback } from 'react';

export function useInfiniteScroll(callback, threshold = 100) {
    const [isFetching, setIsFetching] = useState(false);

    const handleScroll = useCallback(() => {
        const scrollHeight = document.documentElement.scrollHeight;
        const scrollTop = document.documentElement.scrollTop;
        const clientHeight = document.documentElement.clientHeight;

        if (scrollHeight - scrollTop <= clientHeight + threshold && !isFetching) {
            setIsFetching(true);
        }
    }, [threshold, isFetching]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    useEffect(() => {
        if (!isFetching) return;
        callback();
    }, [isFetching, callback]);

    return [isFetching, setIsFetching];
}