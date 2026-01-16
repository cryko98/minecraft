
import React, { useState, useEffect, useRef } from 'react';

// Icons
const XIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6 fill-current">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
  </svg>
);

const CopyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
  </svg>
);

const ChartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
    <line x1="12" y1="20" x2="12" y2="10"></line>
    <line x1="18" y1="20" x2="18" y2="4"></line>
    <line x1="6" y1="20" x2="6" y2="16"></line>
  </svg>
);

const HandButton: React.FC<{ 
  onClick?: () => void; 
  children: React.ReactNode; 
  className?: string; 
}> = ({ onClick, children, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`hand-drawn-border bg-white text-black px-6 py-3 text-xl font-bold uppercase cursor-pointer ${className}`}
    >
      {children}
    </button>
  );
};

const PaperCard: React.FC<{ children: React.ReactNode; className?: string; rotate?: string }> = ({ children, className = '', rotate = 'rotate-0' }) => (
  <div className={`bg-[#fdfdfd] text-black p-6 hand-drawn-border ${rotate} ${className}`}>
    {children}
  </div>
);

// Unstable Chart Background Component
const UnstableChartBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let points: number[] = [];
    const speed = 2; // Speed of scrolling
    const segmentWidth = 5; // Width between points

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // Initialize points to fill screen
      const numPoints = Math.ceil(canvas.width / segmentWidth) + 2;
      points = new Array(numPoints).fill(canvas.height / 2);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const animate = () => {
      // Create a jagged, unstable movement for the new point
      const lastPoint = points[points.length - 1];
      const volatility = 30; // How much it jumps up/down
      let nextPoint = lastPoint + (Math.random() - 0.5) * volatility;

      // Keep it somewhat within screen bounds (with padding)
      if (nextPoint < 50) nextPoint = 50 + Math.random() * 20;
      if (nextPoint > canvas.height - 50) nextPoint = canvas.height - 50 - Math.random() * 20;

      // Add new point, remove old
      points.push(nextPoint);
      points.shift();

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw the line
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)'; // White, semi-transparent
      ctx.lineWidth = 3;
      ctx.lineJoin = 'round';

      for (let i = 0; i < points.length; i++) {
        const x = i * segmentWidth;
        const y = points[i];
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
};

