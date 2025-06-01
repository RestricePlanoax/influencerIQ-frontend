// Creator types
// export interface Creator {
//   id: string;
//   name: string;
//   profilePic: string;
//   platform: 'Instagram' | 'YouTube' | 'TikTok' | 'Twitter';
//   handle: string;
//   audienceSize: number;
//   demographics: {
//     ageRange: [number, number];
//     gender: {
//       female: number;
//       male: number;
//       other: number;
//     };
//     location: string;
//   };
//   engagement: {
//     avgLikes: number;
//     avgComments: number;
//     avgViews?: number;
//   };
//   pastCollaborations: string[];
//   isAuthentic: boolean;
//   authenticityScore: number;
// }
// src/types.ts
export interface Deliverable {
  type: string;
  quantity: number;
}

export interface CampaignBrief {
  title:String,
  description: string;
  contentGuidelines: string;
  deliverables: Deliverable[];
}

export interface CampaignMetrics {
  views: number;
  engagement: number;   // e.g. 0.15 for 15%
  conversions: number;
  roi: number;          // e.g. 2.3 = “2.3×”
}

export interface Creator {
  id: string;
  name: string;
  profilePic: string;
  platform: string; // “Instagram” | “YouTube” | “TikTok” | “Twitter” | …
  handle: string; // e.g. “@emmajfit”
  audienceSize: number;
  demographics: {
    ageRange: [number, number];
    gender: {
      female: number;
      male: number;
      other: number;
    };
    location: string;
  };
  engagement: {
    avgLikes: number;
    avgComments: number;
    avgViews?: number; // optional for platforms without “views”
  };
  pastCollaborations: string[];
  isAuthentic: boolean;
  authenticityScore: number; // 0.0–1.0
}


// Campaign types
// src/types.ts
// src/types.ts
export interface Campaign {
  id: number;
  name: string;
  status: 'active' | 'draft' | 'awaiting' | 'completed' | 'paused';
  budget: number;       // in dollars
  startDate: string;    // ISO date “YYYY-MM-DD”
  endDate: string;      // ISO date “YYYY-MM-DD”
  objective: 'engagement' | 'awareness' | 'conversion' | string;
  creators: string[];   // array of creator‐IDs or handles
  brief: CampaignBrief;
  metrics: CampaignMetrics;

  // (Optional wizard fields; will not break UI if absent)
  description?: string;
  targetAudience?: string;
  budgetType?: string;
  objectives?: string[];
  selectedCreators?: string[];
}


// Contract types
export interface Contract {
  id: string;
  campaignId: string;
  creatorId: string;
  status: 'draft' | 'sent' | 'pending' | 'signed' | 'completed';
  amount: number;
  deliverables: {
    type: string;
    quantity: number;
  }[];
  createdAt: string;
  updatedAt: string;
  pdfUrl?: string;
  docusignUrl?: string;
}

// Outreach types
export interface OutreachContact {
  id: string;
  creatorId: string;
  name: string;
  email: string;
  platform: string;
  status: 'contacted' | 'negotiating' | 'active' | 'inactive';
  lastContact: string;
}

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
}

export interface CommunicationLog {
  id: string;
  creatorId: string;
  type: 'email' | 'message';
  date: string;
  subject: string;
  content: string;
  status: 'sent' | 'opened' | 'clicked';
}

// Payment types
export interface Payment {
  id: string;
  creatorId: string;
  campaignId: string;
  amount: number;
  status: 'pending' | 'paid' | 'failed';
  dueDate: string;
  paymentDate?: string;
  invoiceUrl?: string;
}

export interface Milestone {
  id: string;
  campaignId: string;
  creatorId: string;
  title: string;
  amount: number;
  status: 'not_triggered' | 'triggered' | 'paid';
  dueDate: string;
}

// Analytics types
export interface AnalyticsData {
  views: {
    date: string;
    value: number;
  }[];
  engagement: {
    date: string;
    value: number;
  }[];
  conversions: {
    date: string;
    value: number;
  }[];
}

// User types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'viewer';
  permissions: {
    createCampaigns: boolean;
    manageCreators: boolean;
    manageOutreach: boolean;
    viewFinances: boolean;
    manageUsers: boolean;
  };
}

// Integration types
export interface Integration {
  id: string;
  name: string;
  type: 'social' | 'payment' | 'email' | 'ai';
  status: 'connected' | 'disconnected';
  lastSync?: string;
}

// Dashboard types
export interface DashboardMetrics {
  totalSpend: number;
  creatorsEngaged: number;
  roiEstimate: number;
}

export interface CampaignOverview {
  active: number;
  draft: number;
  awaiting: number;
}

export interface Notification {
  id: string;
  type:
  | 'submission'
  | 'payment'
  | 'approval'
  | 'message'
  | 'signup'
  | 'budget'
  | 'reminder'
  | 'feedback'
  | 'profile'
  | 'status'
  | 'comment'; 
   message: string;
  read: boolean;
  createdAt: string;
}