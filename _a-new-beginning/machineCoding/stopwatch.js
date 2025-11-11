import { useState, useRef } from "react";

export default function Stopwatch() {
    const [time, setTime] = useState(0);
    const [running, setRunning] = useState(false);
    const [laps, setLaps] = useState([]);
    const startTimeRef = useRef(null);
    const rafRef = useRef(null);

    const formatTime = (ms) => {
        const minutes = Math.floor(ms / 60000)
            .toString()
            .padStart(2, "0");
        const seconds = Math.floor((ms % 60000) / 1000)
            .toString()
            .padStart(2, "0");
        const milliseconds = ((ms % 1000) / 10).toFixed(0).padStart(2, "0");
        return `${minutes}:${seconds}:${milliseconds}`;
    };

    const updateTimer = () => {
        setTime(Date.now() - startTimeRef.current);
        rafRef.current = requestAnimationFrame(updateTimer);
    };

    const handleStartPause = () => {
        if (running) {
            cancelAnimationFrame(rafRef.current);
        } else {
            startTimeRef.current = Date.now() - time;
            rafRef.current = requestAnimationFrame(updateTimer);
        }
        setRunning(!running);
    };

    const handleReset = () => {
        cancelAnimationFrame(rafRef.current);
        setTime(0);
        setLaps([]);
        setRunning(false);
    };

    const handleLap = () => {
        setLaps([...laps, time]);
    };

    return (
        <div style={{ textAlign: "center", fontSize: "24px", padding: "20px" }}>
            <h2>Stopwatch</h2>
            <div style={{ fontSize: "32px", marginBottom: "10px" }}>
                {formatTime(time)}
            </div>
            <button onClick={handleStartPause}>{running ? "Pause" : "Start"}</button>
            <button onClick={handleReset} disabled={time === 0}>
                Reset
            </button>
            <button onClick={handleLap} disabled={!running}>
                Lap
            </button>

            {laps.length > 0 && (
                <ul style={{ listStyle: "none", padding: 0 }}>
                    {laps.map((lap, index) => (
                        <li key={index}>
                            Lap {index + 1}: {formatTime(lap)}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
