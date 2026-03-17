import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: React.ReactNode;
}

export function LegalModal({ isOpen, onClose, title, content }: LegalModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl bg-gaming-surface border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
          >
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-gaming-surface/50">
              <h2 className="text-lg font-bold text-white pixel-font tracking-wider">{title}</h2>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6 overflow-y-auto text-gray-300 text-sm leading-relaxed custom-scrollbar">
              {content}
            </div>
            <div className="p-4 border-t border-white/10 bg-gaming-surface/50 flex justify-end">
              <button
                onClick={onClose}
                className="px-6 py-2 bg-neon-purple text-white font-bold rounded-xl hover:bg-neon-purple/90 transition-all shadow-[0_0_15px_rgba(168,85,247,0.3)]"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export const PRIVACY_POLICY = (
  <div className="space-y-4">
    <section>
      <h3 className="text-white font-bold mb-2">1. Information We Collect</h3>
      <p>We collect information you provide directly to us when you create an account, participate in contests, or communicate with us. This may include your username, email address, and performance data.</p>
    </section>
    <section>
      <h3 className="text-white font-bold mb-2">2. How We Use Your Information</h3>
      <p>We use the information we collect to provide, maintain, and improve our services, including processing your contest entries and displaying your rank on the leaderboard.</p>
    </section>
    <section>
      <h3 className="text-white font-bold mb-2">3. Data Security</h3>
      <p>We take reasonable measures to help protect information about you from loss, theft, misuse, and unauthorized access, disclosure, alteration, and destruction.</p>
    </section>
    <section>
      <h3 className="text-white font-bold mb-2">4. Cookies</h3>
      <p>We use cookies to enhance your experience, remember your preferences, and analyze our traffic.</p>
    </section>
  </div>
);

export const TERMS_OF_SERVICE = (
  <div className="space-y-4">
    <section>
      <h3 className="text-white font-bold mb-2">1. Acceptance of Terms</h3>
      <p>By accessing or using CodeQuest, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>
    </section>
    <section>
      <h3 className="text-white font-bold mb-2">2. User Conduct</h3>
      <p>You agree not to engage in any cheating, hacking, or unauthorized use of the platform. Any form of plagiarism in code submissions is strictly prohibited.</p>
    </section>
    <section>
      <h3 className="text-white font-bold mb-2">3. Intellectual Property</h3>
      <p>The platform and its original content, features, and functionality are owned by CodeQuest and are protected by international copyright, trademark, and other intellectual property laws.</p>
    </section>
    <section>
      <h3 className="text-white font-bold mb-2">4. Termination</h3>
      <p>We may terminate or suspend your account and bar access to the service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever.</p>
    </section>
  </div>
);
