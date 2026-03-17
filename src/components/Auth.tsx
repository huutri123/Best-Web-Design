import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Lock, Mail, Code2, Github, Chrome, ArrowRight, Check } from 'lucide-react';

export function Auth({ onLogin, onShowPrivacy, onShowTerms }: { onLogin: () => void; onShowPrivacy: () => void; onShowTerms: () => void }) {
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [code, setCode] = useState('');
  const [isCodeVerified, setIsCodeVerified] = useState(false);
  const [error, setError] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const particles = useMemo(() => {
    return [...Array(40)].map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      baseOpacity: Math.random() * 0.5 + 0.3,
      duration: 3 + Math.random() * 5,
      delay: Math.random() * 2
    }));
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden bg-gaming-bg">
      {/* Animated Gradient Orbs */}
      <motion.div 
        animate={{ 
          x: [0, 100, 0, -100, 0],
          y: [0, 50, 100, 50, 0],
          scale: [1, 1.2, 1, 0.8, 1]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-neon-purple/10 rounded-full blur-[120px] pointer-events-none"
      />
      <motion.div 
        animate={{ 
          x: [0, -100, 0, 100, 0],
          y: [0, -50, -100, -50, 0],
          scale: [1, 0.8, 1, 1.2, 1]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[10%] right-[20%] w-[600px] h-[600px] bg-neon-blue/10 rounded-full blur-[150px] pointer-events-none"
      />
      <motion.div 
        animate={{ 
          x: [0, 50, 100, 50, 0],
          y: [0, 100, 0, -100, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute top-[40%] left-[50%] w-[400px] h-[400px] bg-fuchsia-500/5 rounded-full blur-[100px] pointer-events-none -translate-x-1/2 -translate-y-1/2"
      />

      {/* Tech Grid Background */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,var(--theme-gaming-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--theme-gaming-border)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-50"
      ></div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-1.5 h-1.5 bg-white rounded-full"
            style={{
              boxShadow: '0 0 8px var(--theme-white)',
              top: particle.top,
              left: particle.left,
              opacity: particle.baseOpacity,
            }}
            animate={{
              y: [0, -60, 0],
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: particle.delay
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 overflow-y-auto overflow-x-hidden z-10">
        <div className="min-h-full flex items-center justify-center p-4 pt-8 pb-28 md:pb-8">
          <motion.div
            initial={{ maxWidth: isLogin ? '28rem' : '36rem' }}
            animate={{ maxWidth: isLogin ? '28rem' : '36rem' }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="relative w-full bg-gaming-surface/60 backdrop-blur-3xl border border-white/10 p-6 sm:p-10 rounded-3xl shadow-[inset_0_0_20px_rgba(255,255,255,0.02),0_8px_32px_rgba(0,0,0,0.8)]"
          >
        <div className="flex flex-col items-center justify-center mb-6 sm:mb-10">
          <div className="flex items-center gap-3 sm:gap-4 mb-2">
            <div className="bg-gradient-to-br from-neon-purple to-neon-blue p-2 sm:p-2.5 rounded-2xl text-white shadow-[0_0_20px_rgba(168,85,247,0.3)]">
              <Code2 className="w-6 h-6 sm:w-7 sm:h-7" strokeWidth={2.5} />
            </div>
            <h1 className="font-bold text-2xl sm:text-3xl pixel-font text-white tracking-widest text-center">CODEQUEST</h1>
          </div>
          <p className="text-gray-400 mt-1 sm:mt-2 text-xs sm:text-sm text-center">
            {isLogin ? 'Welcome back, warrior.' : 'Begin your journey.'}
          </p>
        </div>

        <div className="flex flex-col min-h-[200px] sm:min-h-[240px] justify-center">
          <AnimatePresence mode="wait" initial={false}>
            {isForgotPassword ? (
              <motion.div
                key="forgot"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col"
              >
                {!isCodeVerified ? (
                  <>
                    <div className="flex gap-2 mb-4">
                      <div className="relative group flex-1">
                        <Mail className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-neon-purple transition-colors" size={18} />
                        <input type="email" placeholder="Email" className="w-full bg-gray-900 border border-white/5 rounded-xl py-3 pl-12 pr-4 text-white focus:border-neon-purple focus:bg-gray-800 outline-none transition-all placeholder:text-gray-600" />
                      </div>
                      <button className="bg-neon-purple/20 text-neon-purple px-4 py-3 rounded-xl text-xs font-bold hover:bg-neon-purple/30 transition-colors whitespace-nowrap">Send Code</button>
                    </div>
                    <div className="relative group mb-2">
                      <Code2 className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-neon-purple transition-colors" size={18} />
                      <input 
                        type="text" 
                        placeholder="Enter code" 
                        value={code}
                        onChange={(e) => {
                          setCode(e.target.value);
                          setError('');
                        }}
                        className={`w-full bg-gray-900 border ${error ? 'border-red-500' : 'border-white/5'} rounded-xl py-3 pl-12 pr-4 text-white focus:border-neon-purple focus:bg-gray-800 outline-none transition-all placeholder:text-gray-600`} 
                      />
                    </div>
                    {error && <p className="text-red-500 text-[10px] mb-4 ml-1">{error}</p>}
                    <button
                      onClick={() => {
                        if (code === '123456') {
                          setIsCodeVerified(true);
                          setError('');
                        } else {
                          setError('Invalid verification code. Please try again.');
                        }
                      }}
                      className="w-full bg-neon-purple hover:bg-neon-purple/90 text-white font-bold py-3.5 rounded-xl transition-all shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:shadow-[0_0_25px_rgba(168,85,247,0.5)] flex items-center justify-center gap-2 mt-2"
                    >
                      <span>Enter</span>
                      <ArrowRight size={18} />
                    </button>
                  </>
                ) : (
                  <>
                    <div className="relative group mb-4">
                      <Lock className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-neon-purple transition-colors" size={18} />
                      <input 
                        type="password" 
                        placeholder="New Password" 
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full bg-gray-900 border border-white/5 rounded-xl py-3 pl-12 pr-4 text-white focus:border-neon-purple focus:bg-gray-800 outline-none transition-all placeholder:text-gray-600" 
                      />
                    </div>
                    <div className="relative group mb-4">
                      <Lock className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-neon-purple transition-colors" size={18} />
                      <input 
                        type="password" 
                        placeholder="Confirm New Password" 
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full bg-gray-900 border border-white/5 rounded-xl py-3 pl-12 pr-4 text-white focus:border-neon-purple focus:bg-gray-800 outline-none transition-all placeholder:text-gray-600" 
                      />
                    </div>
                    {error && <p className="text-red-500 text-[10px] mb-4 ml-1">{error}</p>}
                    <button
                      onClick={() => {
                        if (newPassword && newPassword === confirmPassword) {
                          setIsForgotPassword(false);
                          setIsCodeVerified(false);
                          setCode('');
                          setNewPassword('');
                          setConfirmPassword('');
                          setIsLogin(true);
                        } else if (!newPassword) {
                          setError('Please enter a new password.');
                        } else {
                          setError('Passwords do not match.');
                        }
                      }}
                      className="w-full bg-neon-purple hover:bg-neon-purple/90 text-white font-bold py-3.5 rounded-xl transition-all shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:shadow-[0_0_25px_rgba(168,85,247,0.5)] flex items-center justify-center gap-2 mt-2"
                    >
                      <span>Reset Password</span>
                      <ArrowRight size={18} />
                    </button>
                  </>
                )}
                <button 
                  onClick={() => {
                    setIsForgotPassword(false);
                    setIsCodeVerified(false);
                    setCode('');
                    setError('');
                  }} 
                  className="text-xs text-gray-500 hover:text-gray-300 mt-4 transition-colors"
                >
                  Back to Login
                </button>
              </motion.div>
            ) : isLogin ? (
              <motion.div
                key="login"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col"
              >
                <div className="relative group mb-4">
                  <Mail className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-neon-purple transition-colors" size={18} />
                  <input type="email" placeholder="Email" className="w-full bg-gray-900 border border-white/5 rounded-xl py-3 pl-12 pr-4 text-white focus:border-neon-purple focus:bg-gray-800 outline-none transition-all placeholder:text-gray-600" />
                </div>
                <div className="relative group mb-4">
                  <Lock className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-neon-purple transition-colors" size={18} />
                  <input type="password" placeholder="Password" className="w-full bg-gray-900 border border-white/5 rounded-xl py-3 pl-12 pr-4 text-white focus:border-neon-purple focus:bg-gray-800 outline-none transition-all placeholder:text-gray-600" />
                </div>
                <div className="flex items-center justify-between px-1 mb-2">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <div className="relative w-4 h-4 rounded border border-white/20 bg-gray-900 group-hover:border-neon-purple transition-colors flex items-center justify-center">
                      <input type="checkbox" className="peer sr-only" />
                      <Check size={12} className="text-neon-purple opacity-0 peer-checked:opacity-100 transition-opacity" />
                    </div>
                    <span className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">Remember me</span>
                  </label>
                  <button onClick={() => setIsForgotPassword(true)} className="text-xs text-neon-purple hover:text-neon-purple/80 transition-colors">Forgot password?</button>
                </div>
                <button
                  onClick={onLogin}
                  className="w-full bg-neon-purple hover:bg-neon-purple/90 text-white font-bold py-3.5 rounded-xl transition-all shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:shadow-[0_0_25px_rgba(168,85,247,0.5)] flex items-center justify-center gap-2 mt-2"
                >
                  <span>Initialize Session</span>
                  <ArrowRight size={18} />
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="register"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <div className="relative group">
                    <Mail className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-neon-purple transition-colors" size={18} />
                    <input type="email" placeholder="Email" className="w-full bg-gray-900 border border-white/5 rounded-xl py-3 pl-12 pr-4 text-white focus:border-neon-purple focus:bg-gray-800 outline-none transition-all placeholder:text-gray-600" />
                  </div>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-neon-purple transition-colors" size={18} />
                    <input type="email" placeholder="Email address" className="w-full bg-gray-900 border border-white/5 rounded-xl py-3 pl-12 pr-4 text-white focus:border-neon-purple focus:bg-gray-800 outline-none transition-all placeholder:text-gray-600" />
                  </div>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-neon-purple transition-colors" size={18} />
                    <input type="password" placeholder="Password" className="w-full bg-gray-900 border border-white/5 rounded-xl py-3 pl-12 pr-4 text-white focus:border-neon-purple focus:bg-gray-800 outline-none transition-all placeholder:text-gray-600" />
                  </div>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-neon-purple transition-colors" size={18} />
                    <input type="password" placeholder="Confirm Password" className="w-full bg-gray-900 border border-white/5 rounded-xl py-3 pl-12 pr-4 text-white focus:border-neon-purple focus:bg-gray-800 outline-none transition-all placeholder:text-gray-600" />
                  </div>
                </div>
                <label className="flex items-center gap-2 cursor-pointer group mb-4">
                  <div className={`relative w-4 h-4 rounded border ${agreedToTerms ? 'border-neon-purple bg-neon-purple/20' : 'border-white/20 bg-gray-900'} group-hover:border-neon-purple transition-colors flex items-center justify-center`}>
                    <input type="checkbox" className="peer sr-only" checked={agreedToTerms} onChange={(e) => setAgreedToTerms(e.target.checked)} />
                    <Check size={12} className={`text-neon-purple ${agreedToTerms ? 'opacity-100' : 'opacity-0'} transition-opacity`} />
                  </div>
                  <span className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">
                    I agree to the <button onClick={(e) => { e.preventDefault(); onShowTerms(); }} className="text-neon-purple hover:underline">Terms of Service</button> and <button onClick={(e) => { e.preventDefault(); onShowPrivacy(); }} className="text-neon-purple hover:underline">Privacy Policy</button>
                  </span>
                </label>
                <button
                  onClick={onLogin}
                  disabled={!agreedToTerms}
                  className="w-full bg-neon-purple hover:bg-neon-purple/90 text-white font-bold py-3.5 rounded-xl transition-all shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:shadow-[0_0_25px_rgba(168,85,247,0.5)] flex items-center justify-center gap-2 mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>Create Account</span>
                  <ArrowRight size={18} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {!isForgotPassword && (
          <>
            <div className="mt-6 sm:mt-8 flex items-center gap-4">
              <div className="h-px bg-white/10 flex-1"></div>
              <span className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider font-bold">Or continue with</span>
              <div className="h-px bg-white/10 flex-1"></div>
            </div>

            <div className="mt-4 sm:mt-6 grid grid-cols-2 gap-3 sm:gap-4">
              <button className="flex items-center justify-center gap-2 bg-gray-900 border border-white/5 hover:border-white/20 hover:bg-gray-800 text-white py-2 sm:py-2.5 rounded-xl transition-all">
                <Github size={18} />
                <span className="text-xs sm:text-sm font-bold">GitHub</span>
              </button>
              <button className="flex items-center justify-center gap-2 bg-gray-900 border border-white/5 hover:border-white/20 hover:bg-gray-800 text-white py-2 sm:py-2.5 rounded-xl transition-all">
                <Chrome size={18} />
                <span className="text-xs sm:text-sm font-bold">Google</span>
              </button>
            </div>

            <p className="text-center text-gray-400 text-xs sm:text-sm mt-6 sm:mt-8">
              {isLogin ? "New to CodeQuest?" : "Already a member?"}{' '}
              <button onClick={() => setIsLogin(!isLogin)} className="text-neon-purple font-bold hover:underline ml-1">
                {isLogin ? 'Create an account' : 'Sign in'}
              </button>
            </p>
          </>
        )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
