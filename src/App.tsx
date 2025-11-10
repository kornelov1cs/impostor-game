/**
 * Main App Component
 * Renders different screens based on game phase
 */

import React from 'react';
import { useGameStore } from './store/gameStore';
import {
  SetupScreen,
  RevelationScreen,
  DiscussionScreen,
  VotingScreen,
  ResultsScreen,
} from './screens';

const App: React.FC = () => {
  const gamePhase = useGameStore((state) => state.gamePhase);

  switch (gamePhase) {
    case 'setup':
      return <SetupScreen />;
    case 'reveal':
      return <RevelationScreen />;
    case 'discussion':
      return <DiscussionScreen />;
    case 'voting':
      return <VotingScreen />;
    case 'results':
      return <ResultsScreen />;
    default:
      return <SetupScreen />;
  }
};

export default App;
