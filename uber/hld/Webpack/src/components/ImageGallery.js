import React from "react";

const images = Array.from({ length: 40 }, (_, i) => `https://via.placeholder.com/300?text=Image+${i + 1}`);

export default function ImageGallery() {
    return (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px" }}>
            {images.map((src, index) => (
                <img key={index} src={src} alt={`Gallery Image ${index + 1}`} loading="lazy" width="300" height="200" />
            ))}
        </div>
    );
}
