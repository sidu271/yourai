/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Cpu, 
  Database, 
  Zap, 
  Activity, 
  FileText, 
  Globe, 
  Check, 
  RefreshCw, 
  BookOpen, 
  HelpCircle, 
  MessageSquare,
  Sparkles,
  TrendingUp,
  Inbox
} from 'lucide-react';
import { ActivityLog } from '../types';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

export default function DashboardView() {
  const [latency, setLatency] = useState(24);
  const [logs, setLogs] = useState<ActivityLog[]>([
    { id: '1', agent: 'SyncEngine', action: 'Database integrity check', timestamp: '2 mins ago', status: 'SUCCESS' },
    { id: '2', agent: 'NLP-Core', action: 'Parsing user request #492', timestamp: '5 mins ago', status: 'PROCESSING' },
    { id: '3', agent: 'WebScraper', action: 'Competitive analysis scrape', timestamp: '12 mins ago', status: 'SUCCESS' },
    { id: '4', agent: 'GuardDog', action: 'API Endpoint verification', timestamp: '22 mins ago', status: 'SUCCESS' }
  ]);

  const performanceData = [
    { name: 'Int #1', latency: 21, speed: 320, efficiency: 94 },
    { name: 'Int #2', latency: 26, speed: 290, efficiency: 91 },
    { name: 'Int #3', latency: 18, speed: 410, efficiency: 98 },
    { name: 'Int #4', latency: 34, speed: 240, efficiency: 85 },
    { name: 'Int #5', latency: 22, speed: 380, efficiency: 95 },
    { name: 'Int #6', latency: 19, speed: 430, efficiency: 99 },
    { name: 'Int #7', latency: 28, speed: 300, efficiency: 92 },
    { name: 'Int #8', latency: latency, speed: Math.round(500 - latency * 5), efficiency: Math.round(100 - latency / 2) }
  ];

  // Simulate minimal ambient volatility updates on latency
  useEffect(() => {
    const tInterval = setInterval(() => {
      setLatency(prev => {
        const delta = Math.floor(Math.random() * 5) - 2;
        const next = prev + delta;
        return Math.max(18, Math.min(36, next));
      });
    }, 4000);

    return () => clearInterval(tInterval);
  }, []);

  return (
    <div className="flex-1 min-h-screen bg-[#050505] text-white overflow-y-auto custom-scrollbar">
      {/* Top Header */}
      <header className="sticky top-0 h-16 w-full px-10 flex justify-between items-center z-40 backdrop-blur-md border-b border-white/5 font-display">
        <div className="flex items-center gap-3">
          <span className="text-lg font-bold text-white tracking-tighter">yourAI</span>
          <span className="text-zinc-500 font-light">/</span>
          <span className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">Agent Control</span>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-cyan-500/20">
            <span className="w-2 h-2 rounded-full bg-[#00dbe9] animate-pulse glow-cyan"></span>
            <span className="text-xs font-semibold text-cyan-400">Agent Status: Idle</span>
          </div>

          <div className="flex items-center gap-4 text-zinc-400">
            <button className="hover:text-[#00dbe9] transition-colors cursor-pointer relative">
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              <Cpu className="w-5 h-5" />
            </button>
            <button className="hover:text-[#00dbe9] transition-colors cursor-pointer">
              <Database className="w-5 h-5" />
            </button>
            <button className="hover:text-[#00dbe9] transition-colors cursor-pointer">
              <Zap className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Primary Dashboard Content Canvas */}
      <div className="p-10 max-w-[1400px] mx-auto w-full space-y-8 font-sans">
        {/* Hero Grid Block */}
        <div className="grid grid-cols-12 gap-6">
          {/* Main Status Giant Banner Card */}
          <div className="col-span-12 lg:col-span-8 glass-card rounded-3xl p-8 relative overflow-hidden flex flex-col justify-between min-h-[340px] group border-white/10 hover:border-cyan-500/30 transition-all duration-300">
            {/* Background cyan nebula depth decoration */}
            <div className="absolute -right-20 -top-20 w-80 h-80 bg-cyan-500/5 blur-[100px] rounded-full group-hover:bg-cyan-500/10 transition-all duration-700"></div>

            <div className="relative z-10 flex justify-between items-start">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest font-display block">
                  Active Agent Module
                </span>
                <h2 className="text-3xl font-bold tracking-tight text-white font-display">
                  Nexus-9 Intelligence
                </h2>
              </div>
              <span className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full font-display font-medium text-xs text-zinc-300">
                v.4.2.0-stable
              </span>
            </div>

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 mt-8">
              <div>
                <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider font-display mb-2">
                  Current Objective
                </p>
                <p className="text-sm text-zinc-100 font-medium leading-relaxed">
                  Automating cross-platform data synchronization and synthesizing quarterly market trends into executive summaries.
                </p>
              </div>

              {/* Graphical Circular Progress Loader Segment */}
              <div className="flex items-center gap-6">
                <div className="relative w-20 h-20 flex-shrink-0">
                  <svg className="w-full h-full transform -rotate-90">
                    {/* Background grey ring trail */}
                    <circle cx="40" cy="40" fill="none" r="32" stroke="rgba(255,255,255,0.05)" strokeWidth="6"></circle>
                    {/* Foreground cyan indicator ring */}
                    <circle 
                      cx="40" 
                      cy="40" 
                      fill="none" 
                      r="32" 
                      stroke="#00dbe9" 
                      strokeDasharray="201" 
                      strokeDashoffset="48" 
                      strokeWidth="6"
                      className="drop-shadow-[0_0_4px_#00dbe9]"
                    ></circle>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center font-display">
                    <span className="text-base font-extrabold text-cyan-400">76%</span>
                  </div>
                </div>
                
                <div className="font-display">
                  <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">Session Progress</p>
                  <p className="text-xs text-white font-semibold">3/4 Steps Complete</p>
                </div>
              </div>
            </div>
          </div>

          {/* KPI Cards (Memory, API Latency charts) */}
          <div className="col-span-12 lg:col-span-4 grid grid-cols-1 gap-6 font-display">
            {/* Memory Usage module */}
            <div className="glass-card rounded-3xl p-6 flex flex-col justify-between hover:border-[#00dbe9]/20 transition-colors">
              <div className="flex justify-between items-center mb-4">
                <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">Memory Usage</span>
                <Database className="w-4 h-4 text-cyan-400/80" />
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-baseline font-display">
                  <span className="text-2xl font-extrabold text-white">14.2 GB</span>
                  <span className="text-xs text-zinc-500">/ 32 GB</span>
                </div>
                {/* Horizontal simple progress custom bar tracker */}
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-[#00dbe9] glow-cyan" style={{ width: '44%' }}></div>
                </div>
              </div>
            </div>

            {/* API Latency dynamic speed dial module */}
            <div className="glass-card rounded-3xl p-6 flex flex-col justify-between hover:border-[#00dbe9]/20 transition-colors">
              <div className="flex justify-between items-center mb-4">
                <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">API Latency</span>
                <Activity className="w-4 h-4 text-cyan-400/80" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-extrabold text-white font-display">{latency}ms</span>
                  <span className="text-[10px] font-semibold text-[#00dbe9] bg-[#00dbe9]/10 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                    <TrendingUp className="w-3 h-3 text-[#00dbe9]" />
                    2.4%
                  </span>
                </div>
                {/* Minimalist mini interactive latency path SVG chart */}
                <div className="h-10 w-full mt-2">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 200 40">
                    <path 
                      className="text-[#00dbe9]"
                      d={`M0,35 Q30,10 60,32 T120,18 T180,25 T200,15`} 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Real-time Telemetry Analytics Chart */}
        <div className="glass-card rounded-3xl p-8 border border-white/10 hover:border-cyan-500/20 transition-all duration-300">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 font-display">
            <div>
              <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest block mb-1">
                Cognitive Analytics Panel
              </span>
              <h3 className="text-xl font-bold tracking-tight text-white font-display">
                Agent Response Performance & Telemetry
              </h3>
              <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                Live monitoring of Nexus-9 response latencies, cognitive processing speed, and execution efficiency.
              </p>
            </div>

            {/* Quick KPI stats highlighting current state */}
            <div className="flex gap-6 flex-wrap">
              <div className="flex flex-col">
                <span className="text-[10px] text-zinc-500 uppercase tracking-wider">Avg Latency</span>
                <span className="text-sm font-extrabold text-cyan-400">
                  {Math.round(performanceData.reduce((acc, d) => acc + d.latency, 0) / performanceData.length)}ms
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-zinc-500 uppercase tracking-wider">Peak Speed</span>
                <span className="text-sm font-extrabold text-[#ca38ff]">430 ops/s</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-zinc-500 uppercase tracking-wider">System Efficiency</span>
                <span className="text-sm font-extrabold text-emerald-400">
                  {Math.round(performanceData.reduce((acc, d) => acc + d.efficiency, 0) / performanceData.length)}%
                </span>
              </div>
            </div>
          </div>

          {/* Recharts Line Chart implementation */}
          <div className="h-80 w-full overflow-hidden">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData} margin={{ top: 10, right: 30, left: 10, bottom: 10 }}>
                <defs>
                  <linearGradient id="latencyGlow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00dbe9" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#00dbe9" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="speedGlow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ca38ff" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#ca38ff" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.03)" vertical={false} />
                
                <XAxis 
                  dataKey="name" 
                  stroke="rgba(255, 255, 255, 0.3)" 
                  tick={{ fill: 'rgba(255, 255, 255, 0.4)', fontSize: 10, fontFamily: 'var(--font-mono)' }}
                  axisLine={{ stroke: 'rgba(255, 255, 255, 0.05)' }}
                />
                
                <YAxis 
                  yAxisId="left"
                  stroke="rgba(0, 219, 233, 0.4)"
                  tick={{ fill: 'rgba(0, 219, 233, 0.6)', fontSize: 10, fontFamily: 'var(--font-mono)' }}
                  axisLine={{ stroke: 'rgba(255, 255, 255, 0.05)' }}
                  tickFormatter={(v) => `${v}ms`}
                />

                <YAxis 
                  yAxisId="right"
                  orientation="right"
                  stroke="rgba(202, 56, 255, 0.4)"
                  tick={{ fill: 'rgba(202, 56, 255, 0.6)', fontSize: 10, fontFamily: 'var(--font-mono)' }}
                  axisLine={{ stroke: 'rgba(255, 255, 255, 0.05)' }}
                  tickFormatter={(v) => `${v} op/s`}
                />

                <Tooltip 
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="glass-card p-4 rounded-xl shadow-2xl border border-white/10 backdrop-blur-3xl font-display text-xs space-y-2">
                          <p className="font-bold text-white uppercase tracking-wider mb-1">{label}</p>
                          <div className="flex items-center gap-6 justify-between">
                            <span className="text-[#00dbe9] flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#00dbe9] glow-cyan"></span>
                              Latency:
                            </span>
                            <span className="font-extrabold text-white">{payload[0]?.value} ms</span>
                          </div>
                          <div className="flex items-center gap-6 justify-between">
                            <span className="text-[#ca38ff] flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#ca38ff]"></span>
                              Processing Speed:
                            </span>
                            <span className="font-extrabold text-white">{payload[1]?.value} ops/sec</span>
                          </div>
                          <div className="flex items-center gap-6 justify-between pt-1.5 border-t border-white/5">
                            <span className="text-emerald-400 flex items-center gap-2">
                              System Efficiency:
                            </span>
                            <span className="font-extrabold text-emerald-400">{payload[2]?.value}%</span>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />

                <Legend 
                  wrapperStyle={{ fontSize: '10px', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', marginTop: '10px' }}
                  iconType="circle"
                />

                {/* Response Latency Line */}
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="latency" 
                  name="Response Latency" 
                  stroke="#00dbe9" 
                  strokeWidth={2.5}
                  dot={{ r: 4, strokeWidth: 1.5, stroke: '#00dbe9', fill: '#131315' }}
                  activeDot={{ r: 6, strokeWidth: 1.5, stroke: '#00dbe9', fill: '#00dbe9' }}
                />

                {/* Processing Speed Line */}
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="speed" 
                  name="Processing Speed" 
                  stroke="#ca38ff" 
                  strokeWidth={2.5}
                  dot={{ r: 4, strokeWidth: 1.5, stroke: '#ca38ff', fill: '#131315' }}
                  activeDot={{ r: 6, strokeWidth: 1.5, stroke: '#ca38ff', fill: '#ca38ff' }}
                />

                {/* System Efficiency Line, sharing left axis */}
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="efficiency" 
                  name="System Efficiency (%)" 
                  stroke="#10b981" 
                  strokeWidth={1.5}
                  strokeDasharray="4 4"
                  dot={{ r: 3, strokeWidth: 1, stroke: '#10b981', fill: '#131315' }}
                  activeDot={{ r: 5, strokeWidth: 1, stroke: '#10b981', fill: '#10b981' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Lower Row sections: Activity Feed and Secondary stats modules */}
        <div className="grid grid-cols-12 gap-6">
          {/* Recent Activity Table */}
          <div className="col-span-12 lg:col-span-7 glass-card rounded-3xl overflow-hidden flex flex-col">
            <div className="p-6 border-b border-white/5 flex justify-between items-center font-display">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Recent Activity</h3>
              <button className="text-xs text-[#00dbe9] hover:underline flex items-center gap-1 transition-all cursor-pointer">
                <span>View Log</span>
              </button>
            </div>

            <div className="flex-1 overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-white/5 text-[10px] uppercase tracking-wider font-display font-medium text-zinc-400 border-b border-white/5">
                  <tr>
                    <th className="px-6 py-3">Task Agent</th>
                    <th className="px-6 py-3">Action</th>
                    <th className="px-6 py-3">Timestamp</th>
                    <th className="px-6 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-xs text-zinc-300">
                  {logs.map((log) => (
                    <tr key={log.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 font-display font-medium text-white flex items-center gap-2.5">
                        <Cpu className="w-4 h-4 text-cyan-400" />
                        <span>{log.agent}</span>
                      </td>
                      <td className="px-6 py-4 text-zinc-300">{log.action}</td>
                      <td className="px-6 py-4 text-zinc-500 font-display">{log.timestamp}</td>
                      <td className="px-6 py-4 font-display">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-wider ${
                          log.status === 'SUCCESS' 
                            ? 'bg-[#00dbe9]/10 text-cyan-400' 
                            : 'bg-amber-400/10 text-amber-400'
                        }`}>
                          {log.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* KPI Analytics and Promotion module list */}
          <div className="col-span-12 lg:col-span-5 flex flex-col gap-6">
            {/* Completed Tasks KPI module */}
            <div className="glass-card rounded-3xl p-6 flex items-center gap-6 hover:border-[#00dbe9]/20 transition-colors">
              <div className="w-16 h-16 rounded-2xl bg-[#00dbe9]/10 flex items-center justify-center flex-shrink-0">
                <Check className="w-8 h-8 text-[#00dbe9]" />
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider font-display">Tasks Completed</p>
                <h4 className="text-2xl font-extrabold text-white font-display">
                  1,284 <span className="text-xs font-normal text-zinc-500 font-sans">this month</span>
                </h4>
              </div>
              <div className="text-right font-display text-sm font-bold text-cyan-400">
                +12%
              </div>
            </div>

            {/* Quick configuration toggle grids */}
            <div className="grid grid-cols-2 gap-6 font-display">
              <div className="glass-card rounded-3xl p-6 hover:scale-[1.02] transition-transform cursor-pointer">
                <Globe className="w-6 h-6 text-cyan-400 mb-3" />
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Cloud Sync</p>
                <p className="text-base font-bold text-white mt-1">99.9% Uptime</p>
              </div>

              <div className="glass-card rounded-3xl p-6 hover:scale-[1.02] transition-transform cursor-pointer">
                <RefreshCw className="w-6 h-6 text-cyan-400 mb-3" />
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Auto-Optimizer</p>
                <p className="text-base font-bold text-white mt-1">Enabled</p>
              </div>
            </div>

            {/* Small abstract promotional item layout card */}
            <div className="glass-card rounded-3xl p-6 relative overflow-hidden bg-gradient-to-br from-[#00dbe9]/10 to-transparent border border-cyan-500/10">
              <div className="relative z-10 space-y-2">
                <h5 className="text-xs font-bold text-white font-display uppercase tracking-wider">
                  New: Agent Templates
                </h5>
                <p className="text-xs text-zinc-400 leading-relaxed max-w-[320px]">
                  Deploy pre-configured agent models for Finance, Legal, and Creative workflows with one click.
                </p>
                <button className="mt-4 px-4 py-2 bg-white/5 hover:bg-white/10 uppercase tracking-wider font-display font-medium text-[11px] rounded-lg border border-white/10 text-white hover:text-cyan-400 transition-colors cursor-pointer">
                  Explore Marketplace
                </button>
              </div>

              {/* Ambient radial blur vector element */}
              <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-cyan-400/10 blur-2xl rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Global Meta Footer bar system information settings */}
      <footer className="mt-auto py-8 px-10 border-t border-white/5 flex flex-wrap justify-between items-center gap-6 font-display">
        <div className="flex items-center gap-8 text-[11px] text-zinc-500 font-medium">
          <span className="flex items-center gap-1.5 font-display text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00dbe9] glow-cyan"></span> 
            System Engine: V5-Omega
          </span>
          <span>Uptime: 14d 2h 11m</span>
          <span>Region: North America (East)</span>
        </div>

        <div className="flex gap-4 text-zinc-400">
          <button className="p-2 hover:text-[#00dbe9] transition-colors cursor-pointer" title="Help Centre">
            <HelpCircle className="w-5 h-5" />
          </button>
          <button className="p-2 hover:text-[#00dbe9] transition-colors cursor-pointer" title="Submit Feedback">
            <MessageSquare className="w-5 h-5" />
          </button>
        </div>
      </footer>
    </div>
  );
}
