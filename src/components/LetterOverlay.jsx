import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Heart } from 'lucide-react';

const LetterOverlay = ({ onComplete }) => {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const buttonRef = useRef(null);
  const progressRef = useRef(null);
  
  const [canContinue, setCanContinue] = useState(false);
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    // Entrance animation
    const tl = gsap.timeline();
    
    tl.fromTo(containerRef.current, 
      { opacity: 0 }, 
      { opacity: 1, duration: 1 }
    )
    .fromTo(contentRef.current,
      { y: 50, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" }
    );

    // Countdown logic
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setCanContinue(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Button fill animation
    if(progressRef.current) {
        gsap.to(progressRef.current, {
            width: "100%",
            duration: 5,
            ease: "linear"
        });
    }

    return () => clearInterval(timer);
  }, []);

  const handleContinue = () => {
    if (!canContinue) return;
    
    // Exit animation
    gsap.to(containerRef.current, {
      y: -50,
      opacity: 0,
      duration: 0.8,
      ease: "power2.in",
      onComplete: onComplete
    });
  };

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-40 bg-pink-50 flex items-center justify-center p-4 overflow-y-auto"
    >
      <div 
        ref={contentRef}
        className="bg-white max-w-md w-full p-6 md:p-10 rounded-2xl shadow-2xl relative border-4 border-pink-100"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-rose-100 p-3 rounded-full border-4 border-white">
            <Heart className="w-8 h-8 text-rose-500 fill-rose-500" />
        </div>

        <div className="mt-6 space-y-4 font-hand text-lg md:text-xl text-gray-700 leading-relaxed text-center">
            <h1 className="text-3xl font-bold text-rose-600 mb-6">Buat Adik Kecilku,</h1>
            <p>
                Happy Birthday ya! 🎉
            </p>
            <p>
                Ngasih liat kamu tumbuh sampe sekarang tuh hal paling indah buat Kakak. Kita mungkin tumbuh dengan luka masing-masing, tapi Kakak pengen kamu tau satu hal.
            </p>
            <p>
               Semua perasaanmu, ketawamu, nangismu—itu semua valid. Kamu gak harus pura-pura kuat kok. Gak apa-apa banget kalo capek, gak apa-apa banget buat nangis.
            </p>
            <p className="font-bold text-rose-500">
                Kakak bakal selalu ada di sini. Jadi pelindung kamu dan tempat kamu pulang kapanpun dunia lagi jahat sama kamu.
            </p>
        </div>

        <div className="mt-10 relative">
            <button
                ref={buttonRef}
                onClick={handleContinue}
                disabled={!canContinue}
                className={`w-full py-4 rounded-xl font-bold text-lg relative overflow-hidden transition-all duration-300 ${
                    canContinue 
                        ? 'bg-rose-500 text-white hover:bg-rose-600 hover:scale-[1.02] shadow-lg cursor-pointer' 
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
            >
                <div 
                    ref={progressRef}
                    className={`absolute inset-0 bg-pink-200/50 z-0 h-full w-0 ${canContinue ? 'hidden' : 'block'}`}
                />
                <span className="relative z-10 flex items-center justify-center gap-2">
                    {canContinue ? (
                        <>Buka Kado Kamu <Heart size={20} className="fill-white" /></>
                    ) : (
                        `Baca dulu ya... (${countdown})`
                    )}
                </span>
            </button>
        </div>
      </div>
    </div>
  );
};

export default LetterOverlay;
