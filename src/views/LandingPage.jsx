import { Link } from 'react-router-dom';
import { motion as Motion } from 'framer-motion';
import { uiCopy } from '../data/quizzes';
import GlobalFullscreenButton from '../components/layout/GlobalFullscreenButton';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <GlobalFullscreenButton />

      <div className="hero">
        <Motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="hero__title"
        >
          {uiCopy.homepageTitle}
        </Motion.h1>

        <Motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-panel"
        >
          <p className="glass-panel__text">
            {uiCopy.homepageExplanation}
          </p>
        </Motion.div>

        <Motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="hero__cta-wrapper"
        >
          <Link to="/regolamento" className="hero__cta">
            <span>{uiCopy.ctaRules}</span>
            <span className="hero__cta-arrow">→</span>
          </Link>
        </Motion.div>

      </div>
    </div>
  );
};

export default LandingPage;
