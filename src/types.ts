export type View = 'home' | 'problems' | 'quest' | 'leaderboard' | 'profile' | 'contests' | 'contest_problems' | 'edit_profile' | 'ai_hint' | 'daily_task' | 'top_up' | 'login' | 'contact' | 'admin_dashboard';
export type Language = 'javascript' | 'python' | 'cpp' | 'java';

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface User {
  username: string;
  role?: 'user' | 'admin';
  level: number;
  xp: number;
  nextLevelXp: number;
  rating: number;
  ratingHistory: { date: string; rating: number; contestName?: string }[];
  avatar: string;
  title: string;
  streak: number;
  credits: number;
  badges: Badge[];
  joinDate?: string;
  about?: string;
  following?: string[];
  location?: string;
  phone?: string;
  socials?: {
    github?: string;
    twitter?: string;
    facebook?: string;
    linkedin?: string;
    website?: string;
  };
}

export interface Quest {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Boss';
  xpReward: number;
  tags: string[];
  status: 'locked' | 'available' | 'completed' | 'none' | 'accepted' | 'wrong_answer' | 'time_limit';
  description?: string;
  examples?: { input: string; output: string; explanation?: string }[];
  timeLimit?: string;
  memoryLimit?: string;
  acRate?: number;
}

export interface PostComment {
  id: string;
  author: string;
  content: string;
  date: string;
  likes: number;
  isLiked?: boolean;
  replies?: PostComment[];
}

export interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  authorRole: string;
  date: string;
  tags: string[];
  likes: number;
  comments: number;
  commentList?: PostComment[];
}
