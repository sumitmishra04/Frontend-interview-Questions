import { useEffect, useRef, useState } from "react";

function ProgressBar({ duration }) {
    const [progress, setProgress] = useState(0);
    const startTimeRef = useRef(null);
    const animationFrameRef = useRef(null);

    const updateProgress = (timestamp) => {
        if (!startTimeRef.current) startTimeRef.current = timestamp;

        const elapsedTime = (timestamp - startTimeRef.current) / 1000; // Convert ms to seconds
        const newProgress = Math.min((elapsedTime / duration) * 100, 100); // Ensure max 100%

        setProgress(newProgress);

        if (newProgress < 100) {
            animationFrameRef.current = requestAnimationFrame(updateProgress);
        }
    };

    useEffect(() => {
        setProgress(0); // Reset progress on re-mount
        startTimeRef.current = null; // Reset start time

        animationFrameRef.current = requestAnimationFrame(updateProgress);

        return () => cancelAnimationFrame(animationFrameRef.current); // Cleanup
    }, [duration]);

    return (
        <div
            style={{
                width: "100%",
                height: "10px",
                border: "1px solid",
                borderRadius: "50px",
                padding: "1.5px",
                color: "grey",
                position: "relative",
                fontSize: "8px",
            }}
        >
            <div
                style={{
                    width: `${progress}%`,
                    height: "100%",
                    background: "red",
                    borderRadius: "50px",
                }}
            ></div>
            <span
                style={{
                    position: "absolute",
                    zIndex: 1,
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    color: progress > 50 ? "white" : "grey",
                }}
            >
                {Math.round(progress, 2)}%
            </span>
        </div>
    );
}

export default ProgressBar;
