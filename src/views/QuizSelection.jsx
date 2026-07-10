import { Link } from 'react-router-dom';
import { motion as Motion } from 'framer-motion';
import { quizzes } from '../data/quizzes';

const QuizSelection = () => {
  return (
    <div className="quiz-menu">

      <div className="quiz-menu__content">

        {/* Header */}
        <Motion.div
          initial={{ y: -24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="quiz-menu__header"
        >
          <h2 className="quiz-menu__title">
            Selezione Quiz
          </h2>
        </Motion.div>

        {/* Lista quiz */}
        <div className="quiz-menu__list">
          {quizzes.map((quiz, index) => (
            <Motion.div
              key={quiz.id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.06 * index }}
            >
              <Link to={`/quiz/${quiz.id}`} className="quiz-card">
                <div className="quiz-card__body">
                  <span className="quiz-card__label">
                    DOMANDA #{quiz.id}
                  </span>
                  <span className="quiz-card__title">
                    {quiz.hint}
                  </span>
                </div>
                <div className="quiz-card__arrow-wrapper">
                  <span className="quiz-card__arrow">→</span>
                </div>
              </Link>
            </Motion.div>
          ))}
        </div>

        {/* Back */}
        <Link to="/" className="quiz-menu__back">
          ⬅ Torna alla schermata iniziale
        </Link>

      </div>
    </div>
  );
};

export default QuizSelection;
