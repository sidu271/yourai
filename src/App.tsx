/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ChatView from './components/ChatView';
import DashboardView from './components/DashboardView';
import ActivityView from './components/ActivityView';
import SettingsView from './components/SettingsView';
import { AppTab, Message, SettingsState } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<AppTab>('chat');
  const [isProcessing, setIsProcessing] = useState(false);

  // Default app configurations with localstorage persistence
  const [settings, setSettings] = useState<SettingsState>(() => {
    const cached = localStorage.getItem('obsidian_settings');
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch (e) {
        // clear fallback
      }
    }
    return {
      selectedModel: 'GPT-4o yourAI',
      parameters: { creativity: 0.7, topP: 0.9, seed: 8472 },
      memories: [
        { id: 'm1', title: 'Project X Details', description: 'Technical specs, architecture diagrams, and stakeholder requirements for Q4 rollout.', category: 'High priority', icon: 'folder_open' },
        { id: 'm2', title: 'Travel Profile', description: 'Aisle seat preference, Hilton Honors status, and dietary restrictions for international flights.', category: 'Preference', icon: 'flight_takeoff' },
        { id: 'm3', title: 'React Patterns', description: 'Collection of custom hooks and state management boilerplate used in core apps.', category: 'Library', icon: 'code' }
      ],
      knowledgeBase: [
        { id: 'd1', name: '2024_Financial_Strategy.pdf', size: '4.2MB', processedAt: '2 hours ago' },
        { id: 'd2', name: 'Competitor_Analysis_v2.docx', size: '1.8MB', processedAt: 'Yesterday' }
      ],
      encryptionEnabled: true,
      contextPurgingEnabled: false
    };
  });

  // Default messaging feed pre-seeded exactly like the mockup!
  const [messages, setMessages] = useState<Message[]>(() => {
    const cachedMsg = localStorage.getItem('obsidian_chat');
    if (cachedMsg) {
      try {
        return JSON.parse(cachedMsg);
      } catch (e) {
        // ignore
      }
    }
    return [
      {
        id: 'init-usr',
        sender: 'user',
        text: 'Analyze the quarterly market trends and draft a report. Focus on the shift towards sustainable tech in Northern Europe.',
        timestamp: '2:14 PM'
      },
      {
        id: 'init-agent',
        sender: 'agent',
        text: "I'm on it. I'll search the web for the latest reports, extract key data points from recent environmental compliance filings, and compile them into a structured draft focused on Northern European tech sectors.",
        timestamp: 'Just Now',
        isThinking: true,
        thinkingProgress: 65,
        sourcesScanned: 14
      }
    ];
  });

  // Sync settings parameters
  useEffect(() => {
    localStorage.setItem('obsidian_settings', JSON.stringify(settings));
  }, [settings]);

  // Sync messages history
  useEffect(() => {
    localStorage.setItem('obsidian_chat', JSON.stringify(messages));
  }, [messages]);

  // Helper trigger to resolve the initial thinking preseed if unmodified
  useEffect(() => {
    const preseededThinking = messages.find(m => m.id === 'init-agent' && m.isThinking);
    if (preseededThinking) {
      const finishPreseedTimer = setTimeout(() => {
        setMessages(prev => prev.map(m => {
          if (m.id === 'init-agent') {
            return {
              ...m,
              isThinking: false,
              text: "I've compiled the initial market insights. The trend in Northern Europe shows Swedish and Danish cleantech startups growing by 28% year-on-year, primarily bolstered by the environmental standards filings from recent EU compliance reviews. Let me know if you would like me to draft the formal PDF report outline, or analyze specific competitive grids.",
              groundingUrls: [
                { uri: "https://ai.studio/build", title: "Sustainable Tech Growth Sweden" },
                { uri: "https://ai.studio/build", title: "EU Cleantech Review Q2" }
              ]
            };
          }
          return m;
        }));
      }, 4000);

      return () => clearTimeout(finishPreseedTimer);
    }
  }, []);

  // Trigger real backend search grounded Gemini request with simulated agent workflow delays
  const onSendMessage = async (text: string) => {
    setIsProcessing(true);

    const now = new Date();
    const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Append User Message
    const userMsg: Message = {
      id: Math.random().toString(),
      sender: 'user',
      text: text,
      timestamp: formattedTime
    };

    // Initial draft Thinking Bot Message
    const placeholderAgentMsg: Message = {
      id: Math.random().toString(),
      sender: 'agent',
      text: "I'm on it. I'll initiate a real-time web scan and synthesize information centered on your inquiry.",
      timestamp: formattedTime,
      isThinking: true,
      thinkingProgress: 10,
      sourcesScanned: 0
    };

    setMessages(prev => [...prev, userMsg, placeholderAgentMsg]);

    // Animate the ticking progress bar on client loop
    let progressVal = 10;
    let scanCount = 0;
    const progressTicker = setInterval(() => {
      progressVal += Math.floor(Math.random() * 15) + 5;
      scanCount += Math.floor(Math.random() * 3) + 1;
      
      setMessages(prev => prev.map(m => {
        if (m.id === placeholderAgentMsg.id) {
          return {
            ...m,
            thinkingProgress: Math.min(95, progressVal),
            sourcesScanned: Math.min(18, scanCount)
          };
        }
        return m;
      }));
    }, 400);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
      });

      if (!response.ok) {
        throw new Error('Cognitive network link failure.');
      }

      const data = await response.json();
      clearInterval(progressTicker);

      // Successfully settle response logs
      setMessages(prev => prev.map(m => {
        if (m.id === placeholderAgentMsg.id) {
          return {
            ...m,
            text: data.text,
            isThinking: false,
            sourcesScanned: data.sourcesScanned || 12,
            groundingUrls: data.groundingUrls || []
          };
        }
        return m;
      }));

    } catch (err: any) {
      clearInterval(progressTicker);
      setMessages(prev => prev.map(m => {
        if (m.id === placeholderAgentMsg.id) {
          return {
            ...m,
            text: `[Cognitive Failure Exception] ${err.message || 'The Agent cognitive link failed.'}\n\nThis typically occurs when server modules rebuild, or parameters are out of limits. Let's restart the active pipeline.`,
            isThinking: false
          };
        }
        return m;
      }));
    } finally {
      setIsProcessing(false);
    }
  };

  // Reset or start a new virtual clean session
  const onNewSession = () => {
    localStorage.removeItem('obsidian_chat');
    setMessages([
      {
        id: Math.random().toString(),
        sender: 'agent',
        text: "Hello Alex Rivera, new premium session initiated. Select active workflow parameters, or command a market scan. I'm ready to analyze.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    setActiveTab('chat');
  };

  return (
    <div className="flex h-screen bg-[#050505] text-white overflow-hidden">
      {/* Persisted glass sidebar left column */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        settings={settings}
        onNewSession={onNewSession}
      />

      {/* Main variable Workspace Screen Content */}
      <main className="flex-1 ml-0 lg:ml-[280px] h-full flex flex-col relative overflow-hidden">
        {activeTab === 'chat' && (
          <ChatView 
            messages={messages} 
            settings={settings}
            onSendMessage={onSendMessage}
            isProcessing={isProcessing}
          />
        )}

        {activeTab === 'dashboard' && (
          <DashboardView />
        )}

        {activeTab === 'activity' && (
          <ActivityView messages={messages} />
        )}

        {activeTab === 'settings' && (
          <SettingsView 
            settings={settings} 
            setSettings={setSettings} 
          />
        )}
      </main>
    </div>
  );
}
