import { Quest, Language, Post, User } from './types';

export const MOCK_USER: User = {
  username: "CyberNinja99",
  level: 42,
  xp: 8450,
  nextLevelXp: 10000,
  rating: 1640,
  ratingHistory: [
    { date: 'Jan', rating: 800, contestName: 'New Year Sprint' },
    { date: 'Feb', rating: 950, contestName: 'February CodeFest' },
    { date: 'Mar', rating: 1100, contestName: 'Spring Algorithm Challenge' },
    { date: 'Apr', rating: 1050, contestName: 'April Fools Bug Hunt' },
    { date: 'May', rating: 1250, contestName: 'May Matrix Madness' },
    { date: 'Jun', rating: 1400, contestName: 'Summer Code Jam' },
    { date: 'Jul', rating: 1350, contestName: 'July Graph Guardian' },
    { date: 'Aug', rating: 1500, contestName: 'August DP Duel' },
    { date: 'Sep', rating: 1640, contestName: 'September CodeQuest #40' },
  ],
  avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=CyberNinja99&backgroundColor=18181b",
  title: "Algorithm Assassin",
  streak: 12,
  credits: 450,
  joinDate: "2024-01-15",
  location: "Vietnam",
  phone: "+84 123 456 789",
  about: "I write code and defeat bugs. Currently mastering Dynamic Programming and Graph Algorithms.",
  following: ["NeoCoder", "ByteMe", "SyntaxTerror", "CodeWizard", "AlgoKing", "DataQueen", "LogicLord", "PixelPrince", "BitBoss", "NullPointer"],
  socials: {
    github: "https://github.com/CyberNinja99",
    twitter: "https://twitter.com/CyberNinja99_dev",
    facebook: "https://facebook.com/CyberNinja99",
    linkedin: "https://linkedin.com/in/CyberNinja99",
    website: "https://cyberninja99.dev"
  },
  badges: [
    { id: 'b1', name: 'First Blood', icon: 'sword', description: 'Solved the first quest' },
    { id: 'b2', name: 'Night Owl', icon: 'moon', description: 'Submitted code after midnight' },
    { id: 'b3', name: 'Flawless', icon: 'shield', description: 'Passed all tests on first try' }
  ]
};

export const MOCK_POSTS: Post[] = [
  {
    id: "p1",
    title: "Patch Notes v2.4: The Graph Guardian Awakens",
    content: "Greetings Coders!\n\nWe have just deployed a new set of quests in the Data Dungeon. Prepare your algorithms and sharpen your logic. The new Boss quest 'Graph Guardian's Riddle' is now available in Problems.\n\nAdditionally, we've optimized the code execution engine. Python submissions should now run 15% faster.\n\nMay your code compile on the first try.",
    author: "Admin_Zeus",
    authorRole: "System Architect",
    date: "2 hours ago",
    tags: ["Patch Notes", "Update", "New Quests"],
    likes: 342,
    comments: 56,
    commentList: [
      {
        id: "c1",
        author: "NeoCoder",
        content: "Finally! The Graph Guardian quest looks sick.",
        date: "1 hour ago",
        likes: 12,
        replies: [
          {
            id: "r1",
            author: "Admin_Zeus",
            content: "Good luck! You'll need it.",
            date: "45 mins ago",
            likes: 5
          }
        ]
      },
      {
        id: "c2",
        author: "ByteMe",
        content: "Python optimization is much appreciated. Thanks devs!",
        date: "30 mins ago",
        likes: 8
      },
      {
        id: "c2-1",
        author: "CodeWizard",
        content: "I've been waiting for this update for weeks! The performance boost is real.",
        date: "25 mins ago",
        likes: 4
      },
      {
        id: "c2-2",
        author: "BugHunter",
        content: "Found a small visual glitch in the quest description, but the gameplay is solid.",
        date: "20 mins ago",
        likes: 2
      },
      {
        id: "c2-3",
        author: "DataMaster",
        content: "The Graph Guardian's Riddle is actually quite challenging. Took me 3 tries!",
        date: "15 mins ago",
        likes: 15
      },
      {
        id: "c2-4",
        author: "AlgoAddict",
        content: "Can we get more DP quests in the next update? Please! I've been practicing my dynamic programming skills for months and I'm really looking forward to some high-level challenges that involve complex state transitions and optimization techniques like bitmasking or digit DP. It would be amazing to see a boss-level quest that really tests our limits and rewards us with some unique badges or titles. Keep up the great work, the platform is getting better and better with every patch!",
        date: "10 mins ago",
        likes: 7
      }
    ]
  },
  {
    id: "p2",
    title: "Weekend Tournament: The Sorting Hat",
    content: "Get ready for this weekend's coding tournament! The theme is sorting algorithms and optimization.\n\nTop 10 players will receive the exclusive 'QuickSort Master' badge and 5000 bonus XP. The tournament starts this Saturday at 18:00 UTC.\n\nRules:\n- No pre-computed answers.\n- Plagiarism will result in an immediate ban.\n- Have fun!",
    author: "Admin_Athena",
    authorRole: "Event Manager",
    date: "1 day ago",
    tags: ["Tournament", "Events"],
    likes: 890,
    comments: 124,
    commentList: [
      {
        id: "c3",
        author: "SyntaxTerror",
        content: "I've been practicing QuickSort all week. Bring it on!",
        date: "12 hours ago",
        likes: 45
      }
    ]
  },
  {
    id: "p3",
    title: "Server Maintenance Notice",
    content: "We will be performing scheduled maintenance on the database servers tomorrow from 02:00 UTC to 04:00 UTC. During this time, Problems will be unavailable, and code submissions will be paused.\n\nPlease plan your coding sessions accordingly.",
    author: "Admin_Hephaestus",
    authorRole: "DevOps",
    date: "3 days ago",
    tags: ["Maintenance", "Server"],
    likes: 112,
    comments: 18
  }
];

