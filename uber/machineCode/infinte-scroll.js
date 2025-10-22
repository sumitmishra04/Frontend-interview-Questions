import "./styles.css";
import { useCallback, useDebugValue, useEffect, useRef, useState } from "react";

export default function InfinteScroll({ fetchMore, hasMore, renderItem }) {
  const [list, setList] = useState([]);
  const observerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchMore().then((newItems) => setList(newItems));
  }, []);

  const lastItemRef = useCallback(
    function triggerFetch(node) {
      // Early return if no node or no more items
      if (!node || !hasMore) return;

      // Cleanup previous observer
      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      // Track if the component is still mounted
      let isSubscribed = true;

      observerRef.current = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && hasMore && !isLoading) {
          setIsLoading(true);
          // Disconnect immediately to prevent multiple triggers
          observerRef.current.disconnect();

          fetchMore()
            .then((newItems) => {
              // Only update if component is still mounted
              if (isSubscribed) {
                setList((prev) => [...prev, ...newItems]);
              }
            })
            .catch((error) => {
              console.error("Error fetching more items:", error);
            })
            .finally(() => {
              if (isSubscribed) {
                setIsLoading(false);
              }
            });
        }
      });

      observerRef.current.observe(node);

      // Cleanup function
      return () => {
        isSubscribed = false;
        if (observerRef.current) {
          observerRef.current.disconnect();
        }
      };
    },
    [fetchMore, hasMore]
  );

  return (
    <div style={{ display: "flex", gap: "2px", flexDirection: "column" }}>
      Total Items Fetched ({list.length})
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
                key={index}
                style={{ listStyle: "none" }}
                ref={index === list.length - 1 ? lastItemRef : null}
              >
                {renderItem(item, index)}
              </li>
            );
          })}
          {isLoading && (
            <li key="loading" style={{ listStyle: "none" }}>
              Loading...
            </li>
          )}
        </ul>
      </div>
      {!hasMore && <p>End of list</p>}
    </div>
  );
}

// usage
const [hasMore, setHasMore] = useState(true);
const [infiniteScrollItems, setInfiniteScrollItems] = useState([]);
const pageSize = 10;

const fetchMore = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      const newItems = Array.from(
        { length: pageSize },
        (_, i) => `Item ${infiniteScrollItems.length + i + 1}`
      );
      const totalItems = [...infiniteScrollItems, ...newItems];
      if (totalItems.length === 30) setHasMore(false); // Stop after 50 items
      setInfiniteScrollItems(totalItems);
      resolve(newItems);
    }, 1000); // Simulate network delay
  });

const renderItem = (item) => <div>{item}</div>;