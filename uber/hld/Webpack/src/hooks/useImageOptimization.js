import { useState, useEffect } from 'react';

export function useImageOptimization(src, options = {}) {
    const [imageSrc, setImageSrc] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const {
        width = 800,
        quality = 80,
        format = 'webp'
    } = options;

    useEffect(() => {
        if (!src) return;

        const optimizeImage = async () => {
            try {
                // Using Unsplash's built-in image optimization
                const optimizedUrl = new URL(src);
                optimizedUrl.searchParams.set('w', width);
                optimizedUrl.searchParams.set('q', quality);
                optimizedUrl.searchParams.set('fm', format);

                setImageSrc(optimizedUrl.toString());
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        optimizeImage();
    }, [src, width, quality, format]);

    return { imageSrc, loading, error };
}