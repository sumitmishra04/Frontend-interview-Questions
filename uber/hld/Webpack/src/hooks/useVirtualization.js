import { useState, useEffect, useCallback } from 'react';

export function useVirtualization(items, itemHeight, containerHeight) {
    const [visibleItems, setVisibleItems] = useState([]);
    const [scrollTop, setScrollTop] = useState(0);

    const getVisibleItems = useCallback(() => {
        const startIndex = Math.floor(scrollTop / itemHeight);
        const endIndex = Math.min(
            startIndex + Math.ceil(containerHeight / itemHeight) + 1,
            items.length
        );

        return items.slice(startIndex, endIndex).map((item, index) => ({
            ...item,
            index: startIndex + index,
            style: {
                position: 'absolute',
                top: (startIndex + index) * itemHeight,
                height: itemHeight
            }
        }));
    }, [items, itemHeight, containerHeight, scrollTop]);

    useEffect(() => {
        setVisibleItems(getVisibleItems());
    }, [getVisibleItems]);

    const handleScroll = useCallback((event) => {
        setScrollTop(event.target.scrollTop);
    }, []);

    return {
        visibleItems,
        totalHeight: items.length * itemHeight,
        handleScroll
    };
}