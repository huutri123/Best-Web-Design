import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Quest, Language } from '../types';
import { CODE_TEMPLATES } from '../data';
import { ArrowLeft, Play, Terminal, Clock, Database, CheckCircle2, XCircle, Code, Flag } from 'lucide-react';

interface QuestDetailProps {
  quest: Quest;
  onBack: () => void;
}

export function QuestDetail({ quest, onBack }: QuestDetailProps) {
  const [language, setLanguage] = useState<Language>('javascript');
  const [code, setCode] = useState(CODE_TEMPLATES['javascript']);
  const [output, setOutput] = useState('');
  const [status, setStatus] = useState<'idle' | 'running' | 'success' | 'error'>('idle');
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportContent, setReportContent] = useState('');

  const handleReportSubmit = () => {
    if (!reportContent.trim()) return;
    alert('Report submitted successfully!');
    setShowReportModal(false);
    setReportContent('');
  };

  // Update code template when language changes
  useEffect(() => {
    setCode(CODE_TEMPLATES[language]);
    setStatus('idle');
    setOutput('');
  }, [language]);

  const handleRun = () => {
    setStatus('running');
    setOutput(`Compiling ${language}...\nRunning tests...`);
    
    setTimeout(() => {
      // Mock execution for the 1+1 quest or general
      const isCorrect = code.includes('1 + 1') || code.includes('2') || code.includes('return');
      
      if (isCorrect) {
        setStatus('success');
        setOutput('Test Case 1: Passed (0.012s)\nTest Case 2: Passed (0.015s)\n\nAll tests passed! +XP earned.');
      } else {
        setStatus('error');
        setOutput('Test Case 1: Failed\nExpected: "2"\nGot: undefined\n\nCompilation finished with exit code 1.');
      }
    }, 1500);
  };

  const languageExtensions: Record<Language, string> = {
    javascript: 'js',
    python: 'py',
    cpp: 'cpp',
    java: 'java'
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] lg:h-[calc(100vh-8rem)] flex flex-col pb-24 lg:pb-0">
      <div className="flex items-center justify-between mb-4">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} /> <span className="hidden sm:inline">Back to Problems</span><span className="sm:hidden">Back</span>
        </button>
        <div className="flex items-center gap-3 sm:gap-4">
          <span className="text-neon-purple font-mono text-xs sm:text-sm">+{quest.xpReward} XP</span>
          <div className="flex items-center gap-2">
            <span className="px-2 sm:px-3 py-1 bg-gaming-surface border border-gaming-border rounded text-xs sm:text-sm font-mono text-gray-200">
              {quest.difficulty}
            </span>
            <button 
              onClick={() => setShowReportModal(true)}
              className="px-2 py-1 bg-gaming-surface border border-gaming-border rounded text-gray-400 hover:text-neon-red hover:border-neon-red/50 transition-colors"
              title="Report issue"
            >
              <Flag size={14} className="sm:w-4 sm:h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-0">
        {/* Left Panel: Description */}
        <div className="bg-gaming-surface border border-gaming-border rounded-xl flex flex-col lg:overflow-hidden min-h-0">
          <div className="p-4 border-b border-gaming-border bg-gaming-bg/50 flex justify-between items-center">
            <h2 className="text-xl font-bold text-white">{quest.title}</h2>
            <div className="flex gap-3 text-xs text-gray-500 font-mono">
              <span className="flex items-center gap-1"><Clock size={14}/> {quest.timeLimit || '1.0s'}</span>
              <span className="flex items-center gap-1"><Database size={14}/> {quest.memoryLimit || '256MB'}</span>
            </div>
          </div>
          
          <div className="p-6 lg:overflow-y-auto lg:flex-1 prose prose-invert max-w-none">
            <div className="text-gray-100 whitespace-pre-wrap mb-8">
              {quest.description}
            </div>
            
            {quest.examples && quest.examples.map((ex, i) => (
              <div key={i} className="mb-6">
                <h3 className="text-sm font-bold text-white mb-2 uppercase tracking-wider">Example {i + 1}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-gray-500 mb-1 font-mono">Input</div>
                    <pre className="bg-gaming-bg border border-gaming-border p-3 rounded-lg text-neon-green font-mono text-sm overflow-x-auto">
                      {ex.input}
                    </pre>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1 font-mono">Output</div>
                    <pre className="bg-gaming-bg border border-gaming-border p-3 rounded-lg text-white font-mono text-sm overflow-x-auto">
                      {ex.output}
                    </pre>
                  </div>
                </div>
                {ex.explanation && (
                  <div className="mt-2 text-sm text-gray-200 italic">
                    <span className="text-gray-500 font-bold not-italic">Explanation:</span> {ex.explanation}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel: Editor & Output */}
          <div className="flex flex-col gap-4 min-h-[600px] lg:min-h-0 lg:flex-1">
          {/* Editor */}
          <div className="flex-1 bg-gaming-surface border border-gaming-border rounded-xl flex flex-col overflow-hidden">
            <div className="p-3 border-b border-gaming-border bg-gaming-bg/50 flex justify-between items-center flex-wrap gap-2">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-400 font-mono">
                  <Terminal size={16} /> solution.{languageExtensions[language]}
                </div>
                
                {/* Language Selector */}
                <div className="relative flex items-center">
                  <Code size={14} className="absolute left-2 text-gray-500" />
                  <select 
                    value={language}
                    onChange={(e) => setLanguage(e.target.value as Language)}
                    className="bg-gaming-bg border border-gaming-border text-white text-sm rounded pl-7 pr-2 py-1 appearance-none focus:outline-none focus:border-neon-blue cursor-pointer font-mono"
                  >
                    <option value="javascript">JavaScript</option>
                    <option value="python">Python</option>
                    <option value="cpp">C++</option>
                    <option value="java">Java</option>
                  </select>
                </div>
              </div>

              <button 
                onClick={handleRun}
                disabled={status === 'running'}
                className="flex items-center gap-2 bg-neon-green/10 text-neon-green border border-neon-green/50 hover:bg-neon-green hover:text-black px-4 py-1.5 rounded font-bold text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'running' ? (
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                    <Clock size={16} />
                  </motion.div>
                ) : (
                  <Play size={16} />
                )}
                {status === 'running' ? 'EXECUTING...' : 'SUBMIT CODE'}
              </button>
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="flex-1 w-full bg-gaming-bg text-gray-100 font-mono p-4 focus:outline-none resize-none"
              spellCheck="false"
            />
          </div>

          {/* Console Output */}
          <div className="h-48 bg-gaming-surface border border-gaming-border rounded-xl flex flex-col overflow-hidden shrink-0">
            <div className="p-2 border-b border-gaming-border bg-gaming-bg/50 flex items-center gap-2 text-xs text-gray-400 font-mono uppercase tracking-wider">
              Console Output
              {status === 'success' && <CheckCircle2 size={14} className="text-neon-green ml-auto" />}
              {status === 'error' && <XCircle size={14} className="text-neon-red ml-auto" />}
            </div>
            <div className="flex-1 p-4 overflow-y-auto bg-black/50 font-mono text-sm">
              {status === 'idle' ? (
                <span className="text-gray-600">Awaiting execution...</span>
              ) : (
                <pre className={`whitespace-pre-wrap ${status === 'error' ? 'text-neon-red' : status === 'success' ? 'text-neon-green' : 'text-gray-200'}`}>
                  {output}
                </pre>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gaming-surface border border-gaming-border rounded-xl p-6 w-full max-w-md shadow-2xl"
          >
            <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
              <Flag className="text-neon-red" size={20} />
              Report Issue
            </h3>
            <p className="text-gray-200 text-sm mb-4">
              Found a mistake in this quest? Let us know and we'll fix it!
            </p>
            <textarea
              value={reportContent}
              onChange={(e) => setReportContent(e.target.value)}
              placeholder="Describe the issue (e.g., typo, wrong test case, unclear description)..."
              className="w-full h-32 bg-gaming-bg border border-gaming-border rounded-lg p-3 text-gray-100 focus:outline-none focus:border-neon-red resize-none mb-4 font-mono text-sm"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowReportModal(false);
                  setReportContent('');
                }}
                className="px-4 py-2 rounded-lg text-gray-400 hover:text-white transition-colors font-bold text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleReportSubmit}
                disabled={!reportContent.trim()}
                className="px-4 py-2 bg-neon-red/10 text-neon-red border border-neon-red/50 rounded-lg hover:bg-neon-red hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-bold text-sm"
              >
                Submit Report
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