export const CODE_TEMPLATES: Record<Language, string> = {
  javascript: "function solve() {\n  // Your code here\n  \n}\n\nsolve();",
  python: "def solve():\n    # Your code here\n    pass\n\nif __name__ == '__main__':\n    solve()",
  cpp: "#include <iostream>\nusing namespace std;\n\nint main() {\n    // Your code here\n    \n    return 0;\n}",
  java: "public class Main {\n    public static void main(String[] args) {\n        // Your code here\n        \n    }\n}"
};

export const MOCK_QUESTS: Quest[] = [
  {
    id: "q0",
    title: "The First Spell: 1+1",
    difficulty: "Easy",
    xpReward: 50,
    tags: ["Tutorial", "Math"],
    status: "available",
    timeLimit: "1.0s",
    memoryLimit: "256MB",
    description: "Welcome, novice! Your first task is to prove your connection to the mana stream.\n\nSimply write a program that calculates and prints the result of 1 + 1.",
    examples: [
      {
        input: "(none)",
        output: "2",
        explanation: "1 + 1 equals 2."
      }
    ]
  },
  {
    id: "q1",
    title: "The Array Awakening",
    difficulty: "Easy",
    xpReward: 100,
    tags: ["Arrays", "Math"],
    status: "completed",
    timeLimit: "1.0s",
    memoryLimit: "256MB",
    description: "You have entered the Data Dungeon. To unlock the first gate, you must find the sum of all elements in a magical array.\n\nGiven an array of integers `A` of size `N`, calculate the sum of all elements.",
    examples: [
      {
        input: "5\n1 2 3 4 5",
        output: "15",
        explanation: "1 + 2 + 3 + 4 + 5 = 15"
      }
    ]
  },
  {
    id: "q2",
    title: "String Sorcery",
    difficulty: "Medium",
    xpReward: 250,
    tags: ["Strings", "Two Pointers"],
    status: "available",
    timeLimit: "2.0s",
    memoryLimit: "256MB",
    description: "A dark wizard has scrambled the ancient scrolls. You must determine if a given string is a palindrome to break the spell.\n\nA string is a palindrome if it reads the same forwards and backwards. Ignore spaces and case.",
    examples: [
      {
        input: "Race car",
        output: "YES",
        explanation: "Ignoring spaces and case, 'racecar' is a palindrome."
      },
      {
        input: "hello world",
        output: "NO"
      }
    ]
  },
  {
    id: "q3",
    title: "Graph Guardian's Riddle",
    difficulty: "Hard",
    xpReward: 500,
    tags: ["Graphs", "DFS", "BFS"],
    status: "available",
    timeLimit: "2.5s",
    memoryLimit: "512MB",
    description: "You stand before the Graph Guardian. To pass, you must find the shortest path through the labyrinth of nodes.\n\nGiven an unweighted undirected graph with `N` nodes and `M` edges, find the shortest path from node `1` to node `N`.",
    examples: [
      {
        input: "4 4\n1 2\n2 3\n3 4\n1 3",
        output: "2",
        explanation: "The shortest path is 1 -> 3 -> 4, which takes 2 edges."
      }
    ]
  },
  {
    id: "q4",
    title: "Dynamic Dragon",
    difficulty: "Boss",
    xpReward: 1500,
    tags: ["DP", "Optimization"],
    status: "locked",
    timeLimit: "3.0s",
    memoryLimit: "1024MB"
  },
  {
    id: "q5",
    title: "Binary Search Behemoth",
    difficulty: "Medium",
    xpReward: 300,
    tags: ["Binary Search"],
    status: "available"
  },
  ...Array.from({ length: 50 }).map((_, i) => {
    const difficulties = ["Easy", "Medium", "Hard", "Boss"];
    const tagsList = [["Math"], ["Arrays"], ["Strings"], ["DP"], ["Graphs"], ["Trees"], ["Greedy"]];
    const diff = difficulties[i % 4];
    const xp = diff === "Easy" ? 100 : diff === "Medium" ? 250 : diff === "Hard" ? 500 : 1000;
    
    return {
      id: `q${i + 6}`,
      title: `Procedural Quest ${i + 1}: The ${diff} Challenge`,
      difficulty: diff,
      xpReward: xp,
      tags: tagsList[i % tagsList.length],
      status: i % 5 === 0 ? "completed" : i % 7 === 0 ? "locked" : "available",
      timeLimit: "1.0s",
      memoryLimit: "256MB",
      description: `This is an automatically generated quest to test your skills in ${tagsList[i % tagsList.length][0]}.`,
    } as Quest;
  })
];

