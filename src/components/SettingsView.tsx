/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { 
  Cpu, 
  Database, 
  BookOpen, 
  ShieldCheck, 
  RefreshCw, 
  FolderOpen, 
  Plane, 
  Code, 
  UploadCloud, 
  Trash2, 
  Save, 
  Check, 
  Bell, 
  Zap,
  Info,
  FileText
} from 'lucide-react';
import { SettingsState, MemoryItem, KnowledgeDoc } from '../types';

interface SettingsViewProps {
  settings: SettingsState;
  setSettings: React.Dispatch<React.SetStateAction<SettingsState>>;
}

export default function SettingsView({ settings, setSettings }: SettingsViewProps) {
  const [activeSubTab, setActiveSubTab] = useState<'general' | 'models' | 'memory' | 'knowledge' | 'security'>('models');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Toggle model switcher
  const handleModelSelect = (modelName: string) => {
    setSettings(prev => ({
      ...prev,
      selectedModel: modelName
    }));
  };

  // Switch options toggles
  const toggleEncryption = () => {
    setSettings(prev => ({
      ...prev,
      encryptionEnabled: !prev.encryptionEnabled
    }));
  };

  const toggleContextPurging = () => {
    setSettings(prev => ({
      ...prev,
      contextPurgingEnabled: !prev.contextPurgingEnabled
    }));
  };

  // Delete uploaded file
  const handleDeleteDoc = (docId: string) => {
    setSettings(prev => ({
      ...prev,
      knowledgeBase: prev.knowledgeBase.filter(d => d.id !== docId)
    }));
  };

  // Simulate file ingest
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const newDoc: KnowledgeDoc = {
      id: Math.random().toString(),
      name: file.name,
      size: `${(file.size / (1024 * 1024)).toFixed(1)}MB`,
      processedAt: 'Just Now'
    };

    setSettings(prev => ({
      ...prev,
      knowledgeBase: [newDoc, ...prev.knowledgeBase]
    }));
  };

  // Simulate Save Trigger feedback
  const handleSaveAll = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="flex-1 min-h-screen bg-[#050505] text-white overflow-y-auto custom-scrollbar relative">
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileUpload} 
        className="hidden" 
        accept=".pdf,.docx,.txt,.json"
      />

      {/* Top Header */}
      <header className="sticky top-0 z-40 flex justify-between items-center w-full px-10 h-16 backdrop-blur-md bg-[#050505]/40 border-b border-white/5 font-display">
        <h2 className="text-lg font-bold text-white tracking-tight">Settings</h2>
        
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#00dbe9]/10 border border-white/5">
            <span className="w-2 h-2 rounded-full bg-[#00dbe9] glow-cyan animate-pulse"></span>
            <span className="text-xs text-zinc-400">Agent Status: Idle</span>
          </div>

          <div className="flex items-center gap-4 text-zinc-400">
            <Bell className="w-5 h-5 cursor-pointer hover:text-[#00dbe9] transition-colors" />
            <Database className="w-5 h-5 cursor-pointer hover:text-[#00dbe9] transition-colors" />
            <Zap className="w-5 h-5 cursor-pointer hover:text-[#00dbe9] transition-colors" />
          </div>
        </div>
      </header>

      {/* Settings Grid Content split */}
      <div className="max-w-[1000px] mx-auto px-10 py-10 space-y-12 font-sans">
        <div className="grid grid-cols-12 gap-8">
          
          {/* Sub Navigation Column left */}
          <div className="col-span-12 md:col-span-3">
            <nav className="sticky top-24 flex flex-col gap-1 font-display">
              <button 
                onClick={() => setActiveSubTab('general')}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider text-left transition-all cursor-pointer ${
                  activeSubTab === 'general' ? 'bg-[#00dbe9]/10 text-[#00dbe9]' : 'text-zinc-400 hover:bg-white/5'
                }`}
              >
                General
              </button>
              
              <button 
                onClick={() => setActiveSubTab('models')}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider text-left transition-all cursor-pointer ${
                  activeSubTab === 'models' ? 'bg-[#00dbe9]/10 text-[#00dbe9]' : 'text-zinc-400 hover:bg-white/5'
                }`}
              >
                Model Selection
              </button>

              <button 
                onClick={() => setActiveSubTab('memory')}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider text-left transition-all cursor-pointer ${
                  activeSubTab === 'memory' ? 'bg-[#00dbe9]/10 text-[#00dbe9]' : 'text-zinc-400 hover:bg-white/5'
                }`}
              >
                Long-Term Memory
              </button>

              <button 
                onClick={() => setActiveSubTab('knowledge')}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider text-left transition-all cursor-pointer ${
                  activeSubTab === 'knowledge' ? 'bg-[#00dbe9]/10 text-[#00dbe9]' : 'text-zinc-400 hover:bg-white/5'
                }`}
              >
                Knowledge Base
              </button>

              <button 
                onClick={() => setActiveSubTab('security')}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider text-left transition-all cursor-pointer ${
                  activeSubTab === 'security' ? 'bg-[#00dbe9]/10 text-[#00dbe9]' : 'text-zinc-400 hover:bg-white/5'
                }`}
              >
                Security & Privacy
              </button>
            </nav>
          </div>

          {/* Actionable Panels right */}
          <div className="col-span-12 md:col-span-9 space-y-12">
            
            {/* SECTION: Model selection panel */}
            <section className="space-y-6">
              <div className="flex items-center gap-4">
                <span className="p-2 bg-[#00dbe9]/10 text-[#00dbe9] rounded-xl flex items-center justify-center">
                  <Cpu className="w-6 h-6" />
                </span>
                <div>
                  <h3 className="text-lg font-bold font-display text-white">Model Selection</h3>
                  <p className="text-zinc-400 text-xs mt-0.5">Configure which brain powers your agent sessions.</p>
                </div>
              </div>

              {/* Grid selectors */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div 
                  onClick={() => handleModelSelect('GPT-4o yourAI')}
                  className={`glass-card p-5 rounded-2xl flex items-center justify-between cursor-pointer transition-all border ${
                    settings.selectedModel === 'GPT-4o yourAI' 
                      ? 'border-[#00dbe9]/50 ring-1 ring-[#00dbe9]/20' 
                      : 'border-white/5'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-[#00dbe9]/10 rounded-xl text-[#00dbe9]">
                      <Cpu className="w-5 h-5 animate-pulse" />
                    </div>
                    <div>
                      <p className="font-semibold text-white text-sm">GPT-4o yourAI</p>
                      <p className="text-[11px] text-zinc-500 font-display uppercase tracking-wider">Default Premium</p>
                    </div>
                  </div>
                  {/* Switch container */}
                  <div className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors duration-200 ${
                    settings.selectedModel === 'GPT-4o yourAI' ? 'bg-[#00dbe9]' : 'bg-white/10'
                  }`}>
                    <div className={`absolute top-0.5 w-4 h-4 bg-zinc-950 rounded-full transition-all duration-200 ${
                      settings.selectedModel === 'GPT-4o yourAI' ? 'right-0.5' : 'left-0.5'
                    }`}></div>
                  </div>
                </div>

                <div 
                  onClick={() => handleModelSelect('Claude 3.5 Sonnet')}
                  className={`glass-card p-5 rounded-2xl flex items-center justify-between cursor-pointer transition-all border ${
                    settings.selectedModel === 'Claude 3.5 Sonnet' 
                      ? 'border-[#00dbe9]/50 ring-1 ring-[#00dbe9]/20' 
                      : 'border-white/5'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white/5 rounded-xl text-zinc-400">
                      <Cpu className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-white text-sm">Claude 3.5 Sonnet</p>
                      <p className="text-[11px] text-zinc-500 font-display uppercase tracking-wider">Anthropic</p>
                    </div>
                  </div>
                  <div className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors duration-200 ${
                    settings.selectedModel === 'Claude 3.5 Sonnet' ? 'bg-[#00dbe9]' : 'bg-white/10'
                  }`}>
                    <div className={`absolute top-0.5 w-4 h-4 bg-zinc-950 rounded-full transition-all duration-200 ${
                      settings.selectedModel === 'Claude 3.5 Sonnet' ? 'right-0.5' : 'left-0.5'
                    }`}></div>
                  </div>
                </div>

                <div 
                  onClick={() => handleModelSelect('Gemini 1.5 Pro')}
                  className={`glass-card p-5 rounded-2xl flex items-center justify-between cursor-pointer transition-all border ${
                    settings.selectedModel === 'Gemini 1.5 Pro' 
                      ? 'border-[#00dbe9]/50 ring-1 ring-[#00dbe9]/20' 
                      : 'border-white/5'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white/5 rounded-xl text-zinc-400">
                      <Cpu className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-white text-sm">Gemini 1.5 Pro</p>
                      <p className="text-[11px] text-zinc-500 font-display uppercase tracking-wider">Google DeepMind</p>
                    </div>
                  </div>
                  <div className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors duration-200 ${
                    settings.selectedModel === 'Gemini 1.5 Pro' ? 'bg-[#00dbe9]' : 'bg-white/10'
                  }`}>
                    <div className={`absolute top-0.5 w-4 h-4 bg-zinc-950 rounded-full transition-all duration-200 ${
                      settings.selectedModel === 'Gemini 1.5 Pro' ? 'right-0.5' : 'left-0.5'
                    }`}></div>
                  </div>
                </div>

                <div 
                  onClick={() => handleModelSelect('Local LLM (Llama 3)')}
                  className={`glass-card p-5 rounded-2xl flex items-center justify-between cursor-pointer transition-all border ${
                    settings.selectedModel === 'Local LLM (Llama 3)' 
                      ? 'border-[#00dbe9]/50 ring-1 ring-[#00dbe9]/20' 
                      : 'border-white/5'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white/5 rounded-xl text-zinc-400">
                      <Cpu className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-white text-sm">Local LLM (Llama 3)</p>
                      <p className="text-[11px] text-zinc-500 font-display uppercase tracking-wider">Ollama Integration</p>
                    </div>
                  </div>
                  <div className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors duration-200 ${
                    settings.selectedModel === 'Local LLM (Llama 3)' ? 'bg-[#00dbe9]' : 'bg-white/10'
                  }`}>
                    <div className={`absolute top-0.5 w-4 h-4 bg-zinc-950 rounded-full transition-all duration-200 ${
                      settings.selectedModel === 'Local LLM (Llama 3)' ? 'right-0.5' : 'left-0.5'
                    }`}></div>
                  </div>
                </div>

              </div>
            </section>

            {/* SECTION: Memory Vault section details */}
            <section className="space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <span className="p-2 bg-[#00dbe9]/10 text-[#00dbe9] rounded-xl flex items-center justify-center">
                    <Database className="w-6 h-6" />
                  </span>
                  <div>
                    <h3 className="text-lg font-bold font-display text-white">Memory Vault</h3>
                    <p className="text-zinc-400 text-xs mt-0.5">Visualized context clusters from previous sessions.</p>
                  </div>
                </div>

                <button className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-semibold font-display flex items-center gap-2 cursor-pointer transition-all">
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Re-Index All</span>
                </button>
              </div>

              {/* Memory Clusters Grid display */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {settings.memories.map((memory) => {
                  return (
                    <div 
                      key={memory.id} 
                      className="glass-card p-5 rounded-2xl flex flex-col gap-4 group cursor-pointer relative overflow-hidden h-48 border border-white/5 hover:border-cyan-500/20"
                    >
                      <div className="flex justify-between items-start z-10">
                        <div className="p-2 bg-cyan-400/10 rounded-lg text-[#00dbe9]">
                          {memory.icon === 'folder_open' && <FolderOpen className="w-5 h-5" />}
                          {memory.icon === 'flight_takeoff' && <Plane className="w-5 h-5" />}
                          {memory.icon === 'code' && <Code className="w-5 h-5" />}
                        </div>
                        <span className="text-[9px] font-bold text-[#00dbe9] px-2 py-0.5 bg-cyan-500/10 rounded uppercase leading-tight font-display tracking-wider">
                          {memory.category}
                        </span>
                      </div>
                      
                      <div className="mt-auto z-10">
                        <h4 className="font-semibold text-white tracking-tight group-hover:text-[#00dbe9] transition-colors text-sm">
                          {memory.title}
                        </h4>
                        <p className="text-xs text-zinc-400 leading-normal mt-1 line-clamp-2">
                          {memory.description}
                        </p>
                      </div>

                      {/* Ambient background card glows */}
                      <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-[#00dbe9]/5 rounded-full blur-2xl group-hover:bg-[#00dbe9]/10 transition-all duration-300"></div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* SECTION: Knowledge Base Segment */}
            <section className="space-y-6">
              <div className="flex items-center gap-4">
                <span className="p-2 bg-[#00dbe9]/10 text-[#00dbe9] rounded-xl flex items-center justify-center">
                  <BookOpen className="w-6 h-6" />
                </span>
                <div>
                  <h3 className="text-lg font-bold font-display text-white">Knowledge Base</h3>
                  <p className="text-zinc-400 text-xs mt-0.5">Upload documents and data sources for the agent to reference.</p>
                </div>
              </div>

              {/* Big Dotted Dropzone area */}
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="relative group cursor-pointer"
              >
                <div className="w-full h-64 border-2 border-dashed border-white/10 rounded-3xl flex flex-col items-center justify-center gap-4 bg-white/[0.01] hover:bg-white/[0.03] hover:border-[#00dbe9]/45 transition-all">
                  <div className="w-16 h-16 rounded-full bg-[#00dbe9]/10 flex items-center justify-center text-[#00dbe9] mb-2 group-hover:scale-110 transition-transform">
                    <UploadCloud className="w-8 h-8" />
                  </div>
                  <div className="text-center font-display">
                    <p className="font-semibold text-white">Drop files to ingest</p>
                    <p className="text-xs text-zinc-500 mt-1 uppercase tracking-wider">PDF, DOCX, TXT, or JSON (Max 50MB per file)</p>
                  </div>
                  <button className="mt-4 px-6 py-2.5 bg-[#00dbe9] hover:bg-cyan-400 text-[#002022] font-bold text-xs rounded-xl active:scale-95 transition-all cursor-pointer shadow-[0_0_15px_rgba(0,219,233,0.15)] font-display uppercase tracking-wider">
                    Select Files
                  </button>
                </div>
              </div>

              {/* Ingested listings display column */}
              <div className="glass-card rounded-2xl divide-y divide-white/5">
                {settings.knowledgeBase.map((doc) => {
                  return (
                    <div key={doc.id} className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <FileText className="w-5 h-5 text-cyan-400/80" />
                        <div>
                          <p className="font-medium text-white text-xs">{doc.name}</p>
                          <p className="text-[10px] text-zinc-500 font-display lowercase tracking-wider">
                            Processed {doc.processedAt} • {doc.size}
                          </p>
                        </div>
                      </div>
                      <button 
                        onClick={() => handleDeleteDoc(doc.id)}
                        className="p-1.5 hover:bg-white/5 rounded text-zinc-400 hover:text-red-400 cursor-pointer transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* SECTION: Security panel settings */}
            <section className="space-y-6 pb-20">
              <div className="flex items-center gap-4">
                <span className="p-2 bg-[#00dbe9]/10 text-[#00dbe9] rounded-xl flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6" />
                </span>
                <div>
                  <h3 className="text-lg font-bold font-display text-white">Security & Privacy</h3>
                  <p className="text-zinc-400 text-xs mt-0.5">Manage your data encryption and access controls.</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="glass-card p-6 rounded-2xl flex items-center justify-between border-white/5">
                  <div>
                    <p className="font-semibold text-white text-sm">End-to-End Encryption</p>
                    <p className="text-xs text-zinc-400 max-w-md mt-1 leading-relaxed">
                      All memory clusters are encrypted with your master key before being stored on our servers.
                    </p>
                  </div>
                  {/* Switch toggle layout */}
                  <div 
                    onClick={toggleEncryption}
                    className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors duration-200 ${
                      settings.encryptionEnabled ? 'bg-[#00dbe9]' : 'bg-white/10'
                    }`}
                  >
                    <div className={`absolute top-1 w-4 h-4 bg-zinc-950 rounded-full transition-all duration-200 ${
                      settings.encryptionEnabled ? 'right-1' : 'left-1'
                    }`}></div>
                  </div>
                </div>

                <div className="glass-card p-6 rounded-2xl flex items-center justify-between border-white/5">
                  <div>
                    <p className="font-semibold text-white text-sm">Context Purging</p>
                    <p className="text-xs text-zinc-400 max-w-md mt-1 leading-relaxed">
                      Automatically clear session context after 24 hours of inactivity.
                    </p>
                  </div>
                  <div 
                    onClick={toggleContextPurging}
                    className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors duration-200 ${
                      settings.contextPurgingEnabled ? 'bg-[#00dbe9]' : 'bg-white/10'
                    }`}
                  >
                    <div className={`absolute top-1 w-4 h-4 bg-zinc-950 rounded-full transition-all duration-200 ${
                      settings.contextPurgingEnabled ? 'right-1' : 'left-1'
                    }`}></div>
                  </div>
                </div>
              </div>

              {/* Danger Zone */}
              <div className="p-6 bg-red-950/20 border border-red-500/20 rounded-2xl flex items-center justify-between flex-wrap gap-4">
                <div>
                  <p className="font-semibold text-red-400 text-sm font-display uppercase tracking-wider">Danger Zone</p>
                  <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                    Permanently delete all stored memories and knowledge bases.
                  </p>
                </div>
                <button className="px-6 py-2.5 border border-red-500/40 text-red-400 hover:bg-red-500 hover:text-black hover:font-bold rounded-xl font-display text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer">
                  Wipe All Data
                </button>
              </div>
            </section>

          </div>
        </div>
      </div>

      {/* Floating Save FAB feedback button */}
      <div className="fixed bottom-10 right-10 flex flex-col gap-4 z-50">
        <button 
          onClick={handleSaveAll}
          className="w-14 h-14 bg-[#00dbe9] hover:bg-cyan-400 text-[#002022] rounded-full shadow-2xl glow-cyan flex items-center justify-center hover:scale-110 active:scale-95 transition-transform group cursor-pointer"
        >
          <Save className="w-6 h-6" />
          <span className="absolute right-full mr-4 px-3 py-1 bg-zinc-900 border border-white/5 rounded-lg text-white font-display text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            Save Changes
          </span>
        </button>
      </div>

      {/* Save Success Floating feedback toast */}
      <div 
        className={`fixed bottom-8 left-1/2 -translate-x-1/2 glass-card py-3.5 px-6 rounded-full flex items-center gap-3 shadow-2xl z-50 transition-all duration-500 border border-cyan-500/30 ${
          saveSuccess ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'
        }`}
      >
        <Info className="w-4 h-4 text-cyan-400" />
        <span className="text-xs font-bold font-display text-white">All configurations saved successfully</span>
      </div>

    </div>
  );
}
