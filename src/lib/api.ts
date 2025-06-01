import axios from 'axios';

// API Base URL - would be an environment variable in production
const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Generic API request wrapper
const apiRequest = async <T>(
  method: string,
  url: string,
  data?: any
): Promise<T> => {
  try {
    const response = await api({
      method,
      url,
      data,
    });
    return response.data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

// API endpoints structured by resource
export const apiService = {
  // Dashboard endpoints
  dashboard: {
    getMetrics: () => apiRequest<any>('get', '/dashboard/metrics'),
    getCampaignsOverview: () => apiRequest<any>('get', '/dashboard/campaigns-overview'),
    getNotifications: () => apiRequest<any>('get', '/dashboard/notifications'),
  },

  // Creators endpoints
  creators: {
    getAll: (filters?: any) => apiRequest<any>('get', '/creators', { params: filters }),
    getById: (id: string) => apiRequest<any>('get', `/creators/${id}`),
    aiSearch: (prompt: string) => apiRequest<any>('post', '/creators/ai-search', { prompt }),
    getLists: () => apiRequest<any>('get', '/creator-lists'),
    createList: (name: string) => apiRequest<any>('post', '/creator-lists', { name }),
    addToList: (listId: string, creatorId: string) => 
      apiRequest<any>('post', `/creator-lists/${listId}/add`, { creatorId }),
    getAuthenticity: (creatorId: string) => 
      apiRequest<any>('get', `/creator-authenticity/${creatorId}`),
  },

  // Campaigns endpoints
  campaigns: {
    getAll: () => apiRequest<any>('get', '/campaigns'),
    getById: (id: string) => apiRequest<any>('get', `/campaigns/${id}`),
    create: (data: any) => apiRequest<any>('post', '/campaigns', data),
    update: (id: string, data: any) => apiRequest<any>('put', `/campaigns/${id}`, data),
    delete: (id: string) => apiRequest<any>('delete', `/campaigns/${id}`),
    getContracts: (campaignId: string) => 
      apiRequest<any>('get', `/campaigns/${campaignId}/contracts`),
  },

  // Outreach endpoints
  outreach: {
    getContacts: () => apiRequest<any>('get', '/outreach/contacts'),
    getLogs: () => apiRequest<any>('get', '/outreach/logs'),
    getTemplates: () => apiRequest<any>('get', '/outreach/templates'),
    sendEmail: (data: any) => apiRequest<any>('post', '/outreach/send', data),
    getStatus: (jobId: string) => apiRequest<any>('get', `/outreach/status?jobId=${jobId}`),
  },

  // Payments endpoints
  payments: {
    getAll: (filters?: any) => apiRequest<any>('get', '/payments', { params: filters }),
    getMilestones: (campaignId: string) => 
      apiRequest<any>('get', `/payments/milestones?campaignId=${campaignId}`),
    triggerPayment: (milestoneId: string) => 
      apiRequest<any>('post', `/payments/trigger`, { milestoneId }),
    getInvoice: (paymentId: string) => 
      apiRequest<any>('get', `/payments/${paymentId}/invoice`),
  },

  // Analytics endpoints
  analytics: {
    getViews: (campaignId: string) => 
      apiRequest<any>('get', `/analytics/views?campaignId=${campaignId}`),
    getEngagement: (campaignId: string) => 
      apiRequest<any>('get', `/analytics/engagement?campaignId=${campaignId}`),
    getConversions: (campaignId: string) => 
      apiRequest<any>('get', `/analytics/conversions?campaignId=${campaignId}`),
    exportReport: (campaignId: string, type: 'csv' | 'pdf') => 
      apiRequest<any>('get', `/analytics/export?type=${type}&campaignId=${campaignId}`),
  },

  // Settings endpoints
  settings: {
    getUsers: () => apiRequest<any>('get', '/settings/users'),
    createUser: (data: any) => apiRequest<any>('post', '/settings/users', data),
    updateUser: (id: string, data: any) => apiRequest<any>('put', `/settings/users/${id}`, data),
    deleteUser: (id: string) => apiRequest<any>('delete', `/settings/users/${id}`),
    getAccount: () => apiRequest<any>('get', '/settings/account'),
    updateAccount: (data: any) => apiRequest<any>('put', '/settings/account', data),
    getIntegrations: () => apiRequest<any>('get', '/settings/integrations'),
    updateIntegration: (id: string, data: any) => 
      apiRequest<any>('put', `/settings/integrations/${id}`, data),
  },

  // Agent endpoints
  agents: {
    creatorScout: (data: any) => apiRequest<any>('post', '/agents/creator-scout', data),
    outreach: (data: any) => apiRequest<any>('post', '/agents/outreach', data),
    negotiation: (campaignId: string, creatorId: string) => 
      apiRequest<any>('get', `/agents/negotiation?campaignId=${campaignId}&creatorId=${creatorId}`),
    contract: {
      generate: (data: any) => apiRequest<any>('post', '/agents/contract/generate', data),
      sendSignature: (data: any) => apiRequest<any>('post', '/agents/contract/send-signature', data),
      getStatus: (contractId: string) => 
        apiRequest<any>('get', `/agents/contract/status?contractId=${contractId}`),
    },
    finance: {
      generateInvoice: (paymentId: string) => 
        apiRequest<any>('post', '/agents/finance/generate-invoice', { paymentId }),
      triggerPayout: (data: any) => apiRequest<any>('post', '/agents/finance/trigger-payout', data),
      getStatus: (payoutId: string) => 
        apiRequest<any>('get', `/agents/finance/status?payoutId=${payoutId}`),
    },
    campaignTracker: (campaignId: string) => 
      apiRequest<any>('get', `/agents/campaign-tracker?campaignId=${campaignId}`),
    insights: {
      getPerformanceSummary: (campaignId: string) => 
        apiRequest<any>('get', `/agents/insights/performance-summary?campaignId=${campaignId}`),
    },
    langBridge: {
      translate: (text: string, targetLanguage: string) => 
        apiRequest<any>('post', '/agents/lang-bridge/translate', { text, targetLanguage }),
      transcribe: (audioFile: File) => {
        const formData = new FormData();
        formData.append('audio', audioFile);
        return apiRequest<any>('post', '/agents/lang-bridge/transcribe', formData);
      },
    },
    conversationAnalysis: (threadId: string) => 
      apiRequest<any>('get', `/agents/conversation-analysis?threadId=${threadId}`),
  },
};

export default apiService;