
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

const DownloadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="7 10 12 15 17 10"></polyline>
    <line x1="12" y1="15" x2="12" y2="3"></line>
  </svg>
);

const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
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

// --- DRAWING TOOL COMPONENTS ---
const COLORS = [
  '#000000', // Black
  '#FF0000', // Red
  '#00FF00', // Green
  '#0000FF', // Blue
  '#F08080', // Piggy Pink
  '#50bda3', // Background Green
  '#FFD700', // Gold
  '#FFFFFF', // Eraser
];

const DrawingTool: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#000000');
  const [lineWidth, setLineWidth] = useState(5);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    const { offsetX, offsetY } = getCoordinates(e, canvas);
    ctx.beginPath();
    ctx.moveTo(offsetX, offsetY);
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    ctx.strokeStyle = color;
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { offsetX, offsetY } = getCoordinates(e, canvas);
    ctx.lineTo(offsetX, offsetY);
    ctx.stroke();
  };

  const stopDrawing = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.closePath();
    setIsDrawing(false);
  };

  const getCoordinates = (e: React.MouseEvent | React.TouchEvent, canvas: HTMLCanvasElement) => {
    let clientX, clientY;
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = (e as React.MouseEvent).clientX;
      clientY = (e as React.MouseEvent).clientY;
    }
    const rect = canvas.getBoundingClientRect();
    return {
      offsetX: clientX - rect.left,
      offsetY: clientY - rect.top
    };
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  };

  const downloadCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = 'my-usdut-masterpiece.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  // Initialize white background
  useEffect(() => {
    clearCanvas();
  }, []);

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <div className="border-4 border-black bg-white shadow-[8px_8px_0_rgba(0,0,0,0.2)]">
        <canvas
          ref={canvasRef}
          width={window.innerWidth < 600 ? 300 : 600}
          height={400}
          className="cursor-crosshair touch-none"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
      </div>
      
      <div className="flex flex-wrap justify-center gap-4 bg-white p-4 hand-drawn-border rotate-1">
        {/* Colors */}
        <div className="flex gap-2 items-center">
          {COLORS.map((c) => (
            <button
              key={c}
              onClick={() => setColor(c)}
              className={`w-8 h-8 rounded-full border-2 border-black transition-transform hover:scale-110 ${color === c ? 'ring-2 ring-offset-2 ring-black' : ''}`}
              style={{ backgroundColor: c }}
              aria-label={`Select color ${c}`}
            />
          ))}
        </div>

        <div className="w-px h-8 bg-black/20 mx-2"></div>

        {/* Brush Size */}
        <div className="flex gap-2 items-center">
          <button onClick={() => setLineWidth(5)} className={`p-1 ${lineWidth === 5 ? 'bg-gray-200' : ''} rounded`}>
            <div className="w-2 h-2 bg-black rounded-full"></div>
          </button>
          <button onClick={() => setLineWidth(10)} className={`p-1 ${lineWidth === 10 ? 'bg-gray-200' : ''} rounded`}>
            <div className="w-4 h-4 bg-black rounded-full"></div>
          </button>
          <button onClick={() => setLineWidth(20)} className={`p-1 ${lineWidth === 20 ? 'bg-gray-200' : ''} rounded`}>
            <div className="w-6 h-6 bg-black rounded-full"></div>
          </button>
        </div>

        <div className="w-px h-8 bg-black/20 mx-2"></div>

        {/* Actions */}
        <div className="flex gap-2">
          <button onClick={clearCanvas} className="p-2 hover:bg-red-100 rounded text-red-600 transition-colors" title="Clear Canvas">
            <TrashIcon />
          </button>
          <button onClick={downloadCanvas} className="p-2 hover:bg-green-100 rounded text-green-600 transition-colors" title="Download">
            <DownloadIcon />
          </button>
        </div>
      </div>
    </div>
  );
};


const MEME_IMAGES = [
  "https://pbs.twimg.com/media/Gzj0U6SWQAE7axL?format=jpg&name=large",
  "https://pbs.twimg.com/media/GzmfUhMWkAAVSTu?format=jpg&name=large",
  "https://pbs.twimg.com/media/GziAQzIWsAAR4sG?format=jpg&name=large",
  "https://pbs.twimg.com/media/Gzq4TkMXYAAjNG7?format=jpg&name=medium",
  "https://pbs.twimg.com/media/Gzoq0B0XMAAHp8p?format=jpg&name=large",
  "https://pbs.twimg.com/media/GzrZeO1X0AAGOL6?format=jpg&name=large",
  "https://pbs.twimg.com/media/GzsbWcEWYAAh36x?format=jpg&name=large",
  "https://pbs.twimg.com/media/GzvivFiXgAAnxzT?format=jpg&name=large",
  "https://pbs.twimg.com/media/GzwPrPcWIAARVfN?format=jpg&name=large",
  "https://pbs.twimg.com/media/GzxkBBzXQAEwSfl?format=jpg&name=medium"
];

