import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Trophy, Clock, Users, Calendar, ArrowRight, Star, CheckCircle } from 'lucide-react';
import { ContestStandings } from './ContestStandings';

interface ContestsProps {
  onEnterContest: (contest: any) => void;
}

export function Contests({ onEnterContest }: ContestsProps) {
  const [selectedPastContest, setSelectedPastContest] = useState<any>(null);
  const [registeredContests, setRegisteredContests] = useState<number[]>([]);

  const upcomingContests = [
    {
      id: 1,
      title: "Weekly CodeQuest #42",
      date: "Started 5 mins ago",
      duration: "2 hours",
      participants: 1240,
      type: "Rated",
      difficulty: "All Levels",
      status: "active"
    },
    {
      id: 2,
      title: "Algorithm Sprint: Dynamic Programming",
      date: "Starts in 5 days",
      duration: "3 hours",
      participants: 850,
      type: "Rated",
      difficulty: "Advanced",
      status: "upcoming"
    }
  ];

  const pastContests = [
    {
      id: 3,
      title: "Weekly CodeQuest #41",
      date: "Ended 3 days ago",
      duration: "2 hours",
      participants: 3420,
      type: "Rated",
      winner: "cyber_ninja"
    },
    {
      id: 4,
      title: "Beginner's Problems: Array Manipulation",
      date: "Ended 1 week ago",
      duration: "1.5 hours",
      participants: 5120,
      type: "Unrated",
      winner: "newbie_coder"
    },
    ...Array.from({ length: 25 }).map((_, i) => ({
      id: i + 5,
      title: `Weekly CodeQuest #${40 - i}`,
      date: `Ended ${i + 2} weeks ago`,
      duration: "2 hours",
      participants: Math.floor(Math.random() * 2000) + 1000,
      type: i % 4 === 0 ? "Unrated" : "Rated",
      winner: `coder_${Math.floor(Math.random() * 1000)}`
    }))
  ];

  if (selectedPastContest) {
    return <ContestStandings contest={selectedPastContest} onBack={() => setSelectedPastContest(null)} />;
  }

  return (
    <div className="max-w-[1600px] mx-auto w-full space-y-8">
      {/* Header */}
      {/* <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <Trophy className="text-neon-yellow" size={32} />
            Contests
          </h1>
          <p className="text-gray-400">Compete against others, improve your rating, and climb the leaderboard.</p>
        </div>
        <button className="px-6 py-2 bg-neon-purple text-black font-bold rounded-lg hover:bg-neon-purple/90 transition-colors flex items-center gap-2">
          <Star size={18} /> Create Private Contest
        </button>
      </div> */}

      {/* Upcoming Contests */}
      <section>
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Clock className="text-neon-blue" size={20} /> Upcoming Contests
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {upcomingContests.map((contest, i) => (
            <motion.div
              key={contest.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-gaming-surface border border-gaming-border rounded-xl p-6 hover:border-neon-blue/50 transition-colors group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-neon-blue/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-neon-blue/10 transition-colors"></div>
              
              <div className="flex justify-between items-start mb-4 relative z-10">
                <div>
                  <h3 className="text-lg font-bold text-white mb-1 group-hover:text-neon-blue transition-colors">{contest.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-400 font-mono">
                    <Calendar size={14} /> {contest.date}
                  </div>
                </div>
                <span className="px-3 py-1 bg-gaming-bg border border-gaming-border rounded text-xs font-mono text-neon-yellow">
                  {contest.type}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6 relative z-10">
                <div className="bg-gaming-bg p-3 rounded-lg border border-gaming-border">
                  <div className="text-xs text-gray-500 mb-1">Duration</div>
                  <div className="text-sm font-bold text-white">{contest.duration}</div>
                </div>
                <div className="bg-gaming-bg p-3 rounded-lg border border-gaming-border">
                  <div className="text-xs text-gray-500 mb-1">Registered</div>
                  <div className="text-sm font-bold text-white flex items-center gap-1">
                    <Users size={14} className="text-gray-400" /> {contest.participants}
                  </div>
                </div>
              </div>
              
              {contest.status === 'active' ? (
                <button 
                  onClick={() => onEnterContest(contest)}
                  className="w-full py-2 bg-neon-red/10 text-neon-red border border-neon-red/30 rounded-lg font-bold hover:bg-neon-red hover:text-black transition-all flex justify-center items-center gap-2 relative z-10"
                >
                  ENTER CONTEST <ArrowRight size={16} />
                </button>
              ) : registeredContests.includes(contest.id) ? (
                <button 
                  disabled
                  className="w-full py-2 bg-green-500/10 text-green-400 border border-green-500/30 rounded-lg font-bold flex justify-center items-center gap-2 relative z-10 cursor-not-allowed"
                >
                  REGISTERED <CheckCircle size={16} />
                </button>
              ) : (
                <button 
                  onClick={() => setRegisteredContests([...registeredContests, contest.id])}
                  className="w-full py-2 bg-neon-blue/10 text-neon-blue border border-neon-blue/30 rounded-lg font-bold hover:bg-neon-blue hover:text-black transition-all flex justify-center items-center gap-2 relative z-10"
                >
                  REGISTER NOW <ArrowRight size={16} />
                </button>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Past Contests */}
      <section>
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Calendar className="text-gray-400" size={20} /> Past Contests
        </h2>
        <div className="bg-gaming-surface border border-gaming-border rounded-xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto overflow-y-auto custom-scrollbar max-h-[600px]">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead className="sticky top-0 z-10 bg-gaming-surface">
                <tr className="bg-gaming-bg/80 border-b border-gaming-border text-xs uppercase tracking-wider text-gray-500 font-mono backdrop-blur-md">
                  <th className="p-4 font-medium">Contest</th>
                  <th className="p-4 font-medium">Date</th>
                  <th className="p-4 font-medium">Participants</th>
                  <th className="p-4 font-medium">Winner</th>
                  <th className="p-4 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gaming-border">
                {pastContests.map((contest) => (
                  <tr key={contest.id} className="hover:bg-gaming-bg/30 transition-colors">
                    <td className="p-4">
                      <div className="font-bold text-white">{contest.title}</div>
                      <div className="text-xs text-gray-500 font-mono mt-1">{contest.type}</div>
                    </td>
                    <td className="p-4 text-sm text-gray-400">{contest.date}</td>
                    <td className="p-4 text-sm text-gray-300 font-mono">{contest.participants.toLocaleString()}</td>
                    <td className="p-4 text-sm text-neon-purple font-bold">{contest.winner}</td>
                    <td className="p-4 text-right">
                      <button 
                        onClick={() => setSelectedPastContest(contest)}
                        className="text-sm text-neon-blue hover:text-white transition-colors font-bold"
                      >
                        View Standings
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      
      {/* Bottom Spacer to provide extra scrolling space */}
      <div className="h-24"></div>
    </div>
  );
}
