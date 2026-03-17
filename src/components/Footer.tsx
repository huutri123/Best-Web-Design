import React from 'react';

export function Footer({ onShowPrivacy, onShowTerms, onShowContact }: { onShowPrivacy: () => void; onShowTerms: () => void; onShowContact: () => void }) {
  return (
    <footer className="w-full border-t border-gaming-border bg-gaming-surface py-6 px-4 md:px-8 mt-auto">
      <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-xs font-mono uppercase tracking-wider">
        <div>© 2026 CodeQuest. All rights reserved.</div>
        <div className="flex gap-6">
          <button onClick={onShowPrivacy} className="hover:text-neon-purple transition-colors">Privacy Policy</button>
          <button onClick={onShowTerms} className="hover:text-neon-purple transition-colors">Terms of Service</button>
          <button onClick={onShowContact} className="hover:text-neon-purple transition-colors">Contact</button>
        </div>
      </div>
    </footer>
  );
}
