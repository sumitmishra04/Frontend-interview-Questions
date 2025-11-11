function HotelList() {
  const [page, setPage] = useState(1);
  const { data } = useFetchHotels({ page });

  const loaderRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setPage(p => p + 1); // load next set
      }
    });
    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {data.map(h => <HotelCard key={h.id} {...h} />)}
      <div ref={loaderRef}></div>
    </>
  );
}

// The Intersection Observer API lets code register a callback function that is executed whenever an element they wish to monitor enters or exits another element (or the viewport), or when the amount by which the two intersect changes by a requested amount. This way, sites no longer need to do anything on the main thread to watch for this kind of element intersection, and the browser is free to optimize the management of intersections as it sees fit.



// Advanced optimization for hotel booking apps

// Images:

// Lazy load all hotel thumbnails below fold.

// But preload the first 3 visible ones eagerly.

// Data:

// Load results for first viewport only.

// Prefetch next batch when user scrolls 75%.

// Critical CSS: Inline above-the-fold styles.

// Non-critical JS: Defer or load after requestIdleCallback.

//               ┌───────────────────────────────┐
//               │  Above the fold (critical)    │
//               │  Hero image                   │
//               │  First 3 hotels               │
//               │  Price summary                │
//               └───────────────────────────────┘
//                             ↓
//               ┌───────────────────────────────┐
//               │  Below the fold (lazy)        │
//               │  More hotel cards             │
//               │  Reviews, map, footer         │
//               └───────────────────────────────┘
