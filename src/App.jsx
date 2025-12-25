import React, { useState, useRef } from 'react';
import PasswordScreen from './components/PasswordScreen';
import LetterOverlay from './components/LetterOverlay';
import MainContent from './components/MainContent';

function App() {
  const [stage, setStage] = useState('LOCKED'); // LOCKED, LETTER, MAIN
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const fadeAudioIn = () => {
    if (audioRef.current) {
      audioRef.current.volume = 0;
      audioRef.current.play().catch(e => console.log("Audio play failed:", e));
      setIsPlaying(true);
      
      let vol = 0;
      const interval = setInterval(() => {
        if (vol < 1) {
          vol += 0.05;
          audioRef.current.volume = Math.min(vol, 1);
        } else {
          clearInterval(interval);
        }
      }, 100);
    }
  };

  const fadeAudioOut = () => {
    if (audioRef.current) {
      let vol = audioRef.current.volume;
      const interval = setInterval(() => {
        if (vol > 0) {
          vol -= 0.05;
          audioRef.current.volume = Math.max(vol, 0);
        } else {
          clearInterval(interval);
          audioRef.current.pause();
          setIsPlaying(false);
        }
      }, 100);
    }
  };

  const toggleMusic = () => {
    if (isPlaying) {
      fadeAudioOut();
    } else {
      fadeAudioIn();
    }
  };

  const handleUnlock = () => {
    setStage('LETTER');
  };

  const handleLetterComplete = () => {
    fadeAudioIn(); // Start music when entering main content
    setStage('MAIN');
  };

  return (
    <div className="font-body min-h-screen">
      {/* Global Audio Element */}
      <audio ref={audioRef} loop src="/audio/true.mp3" />

      {stage === 'LOCKED' && (
        <PasswordScreen onUnlock={handleUnlock} />
      )}
      
      {stage === 'LETTER' && (
        <LetterOverlay onComplete={handleLetterComplete} />
      )}
      
      {stage === 'MAIN' && (
        <MainContent isPlaying={isPlaying} toggleMusic={toggleMusic} />
      )}
    </div>
  );
}

export default App;
