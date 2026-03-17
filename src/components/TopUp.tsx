import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Coins, CreditCard, Zap, ShieldCheck, Copy, Check, QrCode, ExternalLink, Smartphone, Heart } from 'lucide-react';

const PACKAGES = [
  { id: 'p1', amount: 750, price: '50,000', bonus: 0, popular: false },
  { id: 'p2', amount: 1500, price: '100,000', bonus: 200, popular: true },
  { id: 'p3', amount: 3750, price: '250,000', bonus: 500, popular: false },
  { id: 'p4', amount: 7500, price: '500,000', bonus: 1500, popular: false },
  { id: 'p5', amount: 15000, price: '1,000,000', bonus: 5000, popular: false },
  { id: 'p6', amount: 22500, price: '1,500,000', bonus: 10000, popular: false },
];

export function TopUp() {
  const [copied, setCopied] = useState(false);
  const [copiedcontent, setCopiedContent] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(PACKAGES[1]);
  const [customAmount, setCustomAmount] = useState<number | ''>('');
  const [isCustom, setIsCustom] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('6804012007');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyContent = () => {
    navigator.clipboard.writeText('BUY PREMIUM');
    setCopiedContent(true);
    setTimeout(() => setCopiedContent(false), 2000);
  };

  const finalPrice = isCustom ? (Number(customAmount) || 0) * 1000 : Number(selectedPackage.price.replace(/,/g, ''));
  const finalCredits = isCustom ? (Number(customAmount) || 0) * 15 : selectedPackage.amount + (selectedPackage.bonus || 0);
  const UID = 123456;

  const qrUrl = `https://img.vietqr.io/image/MB-6804012007-compact.png?amount=${finalPrice}&addInfo=${UID}%20TOPUP%20${finalCredits}%20CREDITS`;

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9]/g, '');
    setCustomAmount(val === '' ? '' : Number(val));
    setIsCustom(true);
  };

  return (
    <div className="w-full max-w-6xl mx-auto pb-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white pixel-font text-xl md:text-3xl mb-1 uppercase tracking-wider">TOP-UP CREDITS</h1>
        <p className="text-gray-400 text-sm flex items-center gap-2">
          <Heart className="text-neon-purple" size={16} />
          We use the funds you deposit to operate the website. Thank you!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side: QR Code (Compact) */}
        <div className="lg:col-span-5">
          <div className="sticky top-24">
            <div className="bg-gaming-surface border border-gaming-border rounded-3xl p-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon-purple to-transparent"></div>
              
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-neon-blue/10 border border-neon-blue/20 rounded-full text-neon-blue text-[10px] font-bold uppercase tracking-widest mb-3">
                  <QrCode size={12} />
                  <span>Scan to Pay</span>
                </div>
              </div>

              <div className="bg-white p-3 rounded-2xl mb-6 relative group max-w-[280px] mx-auto">
                <img 
                  src={qrUrl} 
                  alt="MBBank QR Code" 
                  className="w-full aspect-square object-contain"
                />
              </div>

              <div className="space-y-3">
                <div className="bg-gaming-bg border border-gaming-border p-3 rounded-xl">
                  <div className="text-[9px] text-gray-500 uppercase font-bold tracking-widest mb-0.5">Account Name</div>
                  <div className="text-md font-bold text-white">CODEQUEST SYSTEM</div>
                </div>

                <div className="bg-gaming-bg border border-gaming-border p-3 rounded-xl">
                  <div className="text-[9px] text-gray-500 uppercase font-bold tracking-widest mb-0.5">Account Number</div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-mono font-bold text-white tracking-wider">6804012007</span>
                    <button 
                      onClick={handleCopy}
                      className="p-1.5 hover:bg-white/5 rounded-lg transition-colors text-neon-purple"
                    >
                      {copied ? <Check size={16} /> : <Copy size={16} />}
                    </button>
                  </div>
                </div>

                <div className="bg-gaming-bg border border-gaming-border p-3 rounded-xl">
                  <div className="text-[9px] text-gray-500 uppercase font-bold tracking-widest mb-0.5">Content</div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-mono font-bold text-white tracking-wider">{UID} TOPUP {finalCredits} CREDITS</span>
                    <button 
                      onClick={handleCopyContent}
                      className="p-1.5 hover:bg-white/5 rounded-lg transition-colors text-neon-purple"
                    >
                      {copiedcontent ? <Check size={16} /> : <Copy size={16} />}
                    </button>
                  </div>
                </div>

                <div className="bg-neon-purple/10 border border-neon-purple/20 p-3 rounded-xl">
                  <div className="text-[9px] text-neon-purple uppercase font-bold tracking-widest mb-0.5">Transfer Amount</div>
                  <div className="flex items-baseline justify-between">
                    <div className="text-xl font-mono font-bold text-white">{finalPrice.toLocaleString()}</div>
                    <span className="text-xs font-normal text-gray-400 ml-1">VND</span>
                  </div>
                  <div className="text-[10px] text-neon-green font-bold mt-1">≈ {finalCredits.toLocaleString()} Credits</div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gaming-border text-center">
                <div className="flex justify-center gap-3 opacity-30 grayscale">
                  <CreditCard size={16} />
                  <Smartphone size={16} />
                  <ShieldCheck size={16} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Packages & Custom Amount */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center gap-2 mb-4 text-gray-400 uppercase text-[10px] font-bold tracking-widest">
            <Coins size={14} />
            <span>Select Package or Enter Amount</span>
          </div>

          {/* Custom Amount Input */}
          <div 
            className={`p-6 rounded-3xl border transition-all ${isCustom ? 'bg-neon-blue/10 border-neon-blue shadow-[0_0_30px_rgba(56,189,248,0.2)]' : 'bg-gaming-surface border-gaming-border'}`}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-white">Custom Amount</h3>
                <p className="text-xs text-gray-400">Enter multiplier (1 = 1,000 VND)</p>
              </div>
              {isCustom && <span className="text-[10px] font-black bg-neon-blue text-black px-3 py-1 rounded-full uppercase tracking-widest">Active</span>}
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex-1">
                <input 
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={customAmount}
                  onChange={handleCustomChange}
                  placeholder="e.g. 15"
                  className="w-full bg-gaming-bg border border-gaming-border rounded-2xl px-6 py-4 text-white text-xl font-mono focus:outline-none focus:border-neon-blue transition-colors"
                  onFocus={() => setIsCustom(true)}
                />
              </div>
              <div className="flex flex-col md:flex-row items-center justify-between bg-gaming-bg/50 p-4 rounded-2xl border border-gaming-border gap-2 md:gap-4">
                <div className="text-xs text-gray-400 uppercase font-bold tracking-widest text-center md:text-left">Received Credits</div>
                <div className="text-2xl font-mono font-black text-neon-green">
                  {customAmount ? (Number(customAmount) * 15).toLocaleString() : '0'}
                </div>
              </div>
            </div>
          </div>

          <div className="h-px bg-gaming-border my-6"></div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {PACKAGES.map((pkg) => (
              <motion.div
                key={pkg.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setSelectedPackage(pkg);
                  setIsCustom(false);
                }}
                className={`cursor-pointer p-4 rounded-2xl border transition-all relative overflow-hidden group flex flex-col items-center text-center ${
                  !isCustom && selectedPackage.id === pkg.id 
                    ? 'bg-neon-purple/10 border-neon-purple shadow-[0_0_20px_rgba(168,85,247,0.15)]' 
                    : 'bg-gaming-surface border-gaming-border hover:border-gray-600'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute top-0 right-0 bg-neon-purple text-black text-[9px] font-black px-3 py-1 rounded-bl-lg uppercase tracking-tighter">
                    Best Value
                  </div>
                )}
                
                <div className={`p-3 rounded-xl transition-colors mb-3 ${!isCustom && selectedPackage.id === pkg.id ? 'bg-neon-purple text-black' : 'bg-gaming-bg text-neon-yellow'}`}>
                  <Coins size={24} />
                </div>
                
                <div className="text-xl font-mono font-bold text-white">{(pkg.amount + (pkg.bonus || 0)).toLocaleString()}</div>
                <div className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-2">Credits</div>
                
                <div className="text-sm font-bold text-white">{pkg.price} <span className="text-[10px] font-normal text-gray-500">VND</span></div>
                
                {pkg.bonus > 0 && (
                  <div className="flex items-center gap-1 text-neon-green text-[9px] font-bold mt-2">
                    <Zap size={10} />
                    <span>+{pkg.bonus.toLocaleString()}</span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          <div className="mt-8 p-6 bg-gaming-surface/50 border border-gaming-border rounded-2xl">
            <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
              <ShieldCheck className="text-neon-blue" size={18} />
              Payment Information
            </h3>
            <ul className="space-y-3 text-xs text-gray-400">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-neon-purple mt-1 shrink-0"></div>
                <span>Conversion rate: 1,000 VND = 15 Credits.</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-neon-purple mt-1 shrink-0"></div>
                <span>Credits are added instantly after the transaction is confirmed.</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-neon-purple mt-1 shrink-0"></div>
                <span>Please ensure the transfer content matches the generated QR code.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="h-24 md:h-0"></div>
    </div>
  );
}

