import { useEffect, useRef, useState } from 'react';

export const useBoardScale = (naturalWidth = 900) => {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [scaledHeight, setScaledHeight] = useState('auto');

  useEffect(() => {
    if (!containerRef.current || !contentRef.current) return;

    const observer = new ResizeObserver(entries => {
      for (const entry of entries) {
        if (!contentRef.current) return;

        const availableWidth = entry.contentRect.width;
        const newScale = Math.min(1, availableWidth / naturalWidth);
        setScale(newScale);

        const naturalHeight = contentRef.current.offsetHeight;
        setScaledHeight(naturalHeight * newScale);
      }
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [naturalWidth]);

  return { containerRef, contentRef, scale, scaledHeight };
};
