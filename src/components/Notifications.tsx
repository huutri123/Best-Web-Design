import React, { useState, useRef, useEffect } from 'react';
import { Bell, X, Info, Trophy, MessageSquare, Search, Trash2 } from 'lucide-react';

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'info' | 'success' | 'warning' | 'message';
  read: boolean;
}

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    title: 'New Contest Started',
    message: 'Weekly Algorithm Sprint is now live! Join now to earn XP.Weekly Algorithm Sprint is now live! Join now to earn XP.Weekly Algorithm Sprint is now live! Join now to earn XP.Weekly Algorithm Sprint is now live! Join now to earn XP.Weekly Algorithm Sprint is now live! Join now to earn XP.Weekly Algorithm Sprint is now live! Join now to earn XP.Weekly Algorithm Sprint is now live! Join now to earn XP.Weekly Algorithm Sprint is now live! Join now to earn XP.Weekly Algorithm Sprint is now live! Join now to earn XP.Weekly Algorithm Sprint is now live! Join now to earn XP.Weekly Algorithm Sprint is now live! Join now to earn XP.Weekly Algorithm Sprint is now live! Join now to earn XP.Weekly Algorithm Sprint is now live! Join now to earn XP.Weekly Algorithm Sprint is now live! Join now to earn XP.Weekly Algorithm Sprint is now live! Join now to earn XP.Weekly Algorithm Sprint is now live! Join now to earn XP.Weekly Algorithm Sprint is now live! Join now to earn XP.Weekly Algorithm Sprint is now live! Join now to earn XP.Weekly Algorithm Sprint is now live! Join now to earn XP.Weekly Algorithm Sprint is now live! Join now to earn XP.Weekly Algorithm Sprint is now live! Join now to earn XP.Weekly Algorithm Sprint is now live! Join now to earn XP.Weekly Algorithm Sprint is now live! Join now to earn XP.Weekly Algorithm Sprint is now live! Join now to earn XP.Weekly Algorithm Sprint is now live! Join now to earn XP.Weekly Algorithm Sprint is now live! Join now to earn XP.Weekly Algorithm Sprint is now live! Join now to earn XP.Weekly Algorithm Sprint is now live! Join now to earn XP.Weekly Algorithm Sprint is now live! Join now to earn XP.Weekly Algorithm Sprint is now live! Join now to earn XP.Weekly Algorithm Sprint is now live! Join now to earn XP.Weekly Algorithm Sprint is now live! Join now to earn XP.Weekly Algorithm Sprint is now live! Join now to earn XP.Weekly Algorithm Sprint is now live! Join now to earn XP.Weekly Algorithm Sprint is now live! Join now to earn XP.Weekly Algorithm Sprint is now live! Join now to earn XP.Weekly Algorithm Sprint is now live! Join now to earn XP.Weekly Algorithm Sprint is now live! Join now to earn XP.Weekly Algorithm Sprint is now live! Join now to earn XP.Weekly Algorithm Sprint is now live! Join now to earn XP.Weekly Algorithm Sprint is now live! Join now to earn XP.Weekly Algorithm Sprint is now live! Join now to earn XP.Weekly Algorithm Sprint is now live! Join now to earn XP.Weekly Algorithm Sprint is now live! Join now to earn XP.Weekly Algorithm Sprint is now live! Join now to earn XP.Weekly Algorithm Sprint is now live! Join now to earn XP.Weekly Algorithm Sprint is now live! Join now to earn XP.Weekly Algorithm Sprint is now live! Join now to earn XP.Weekly Algorithm Sprint is now live! Join now to earn XP.Weekly Algorithm Sprint is now live! Join now to earn XP.Weekly Algorithm Sprint is now live! Join now to earn XP.Weekly Algorithm Sprint is now live! Join now to earn XP.Weekly Algorithm Sprint is now live! Join now to earn XP.Weekly Algorithm Sprint is now live! Join now to earn XP.Weekly Algorithm Sprint is now live! Join now to earn XP.Weekly Algorithm Sprint is now live! Join now to earn XP.Weekly Algorithm Sprint is now live! Join now to earn XP.Weekly Algorithm Sprint is now live! Join now to earn XP.Weekly Algorithm Sprint is now live! Join now to earn XP.Weekly Algorithm Sprint is now live! Join now to earn XP.Weekly Algorithm Sprint is now live! Join now to earn XP.Weekly Algorithm Sprint is now live! Join now to earn XP.Weekly Algorithm Sprint is now live! Join now to earn XP.Weekly Algorithm Sprint is now live! Join now to earn XP.Weekly Algorithm Sprint is now live! Join now to earn XP.Weekly Algorithm Sprint is now live! Join now to earn XP.Weekly Algorithm Sprint is now live! Join now to earn XP.Weekly Algorithm Sprint is now live! Join now to earn XP.Weekly Algorithm Sprint is now live! Join now to earn XP.Weekly Algorithm Sprint is now live! Join now to earn XP.Weekly Algorithm Sprint is now live! Join now to earn XP.Weekly Algorithm Sprint is now live! Join now to earn XP.Weekly Algorithm Sprint is now live! Join now to earn XP.Weekly Algorithm Sprint is now live! Join now to earn XP.Weekly Algorithm Sprint is now live! Join now to earn XP.Weekly Algorithm Sprint is now live! Join now to earn XP.Weekly Algorithm Sprint is now live! Join now to earn XP.',
    time: '2 mins ago',
    type: 'success',
    read: false,
  },
  {
    id: '2',
    title: 'New Message',
    message: 'Admin_Zeus mentioned you in a comment on "Patch Notes v2.4".',
    time: '1 hour ago',
    type: 'message',
    read: false,
  },
  {
    id: '3',
    title: 'System Update',
    message: 'Scheduled maintenance will occur tonight at 02:00 UTC.',
    time: '3 hours ago',
    type: 'info',
    read: true,
  },
  {
    id: '4',
    title: 'Achievement Unlocked',
    message: 'You\'ve earned the "Code Ninja" badge for solving 50 problems!',
    time: '1 day ago',
    type: 'success',
    read: true,
  },
  {
    id: '5',
    title: 'New Quest Available',
    message: 'A new legendary quest "The Dragon\'s Lair" has been added to the Data Dungeon.',
    time: '2 days ago',
    type: 'info',
    read: false,
  },
  {
    id: '6',
    title: 'Rating Update',
    message: 'Your rating has increased by 45 points after the last contest!',
    time: '2 days ago',
    type: 'success',
    read: false,
  },
  {
    id: '7',
    title: 'Friend Request',
    message: 'NeoCoder sent you a friend request.',
    time: '3 days ago',
    type: 'message',
    read: false,
  },
  {
    id: '8',
    title: 'Contest Reminder',
    message: 'Don\'t forget! The "Data Structures Duel" starts in 24 hours.',
    time: '3 days ago',
    type: 'warning',
    read: false,
  },
  {
    id: '9',
    title: 'Security Alert',
    message: 'A new login was detected from a new device. If this wasn\'t you, please change your password.',
    time: '4 days ago',
    type: 'warning',
    read: false,
  },
  {
    id: '10',
    title: 'Weekly Report',
    message: 'Your weekly performance report is ready. You solved 15 problems this week!',
    time: '5 days ago',
    type: 'info',
    read: false,
  },
  {
    id: '11',
    title: 'Beta Feature',
    message: 'You\'ve been invited to test our new "Team Battle" mode!',
    time: '1 week ago',
    type: 'info',
    read: false,
  },
  {
    id: '12',
    title: 'TEST',
    message: 'You\'ve been invited to test our new "Team Battle" mode!',
    time: '1 week ago',
    type: 'info',
    read: false,
  }
];

