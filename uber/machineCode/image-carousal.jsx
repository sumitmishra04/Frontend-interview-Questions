import "./styles.css";
import { useEffect, useRef, useState } from "react";

export default function ImageCarousal({
  images,
  autoplay,
  delay = 2000,
  currentSelection,
  cyclic = true,
}) {
  const [current, setCurrent] = useState(0);
  let timerRef = useRef();

  useEffect(() => {
    currentSelection?.(images[current]);
  }, current);

  const handlePrev = () => {
    if (cyclic) {
      setCurrent((value) => (value > 0 ? value - 1 : images.length - 1));
    } else {
      setCurrent((value) => (value > 0 ? value - 1 : 0));
    }
  };

  const handleNext = () => {
    if (cyclic) {
      setCurrent((value) => (value !== images.length - 1 ? value + 1 : 0));
    } else {
      setCurrent((value) => (value !== images.length - 1 ? value + 1 : value));
    }
  };

  useEffect(() => {
    if (autoplay) {
      timerRef.current = setInterval(handleNext, delay);
    }

    return () => clearInterval(timerRef.current);
  }, [autoplay, delay, current]);

  return (
    <div style={{ display: "flex", width: "600px", height: "300px" }}>
      <button disabled={!cyclic && current === 0} onClick={handlePrev}>
        Prev
      </button>
      <div
        style={{
          display: "flex",
          height: "100%",
          position: "relative",
        }}
      >
        <img
          src={images[current]?.url}
          style={{ width: "600px", objectFit: "cover" }}
        />
        <p
          style={{
            position: "absolute",
            bottom: 0,
            right: "50%",
          }}
        >
          {images[current]?.title}
        </p>
      </div>
      <button
        disabled={!cyclic && current === images.length - 1}
        onClick={handleNext}
      >
        Next
      </button>
    </div>
  );
}
