import React, { useState, useEffect } from "react";
import { Search, MapPin, Coffee, Building, Trees as Tree } from "lucide-react";
import { useDebounce } from "../hooks/useDebounce";
import { useThrottle } from "../hooks/useThrottle";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import { useImageOptimization } from "../hooks/useImageOptimization";
import { useVirtualization } from "../hooks/useVirtualization";
import * as styles from "./About.module.css";

const HEADER_IMAGE =
  "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&q=80";

const About = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [landmarks, setLandmarks] = useState([]);
  const [filteredLandmarks, setFilteredLandmarks] = useState([]);
  const [page, setPage] = useState(1);
  const [scrollPosition, setScrollPosition] = useState(0);

  // Debounced search
  const debouncedSearch = useDebounce(searchTerm, 500);

  // Throttled scroll position
  const throttledScroll = useThrottle(scrollPosition, 100);

  // Image optimization for header
  const { imageSrc: optimizedHeaderImage } = useImageOptimization(
    HEADER_IMAGE,
    {
      width: 1920,
      quality: 90,
    }
  );

  // Virtualization for landmarks list
  const ITEM_HEIGHT = 100;
  const CONTAINER_HEIGHT = 600;
  const { visibleItems, totalHeight, handleScroll } = useVirtualization(
    filteredLandmarks,
    ITEM_HEIGHT,
    CONTAINER_HEIGHT
  );

  // Infinite scroll
  const [isFetching, setIsFetching] = useInfiniteScroll(() => {
    loadMoreLandmarks();
  });

  const loadMoreLandmarks = async () => {
    // Simulated API call with more realistic data
    const newLandmarks = [
      {
        id: page * 10 + 1,
        name: "Cubbon Park",
        type: "Park",
        description: "A major green space in the heart of the city",
      },
      {
        id: page * 10 + 2,
        name: "UB City",
        type: "Shopping",
        description: "Luxury shopping and dining destination",
      },
      {
        id: page * 10 + 3,
        name: "Vidhana Soudha",
        type: "Government",
        description: "Seat of state legislature",
      },
      {
        id: page * 10 + 4,
        name: "Lalbagh Botanical Garden",
        type: "Park",
        description: "Historic botanical garden",
      },
      {
        id: page * 10 + 5,
        name: "MG Road",
        type: "Shopping",
        description: "Major commercial street",
      },
    ];

    setLandmarks((prev) => [...prev, ...newLandmarks]);
    setPage((prev) => prev + 1);
    setIsFetching(false);
  };

  // Effect for debounced search
  useEffect(() => {
    const filtered = landmarks.filter(
      (landmark) =>
        landmark.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        landmark.type.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        landmark.description
          .toLowerCase()
          .includes(debouncedSearch.toLowerCase())
    );
    setFilteredLandmarks(filtered);
  }, [debouncedSearch, landmarks]);

  // Effect for throttled scroll
  useEffect(() => {
    // Update header opacity based on scroll position
    const header = document.querySelector(`.${styles.headerContent}`);
    if (header) {
      const opacity = Math.max(0.4, Math.min(0.8, 0.4 + throttledScroll / 500));
      header.style.backgroundColor = `rgba(0, 0, 0, ${opacity})`;
    }
  }, [throttledScroll]);

  useEffect(() => {
    loadMoreLandmarks();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleWindowScroll = (e) => {
    setScrollPosition(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleWindowScroll);
    return () => window.removeEventListener("scroll", handleWindowScroll);
  }, []);

  return (
    <div className={styles.container}>
      {/* Search Bar */}
      <div className={styles.searchBar}>
        <div className={styles.searchBarInner}>
          <Search size={20} color="#9CA3AF" />
          <input
            type="text"
            placeholder="Search places in Bangalore..."
            className={styles.searchInput}
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>

      {/* Header */}
      <header className={styles.header}>
        <img
          src={optimizedHeaderImage}
          alt="Bangalore cityscape"
          className={styles.headerImage}
        />
        <div className={styles.headerContent}>
          <div>
            <h1>Welcome to Bangalore</h1>
            <p>The Silicon Valley of India</p>
          </div>
        </div>
      </header>

      {/* Quick Facts */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Quick Facts</h2>
        <div className={styles.quickFacts}>
          <div className={styles.factItem}>
            <MapPin className={styles.factIcon} />
            <div className={styles.factContent}>
              <h3>Location</h3>
              <p>Karnataka, India</p>
            </div>
          </div>
          <div className={styles.factItem}>
            <Building className={styles.factIcon} />
            <div className={styles.factContent}>
              <h3>Population</h3>
              <p>12.3 Million</p>
            </div>
          </div>
          <div className={styles.factItem}>
            <Tree className={styles.factIcon} />
            <div className={styles.factContent}>
              <h3>Known For</h3>
              <p>Garden City</p>
            </div>
          </div>
        </div>
      </section>

      {/* Virtualized Landmarks List */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          Popular Landmarks
          {searchTerm && (
            <span className={styles.searchResults}>
              ({filteredLandmarks.length} results)
            </span>
          )}
        </h2>
        <div
          className={styles.virtualizedList}
          onScroll={handleScroll}
          style={{ height: CONTAINER_HEIGHT }}
        >
          <div style={{ height: totalHeight, position: "relative" }}>
            {visibleItems.map((item) => (
              <div key={item.id} className={styles.listItem} style={item.style}>
                <h3>{item.name}</h3>
                <p>{item.type}</p>
                <p className={styles.itemDescription}>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Loading Indicator */}
      {isFetching && (
        <div className={styles.loadingSpinner}>
          <Coffee size={24} className="animate-spin" />
        </div>
      )}
    </div>
  );
};

export default About;
