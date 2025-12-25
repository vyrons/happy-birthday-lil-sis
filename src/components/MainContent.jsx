import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Music, Heart, Github, Linkedin, Instagram, Pause, Play } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const MainContent = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const darkSectionRef = useRef(null);
  const mainRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
        // --- Animations ---

        // Hero Text Stagger
        gsap.from(".hero-text", {
          y: 50,
          opacity: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power2.out",
          delay: 0.2
        });

        // Memory Lane Parallax/Fade
        gsap.utils.toArray(".memory-card").forEach((card, i) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                },
                y: 50,
                opacity: 0,
                duration: 1,
            });
        });

        // Dark Mode Transition
        ScrollTrigger.create({
            trigger: darkSectionRef.current,
            start: "top 60%",
            end: "bottom top",
            onEnter: () => gsap.to(mainRef.current, { backgroundColor: "#1a1a1a", color: "#fce7f3", duration: 0.5 }),
            onLeaveBack: () => gsap.to(mainRef.current, { backgroundColor: "#fdf2f8", color: "#1f2937", duration: 0.5 }),
        });
    }, mainRef); // Scope to mainRef

    return () => ctx.revert();
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch(e => console.log("Audio play failed:", e));
        }
        setIsPlaying(!isPlaying);
    }
  };

  return (
    <div ref={mainRef} className="relative min-h-screen pb-20 bg-pink-50 transition-colors">
      {/* Audio Element */}
      <audio ref={audioRef} loop src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" />

      {/* Sticky Header */}
      <header className="fixed top-0 left-0 right-0 z-30 p-4 flex justify-between items-center mix-blend-difference text-rose-500">
        <Heart className="w-8 h-8 fill-rose-500 animate-pulse" />
        <button 
            onClick={toggleMusic}
            className="p-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 hover:scale-110 transition-transform relative overflow-hidden group"
        >
            {isPlaying ? (
                 <div className="flex gap-1 h-5 items-center">
                    <span className="block w-1 h-2 bg-rose-500 rounded-full animate-[music_1s_ease-in-out_infinite]" />
                    <span className="block w-1 h-4 bg-rose-500 rounded-full animate-[music_1.2s_ease-in-out_infinite]" />
                    <span className="block w-1 h-3 bg-rose-500 rounded-full animate-[music_0.8s_ease-in-out_infinite]" />
                    <Pause size={20} className="hidden group-hover:block absolute inset-0 m-auto text-rose-600" />
                 </div>
            ) : (
                <Music size={24} />
            )}
        </button>
      </header>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center p-8 text-center relative z-10">
        <h2 className="hero-text text-2xl md:text-3xl font-hand text-rose-500 font-bold mb-4 drop-shadow-sm">It's Your Special Day!</h2>
        <h1 className="hero-text text-5xl md:text-7xl font-bold text-rose-600 mb-6 font-hand drop-shadow-md">Happy Birthday, <br/> Little Sister!</h1>
        <p className="hero-text max-w-md mx-auto text-lg md:text-xl text-gray-700 font-bold font-body">
            May your day be filled with laughter, love, and magic.
        </p>
        <div className="hero-text mt-12 animate-bounce text-rose-400">
            Scroll Down ↓
        </div>
      </section>

      {/* Memory Lane */}
      <section className="py-20 px-6 max-w-4xl mx-auto space-y-20 relative z-10">
        <div className="memory-card flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/2">
                <div className="aspect-[3/4] bg-white rounded-2xl overflow-hidden shadow-2xl rotate-[-2deg] hover:rotate-0 transition-transform duration-500 border-[10px] border-white ring-1 ring-gray-100">
                    <img src="./img/sis1.webp" alt="Baby Photo" className="w-full h-full object-cover object-[10%_center]" />
                </div>
            </div>
            <div className="w-full md:w-1/2 text-center md:text-left space-y-4">
                <h3 className="text-3xl font-hand font-bold text-rose-600">Pas Masih Kecil...</h3>
                <p className="text-lg leading-relaxed text-gray-800 font-medium">
                    Liat deh senyum kecil ini! Dari dulu kamu emang udah bikin dunia kita berwarna. Kamu tuh kecil banget, tapi bikin kita semua punya harapan.
                </p>
            </div>
        </div>

        <div className="memory-card flex flex-col md:flex-row-reverse items-center gap-8">
            <div className="w-full md:w-1/2">
                <div className="aspect-[3/4] bg-white rounded-2xl overflow-hidden shadow-2xl rotate-[2deg] hover:rotate-0 transition-transform duration-500 border-[10px] border-white ring-1 ring-gray-100">
                    <img src="./img/sis2.webp" alt="Current Photo" className="w-full h-full object-cover" />
                </div>
            </div>
            <div className="w-full md:w-1/2 text-center md:text-right space-y-4">
                <h3 className="text-3xl font-hand font-bold text-rose-600">...Sampe Sekarang</h3>
                <p className="text-lg leading-relaxed text-gray-800 font-medium">
                    Liat kamu sekarang! Udah jadi cewek keren, kuat, dan hebat. Kakak bangga banget lho liat proses kamu jadi dewasa kayak gini.
                </p>
            </div>
        </div>

        <div className="memory-card flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/2">
                <div className="aspect-[3/4] bg-white rounded-2xl overflow-hidden shadow-2xl rotate-[-1deg] hover:rotate-0 transition-transform duration-500 border-[10px] border-white ring-1 ring-gray-100">
                    <img src="./img/weare.webp" alt="Us Together" className="w-full h-full object-cover" />
                </div>
            </div>
            <div className="w-full md:w-1/2 text-center md:text-left space-y-4">
                <h3 className="text-3xl font-hand font-bold text-rose-600">Bareng Terus</h3>
                <p className="text-lg leading-relaxed text-gray-800 font-medium">
                    Mau kemana pun hidup bawa kamu, inget ya kamu gak sendirian. Kakak bakal selalu ada, dukung kamu dari belakang atau jalan di sebelah kamu.
                </p>
            </div>
        </div>
      </section>

      {/* Message Section */}
      <section className="py-20 px-6 text-center max-w-2xl mx-auto relative z-10">
        <h3 className="text-4xl font-hand font-bold text-rose-700 mb-8">Pesan dari Kakak</h3>
        <p className="text-xl leading-relaxed mb-6 text-gray-800 font-medium">
            Hidup emang gak selalu indah, Dek. Kakak tau rasanya capek sampe mati rasa itu gimana. Tapi inget ya, anak kecil di foto itu—dia masih ada di dalem diri kamu. Dia berhak disayang, dia berhak bahagia, dan dia berhak ngerasa aman.
        </p>
        <p className="text-xl leading-relaxed font-bold text-rose-600">
            Kakak janji bakal selalu usaha jadi rumah paling aman buat kamu, yang mungkin dulu gak sempet kamu rasain.
        </p>
      </section>

      {/* Dark Section (Emotional Climax) */}
      <section ref={darkSectionRef} className="py-40 px-6 bg-transparent text-center relative z-10">
        <div className="space-y-8">
            <h2 className="text-5xl md:text-7xl font-hand font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-300 to-pink-300 mb-4 drop-shadow-[0_0_25px_rgba(236,72,153,0.6)]">
                I love you, <br /> Little Sister
            </h2>
            <Heart size={100} className="mx-auto text-rose-500 fill-rose-500 animate-[pulse_2s_ease-in-out_infinite] drop-shadow-[0_0_30px_rgba(236,72,153,0.8)]" />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 text-center border-t border-white/10 text-white/50 relative z-10">
        <div className="flex justify-center gap-6 mb-8">
            <a href="https://github.com/vyrons/happy-birthday-lil-sis.git" className="hover:text-rose-400 transition-colors"><Github size={24} /></a>
            <a href="https://www.instagram.com/novel.jsx?igsh=MW1zNWI1cmR0Y3ds" className="hover:text-rose-400 transition-colors"><Instagram size={24} /></a>
            <a href="https://www.linkedin.com/in/ryan-rafidhea-reyhan-439109211/" className="hover:text-rose-400 transition-colors"><Linkedin size={24} /></a>
        </div>
        <p className="font-hand text-lg">
            Made with <Heart size={16} className="inline fill-rose-500 text-rose-500 mx-1" /> by your big brother.
        </p>
        <p className="text-sm mt-2">© {new Date().getFullYear()} Best Brother Inc.</p>
      </footer>
    </div>
  );
};

export default MainContent;
