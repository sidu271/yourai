/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Plus, 
  MessageSquare, 
  LayoutDashboard, 
  Workflow, 
  Settings, 
  Cpu, 
  ChevronDown,
  User,
  ChevronsUpDown
} from 'lucide-react';
import { AppTab, SettingsState } from '../types';

interface SidebarProps {
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
  settings: SettingsState;
  onNewSession: () => void;
}

export default function Sidebar({ activeTab, setActiveTab, settings, onNewSession }: SidebarProps) {
  return (
    <aside className="fixed left-0 top-0 h-full w-[280px] bg-[#131315]/80 backdrop-blur-3xl border-r border-white/10 flex flex-col py-6 px-4 z-50">
      {/* Brand Header */}
      <div className="mb-10 px-2">
        <h1 className="font-display text-2xl font-extrabold text-[#00dbe9] tracking-tighter">
          yourAI
        </h1>
        <p className="text-on-surface-variant font-display text-[12px] uppercase tracking-wider opacity-60 mt-1">
          Pro Plan • v4.2.0
        </p>
      </div>

      {/* New Session Button */}
      <button 
        onClick={onNewSession}
        className="mb-8 w-full py-3 px-4 glass-card rounded-xl flex items-center justify-center gap-3 text-[#00dbe9] hover:bg-white/10 active:scale-95 transition-all duration-200 cursor-pointer font-display font-semibold"
      >
        <Plus className="w-5 h-5" />
        <span>New Session</span>
      </button>

      {/* Navigation Section */}
      <nav className="flex-1 space-y-2 overflow-y-auto custom-scrollbar">
        <button
          onClick={() => setActiveTab('chat')}
          className={`w-full flex items-center gap-3 py-3 px-4 rounded-lg font-display text-sm font-medium transition-all duration-200 cursor-pointer ${
            activeTab === 'chat'
              ? 'text-white border-l-2 border-[#00dbe9] bg-gradient-to-r from-[#00dbe9]/10 to-transparent shadow-sm'
              : 'text-on-surface-variant hover:bg-white/5'
          }`}
        >
          <MessageSquare className={`w-5 h-5 ${activeTab === 'chat' ? 'text-[#00dbe9]' : ''}`} />
          <span>Chat</span>
        </button>

        <button
          onClick={() => setActiveTab('dashboard')}
          className={`w-full flex items-center gap-3 py-3 px-4 rounded-lg font-display text-sm font-medium transition-all duration-200 cursor-pointer ${
            activeTab === 'dashboard'
              ? 'text-white border-l-2 border-[#00dbe9] bg-gradient-to-r from-[#00dbe9]/10 to-transparent shadow-sm'
              : 'text-on-surface-variant hover:bg-white/5'
          }`}
        >
          <LayoutDashboard className={`w-5 h-5 ${activeTab === 'dashboard' ? 'text-[#00dbe9]' : ''}`} />
          <span>Dashboard</span>
        </button>

        <button
          onClick={() => setActiveTab('activity')}
          className={`w-full flex items-center gap-3 py-3 px-4 rounded-lg font-display text-sm font-medium transition-all duration-200 cursor-pointer ${
            activeTab === 'activity'
              ? 'text-white border-l-2 border-[#00dbe9] bg-gradient-to-r from-[#00dbe9]/10 to-transparent shadow-sm'
              : 'text-on-surface-variant hover:bg-white/5'
          }`}
        >
          <Workflow className={`w-5 h-5 ${activeTab === 'activity' ? 'text-[#00dbe9]' : ''}`} />
          <span>Activity</span>
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`w-full flex items-center gap-3 py-3 px-4 rounded-lg font-display text-sm font-medium transition-all duration-200 cursor-pointer ${
            activeTab === 'settings'
              ? 'text-white border-l-2 border-[#00dbe9] bg-gradient-to-r from-[#00dbe9]/10 to-transparent shadow-sm'
              : 'text-on-surface-variant hover:bg-white/5'
          }`}
        >
          <Settings className={`w-5 h-5 ${activeTab === 'settings' ? 'text-[#00dbe9]' : ''}`} />
          <span>Settings</span>
        </button>
      </nav>

      {/* Sidebar Footer Details */}
      <div className="mt-auto pt-6 border-t border-white/10 space-y-3 font-display">
        {/* Model Switcher Box */}
        <div className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-white/5 cursor-pointer transition-colors group">
          <div className="flex items-center gap-2 text-on-surface-variant group-hover:text-white transition-colors">
            <Cpu className="w-5 h-5 text-[#00dbe9]" />
            <span className="text-xs font-semibold uppercase tracking-wider">
              {settings.selectedModel}
            </span>
          </div>
          <ChevronDown className="w-4 h-4 text-on-surface-variant" />
        </div>

        {/* User Card */}
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/5 border border-white/5">
          <div className="w-8 h-8 rounded-full overflow-hidden border border-white/20 flex-shrink-0 flex items-center justify-center bg-zinc-800">
            {/* Real asset fallback */}
            <img 
              alt="User Portrait" 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida/AP1WRLu_ZGfW0Hk9viEn7LCDPETvfurZWGXWYdhzi9t8M48LSeuErXe5hc3kI2NRtsOaw1yTFU4RkZc64BSA_86B9ktBW0nmYGzMn7O5HtINFRP3P1qp3Ke-NCrrMfBuJUZmGkQE8uhdxvM2yGoV72Sw70h6M9nFaO7S1wC5qkDqPAPl-GS6a6O5_1yswj9hYcvxPyWq8HHDxlsXTCZpwKUbm8aptzvluYrMMSQkFJnkNej29meRrPSkj6UVQsI"
              onError={(e) => {
                // If hotlink isn't loaded in viewport, render a fallback icon
                e.currentTarget.style.display = 'none';
              }}
            />
            <User className="w-4 h-4 text-[#00dbe9]" />
          </div>
          <div className="flex-1 overflow-hidden">
            <span className="block text-xs font-bold text-white truncate leading-tight">
              Alex Rivera
            </span>
            <span className="block text-[10px] text-on-surface-variant opacity-60 leading-tight">
              Profile Settings
            </span>
          </div>
          <ChevronsUpDown className="w-4 h-4 text-on-surface-variant flex-shrink-0 cursor-pointer" />
        </div>
      </div>
    </aside>
  );
}