const MemeMarquee: React.FC = () => {
  return (
    <div className="overflow-hidden bg-[#222] py-6 border-y-4 border-black rotate-1 z-30 relative my-12 shadow-[0_0_20px_rgba(0,0,0,0.3)]">
      <div className="flex w-max animate-scroll hover:pause">
        {/* Render images multiple times for seamless looping */}
        {[...MEME_IMAGES, ...MEME_IMAGES, ...MEME_IMAGES].map((src, i) => (
          <div key={i} className="mx-4 transform hover:scale-105 transition-transform duration-300">
             <img 
               src={src} 
               alt={`Meme ${i}`} 
               className="h-64 w-auto rounded-xl border-4 border-white shadow-[4px_4px_0_#000] object-cover bg-white" 
             />
          </div>
        ))}
      </div>
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-scroll {
          animation: scroll 40s linear infinite;
        }
        .hover\\:pause:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
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
            <a href="#about" className="hover:text-teal-600 hover:underline decoration-wavy transition-colors">ABOUT</a>
            <a href="#draw" className="hover:text-teal-600 hover:underline decoration-wavy transition-colors">DRAW</a>
            <a href="#howto" className="hover:text-teal-600 hover:underline decoration-wavy transition-colors">HOW TO BUY</a>
            <a href="#chart" className="hover:text-teal-600 hover:underline decoration-wavy transition-colors">CHART</a>
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
            1 USDUT = 1 USDT
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

      {/* Floating Meme Marquee */}
      <MemeMarquee />

      {/* Handwritten Story Section */}
      <section id="about" className="py-20 px-4 relative z-20">
        <div className="max-w-5xl mx-auto">
          <PaperCard rotate="rotate-1" className="bg-[#fffbeb]">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Image (Left) */}
              <div className="w-full md:w-1/2">
                <img 
                  src="https://pbs.twimg.com/media/GzoYVH9WwAASDbt?format=jpg&name=large" 
                  alt="Unstable Tether Meme" 
                  className="w-full rounded-lg border-4 border-black transform -rotate-1 shadow-[6px_6px_0_rgba(0,0,0,0.2)] hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Text (Right) */}
              <div className="w-full md:w-1/2 font-hand text-xl md:text-2xl space-y-4">
                <p>Hi. We are <span className="font-bold text-teal-600">Unstable Tether</span>.</p>
                <p>Unlike other stablecoins that promise you $1.00 and give you anxiety, we promise you nothing and give you vibes.</p>
                <p>We are fully audited by "Trust Me Bro LLC". Our reserves are backed by hopes, dreams, and a half-eaten sandwich I found earlier.</p>
                <p className="font-bold text-3xl mt-4 transform rotate-1">STAY UNSTABLE.</p>
              </div>
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

      {/* Drawing Section */}
      <section id="draw" className="py-20 px-4 relative z-20">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <h2 className="text-5xl md:text-6xl text-center mb-10 text-white font-bold drop-shadow-[4px_4px_0_#000] transform rotate-1">
            DRAW YOUR USDUT
          </h2>
          <DrawingTool />
        </div>
      </section>

      {/* How To Buy Section */}
      <section id="howto" className="py-20 px-4 relative z-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl md:text-7xl text-center mb-12 text-white font-bold drop-shadow-[4px_4px_0_#000] transform -rotate-2">
            HOW TO BUY
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 1 */}
            <PaperCard rotate="-rotate-2" className="bg-[#e0f2f1] hover:scale-105 transition-transform duration-300">
              <div className="text-4xl font-bold mb-4 bg-black text-white w-12 h-12 flex items-center justify-center rounded-full border-2 border-white">1</div>
              <h3 className="text-2xl font-bold mb-2">Create Wallet</h3>
              <p className="text-lg">Download Phantom or any Solana wallet. It's like a pocket, but digital and safer (usually).</p>
            </PaperCard>

            {/* Step 2 */}
            <PaperCard rotate="rotate-1" className="bg-[#fff9c4] hover:scale-105 transition-transform duration-300">
              <div className="text-4xl font-bold mb-4 bg-black text-white w-12 h-12 flex items-center justify-center rounded-full border-2 border-white">2</div>
              <h3 className="text-2xl font-bold mb-2">Get SOL</h3>
              <p className="text-lg">Buy Solana from an exchange and send it to your wallet. Fuel for the rocket.</p>
            </PaperCard>

            {/* Step 3 */}
            <PaperCard rotate="-rotate-1" className="bg-[#ffebee] hover:scale-105 transition-transform duration-300">
              <div className="text-4xl font-bold mb-4 bg-black text-white w-12 h-12 flex items-center justify-center rounded-full border-2 border-white">3</div>
              <h3 className="text-2xl font-bold mb-2">Go to Pump.fun</h3>
              <p className="text-lg">Connect your wallet. Don't worry, we won't tell your mom what you're doing.</p>
              <a href={PUMP_LINK} target="_blank" rel="noopener noreferrer" className="block mt-4 text-center bg-black text-white py-2 rounded font-bold hover:bg-gray-800">GO TO LINK</a>
            </PaperCard>

            {/* Step 4 */}
            <PaperCard rotate="rotate-2" className="bg-[#e3f2fd] hover:scale-105 transition-transform duration-300">
              <div className="text-4xl font-bold mb-4 bg-black text-white w-12 h-12 flex items-center justify-center rounded-full border-2 border-white">4</div>
              <h3 className="text-2xl font-bold mb-2">Buy $USDUT</h3>
              <p className="text-lg">Swap SOL for USDUT. Welcome to the unstable family. Hold tight.</p>
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
