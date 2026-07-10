import { motion as Motion } from 'framer-motion';

const HintBox = ({ hint }) => {
  if (!hint) return null;

  return (
    <Motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      className="hint-box"
    >
      <div className="hint-box__bg" />
      <div className="hint-box__content">
        <div className="hint-box__center">
          <span className="hint-box__text">
            {hint}
          </span>
        </div>
      </div>
    </Motion.div>
  );
};

export default HintBox;
