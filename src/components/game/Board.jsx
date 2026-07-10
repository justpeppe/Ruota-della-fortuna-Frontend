import Tile from './Tile';
import { useBoardScale } from '../../hooks/useBoardScale';

const Board = ({ matrix, tileStates, forceRevealAll = false }) => {
  const { containerRef, contentRef, scale, scaledHeight } = useBoardScale(1100);

  return (
    <div
      ref={containerRef}
      className="board-scale-wrapper"
      style={{ height: scaledHeight !== 'auto' ? `${scaledHeight}px` : 'auto' }}
    >
      <div
        ref={contentRef}
        className="inline-block board__scalable-content"
        style={{
          transform: `scale(${scale})`
        }}
      >
        <div className="board">

          <div className="board__vignette" />

          <div className="board__container">

            <div className="board__frame-svg">
              <svg
                viewBox="0 0 140 40"
                preserveAspectRatio="none"
                className="board__frame-svg-element"
              >
                <defs>
                  <filter id="frame-glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="0.4" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <path
                  d="M10,0.5 H130 V10.5 H139.5 V29.5 H130 V39.5 H10 V29.5 H0.5 V10.5 H10 Z"
                  fill="none"
                  stroke="var(--color-white-bright)"
                  strokeWidth="1"
                  filter="url(#frame-glow)"
                />
              </svg>
            </div>

            <div className="board__grid">
              {matrix.map((row, rowIndex) => (
                <div key={rowIndex} className="board__row">
                  {row.map((cell, cellIndex) => (
                    <Tile
                      key={`${rowIndex}-${cellIndex}`}
                      char={cell.char}
                      isActive={cell.isActive}
                      isMissingSlot={cell.isMissingSlot}
                      status={forceRevealAll && cell.isActive && cell.char !== ' '
                        ? 'revealed'
                        : (tileStates[`${rowIndex}-${cellIndex}`] || 'hidden')}
                      forceRevealAll={forceRevealAll}
                    />
                  ))}
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Board;
