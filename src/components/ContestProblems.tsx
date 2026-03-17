import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Clock, Trophy, Terminal, BarChart2, LogOut } from 'lucide-react';
import { Quest } from '../types';
import { MOCK_QUESTS } from '../data';
import { ContestStandings } from './ContestStandings';

interface ContestProblemsProps {
  contest: any;
  onBack: () => void;
  onSelectQuest: (quest: Quest) => void;
}

export function ContestProblems({ contest, onBack, onSelectQuest }: ContestProblemsProps) {
  const [activeTab, setActiveTab] = useState<'problems' | 'ranking'>('problems');
  
  // Mock contest quests with status
  const contestQuests = MOCK_QUESTS.slice(0, 3).map((q, index) => {
    let status: 'none' | 'accepted' | 'wrong_answer' | 'time_limit' = 'none';
    if (index === 0) status = 'accepted';
    if (index === 1) status = 'wrong_answer';
    if (index === 2) status = 'time_limit';
    
    // For the 3rd item, let's make it 'none' to show the default state
    if (index === 2) status = 'none';
    
    return { ...q, status };
  });

  return (
    <div className="w-full mx-auto space-y-6">
      <div className="flex items-center bg-gaming-surface border border-gaming-border rounded-xl p-1 w-full overflow-x-auto no-scrollbar">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 px-3 py-2 text-neon-red hover:text-red-400 transition-colors whitespace-nowrap"
        >
          <LogOut size={18} />
          <span className="text-sm font-bold">Leave</span>
        </button>
        
        <div className="flex-1"></div>
        
        <div className="flex gap-1">
          <button
            onClick={() => setActiveTab('problems')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === 'problems' 
                ? 'bg-neon-blue/20 text-neon-blue glow-box-blue' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Terminal size={16} /> Problems
          </button>
          <button
            onClick={() => setActiveTab('ranking')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === 'ranking' 
                ? 'bg-neon-purple/20 text-neon-purple glow-box-purple' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <BarChart2 size={16} /> Ranking
          </button>
        </div>
      </div>

      <div className="bg-gaming-surface border border-gaming-border rounded-xl p-5 md:p-6 relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-5">
        <div className="absolute top-0 right-0 w-64 h-64 bg-neon-red/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
        <div className="relative z-10 w-full md:w-auto">
          <h1 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-2">{contest.title}</h1>
          <div className="flex flex-wrap items-center gap-3 md:gap-4 text-xs md:text-sm text-gray-400 font-mono">
            <span className="flex items-center gap-1.5 text-neon-red bg-neon-red/10 px-2.5 py-1 rounded-md border border-neon-red/20"><Clock size={14} /> 01:54:23 remaining</span>
            <span className="flex items-center gap-1.5 bg-gaming-bg px-2.5 py-1 rounded-md border border-gaming-border"><Trophy size={14} /> {contest.type}</span>
          </div>
        </div>
        <div className="relative z-10 flex items-center justify-between md:flex-col md:items-end w-full md:w-auto bg-gaming-bg/50 md:bg-transparent border border-gaming-border md:border-none rounded-lg p-4 md:p-0">
          <div className="text-sm text-gray-400 font-medium">Your Score</div>
          <div className="text-2xl md:text-3xl font-bold text-neon-blue font-mono">0</div>
        </div>
      </div>

      {activeTab === 'problems' ? (
        <div className="grid grid-cols-1 gap-4">
          {contestQuests.map((quest, index) => (
            <motion.div
              key={quest.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => onSelectQuest(quest)}
              className="bg-gaming-surface border border-gaming-border rounded-xl p-4 hover:border-neon-purple/50 transition-colors cursor-pointer group flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-lg border flex items-center justify-center font-mono font-bold transition-colors ${
                  quest.status === 'accepted' ? 'bg-neon-green/10 border-neon-green/50 text-neon-green' :
                  quest.status === 'wrong_answer' || quest.status === 'time_limit' ? 'bg-neon-red/10 border-neon-red/50 text-neon-red' :
                  'bg-gaming-bg border-gaming-border text-gray-400 group-hover:text-neon-purple'
                }`}>
                  {String.fromCharCode(65 + index)}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-neon-purple transition-colors">{quest.title}</h3>
                  <div className="flex items-center gap-3 text-xs text-gray-500 font-mono mt-1">
                    <span className={
                      quest.difficulty === 'Easy' ? 'text-neon-green' :
                      quest.difficulty === 'Medium' ? 'text-neon-yellow' :
                      quest.difficulty === 'Hard' ? 'text-neon-red' : 'text-neon-purple'
                    }>{quest.difficulty}</span>
                    <span>•</span>
                    <span>{quest.xpReward} pts</span>
                  </div>
                </div>
              </div>
              <div className="hidden md:block text-sm font-mono text-gray-500">
                {quest.status === 'accepted' && <span className="text-neon-green font-bold">Accepted</span>}
                {quest.status === 'wrong_answer' && <span className="text-neon-red font-bold">Wrong Answer</span>}
                {quest.status === 'time_limit' && <span className="text-neon-red font-bold">Time Limit</span>}
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <ContestStandings contest={contest} hideHeader={true} hideSpacer={true} />
      )}
      
      {/* Mobile Spacer to prevent bottom nav overlap */}
      <div className="h-24 md:hidden"></div>
    </div>
  );
}
