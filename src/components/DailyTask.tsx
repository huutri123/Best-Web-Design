import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CheckSquare, ShoppingBag, Zap, Clock, Calendar, Star, ShieldCheck, Coins, Trophy, Terminal } from 'lucide-react';
import { User } from '../types';

interface Task {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  creditReward: number;
  completed: boolean;
  claimed: boolean;
  progress: number;
  total: number;
  icon: React.ReactNode;
  color: string;
}

interface ShopItem {
  id: string;
  name: string;
  duration: string;
  price: number;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const MOCK_TASKS: Task[] = [
  { id: '1', title: 'Daily Login', description: 'Enter the digital realm today.', xpReward: 10, creditReward: 5, completed: true, claimed: false, progress: 1, total: 1, icon: <Zap size={20} />, color: 'text-neon-blue' },
  { id: '2', title: 'Code Warrior', description: 'Solve 3 problems of any difficulty.', xpReward: 50, creditReward: 25, completed: false, claimed: false, progress: 1, total: 3, icon: <Terminal size={20} />, color: 'text-neon-purple' },
  { id: '3', title: 'Algorithm Apprentice', description: 'Solve 1 Medium difficulty problem.', xpReward: 30, creditReward: 15, completed: false, claimed: false, progress: 0, total: 1, icon: <Clock size={20} />, color: 'text-neon-green' },
  { id: '4', title: 'Social Butterfly', description: 'Like 5 posts in the Guild News.', xpReward: 15, creditReward: 10, completed: false, claimed: false, progress: 2, total: 5, icon: <Star size={20} />, color: 'text-neon-yellow' },
  { id: '5', title: 'Streak Keeper', description: 'Maintain your login streak for 7 days.', xpReward: 100, creditReward: 50, completed: false, claimed: false, progress: 4, total: 7, icon: <ShieldCheck size={20} />, color: 'text-neon-red' },
];

const SHOP_ITEMS: ShopItem[] = [
  { 
    id: '1', 
    name: 'AI HINT Premium', 
    duration: '1 Day', 
    price: 50, 
    description: 'Unlock infinite AI hints for 24 hours.', 
    icon: <Zap size={24} />,
    color: 'text-neon-blue'
  },
  { 
    id: '2', 
    name: 'AI HINT Premium', 
    duration: '3 Days', 
    price: 120, 
    description: 'Unlock infinite AI hints for 72 hours.', 
    icon: <Clock size={24} />,
    color: 'text-neon-purple'
  },
  { 
    id: '3', 
    name: 'AI HINT Premium', 
    duration: '1 Week', 
    price: 250, 
    description: 'Unlock infinite AI hints for 7 days.', 
    icon: <Calendar size={24} />,
    color: 'text-neon-green'
  },
  { 
    id: '4', 
    name: 'AI HINT Premium', 
    duration: '1 Month', 
    price: 800, 
    description: 'Unlock infinite AI hints for 30 days.', 
    icon: <Star size={24} />,
    color: 'text-neon-yellow'
  },
  { 
    id: '5', 
    name: 'AI HINT Premium', 
    duration: '6 Months', 
    price: 4000, 
    description: 'Unlock infinite AI hints for 180 days.', 
    icon: <ShieldCheck size={24} />,
    color: 'text-neon-red'
  },
  { 
    id: '6', 
    name: 'AI HINT Premium', 
    duration: '1 Year', 
    price: 7000, 
    description: 'Unlock infinite AI hints for 365 days.', 
    icon: <Trophy size={24} />,
    color: 'text-neon-yellow'
  },
];

export function DailyTask({ user }: { user: User }) {
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS);
  const [notification, setNotification] = useState<{ xp: number; credits: number; icon: React.ReactNode; color: string } | null>(null);

  const handleClaim = (task: Task) => {
    if (!task.completed || task.claimed) return;

    setTasks(prev => prev.map(t => t.id === task.id ? { ...t, claimed: true } : t));
    setNotification({ xp: task.xpReward, credits: task.creditReward, icon: task.icon, color: task.color });
  };

