import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Lock, Unlock } from 'lucide-react';

const PasswordScreen = ({ onUnlock }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const containerRef = useRef(null);
  const padRef = useRef(null);

  const correctPassword = '2612';

  const handlePress = (num) => {
    if (password.length < 4) {
      setPassword((prev) => prev + num);
      setError(false);
    }
  };

  const handleBackspace = () => {
    setPassword((prev) => prev.slice(0, -1));
    setError(false);
  };

  useEffect(() => {
    if (password.length === 4) {
      if (password === correctPassword) {
        // Success Animation
        gsap.to(containerRef.current, {
          y: -1000,
          opacity: 0,
          duration: 1,
          ease: 'power3.inOut',
          delay: 0.5,
          onComplete: onUnlock,
        });
      } else {
        // Error Animation
        setError(true);
        gsap.fromTo(
            padRef.current,
            { x: -10 },
            { x: 10, duration: 0.1, repeat: 5, yoyo: true, ease: 'none', onComplete: () => {
                gsap.to(padRef.current, { x: 0 });
                setPassword('');
            }}
        );
      }
    }
  }, [password, onUnlock]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-pink-100/90 backdrop-blur-md"
    >
      <div ref={padRef} className="bg-white p-6 rounded-3xl shadow-xl flex flex-col items-center max-w-xs w-full">
        <div className="mb-4">
             {password === correctPassword ? <Unlock className="text-green-500 w-10 h-10" /> : <Lock className="text-rose-400 w-10 h-10" />}
        </div>
        
        <h2 className="text-2xl font-hand font-bold text-rose-500 mb-6">Masukin Tanggal Lahir</h2>

        <div className="flex gap-2 mb-6 h-12">
            {[...Array(4)].map((_, i) => (
                <div key={i} className={`w-10 h-10 rounded-lg border-2 flex items-center justify-center text-xl font-bold transition-all ${
                    password[i] 
                        ? 'border-rose-400 bg-rose-50 text-rose-600' 
                        : 'border-pink-200 bg-pink-50'
                }`}>
                    {password[i] || ''}
                </div>
            ))}
        </div>
        
        <div className="grid grid-cols-3 gap-3 w-full">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button
              key={num}
              onClick={() => handlePress(num)}
              className="w-full aspect-square rounded-xl bg-pink-50 hover:bg-pink-100 text-rose-600 font-bold text-xl transition-colors active:scale-95"
            >
              {num}
            </button>
          ))}
          <div className="aspect-square"></div>
          <button
              onClick={() => handlePress(0)}
              className="w-full aspect-square rounded-xl bg-pink-50 hover:bg-pink-100 text-rose-600 font-bold text-xl transition-colors active:scale-95"
            >
              0
            </button>
             <button
              onClick={handleBackspace}
              className="w-full aspect-square rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-500 font-bold text-lg transition-colors active:scale-95 flex items-center justify-center"
            >
              ⌫
            </button>
        </div>

        {/* User Hint */}
        {error && <p className="mt-4 text-sm text-red-500 font-bold animate-pulse">Coba: 2612 (Jangan marah ya! ❤️)</p>}
      </div>
    </div>
  );
};

export default PasswordScreen;
