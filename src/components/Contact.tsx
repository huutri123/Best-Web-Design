import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, MessageSquare, Send, MapPin, Phone, Globe, Github, Twitter, Linkedin } from 'lucide-react';

export function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormState({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-12 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-white pixel-font tracking-widest mb-4 glow-text-purple"
        >
          CONTACT US
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-gray-400 max-w-2xl mx-auto"
        >
          Have a question, feedback, or just want to say hello? Our team of digital warriors is here to help you on your quest.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Info */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-1 space-y-6"
        >
          <div className="bg-gaming-surface border border-white/10 p-6 rounded-2xl glow-box-purple">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <MessageSquare className="text-neon-purple" size={24} />
              Get in Touch
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-neon-purple/10 p-3 rounded-xl text-neon-purple">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Email</p>
                  <p className="text-sm text-gray-400">support@codequest.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-neon-blue/10 p-3 rounded-xl text-neon-blue">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Location</p>
                  <p className="text-sm text-gray-400">Digital Realm, Sector 7G</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-neon-green/10 p-3 rounded-xl text-neon-green">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Phone</p>
                  <p className="text-sm text-gray-400">+1 (555) 123-4567</p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-white/5">
              <p className="text-sm font-bold text-white mb-4">Follow Our Quest</p>
              <div className="flex gap-4">
                <a href="#" className="bg-white/5 p-3 rounded-xl text-gray-400 hover:text-neon-purple hover:bg-neon-purple/10 transition-all">
                  <Github size={20} />
                </a>
                <a href="#" className="bg-white/5 p-3 rounded-xl text-gray-400 hover:text-neon-blue hover:bg-neon-blue/10 transition-all">
                  <Twitter size={20} />
                </a>
                <a href="#" className="bg-white/5 p-3 rounded-xl text-gray-400 hover:text-neon-purple hover:bg-neon-purple/10 transition-all">
                  <Linkedin size={20} />
                </a>
                <a href="#" className="bg-white/5 p-3 rounded-xl text-gray-400 hover:text-neon-green hover:bg-neon-green/10 transition-all">
                  <Globe size={20} />
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2"
        >
          <div className="bg-gaming-surface border border-white/10 p-8 rounded-2xl">
            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 bg-neon-green/20 text-neon-green rounded-full flex items-center justify-center mx-auto mb-6">
                  <Send size={40} />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Message Sent!</h2>
                <p className="text-gray-400 mb-8">Thank you for reaching out. Our team will get back to you shortly.</p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="px-8 py-3 bg-neon-purple text-white font-bold rounded-xl hover:bg-neon-purple/90 transition-all shadow-[0_0_15px_rgba(168,85,247,0.3)]"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-400 ml-1">Your Name</label>
                    <input 
                      required
                      type="text" 
                      placeholder="John Doe"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full bg-gaming-bg border border-white/5 rounded-xl py-3 px-4 text-white focus:border-neon-purple outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-400 ml-1">Email Address</label>
                    <input 
                      required
                      type="email" 
                      placeholder="john@example.com"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full bg-gaming-bg border border-white/5 rounded-xl py-3 px-4 text-white focus:border-neon-purple outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-400 ml-1">Subject</label>
                  <input 
                    required
                    type="text" 
                    placeholder="How can we help?"
                    value={formState.subject}
                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                    className="w-full bg-gaming-bg border border-white/5 rounded-xl py-3 px-4 text-white focus:border-neon-purple outline-none transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-400 ml-1">Message</label>
                  <textarea 
                    required
                    rows={6}
                    placeholder="Tell us more about your inquiry..."
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full bg-gaming-bg border border-white/5 rounded-xl py-3 px-4 text-white focus:border-neon-purple outline-none transition-all resize-none"
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-neon-purple text-white font-bold rounded-xl hover:bg-neon-purple/90 transition-all shadow-[0_0_15px_rgba(168,85,247,0.3)] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send size={18} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