export const MOCK_LEADERBOARD = [
  { rank: 1, username: "NeoCoder", level: 99, rating: 2540 },
  { rank: 2, username: "ByteMe", level: 95, rating: 2300 },
  { rank: 3, username: "SyntaxTerror", level: 88, rating: 1950 },
  { rank: 4, username: "CodeWizard", level: 85, rating: 1890 },
  { rank: 5, username: "AlgoKing", level: 82, rating: 1850 },
  { rank: 6, username: "DataMaster", level: 80, rating: 1820 },
  { rank: 7, username: "BugHunter", level: 78, rating: 1790 },
  { rank: 8, username: "LogicLord", level: 75, rating: 1760 },
  { rank: 9, username: "BitBasher", level: 72, rating: 1730 },
  { rank: 10, username: "StackOverlord", level: 70, rating: 1710 },
  { rank: 11, username: "RecursionReaper", level: 68, rating: 1690 },
  { rank: 12, username: "PointerPrince", level: 65, rating: 1670 },
  { rank: 13, username: "CyberNinja99", level: 42, rating: 1640 },
  { rank: 14, username: "NullPointer", level: 62, rating: 1620 },
  { rank: 15, username: "HeapHero", level: 60, rating: 1600 },
  { rank: 16, username: "QueueQueen", level: 58, rating: 1580 },
  { rank: 17, username: "StackStar", level: 56, rating: 1560 },
  { rank: 18, username: "GraphGhost", level: 54, rating: 1540 },
  { rank: 19, username: "TreeTamer", level: 52, rating: 1520 },
  { rank: 20, username: "HashHustler", level: 50, rating: 1500 },
  { rank: 21, username: "SortSovereign", level: 48, rating: 1480 },
  { rank: 22, username: "SearchSage", level: 46, rating: 1460 },
  { rank: 23, username: "MatrixMage", level: 44, rating: 1440 },
  { rank: 24, username: "VectorViking", level: 42, rating: 1420 },
  { rank: 25, username: "ListLegend", level: 40, rating: 1400 },
  { rank: 26, username: "MapMaster", level: 38, rating: 1380 },
  { rank: 27, username: "SetSultan", level: 36, rating: 1360 },
  { rank: 28, username: "TupleTitan", level: 34, rating: 1340 },
  { rank: 29, username: "DictDuke", level: 32, rating: 1320 },
  { rank: 30, username: "StringShogun", level: 30, rating: 1300 },
  { rank: 31, username: "CharChampion", level: 28, rating: 1280 },
  { rank: 32, username: "IntInvader", level: 26, rating: 1260 },
  { rank: 33, username: "FloatFighter", level: 24, rating: 1240 },
  { rank: 34, username: "BoolBaron", level: 22, rating: 1220 },
  { rank: 35, username: "DoubleDemon", level: 20, rating: 1200 },
  { rank: 36, username: "LongLord", level: 18, rating: 1180 },
  { rank: 37, username: "ShortSquire", level: 16, rating: 1160 },
  { rank: 38, username: "ByteBishop", level: 14, rating: 1140 },
  { rank: 39, username: "BitKnight", level: 12, rating: 1120 },
  { rank: 40, username: "NibbleNinja", level: 10, rating: 1100 },
  { rank: 41, username: "HexHacker", level: 9, rating: 1080 },
  { rank: 42, username: "OctalOracle", level: 8, rating: 1060 },
  { rank: 43, username: "BinaryBeast", level: 7, rating: 1040 },
  { rank: 44, username: "DecimalDruid", level: 6, rating: 1020 },
  { rank: 45, username: "PrimePaladin", level: 5, rating: 1000 },
  { rank: 46, username: "FactorFanatic", level: 4, rating: 980 },
  { rank: 47, username: "ModuloMonk", level: 3, rating: 960 },
  { rank: 48, username: "PowerPlayer", level: 2, rating: 940 },
  { rank: 49, username: "RootRanger", level: 1, rating: 920 },
  { rank: 50, username: "NoobMaster", level: 1, rating: 900 },
  { rank: 51, username: "BeginnerBot", level: 1, rating: 880 },
  { rank: 52, username: "HelloWorlder", level: 1, rating: 860 },
  { rank: 53, username: "ScriptScout", level: 1, rating: 840 },
  { rank: 54, username: "CodeCadet", level: 1, rating: 820 },
  { rank: 55, username: "LogicLearner", level: 1, rating: 800 },
  { rank: 56, username: "SyntaxStudent", level: 1, rating: 780 },
  { rank: 57, username: "DebugDisciple", level: 1, rating: 760 },
  { rank: 58, username: "VariableVassal", level: 1, rating: 740 },
  { rank: 59, username: "FunctionFollower", level: 1, rating: 720 },
  { rank: 60, username: "ClassClown", level: 1, rating: 700 },
];
