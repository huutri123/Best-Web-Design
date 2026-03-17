import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Bot, Send, Sparkles, Loader2, AlertCircle } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

export function AIHint() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', content: string }[]>([
    {
      role: 'ai',
      content: "Hello! I'm your AI algorithm tutor. Enter your problem or question, and I'll provide step-by-step hints to help you solve it yourself instead of giving you the direct code!"
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);
    setError(null);

    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("API Key not found. Please check your configuration.");
      }

      const ai = new GoogleGenAI({ apiKey });
      
      const systemInstruction = `You are an AI programming tutor. The user will ask about how to solve an algorithmic problem.
Your tasks are:
1. NEVER provide the complete solution or direct code.
2. ONLY provide step-by-step hints to help the user think for themselves.
3. Format your response clearly with "Hint 1", "Hint 2", etc.
4. Be concise, brief, and thought-provoking.
5. Use LaTeX (wrapped in $ or $$) for mathematical formulas, e.g., $\\sqrt{n}$ instead of root n.

Example if the user asks "Check prime number":
Hint 1
→ You only need to check up to $\\sqrt{n}$
Hint 2
→ Try dividing from 2 → $\\sqrt{n}$
Hint 3
→ If there is a divisible number, it is not a prime number

Always follow these rules to prevent learners from copying the solution.`;

      // Construct conversation history for context
      const history = messages.filter(m => m.role !== 'ai' || !m.content.includes('Hello!')).map(m => `${m.role === 'user' ? 'User' : 'AI'}: ${m.content}`).join('\n');
      const prompt = `${systemInstruction}\n\nChat History:\n${history}\n\nUser: ${userMessage}\nAI:`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
      });

      if (response.text) {
        setMessages(prev => [...prev, { role: 'ai', content: response.text }]);
      } else {
        throw new Error("No response received from AI.");
      }
    } catch (err: any) {
      console.error("AI Hint Error:", err);
      setError(err.message || "An error occurred while connecting to AI. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto w-full h-full flex flex-col">
      <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6 shrink-0">
        <div className="p-2 md:p-3 bg-neon-purple/20 rounded-xl border border-neon-purple/30">
          <Bot className="text-neon-purple" size={24} />
        </div>
        <div>
          <h2 className="text-lg md:text-3xl font-bold text-white pixel-font tracking-tighter uppercase flex items-center gap-3">
            AI HINT <Sparkles size={20} className="text-neon-yellow" />
          </h2>
          <p className="hidden md:block text-gray-400 font-mono tracking-widest uppercase text-xs mt-2">
            Get step-by-step hints, no copy-pasting code
          </p>
        </div>
      </div>

      <div className="flex-1 bg-gaming-surface border border-gaming-border rounded-xl overflow-hidden flex flex-col shadow-2xl min-h-0 mb-2 md:mb-0">
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 md:space-y-6 custom-scrollbar">
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] rounded-2xl p-4 ${
                  msg.role === 'user' 
                    ? 'bg-neon-purple/20 border border-neon-purple/30 text-white rounded-tr-none' 
                    : 'bg-gaming-bg border border-gaming-border text-gray-300 rounded-tl-none'
                }`}
              >
                {msg.role === 'ai' ? (
                  <div className="markdown-body text-sm">
                    <ReactMarkdown 
                      remarkPlugins={[remarkMath]} 
                      rehypePlugins={[rehypeKatex]}
                    >
                      {msg.content}
                    </ReactMarkdown>
                  </div>
                ) : (
                  <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                )}
              </div>
            </motion.div>
          ))}
          
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="bg-gaming-bg border border-gaming-border rounded-2xl rounded-tl-none p-4 flex items-center gap-3">
                <Loader2 size={18} className="text-neon-purple animate-spin" />
                <span className="text-sm text-gray-400">AI is thinking...</span>
              </div>
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-center"
            >
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 flex items-center gap-2 text-red-400 text-sm">
                <AlertCircle size={16} />
                {error}
              </div>
            </motion.div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-gaming-bg border-t border-gaming-border">
          <form onSubmit={handleSubmit} className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter your problem or question... (Press Enter to send)"
              className="flex-1 bg-gaming-surface border border-gaming-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon-purple/50 transition-colors"
              disabled={isLoading}
            />
          </form>
        </div>
      </div>
    </div>
  );
}
