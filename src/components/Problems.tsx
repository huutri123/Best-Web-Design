import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Quest } from '../types';
import { MOCK_QUESTS } from '../data';
import { Search, Filter, Shield, Swords, Skull, Lock, CheckCircle, Terminal, ChevronLeft, ChevronRight, ChevronDown, X, Check } from 'lucide-react';

interface ProblemsProps {
  onSelectQuest: (quest: Quest) => void;
}

const TagDropdown = ({ selectedTags, setSelectedTags, allTags }: { selectedTags: string[], setSelectedTags: (tags: string[]) => void, allTags: string[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-gaming-bg border border-gaming-border rounded-lg px-4 py-2.5 text-sm text-left text-gray-300 focus:outline-none focus:border-neon-purple transition-colors flex items-center justify-between group hover:border-gray-500"
      >
        <span className="truncate">
          {selectedTags.length === 0 ? 'Select tags...' : `${selectedTags.length} tags selected`}
        </span>
        <ChevronDown size={16} className={`shrink-0 ml-2 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180 text-neon-purple' : 'group-hover:text-gray-300'}`} />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-[#0f172a] border border-gaming-border rounded-lg shadow-xl shadow-black/80 overflow-hidden flex flex-col">
          <div className="max-h-60 overflow-y-auto custom-scrollbar p-1.5 space-y-0.5">
            <button
              onClick={() => { setSelectedTags([]); setIsOpen(false); }}
              className="w-full text-left px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-md transition-colors"
            >
              Clear All
            </button>
            {allTags.map(tag => {
              const isSelected = selectedTags.includes(tag);
              return (
                <button
                  key={tag}
                  onClick={() => {
                    if (isSelected) {
                      setSelectedTags(selectedTags.filter(t => t !== tag));
                    } else {
                      setSelectedTags([...selectedTags, tag]);
                    }
                  }}
                  className="w-full flex items-center justify-between px-3 py-2 text-sm rounded-md transition-colors hover:bg-white/5"
                >
                  <span className={isSelected ? 'text-neon-green font-medium' : 'text-gray-300'}>{tag}</span>
                  {isSelected && <Check size={14} className="text-neon-green" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export function Problems({ onSelectQuest }: ProblemsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 50;

  const allTags = Array.from(new Set(MOCK_QUESTS.flatMap(q => q.tags))).sort();

  const totalCount = MOCK_QUESTS.length;
  const solvedCount = MOCK_QUESTS.filter(q => q.status === 'completed' || q.status === 'accepted').length;
  const unsolvedCount = totalCount - solvedCount;

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedDifficulty, selectedStatus, selectedTags]);

  const getDifficultyIcon = (diff: string) => {
    switch(diff) {
      case 'Easy': return <Shield size={16} className="text-neon-green" />;
      case 'Medium': return <Swords size={16} className="text-neon-yellow" />;
      case 'Hard': return <Skull size={16} className="text-neon-red" />;
      case 'Boss': return <Skull size={16} className="text-neon-purple" />;
      default: return null;
    }
  };

  const getDifficultyColor = (diff: string) => {
    switch(diff) {
      case 'Easy': return 'text-neon-green border-neon-green/30 bg-neon-green/10';
      case 'Medium': return 'text-neon-yellow border-neon-yellow/30 bg-neon-yellow/10';
      case 'Hard': return 'text-neon-red border-neon-red/30 bg-neon-red/10';
      case 'Boss': return 'text-neon-purple border-neon-purple/30 bg-neon-purple/10 glow-box-purple';
      default: return 'text-gray-400 border-gray-700 bg-gray-800';
    }
  };

  const getAcRate = (quest: Quest) => {
    if (quest.acRate !== undefined) return quest.acRate;
    let hash = 0;
    for (let i = 0; i < quest.id.length; i++) {
      hash = quest.id.charCodeAt(i) + ((hash << 5) - hash);
    }
    const base = Math.abs(hash) % 40 + 30;
    if (quest.difficulty === 'Easy') return base + 20;
    if (quest.difficulty === 'Hard') return base - 15;
    if (quest.difficulty === 'Boss') return base - 25;
    return base;
  };

  const handleMobileFilter = (f: string) => {
    if (f === 'All') {
      setSelectedDifficulty('All');
      setSelectedStatus('All');
    } else if (f === 'Completed') {
      setSelectedDifficulty('All');
      setSelectedStatus('Completed');
    } else {
      setSelectedDifficulty(f);
      setSelectedStatus('All');
    }
  };

  const isMobileFilterActive = (f: string) => {
    if (f === 'All') return selectedDifficulty === 'All' && selectedStatus === 'All';
    if (f === 'Completed') return selectedStatus === 'Completed';
    return selectedDifficulty === f;
  };

  const filteredQuests = MOCK_QUESTS.filter(quest => {
    const matchesSearch = !searchQuery || 
                          quest.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          quest.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesDifficulty = selectedDifficulty === 'All' || selectedDifficulty === quest.difficulty;
    const matchesStatus = selectedStatus === 'All' ? true : selectedStatus === 'Completed' ? quest.status === 'completed' : quest.status !== 'completed';
    const matchesTag = selectedTags.length === 0 || quest.tags.some(t => selectedTags.includes(t));
    return matchesSearch && matchesDifficulty && matchesStatus && matchesTag;
  });

  const totalPages = Math.ceil(filteredQuests.length / ITEMS_PER_PAGE);
  const currentQuests = filteredQuests.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <div className="max-w-[1600px] mx-auto w-full space-y-6">
      <div className="flex items-center gap-2 mb-2 lg:mb-6">
        <Terminal className="text-neon-purple" size={28} />
        <h1 className="text-2xl md:text-3xl font-bold text-white pixel-font tracking-wider">PROBLEMS</h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Mobile Filters & Search - Mobile Only */}
        <div className="lg:hidden w-full space-y-4">
          <p className="text-gray-400 text-sm">Choose your next problem and earn XP.</p>
          <div className="flex gap-2 w-full">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input 
                type="text" 
                placeholder="Search problems..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gaming-surface border border-gaming-border rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-neon-blue transition-colors"
              />
            </div>
            <button className="bg-gaming-surface border border-gaming-border p-2 rounded-lg hover:bg-gaming-border transition-colors">
              <Filter size={20} className="text-gray-400" />
            </button>
          </div>
          <div className="w-full">
            <TagDropdown selectedTags={selectedTags} setSelectedTags={setSelectedTags} allTags={allTags} />
            
            {selectedTags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {selectedTags.map(tag => (
                  <span key={tag} className="px-2 py-1 rounded-md bg-neon-green/10 border border-neon-green/30 text-neon-green text-xs flex items-center gap-1.5">
                    {tag}
                    <button 
                      onClick={() => setSelectedTags(selectedTags.filter(t => t !== tag))} 
                      className="hover:text-white transition-colors"
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {['All', 'Easy', 'Medium', 'Hard', 'Boss', 'Completed'].map(f => (
              <button 
                key={f}
                onClick={() => handleMobileFilter(f)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors border ${
                  isMobileFilterActive(f)
                    ? 'bg-white text-black border-white' 
                    : 'bg-gaming-surface text-gray-400 border-gaming-border hover:border-gray-500'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content (Table & Mobile Cards) */}
        <div className="flex-1 w-full">
          {/* Desktop Table */}
          <div className="hidden lg:block bg-gaming-surface border border-gaming-border rounded-xl overflow-hidden shadow-2xl">
            <div className="overflow-x-auto overflow-y-auto custom-scrollbar max-h-[600px]">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead className="sticky top-0 z-10 bg-gaming-surface">
                  <tr className="border-b border-gaming-border bg-gaming-bg/80 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] backdrop-blur-md">
                    <th className="p-4 w-16 text-center">Status</th>
                    <th className="p-4">Title</th>
                    <th className="p-4 w-32">Difficulty</th>
                    <th className="p-4 w-24 text-right">AC Rate</th>
                    <th className="p-4 w-28 text-right">Reward</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gaming-border/50">
                  {currentQuests.map((quest, i) => (
                    <motion.tr 
                      key={quest.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={() => quest.status !== 'locked' && onSelectQuest(quest)}
                      className={`group transition-colors ${
                        quest.status === 'locked' 
                          ? 'opacity-50 bg-gaming-bg/30 cursor-not-allowed' 
                          : 'hover:bg-gaming-bg/80 cursor-pointer'
                      }`}
                    >
                      <td className="p-4 text-center">
                        {quest.status === 'completed' ? (
                          <CheckCircle size={18} className="text-neon-green mx-auto" />
                        ) : quest.status === 'locked' ? (
                          <Lock size={18} className="text-gray-500 mx-auto" />
                        ) : (
                          <div className="w-2 h-2 rounded-full bg-gray-600 mx-auto group-hover:bg-neon-purple transition-colors"></div>
                        )}
                      </td>
                      <td className="p-4">
                        <div className={`font-bold text-[14px] mb-0.5 ${quest.status === 'completed' ? 'text-gray-400 line-through' : 'text-white group-hover:text-neon-blue transition-colors'}`}>
                          {quest.title}
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {quest.tags.map(tag => (
                            <span key={tag} className="text-[10px] px-2 py-0.5 bg-gaming-bg border border-gaming-border rounded text-gray-400 font-mono">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded border text-xs font-mono ${getDifficultyColor(quest.difficulty)}`}>
                          {getDifficultyIcon(quest.difficulty)}
                          {quest.difficulty}
                        </div>
                      </td>
                      <td className="p-4 text-right">
                        <span className="text-sm font-mono text-gray-400">
                          {getAcRate(quest).toFixed(1)}%
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <span className="text-sm font-mono text-neon-purple font-bold">
                          +{quest.xpReward} XP
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                  {filteredQuests.length === 0 && (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-gray-500 font-mono text-sm">
                        No quests found matching your criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:hidden">
            {currentQuests.map((quest, i) => (
              <motion.div
                key={quest.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => quest.status !== 'locked' && onSelectQuest(quest)}
                className={`relative p-5 rounded-xl border transition-all ${
                  quest.status === 'locked' 
                    ? 'bg-gaming-surface/50 border-gaming-border/50 opacity-60 cursor-not-allowed' 
                    : 'bg-gaming-surface border-gaming-border hover:border-neon-blue hover:-translate-y-1 cursor-pointer group'
                }`}
              >
                {quest.status === 'locked' && (
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] rounded-xl flex items-center justify-center z-10">
                    <div className="bg-gaming-bg border border-gaming-border px-4 py-2 rounded-lg flex items-center gap-2">
                      <Lock size={16} className="text-gray-400" />
                      <span className="text-sm font-mono text-gray-400">LOCKED</span>
                    </div>
                  </div>
                )}
                
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg border ${getDifficultyColor(quest.difficulty)}`}>
                      {getDifficultyIcon(quest.difficulty)}
                    </div>
                    <h3 className={`text-lg font-bold ${quest.status === 'completed' ? 'text-gray-400 line-through' : 'text-white group-hover:text-neon-blue transition-colors'}`}>
                      {quest.title}
                    </h3>
                  </div>
                  {quest.status === 'completed' && <CheckCircle className="text-neon-green" size={20} />}
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {quest.tags.map(tag => (
                    <span key={tag} className="text-xs px-2 py-1 bg-gaming-bg border border-gaming-border rounded text-gray-400 font-mono">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex justify-between items-center mt-auto pt-4 border-t border-gaming-border/50">
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-mono text-neon-purple flex items-center gap-1">
                      +{quest.xpReward} XP
                    </span>
                    <span className="text-xs font-mono text-gray-400">
                      AC: {getAcRate(quest).toFixed(1)}%
                    </span>
                  </div>
                  <span className={`text-xs font-mono px-2 py-1 rounded border ${getDifficultyColor(quest.difficulty)}`}>
                    {quest.difficulty}
                  </span>
                </div>
              </motion.div>
            ))}
            {filteredQuests.length === 0 && (
              <div className="col-span-full p-8 text-center text-gray-500 font-mono text-sm bg-gaming-surface border border-gaming-border rounded-xl">
                No quests found matching your criteria.
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg bg-gaming-surface border border-gaming-border text-gray-400 disabled:opacity-50 hover:text-white hover:border-gray-500 transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              
              <div className="flex gap-1 overflow-x-auto scrollbar-hide max-w-[200px] sm:max-w-none">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => {
                  // Show first, last, current, and adjacent pages
                  if (
                    page === 1 || 
                    page === totalPages || 
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-10 h-10 shrink-0 rounded-lg flex items-center justify-center text-sm font-medium transition-colors ${
                          currentPage === page
                            ? 'bg-neon-purple text-black font-bold'
                            : 'bg-gaming-surface border border-gaming-border text-gray-400 hover:text-white hover:border-gray-500'
                        }`}
                      >
                        {page}
                      </button>
                    );
                  } else if (
                    page === currentPage - 2 || 
                    page === currentPage + 2
                  ) {
                    return <span key={page} className="w-8 flex items-center justify-center text-gray-500">...</span>;
                  }
                  return null;
                })}
              </div>

              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg bg-gaming-surface border border-gaming-border text-gray-400 disabled:opacity-50 hover:text-white hover:border-gray-500 transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>

        {/* Right Sidebar - Desktop Only */}
        <div className="hidden lg:block w-80 shrink-0 space-y-6">
          {/* Progress Card */}
          <div className="bg-gaming-surface border border-gaming-border rounded-xl p-5">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-gray-300 font-bold text-sm uppercase tracking-wider">Your Progress</h3>
              <span className="text-gray-400 font-mono text-sm">{solvedCount} / {totalCount}</span>
            </div>
            <div className="w-full h-3 bg-gray-700 rounded-full mb-4 flex overflow-hidden">
              <div className="h-full bg-neon-blue" style={{ width: `${(solvedCount / totalCount) * 100}%` }}></div>
            </div>
            <div className="flex justify-between text-xs text-gray-400">
              <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-neon-blue"></div>{solvedCount} Solved</div>
              <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-gray-600"></div>{unsolvedCount} Unsolved</div>
            </div>
          </div>

          {/* Combined Filters Card */}
          <div className="bg-gaming-surface border border-gaming-border rounded-xl p-5 space-y-6">
            {/* Search */}
            <div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                <input 
                  type="text" 
                  placeholder="Search problems..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-gaming-bg border border-gaming-border rounded-lg pl-9 pr-3 py-2 text-sm text-white focus:outline-none focus:border-neon-purple transition-colors"
                />
              </div>
            </div>

            {/* Status */}
            <div>
              <h3 className="text-gray-400 font-bold mb-3 text-xs uppercase tracking-wider">Status</h3>
              <div className="flex flex-wrap gap-2">
                {['All', 'Completed', 'Unsolved'].map(status => (
                  <button
                    key={status}
                    onClick={() => setSelectedStatus(status)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border ${
                      selectedStatus === status 
                        ? 'bg-neon-purple/20 border-neon-purple text-neon-purple' 
                        : 'bg-gaming-bg border-gaming-border text-gray-400 hover:border-gray-500'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty */}
            <div>
              <h3 className="text-gray-400 font-bold mb-3 text-xs uppercase tracking-wider">Difficulty</h3>
              <div className="flex flex-wrap gap-2">
                {['All', 'Easy', 'Medium', 'Hard', 'Boss'].map(diff => (
                  <button
                    key={diff}
                    onClick={() => setSelectedDifficulty(diff)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border ${
                      selectedDifficulty === diff 
                        ? 'bg-neon-blue/20 border-neon-blue text-neon-blue' 
                        : 'bg-gaming-bg border-gaming-border text-gray-400 hover:border-gray-500'
                    }`}
                  >
                    {diff}
                  </button>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div>
              <h3 className="text-gray-400 font-bold mb-3 text-xs uppercase tracking-wider">Tags</h3>
              <TagDropdown selectedTags={selectedTags} setSelectedTags={setSelectedTags} allTags={allTags} />
              
              {selectedTags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {selectedTags.map(tag => (
                    <span key={tag} className="px-2 py-1 rounded-md bg-neon-green/10 border border-neon-green/30 text-neon-green text-xs flex items-center gap-1.5">
                      {tag}
                      <button 
                        onClick={() => setSelectedTags(selectedTags.filter(t => t !== tag))} 
                        className="hover:text-white transition-colors"
                      >
                        <X size={12} />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Spacer */}
      <div className="h-24"></div>
    </div>
  );
}
