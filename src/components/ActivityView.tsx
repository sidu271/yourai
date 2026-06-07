/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  GitBranch, 
  Power, 
  Search, 
  FileText, 
  Workflow, 
  Cpu, 
  Globe, 
  Terminal, 
  Calculator, 
  Info, 
  Check, 
  RefreshCw,
  Bell,
  Download
} from 'lucide-react';
import { WorkflowStep, Message } from '../types';

interface ActivityViewProps {
  messages?: Message[];
}

export default function ActivityView({ messages = [] }: ActivityViewProps) {
  const [progress, setProgress] = useState(68);
  const [isToastVisible, setIsToastVisible] = useState(false);

  // Trigger downloading CSV of interaction logs
  const handleDownloadLogs = () => {
    // Elegant fallback to localStorage cache if prop is empty
    let chatHistory = messages;
    if (!chatHistory || chatHistory.length === 0) {
      try {
        const cached = localStorage.getItem('obsidian_chat');
        if (cached) {
          chatHistory = JSON.parse(cached);
        }
      } catch (err) {
        console.error('Failed to load chat cache', err);
      }
    }

    if (!chatHistory || chatHistory.length === 0) {
      // Inject fallback mock item if no session history exists
      chatHistory = [
        {
          id: 'fallback-usr',
          sender: 'user',
          text: 'Analyze the quarterly market trends and draft a report. Focus on the shift towards sustainable tech in Northern Europe.',
          timestamp: '2:14 PM'
        },
        {
          id: 'fallback-agent',
          sender: 'agent',
          text: "I've compiled the initial market insights. Swedish and Danish cleantech startups growing by 28% year-on-year.",
          timestamp: 'Just Now'
        }
      ];
    }

    const headers = [
      'Message ID',
      'Sender',
      'Timestamp',
      'Content Text',
      'Sources Scanned',
      'Cognitive Status'
    ];

    const escapeCSV = (val: string) => {
      if (val === null || val === undefined) return '';
      const stringified = String(val);
      // Double the inner double-quotes to escape them in CSV standard
      const escaped = stringified.replace(/"/g, '""');
      // If there are comma, newline, carriage return, or double quote, wrap in quotes
      if (escaped.includes(',') || escaped.includes('\n') || escaped.includes('\r') || escaped.includes('"')) {
        return `"${escaped}"`;
      }
      return escaped;
    };

    const rows = chatHistory.map(m => [
      m.id,
      m.sender === 'user' ? 'User' : 'yourAI Agent',
      m.timestamp,
      m.text,
      m.sourcesScanned || 0,
      m.isThinking ? 'Thinking' : 'Ready'
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => escapeCSV(String(cell))).join(','))
    ].join('\n');

    // Output UTF-8 with Byte Order Mark BOM prefix to preserve unicode / special character readability in Excel/Numbers
    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `yourai_session_logs_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Simulated live progressive updates to progress
  useEffect(() => {
    const tInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 98) {
          setIsToastVisible(true);
          return 44; // roll over loop for premium demo
        }
        return prev + 1;
      });
    }, 1500);

    return () => clearInterval(tInterval);
  }, []);

  // Quick helper reset for Toast notification
  useEffect(() => {
    if (isToastVisible) {
      const dismissTimer = setTimeout(() => {
        setIsToastVisible(false);
      }, 5000);
      return () => clearTimeout(dismissTimer);
    }
  }, [isToastVisible]);

  return (
    <div className="flex-1 min-h-screen bg-[#050505] text-white overflow-y-auto custom-scrollbar">
      {/* Top Header */}
      <header className="h-16 flex items-center justify-between px-10 backdrop-blur-md sticky top-0 z-40 border-b border-white/5 font-display">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-bold text-white tracking-tight">Active Workflow</h2>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#00dbe9]/10 border border-[#00dbe9]/20">
            <span className="w-2 h-2 rounded-full bg-[#00dbe9] animate-pulse"></span>
            <span className="text-[12px] font-semibold text-[#00dbe9]">Running</span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-zinc-400">
            <Workflow className="w-[18px] h-[18px] text-cyan-400" />
            <span className="text-xs font-semibold">Agent Status: Processing</span>
          </div>

          <button 
            id="download-logs-button"
            onClick={handleDownloadLogs}
            className="px-5 py-2 rounded-lg bg-cyan-950/40 text-[#00dbe9] hover:bg-[#00dbe9] hover:text-zinc-950 hover:font-bold transition-all duration-300 text-xs font-semibold flex items-center gap-2 border border-cyan-500/15 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Download Logs</span>
          </button>

          <button className="px-5 py-2 rounded-lg bg-red-950/40 text-red-400 hover:bg-red-500 hover:text-black hover:font-bold transition-all duration-300 text-xs font-semibold flex items-center gap-2 border border-red-500/10 cursor-pointer">
            <Power className="w-4 h-4" />
            <span>Override Task</span>
          </button>
        </div>
      </header>

      {/* Main Grid Content Split Section */}
      <div className="max-w-[1400px] mx-auto px-10 py-8 flex flex-col lg:flex-row gap-8 font-sans">
        
        {/* Left column: Comprehensive timeline sequence tracking */}
        <section className="flex-1 max-w-[800px]">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-white mb-2 font-display">Market Analysis: Competitor Pricing</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Task initiated 4 minutes ago. Analyzing three distinct data sources for PDF extraction.
            </p>
          </div>

          {/* Stepper Vertical Container */}
          <div className="relative pl-8 ml-4 border-l border-white/10 space-y-12 pb-12">
            
            {/* Step 1: Completed Web Search Step */}
            <div className="relative">
              {/* Vertical timeline bubble dot */}
              <div className="absolute -left-[41px] top-1.5 w-4 h-4 rounded-full bg-[#00dbe9] border-4 border-[#050505] flex items-center justify-center"></div>
              
              <div className="glass-card p-6 rounded-2xl border-white/5 hover:border-[#00dbe9]/30 transition-all duration-300">
                <div className="flex justify-between items-start mb-3 font-display">
                  <div className="flex items-center gap-3">
                    <Search className="w-5 h-5 text-[#00dbe9]" />
                    <h4 className="text-sm font-bold text-white">Market Search</h4>
                  </div>
                  <span className="text-[11px] font-bold text-[#00dbe9] bg-[#00dbe9]/10 px-2.5 py-0.5 rounded font-mono uppercase">
                    Success (12s)
                  </span>
                </div>
                
                <p className="text-zinc-400 text-xs leading-relaxed mb-4">
                  Scanned Top 10 industry reports from 2024. Identified primary competitors: AeroTech, DeepLogic, and ZenSystems.
                </p>

                {/* Simulated database/logs code snippet console element */}
                <div className="bg-[#1b1b1d]/80 p-3 rounded-lg border border-white/5 font-mono text-xs text-zinc-400">
                  <span className="text-cyan-400 font-bold">Found:</span> 12 documents, 4.2MB total data retrieved.
                </div>
              </div>
            </div>

            {/* Step 2: Dynamic Running Active Extractor Action */}
            <div className="relative">
              {/* Highlight active pulse timeline connector node bubble */}
              <div className="absolute -left-[41px] top-1.5 w-4 h-4 rounded-full bg-[#00dbe9] border-4 border-[#050505] flex items-center justify-center glow-cyan z-10"></div>
              
              <div className="glass-card p-6 rounded-2xl border-[#00dbe9]/30 shadow-2xl relative overflow-hidden bg-[#161618]/20">
                <div className="flex justify-between items-start mb-3 font-display">
                  <div className="flex items-center gap-3">
                    <RefreshCw className="w-5 h-5 text-[#00dbe9] animate-spin" />
                    <h4 className="text-sm font-bold text-white">Extracting competitor pricing from PDF</h4>
                  </div>
                  <span className="text-[12px] font-semibold text-cyan-400 animate-pulse uppercase tracking-wider">
                    Running...
                  </span>
                </div>

                <p className="text-zinc-400 text-xs leading-relaxed mb-4">
                  Parsing <span className="text-[#00dbe9] font-semibold">ZenSystems_Q3_Pricing.pdf</span> using optical character recognition and table structural analysis.
                </p>

                {/* Live synchronized bar status loading meters */}
                <div className="flex items-center gap-4 mt-4 font-mono">
                  <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#00dbe9] shadow-[0_0_12px_#00dbe9] transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <span className="text-xs font-semibold text-zinc-400 w-8 text-right">{progress}%</span>
                </div>
              </div>
            </div>

            {/* Step 3: Pending step segment, stylized opaque */}
            <div className="relative opacity-40">
              <div className="absolute -left-[41px] top-1.5 w-4 h-4 rounded-full bg-white/20 border-4 border-[#050505] flex items-center justify-center"></div>
              <div className="glass-card p-6 rounded-2xl border-white/5">
                <div className="flex items-center gap-3 mb-3 font-display">
                  <Calculator className="w-5 h-5 text-zinc-500" />
                  <h4 className="text-sm font-bold text-zinc-400">Comparative Synthesis</h4>
                </div>
                <p className="text-zinc-500 text-xs leading-relaxed italic">
                  Awaiting extraction results to generate pricing delta analysis...
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* Right column: Tools metrics logs context panels */}
        <aside className="w-full lg:w-80 flex flex-col gap-6 font-display">
          
          {/* Active Tools panel */}
          <div className="glass-card p-6 rounded-3xl">
            <h5 className="text-[10px] font-bold mb-5 text-zinc-400 uppercase tracking-widest font-display">Tools Used</h5>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center justify-center p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-cyan-500/20 transition-all cursor-help">
                <Globe className="w-8 h-8 text-[#00dbe9] mb-2" />
                <span className="text-[11px] font-semibold text-zinc-300">Browser</span>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-cyan-500/20 transition-all cursor-help">
                <FileText className="w-8 h-8 text-[#00dbe9] mb-2" />
                <span className="text-[11px] font-semibold text-zinc-300">PDF Parser</span>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-cyan-500/20 transition-all cursor-help">
                <Calculator className="w-8 h-8 text-[#00dbe9] mb-2" />
                <span className="text-[11px] font-semibold text-zinc-300">Calculator</span>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-cyan-500/20 transition-all cursor-help">
                <Terminal className="w-8 h-8 text-[#00dbe9] mb-2" />
                <span className="text-[11px] font-semibold text-zinc-300">Python API</span>
              </div>
            </div>
          </div>

          {/* Active Metrics panel */}
          <div className="glass-card p-6 rounded-3xl">
            <h5 className="text-[10px] font-bold mb-5 text-zinc-400 uppercase tracking-widest">Metrics</h5>
            
            <div className="space-y-6">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[11px] text-zinc-500 uppercase tracking-wider font-display mb-1">Compute Usage</p>
                  <p className="text-xl font-extrabold text-white">1.2 TFLOPS</p>
                </div>
                {/* Micro block graph styling */}
                <div className="w-16 h-8 bg-cyan-400/10 rounded flex items-end gap-1 p-1">
                  <div className="w-2 h-2/3 bg-cyan-400/40 rounded-sm"></div>
                  <div className="w-2 h-1/2 bg-cyan-400/40 rounded-sm"></div>
                  <div className="w-2 h-full bg-[#00dbe9] rounded-sm shadow-[0_0_4px_#34e5ff]"></div>
                </div>
              </div>

              {/* Latency meter detail */}
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[11px] text-zinc-500 uppercase tracking-wider font-display mb-1">Latency</p>
                  <p className="text-xl font-extrabold text-white">42ms</p>
                </div>
                <RefreshCw className="w-5 h-5 text-cyan-400/80 animate-spin" />
              </div>
            </div>
          </div>

          {/* Active Intelligence Engine selection banner widget */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-cyan-400/20 to-transparent border border-cyan-400/20 overflow-hidden relative group">
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl group-hover:bg-cyan-500/20 transition-all duration-700"></div>
            
            <h5 className="text-xs font-bold text-[#00dbe9] uppercase tracking-wider mb-4 font-display">Intelligence Engine</h5>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-zinc-950 flex items-center justify-center shadow-lg flex-shrink-0">
                <Cpu className="w-6 h-6 text-[#00dbe9]" />
              </div>
              <div className="font-display">
                <p className="font-bold text-white text-sm">yourAI-4 Ultra</p>
                <p className="text-[10px] text-zinc-400 uppercase tracking-wider font-medium">Autonomous Mode Active</p>
              </div>
            </div>
          </div>

        </aside>

      </div>

      {/* Dynamic Toast feedback on bottom-right updates */}
      <div 
        className={`fixed bottom-8 right-8 glass-card py-3.5 px-6 rounded-full flex items-center gap-3 shadow-2xl z-50 transition-all duration-500 ${
          isToastVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'
        }`}
      >
        <Info className="w-4 h-4 text-cyan-400" />
        <span className="text-xs font-bold font-display text-white">New pricing table extracted from PDF</span>
      </div>

    </div>
  );
}