  return (
    <div className="w-full mx-auto pb-12">
      {notification && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black/60 backdrop-blur-sm" onClick={() => setNotification(null)}>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-gaming-surface border border-neon-yellow p-8 rounded-3xl shadow-2xl text-center w-full max-w-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`flex justify-center mb-4 ${notification.color}`}>
              <Trophy size={48} />
            </div>
            <h3 className="text-neon-yellow font-bold text-2xl mb-4">Reward Claimed!</h3>
            <div className="flex items-center justify-center gap-6">
              <p className="text-neon-blue font-bold text-lg flex items-center gap-2">
                <Zap size={20} /> +{notification.xp} XP
              </p>
              <p className="text-neon-yellow font-bold text-lg flex items-center gap-2">
                <Coins size={20} /> +{notification.credits} Credits
              </p>
            </div>
          </motion.div>
        </div>
      )}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white pixel-font text-xl md:text-3xl mb-2">DAILY MISSIONS <span className="hidden md:inline">& SHOP</span></h1>
          <p className="text-gray-400">Complete tasks to earn credits and spend them in the shop.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Half: Tasks */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-gaming-surface border border-gaming-border rounded-2xl p-6"
        >
          <div className="flex items-center gap-3 mb-6 border-b border-gaming-border pb-4">
            <CheckSquare className="text-neon-blue" size={24} />
            <h2 className="text-xl font-bold text-white">Daily Missions</h2>
          </div>

          <div className="space-y-4">
            {tasks.map((task) => (
              <div 
                key={task.id} 
                onClick={() => handleClaim(task)}
                className={`p-4 rounded-xl border transition-all ${
                  task.completed && !task.claimed
                    ? 'bg-neon-yellow/10 border-neon-yellow animate-pulse cursor-pointer'
                    : task.claimed
                      ? 'bg-neon-green/5 border-neon-green/20 opacity-70'
                      : 'bg-gaming-bg border-gaming-border hover:border-gray-600'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-3">
                    <div className={`${task.color}`}>
                      {task.icon}
                    </div>
                    <div>
                      <h3 className={`font-bold ${task.claimed ? 'text-neon-green line-through' : 'text-white'}`}>
                        {task.title}
                      </h3>
                      <p className="text-xs text-gray-400 mt-1">{task.description}</p>
                    </div>
                  </div>
                  {task.completed && !task.claimed && (
                    <span className="text-[10px] font-bold text-neon-yellow uppercase animate-pulse">Click to Claim</span>
                  )}
                </div>

                <div className="mt-4">
                  <div className="flex justify-between text-[10px] font-mono mb-1">
                    <span className="text-gray-500">Progress</span>
                    <span className={task.completed ? 'text-neon-green' : 'text-gray-400'}>
                      {task.progress} / {task.total}
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-gaming-surface rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${(task.progress / task.total) * 100}%` }}
                      className={`h-full rounded-full ${task.completed ? 'bg-neon-green' : 'bg-neon-blue'}`}
                    />
                  </div>
                  
                  {/* Rewards below progress bar */}
                  <div className="mt-3 flex items-center gap-4">
                    <span className="text-neon-blue font-mono font-bold text-[10px] flex items-center gap-1">
                      <Zap size={10} /> +{task.xpReward} XP
                    </span>
                    <span className="text-neon-yellow font-mono font-bold text-[10px] flex items-center gap-1">
                      <Coins size={10} /> +{task.creditReward} Credits
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right Half: Shop */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-gaming-surface border border-gaming-border rounded-2xl p-6 hidden lg:block"
        >
          <div className="flex items-center justify-between mb-6 border-b border-gaming-border pb-4">
            <div className="flex items-center gap-3">
              <ShoppingBag className="text-neon-purple" size={24} />
              <h2 className="text-xl font-bold text-white">Premium Shop</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SHOP_ITEMS.map((item) => (
              <div 
                key={item.id}
                className="bg-gaming-bg border border-gaming-border rounded-xl p-5 hover:border-neon-purple/50 transition-all group relative overflow-hidden"
              >
                <div className={`absolute top-0 right-0 p-5 opacity-10 group-hover:opacity-20 transition-opacity ${item.color}`}>
                  {item.icon}
                </div>
                
                <div className={`mb-3 ${item.color}`}>
                  {item.icon}
                </div>
                
                <h3 className="font-bold text-white mb-1">{item.name}</h3>
                <div className="text-xs font-bold text-neon-purple mb-3 uppercase tracking-widest">{item.duration}</div>
                
                <p className="text-xs text-gray-400 mb-4 leading-relaxed">
                  {item.description}
                </p>
                
                <button className="w-full py-2.5 bg-gaming-surface border border-gaming-border rounded-lg text-sm font-bold text-white hover:bg-neon-purple hover:text-black hover:border-neon-purple transition-all flex items-center justify-center gap-2">
                  <span className="text-neon-yellow font-mono">{item.price} Credits</span>
                  <span className="text-xs opacity-50">|</span>
                  <span>BUY</span>
                </button>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="h-24 md:h-0"></div>
    </div>
  );
}
