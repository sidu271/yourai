/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { 
  Folder, 
  Bell, 
  Cpu, 
  Zap, 
  Search, 
  Globe, 
  CheckCircle, 
  Info, 
  Paperclip, 
  Mic, 
  Play, 
  Sparkles, 
  TrendingUp,
  User,
  ArrowRight
} from 'lucide-react';
import { Message, SettingsState } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface ChatViewProps {
  messages: Message[];
  settings: SettingsState;
  onSendMessage: (text: string) => Promise<void>;
  isProcessing: boolean;
}

export default function ChatView({ messages, settings, onSendMessage, isProcessing }: ChatViewProps) {
  const [inputText, setInputText] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isProcessing]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isProcessing) return;
    onSendMessage(inputText);
    setInputText('');
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#131315] text-white">
      {/* Top Header */}
      <header className="h-16 flex justify-between items-center w-full px-10 backdrop-blur-md sticky top-0 z-40 border-b border-white/5 font-display">
        <div className="flex items-center gap-4 flex-wrap select-none">
          <span className="text-on-surface-variant font-medium text-[11px] tracking-wider uppercase opacity-60">
            Current Project:
          </span>
          <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full text-xs text-cyan-400 border border-white/10">
            <Folder className="w-3.5 h-3.5" />
            <span>Q3 Strategic Planning</span>
          </div>

          <span className="hidden sm:inline text-white/10">|</span>

          <span className="text-on-surface-variant font-medium text-[11px] tracking-wider uppercase opacity-60">
            Model:
          </span>
          <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full text-xs text-zinc-300 border border-white/10 hover:border-white/20 transition-all duration-300">
            <Cpu className="w-3.5 h-3.5 text-[#00dbe9]" />
            <span className="font-semibold text-zinc-100">{settings.selectedModel}</span>
            <span 
              id="model-status-indicator"
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                isProcessing 
                  ? 'bg-amber-400 animate-pulse shadow-[0_0_8px_rgba(251,191,36,0.8)]' 
                  : 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]'
              }`}
              title={isProcessing ? 'Model Status: Thinking' : 'Model Status: Ready'}
            ></span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${isProcessing ? 'bg-amber-400 animate-pulse' : 'bg-[#00dbe9]'} glow-cyan`}></span>
            <span className="text-xs font-semibold text-on-surface-variant opacity-80">
              Agent Status: {isProcessing ? 'Processing' : 'Idle'}
            </span>
          </div>

          <div className="flex items-center gap-4 text-on-surface-variant">
            <button className="hover:text-[#00dbe9] cursor-pointer transition-colors" title="Notifications">
              <Bell className="w-5 h-5" />
            </button>
            <button className="hover:text-[#00dbe9] cursor-pointer transition-colors" title="Models Info">
              <Cpu className="w-5 h-5" />
            </button>
            <button className="hover:text-[#00dbe9] cursor-pointer transition-colors" title="Hyperdrive active">
              <Zap className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Conversation Split Area */}
      <div className="flex-1 overflow-hidden flex relative">
        <div className="flex-1 flex flex-col justify-between overflow-y-auto custom-scrollbar pb-32">
          {/* Messages Stage */}
          <section className="px-4 pt-10 pb-12 w-full max-w-[800px] mx-auto space-y-8 font-sans">
            {messages.map((message) => {
              const isUser = message.sender === 'user';
              return (
                <div 
                  key={message.id} 
                  className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                >
                  {/* Sender & Timestamp info */}
                  <div className={`flex items-center gap-2 mb-1.5 font-display text-[11px] uppercase tracking-widest px-4 ${
                    isUser ? 'text-zinc-500' : 'text-[#00dbe9]'
                  }`}>
                    {isUser ? `You • ${message.timestamp}` : `yourAI Agent • ${message.timestamp}`}
                  </div>

                  {/* Bubble content */}
                  <div className={`glass-card px-6 py-4 rounded-[24px] max-w-[90%] border ${
                    isUser 
                      ? 'rounded-tr-none border-[#00dbe9]/10 bg-gradient-to-br from-white/5 to-transparent' 
                      : 'rounded-tl-none border-l-4 border-l-[#00dbe9] bg-[#161618]/60 shadow-lg'
                  }`}>
                    <p className="text-sm text-zinc-100 leading-relaxed whitespace-pre-line">
                      {message.text}
                    </p>

                    {/* Grounding web links */}
                    {message.groundingUrls && message.groundingUrls.length > 0 && (
                      <div className="mt-4 pt-3 border-t border-white/5 font-display">
                        <span className="text-[11px] text-zinc-500 uppercase tracking-wider block mb-2">Sources Found:</span>
                        <div className="flex flex-wrap gap-2">
                          {message.groundingUrls.map((link, idx) => (
                            <a 
                              key={idx}
                              href={link.uri} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-xs text-[#00dbe9] hover:underline flex items-center gap-1.5 bg-white/5 hover:bg-white/10 px-2.5 py-1 rounded-md border border-white/5 transition-colors"
                            >
                              <Globe className="w-3 h-3" />
                              <span className="truncate max-w-[150px]">{link.title}</span>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Agent Thinking Progress Indicator inside bubble */}
                    {message.isThinking && (
                      <div className="mt-4 space-y-4 font-display">
                        <div className="flex items-center gap-4 p-3 bg-white/5 rounded-xl border border-white/5">
                          <div className="relative flex-shrink-0">
                            <div className="w-10 h-10 rounded-full bg-[#00dbe9]/20 flex items-center justify-center">
                              <Search className="w-5 h-5 text-[#00dbe9] animate-pulse-glow" />
                            </div>
                            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#00dbe9] rounded-full shadow-[0_0_8px_rgba(0,219,233,0.8)]"></div>
                          </div>

                          <div className="flex-1">
                            <div className="flex justify-between items-center mb-1 text-xs">
                              <span className="font-semibold text-white">Thinking...</span>
                              <span className="text-zinc-400">Scanning {message.sourcesScanned || 14} sources</span>
                            </div>
                            <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                              <div 
                                className="bg-[#00dbe9] h-full transition-all duration-300"
                                style={{ width: `${message.thinkingProgress || 65}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>

                        {/* Status tag filters */}
                        <div className="grid grid-cols-2 gap-3">
                          <div className="p-2 px-3 rounded-lg border border-white/10 bg-white/5 flex items-center gap-2 text-[12px] text-zinc-400">
                            <CheckCircle className="w-3.5 h-3.5 text-[#00dbe9]" />
                            <span>Verifying compliance data</span>
                          </div>
                          <div className="p-2 px-3 rounded-lg border border-white/10 bg-white/5 flex items-center gap-2 text-[12px] text-zinc-400">
                            <Globe className="w-3.5 h-3.5 text-zinc-500" />
                            <span>Northern Europe Geo-filter</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Simulated instant active bot trigger view when processing backend request */}
            {isProcessing && messages[messages.length - 1]?.sender === 'user' && (
              <div className="flex flex-col items-start animate-pulse">
                <div className="flex items-center gap-2 mb-1.5 font-display text-[11px] uppercase tracking-widest px-4 text-[#00dbe9]">
                  yourAI Agent • Just Now
                </div>
                <div className="glass-card px-6 py-5 rounded-[24px] rounded-tl-none w-full max-w-[90%] border-l-4 border-l-[#00dbe9] bg-[#161618]/60 space-y-4">
                  <div className="h-4 bg-zinc-700 rounded w-1/3 mb-4"></div>
                  <div className="flex items-center gap-4 p-3 bg-white/5 rounded-xl border border-white/5">
                    <Search className="w-5 h-5 text-[#00dbe9] animate-spin" />
                    <div className="flex-1">
                      <div className="h-2 bg-zinc-700 rounded w-1/4 mb-1"></div>
                      <div className="h-1 bg-zinc-800 rounded w-3/4"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </section>
        </div>

        {/* Right Info Widgets Sidebar */}
        <aside className="hidden lg:flex w-72 flex-col gap-4 font-display absolute right-8 top-12 z-30">
          {/* Live Insights */}
          <div className="glass-card p-5 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[11px] font-bold text-[#00dbe9] uppercase tracking-wider">Live Insights</h3>
              <TrendingUp className="w-4 h-4 text-[#00dbe9]" />
            </div>

            <div className="space-y-4">
              <div className="flex flex-col gap-0.5">
                <span className="text-[11px] text-zinc-400">Market Volatility</span>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-extrabold text-white">12.4%</span>
                  <span className="text-[10px] text-red-400 bg-red-400/5 px-1.5 py-0.5 rounded">↓ 2.1%</span>
                </div>
              </div>

              {/* High Tech Trend Chart */}
              <div className="relative w-full h-32 rounded-xl border border-white/10 bg-black/40 overflow-hidden flex flex-col justify-end">
                {/* Hotlinked trend line chart representation */}
                <img 
                  alt="Volatility graph" 
                  className="w-full h-full object-cover opacity-80" 
                  src="https://lh3.googleusercontent.com/aida/AP1WRLt1bzT9bsYmSnLgfom0vtVFyfhpKuwn2a3SoL2d8HK3zX5jTBeI8iz80sWbEm9xULRWNCLcMvwv76kNvYKYHa2iBV6URTfS025bCCoNVZbuVGqSBtVwPu5_yn89F-xppe97jC6r1Zzz1QQ7gwRhC1kArngusMe6NYCiv_zfWCudDLfKbJjj0l32jnFTOMuRKvgEjtNHPRYXC1s-aLMAmK9Li4K5kZIS4ZPIY7VevX1dMthfi-r1z4J4O-8"
                  onError={(e) => {
                    // Failover if image hotlink blocks
                    e.currentTarget.style.display = 'none';
                  }}
                />
                
                {/* Embedded dynamic vector backup lines */}
                <svg className="absolute inset-x-0 bottom-0 w-full h-12 text-[#00dbe9]/30 fill-none" viewBox="0 0 100 20" preserveAspectRatio="none">
                  <path d="M0,10 Q25,3 50,15 T100,5" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </div>

              {/* Analysis Progress */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-[11px] text-zinc-400">
                  <span>Analysis Progress</span>
                  <span className="text-[#00dbe9] font-bold">84%</span>
                </div>
                <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#00dbe9] h-full" style={{ width: '84%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Model Parameters summaries */}
          <div className="glass-card p-5 rounded-2xl">
            <h3 className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-3">Model Parameters</h3>
            <div className="flex flex-wrap gap-2 text-[10px]">
              <span className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-md">Creativity: {settings.parameters.creativity}</span>
              <span className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-md">Top P: {settings.parameters.topP}</span>
              <span className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-md">Seed: {settings.parameters.seed}</span>
            </div>
          </div>
        </aside>
      </div>

      {/* Floating command input footer bar */}
      <div className="absolute bottom-0 left-0 lg:left-[280px] right-0 p-8 flex justify-center pointer-events-none z-40">
        <div className="max-w-[800px] w-full pointer-events-auto">
          <form onSubmit={handleSubmit} className="relative group">
            {/* Glowing cyan border backing on focus */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[#00dbe9]/20 to-purple-500/20 rounded-[32px] blur opacity-25 group-focus-within:opacity-100 transition duration-1000"></div>
            
            <div className="relative flex items-center gap-2 p-2 pl-6 bg-[#1a1a1c]/95 backdrop-blur-2xl border border-white/10 rounded-[32px] shadow-2xl transition-all duration-300 group-focus-within:border-[#00dbe9]/50">
              <button 
                type="button" 
                className="text-zinc-500 hover:text-[#00dbe9] transition-colors cursor-pointer" 
                title="Attach Files"
              >
                <Paperclip className="w-5 h-5" />
              </button>

              <input 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                disabled={isProcessing}
                className="flex-1 bg-transparent border-none outline-none focus:ring-0 text-white placeholder-zinc-500 font-sans text-sm py-3" 
                placeholder="Type a message or command..." 
                type="text"
              />

              <div className="flex items-center gap-1">
                <button 
                  type="button" 
                  className="p-2 text-zinc-500 hover:text-[#00dbe9] hover:bg-zinc-800 rounded-full transition-colors cursor-pointer" 
                  title="Voice Input"
                >
                  <Mic className="w-5 h-5" />
                </button>
                
                <button 
                  type="submit"
                  disabled={isProcessing || !inputText.trim()}
                  className="flex items-center gap-2 px-6 py-3 bg-[#00dbe9] disabled:bg-zinc-700 text-[#002022] font-display font-bold text-xs rounded-[24px] shadow-[0_0_20px_rgba(0,219,233,0.15)] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
                >
                  <span>Run Agent</span>
                  <Play className="w-4 h-4 fill-current text-[#002022]" />
                </button>
              </div>
            </div>
          </form>

          {/* Prompt warning tagline */}
          <div className="mt-4 flex justify-center gap-6 text-[11px] text-zinc-500 font-display">
            <span className="flex items-center gap-1 opacity-70">
              <Info className="w-3.5 h-3.5" />
              AI can make mistakes. Verify important info.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
