import { useRef, useEffect, useState } from 'react';

const PlayerCamera = ({ className = '' }) => {
  const videoRef = useRef(null);
  const [error, setError] = useState(null);
  const [isStreaming, setIsStreaming] = useState(false);

  useEffect(() => {
    let stream;
    async function startCamera() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            aspectRatio: 9 / 16,
            width: { ideal: 540 },
            height: { ideal: 960 },
            facingMode: 'user',
          },
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setIsStreaming(true);
        }
      } catch {
        // Fallback senza vincoli
        try {
          stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            setIsStreaming(true);
          }
        } catch {
          setError('Webcam non disponibile.');
        }
      }
    }

    startCamera();
    return () => { if (stream) stream.getTracks().forEach(t => t.stop()); };
  }, []);

  return (
    <div className={`player-camera ${className}`}>

      <div className="player-camera__placeholder" aria-hidden="true">
        <span className="player-camera__placeholder-label">
          Live Camera
        </span>
      </div>

      {error ? (
        <div className="player-camera__error">
          <p className="player-camera__error-icon">⚠️</p>
          <p className="player-camera__error-text">
            {error}
          </p>
        </div>
      ) : (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="player-camera__video"
        />
      )}

      <div className="player-camera__badge">
        <span className="player-camera__badge-dot">
          {isStreaming && <span className="player-camera__badge-ping" />}
          <span className={isStreaming ? 'player-camera__badge-dot--live' : 'player-camera__badge-dot--idle'} />
        </span>
        <span className="player-camera__badge-text">
          Live
        </span>
      </div>

      <div className="player-camera__vignette" />
    </div>
  );
};

export default PlayerCamera;
