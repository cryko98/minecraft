
import React, { useState, useRef } from 'react';
import { generateMeme } from './services/geminiService';
import { AppStatus } from './types';

// Icons
const XIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6 fill-current">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
  </svg>
);

const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
    <line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/>
  </svg>
);

const WalletIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
    <rect x="2" y="4" width="20" height="16" rx="2"/><path d="M16 8h2a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2"/><path d="M20 12h-4"/>
  </svg>
);

const MinecraftButton: React.FC<{ 
  onClick?: () => void; 
  disabled?: boolean; 
  children: React.ReactNode; 
  className?: string; 
  variant?: 'gray' | 'green' | 'blue' | 'pink' | 'yellow';
}> = ({ onClick, disabled, children, className = '', variant = 'gray' }) => {
  let baseColor = 'bg-stone-400';
  if (variant === 'green') baseColor = 'bg-[#4da33c] hover:bg-[#5ebc4a] text-white';
  if (variant === 'blue') baseColor = 'bg-[#3c8dad] hover:bg-[#4ea6c9] text-white';
  if (variant === 'pink') baseColor = 'bg-[#ff85a1] hover:bg-[#ff99b1] text-white';
  if (variant === 'yellow') baseColor = 'bg-[#f7d51d] hover:bg-[#ffe042] text-black';
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`minecraft-btn relative px-6 py-3 font-bold text-xl uppercase tracking-widest ${baseColor} border-4 border-black disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 transition-all shadow-[4px_4px_0_rgba(0,0,0,1)] ${className}`}
    >
      {children}
    </button>
  );
};

const MinecraftPanel: React.FC<{ children: React.ReactNode; className?: string; title?: string; accent?: string }> = ({ children, className = '', title, accent = 'bg-stone-500' }) => (
  <div className={`minecraft-panel bg-[#d1d1d1] p-1 border-4 border-black shadow-[8px_8px_0_rgba(0,0,0,0.1)] ${className}`}>
    {title && (
      <div className={`${accent} text-white px-3 py-2 mb-2 border-b-4 border-black text-xl uppercase font-bold tracking-tighter`}>
        {title}
      </div>
    )}
    <div className="bg-[#e2e2e2] p-4 h-full border-2 border-white/50">
      {children}
    </div>
  </div>
);