interface NotificationsProps {
  notifications: Notification[];
  onClose: () => void;
  onSelect: (notification: Notification) => void;
  onMarkAllRead: () => void;
  onDeleteAllRead: () => void;
}

export const Notifications: React.FC<NotificationsProps> = ({ 
  notifications, 
  onClose, 
  onSelect, 
  onMarkAllRead, 
  onDeleteAllRead 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        // Check if the click was on the toggle button
        const toggleButton = document.getElementById('notification-toggle');
        if (toggleButton && toggleButton.contains(event.target as Node)) {
          return;
        }
        
        // Check if the click was on the notification detail modal
        const detailModal = document.getElementById('notification-detail-modal');
        if (detailModal && detailModal.contains(event.target as Node)) {
          return;
        }
        
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const filteredNotifications = notifications.filter(n => 
    n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    n.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const hasReadNotifications = notifications.some(n => n.read);
  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success': return <Trophy className="text-neon-purple" size={18} />;
      case 'message': return <MessageSquare className="text-neon-blue" size={18} />;
      case 'info': return <Info className="text-gray-400" size={18} />;
      default: return <Bell className="text-neon-purple" size={18} />;
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      <div className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-[90] animate-in fade-in duration-200" onClick={onClose} />
      
      <div 
        ref={dropdownRef}
        className="fixed md:absolute top-[15%] md:top-full left-1/2 md:left-auto md:right-0 -translate-x-1/2 md:translate-x-0 w-[92%] md:w-96 bg-gaming-surface/98 backdrop-blur-2xl border border-gaming-border rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] glow-box-purple z-[100] overflow-hidden animate-in fade-in zoom-in-95 md:slide-in-from-top-2 duration-300 flex flex-col"
        style={{ maxHeight: 'calc(85vh - 40px)' }}
      >
        <div className="p-4 border-b border-gaming-border flex items-center justify-between bg-gaming-surface/80">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-neon-purple/10 flex items-center justify-center">
            <Bell size={18} className="text-neon-purple" />
          </div>
          <h3 className="font-bold text-sm tracking-widest uppercase text-white">Notifications</h3>
        </div>
        <button 
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"
        >
          <X size={18} />
        </button>
      </div>

      <div className="p-3 bg-gaming-bg/30 border-b border-gaming-border">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={14} />
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search notifications..."
            className="w-full bg-gaming-bg/50 border border-gaming-border rounded-xl pl-9 pr-4 py-2.5 text-sm md:text-xs text-white placeholder:text-gray-600 focus:outline-none focus:border-neon-purple focus:ring-1 focus:ring-neon-purple/30 transition-all"
          />
        </div>
      </div>

      <div className="flex-1 md:max-h-[450px] overflow-y-auto custom-scrollbar">
        {filteredNotifications.length > 0 ? (
          <div className="divide-y divide-gaming-border/50">
            {filteredNotifications.map((notif) => (
              <div 
                key={notif.id} 
                onClick={() => onSelect(notif)}
                className={`p-4 hover:bg-white/[0.03] transition-all cursor-pointer relative group ${!notif.read ? 'bg-neon-purple/[0.03]' : ''}`}
              >
                {!notif.read && (
                  <div className="absolute top-5 right-4 w-2 h-2 bg-neon-purple rounded-full shadow-[0_0_10px_rgba(168,85,247,0.8)] animate-pulse"></div>
                )}
                <div className="flex items-start gap-4">
                  <div className="mt-1 shrink-0 w-9 h-9 flex items-center justify-center bg-gaming-bg rounded-lg border border-gaming-border group-hover:border-neon-purple/30 transition-colors">
                    {getIcon(notif.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-white mb-1 group-hover:text-neon-purple transition-colors">{notif.title}</p>
                    <p className="text-xs text-gray-400 leading-relaxed line-clamp-2 group-hover:text-gray-300 transition-colors">{notif.message}</p>
                    <div className="flex items-center gap-2 mt-3">
                      <div className="w-1 h-1 rounded-full bg-gray-700"></div>
                      <p className="text-[10px] text-gray-500 font-mono uppercase tracking-wider">{notif.time}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-gaming-bg border border-gaming-border flex items-center justify-center mx-auto mb-4 opacity-20">
              <Bell size={32} className="text-gray-500" />
            </div>
            <p className="text-gray-500 font-medium">No new notifications</p>
            <p className="text-gray-600 text-xs mt-1">You're all caught up!</p>
          </div>
        )}
      </div>

      <div className="p-4 bg-gaming-surface/80 border-t border-gaming-border flex items-center justify-between gap-3">
        <button 
          onClick={onMarkAllRead}
          className="flex-1 text-[11px] font-black text-neon-purple hover:text-white transition-all uppercase tracking-[0.2em] py-2 bg-neon-purple/5 hover:bg-neon-purple rounded-lg border border-neon-purple/20 hover:border-neon-purple hover:text-black"
        >
          Mark all as read
        </button>
        <button 
          onClick={onDeleteAllRead}
          disabled={!hasReadNotifications}
          className={`flex items-center justify-center w-10 h-10 transition-all uppercase py-1 border rounded-lg ${
            hasReadNotifications 
              ? 'text-neon-red border-neon-red/20 hover:border-neon-red hover:bg-neon-red/10' 
              : 'text-gray-600 border-gray-800 cursor-not-allowed opacity-50'
          }`}
          title="Delete all read notifications"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
    </>
  );
};
