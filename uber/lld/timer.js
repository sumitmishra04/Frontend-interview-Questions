import React, { useState, useEffect, useRef } from "react";

function Timer({ sec = 0, min = 0, hrs = 0, d = 0 }) {
  const [seconds, setSeconds] = useState(sec);
  const [minutes, setMinutes] = useState(min);
  const [hours, setHours] = useState(hrs);
  const [days, setDays] = useState(d);
  const timerRef = useRef(null);

  // Function to start the timer
  const handleStart = () => {
    if (timerRef.current) return; // Prevent multiple intervals

    timerRef.current = setInterval(() => {
      setSeconds((prev) => {
        if (prev > 0) return prev - 1;
        
        // Handle underflow cases
        if (minutes > 0) {
          setMinutes((m) => m - 1);
          return 59;
        } else if (hours > 0) {
          setHours((h) => h - 1);
          setMinutes(59);
          return 59;
        } else if (days > 0) {
          setDays((d) => d - 1);
          setHours(23);
          setMinutes(59);
          return 59;
        } else {
          clearInterval(timerRef.current); // Stop timer when done
          timerRef.current = null;
          return 0;
        }
      });
    }, 1000);
  };

  // Function to reset the timer
  const handleReset = () => {
    clearInterval(timerRef.current);
    timerRef.current = null;
    setSeconds(sec);
    setMinutes(min);
    setHours(hrs);
    setDays(d);
  };

  // Cleanup interval on unmount
  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <div>
      <button onClick={handleStart}>Start</button>
      <button onClick={handleReset}>Reset</button>
      <div>
        {days}d : {hours}h : {minutes}m : {seconds}s
      </div>
    </div>
  );
}

export default Timer;