const App: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [status, setStatus] = useState<AppStatus>(AppStatus.IDLE);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const CA = "8TB4mYMMtjbpW9P7KsEupAGBQxk8ipnPJFAH8mVCpump";
  const TICKER = "$BANK";
  const LOGO_URL = "https://pbs.twimg.com/profile_images/2005588300828971008/s-KpyDgj.jpg";
  const BANNER_URL = "https://pbs.twimg.com/profile_banners/2005588227588280320/1767004581/1500x500";
  const X_LINK = "https://x.com/FlyWheelPiggy";
  const PUMP_LINK = `https://pump.fun/coin/${CA}`;

  const randomMemes = [
    "Piggy bank sitting on a throne of diamond blocks like a king",
    "Piggy bank flying a blocky helicopter over a sunny meadow",
    "Piggy bank holding a giant golden $BANK coin",
    "Piggy bank driving a voxel sports car through a bright desert",
    "Piggy bank swimming in a sea of emerald blocks",
    "Piggy bank wearing a golden crown in a sunny village square",
    "Piggy bank riding a blocky turtle through a coral reef",
    "Piggy bank mining rare blocks under a bright pixel sun"
  ];

  const marqueeImages = [
    "https://pbs.twimg.com/media/G9VtHloXwAAKvvU?format=jpg&name=medium",
    "https://pbs.twimg.com/media/G9aakzNXMAAnxOh?format=jpg&name=medium",
    "https://pbs.twimg.com/media/G9VsnHJXoAE8JCw?format=jpg&name=medium",
    "https://pbs.twimg.com/media/G9VrkAyXEAAlmGu?format=jpg&name=medium",
    "https://pbs.twimg.com/media/G9Vpeh1WwAAwR-E?format=jpg&name=medium",
    "https://pbs.twimg.com/media/G9VoVglWoAAUbZ6?format=jpg&name=medium",
    "https://pbs.twimg.com/media/G9Vn_7hWgAAgS43?format=png&name=900x900",
    "https://pbs.twimg.com/media/G9Vmb1ZXkAEC8r6?format=jpg&name=medium",
    "https://pbs.twimg.com/media/G9WqJzYWMAEog4Y?format=jpg&name=medium",
    "https://pbs.twimg.com/media/G9VlVMpXUAAwgCq?format=jpg&name=medium",
    "https://pbs.twimg.com/media/G9VhIpCWoAAzXKJ?format=jpg&name=medium",
    "https://pbs.twimg.com/media/G9VaAKAWkAAMkb_?format=jpg&name=medium"
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result as string);
      reader.readAsDataURL(selectedFile);
    }
  };

  const generateMemeAction = async (customPrompt?: string) => {
    const finalPrompt = customPrompt || prompt || "A very happy blocky piggy bank in a sunny world";
    setStatus(AppStatus.PROCESSING);
    setErrorMessage('');
    try {
      const result = await generateMeme(finalPrompt, previewUrl || undefined, file?.type);
      setGeneratedImage(result);
      setStatus(AppStatus.SUCCESS);
    } catch (error: any) {
      console.error(error);
      setStatus(AppStatus.ERROR);
      setErrorMessage(error.message || 'Crafting failed.');
    }
  };

  const handleRandom = () => {
    const random = randomMemes[Math.floor(Math.random() * randomMemes.length)];
    setPrompt(random);
    generateMemeAction(random);
  };

  const copyCA = () => {
    navigator.clipboard.writeText(CA);
    alert("Contract Address Copied!");
  };

  return (
    <div className="min-h-screen text-black overflow-x-hidden selection:bg-[#f7d51d] selection:text-black relative">
      {/* Background Image */}
      <div className="fixed inset-0 -z-10 bg-[url('https://cdn.wallpapersafari.com/83/14/NKVgFh.jpg')] bg-cover bg-center bg-no-repeat bg-fixed"></div>
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#4da33c] border-b-4 border-black p-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src={LOGO_URL} alt="Logo" className="w-12 h-12 border-4 border-black object-cover" />
            <h1 className="text-3xl text-white drop-shadow-[4px_4px_0_rgba(0,0,0,1)] font-bold tracking-tighter">FLYWHEEL PIGGY BANK</h1>
          </div>
          <div className="hidden md:flex gap-8 text-xl text-white font-bold">
            <a href="#workshop" className="hover:text-[#f7d51d] transition-colors">WORKSHOP</a>
            <a href="#howtobuy" className="hover:text-[#f7d51d] transition-colors">HOW TO BUY</a>
            <a href="#tokenomics" className="hover:text-[#f7d51d] transition-colors">STATS</a>
            <a href="#chart" className="hover:text-[#f7d51d] transition-colors">CHART</a>
          </div>
          <div className="flex gap-4 items-center">
             <a href={X_LINK} target="_blank" rel="noopener noreferrer" className="bg-white p-2 border-2 border-black hover:bg-sky-100 transition-colors">
               <XIcon />
             </a>
             <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
               <MenuIcon />
             </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-[#4da33c] border-t-4 border-black p-6 flex flex-col gap-4 text-white text-2xl font-bold">
            <a href="#workshop" onClick={() => setIsMenuOpen(false)}>WORKSHOP</a>
            <a href="#howtobuy" onClick={() => setIsMenuOpen(false)}>HOW TO BUY</a>
            <a href="#tokenomics" onClick={() => setIsMenuOpen(false)}>STATS</a>
            <a href="#chart" onClick={() => setIsMenuOpen(false)}>CHART</a>
          </div>
        )}
      </nav>

      {/* Hero Header */}
      <header className="pt-32 pb-20 px-4 text-center relative overflow-hidden">
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="bg-white/90 p-6 md:p-8 border-4 border-black shadow-[12px_12px_0_rgba(0,0,0,0.1)] relative">
            {/* Top Grass Border */}
            <div className="absolute top-0 left-0 right-0 h-4 bg-[#5ebc4a] border-b-2 border-black/20"></div>
            
            <div className="mt-4 mb-8">
              <img src={BANNER_URL} alt="Minecraft World Banner" className="w-full h-auto max-h-[300px] object-cover border-4 border-black shadow-[4px_4px_0_#000]" />
            </div>
            
            <h2 className="text-6xl md:text-9xl mb-4 text-black font-bold drop-shadow-[4px_4px_0_#fff] leading-tight uppercase tracking-tighter">
              {TICKER}
            </h2>
            
            <p className="text-2xl md:text-4xl text-[#3c8dad] mb-12 font-bold drop-shadow-[1px_1px_0_#fff] uppercase">
              FLYWHEEL PIGGY BANK
            </p>
            
            <div className="bg-[#e8f5e9] p-6 border-4 border-black mb-12 max-w-2xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-left w-full">
                <span className="text-xs uppercase text-stone-500 font-bold block mb-1">OFFICIAL VAULT (CA)</span>
                <code className="text-black break-all text-sm md:text-xl font-mono font-bold">{CA}</code>
              </div>
              <MinecraftButton variant="yellow" className="w-full md:w-auto py-2 px-8 text-sm" onClick={copyCA}>
                COPY
              </MinecraftButton>
            </div>

            <div className="flex flex-col md:flex-row justify-center gap-6">
              <a href={PUMP_LINK} target="_blank" rel="noopener noreferrer" className="w-full md:w-72">
                <MinecraftButton variant="green" className="w-full">
                  BUY ON PUMP.FUN
                </MinecraftButton>
              </a>
              <MinecraftButton variant="blue" className="w-full md:w-72">
                DEXSCREENER
              </MinecraftButton>
            </div>
          </div>
        </div>
      </header>

      {/* Infinite Meme Marquee */}
      <div className="bg-[#1a1a1a] border-y-8 border-black py-4 overflow-hidden relative">
        <div className="flex w-max animate-marquee gap-6 hover:pause">
           {[...marqueeImages, ...marqueeImages].map((src, idx) => (
               <img key={idx} src={src} className="h-64 w-64 object-cover border-4 border-white shadow-[8px_8px_0_rgba(255,255,255,0.2)]" alt="Meme" />
           ))}
        </div>
      </div>

      {/* How to Buy on Pump.fun Section */}
      <section id="howtobuy" className="py-24 px-4 bg-[#3c8dad]/90 border-y-8 border-black">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-5xl md:text-7xl text-center mb-20 text-white drop-shadow-[6px_6px_0_#000] font-bold uppercase tracking-tighter">
            HOW TO JOIN THE VAULT
          </h3>
          
          <div className="grid md:grid-cols-4 gap-8">
            <MinecraftPanel title="1. CRAFT WALLET" accent="bg-[#4da33c]">
              <div className="text-center">
                <div className="text-5xl mb-4">🦊</div>
                <p className="text-lg font-bold">Download Phantom or Solflare. This is your personal inventory for {TICKER}.</p>
              </div>
            </MinecraftPanel>
            
            <MinecraftPanel title="2. MINE SOL" accent="bg-[#f7d51d]">
              <div className="text-center">
                <div className="text-5xl mb-4">💎</div>
                <p className="text-lg font-bold text-black">Fill your wallet with SOL from any exchange. You need it to swap for the good stuff.</p>
              </div>
            </MinecraftPanel>
            
            <MinecraftPanel title="3. PUMP.FUN" accent="bg-[#ff85a1]">
              <div className="text-center">
                <div className="text-5xl mb-4">🍄</div>
                <p className="text-lg font-bold">Head over to Pump.fun and paste our CA into the search bar. Look for the Piggy!</p>
              </div>
            </MinecraftPanel>
            
            <MinecraftPanel title="4. SWAP & HODL" accent="bg-[#4da33c]">
              <div className="text-center">
                <div className="text-5xl mb-4">🐷</div>
                <p className="text-lg font-bold">Swap your SOL for {TICKER}. Sit back and watch the bank grow!</p>
              </div>
            </MinecraftPanel>
          </div>

          <div className="mt-16 text-center">
            <a href={PUMP_LINK} target="_blank" rel="noopener noreferrer">
              <MinecraftButton variant="yellow" className="animate-pulse px-12 py-6 text-2xl">
                OPEN PUMP.FUN NOW
              </MinecraftButton>
            </a>
          </div>
        </div>
      </section>

      {/* Meme Workshop Section */}
      <section id="workshop" className="py-24 px-4 bg-white/90 border-b-8 border-black relative overflow-hidden">
        {/* Decorative Pixel Grass */}
        <div className="absolute top-0 left-0 right-0 h-10 bg-[#5ebc4a] border-b-4 border-black"></div>
        
        <div className="max-w-5xl mx-auto mt-16">
          <div className="text-center mb-20">
            <h3 className="text-5xl md:text-8xl mb-6 text-black font-bold drop-shadow-[4px_4px_0_#f7d51d] uppercase tracking-tighter">
              MEME CRAFTER
            </h3>
            <p className="text-2xl text-[#3c8dad] font-bold uppercase">GENERATE SUNNY {TICKER} MEMES</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <MinecraftPanel title="CRAFTING SLOTS" accent="bg-[#4da33c]">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm uppercase font-black text-stone-500">WHAT'S THE PIGGY DOING?</label>
                  <textarea 
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe a happy sunny scene..."
                    className="w-full bg-[#f9f9f9] border-4 border-black p-4 text-xl font-mono focus:outline-none focus:ring-4 ring-[#f7d51d] h-40 resize-none"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <MinecraftButton 
                    onClick={() => generateMemeAction()} 
                    disabled={status === AppStatus.PROCESSING}
                    variant="pink"
                    className="flex-1"
                  >
                    {status === AppStatus.PROCESSING ? 'CRAFTING...' : 'MINT MEME'}
                  </MinecraftButton>
                  <MinecraftButton 
                    onClick={handleRandom} 
                    disabled={status === AppStatus.PROCESSING}
                    variant="blue"
                  >
                    RANDOM
                  </MinecraftButton>
                </div>

                <div className="pt-6 border-t-4 border-dashed border-stone-300">
                  <label className="text-sm uppercase font-black text-stone-500 block mb-2">ADD A REFERENCE (OPTIONAL)</label>
                  <div 
                    className="bg-[#f0f0f0] border-4 border-dashed border-stone-400 p-8 text-center cursor-pointer hover:bg-[#e8f5e9] transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {previewUrl ? (
                      <img src={previewUrl} className="max-h-40 mx-auto border-4 border-black" />
                    ) : (
                      <div className="flex flex-col items-center gap-2">
                        <span className="text-5xl text-stone-400">+</span>
                        <span className="font-bold text-stone-400">UPLOAD PHOTO</span>
                      </div>
                    )}
                    <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
                  </div>
                </div>
              </div>
            </MinecraftPanel>

            <MinecraftPanel title="RESULT CHEST" accent="bg-[#3c8dad]">
              {/* Brighter Loading State - Avoiding Graying Out */}
              <div className={`border-4 border-black min-h-[450px] flex items-center justify-center relative overflow-hidden transition-colors duration-500 ${status === AppStatus.PROCESSING ? 'bg-[#FFF9C4]' : 'bg-[#E3F2FD]'}`}>
                {status === AppStatus.PROCESSING ? (
                  <div className="text-center z-10 p-6">
                    <div className="w-20 h-20 bg-[#f7d51d] mx-auto animate-spin border-4 border-black mb-8"></div>
                    <p className="text-[#4da33c] text-3xl font-bold animate-pulse uppercase drop-shadow-[2px_2px_0_#fff]">MINING BLOCKS...</p>
                    <p className="text-stone-500 text-sm mt-4 italic">Finding the perfect sunlight...</p>
                  </div>
                ) : generatedImage ? (
                  <div className="p-4 w-full h-full flex flex-col items-center">
                    <img src={generatedImage} alt="Meme" className="max-w-full shadow-[16px_16px_0_rgba(0,0,0,0.2)] border-4 border-white mb-8" />
                    <a href={generatedImage} download="minecraft-meme.png" className="w-full">
                      <MinecraftButton variant="green" className="w-full">SAVE TO INVENTORY</MinecraftButton>
                    </a>
                  </div>
                ) : (
                  <div className="text-stone-400 text-center uppercase font-black p-12 opacity-40">
                    <div className="text-8xl mb-6">📦</div>
                    <p className="text-2xl">EMPTY CHEST</p>
                  </div>
                )}
              </div>
            </MinecraftPanel>
          </div>
        </div>
      </section>

      {/* Tokenomics / Stats */}
      <section id="tokenomics" className="py-24 bg-[#4da33c]/90 text-white border-b-8 border-black">
        <div className="max-w-5xl mx-auto px-4">
          <h3 className="text-6xl text-center mb-20 font-bold drop-shadow-[6px_6px_0_#000] uppercase tracking-tighter">BANK STATS</h3>
          <div className="grid md:grid-cols-3 gap-10 text-center">
            <div className="p-8 border-4 border-black bg-white/20 backdrop-blur-sm">
              <h4 className="text-[#f7d51d] text-2xl mb-2 font-bold uppercase">SUPPLY</h4>
              <p className="text-5xl font-black">1 BILLION</p>
              <p className="text-white/70 text-sm mt-2 font-bold uppercase">Fixed Forever</p>
            </div>
            <div className="p-8 border-4 border-black bg-white/20 backdrop-blur-sm">
              <h4 className="text-[#ff85a1] text-2xl mb-2 font-bold uppercase">FEES</h4>
              <p className="text-5xl font-black">0% TAX</p>
              <p className="text-white/70 text-sm mt-2 font-bold uppercase">Safe & Free</p>
            </div>
            <div className="p-8 border-4 border-black bg-white/20 backdrop-blur-sm">
              <h4 className="text-sky-300 text-2xl mb-2 font-bold uppercase">SECURITY</h4>
              <p className="text-5xl font-black">BURNED</p>
              <p className="text-white/70 text-sm mt-2 font-bold uppercase">Liquidity Gone</p>
            </div>
          </div>
        </div>
      </section>

      {/* Live Chart Section */}
      <section id="chart" className="py-24 bg-[#f7d51d]/90 border-b-8 border-black">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-5xl md:text-8xl text-center mb-12 text-black font-bold drop-shadow-[4px_4px_0_#fff] uppercase tracking-tighter">
            LIVE CHART
          </h3>
          <div className="minecraft-panel bg-white p-2 border-4 border-black shadow-[12px_12px_0_rgba(0,0,0,0.1)]">
             <div className="relative w-full pb-[125%] lg:pb-[65%]">
               <iframe 
                 src="https://dexscreener.com/solana/CXeknkisKyYMDCHg17z7p37ETVQ4NPW9otQtkARZQViC?embed=1&loadChartSettings=0&chartLeftToolbar=0&chartTheme=dark&theme=light&chartStyle=1&chartType=usd&interval=15"
                 title="DexScreener Chart"
                 className="absolute w-full h-full top-0 left-0 border-0"
               ></iframe>
             </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1a1a1a] py-24 text-center border-t-8 border-black text-white relative">
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="flex items-center justify-center gap-4 mb-12">
            <img src={LOGO_URL} className="w-20 h-20 border-4 border-white shadow-[8px_8px_0_rgba(255,255,255,0.1)]" />
            <h2 className="text-6xl font-bold tracking-tighter">{TICKER}</h2>
          </div>
          
          <div className="flex justify-center gap-10 mb-12">
             <a href={X_LINK} target="_blank" rel="noopener noreferrer" className="bg-white p-5 border-4 border-stone-700 hover:scale-125 transition-transform text-black">
               <XIcon />
             </a>
             <a href={PUMP_LINK} target="_blank" rel="noopener noreferrer" className="bg-white p-5 border-4 border-stone-700 hover:scale-125 transition-transform text-black">
               <WalletIcon />
             </a>
          </div>

          <p className="text-stone-500 text-xl leading-relaxed mb-10 max-w-2xl mx-auto font-bold uppercase">
            FLYWHEEL PIGGY BANK IS A COMMUNITY DRIVEN MEMECOIN. WE LIKE BLOCKS. WE LIKE PIGS. WE LIKE GAINS. NO INTRINSIC VALUE. JUST VIBES.
          </p>
          
          <p className="text-stone-700 text-sm font-mono uppercase tracking-widest font-bold">
            © 2024 FLYWHEEL PIGGY BANK - NOT AFFILIATED WITH MOJANG
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
