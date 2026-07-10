import { useState, useEffect } from 'react';
import { isFullscreen, toggleFullscreen } from '../../utils/fullscreen';

const GlobalFullscreenButton = () => {
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    setFullscreen(isFullscreen());

    const handleFullscreenChange = () => {
      setFullscreen(isFullscreen());
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  return (
    <button
      type="button"
      className="global-fullscreen-button"
      onClick={toggleFullscreen}
      aria-label="Toggle Fullscreen"
      title="Toggle Fullscreen"
    >
      {fullscreen ? '⛾' : '⛶'}
    </button>
  );
};

export default GlobalFullscreenButton;
