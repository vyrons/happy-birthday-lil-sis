import React, { useState } from 'react';
import PasswordScreen from './components/PasswordScreen';
import LetterOverlay from './components/LetterOverlay';
import MainContent from './components/MainContent';

function App() {
  const [stage, setStage] = useState('LOCKED'); // LOCKED, LETTER, MAIN

  const handleUnlock = () => {
    setStage('LETTER');
  };

  const handleLetterComplete = () => {
    setStage('MAIN');
  };

  return (
    <div className="font-body min-h-screen">
      {stage === 'LOCKED' && (
        <PasswordScreen onUnlock={handleUnlock} />
      )}
      
      {stage === 'LETTER' && (
        <LetterOverlay onComplete={handleLetterComplete} />
      )}
      
      {stage === 'MAIN' && (
        <MainContent />
      )}
    </div>
  );
}

export default App;
