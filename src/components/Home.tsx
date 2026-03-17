import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MOCK_POSTS, MOCK_LEADERBOARD, MOCK_USER } from '../data';
import { Megaphone, Heart, MessageSquare, Share2, ShieldAlert, Check, CornerDownRight, X, Calendar, Trophy, Users, Clock, ChevronRight, Trash2 } from 'lucide-react';

const ExpandableText = ({ text, limit = 120 }: { text: string, limit?: number }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  if (text.length <= limit) return <p className="text-gray-300 text-sm whitespace-pre-wrap leading-relaxed">{text}</p>;
  
  return (
    <div className="text-gray-300 text-sm whitespace-pre-wrap leading-relaxed">
      <span>
        {isExpanded ? text : `${text.substring(0, limit)}...`}
      </span>
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="ml-1 text-neon-blue hover:text-white transition-colors font-bold text-xs"
      >
        {isExpanded ? 'See less' : 'See more'}
      </button>
    </div>
  );
};

export function Home({ isAuthenticated, onRequireLogin }: { isAuthenticated: boolean, onRequireLogin: () => void }) {
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});
  const [posts, setPosts] = useState(
    MOCK_POSTS.map(post => ({
      ...post,
      isLiked: false,
      isShared: false,
      isCommenting: false,
      newCommentText: '',
      replyingTo: null as { commentId: string, author: string } | null
    }))
  );
  const [commentToDelete, setCommentToDelete] = useState<{postId: string, commentId: string, isReply: boolean, parentCommentId?: string} | null>(null);

  const confirmDeleteComment = () => {
    if (commentToDelete) {
      handleDeleteComment(commentToDelete.postId, commentToDelete.commentId, commentToDelete.isReply, commentToDelete.parentCommentId);
      setCommentToDelete(null);
    }
  };

  const handleLike = (id: string) => {
    if (!isAuthenticated) {
        onRequireLogin();
        return;
    }
    setPosts(currentPosts => 
      currentPosts.map(post => {
        if (post.id === id) {
          return {
            ...post,
            isLiked: !post.isLiked,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1
          };
        }
        return post;
      })
    );
  };

  const handleShare = (id: string) => {
    if (!isAuthenticated) {
        onRequireLogin();
        return;
    }
    setPosts(currentPosts => 
      currentPosts.map(post => {
        if (post.id === id) {
          return { ...post, isShared: true };
        }
        return post;
      })
    );
    
    // Reset share status after 2 seconds
    setTimeout(() => {
      setPosts(currentPosts => 
        currentPosts.map(post => {
          if (post.id === id) {
            return { ...post, isShared: false };
          }
          return post;
        })
      );
    }, 2000);
  };

  const handleComment = (id: string) => {
    if (!isAuthenticated) {
        onRequireLogin();
        return;
    }
    setPosts(currentPosts => 
      currentPosts.map(post => {
        if (post.id === id) {
          return { ...post, isCommenting: !post.isCommenting };
        }
        return post;
      })
    );
  };

  const handleCommentTextChange = (postId: string, text: string) => {
    setPosts(currentPosts => 
      currentPosts.map(post => 
        post.id === postId ? { ...post, newCommentText: text } : post
      )
    );
  };

  const handleSetReply = (postId: string, commentId: string, author: string) => {
    if (!isAuthenticated) {
        onRequireLogin();
        return;
    }
    setPosts(currentPosts => 
      currentPosts.map(post => 
        post.id === postId ? { ...post, replyingTo: { commentId, author } } : post
      )
    );
    
    // Focus the input field for this post
    setTimeout(() => {
      inputRefs.current[postId]?.focus();
    }, 100);
  };

  const handleCancelReply = (postId: string) => {
    setPosts(currentPosts => 
      currentPosts.map(post => 
        post.id === postId ? { ...post, replyingTo: null } : post
      )
    );
  };

  const handleSubmitComment = (postId: string) => {
    if (!isAuthenticated) {
        onRequireLogin();
        return;
    }
    setPosts(currentPosts => 
      currentPosts.map(post => {
        if (post.id === postId && post.newCommentText.trim()) {
          const newComment = {
            id: `new-${Date.now()}`,
            author: "CyberNinja99", // Current user mock
            content: post.newCommentText,
            date: "Just now",
            likes: 0,
            replies: []
          };

          let updatedCommentList = [...(post.commentList || [])];

          if (post.replyingTo) {
            // Add as a reply
            updatedCommentList = updatedCommentList.map(c => {
              if (c.id === post.replyingTo!.commentId) {
                return {
                  ...c,
                  replies: [...(c.replies || []), newComment]
                };
              }
              return c;
            });
          } else {
            // Add as a top-level comment
            updatedCommentList.push(newComment);
          }

          return {
            ...post,
            commentList: updatedCommentList,
            comments: post.comments + 1,
            newCommentText: '',
            replyingTo: null
          };
        }
        return post;
      })
    );
  };

  const handleDeleteComment = (postId: string, commentId: string, isReply: boolean = false, parentCommentId?: string) => {
    if (!isAuthenticated) {
        onRequireLogin();
        return;
    }
    setPosts(currentPosts => 
      currentPosts.map(post => {
        if (post.id !== postId) return post;
        
        let updatedCommentList = post.commentList || [];
        let commentsToRemove = 1;
        
        if (!isReply) {
          const commentToDelete = updatedCommentList.find(c => c.id === commentId);
          if (commentToDelete) {
            commentsToRemove += commentToDelete.replies?.length || 0;
          }
          updatedCommentList = updatedCommentList.filter(c => c.id !== commentId);
        } else if (parentCommentId) {
          updatedCommentList = updatedCommentList.map(c => {
            if (c.id === parentCommentId) {
              return {
                ...c,
                replies: c.replies?.filter(r => r.id !== commentId)
              };
            }
            return c;
          });
        }
        
        return { 
          ...post, 
          commentList: updatedCommentList,
          comments: Math.max(0, post.comments - commentsToRemove)
        };
      })
    );
  };

  const handleLikeComment = (postId: string, commentId: string, isReply: boolean = false, parentCommentId?: string) => {
    if (!isAuthenticated) {
        onRequireLogin();
        return;
    }
    setPosts(currentPosts => 
      currentPosts.map(post => {
        if (post.id !== postId) return post;
        
        const updatedCommentList = post.commentList?.map(comment => {
          if (!isReply && comment.id === commentId) {
            return {
              ...comment,
              isLiked: !comment.isLiked,
              likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1
            };
          }
          
          if (isReply && comment.id === parentCommentId) {
            return {
              ...comment,
              replies: comment.replies?.map(reply => {
                if (reply.id === commentId) {
                  return {
                    ...reply,
                    isLiked: !reply.isLiked,
                    likes: reply.isLiked ? reply.likes - 1 : reply.likes + 1
                  };
                }
                return reply;
              })
            };
          }
          
          return comment;
        });

        return { ...post, commentList: updatedCommentList };
      })
    );
  };

  const upcomingContests = [
    { id: 1, name: "Weekly Algorithm Sprint", time: "Starts in 2h 30m", participants: 1240 },
    { id: 2, name: "Data Structures Duel", time: "Starts tomorrow", participants: 850 },
    { id: 3, name: "Monthly CodeFest", time: "Starts in 3 days", participants: 3200 },
  ];

  const topUsers = MOCK_LEADERBOARD.slice(0, 5);
  const onlineUsers = MOCK_LEADERBOARD.slice(5, 15); // Just picking some users to mock online status

  return (
    <div className="w-full mx-auto pb-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white pixel-font text-xl md:text-3xl mb-2">GUILD NEWS</h1>
          <p className="text-gray-400">Latest announcements and updates from the Admins.</p>
        </div>
        <div className="hidden md:flex p-3 bg-neon-purple/10 border border-neon-purple/30 rounded-xl items-center gap-3">
          <Megaphone className="text-neon-purple" size={24} />
          <span className="text-neon-purple font-bold font-mono">SYSTEM BROADCAST</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Posts */}
        <div className="lg:col-span-2 space-y-6">
          {posts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-gaming-surface border border-gaming-border rounded-2xl overflow-hidden hover:border-gray-600 transition-colors"
            >
              {/* Post Header */}
              <div className="p-5 border-b border-gaming-border bg-gaming-bg/50 flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img 
                      src={`https://api.dicebear.com/7.x/bottts/svg?seed=${post.author}&backgroundColor=18181b`} 
                      alt={post.author} 
                      className="w-12 h-12 rounded-full border-2 border-neon-red p-0.5"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-neon-red rounded-full p-1">
                      <ShieldAlert size={10} className="text-black" />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-white">{post.author}</h3>
                      <span className="text-[10px] px-2 py-0.5 bg-neon-red/20 text-neon-red border border-neon-red/30 rounded uppercase font-bold tracking-wider">
                        {post.authorRole}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 font-mono mt-1">{post.date}</p>
                  </div>
                </div>
              </div>

              {/* Post Content */}
              <div className="p-6">
                <h2 className="text-2xl font-bold text-white mb-4">{post.title}</h2>
                <div className="mb-6">
                  {post.authorRole ? (
                    <ExpandableText text={post.content} />
                  ) : (
                    <div className="text-gray-300 whitespace-pre-wrap leading-relaxed">
                      {post.content}
                    </div>
                  )}
                </div>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {post.tags.map(tag => (
                    <span key={tag} className="text-[10px] px-3 py-1.5 bg-gaming-bg/80 border border-gaming-border rounded-full text-gray-400 font-mono uppercase tracking-wider">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Post Footer */}
              <div className="px-8 py-4 border-t border-gaming-border bg-gaming-bg/30 flex items-center gap-6">
                <motion.button 
                  whileTap={{ scale: 0.85 }}
                  onClick={() => handleLike(post.id)}
                  className={`flex items-center gap-2 transition-colors group ${post.isLiked ? 'text-neon-red' : 'text-gray-400 hover:text-neon-red'}`}
                >
                  <motion.div
                    animate={post.isLiked ? { scale: [1, 1.3, 1] } : {}}
                    transition={{ duration: 0.3 }}
                  >
                    <Heart size={18} className={post.isLiked ? 'fill-neon-red' : ''} />
                  </motion.div>
                  <span className="font-mono text-sm">{post.likes}</span>
                </motion.button>
                
                <motion.button 
                  whileTap={{ scale: 0.85 }}
                  onClick={() => handleComment(post.id)}
                  className={`flex items-center gap-2 transition-colors ${post.isCommenting ? 'text-neon-blue' : 'text-gray-400 hover:text-neon-blue'}`}
                >
                  <MessageSquare size={18} className={post.isCommenting ? 'fill-neon-blue/20' : ''} />
                  <span className="font-mono text-sm">{post.comments}</span>
                </motion.button>
                
                <motion.button 
                  whileTap={{ scale: 0.85 }}
                  onClick={() => handleShare(post.id)}
                  className={`flex items-center gap-2 transition-colors ml-auto ${post.isShared ? 'text-neon-green' : 'text-gray-400 hover:text-white'}`}
                >
                  <AnimatePresence mode="wait">
                    {post.isShared ? (
                      <motion.div
                        key="check"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="flex items-center gap-1"
                      >
                        <Check size={18} />
                        <span className="text-xs font-mono">Copied!</span>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="share"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                      >
                        <Share2 size={18} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>

              {/* Comment Section (Expandable) */}
              <AnimatePresence>
                {post.isCommenting && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden border-t border-gaming-border bg-gaming-surface/50"
                  >
                    {/* Existing Comments */}
                    {post.commentList && post.commentList.length > 0 && (
                      <div className="p-4 space-y-4 border-b border-gaming-border/50 max-h-[400px] overflow-y-auto custom-scrollbar">
                        {post.commentList.map(comment => (
                          <div key={comment.id} className="space-y-3">
                            <div className="flex gap-3">
                              <img 
                                src={`https://api.dicebear.com/7.x/bottts/svg?seed=${comment.author}&backgroundColor=18181b`} 
                                alt={comment.author} 
                                className="w-8 h-8 rounded-full border border-gaming-border"
                              />
                              <div className="flex-1">
                                <div className="bg-gaming-bg border border-gaming-border rounded-xl p-3">
                                  <div className="flex items-center justify-between mb-1">
                                    <span className="font-bold text-white text-sm">{comment.author}</span>
                                    <span className="text-xs text-gray-500 font-mono">{comment.date}</span>
                                  </div>
                                  <ExpandableText text={comment.content} />
                                </div>
                                <div className="flex items-center gap-4 mt-1 ml-2">
                                  <motion.button 
                                    whileTap={{ scale: 0.85 }}
                                    onClick={() => handleLikeComment(post.id, comment.id)}
                                    className={`flex items-center gap-1 text-xs font-bold transition-colors group ${comment.isLiked ? 'text-neon-red' : 'text-gray-500 hover:text-neon-red'}`}
                                  >
                                    <motion.div
                                      animate={comment.isLiked ? { scale: [1, 1.4, 1] } : {}}
                                      transition={{ duration: 0.3 }}
                                    >
                                      <Heart size={12} className={comment.isLiked ? 'fill-neon-red' : ''} />
                                    </motion.div>
                                    <span>{comment.likes > 0 ? comment.likes : 'Like'}</span>
                                  </motion.button>
                                  <button 
                                    onClick={() => handleSetReply(post.id, comment.id, comment.author)}
                                    className="text-xs text-gray-500 hover:text-neon-blue font-bold transition-colors"
                                  >
                                    Reply
                                  </button>
                                  {comment.author === MOCK_USER.username && (
                                    <button 
                                      onClick={() => setCommentToDelete({ postId: post.id, commentId: comment.id, isReply: false })}
                                      className="text-xs text-gray-500 hover:text-neon-red font-bold transition-colors flex items-center gap-1"
                                    >
                                      Delete
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Replies */}
                            {comment.replies && comment.replies.length > 0 && (
                              <div className="ml-11 space-y-3">
                                {comment.replies.map(reply => (
                                  <div key={reply.id} className="flex gap-3">
                                    <CornerDownRight size={16} className="text-gray-600 mt-2" />
                                    <img 
                                      src={`https://api.dicebear.com/7.x/bottts/svg?seed=${reply.author}&backgroundColor=18181b`} 
                                      alt={reply.author} 
                                      className="w-6 h-6 rounded-full border border-gaming-border"
                                    />
                                    <div className="flex-1">
                                      <div className="bg-gaming-bg border border-gaming-border rounded-xl p-2.5">
                                        <div className="flex items-center justify-between mb-1">
                                          <span className="font-bold text-white text-xs">{reply.author}</span>
                                          <span className="text-[10px] text-gray-500 font-mono">{reply.date}</span>
                                        </div>
                                        <ExpandableText text={reply.content} limit={80} />
                                      </div>
                                      <div className="flex items-center gap-4 mt-1 ml-2">
                                        <motion.button 
                                          whileTap={{ scale: 0.85 }}
                                          onClick={() => handleLikeComment(post.id, reply.id, true, comment.id)}
                                          className={`flex items-center gap-1 text-[10px] font-bold transition-colors group ${reply.isLiked ? 'text-neon-red' : 'text-gray-500 hover:text-neon-red'}`}
                                        >
                                          <motion.div
                                            animate={reply.isLiked ? { scale: [1, 1.4, 1] } : {}}
                                            transition={{ duration: 0.3 }}
                                          >
                                            <Heart size={10} className={reply.isLiked ? 'fill-neon-red' : ''} />
                                          </motion.div>
                                          <span>{reply.likes > 0 ? reply.likes : 'Like'}</span>
                                        </motion.button>
                                        {reply.author === MOCK_USER.username && (
                                          <button 
                                            onClick={() => setCommentToDelete({ postId: post.id, commentId: reply.id, isReply: true, parentCommentId: comment.id })}
                                            className="text-[10px] text-gray-500 hover:text-neon-red font-bold transition-colors flex items-center gap-1"
                                          >
                                            Delete
                                          </button>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Comment Input */}
                    <div className="px-5 py-4 flex flex-col gap-3">
                      <AnimatePresence>
                        {post.replyingTo && (
                          <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="flex items-center justify-between bg-neon-blue/10 border border-neon-blue/30 rounded-lg px-3 py-1.5 ml-12"
                          >
                            <span className="text-xs text-neon-blue font-mono">
                              Replying to @{post.replyingTo.author}
                            </span>
                            <button 
                              onClick={() => handleCancelReply(post.id)}
                              className="text-neon-blue hover:text-white transition-colors"
                            >
                              <X size={14} />
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                      
                      <div className="flex items-center gap-3">
                        <img 
                          src="https://api.dicebear.com/7.x/bottts/svg?seed=CyberNinja99&backgroundColor=18181b" 
                          alt="User" 
                          className="w-9 h-9 rounded-full border border-gaming-border shrink-0"
                        />
                        <div className="flex-1 flex gap-2">
                          <input 
                            ref={el => { inputRefs.current[post.id] = el; }}
                            type="text" 
                            value={post.newCommentText}
                            onChange={(e) => handleCommentTextChange(post.id, e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') handleSubmitComment(post.id);
                            }}
                            placeholder={post.replyingTo ? `Reply to ${post.replyingTo.author}...` : "Write a comment..."} 
                            className="flex-1 bg-gaming-bg border border-gaming-border rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-neon-blue transition-colors"
                          />
                          <button 
                            onClick={() => handleSubmitComment(post.id)}
                            disabled={!post.newCommentText.trim()}
                            className="hidden md:block bg-neon-blue/10 text-neon-blue border border-neon-blue/30 px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-neon-blue hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Post
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Right Column: Widgets (Hidden on mobile) */}
        <div className="hidden lg:flex flex-col gap-6">
          {/* Upcoming Contests */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gaming-surface border border-gaming-border rounded-xl p-5"
          >
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2 border-b border-gaming-border pb-2">
              <Calendar size={18} className="text-neon-purple" /> Upcoming Contests
            </h3>
            <div className="space-y-3">
              {upcomingContests.map(contest => (
                <div key={contest.id} className="bg-gaming-bg border border-gaming-border rounded-lg p-3 hover:border-neon-purple/50 transition-colors cursor-pointer group">
                  <h4 className="text-sm font-bold text-white group-hover:text-neon-purple transition-colors">{contest.name}</h4>
                  <div className="flex items-center justify-between mt-2 text-xs font-mono">
                    <span className="text-neon-yellow flex items-center gap-1"><Clock size={12} /> {contest.time}</span>
                    <span className="text-gray-500 flex items-center gap-1"><Users size={12} /> {contest.participants}</span>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-2 text-xs font-bold text-gray-400 hover:text-white bg-gaming-bg border border-gaming-border rounded-lg transition-colors flex items-center justify-center gap-1">
              VIEW ALL CONTESTS <ChevronRight size={14} />
            </button>
          </motion.div>

          {/* Top Users */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gaming-surface border border-gaming-border rounded-xl p-5"
          >
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2 border-b border-gaming-border pb-2">
              <Trophy size={18} className="text-neon-yellow" /> Top Coders
            </h3>
            <div className="space-y-3">
              {topUsers.map((user, index) => (
                <div key={user.username} className="flex items-center justify-between bg-gaming-bg border border-gaming-border rounded-lg p-2 hover:border-neon-yellow/50 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className={`w-6 text-center font-bold font-mono ${index === 0 ? 'text-neon-yellow' : index === 1 ? 'text-gray-300' : index === 2 ? 'text-amber-600' : 'text-gray-500'}`}>
                      #{index + 1}
                    </div>
                    <img 
                      src={`https://api.dicebear.com/7.x/bottts/svg?seed=${user.username}&backgroundColor=18181b`} 
                      alt={user.username} 
                      className="w-8 h-8 rounded-md border border-gaming-border"
                    />
                    <div>
                      <div className="text-sm font-bold text-white">{user.username}</div>
                      <div className="text-[10px] text-gray-500 font-mono">LVL {user.level}</div>
                    </div>
                  </div>
                  <div className="text-xs font-bold text-neon-purple font-mono">
                    {user.rating}
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-2 text-xs font-bold text-gray-400 hover:text-white bg-gaming-bg border border-gaming-border rounded-lg transition-colors flex items-center justify-center gap-1">
              VIEW LEADERBOARD <ChevronRight size={14} />
            </button>
          </motion.div>

          {/* Online Users */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gaming-surface border border-gaming-border rounded-xl p-5"
          >
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2 border-b border-gaming-border pb-2">
              <div className="relative">
                <Users size={18} className="text-neon-green" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-neon-green rounded-full animate-pulse"></div>
              </div>
              Online Now
            </h3>
            <div className="space-y-2">
              {onlineUsers.map((user) => (
                <div key={user.username} className="flex items-center gap-3 bg-gaming-bg border border-gaming-border rounded-lg p-2 hover:border-neon-green/50 transition-colors cursor-pointer">
                  <div className="relative">
                    <img 
                      src={`https://api.dicebear.com/7.x/bottts/svg?seed=${user.username}&backgroundColor=18181b`} 
                      alt={user.username} 
                      className="w-8 h-8 rounded-md border border-gaming-border"
                    />
                    <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-neon-green rounded-full border-2 border-gaming-bg"></div>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-bold text-white">{user.username}</div>
                    <div className="text-[10px] text-gray-500 font-mono">Exploring Data Dungeon</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Bottom Spacer to provide extra scrolling space on mobile */}
      <div className="h-24 md:h-0"></div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {commentToDelete && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-gaming-surface border border-gaming-border rounded-2xl p-6 max-w-sm w-full shadow-2xl"
            >
              <h3 className="text-xl font-bold text-white mb-2">Delete Comment?</h3>
              <p className="text-gray-400 text-sm mb-6">Are you sure you want to delete this comment? This action cannot be undone.</p>
              <div className="flex gap-3">
                <button 
                  onClick={() => setCommentToDelete(null)}
                  className="flex-1 py-2.5 rounded-xl font-bold text-white bg-gaming-bg border border-gaming-border hover:bg-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={confirmDeleteComment}
                  className="flex-1 py-2.5 rounded-xl font-bold text-black bg-neon-red hover:bg-red-500 transition-colors shadow-[0_0_15px_rgba(255,51,102,0.3)]"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
