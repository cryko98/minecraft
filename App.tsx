import React, { useState, useRef } from 'react';
import { generateMinecraftStyleImage } from './services/geminiService';
import { AppStatus } from './types';

// Icons
const XIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6 fill-current">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
  </svg>
);

const PickaxeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.5 5.5C14.5 5.5 15.5 3 17 3.5C18.5 4 20 5 20.5 6.5C21 8 18.5 9 18.5 9"/>
    <path d="M14.5 5.5L4 16C3.5 16.5 3.5 17.5 4 18L6 20C6.5 20.5 7.5 20.5 8 20L18.5 9.5"/>
    <path d="M13 11L9 7"/>
  </svg>
);

// Reusable Minecraft Components
const MinecraftButton: React.FC<{ 
  onClick?: () => void; 
  disabled?: boolean; 
  children: React.ReactNode; 
  className?: string; 
  variant?: 'gray' | 'green' | 'blue';
}> = ({ onClick, disabled, children, className = '', variant = 'gray' }) => {
  let baseColor = 'bg-stone-400';
  if (variant === 'green') baseColor = 'bg-lime-600 text-white';
  if (variant === 'blue') baseColor = 'bg-blue-600 text-white';
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`minecraft-btn relative px-6 py-3 font-bold text-xl uppercase tracking-widest ${baseColor} border-2 border-black disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {children}
    </button>
  );
};

const MinecraftPanel: React.FC<{ children: React.ReactNode; className?: string; title?: string }> = ({ children, className = '', title }) => (
  <div className={`minecraft-panel bg-stone-300 p-1 ${className}`}>
    {title && (
      <div className="bg-stone-500 text-white px-2 py-1 mb-2 border-b-4 border-stone-700 text-lg">
        {title}
      </div>
    )}
    <div className="bg-stone-300/50 p-2">
      {children}
    </div>
  </div>
);

const App: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [status, setStatus] = useState<AppStatus>(AppStatus.IDLE);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
      
      // Reset previous generation
      setGeneratedImage(null);
      setStatus(AppStatus.IDLE);
    }
  };

  const convertToMinecraft = async () => {
    if (!file || !previewUrl) return;

    setStatus(AppStatus.PROCESSING);
    setErrorMessage('');

    try {
      const result = await generateMinecraftStyleImage(previewUrl, file.type);
      setGeneratedImage(result);
      setStatus(AppStatus.SUCCESS);
    } catch (error: any) {
      console.error(error);
      setStatus(AppStatus.ERROR);
      
      let msg = error.message || 'Failed to craft image.';
      
      // Try to parse the error message more cleanly if it's JSON
      if (msg.includes('{')) {
        const start = msg.indexOf('{');
        const end = msg.lastIndexOf('}') + 1;
        try {
          const jsonPart = JSON.parse(msg.substring(start, end));
          if (jsonPart.error && jsonPart.error.message) {
            // Keep the key suffix info which is appended after the JSON usually
            const suffixInfo = msg.substring(end); 
            msg = `Google API Error: ${jsonPart.error.message} ${suffixInfo}`;
          }
        } catch (e) {
          // If parse fails, just use original string
        }
      }

      setErrorMessage(msg);
    }
  };

  return (
    <div className="min-h-screen bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-[#5d4037] text-white overflow-x-hidden selection:bg-lime-500 selection:text-black">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#2a2a2a] border-b-4 border-black p-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img 
              src="https://pbs.twimg.com/media/G8Am6k2XkAg4jUm?format=jpg&name=small" 
              alt="Logo" 
              className="w-12 h-12 border-4 border-black animate-bounce object-cover" 
            />
            <h1 className="text-3xl text-yellow-400 drop-shadow-[4px_4px_0_rgba(0,0,0,1)]">
              $MINECRAFT
            </h1>
          </div>
          <div className="hidden md:flex gap-6 text-xl text-stone-300">
            <a href="#generator" className="hover:text-white hover:underline decoration-4 decoration-lime-500">Generator</a>
            <a href="#tokenomics" className="hover:text-white hover:underline decoration-4 decoration-lime-500">Tokenomics</a>
            <a href="https://x.com/i/communities/1999638163858641117" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">Community</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="pt-32 pb-20 px-4 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="bg-black/50 p-8 border-4 border-white/20 backdrop-blur-sm inline-block rounded-none mb-8">
            <img 
              src="https://pbs.twimg.com/community_banner_img/1999636476016140288/vII_BJJW?format=jpg&name=small" 
              alt="Minecraftification Banner" 
              className="w-full mb-6 border-4 border-black shadow-lg"
            />
            {/* Adjusted text size to prevent wrapping on smaller screens while keeping it large on desktop */}
            <h2 className="text-4xl md:text-6xl lg:text-7xl mb-6 text-white drop-shadow-[6px_6px_0_#000] tracking-tighter">
              MINECRAFTIFICATION
            </h2>
            <p className="text-2xl md:text-3xl text-lime-400 mb-8 drop-shadow-[2px_2px_0_#000]">
              The Blockiest Memecoin on Solana
            </p>
            
            <div className="bg-stone-800 p-4 border-4 border-stone-600 mb-8 max-w-xl mx-auto">
              <p className="text-stone-400 text-sm mb-1 uppercase tracking-wider">Contract Address (SOL)</p>
              <div className="flex items-center justify-between gap-2 bg-black/50 p-2 border-2 border-stone-900">
                <code className="text-lime-300 truncate">AfsPxLpgJZBpm6vLgBwBi8F8izuJ9kPVCqDwxWyTbonk</code>
                <button className="text-xs bg-stone-600 hover:bg-stone-500 px-2 py-1 uppercase" onClick={() => alert("Copied!")}>Copy</button>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-center gap-4">
               <MinecraftButton variant="green" className="w-full md:w-auto">
                 Buy $MINECRAFT
               </MinecraftButton>
               <a href="https://x.com/i/communities/1999638163858641117" target="_blank" rel="noopener noreferrer" className="w-full md:w-auto">
                 <MinecraftButton variant="blue" className="w-full flex items-center justify-center gap-2">
                   <XIcon /> Join Community
                 </MinecraftButton>
               </a>
            </div>
          </div>
        </div>
        
        {/* Decorative Blocks */}
        <div className="absolute top-40 left-10 w-16 h-16 bg-lime-600 border-4 border-black opacity-80 rotate-12"></div>
        <div className="absolute bottom-10 right-20 w-24 h-24 bg-stone-600 border-4 border-black opacity-80 -rotate-6"></div>
      </header>

      {/* Generator Section */}
      <section id="generator" className="py-20 px-4 bg-[#3E2723] border-t-8 border-black shadow-[inset_0_10px_20px_rgba(0,0,0,0.5)]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-5xl mb-4 text-white drop-shadow-[4px_4px_0_#000]">Craft Your Avatar</h3>
            <p className="text-xl text-stone-300">Turn any image into a masterpiece.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Input Panel */}
            <MinecraftPanel title="Inventory (Upload)" className="min-h-[400px]">
              <div className="flex flex-col h-full gap-4">
                <div 
                  className={`flex-1 border-4 border-dashed border-stone-500 bg-stone-800/50 flex flex-col items-center justify-center p-6 cursor-pointer hover:bg-stone-800/80 transition-colors ${previewUrl ? 'border-solid border-lime-500' : ''}`}
                  onClick={() => fileInputRef.current?.click()}
                >
                  {previewUrl ? (
                    <img src={previewUrl} alt="Preview" className="max-h-64 object-contain pixelated shadow-lg" />
                  ) : (
                    <div className="text-center text-stone-400">
                      <div className="mx-auto w-16 h-16 mb-4 border-4 border-stone-600 bg-stone-700 flex items-center justify-center">
                        <span className="text-4xl">+</span>
                      </div>
                      <p>Click to select an item</p>
                    </div>
                  )}
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </div>
                
                <MinecraftButton 
                  onClick={convertToMinecraft}
                  disabled={!file || status === AppStatus.PROCESSING}
                  variant="green"
                  className="w-full flex justify-center items-center gap-2"
                >
                   {status === AppStatus.PROCESSING ? (
                     <>Processing...</>
                   ) : (
                     <>
                       <PickaxeIcon /> Craft Block
                     </>
                   )}
                </MinecraftButton>
                {errorMessage && (
                  <div className="bg-red-900/80 border-2 border-red-500 text-red-200 p-2 text-center text-sm font-bold break-words">
                    <p>{errorMessage}</p>
                  </div>
                )}
              </div>
            </MinecraftPanel>

            {/* Output Panel */}
            <MinecraftPanel title="Output (Result)" className="min-h-[400px]">
              <div className="flex flex-col h-full items-center justify-center bg-black/40 border-4 border-stone-800 min-h-[350px]">
                {status === AppStatus.PROCESSING ? (
                   <div className="text-center">
                     <div className="w-16 h-16 bg-lime-500 mx-auto animate-spin border-4 border-white mb-4"></div>
                     <p className="text-yellow-400 animate-pulse">Mining blocks...</p>
                   </div>
                ) : generatedImage ? (
                  <div className="relative group w-full h-full flex items-center justify-center p-2">
                    <img src={generatedImage} alt="Minecraftified" className="max-w-full max-h-[350px] shadow-2xl border-4 border-white" />
                    <a 
                      href={generatedImage} 
                      download="minecraftified.png"
                      className="absolute bottom-4 right-4 bg-blue-600 hover:bg-blue-500 text-white p-2 border-2 border-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      Download
                    </a>
                  </div>
                ) : (
                  <div className="text-stone-500 text-center p-8">
                    <p className="mb-2">No item crafted yet.</p>
                    <div className="w-12 h-12 bg-stone-800 border-2 border-stone-700 mx-auto opacity-50"></div>
                  </div>
                )}
              </div>
            </MinecraftPanel>
          </div>
        </div>
      </section>

      {/* Tokenomics / Info */}
      <section id="tokenomics" className="py-20 bg-[#5d4037]">
        <div className="max-w-6xl mx-auto px-4">
           <div className="grid md:grid-cols-3 gap-8 text-center">
             <MinecraftPanel className="p-8">
               <h4 className="text-3xl text-yellow-400 mb-2">Supply</h4>
               <p className="text-4xl">1 Billion</p>
               <p className="text-stone-500 text-sm mt-2">Fixed Supply</p>
             </MinecraftPanel>
             <MinecraftPanel className="p-8">
               <h4 className="text-3xl text-lime-400 mb-2">Liquidity</h4>
               <p className="text-4xl">Burned</p>
               <p className="text-stone-500 text-sm mt-2">Forever</p>
             </MinecraftPanel>
             <MinecraftPanel className="p-8">
               <h4 className="text-3xl text-blue-400 mb-2">Tax</h4>
               <p className="text-4xl">0/0</p>
               <p className="text-stone-500 text-sm mt-2">Buy / Sell</p>
             </MinecraftPanel>
           </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1a1a1a] border-t-4 border-black py-12 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl mb-8">$MINECRAFT</h2>
          <div className="flex justify-center gap-6 mb-8">
            <a 
              href="https://x.com/i/communities/1999638163858641117" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white text-black p-3 hover:bg-gray-200 transition-colors border-4 border-gray-400"
            >
              <XIcon />
            </a>
          </div>
          <p className="text-stone-600 text-sm">
            $MINECRAFT is a memecoin with no intrinsic value or expectation of financial return. 
            The coin is for entertainment purposes only. Not affiliated with Mojang or Microsoft.
          </p>
          <div className="mt-4 text-stone-800 text-xs font-mono">
            Build: {process.env.BUILD_TIME || 'Unknown'}
          </div>
          <p className="text-stone-700 text-xs mt-4">© 2024 Minecraftification</p>
        </div>
      </footer>
    </div>
  );
};

export default App;