import React from 'react';
import { motion } from 'motion/react';
import { User } from '../types';
import { getRatingColor, getRatingTitle } from '../utils';
import { Trophy, Zap, Target, Flame, Shield, Sword, Moon, Award, Calendar, Github, Twitter, MapPin, TrendingUp, LogOut, UserPlus, Users, UserCheck, X, UserMinus, Facebook, Linkedin, Globe, Phone, History, ArrowLeft, Code, Copy, Check } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { AnimatePresence } from 'motion/react';

import { MOCK_USER, MOCK_LEADERBOARD } from '../data';

interface ProfileProps {
  user: User;
  onViewProfile?: (username: string) => void;
  onEditProfile?: () => void;
  onSelectQuest?: (questTitle: string) => void;
}

export function Profile({ user, onViewProfile, onEditProfile, onSelectQuest }: ProfileProps) {
  const [showFollowing, setShowFollowing] = React.useState(false);
  const [showSearch, setShowSearch] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [followingSearchQuery, setFollowingSearchQuery] = React.useState('');
  const [followingList, setFollowingList] = React.useState<string[]>(MOCK_USER.following || []);
  const [isViewingAllSubmissions, setIsViewingAllSubmissions] = React.useState(false);
  const [selectedCode, setSelectedCode] = React.useState<string | null>(null);
  const [isCopied, setIsCopied] = React.useState(false);
  
  const isMe = user.username === MOCK_USER.username;
  const isFollowing = followingList.includes(user.username);

  const handleFollowToggle = (username: string) => {
    setFollowingList(prev => {
      if (prev.includes(username)) {
        return prev.filter(u => u !== username);
      } else {
        return [...prev, username];
      }
    });
  };
  const getBadgeIcon = (iconName: string) => {
    switch(iconName) {
      case 'sword': return <Sword size={24} className="text-neon-red" />;
      case 'moon': return <Moon size={24} className="text-neon-blue" />;
      case 'shield': return <Shield size={24} className="text-neon-green" />;
      default: return <Award size={24} className="text-neon-purple" />;
    }
  };

  const ratingColor = getRatingColor(user.rating);
  const ratingTitle = getRatingTitle(user.rating);
  const maxRating = Math.max(...user.ratingHistory.map(h => h.rating));

  // Mock data for all submissions
  const ALL_SUBMISSIONS = React.useMemo(() => {
    return Array.from({ length: 50 }).map((_, i) => {
      const statuses = ['Accepted', 'Wrong Answer', 'Time Limit Exceeded', 'Runtime Error', 'Compilation Error'];
      const langs = ['JavaScript', 'Python', 'C++', 'Java', 'Go', 'Rust'];
      const quests = ['The Array Awakening', 'String Sorcery', 'Binary Search Basics', "Graph Guardian's Riddle", 'Dynamic Dragon', 'The First Spell: 1+1'];
      
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      const lang = langs[Math.floor(Math.random() * langs.length)];
      const quest = quests[Math.floor(Math.random() * quests.length)];
      
      return {
        id: i,
        quest,
        lang,
        status,
        time: `${Math.floor(Math.random() * 24) + 1} hours ago`,
        runtime: status === 'Accepted' ? `${Math.floor(Math.random() * 100) + 1}ms` : 'N/A',
        code: `// Code for ${quest} in ${lang}\n\nfunction solve() {\n  console.log("Hello World");\n}\n\nsolve();`
      };
    });
  }, []);

  const handleCopyCode = async () => {
    if (selectedCode) {
      try {
        await navigator.clipboard.writeText(selectedCode);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy text: ', err);
      }
    }
  };

  if (isViewingAllSubmissions) {
    return (
      <div className="max-w-[1600px] mx-auto w-full space-y-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <History className="text-neon-blue" /> All Submissions
          </h2>
          <button 
            onClick={() => setIsViewingAllSubmissions(false)}
            className="px-4 py-2 bg-gaming-bg border border-gaming-border rounded-lg text-gray-400 hover:text-white transition-colors flex items-center gap-2 font-bold text-sm"
          >
            <ArrowLeft size={18} /> BACK TO PROFILE
          </button>
        </div>

        <div className="bg-gaming-surface border border-gaming-border rounded-xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto overflow-y-auto custom-scrollbar max-h-[700px]">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead className="sticky top-0 z-10 bg-gaming-surface">
                <tr className="bg-gaming-bg/80 border-b border-gaming-border text-xs uppercase tracking-wider text-gray-500 font-mono backdrop-blur-md">
                  <th className="p-4 font-medium">Problem</th>
                  <th className="p-4 font-medium">Time</th>
                  <th className="p-4 font-medium">Language</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium">Runtime</th>
                  <th className="p-4 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gaming-border">
                {ALL_SUBMISSIONS.map((sub) => (
                  <tr key={sub.id} className="hover:bg-gaming-bg/30 transition-colors">
                    <td className="p-4">
                      <button 
                        onClick={() => onSelectQuest?.(sub.quest)}
                        className="font-bold text-white hover:text-neon-blue transition-colors text-left"
                      >
                        {sub.quest}
                      </button>
                    </td>
                    <td className="p-4 text-sm text-gray-400">{sub.time}</td>
                    <td className="p-4 text-sm text-neon-blue font-mono">{sub.lang}</td>
                    <td className="p-4">
                      <span className={`text-sm font-bold ${
                        sub.status === 'Accepted' ? 'text-neon-green' : 
                        sub.status === 'Wrong Answer' ? 'text-neon-red' : 
                        sub.status === 'Time Limit Exceeded' ? 'text-neon-yellow' : 'text-orange-500'
                      }`}>
                        {sub.status}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-gray-500 font-mono">{sub.runtime}</td>
                    <td className="p-4 text-right">
                      <button 
                        onClick={() => setSelectedCode(sub.code)}
                        className="text-sm px-3 py-1 bg-gaming-bg border border-gaming-border rounded text-gray-300 hover:text-white hover:border-gray-500 transition-colors flex items-center gap-2 ml-auto font-bold"
                      >
                        <Code size={14} /> See Code
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="h-4"></div>
          </div>
        </div>

        {/* Bottom Spacer to provide extra scrolling space */}
        <div className="h-24"></div>

        {/* Code Modal */}
        {selectedCode && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gaming-surface border border-gaming-border rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl flex flex-col max-h-[80vh]"
            >
              <div className="p-4 border-b border-gaming-border flex justify-between items-center bg-gaming-bg/50">
                <h3 className="font-bold text-white flex items-center gap-2">
                  <Code size={18} className="text-neon-purple" /> Submission Code
                </h3>
                <div className="flex items-center gap-4">
                  <button
                    onClick={handleCopyCode}
                    className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 bg-gaming-bg border border-gaming-border rounded-md text-gray-300 hover:text-white hover:border-neon-blue transition-colors"
                  >
                    {isCopied ? <Check size={14} className="text-neon-green" /> : <Copy size={14} />}
                    {isCopied ? <span className="text-neon-green">COPIED</span> : "COPY"}
                  </button>
                  <button 
                    onClick={() => {
                      setSelectedCode(null);
                      setIsCopied(false);
                    }}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
              <div className="p-4 overflow-y-auto custom-scrollbar flex-1 bg-gaming-bg">
                <pre className="text-sm font-mono text-green-400 whitespace-pre-wrap">
                  {selectedCode}
                </pre>
              </div>
              <div className="p-4 bg-gaming-bg/30 border-t border-gaming-border">
                <button 
                  onClick={() => setSelectedCode(null)}
                  className="w-full py-2 bg-gaming-bg border border-gaming-border rounded-lg text-sm font-bold text-gray-400 hover:text-white transition-colors"
                >
                  CLOSE
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-[1600px] mx-auto w-full space-y-6">
      {/* Profile Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gaming-surface border border-gaming-border rounded-2xl overflow-hidden relative"
      >
        {/* Banner */}
        <div className="h-32 md:h-48 bg-gradient-to-r from-neon-purple/20 via-gaming-surface to-neon-blue/20 relative">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        </div>
        
        <div className="px-6 pb-6 relative">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-end -mt-16 md:-mt-20 mb-4">
            <div className="relative">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl border-4 border-gaming-surface bg-gaming-bg p-2 glow-box-purple relative z-10">
                <img src={user.avatar} alt="Avatar" className="w-full h-full rounded-xl bg-gaming-surface" />
              </div>
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-neon-purple text-white text-sm font-bold px-4 py-1.5 rounded-full pixel-font whitespace-nowrap z-20 shadow-lg">
                LVL {user.level}
              </div>
            </div>
            
            <div className="flex-1 pt-2 md:pt-0 min-w-0">
              <h1 className="text-3xl md:text-4xl font-bold mb-2 flex flex-wrap items-center gap-3" style={{ color: ratingColor, textShadow: `0 0 10px ${ratingColor}80` }}>
                <span className="break-all">{user.username}</span>
                <span className="text-sm px-3 py-1 bg-gaming-bg border rounded font-mono tracking-widest uppercase shrink-0" style={{ borderColor: ratingColor, color: ratingColor }}>
                  {ratingTitle}
                </span>
              </h1>
              <p className="text-neon-purple font-mono mb-4">{user.title}</p>
              
              <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-1.5"><MapPin size={16} /> {user.location || 'Unknown Sector'}</div>
                <div className="flex items-center gap-1.5"><Calendar size={16} /> Joined {user.joinDate}</div>
              </div>
            </div>
            
            <div className="w-full md:w-auto flex gap-3">
              {isMe ? (
                <>
                  <button className="md:hidden flex-1 flex items-center justify-center gap-2 px-6 py-2 bg-neon-red/10 text-neon-red border border-neon-red/50 rounded-lg font-bold hover:bg-neon-red hover:text-black transition-all">
                    <LogOut size={18} /> LOGOUT
                  </button>
                  <button 
                    onClick={onEditProfile}
                    className="hidden md:block px-6 py-2 bg-neon-purple/10 text-neon-purple border border-neon-purple/50 rounded-lg font-bold hover:bg-neon-purple hover:text-black transition-all"
                  >
                    EDIT PROFILE
                  </button>
                </>
              ) : (
                <motion.button 
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleFollowToggle(user.username)}
                  className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-8 py-2 rounded-lg font-bold transition-all ${
                    isFollowing 
                      ? 'bg-neon-red/10 text-neon-red border border-neon-red/50 hover:bg-neon-red hover:text-black' 
                      : 'bg-neon-purple/10 text-neon-purple border border-neon-purple/50 hover:bg-neon-purple hover:text-black'
                  }`}
                >
                  <AnimatePresence mode="wait">
                    {isFollowing ? (
                      <motion.div
                        key="following"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="flex items-center gap-2"
                      >
                        <UserMinus size={18} /> UNFOLLOW
                      </motion.div>
                    ) : (
                      <motion.div
                        key="follow"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="flex items-center gap-2"
                      >
                        <UserPlus size={18} /> FOLLOW
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              )}
            </div>
          </div>
          
          <div className="mt-6 text-gray-300 max-w-3xl leading-relaxed">
            {user.about}
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 gap-6">
        {/* Left Column: Stats & Badges */}
        <div className="space-y-6 lg:col-span-1">
          {/* Network / Social Stats */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gaming-surface border border-gaming-border rounded-xl p-6"
          >
            <h3 className="text-lg font-bold text-white mb-4 border-b border-gaming-border pb-2 flex items-center gap-2">
              <Users size={18} className="text-neon-blue" /> Network
            </h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-gaming-bg p-3 rounded-lg border border-gaming-border text-center group hover:border-neon-blue/50 transition-colors cursor-pointer">
                <div className="text-2xl font-bold text-white group-hover:text-neon-blue transition-colors">1.2k</div>
                <div className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Followers</div>
              </div>
              <div 
                onClick={() => isMe && setShowFollowing(true)}
                className={`bg-gaming-bg p-3 rounded-lg border border-gaming-border text-center group transition-colors ${isMe ? 'hover:border-neon-purple/50 cursor-pointer' : ''}`}
              >
                <div className="text-2xl font-bold text-white group-hover:text-neon-purple transition-colors">
                  {isMe ? followingList.length : '450'}
                </div>
                <div className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Following</div>
              </div>
            </div>
            {isMe && (
              <div className="space-y-2">
                <button 
                  onClick={() => setShowSearch(true)}
                  className="w-full py-2 text-xs font-bold text-gray-400 hover:text-white hover:bg-gaming-bg rounded-lg border border-transparent hover:border-gaming-border transition-all flex items-center justify-center gap-2"
                >
                  <UserPlus size={14} /> SEARCH USERS
                </button>
              </div>
            )}
          </motion.div>

          {/* Stats */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-gaming-surface border border-gaming-border rounded-xl p-6"
          >
            <h3 className="text-lg font-bold text-white mb-4 border-b border-gaming-border pb-2">Combat Stats</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400 flex items-center gap-2"><Target size={16}/> Quests Solved</span>
                <span className="text-white font-mono font-bold">142</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 flex items-center gap-2"><Trophy size={16}/> Global Rank</span>
                <span className="text-neon-yellow font-mono font-bold">#4,092</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 flex items-center gap-2"><Flame size={16}/> Max Streak</span>
                <span className="text-neon-red font-mono font-bold">34 Days</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 flex items-center gap-2"><Zap size={16}/> Total XP</span>
                <span className="text-neon-purple font-mono font-bold">{user.xp.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 flex items-center gap-2"><TrendingUp size={16}/> Max Rating</span>
                <span className="text-neon-blue font-mono font-bold">{maxRating}</span>
              </div>
            </div>
          </motion.div>

          {/* Badges Showcase */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gaming-surface border border-gaming-border rounded-xl p-6"
          >
            <h3 className="text-lg font-bold text-white mb-4 border-b border-gaming-border pb-2">Trophy Room</h3>
            <div className="grid grid-cols-3 gap-3">
              {user.badges.slice(0, 3).map(badge => (
                <div key={badge.id} className="aspect-square bg-gaming-bg border border-gaming-border rounded-xl flex flex-col items-center justify-center p-2 group hover:border-neon-purple/50 transition-colors cursor-help" title={`${badge.name}: ${badge.description}`}>
                  <div className="group-hover:scale-110 transition-transform mb-1">
                    {getBadgeIcon(badge.icon)}
                  </div>
                  <span className="text-[10px] text-center text-gray-400 font-bold leading-tight line-clamp-2">{badge.name}</span>
                </div>
              ))}
              {/* Empty slots */}
              {Array.from({ length: Math.max(0, 3 - user.badges.slice(0, 3).length) }).map((_, i) => (
                <div key={i} className="aspect-square bg-gaming-bg/50 border border-gaming-border/50 rounded-xl flex items-center justify-center border-dashed">
                  <div className="w-8 h-8 rounded-full bg-gaming-surface/50"></div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Contact Section (Desktop only - Sidebar) */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25 }}
            className="hidden md:block bg-gaming-surface border border-gaming-border rounded-xl p-6"
          >
            <h3 className="text-lg font-bold text-white mb-4 border-b border-gaming-border pb-2 flex items-center gap-2">
              Contact
            </h3>
            <div className="flex flex-col gap-3">
              {user.socials?.github && (
                <a href={user.socials.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-gaming-bg border border-gaming-border rounded-lg text-gray-400 hover:text-white hover:border-neon-purple/50 transition-all group">
                  <Github size={20} className="group-hover:text-white transition-colors" />
                  <span className="text-sm font-medium truncate">{user.socials.github.replace(/^https?:\/\/(www\.)?github\.com\//, '')}</span>
                </a>
              )}
              {user.socials?.twitter && (
                <a href={user.socials.twitter} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-gaming-bg border border-gaming-border rounded-lg text-gray-400 hover:text-white hover:border-neon-purple/50 transition-all group">
                  <Twitter size={20} className="group-hover:text-[#1DA1F2] transition-colors" />
                  <span className="text-sm font-medium truncate">{user.socials.twitter.replace(/^https?:\/\/(www\.)?(twitter|x)\.com\//, '')}</span>
                </a>
              )}
              {user.socials?.facebook && (
                <a href={user.socials.facebook} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-gaming-bg border border-gaming-border rounded-lg text-gray-400 hover:text-white hover:border-neon-purple/50 transition-all group">
                  <Facebook size={20} className="group-hover:text-[#1877F2] transition-colors" />
                  <span className="text-sm font-medium truncate">{user.socials.facebook.replace(/^https?:\/\/(www\.)?facebook\.com\//, '')}</span>
                </a>
              )}
              {user.socials?.linkedin && (
                <a href={user.socials.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-gaming-bg border border-gaming-border rounded-lg text-gray-400 hover:text-white hover:border-neon-purple/50 transition-all group">
                  <Linkedin size={20} className="group-hover:text-[#0A66C2] transition-colors" />
                  <span className="text-sm font-medium truncate">{user.socials.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '')}</span>
                </a>
              )}
              {user.socials?.website && (
                <a href={user.socials.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-gaming-bg border border-gaming-border rounded-lg text-gray-400 hover:text-white hover:border-neon-purple/50 transition-all group">
                  <Globe size={20} className="group-hover:text-neon-green transition-colors" />
                  <span className="text-sm font-medium truncate">{user.socials.website.replace(/^https?:\/\/(www\.)?/, '')}</span>
                </a>
              )}
              {user.phone && (
                <a href={`tel:${user.phone}`} className="flex items-center gap-3 p-3 bg-gaming-bg border border-gaming-border rounded-lg text-gray-400 hover:text-white hover:border-neon-purple/50 transition-all group" title={user.phone}>
                  <Phone size={20} className="group-hover:text-neon-yellow transition-colors" />
                  <span className="text-sm font-medium truncate">{user.phone}</span>
                </a>
              )}
              {!user.socials && !user.phone && <p className="text-xs text-gray-500 italic">No contact info provided.</p>}
            </div>
          </motion.div>
        </div>

        {/* Right Column: Activity & Heatmap */}
        <div className="space-y-6 lg:col-span-2 xl:col-span-3">
          {/* Activity Heatmap */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="bg-gaming-surface border border-gaming-border rounded-xl p-6"
          >
            <h3 className="text-lg font-bold text-white mb-4 border-b border-gaming-border pb-2 flex items-center justify-between">
              <span className="flex items-center gap-2"><Calendar size={18} className="text-neon-green" /> Activity Streak</span>
              <span className="text-xs font-mono text-gray-400 font-normal">Current Streak: <span className="text-neon-green font-bold">{user.streak} Days</span></span>
            </h3>
            
            <div className="flex flex-col gap-3">
              <div className="overflow-x-auto no-scrollbar pb-2">
                <div className="flex gap-1 md:gap-2 min-w-[700px] md:min-w-0">
                  {/* Day labels */}
                  <div className="grid grid-rows-7 gap-[1px] md:gap-[2px] text-[8px] md:text-[10px] text-gray-500 font-mono pr-1 items-center text-right sticky left-0 bg-gaming-surface z-10">
                    <div>Sun</div>
                    <div>Mon</div>
                    <div>Tue</div>
                    <div>Wed</div>
                    <div>Thu</div>
                    <div>Fri</div>
                    <div>Sat</div>
                  </div>
                  
                  {/* Grid */}
                  <div className="grid grid-cols-[repeat(53,minmax(0,1fr))] gap-[1px] md:gap-[2px] flex-1">
                  {(() => {
                    const year = 2026;
                    const startDate = new Date(year, 0, 1);
                    const startDayOfWeek = startDate.getDay();
                    
                    const weeks = [];
                    let currentDay = new Date(year, 0, 1 - startDayOfWeek);
                    
                    for (let i = 0; i < 53; i++) {
                      const week = [];
                      for (let j = 0; j < 7; j++) {
                        const date = new Date(currentDay);
                        const isCurrentYear = date.getFullYear() === year;
                        
                        let intensity = 0;
                        if (isCurrentYear) {
                          const isWeekend = j === 0 || j === 6;
                          const month = date.getMonth();
                          const baseProb = month > 8 ? 0.6 : 0.3;
                          const prob = isWeekend ? baseProb * 1.5 : baseProb;
                          
                          if (Math.random() < prob) {
                            intensity = Math.random();
                          }
                        }

                        week.push({ date, isCurrentYear, intensity });
                        currentDay.setDate(currentDay.getDate() + 1);
                      }
                      weeks.push(week);
                    }

                    return weeks.map((week, colIndex) => (
                      <div key={colIndex} className="grid grid-rows-7 gap-[1px] md:gap-[2px]">
                        {week.map((day, rowIndex) => {
                          let bgColor = 'bg-transparent';
                          let borderClass = '';
                          
                          if (day.isCurrentYear) {
                            bgColor = 'bg-gaming-bg';
                            borderClass = 'border border-gaming-border/30 hover:border-white/50 cursor-pointer transition-colors';
                            
                            if (day.intensity > 0.8) bgColor = 'bg-neon-green';
                            else if (day.intensity > 0.5) bgColor = 'bg-neon-green/80';
                            else if (day.intensity > 0.3) bgColor = 'bg-neon-green/60';
                            else if (day.intensity > 0) bgColor = 'bg-neon-green/40';
                          }

                          return (
                            <div 
                              key={rowIndex} 
                              className={`aspect-square rounded-[2px] ${bgColor} ${borderClass}`}
                              title={day.isCurrentYear ? `${Math.floor(day.intensity * 10)} submissions on ${day.date.toDateString()}` : ''}
                            />
                          );
                        })}
                      </div>
                    ));
                  })()}
                </div>
              </div>
            </div>
            
            <div className="flex justify-between items-center text-xs text-gray-500 font-mono mt-1">
                <span>342 total submissions</span>
                <div className="flex items-center gap-2">
                  <span>Less</span>
                  <div className="flex gap-[2px]">
                    <div className="w-3 h-3 rounded-[2px] bg-gaming-bg border border-gaming-border/30"></div>
                    <div className="w-3 h-3 rounded-[2px] bg-neon-green/40 border border-gaming-border/30"></div>
                    <div className="w-3 h-3 rounded-[2px] bg-neon-green/60 border border-gaming-border/30"></div>
                    <div className="w-3 h-3 rounded-[2px] bg-neon-green/80 border border-gaming-border/30"></div>
                    <div className="w-3 h-3 rounded-[2px] bg-neon-green border border-gaming-border/30"></div>
                  </div>
                  <span>More</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Rating Chart */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gaming-surface border border-gaming-border rounded-xl p-6 overflow-hidden"
          >
            <h3 className="text-lg font-bold text-white mb-4 border-b border-gaming-border pb-2 flex items-center justify-between">
              <span className="flex items-center gap-2"><TrendingUp size={18} className="text-neon-blue" /> Rating History</span>
              <span className="text-xs font-mono text-gray-400 font-normal">Current: <span style={{ color: ratingColor, fontWeight: 'bold' }}>{user.rating}</span></span>
            </h3>
            <div className="h-64 w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={user.ratingHistory} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--theme-gaming-border)" vertical={false} />
                  <XAxis dataKey="date" stroke="var(--theme-text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--theme-text-muted)" fontSize={12} tickLine={false} axisLine={false} domain={['dataMin - 100', 'dataMax + 100']} />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-gaming-surface border border-gaming-border p-3 rounded-lg shadow-xl">
                            <p className="text-white font-bold mb-1">{data.contestName || data.date}</p>
                            <p className="text-sm text-gray-400 font-mono mb-1">{data.date}</p>
                            <p className="font-bold" style={{ color: ratingColor }}>
                              Rating: {data.rating}
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <ReferenceLine y={1000} stroke="var(--color-neon-green)" strokeOpacity={0.2} strokeDasharray="3 3" />
                  <ReferenceLine y={1300} stroke="var(--color-neon-blue)" strokeOpacity={0.2} strokeDasharray="3 3" />
                  <ReferenceLine y={1600} stroke="var(--color-neon-purple)" strokeOpacity={0.2} strokeDasharray="3 3" />
                  <ReferenceLine y={1900} stroke="var(--color-neon-yellow)" strokeOpacity={0.2} strokeDasharray="3 3" />
                  <ReferenceLine y={2200} stroke="var(--color-neon-red)" strokeOpacity={0.2} strokeDasharray="3 3" />
                  <Line 
                    type="monotone" 
                    dataKey="rating" 
                    stroke={ratingColor} 
                    strokeWidth={3} 
                    dot={{ fill: 'var(--theme-gaming-surface)', stroke: ratingColor, strokeWidth: 2, r: 4 }} 
                    activeDot={{ r: 6, fill: ratingColor, stroke: 'var(--theme-white)' }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Recent Submissions */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="hidden md:block bg-gaming-surface border border-gaming-border rounded-xl p-6"
          >
            <h3 className="text-lg font-bold text-white mb-4 border-b border-gaming-border pb-2">Recent Battles</h3>
            <div className="space-y-3">
              {[
                { quest: "The Array Awakening", lang: "JavaScript", status: "Accepted", time: "2 hours ago", runtime: "12ms" },
                { quest: "String Sorcery", lang: "Python", status: "Wrong Answer", time: "5 hours ago", runtime: "N/A" },
                { quest: "String Sorcery", lang: "Python", status: "Accepted", time: "5 hours ago", runtime: "45ms" },
                { quest: "Binary Search Basics", lang: "C++", status: "Accepted", time: "1 day ago", runtime: "2ms" },
                { quest: "Graph Guardian's Riddle", lang: "Java", status: "Time Limit Exceeded", time: "2 days ago", runtime: ">2500ms" },
              ].map((sub, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-gaming-bg border border-gaming-border rounded-lg hover:border-gray-600 transition-colors">
                  <div className="flex-1">
                    <button 
                      onClick={() => onSelectQuest?.(sub.quest)}
                      className="text-sm font-bold text-white hover:text-neon-blue transition-colors text-left block"
                    >
                      {sub.quest}
                    </button>
                    <div className="flex items-center gap-3 mt-1 text-xs font-mono">
                      <span className="text-gray-400">{sub.time}</span>
                      <span className="text-neon-blue">{sub.lang}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm font-bold ${
                      sub.status === 'Accepted' ? 'text-neon-green' : 
                      sub.status === 'Wrong Answer' ? 'text-neon-red' : 'text-neon-yellow'
                    }`}>
                      {sub.status}
                    </div>
                    <div className="text-xs text-gray-500 font-mono mt-1">{sub.runtime}</div>
                  </div>
                </div>
              ))}
            </div>
            {isMe && (
              <button 
                onClick={() => setIsViewingAllSubmissions(true)}
                className="w-full mt-4 py-2 text-sm font-bold text-gray-400 hover:text-white bg-gaming-bg border border-gaming-border rounded-lg transition-colors"
              >
                VIEW ALL SUBMISSIONS
              </button>
            )}
          </motion.div>

          {/* Contact Section (Mobile only - Bottom) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="md:hidden bg-gaming-surface border border-gaming-border rounded-xl p-6"
          >
            <h3 className="text-lg font-bold text-white mb-4 border-b border-gaming-border pb-2 flex items-center gap-2">
              Contact
            </h3>
            <div className="flex flex-col gap-3">
              {user.socials?.github && (
                <a href={user.socials.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-gaming-bg border border-gaming-border rounded-lg text-gray-400 hover:text-white hover:border-neon-purple/50 transition-all group">
                  <Github size={20} className="group-hover:text-white transition-colors" />
                  <span className="text-sm font-medium truncate">{user.socials.github.replace(/^https?:\/\/(www\.)?github\.com\//, '')}</span>
                </a>
              )}
              {user.socials?.twitter && (
                <a href={user.socials.twitter} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-gaming-bg border border-gaming-border rounded-lg text-gray-400 hover:text-white hover:border-neon-purple/50 transition-all group">
                  <Twitter size={20} className="group-hover:text-[#1DA1F2] transition-colors" />
                  <span className="text-sm font-medium truncate">{user.socials.twitter.replace(/^https?:\/\/(www\.)?(twitter|x)\.com\//, '')}</span>
                </a>
              )}
              {user.socials?.facebook && (
                <a href={user.socials.facebook} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-gaming-bg border border-gaming-border rounded-lg text-gray-400 hover:text-white hover:border-neon-purple/50 transition-all group">
                  <Facebook size={20} className="group-hover:text-[#1877F2] transition-colors" />
                  <span className="text-sm font-medium truncate">{user.socials.facebook.replace(/^https?:\/\/(www\.)?facebook\.com\//, '')}</span>
                </a>
              )}
              {user.socials?.linkedin && (
                <a href={user.socials.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-gaming-bg border border-gaming-border rounded-lg text-gray-400 hover:text-white hover:border-neon-purple/50 transition-all group">
                  <Linkedin size={20} className="group-hover:text-[#0A66C2] transition-colors" />
                  <span className="text-sm font-medium truncate">{user.socials.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '')}</span>
                </a>
              )}
              {user.socials?.website && (
                <a href={user.socials.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-gaming-bg border border-gaming-border rounded-lg text-gray-400 hover:text-white hover:border-neon-purple/50 transition-all group">
                  <Globe size={20} className="group-hover:text-neon-green transition-colors" />
                  <span className="text-sm font-medium truncate">{user.socials.website.replace(/^https?:\/\/(www\.)?/, '')}</span>
                </a>
              )}
              {user.phone && (
                <a href={`tel:${user.phone}`} className="flex items-center gap-3 p-3 bg-gaming-bg border border-gaming-border rounded-lg text-gray-400 hover:text-white hover:border-neon-purple/50 transition-all group" title={user.phone}>
                  <Phone size={20} className="group-hover:text-neon-yellow transition-colors" />
                  <span className="text-sm font-medium truncate">{user.phone}</span>
                </a>
              )}
              {!user.socials && !user.phone && <p className="text-xs text-gray-500 italic">No contact info provided.</p>}
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Bottom Spacer to provide extra scrolling space */}
      <div className="h-24"></div>

      {/* Following Modal */}
      {showFollowing && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gaming-surface border border-gaming-border rounded-2xl w-full max-w-md overflow-hidden shadow-2xl"
          >
            <div className="p-4 border-b border-gaming-border flex justify-between items-center bg-gaming-bg/50">
              <h3 className="font-bold text-white flex items-center gap-2">
                <p className="flex items-center gap-2"><Users size={18} className="text-neon-purple" /> Following ({followingList.length})</p>
              </h3>
              <button 
                onClick={() => setShowFollowing(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-4 border-b border-gaming-border">
              <input 
                type="text"
                placeholder="Search following..."
                value={followingSearchQuery}
                onChange={(e) => setFollowingSearchQuery(e.target.value)}
                className="w-full px-4 py-2 bg-gaming-bg border border-gaming-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-neon-purple"
              />
            </div>
            
            <div className="max-h-[60vh] overflow-y-auto p-2 space-y-1">
              {followingList
                .filter(username => username.toLowerCase().includes(followingSearchQuery.toLowerCase()))
                .map(username => {
                const lbEntry = MOCK_LEADERBOARD.find(p => p.username === username);
                return (
                  <div 
                    key={username}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-gaming-bg border border-transparent hover:border-gaming-border transition-all cursor-pointer group"
                    onClick={() => {
                      onViewProfile?.(username);
                      setShowFollowing(false);
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <img 
                        src={`https://api.dicebear.com/7.x/bottts/svg?seed=${username}&backgroundColor=18181b`} 
                        alt={username} 
                        className="w-10 h-10 rounded-lg bg-gaming-surface border border-gaming-border"
                      />
                      <div>
                        <div className="font-bold text-white group-hover:text-neon-purple transition-colors">{username}</div>
                        <div className="text-[10px] text-gray-500 font-mono">
                          LVL {lbEntry?.level || 1} • {lbEntry?.rating || 800} Rating
                        </div>
                      </div>
                    </div>
                    <motion.button 
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFollowToggle(username);
                      }}
                      className="px-3 py-1 text-[10px] font-bold text-neon-red border border-neon-red/30 rounded-md hover:bg-neon-red hover:text-black transition-all flex items-center gap-1"
                    >
                      <UserMinus size={12} /> UNFOLLOW
                    </motion.button>
                  </div>
                );
              })}
              {followingList.length === 0 ? (
                <div className="p-8 text-center text-gray-500 italic">
                  Not following anyone yet.
                </div>
              ) : followingList.filter(username => username.toLowerCase().includes(followingSearchQuery.toLowerCase())).length === 0 ? (
                <div className="p-8 text-center text-gray-500 italic">
                  No users found matching "{followingSearchQuery}".
                </div>
              ) : null}
            </div>
            
            <div className="p-4 bg-gaming-bg/30 border-t border-gaming-border">
              <button 
                onClick={() => setShowFollowing(false)}
                className="w-full py-2 bg-gaming-bg border border-gaming-border rounded-lg text-sm font-bold text-gray-400 hover:text-white transition-colors"
              >
                CLOSE
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Search Users Modal */}
      {showSearch && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gaming-surface border border-gaming-border rounded-2xl w-full max-w-md overflow-hidden shadow-2xl"
          >
            <div className="p-4 border-b border-gaming-border flex justify-between items-center bg-gaming-bg/50">
              <h3 className="font-bold text-white flex items-center gap-2">
                <UserPlus size={18} className="text-neon-purple" /> Find Users
              </h3>
              <button 
                onClick={() => setShowSearch(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-4">
              <input 
                type="text"
                placeholder="Search by username..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 bg-gaming-bg border border-gaming-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-neon-purple"
              />
            </div>

            <div className="max-h-[50vh] overflow-y-auto p-2 space-y-1">
              {MOCK_LEADERBOARD
                .filter(p => p.username.toLowerCase().includes(searchQuery.toLowerCase()) && p.username !== MOCK_USER.username)
                .map(player => {
                  const isFollowingPlayer = followingList.includes(player.username);
                  return (
                    <div 
                      key={player.username}
                      className="flex items-center justify-between p-3 rounded-xl hover:bg-gaming-bg border border-transparent hover:border-gaming-border transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <img 
                          src={`https://api.dicebear.com/7.x/bottts/svg?seed=${player.username}&backgroundColor=18181b`} 
                          alt={player.username} 
                          className="w-10 h-10 rounded-lg bg-gaming-surface border border-gaming-border"
                        />
                        <div>
                          <div className="font-bold text-white group-hover:text-neon-purple transition-colors">{player.username}</div>
                          <div className="text-[10px] text-gray-500 font-mono">
                            LVL {player.level} • {player.rating} Rating
                          </div>
                        </div>
                      </div>
                      <button 
                        onClick={() => handleFollowToggle(player.username)}
                        className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all flex items-center gap-1 ${
                          isFollowingPlayer 
                            ? 'text-neon-red border border-neon-red/30 hover:bg-neon-red hover:text-black'
                            : 'text-neon-purple border border-neon-purple/30 hover:bg-neon-purple hover:text-black'
                        }`}
                      >
                        {isFollowingPlayer ? <><UserMinus size={12} /> UNFOLLOW</> : <><UserPlus size={12} /> FOLLOW</>}
                      </button>
                    </div>
                  );
                })}
            </div>
            
            <div className="p-4 bg-gaming-bg/30 border-t border-gaming-border">
              <button 
                onClick={() => setShowSearch(false)}
                className="w-full py-2 bg-gaming-bg border border-gaming-border rounded-lg text-sm font-bold text-gray-400 hover:text-white transition-colors"
              >
                CLOSE
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