const App: React.FC = () => {
  const CA = "3vz82EWYv8xnc7Cm7qSgERcpMeqw92PcX8PBz88npump";
  const TICKER = "$USDUT";
  const LOGO_URL = "https://pbs.twimg.com/profile_images/1960730761067163648/Jo0qh4hm_400x400.jpg";
  const X_LINK = "https://x.com/usdutcto?s=21";
  const PUMP_LINK = `https://pump.fun/coin/${CA}`;
  const DEX_LINK = `https://dexscreener.com/solana/${CA}`;

  const copyCA = () => {
    navigator.clipboard.writeText(CA);
    alert("Contract Address Copied!");
  };

  return (
    <div className="min-h-screen text-black overflow-x-hidden relative bg-[#50bda3]">
      {/* Texture Overlay for Paper Feel */}
      <div className="fixed inset-0 opacity-10 pointer-events-none z-10" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/crumpled-paper.png")' }}></div>

      {/* Animated Unstable Background */}
      <UnstableChartBackground />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center bg-white/95 backdrop-blur-sm border-2 border-black rounded-xl px-6 py-3 shadow-[4px_4px_0_rgba(0,0,0,1)] gap-4 md:gap-0">
          <div className="flex items-center gap-3">
            <img src={LOGO_URL} alt="Logo" className="w-10 h-10 rounded-full border-2 border-black" />
            <h1 className="text-xl md:text-2xl font-bold tracking-wider">{TICKER}</h1>
          </div>
          
          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-lg font-bold font-hand">
            <a href="#manifesto" className="hover:text-teal-600 hover:underline decoration-wavy transition-colors">MANIFESTO</a>
            <a href="#stats" className="hover:text-teal-600 hover:underline decoration-wavy transition-colors">STATS</a>
            <a href="#chart" className="hover:text-teal-600 hover:underline decoration-wavy transition-colors">CHART</a>
            <a href="#buy" className="hover:text-teal-600 hover:underline decoration-wavy transition-colors">BUY</a>
          </div>

          <div className="flex gap-4 items-center">
             <a href={X_LINK} target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
               <XIcon />
             </a>
             <a href={DEX_LINK} target="_blank" rel="noopener noreferrer" className="bg-black text-white px-4 py-1 rounded-full font-bold hover:bg-gray-800 transition-colors">
               CHART
             </a>
          </div>
        </div>
      </nav>

      {/* Hero Header */}
      <header id="buy" className="pt-40 pb-12 px-4 text-center relative z-20">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          
          <div className="relative mb-8 group">
            <div className="absolute inset-0 bg-black rounded-full transform translate-x-2 translate-y-2 group-hover:translate-x-3 group-hover:translate-y-3 transition-transform"></div>
            <img 
              src={LOGO_URL} 
              alt="Unstable Tether Logo" 
              className="relative w-48 h-48 md:w-64 md:h-64 rounded-full border-4 border-black object-cover wobble z-10" 
            />
          </div>
          
          <h1 className="text-6xl md:text-9xl mb-2 text-white font-bold drop-shadow-[4px_4px_0_#000] transform -rotate-2">
            UNSTABLE TETHER
          </h1>
          
          <p className="text-2xl md:text-3xl text-white mb-8 font-bold tracking-widest bg-black inline-block px-4 py-1 transform rotate-1 border-2 border-white">
            1 USDUT = 1 USDUT (MAYBE)
          </p>
          
          <div className="bg-white p-4 border-4 border-black mb-8 w-full max-w-2xl transform -rotate-1 shadow-[8px_8px_0_rgba(0,0,0,0.2)]">
             <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <code className="text-sm md:text-xl font-bold break-all">{CA}</code>
                <HandButton onClick={copyCA} className="bg-[#f7d51d] hover:bg-[#ffe042] text-sm py-2">
                  <span className="flex items-center gap-2"><CopyIcon /> COPY</span>
                </HandButton>
             </div>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            <a href={PUMP_LINK} target="_blank" rel="noopener noreferrer">
              <HandButton className="bg-[#ff85a1] hover:bg-[#ff99b1] transform rotate-1">
                BUY ON PUMP.FUN
              </HandButton>
            </a>
            <a href={DEX_LINK} target="_blank" rel="noopener noreferrer">
              <HandButton className="bg-white hover:bg-gray-100 transform -rotate-1">
                DEXSCREENER
              </HandButton>
            </a>
          </div>
        </div>
      </header>

      {/* Handwritten Story Section */}
      <section id="manifesto" className="py-20 px-4 relative z-20">
        <div className="max-w-3xl mx-auto">
          <PaperCard rotate="rotate-1" className="bg-[#fffbeb]">
            <h2 className="text-4xl md:text-5xl mb-6 text-center transform -rotate-2 underline decoration-wavy decoration-teal-500">
              The Manifesto
            </h2>
            
            <div className="flex justify-center mb-8">
              <img 
                src="https://pbs.twimg.com/media/GzoYVH9WwAASDbt?format=jpg&name=large" 
                alt="Unstable Tether Meme" 
                className="w-full max-w-lg rounded-lg border-4 border-black transform rotate-1 shadow-[6px_6px_0_rgba(0,0,0,0.2)] hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="text-2xl md:text-3xl space-y-6 leading-relaxed font-hand">
              <p>
                Hi. We are <span className="font-bold text-teal-600">Unstable Tether</span>.
              </p>
              <p>
                Unlike other stablecoins that promise you $1.00 and give you anxiety, we promise you nothing and give you vibes.
              </p>
              <p>
                We are fully audited by "Trust Me Bro LLC". Our reserves are backed by hopes, dreams, and a half-eaten sandwich I found earlier.
              </p>
              <p className="text-center font-bold text-4xl mt-8 transform rotate-1">
                STAY UNSTABLE.
              </p>
            </div>
          </PaperCard>
        </div>
      </section>

      {/* Stats (Hand drawn style) */}
      <section id="stats" className="py-10 px-4 relative z-20">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <PaperCard rotate="-rotate-2" className="text-center bg-white">
              <div className="text-5xl mb-2">💸</div>
              <h3 className="text-2xl font-bold">Total Supply</h3>
              <p className="text-4xl font-black mt-2">1 Billion</p>
            </PaperCard>
            
            <PaperCard rotate="rotate-2" className="text-center bg-white">
              <div className="text-5xl mb-2">🔥</div>
              <h3 className="text-2xl font-bold">Liquidity</h3>
              <p className="text-4xl font-black mt-2">Burnt</p>
            </PaperCard>
            
            <PaperCard rotate="-rotate-1" className="text-center bg-white">
              <div className="text-5xl mb-2">📉</div>
              <h3 className="text-2xl font-bold">Peg Status</h3>
              <p className="text-4xl font-black mt-2">Unstable</p>
            </PaperCard>
          </div>
        </div>
      </section>

      {/* Chart Section */}
      <section id="chart" className="py-20 px-4 relative z-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl md:text-7xl text-center mb-10 text-white font-bold drop-shadow-[4px_4px_0_#000]">
            LIVE CHART
          </h2>
          <div className="border-4 border-black bg-white p-2 shadow-[12px_12px_0_rgba(0,0,0,0.2)] transform rotate-1">
             <div className="relative w-full pb-[65%]">
               <iframe 
                 src={`https://dexscreener.com/solana/${CA}?embed=1&loadChartSettings=0&chartLeftToolbar=0&chartTheme=light&theme=light&chartStyle=1&chartType=usd&interval=15`}
                 title="DexScreener Chart"
                 className="absolute w-full h-full top-0 left-0 border-0"
               ></iframe>
             </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 text-center text-white/80 relative z-20">
        <div className="flex justify-center gap-8 mb-8">
           <a href={X_LINK} target="_blank" rel="noopener noreferrer" className="text-white hover:text-black transition-colors transform hover:scale-125">
             <XIcon />
           </a>
           <a href={PUMP_LINK} target="_blank" rel="noopener noreferrer" className="text-white hover:text-black transition-colors transform hover:scale-125">
             <ChartIcon />
           </a>
        </div>
        <p className="text-xl font-bold">
          $USDUT is a memecoin with no intrinsic value or expectation of financial return.
        </p>
        <p className="mt-2 text-sm opacity-60">
          (But it's funny though)
        </p>
      </footer>
    </div>
  );
};

export default App;
