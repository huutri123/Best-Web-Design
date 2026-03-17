import React, { useState, useEffect } from 'react';
import { View, Quest, User } from './types';
import { MOCK_USER, MOCK_LEADERBOARD, MOCK_QUESTS } from './data';
import { Footer } from './components/Footer';
import { Home } from './components/Home';
import { Problems } from './components/Problems';
import { QuestDetail } from './components/QuestDetail';
import { Leaderboard } from './components/Leaderboard';
import { Profile } from './components/Profile';
import { EditProfile } from './components/EditProfile';
import { Contests } from './components/Contests';
import { ContestProblems } from './components/ContestProblems';
import { AIHint } from './components/AIHint';
import { Auth } from './components/Auth';
import { DailyTask } from './components/DailyTask';
import { TopUp } from './components/TopUp';
import { Contact } from './components/Contact';
import { LegalModal, PRIVACY_POLICY, TERMS_OF_SERVICE } from './components/LegalModals';
import { Notifications, MOCK_NOTIFICATIONS, Notification } from './components/Notifications';
import { NotificationDetail } from './components/NotificationDetail';
import { Trophy, LogOut, Code2, Terminal, Flame, Bell, Home as HomeIcon, User as UserIcon, Calendar, Bot, Sun, Moon, ListTodo, Coins } from 'lucide-react';
import { getRatingColor } from './utils';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedQuest, setSelectedQuest] = useState<Quest | null>(null);
  const [activeContest, setActiveContest] = useState<any>(null);
  const [viewedUser, setViewedUser] = useState<User | null>(null);
  const [currentUser, setCurrentUser] = useState<User>(MOCK_USER);
  const [theme, setTheme] = useState<'LIGHT' | 'DARK'>('DARK');
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const [legalModal, setLegalModal] = useState<{ isOpen: boolean; type: 'privacy' | 'terms' }>({ isOpen: false, type: 'privacy' });

  const showFooter = !['ai_hint', 'edit_profile', 'login', 'quest'].includes(currentView);

  useEffect(() => {
    if (theme === 'LIGHT') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  }, [theme]);

  const unreadCount = notifications.filter(n => !n.read).length;
  const displayCount = unreadCount > 9 ? '9+' : unreadCount;

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleDeleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    setSelectedNotification(null);
  };

  const handleDeleteAllRead = () => {
    setNotifications(prev => prev.filter(n => !n.read));
  };

  const handleNavigate = (view: View) => {
    if (!isAuthenticated && view !== 'login' && view !== 'home' && view !== 'contact') {
        setCurrentView('login');
        return;
    }
    setCurrentView(view);
    if (view !== 'quest') {
      setSelectedQuest(null);
    }
    if (view !== 'contest_problems' && view !== 'quest') {
      setActiveContest(null);
    }
    if (view === 'profile') {
      setViewedUser(null);
    }
  };

  const handleViewProfile = (username: string) => {
    if (username === currentUser.username) {
      setViewedUser(null);
    } else {
      const lbEntry = MOCK_LEADERBOARD.find(p => p.username === username);
      if (lbEntry) {
        setViewedUser({
          username: lbEntry.username,
          level: lbEntry.level,
          xp: lbEntry.level * 200,
          nextLevelXp: (lbEntry.level + 1) * 200,
          rating: lbEntry.rating,
          ratingHistory: [
            { date: 'Jan', rating: lbEntry.rating - 200 },
            { date: 'Feb', rating: lbEntry.rating - 100 },
            { date: 'Mar', rating: lbEntry.rating },
          ],
          avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${lbEntry.username}&backgroundColor=18181b`,
          title: lbEntry.rating > 2000 ? "Grandmaster" : "Elite Warrior",
          streak: Math.floor(Math.random() * 20),
          credits: Math.floor(Math.random() * 1000),
          joinDate: "2024-02-20",
          about: `I am ${lbEntry.username}, a level ${lbEntry.level} warrior in the digital realm.`,
          badges: [
            { id: 'b1', name: 'Warrior', icon: 'sword', description: 'Proven in battle' }
          ]
        });
      }
    }
    setCurrentView('profile');
  };

  const handleSelectQuest = (quest: Quest) => {
    setSelectedQuest(quest);
    setCurrentView('quest');
  };

  const handleSelectQuestByTitle = (title: string) => {
    const quest = MOCK_QUESTS.find(q => q.title === title);
    if (quest) {
      handleSelectQuest(quest);
    }
  };

  const handleEnterContest = (contest: any) => {
    setActiveContest(contest);
    setCurrentView('contest_problems');
  };

  const handleEditProfile = () => {
    setCurrentView('edit_profile');
  };

  const handleSaveProfile = (updatedData: Partial<User>) => {
    setCurrentUser(prev => ({
      ...prev,
      ...updatedData
    }));
    setCurrentView('profile');
  };

  const NavItem = ({ icon: Icon, label, view }: { icon: any, label: string, view: View }) => {
    const isActive = currentView === view || (view === 'problems' && currentView === 'quest' && !activeContest) || (view === 'contests' && (currentView === 'contest_problems' || (currentView === 'quest' && activeContest)));
    return (
      <button
        onClick={() => handleNavigate(view)}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
          isActive 
            ? 'bg-neon-purple/10 text-neon-purple border border-neon-purple/30 glow-box-purple' 
            : 'text-gray-400 hover:bg-gaming-surface hover:text-white border border-transparent'
        }`}
      >
        <Icon size={18} />
        <span className="font-medium text-sm">{label}</span>
      </button>
    );
  };

  return (
    <div className="h-screen overflow-hidden flex flex-col bg-gaming-bg selection:bg-neon-purple/30">
      {/* Top Navbar */}
      <header className="h-16 border-b border-gaming-border bg-gaming-surface/80 backdrop-blur-md shrink-0 z-50 relative">
        <div className="w-full mx-auto px-4 md:px-8 h-full flex items-center justify-between">
          <div className="flex items-center gap-8">
            {/* Logo */}
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNavigate('home')}>
              <div className="bg-neon-purple p-1.5 rounded-lg text-black">
                <Code2 size={20} strokeWidth={2.5} />
              </div>
              <span className="font-bold text-lg pixel-font text-xs tracking-widest text-white glow-text-purple hidden sm:block">CODEQUEST</span>
            </div>
            
            {/* Desktop Nav Links */}
            <nav className="hidden md:flex items-center gap-2">
              <NavItem icon={HomeIcon} label="Home" view="home" />
              <NavItem icon={Terminal} label="Problems" view="problems" />
              <NavItem icon={Calendar} label="Contests" view="contests" />
              <NavItem icon={Trophy} label="Leaderboard" view="leaderboard" />
              <NavItem icon={Bot} label="AI Hint" view="ai_hint" />
              <NavItem icon={ListTodo} label="Daily Tasks & Shop" view="daily_task" />
            </nav>
          </div>

          {/* User Profile & Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            {isAuthenticated ? (
              <>
                <div 
                  onClick={() => handleNavigate('top_up')}
                  className="hidden items-center gap-1 text-neon-yellow font-mono text-xs bg-gaming-bg border border-gaming-border px-2 py-1 rounded-full cursor-pointer hover:border-neon-yellow/50 transition-colors"
                >
                  <Coins size={14} /> {currentUser.credits}
                </div>

                <div className="relative">
                  <button 
                    id="notification-toggle"
                    onClick={() => setShowNotifications(!showNotifications)}
                    className={`flex items-center justify-center bg-gaming-bg border border-gaming-border rounded-full cursor-pointer w-8 h-8 text-gray-400 hover:text-neon-purple transition-colors relative ${showNotifications ? 'bg-gaming-surface text-neon-purple border-neon-purple/50' : ''}`}
                  >
                    <Bell size={18} />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 bg-neon-red rounded-full border-2 border-gaming-surface flex items-center justify-center text-[10px] font-bold text-white">
                        {displayCount}
                      </span>
                    )}
                  </button>
                  
                  {showNotifications && (
                    <Notifications 
                      notifications={notifications}
                      onClose={() => setShowNotifications(false)} 
                      onSelect={(notif) => {
                        handleMarkAsRead(notif.id);
                        setSelectedNotification(notif);
                      }}
                      onMarkAllRead={handleMarkAllRead}
                      onDeleteAllRead={handleDeleteAllRead}
                    />
                  )}
                </div>
              </>
            ) : null}

            <button 
              className="flex items-center justify-center bg-gaming-bg border border-gaming-border rounded-full cursor-pointer w-8 h-8 text-gray-400 hover:text-neon-purple transition-colors"
              onClick={() => setTheme(theme === 'LIGHT' ? 'DARK' : 'LIGHT')}
              title="Toggle Theme"
            >
              {theme === 'LIGHT' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            
            {isAuthenticated ? (
              <div 
                className="hidden sm:flex items-center gap-3 bg-gaming-bg border border-gaming-border px-3 py-1.5 rounded-full cursor-pointer hover:border-neon-purple/50 transition-colors"
                onClick={() => handleNavigate('profile')}
              >
                <div className="flex items-center gap-1 text-neon-red font-mono text-sm" title="Current Streak">
                  <Flame size={16} /> {currentUser.streak}
                </div>
                <div className="w-px h-4 bg-gaming-border"></div>
                <div 
                  className="flex items-center gap-1 text-neon-yellow font-mono text-sm hover:text-white transition-colors" 
                  title="Credits (Click to Top-up)"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNavigate('top_up');
                  }}
                >
                  <Coins size={16} /> {currentUser.credits}
                </div>
                <div className="w-px h-4 bg-gaming-border"></div>
                <div className="font-mono text-sm font-bold" style={{ color: getRatingColor(currentUser.rating) }}>
                  {currentUser.rating}
                </div>
                <img src={currentUser.avatar} alt="avatar" className="w-7 h-7 rounded-full bg-gaming-surface border border-gaming-border" />
              </div>
            ) : (
              <button 
                onClick={() => handleNavigate('login')}
                className="border border-neon-purple text-neon-purple hover:bg-neon-purple hover:text-white font-bold px-5 py-1.5 rounded-full text-sm transition-all"
              >
                Login / Register
              </button>
            )}

            {/* Mobile Avatar (Clickable) */}
            {isAuthenticated && (
              <img 
                src={currentUser.avatar} 
                alt="avatar" 
                className="w-8 h-8 rounded-full bg-gaming-surface border border-gaming-border sm:hidden cursor-pointer" 
                onClick={() => handleNavigate('profile')}
              />
            )}

            {isAuthenticated && (
              <button className="hidden md:flex text-gray-400 hover:text-neon-red transition-colors ml-2" title="Disconnect" onClick={() => { setIsAuthenticated(false); handleNavigate('home'); }}>
                <LogOut size={20} />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Bottom Nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-gaming-surface border-t border-gaming-border z-50 px-2 py-2 flex justify-around items-center overflow-x-auto">
        <button onClick={() => handleNavigate('home')} className={`p-2 flex flex-col items-center gap-1 ${currentView === 'home' ? 'text-neon-purple' : 'text-gray-400'}`}>
          <HomeIcon size={20}/>
          <span className="text-[10px] font-medium">Home</span>
        </button>
        <button onClick={() => handleNavigate('problems')} className={`p-2 flex flex-col items-center gap-1 ${(currentView === 'problems' || (currentView === 'quest' && !activeContest)) ? 'text-neon-purple' : 'text-gray-400'}`}>
          <Terminal size={20}/>
          <span className="text-[10px] font-medium">Problems</span>
        </button>
        <button onClick={() => handleNavigate('contests')} className={`p-2 flex flex-col items-center gap-1 ${(currentView === 'contests' || currentView === 'contest_problems' || (currentView === 'quest' && activeContest)) ? 'text-neon-purple' : 'text-gray-400'}`}>
          <Calendar size={20}/>
          <span className="text-[10px] font-medium">Contests</span>
        </button>
        <button onClick={() => handleNavigate('leaderboard')} className={`p-2 flex flex-col items-center gap-1 ${currentView === 'leaderboard' ? 'text-neon-purple' : 'text-gray-400'}`}>
          <Trophy size={20}/>
          <span className="text-[10px] font-medium">Rank</span>
        </button>
        <button onClick={() => handleNavigate('ai_hint')} className={`p-2 flex flex-col items-center gap-1 ${currentView === 'ai_hint' ? 'text-neon-purple' : 'text-gray-400'}`}>
          <Bot size={20}/>
          <span className="text-[10px] font-medium">AI Hint</span>
        </button>
        <button onClick={() => handleNavigate('daily_task')} className={`p-2 flex flex-col items-center gap-1 ${currentView === 'daily_task' ? 'text-neon-purple' : 'text-gray-400'}`}>
          <ListTodo size={20}/>
          <span className="text-[10px] font-medium">Daily</span>
        </button>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto flex flex-col">
        <div className={`${currentView === 'login' ? 'w-full h-full' : `max-w-[1600px] w-full mx-auto flex-grow p-4 md:p-8 ${currentView === 'ai_hint' ? 'pb-24' : 'pb-32'} md:pb-8`}`}>
          {currentView === 'home' && <Home isAuthenticated={isAuthenticated} onRequireLogin={() => handleNavigate('login')} />}
          {currentView === 'problems' && <Problems onSelectQuest={handleSelectQuest} />}
          {currentView === 'quest' && selectedQuest && <QuestDetail quest={selectedQuest} onBack={() => handleNavigate(activeContest ? 'contest_problems' : 'problems')} />}
          {currentView === 'contests' && <Contests onEnterContest={handleEnterContest} />}
          {currentView === 'contest_problems' && activeContest && <ContestProblems contest={activeContest} onBack={() => handleNavigate('contests')} onSelectQuest={handleSelectQuest} />}
          {currentView === 'leaderboard' && <Leaderboard onViewProfile={handleViewProfile} />}
          {currentView === 'ai_hint' && <AIHint />}
          {currentView === 'daily_task' && <DailyTask user={currentUser} />}
          {currentView === 'top_up' && <TopUp />}
          {currentView === 'contact' && <Contact />}
          {currentView === 'login' && (
            <Auth 
              onLogin={() => { setIsAuthenticated(true); handleNavigate('home'); }} 
              onShowPrivacy={() => setLegalModal({ isOpen: true, type: 'privacy' })}
              onShowTerms={() => setLegalModal({ isOpen: true, type: 'terms' })}
            />
          )}
          {currentView === 'profile' && (
            <Profile 
              user={viewedUser || currentUser} 
              onViewProfile={handleViewProfile} 
              onEditProfile={handleEditProfile}
              onSelectQuest={handleSelectQuestByTitle}
            />
          )}
          {currentView === 'edit_profile' && (
            <EditProfile 
              user={currentUser} 
              onBack={() => setCurrentView('profile')} 
              onSave={handleSaveProfile}
            />
          )}
        </div>
        {showFooter && (
          <div className="hidden md:block">
            <Footer 
              onShowPrivacy={() => setLegalModal({ isOpen: true, type: 'privacy' })}
              onShowTerms={() => setLegalModal({ isOpen: true, type: 'terms' })}
              onShowContact={() => handleNavigate('contact')}
            />
          </div>
        )}
      </main>

      {selectedNotification && (
        <NotificationDetail 
          notification={selectedNotification} 
          onClose={() => setSelectedNotification(null)} 
          onDelete={handleDeleteNotification}
        />
      )}

      <LegalModal
        isOpen={legalModal.isOpen}
        onClose={() => setLegalModal({ ...legalModal, isOpen: false })}
        title={legalModal.type === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}
        content={legalModal.type === 'privacy' ? PRIVACY_POLICY : TERMS_OF_SERVICE}
      />
    </div>
  );
}
