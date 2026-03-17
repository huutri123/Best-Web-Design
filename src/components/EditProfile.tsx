import React from 'react';
import { motion } from 'motion/react';
import { User } from '../types';
import { Camera, Save, Github, Twitter, MapPin, User as UserIcon, Info, Facebook, Linkedin, Globe, Phone, Link as LinkIcon, Pencil } from 'lucide-react';

interface EditProfileProps {
  user: User;
  onBack: () => void;
  onSave: (updatedUser: Partial<User>) => void;
}

const LOCATIONS = [
  "Cyber City",
  "Neo Tokyo",
  "Silicon Valley",
  "London",
  "Berlin",
  "Singapore",
  "Vietnam",
  "Unknown Sector"
];

export function EditProfile({ user, onBack, onSave }: EditProfileProps) {
  const [formData, setFormData] = React.useState({
    username: user.username,
    title: user.title,
    about: user.about,
    location: user.location || 'Cyber City',
    phone: user.phone || '',
    socials: {
      github: user.socials?.github || '',
      twitter: user.socials?.twitter || '',
      facebook: user.socials?.facebook || '',
      linkedin: user.socials?.linkedin || '',
      website: user.socials?.website || '',
    }
  });

  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const validateSocialLink = (key: string, url: string) => {
    if (!url) return true;
    
    const patterns: Record<string, RegExp> = {
      github: /^https?:\/\/(www\.)?github\.com\/[a-zA-Z0-9_-]+(\/.*)?$/,
      twitter: /^https?:\/\/(www\.)?(twitter|x)\.com\/[a-zA-Z0-9_]+(\/.*)?$/,
      facebook: /^https?:\/\/(www\.)?facebook\.com\/[a-zA-Z0-9._%+-]+(\/.*)?$/,
      linkedin: /^https?:\/\/(www\.)?linkedin\.com\/(in|company)\/[a-zA-Z0-9_-]+(\/.*)?$/,
      website: /^https?:\/\/.+\..+$/,
    };

    const pattern = patterns[key];
    return pattern ? pattern.test(url) : true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};
    Object.entries(formData.socials).forEach(([key, value]) => {
      if (!validateSocialLink(key, value)) {
        newErrors[key] = `Invalid ${key.charAt(0).toUpperCase() + key.slice(1)} URL`;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave({
      username: formData.username,
      title: formData.title,
      about: formData.about,
      location: formData.location,
      phone: formData.phone,
      socials: formData.socials
    });
  };

  const handleSocialChange = (key: keyof typeof formData.socials, value: string) => {
    setFormData(prev => ({
      ...prev,
      socials: {
        ...prev.socials,
        [key]: value
      }
    }));
    if (errors[key]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-5xl mx-auto pb-12"
    >
      <div className="bg-gaming-surface/80 backdrop-blur-xl border border-gaming-border rounded-3xl overflow-hidden shadow-2xl">
        {/* Banner Section */}
        <div className="h-48 bg-gradient-to-r from-neon-purple/30 via-blue-500/20 to-neon-purple/30 relative">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
          <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-gaming-surface/90 to-transparent"></div>
        </div>

        <form onSubmit={handleSubmit} className="px-6 sm:px-10 pb-10">
          {/* Avatar Section - Overlapping banner */}
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 -mt-20 mb-12 relative z-10">
            <div className="relative group">
              <div className="w-36 h-36 sm:w-40 sm:h-40 rounded-3xl border-4 border-gaming-surface bg-gaming-bg p-2 shadow-[0_0_30px_rgba(168,85,247,0.3)] overflow-hidden transition-transform duration-300 group-hover:scale-105">
                <img src={user.avatar} alt="Avatar" className="w-full h-full rounded-2xl bg-gaming-surface object-cover" />
              </div>
              <div className="absolute bottom-2 right-2 bg-neon-purple p-2 rounded-full border-4 border-gaming-surface shadow-lg">
                <Pencil size={18} className="text-black" />
              </div>
              <button type="button" className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl backdrop-blur-sm m-2">
                <div className="flex flex-col items-center gap-2">
                  <Camera className="text-white" size={28} />
                  <span className="text-xs font-bold text-white tracking-wider">CHANGE</span>
                </div>
              </button>
            </div>
            <div className="flex-1 pb-2 text-center sm:text-left">
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">{formData.username || 'Anonymous'}</h2>
              <p className="text-neon-purple font-medium mt-1 text-lg">{formData.title || 'Novice Coder'}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Column - Basic Info */}
            <div className="lg:col-span-7 space-y-8">
              <div>
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3 border-b border-gaming-border pb-4">
                  <UserIcon className="text-neon-purple" size={24} /> Personal Information
                </h3>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Username</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-neon-purple transition-colors">
                        <UserIcon size={18} />
                      </div>
                      <input 
                        type="text" 
                        value={formData.username}
                        onChange={e => setFormData({...formData, username: e.target.value})}
                        className="w-full bg-gaming-bg/50 border border-gaming-border rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-neon-purple focus:bg-gaming-bg transition-all shadow-inner"
                        placeholder="Enter your username"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Cyber Title</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-neon-purple transition-colors">
                        <Info size={18} />
                      </div>
                      <input 
                        type="text" 
                        value={formData.title}
                        onChange={e => setFormData({...formData, title: e.target.value})}
                        className="w-full bg-gaming-bg/50 border border-gaming-border rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-neon-purple focus:bg-gaming-bg transition-all shadow-inner"
                        placeholder="e.g. Master Hacker"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Bio / About</label>
                    <textarea 
                      rows={5}
                      value={formData.about}
                      onChange={e => setFormData({...formData, about: e.target.value})}
                      className="w-full bg-gaming-bg/50 border border-gaming-border rounded-xl p-4 text-white placeholder-gray-600 focus:outline-none focus:border-neon-purple focus:bg-gaming-bg transition-all resize-none shadow-inner"
                      placeholder="Tell the world about yourself..."
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Location</label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-neon-purple transition-colors">
                          <MapPin size={18} />
                        </div>
                        <select 
                          value={formData.location}
                          onChange={e => setFormData({...formData, location: e.target.value})}
                          className="w-full bg-gaming-bg/50 border border-gaming-border rounded-xl py-3.5 pl-12 pr-4 text-white focus:outline-none focus:border-neon-purple focus:bg-gaming-bg transition-all appearance-none shadow-inner"
                        >
                          {LOCATIONS.map(loc => (
                            <option key={loc} value={loc} className="bg-gaming-bg">{loc}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Phone Number</label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-neon-purple transition-colors">
                          <Phone size={18} />
                        </div>
                        <input 
                          type="tel" 
                          value={formData.phone}
                          onChange={e => setFormData({...formData, phone: e.target.value})}
                          className="w-full bg-gaming-bg/50 border border-gaming-border rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-neon-purple focus:bg-gaming-bg transition-all shadow-inner"
                          placeholder="+1 234 567 8900"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Socials */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3 border-b border-gaming-border pb-4">
                  <LinkIcon className="text-neon-purple" size={24} /> Social Links
                </h3>
                <div className="space-y-5 bg-gaming-bg/30 p-6 rounded-2xl border border-gaming-border/50">
                  
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">GitHub</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-white transition-colors">
                        <Github size={18} />
                      </div>
                      <input 
                        type="url" 
                        value={formData.socials.github}
                        onChange={e => handleSocialChange('github', e.target.value)}
                        className={`w-full bg-gaming-bg border ${errors.github ? 'border-neon-red' : 'border-gaming-border'} rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none ${errors.github ? 'focus:border-neon-red' : 'focus:border-white'} transition-all`}
                        placeholder="https://github.com/..."
                      />
                    </div>
                    {errors.github && <p className="text-xs text-neon-red mt-1">{errors.github}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Twitter</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-blue-400 transition-colors">
                        <Twitter size={18} />
                      </div>
                      <input 
                        type="url" 
                        value={formData.socials.twitter}
                        onChange={e => handleSocialChange('twitter', e.target.value)}
                        className={`w-full bg-gaming-bg border ${errors.twitter ? 'border-neon-red' : 'border-gaming-border'} rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none ${errors.twitter ? 'focus:border-neon-red' : 'focus:border-blue-400'} transition-all`}
                        placeholder="https://twitter.com/..."
                      />
                    </div>
                    {errors.twitter && <p className="text-xs text-neon-red mt-1">{errors.twitter}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">LinkedIn</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-blue-500 transition-colors">
                        <Linkedin size={18} />
                      </div>
                      <input 
                        type="url" 
                        value={formData.socials.linkedin}
                        onChange={e => handleSocialChange('linkedin', e.target.value)}
                        className={`w-full bg-gaming-bg border ${errors.linkedin ? 'border-neon-red' : 'border-gaming-border'} rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none ${errors.linkedin ? 'focus:border-neon-red' : 'focus:border-blue-500'} transition-all`}
                        placeholder="https://linkedin.com/in/..."
                      />
                    </div>
                    {errors.linkedin && <p className="text-xs text-neon-red mt-1">{errors.linkedin}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Facebook</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-blue-600 transition-colors">
                        <Facebook size={18} />
                      </div>
                      <input 
                        type="url" 
                        value={formData.socials.facebook}
                        onChange={e => handleSocialChange('facebook', e.target.value)}
                        className={`w-full bg-gaming-bg border ${errors.facebook ? 'border-neon-red' : 'border-gaming-border'} rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none ${errors.facebook ? 'focus:border-neon-red' : 'focus:border-blue-600'} transition-all`}
                        placeholder="https://facebook.com/..."
                      />
                    </div>
                    {errors.facebook && <p className="text-xs text-neon-red mt-1">{errors.facebook}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Website</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-neon-purple transition-colors">
                        <Globe size={18} />
                      </div>
                      <input 
                        type="url" 
                        value={formData.socials.website}
                        onChange={e => handleSocialChange('website', e.target.value)}
                        className={`w-full bg-gaming-bg border ${errors.website ? 'border-neon-red' : 'border-gaming-border'} rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none ${errors.website ? 'focus:border-neon-red' : 'focus:border-neon-purple'} transition-all`}
                        placeholder="https://yourwebsite.com"
                      />
                    </div>
                    {errors.website && <p className="text-xs text-neon-red mt-1">{errors.website}</p>}
                  </div>

                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-12 pt-8 border-t border-gaming-border">
            <button 
              type="submit"
              className="flex-1 flex items-center justify-center gap-2 py-4 bg-neon-purple text-black font-black text-lg rounded-xl hover:bg-neon-purple/90 transition-all shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] hover:-translate-y-1"
            >
              <Save size={22} /> SAVE CHANGES
            </button>
            <button 
              type="button"
              onClick={onBack}
              className="flex-1 py-4 bg-gaming-bg border-2 border-gaming-border text-gray-300 font-bold text-lg rounded-xl hover:text-white hover:border-gray-500 transition-all hover:-translate-y-1"
            >
              CANCEL
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}

