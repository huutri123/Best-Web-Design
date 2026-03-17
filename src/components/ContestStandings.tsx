import React from 'react';
import { ArrowLeft, Trophy, Medal, Award, Users, CheckCircle } from 'lucide-react';
import { getRatingColor } from '../utils';

interface ContestStandingsProps {
  contest: any;
  onBack?: () => void;
  hideHeader?: boolean;
  hideSpacer?: boolean;
}

export function ContestStandings({ contest, onBack, hideHeader, hideSpacer }: ContestStandingsProps) {
  // Generate 46 problems (A-Z, AA-AT)
  const problemKeys = Array.from({ length: 46 }, (_, i) => 
    i < 26 ? String.fromCharCode(65 + i) : String.fromCharCode(65 + Math.floor(i / 26) - 1) + String.fromCharCode(65 + (i % 26))
  );

  const standings = [
    { rank: 1, username: contest.winner || "cyber_ninja", score: 4000, penalty: 120, rating: 2540 },
    { rank: 2, username: "NeoCoder", score: 3850, penalty: 145, rating: 2400 },
    { rank: 3, username: "ByteMe", score: 3850, penalty: 180, rating: 2300 },
    { rank: 4, username: "SyntaxTerror", score: 3200, penalty: 210, rating: 1950 },
    { rank: 5, username: "NullPointer", score: 2800, penalty: 150, rating: 1250 },
    { rank: 6, username: "NoobMaster", score: 1500, penalty: 300, rating: 850 },
  ].map((user) => {
    // Generate problems based on rank
    const problems: Record<string, string> = {};
    problemKeys.forEach((key, i) => {
        if (user.rank === 1) problems[key] = i < 45 ? 'Accepted' : 'Not Done';
        else if (user.rank === 2) problems[key] = i < 40 ? 'Accepted' : (i < 42 ? 'Wrong Answer' : 'Not Done');
        else if (user.rank === 3) problems[key] = i < 35 ? 'Accepted' : (i < 38 ? 'Wrong Answer' : 'Not Done');
        else if (user.rank === 4) problems[key] = i < 20 ? 'Accepted' : (i < 25 ? 'Wrong Answer' : 'Not Done');
        else if (user.rank === 5) problems[key] = i < 10 ? 'Accepted' : (i < 15 ? 'Wrong Answer' : 'Not Done');
        else problems[key] = i < 5 ? 'Accepted' : 'Not Done';
    });
    return { ...user, problems };
  });

  const problemLabels = problemKeys;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Accepted': return 'bg-neon-green/20 border-neon-green/50 text-neon-green';
      case 'Wrong Answer':
      case 'Time Limit Exceeded':
      case 'Runtime Error': return 'bg-neon-red/20 border-neon-red/50 text-neon-red';
      default: return 'bg-gaming-bg border-gaming-border text-gray-500';
    }
  };

  return (
    <div className="w-full mx-auto space-y-6">
      {onBack && (
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} /> Back to Contests
        </button>
      )}

      {!hideHeader && (
        <div className="bg-gaming-surface border border-gaming-border rounded-xl p-5 md:p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-neon-purple/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
          <h1 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-2 relative z-10">{contest.title} - Standings</h1>
          {/* Mobile View */}
          <div className="flex md:hidden flex-wrap items-center gap-2 text-[11px] text-gray-400 font-mono relative z-10">
            <span className="flex items-center gap-1 bg-gaming-bg px-2 py-1 rounded border border-gaming-border">
              <CheckCircle size={12} className="text-neon-green" /> Finished
            </span>
            <span className="flex items-center gap-1 bg-gaming-bg px-2 py-1 rounded border border-gaming-border">
              <Users size={12} className="text-neon-blue" /> {contest.participants.toLocaleString()}
            </span>
            <span className="flex items-center gap-1 text-neon-yellow bg-neon-yellow/10 px-2 py-1 rounded border border-neon-yellow/20">
              <Trophy size={12} /> {contest.type}
            </span>
          </div>

          {/* Desktop View */}
          <div className="hidden md:flex items-center gap-4 text-sm text-gray-400 font-mono relative z-10">
            <span>Ended {contest.date}</span>
            <span>•</span>
            <span>{contest.participants.toLocaleString()} Participants</span>
            <span>•</span>
            <span className="text-neon-yellow">{contest.type}</span>
          </div>
        </div>
      )}

      <div className="bg-gaming-surface border border-gaming-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-max md:w-full text-left border-collapse">
            <thead>
              <tr className="bg-gaming-bg/50 border-b border-gaming-border text-xs uppercase tracking-wider text-gray-500 font-mono">
                <th className="p-4 font-medium w-16 text-center">Rank</th>
                <th className="p-4 font-medium">Coder</th>
                <th className="p-4 font-medium text-right">Score</th>
                <th className="hidden md:table-cell p-4 font-medium text-right">Penalty</th>
                {problemLabels.map(label => (
                  <th key={label} className="p-2 font-medium text-center w-12">{label}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gaming-border">
              {standings.map((user) => (
                <tr key={user.username} className="hover:bg-gaming-bg/30 transition-colors">
                  <td className="p-4 text-center">
                    {user.rank === 1 ? <Trophy size={20} className="text-neon-yellow mx-auto" /> :
                     user.rank === 2 ? <Medal size={20} className="text-gray-300 mx-auto" /> :
                     user.rank === 3 ? <Award size={20} className="text-amber-600 mx-auto" /> :
                     <span className="text-gray-500 font-mono font-bold">{user.rank}</span>}
                  </td>
                  <td className="p-4">
                    <div className="font-bold whitespace-nowrap" style={{ color: getRatingColor(user.rating) }}>
                      {user.username}
                    </div>
                  </td>
                  <td className="p-4 text-right font-mono text-neon-blue font-bold">
                    {user.score}
                  </td>
                  <td className="hidden md:table-cell p-4 text-right font-mono text-gray-400">
                    {user.penalty}
                  </td>
                  {problemLabels.map(label => {
                    const status = user.problems[label as keyof typeof user.problems] || 'Not Done';
                    return (
                      <td key={label} className="p-1 text-center">
                        <div className={`w-8 h-8 md:w-10 md:h-10 rounded border flex items-center justify-center text-xs font-bold mx-auto ${getStatusColor(status)}`} title={`${label}: ${status}`}>
                          {status === 'Accepted' ? '✓' : status === 'Not Done' ? '-' : 'X'}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Spacer to prevent bottom nav overlap */}
      {!hideSpacer && <div className="h-24 md:hidden"></div>}
    </div>
  );
}
