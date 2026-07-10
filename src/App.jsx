import { HashRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './views/LandingPage';
import QuizSelection from './views/QuizSelection';
import RulesView from './views/RulesView';
import GameScreen from './views/GameScreen';
import CosmicBg from './components/layout/CosmicBg';

function App() {
  return (
    <HashRouter>
      <div className="app-shell">
        <CosmicBg />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/regolamento" element={<RulesView />} />
          <Route path="/menu" element={<QuizSelection />} />
          <Route path="/quiz/:id" element={<GameScreen />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
