import { useMemo, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import Board from '../components/game/Board';
import HintBox from '../components/game/HintBox';
import PlayerCamera from '../components/player/PlayerCamera';
import { generateBoardMatrix } from '../utils/boardLogic';
import { useGameLogic } from '../hooks/useGameLogic';
import { useAudio } from '../hooks/useAudio';
import { uiCopy, quizzes } from '../data/quizzes';
import { motion as Motion } from 'framer-motion';

const GameHeader = () => (
  <header className="game-header">
    <div className="game-header__left">
      <Link to="/menu" className="game-back-button">
        <span className="game-back-button__icon">⬅</span>
        <span className="game-back-button__text">{uiCopy.backButton}</span>
      </Link>
    </div>

    <div className="game-header__center">
      <h1 className="game-header__title">
        {uiCopy.gameTitle}
      </h1>
    </div>
  </header>
);

const GameScreen = () => {
  const { id } = useParams();
  const { playSingleDing, playWrongSound } = useAudio();
  const [isMasterRevealEnabled, setIsMasterRevealEnabled] = useState(false);

  const quiz = useMemo(() => quizzes.find(q => q.id === parseInt(id)), [id]);
  const matrix = useMemo(() => (quiz ? generateBoardMatrix(quiz.phrase) : []), [quiz]);
  const { tileStates } = useGameLogic(matrix, playSingleDing, playWrongSound);
  const revealAllActiveTiles = () => setIsMasterRevealEnabled(true);

  if (!quiz) return <Navigate to="/" replace />;

  return (
    <div className="game-screen">

      <div className="game-screen__camera-sidebar">
        <PlayerCamera className="player-camera--fill" />
      </div>

      <div className="game-screen__content">

        <GameHeader />

        <main className="game-stage game-stage--flush">
          <div className="game-stage__light" />

          <div className="game-screen__camera-strip">
            <PlayerCamera className="player-camera--fill" />
          </div>

          <Motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="game-stage__content"
          >
            <Board
              matrix={matrix}
              tileStates={tileStates}
              forceRevealAll={isMasterRevealEnabled}
            />

            <HintBox hint={quiz.hint} />
          </Motion.div>
        </main>

      </div>

      <button
        type="button"
        className="game-master-reveal-button"
        onClick={revealAllActiveTiles}
        aria-label="Rivela tutta la frase corretta"
        title="Rivela tutta la frase corretta"
      >
        <span className="game-master-reveal-button__icon">◎</span>
      </button>
    </div>
  );
};

export default GameScreen;
