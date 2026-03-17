import React from 'react';
import { X, Bell, Info, Trophy, MessageSquare, Clock, Trash2 } from 'lucide-react';
import { Notification } from './Notifications';

interface NotificationDetailProps {
  notification: Notification;
  onClose: () => void;
  onDelete: (id: string) => void;
}

export const NotificationDetail: React.FC<NotificationDetailProps> = ({ notification, onClose, onDelete }) => {
  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success': return <Trophy className="text-neon-purple" size={32} />;
      case 'message': return <MessageSquare className="text-neon-blue" size={32} />;
      case 'info': return <Info className="text-gray-400" size={32} />;
      default: return <Bell className="text-neon-purple" size={32} />;
    }
  };

  return (
    <div 
      id="notification-detail-modal"
      className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div 
        className="bg-gaming-surface border border-gaming-border rounded-2xl shadow-2xl glow-box-purple w-full max-w-2xl h-auto max-h-[80vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-gaming-border flex items-center justify-between bg-gaming-bg/50 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gaming-bg rounded-lg border border-gaming-border">
              {getIcon(notification.type)}
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">{notification.title}</h2>
              <div className="flex items-center gap-2 text-gray-500 text-[9px] mt-0.5 font-mono">
                <Clock size={9} />
                <span>{notification.time}</span>
              </div>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-white hover:bg-white/5 rounded-md transition-all"
          >
            <X size={16} />
          </button>
        </div>

        <div className="p-5 md:p-6 overflow-y-auto custom-scrollbar flex-1">
          <div className="prose prose-invert max-w-none">
            <p className="text-[13px] text-gray-300 leading-relaxed">
              {notification.message}
            </p>
          </div>
        </div>

        <div className="p-3 border-t border-gaming-border bg-gaming-bg/30 flex justify-end gap-2 shrink-0">
          <button 
            onClick={() => onDelete(notification.id)}
            className="px-3 py-1.5 bg-gaming-bg border border-neon-red/30 text-neon-red text-[10px] font-bold rounded-md hover:bg-neon-red hover:text-black transition-all flex items-center gap-1.5"
          >
            <Trash2 size={12} />
            DELETE
          </button>
          <button 
            onClick={onClose}
            className="px-5 py-1.5 bg-neon-purple text-black text-[10px] font-bold rounded-md hover:bg-white transition-all glow-box-purple"
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
};
