import React from 'react';
import { motion } from 'motion/react';
import { MOCK_LEADERBOARD } from '../data';
import { getRatingColor, getRatingTitle } from '../utils';
import { Trophy, Medal, Crown, TrendingUp, Zap, Star } from 'lucide-react';

interface LeaderboardProps {
  onViewProfile?: (username: string) => void;
}

export function Leaderboard({ onViewProfile }: LeaderboardProps) {
  const topThree = MOCK_LEADERBOARD.slice(0, 3);
  const topFifty = MOCK_LEADERBOARD.slice(0, 50);
  const myRank = MOCK_LEADERBOARD.find(p => p.username === 'CyberNinja99');

  const renderPlayerRow = (player: typeof MOCK_LEADERBOARD[0], i: number, isSticky: boolean = false) => {
    const ratingColor = getRatingColor(player.rating);
    const ratingTitle = getRatingTitle(player.rating);
    const isMe = player.username === 'CyberNinja99';
    
    return (
      <motion.div 
        key={isSticky ? 'sticky-me' : player.username}
        initial={isSticky ? {} : { opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: isSticky ? 0 : 0.4 + (i * 0.05) }}
        onClick={() => onViewProfile?.(player.username)}
        className={`grid grid-cols-[50px_1fr] md:grid-cols-[80px_1fr_100px_120px] p-4 md:p-5 items-center group transition-all duration-300 cursor-pointer ${
          isMe ? 'bg-neon-purple/10 border-l-4 border-l-neon-purple' : 'hover:bg-gaming-bg/50'
        } ${isSticky ? 'border-t-2 border-neon-purple/50 bg-gaming-surface sticky bottom-0 z-20 shadow-[0_-10px_30px_rgba(0,0,0,0.8)]' : ''}`}
      >
        <div className="flex justify-center">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-mono font-black text-lg ${
            player.rank === 1 ? 'bg-neon-yellow/20 text-neon-yellow border border-neon-yellow/30' :
            player.rank === 2 ? 'bg-gray-400/20 text-gray-400 border border-gray-400/30' :
            player.rank === 3 ? 'bg-amber-600/20 text-amber-600 border border-amber-600/30' :
            'text-gray-500'
          }`}>
            {player.rank}
          </div>
        </div>
        
        <div className="flex items-center gap-4 pl-4">
          <div className="relative">
            <img 
              src={`https://api.dicebear.com/7.x/bottts/svg?seed=${player.username}&backgroundColor=18181b`} 
              alt="avatar" 
              className={`w-12 h-12 rounded-xl border bg-gaming-bg transition-transform group-hover:scale-110 ${
                isMe ? 'border-neon-purple' : 'border-gaming-border'
              }`}
            />
            {isMe && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-neon-green rounded-full border-2 border-gaming-surface animate-pulse"></div>
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg text-white group-hover:text-neon-blue transition-colors">
                {player.username}
              </span>
              {isMe && (
                <span className="text-[8px] px-1.5 py-0.5 bg-neon-purple/20 text-neon-purple border border-neon-purple/30 rounded font-black uppercase tracking-tighter">
                  YOU
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <div className="text-[10px] font-black uppercase tracking-wider" style={{ color: ratingColor }}>
                {ratingTitle}
              </div>
              <div className="w-1 h-1 rounded-full bg-gray-700"></div>
              <div className="text-[10px] text-gray-500 font-mono">
                {player.rating > 2000 ? 'LEGENDARY' : 'ELITE'}
              </div>
            </div>
          </div>
        </div>
        
        <div className="hidden md:block text-right">
          <div className="inline-flex flex-col items-end">
            <span className="font-mono font-black text-white text-lg">{player.level}</span>
            <div className="w-full h-1 bg-gaming-bg rounded-full mt-1 overflow-hidden">
              <div 
                className="h-full bg-neon-purple" 
                style={{ width: `${(player.level / 100) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        <div className="hidden md:block text-right">
          <div className="flex flex-col items-end">
            <div className="font-mono font-black text-xl flex items-center gap-1" style={{ color: ratingColor }}>
              {player.rating}
              <TrendingUp size={14} className="opacity-50" />
            </div>
            <div className="text-[10px] text-gray-500 font-mono">PTS</div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="w-full mx-auto space-y-12 pb-12">
      <div className="text-center space-y-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="inline-block"
        >
          <h1 className="text-4xl md:text-6xl font-black text-white pixel-font glow-text-yellow tracking-tighter uppercase italic">
            HALL OF FAME
          </h1>
        </motion.div>
        <p className="text-gray-400 font-mono tracking-widest uppercase text-xs">
          The most legendary coders in the digital realm
        </p>
      </div>

      {/* Top 3 Podium */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end max-w-5xl mx-auto px-4">
        {/* Rank 2 */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="order-2 md:order-1"
        >
          <div className="relative group cursor-pointer" onClick={() => onViewProfile?.(topThree[1].username)}>
            <div className="absolute -inset-1 bg-gradient-to-t from-gray-400/20 to-transparent rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative bg-gaming-surface border border-gray-400/30 rounded-2xl p-6 text-center transform hover:-translate-y-2 transition-transform duration-300">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gray-400 text-black font-black px-4 py-1 rounded-full text-xs pixel-font shadow-lg">
                RANK 2
              </div>
              <div className="relative inline-block mb-4">
                <img 
                  src={`https://api.dicebear.com/7.x/bottts/svg?seed=${topThree[1].username}&backgroundColor=18181b`} 
                  alt="avatar" 
                  className="w-20 h-20 rounded-full border-4 border-gray-400/50 bg-gaming-bg p-1"
                />
                <div className="absolute -bottom-2 -right-2 bg-gray-400 rounded-full p-1.5 shadow-lg">
                  <Medal size={16} className="text-black" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-1">{topThree[1].username}</h3>
              <p className="text-gray-400 text-xs font-mono mb-4 uppercase tracking-wider">{getRatingTitle(topThree[1].rating)}</p>
              <div className="text-2xl font-black text-gray-300 font-mono">{topThree[1].rating}</div>
            </div>
          </div>
        </motion.div>

        {/* Rank 1 */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="order-1 md:order-2"
        >
          <div className="relative group cursor-pointer" onClick={() => onViewProfile?.(topThree[0].username)}>
            <div className="absolute -inset-2 bg-gradient-to-t from-neon-yellow/30 via-neon-yellow/10 to-transparent rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition duration-1000 animate-pulse"></div>
            <div className="relative bg-gaming-surface border-2 border-neon-yellow/50 rounded-2xl p-10 text-center transform hover:-translate-y-4 transition-transform duration-300 shadow-[0_0_30px_rgba(var(--theme-neon-yellow-rgb),0.1)]">
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-amber-300 text-black font-black px-6 py-2 rounded-full text-sm pixel-font shadow-[0_0_20px_rgba(var(--theme-neon-yellow-rgb),0.4)]">
                CHAMPION
              </div>
              <div className="relative inline-block mb-6">
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 animate-bounce">
                  <Crown size={40} className="text-neon-white drop-shadow-[0_0_10px_rgba(255,105,180,0.8)]" />
                </div>
                <img 
                  src={`https://api.dicebear.com/7.x/bottts/svg?seed=${topThree[0].username}&backgroundColor=18181b`} 
                  alt="avatar" 
                  className="w-28 h-28 rounded-full border-4 border-neon-yellow bg-gaming-bg p-1 shadow-[0_0_20px_rgba(var(--theme-neon-yellow-rgb),0.2)]"
                />
                <div className="absolute -bottom-2 -right-2 bg-neon-yellow rounded-full p-2 shadow-lg">
                  <Trophy size={20} className="text-black" />
                </div>
              </div>
              <h3 className="text-2xl font-black text-white mb-1 tracking-tight">{topThree[0].username}</h3>
              <p className="text-neon-yellow text-sm font-mono mb-4 uppercase tracking-widest font-bold">{getRatingTitle(topThree[0].rating)}</p>
              <div className="text-4xl font-black text-white font-mono glow-text-yellow">{topThree[0].rating}</div>
            </div>
          </div>
        </motion.div>

        {/* Rank 3 */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="order-3"
        >
          <div className="relative group cursor-pointer" onClick={() => onViewProfile?.(topThree[2].username)}>
            <div className="absolute -inset-1 bg-gradient-to-t from-amber-600/20 to-transparent rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative bg-gaming-surface border border-amber-600/30 rounded-2xl p-6 text-center transform hover:-translate-y-2 transition-transform duration-300">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-600 text-black font-black px-4 py-1 rounded-full text-xs pixel-font shadow-lg">
                RANK 3
              </div>
              <div className="relative inline-block mb-4">
                <img 
                  src={`https://api.dicebear.com/7.x/bottts/svg?seed=${topThree[2].username}&backgroundColor=18181b`} 
                  alt="avatar" 
                  className="w-20 h-20 rounded-full border-4 border-amber-600/50 bg-gaming-bg p-1"
                />
                <div className="absolute -bottom-2 -right-2 bg-amber-600 rounded-full p-1.5 shadow-lg">
                  <Medal size={16} className="text-black" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-1">{topThree[2].username}</h3>
              <p className="text-gray-400 text-xs font-mono mb-4 uppercase tracking-wider">{getRatingTitle(topThree[2].rating)}</p>
              <div className="text-2xl font-black text-amber-600 font-mono">{topThree[2].rating}</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Leaderboard Table */}
      <div className="max-w-[1600px] mx-auto w-full">
        <div className="bg-gaming-surface border border-gaming-border rounded-2xl overflow-hidden shadow-2xl relative">
          <div className="grid grid-cols-[50px_1fr] md:grid-cols-[80px_1fr_100px_120px] p-4 md:p-5 border-b border-gaming-border bg-gaming-bg/80 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">
            <div className="text-center">RANK</div>
            <div className="pl-4">WARRIOR</div>
            <div className="hidden md:block text-right">LVL</div>
            <div className="hidden md:block text-right">RATE</div>
          </div>
          
          <div className="divide-y divide-gaming-border/50 max-h-[800px] overflow-y-auto custom-scrollbar">
            {topFifty.map((player, i) => renderPlayerRow(player, i))}
            <div className="h-8"></div>
          </div>

          {/* Sticky User Rank Row */}
          {myRank && renderPlayerRow(myRank, 0, true)}
        </div>
      </div>

      {/* Bottom Stats Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="bg-gaming-bg border border-gaming-border rounded-2xl p-6 flex flex-wrap justify-center gap-12"
      >
        <div className="flex items-center gap-3">
          <Zap className="text-neon-yellow" size={24} />
          <div>
            <div className="text-white font-black text-xl">1.2M+</div>
            <div className="text-gray-500 text-xs font-mono uppercase">Total Submissions</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Star className="text-neon-blue" size={24} />
          <div>
            <div className="text-white font-black text-xl">42,069</div>
            <div className="text-gray-500 text-xs font-mono uppercase">Active Warriors</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Trophy className="text-neon-purple" size={24} />
          <div>
            <div className="text-white font-black text-xl">500+</div>
            <div className="text-gray-500 text-xs font-mono uppercase">Quests Conquered</div>
          </div>
        </div>
      </motion.div>
      
      {/* Bottom Spacer to provide extra scrolling space */}
      <div className="h-24"></div>
    </div>
  );
}
