import "./styles.css";
import { useCallback, useEffect, useRef, useState } from "react";

export default function InfinteScroll({ fetchMore, hasMore, renderItem }) {
    const [list, setList] = useState([]);
    const observerRef = useRef(null);

    useEffect(() => {
        fetchMore().then((newItems) => setList(newItems));
    }, []);

    const lastItemRef = useCallback(
        (node) => {
            if (!hasMore || !node) return;
            if (observerRef.current) observerRef.current.disconnect();

            observerRef.current = new IntersectionObserver(([entry]) => {
                if (entry.isIntersecting) {
                    fetchMore().then((newItems) => {
                        setList((prev) => [...prev, ...newItems]);
                    });
                }
            });

            observerRef.current.observe(node);
        },
        [hasMore, fetchMore]
    );

    return (
        <div style={{ display: "flex", gap: "2px", flexDirection: "column" }}>
            Infinite Scroll
            <div>
                <ul
                    style={{
                        border: "1px solid",
                        padding: "10px",
                        height: "100px",
                        width: "fit-content",
                        overflow: "auto",
                    }}
                >
                    {list.map((item, index) => {
                        return (
                            <li
                                style={{ listStyle: "none" }}
                                ref={index === list.length - 1 ? lastItemRef : null}
                            >
                                {renderItem(item, index)}
                            </li>
                        );
                    })}
                </ul>
            </div>
            {!hasMore && <p>End of list</p>}
        </div>
    );
}


const staticData = Array.from({ length: 50 }, (_, i) => `Item ${i + 1}`);

const fetchStaticData = async (start, limit) => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(staticData.slice(start, start + limit)), 500);
    });
};

export default function App() {

    const [start, setStart] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    const fetchMore = async () => {
        const newItems = await fetchStaticData(start, 10);
        setStart((prev) => prev + 10);
        if (newItems.length === 0) setHasMore(false);
        return newItems;
    };

    return (
        <div className="App">
            <InfinteScroll
                fetchMore={fetchMore}
                hasMore={hasMore}
                renderItem={(item) => <p>{item}</p>}
            />
        </div>
    );
}
