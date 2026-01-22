import React, { useState } from 'react';

// Icons
const XIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
  </svg>
);

const BuyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 17l9.2-9.2M17 17V7H7" />
  </svg>
);

const HeartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </svg>
);

const ChartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 20v-6M6 20V10M18 20V4M3 20h18" />
  </svg>
);

const EmailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

// Token Specs Icons
const SupplyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-40">
    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

const TaxIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-40">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const BurntIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-40">
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
  </svg>
);

const NetworkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-40">
    <path d="m16 3 4 4-4 4M20 7H4M8 21l-4-4 4-4M4 17h16" />
  </svg>
);

// Roadmap Icons
const RocketIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.71.79-1.35.79-1.35l-4.54-4.54s-.64.08-1.35.79z" />
    <path d="M15 12V3.5s0-1-1-1-1 1-1 1V12" />
    <path d="M9 12V6.5s0-1-1-1-1 1-1 1V12" />
    <path d="M15 12c0 5.5-4.5 10-10 10" />
    <path d="M9 12c0 5.5 4.5 10 10 10" />
  </svg>
);

const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const FlagIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
    <line x1="4" y1="22" x2="4" y2="15" />
  </svg>
);

const RefreshIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
    <path d="M21 3v5h-5" />
  </svg>
);

const App: React.FC = () => {
  const CA = "2oCxjpWWEmCuNaXiBSVahUKP1xRMRAiBfCg98YyHpump";
  const TICKER = "$BLACKBULL";
  const PROJECT_NAME = "BlackBull";
  const LOGO_URL = "https://pbs.twimg.com/profile_images/2014036873820110848/SAIdoDZc_400x400.jpg";
  const HERO_BG_URL = "https://www.shutterstock.com/image-illustration/darkness-telescope-solar-shine-horizontal-600nw-2489424719.jpg";
  const MANIFESTO_BANNER = "https://pbs.twimg.com/profile_banners/2009551887058739200/1769018796/600x200";
  const X_LINK = "https://x.com/blackbullonsol?s=21";
  const PUMP_LINK = `https://pump.fun/coin/${CA}`;
  const DEX_LINK = `https://dexscreener.com/solana/${CA}`;
  const CONTACT_EMAIL = "blackbullonsol@gmail.com";

  const [copied, setCopied] = useState(false);

  const copyCA = () => {
    navigator.clipboard.writeText(CA);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const roadmapItems = [
    {
      phase: "Phase I",
      title: "The Genesis",
      desc: "Launched on pump.fun. Initial surge of chaos and the birth of the herd.",
      icon: <RocketIcon />,
      side: "left" as const
    },
    {
      phase: "Phase II",
      title: "Community Takeover",
      desc: "When the original team left, the true bulls stepped up. A Community Takeover (CTO) initiated to secure the future.",
      icon: <RefreshIcon />,
      side: "right" as const
    },
    {
      phase: "Phase III",
      title: "The Expansion",
      desc: "Scaling the community. Building trust and awareness across the Solana arena.",
      icon: <UsersIcon />,
      side: "left" as const
    },
    {
      phase: "Phase IV",
      title: "The Great Stampede",
      desc: "Pushing the market cap into the multi-millions. Total arena dominance.",
      icon: <FlagIcon />,
      side: "right" as const
    }
  ];

  return (
    <div className="min-h-screen text-white selection:bg-white selection:text-black bg-[#0a0b0e]">
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-8 flex justify-between items-center bg-gradient-to-b from-black/40 to-transparent">
        <div className="flex items-center gap-4">
          <img src={LOGO_URL} alt="Logo" className="w-8 h-8 rounded-full border border-white/10" />
          <div className="flex flex-col">
            <span className="text-[11px] font-medium tracking-widest uppercase opacity-90">{PROJECT_NAME}</span>
            <span className="text-[10px] tracking-[0.2em] opacity-50">{TICKER}</span>
          </div>
        </div>
        
        <div className="hidden md:flex gap-12 items-center">
          <a href="#manifesto" className="nav-link">Manifesto</a>
          <a href="#roadmap" className="nav-link">Roadmap</a>
          <a href="#token" className="nav-link">Token</a>
          <a href="#chart" className="nav-link">Radar</a>
        </div>

        <div>
          <a href={X_LINK} target="_blank" rel="noopener noreferrer" className="opacity-40 hover:opacity-100 transition-opacity">
            <XIcon />
          </a>
        </div>
      </nav>

      {/* Main Sections */}
      <main className="relative">
        
        {/* Hero Section */}
        <section 
          className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center z-10"
          style={{ 
            backgroundImage: `linear-gradient(to bottom, rgba(26, 28, 34, 0.7), rgba(26, 28, 34, 0.8)), url("${HERO_BG_URL}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}
        >
          <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-1000">
            <div className="text-[13px] tracking-[0.5em] font-light uppercase opacity-60 mb-12">
              {TICKER}
            </div>

            <h1 className="hero-title text-6xl md:text-[100px] leading-tight font-light text-white/95 uppercase">
              The BlackBull
            </h1>
            
            <p className="max-w-xl mx-auto text-white/40 font-light text-sm md:text-base leading-loose tracking-wide">
              A token for those who turn their backs on the herd <br className="hidden md:block" />
              and march into the interior.
            </p>

            <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-12">
              <a href={PUMP_LINK} target="_blank" rel="noopener noreferrer">
                <button className="btn-ghost btn-ghost-glow px-12 py-4 rounded-sm flex items-center gap-3 text-sm tracking-widest uppercase font-light">
                  <BuyIcon /> Buy {TICKER}
                </button>
              </a>
              
              <button 
                onClick={copyCA}
                className="btn-ghost px-12 py-4 rounded-sm flex items-center gap-3 text-sm tracking-widest uppercase font-light"
              >
                <HeartIcon /> {copied ? 'ID Copied' : 'Join the Arena'}
              </button>
            </div>

            <div className="pt-8">
              <a href="#manifesto" className="text-white/40 hover:text-white transition-colors text-xs tracking-widest uppercase font-light flex items-center justify-center gap-2 group">
                Read the Manifesto <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
              </a>
            </div>
          </div>

          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 opacity-30">
            <div className="flex flex-col items-center gap-2">
              <img src={LOGO_URL} alt="Mini Icon" className="w-4 h-4 rounded-full grayscale" />
              <div className="w-[1px] h-4 bg-white/50"></div>
            </div>
          </div>
        </section>

        {/* Universe Section Start */}
        <div className="universe-container relative">
          <div className="stars-sm"></div>
          <div className="stars-md"></div>
          <div className="stars-lg"></div>

          {/* Manifesto Section */}
          <section id="manifesto" className="relative py-40 px-6 bg-transparent z-10">
            <div className="max-w-2xl mx-auto space-y-16">
              <div className="space-y-12">
                <div className="space-y-4 text-center md:text-left">
                  <span className="text-[10px] tracking-[0.4em] uppercase text-white/30">Manifesto</span>
                  <h2 className="text-4xl font-light italic leading-relaxed">"The market is a chaotic arena of noise and hesitation. In this landscape, the BlackBull does not browse; it conquers."</h2>
                </div>
                
                <div className="w-full grayscale border border-white/5 p-1 bg-white/[0.02] backdrop-blur-sm">
                  <img src={MANIFESTO_BANNER} alt="BlackBull Banner" className="w-full block" />
                </div>
              </div>
              
              <div className="font-light text-white/40 leading-relaxed text-lg space-y-8 text-justify">
                <p>
                  We are the antithesis of the stable, the predictable, and the weak. Our power is not derived from logic, but from the raw, high-voltage energy of the collective herd. 
                </p>
                <p>
                  To live is to charge. To stall is to vanish. We are building a community that strikes like lightning. When others retreat, we accelerate. Our ticker is a declaration of war against the red candles of mediocrity.
                </p>
              </div>
            </div>
          </section>

          {/* Roadmap Section */}
          <section id="roadmap" className="relative py-40 px-6 bg-transparent overflow-hidden z-10">
            <div className="max-w-5xl mx-auto flex flex-col items-center">
                <h2 className="text-[12px] tracking-[0.5em] font-light uppercase text-white/40 mb-24">Roadmap Strategy</h2>
                
                <div className="relative w-full">
                  <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] bg-white/10 hidden md:block"></div>
                  
                  <div className="space-y-24 md:space-y-12">
                    {roadmapItems.map((item, idx) => (
                      <div key={idx} className={`relative flex flex-col md:flex-row items-center w-full ${item.side === 'left' ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                        <div className="md:w-1/2 flex justify-center">
                          <div className={`w-full max-w-[340px] bg-black/40 border border-white/5 p-8 relative transition-all hover:bg-white/[0.05] backdrop-blur-md ${item.side === 'left' ? 'md:mr-16' : 'md:ml-16'}`}>
                              <div className="flex items-center justify-between mb-4">
                                <span className="text-[10px] tracking-widest text-white/40 uppercase">{item.phase}</span>
                                <span className="opacity-40">{item.icon}</span>
                              </div>
                              <h3 className="text-xl font-light tracking-wide mb-3">{item.title}</h3>
                              <p className="text-xs font-light leading-relaxed text-white/30 uppercase tracking-widest">{item.desc}</p>
                          </div>
                        </div>
                        <div className="absolute left-1/2 -translate-x-1/2 w-3 h-3 bg-[#1a1c22] border border-white/40 rounded-full hidden md:flex items-center justify-center z-10">
                          <div className="w-1 h-1 bg-white rounded-full"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
            </div>
          </section>

          {/* Token Specifications Section */}
          <section id="token" className="relative py-32 px-6 bg-transparent z-10">
            <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
              
              <h2 className="text-[12px] tracking-[0.5em] font-light uppercase text-white/40 mb-16">
                Token Specifications
              </h2>

              <div className="w-full max-w-4xl bg-black/60 border border-white/5 p-12 mb-1 backdrop-blur-lg transition-colors hover:bg-black/70">
                <div className="text-[10px] tracking-[0.4em] uppercase text-white/30 mb-4">Contract Address</div>
                <code className="text-sm md:text-xl font-light tracking-[0.1em] text-white/90 break-all cursor-pointer hover:text-white transition-colors" onClick={copyCA}>
                  {CA}
                </code>
                {copied && <div className="text-[9px] mt-2 tracking-widest text-white/40 uppercase">Synced to Clipboard</div>}
              </div>

              <div className="w-full max-w-4xl grid grid-cols-2 lg:grid-cols-4 bg-black/60 border border-white/5 overflow-hidden backdrop-blur-lg">
                <div className="flex flex-col items-center justify-center p-12 border-b lg:border-b-0 lg:border-r border-white/5 transition-colors hover:bg-white/[0.02]">
                  <SupplyIcon />
                  <span className="text-3xl font-light tracking-widest mt-6">1B</span>
                  <span className="text-[9px] tracking-[0.2em] uppercase text-white/30 mt-2">Total Supply</span>
                </div>
                <div className="flex flex-col items-center justify-center p-12 border-b lg:border-b-0 lg:border-r border-white/5 transition-colors hover:bg-white/[0.02]">
                  <TaxIcon />
                  <span className="text-3xl font-light tracking-widest mt-6">0/0</span>
                  <span className="text-[9px] tracking-[0.2em] uppercase text-white/30 mt-2">Tax</span>
                </div>
                <div className="flex flex-col items-center justify-center p-12 border-b md:border-b-0 lg:border-r border-white/5 transition-colors hover:bg-white/[0.02]">
                  <BurntIcon />
                  <span className="text-3xl font-light tracking-widest mt-6">100%</span>
                  <span className="text-[9px] tracking-[0.2em] uppercase text-white/30 mt-2">Burnt</span>
                </div>
                <div className="flex flex-col items-center justify-center p-12 transition-colors hover:bg-white/[0.02]">
                  <NetworkIcon />
                  <span className="text-3xl font-light tracking-widest mt-6">SOL</span>
                  <span className="text-[9px] tracking-[0.2em] uppercase text-white/30 mt-2">Network</span>
                </div>
              </div>

              <p className="mt-20 font-serif italic text-white/40 text-sm tracking-wide">
                "True to the Nietzschean spirit of freedom—no tax, no restrictions, no turning back."
              </p>
            </div>
          </section>

          {/* Radar Section */}
          <section id="chart" className="relative py-24 px-6 bg-transparent border-t border-white/5 z-10">
            <div className="max-w-6xl mx-auto">
              <div className="bg-black/50 border border-white/5 p-1 backdrop-blur-md">
                <div className="relative w-full pb-[110%] md:pb-[60%] lg:pb-[45%] grayscale hover:grayscale-0 transition-all duration-1000">
                  <iframe 
                    src={`https://dexscreener.com/solana/${CA}?embed=1&loadChartSettings=0&chartLeftToolbar=0&chartTheme=dark&theme=dark&chartStyle=1&chartType=usd&interval=15`}
                    title="BlackBull Chart"
                    className="absolute inset-0 w-full h-full border-0"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Footer (Lábléc) */}
          <footer className="relative py-24 px-8 border-t border-white/5 bg-black/40 backdrop-blur-xl flex flex-col items-center text-center z-10">
            <div className="max-w-md mx-auto space-y-12">
              <div className="space-y-4">
                <img src={LOGO_URL} alt="Footer Logo" className="w-12 h-12 rounded-full mx-auto grayscale border border-white/10 p-0.5" />
                <div className="flex flex-col">
                    <span className="text-[12px] font-medium tracking-[0.4em] uppercase">{PROJECT_NAME}</span>
                    <span className="text-[10px] tracking-[0.2em] opacity-40 uppercase">Solana Ecosystem</span>
                </div>
              </div>

              <p className="font-serif italic text-white/40 text-sm italic">"Towards the charge."</p>

              <div className="flex gap-4 justify-center">
                <a href={X_LINK} target="_blank" rel="noopener noreferrer" className="p-4 border border-white/5 hover:border-white/20 transition-all opacity-40 hover:opacity-100 bg-black/20">
                  <XIcon />
                </a>
                <a href={DEX_LINK} target="_blank" rel="noopener noreferrer" className="p-4 border border-white/5 hover:border-white/20 transition-all opacity-40 hover:opacity-100 bg-black/20">
                  <ChartIcon />
                </a>
                <a href={PUMP_LINK} target="_blank" rel="noopener noreferrer" className="p-4 border border-white/5 hover:border-white/20 transition-all opacity-40 hover:opacity-100 bg-black/20">
                  <HeartIcon />
                </a>
                <a href={`mailto:${CONTACT_EMAIL}`} className="p-4 border border-white/5 hover:border-white/20 transition-all opacity-40 hover:opacity-100 bg-black/20">
                  <EmailIcon />
                </a>
              </div>

              <div className="space-y-2">
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-[11px] tracking-[0.2em] text-white/30 hover:text-white/60 transition-colors uppercase">
                  {CONTACT_EMAIL}
                </a>
              </div>

              <div className="pt-8 border-t border-white/5 space-y-4">
                <p className="text-[9px] leading-relaxed opacity-20 uppercase tracking-[0.2em] max-w-xs mx-auto">
                  $BLACKBULL IS A TOKEN FOR THOSE WHO SEEK THE INTERIOR. NO INTRINSIC VALUE. NO PROMISES. ONLY THE CHARGE.
                </p>
                <p className="text-[10px] tracking-[0.3em] uppercase opacity-40">BlackBull Collective © 2026</p>
              </div>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default App;