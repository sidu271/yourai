/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type AppTab = 'chat' | 'dashboard' | 'activity' | 'settings';

export interface Message {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  timestamp: string;
  isThinking?: boolean;
  thinkingProgress?: number;
  sourcesScanned?: number;
  steps?: string[];
  groundingUrls?: Array<{ uri: string; title: string }>;
}

export interface ActivityLog {
  id: string;
  agent: string;
  action: string;
  timestamp: string;
  status: 'SUCCESS' | 'PROCESSING' | 'PENDING' | 'FAILED';
}

export interface MemoryItem {
  id: string;
  title: string;
  description: string;
  category: 'High priority' | 'Preference' | 'Library';
  icon: 'folder_open' | 'flight_takeoff' | 'code';
}

export interface KnowledgeDoc {
  id: string;
  name: string;
  size: string;
  processedAt: string;
}

export interface ModelParameter {
  creativity: number;
  topP: number;
  seed: number;
}

export interface SettingsState {
  selectedModel: string;
  parameters: ModelParameter;
  memories: MemoryItem[];
  knowledgeBase: KnowledgeDoc[];
  encryptionEnabled: boolean;
  contextPurgingEnabled: boolean;
}

export interface WorkflowStep {
  id: string;
  title: string;
  status: 'success' | 'running' | 'pending' | 'failed';
  duration?: string;
  description: string;
  outputCode?: string;
  progress?: number;
}
