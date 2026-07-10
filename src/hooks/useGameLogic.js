import { useState, useEffect, useCallback, useRef } from 'react';

const VOWEL_ACCENTS = {
  A: ['À', 'Á', 'Â', 'Ã', 'Ä', 'Å'],
  E: ['È', 'É', 'Ê', 'Ë'],
  I: ['Ì', 'Í', 'Î', 'Ï'],
  O: ['Ò', 'Ó', 'Ô', 'Õ', 'Ö'],
  U: ['Ù', 'Ú', 'Û', 'Ü'],
};

const getLetterFamily = (key) => {
  const family = new Set([key]);
  if (VOWEL_ACCENTS[key]) {
    VOWEL_ACCENTS[key].forEach(v => family.add(v));
  }
  return family;
};

const buildInitialState = (matrix) => {
  const state = {};
  matrix.forEach((row, r) => {
    row.forEach((cell, c) => {
      if (cell.isActive) {
        const char = cell.char?.toUpperCase();
        state[`${r}-${c}`] = [' ', '-', '\'', ','].includes(char) ? 'revealed' : 'hidden';
      }
    });
  });
  return state;
};

export const useGameLogic = (matrix, onDing, onWrong) => {
  const [tileStates, setTileStates] = useState(() => buildInitialState(matrix));
  const [processedLetters, setProcessedLetters] = useState(new Set([' ', '-', '\'', ',']));
  const [isAnimating, setIsAnimating] = useState(false);
  const isAnimatingRef = useRef(false);

  const handleKeyPress = useCallback(async (event) => {
    if (isAnimatingRef.current) return;

    const key = event.key.toUpperCase();
    if (!/^[A-ZÀ-ÿ]$/.test(key)) return;
    if (processedLetters.has(key)) return;

    const letterFamily = getLetterFamily(key);

    const targets = [];
    matrix.forEach((row, r) => {
      row.forEach((cell, c) => {
        if (cell.isActive && letterFamily.has(cell.char?.toUpperCase())) {
          targets.push({ r, c });
        }
      });
    });

    if (targets.length === 0) {
      if (onWrong) onWrong();
      return;
    }

    isAnimatingRef.current = true;
    setIsAnimating(true);
    setProcessedLetters(prev => new Set([...prev, key, ...letterFamily]));

    for (let i = 0; i < targets.length; i++) {
      const { r, c } = targets[i];
      setTileStates(prev => ({ ...prev, [`${r}-${c}`]: 'illuminated' }));
      if (onDing) onDing();
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    await new Promise(resolve => setTimeout(resolve, 500));

    const columns = [...new Set(targets.map(t => t.c))].sort((a, b) => a - b);

    for (let i = 0; i < columns.length; i++) {
      const colIndex = columns[i];
      setTileStates(prev => {
        const nextState = { ...prev };
        targets.forEach(t => {
          if (t.c === colIndex) {
            nextState[`${t.r}-${t.c}`] = 'revealed';
          }
        });
        return nextState;
      });
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    isAnimatingRef.current = false;
    setIsAnimating(false);
  }, [matrix, processedLetters, onDing, onWrong]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  return { tileStates, isAnimating };
};
