import { 
  Creator, 
  Campaign, 
  Contract, 
  OutreachContact, 
  EmailTemplate, 
  CommunicationLog,
  Payment,
  Milestone,
  AnalyticsData,
  User,
  Integration,
  DashboardMetrics,
  CampaignOverview,
  Notification
} from '../types';

// Mock Creators
export const mockCreators: Creator[] = [
  {
    id: 'creator1',
    name: 'Emma Johnson',
    profilePic: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    platform: 'Instagram',
    handle: '@emmajfit',
    audienceSize: 125000,
    demographics: {
      ageRange: [18, 34],
      gender: {
        female: 0.75,
        male: 0.23,
        other: 0.02
      },
      location: 'United States'
    },
    engagement: {
      avgLikes: 5200,
      avgComments: 320
    },
    pastCollaborations: ['Nike', 'Gymshark', 'Protein World'],
    isAuthentic: true,
    authenticityScore: 0.92
  },
  {
    id: 'creator2',
    name: 'Alex Chen',
    profilePic: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    platform: 'YouTube',
    handle: '@alexchentech',
    audienceSize: 450000,
    demographics: {
      ageRange: [24, 45],
      gender: {
        female: 0.35,
        male: 0.63,
        other: 0.02
      },
      location: 'Global'
    },
    engagement: {
      avgLikes: 18500,
      avgComments: 1200,
      avgViews: 120000
    },
    pastCollaborations: ['Samsung', 'Logitech', 'Squarespace'],
    isAuthentic: true,
    authenticityScore: 0.89
  },
  {
    id: 'creator3',
    name: 'Sophia Martinez',
    profilePic: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    platform: 'TikTok',
    handle: '@sophiastyle',
    audienceSize: 780000,
    demographics: {
      ageRange: [16, 28],
      gender: {
        female: 0.68,
        male: 0.30,
        other: 0.02
      },
      location: 'United States, Europe'
    },
    engagement: {
      avgLikes: 85000,
      avgComments: 3200
    },
    pastCollaborations: ['Fashion Nova', 'Sephora', 'Revolve'],
    isAuthentic: true,
    authenticityScore: 0.95
  },
  {
    id: 'creator4',
    name: 'James Wilson',
    profilePic: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    platform: 'Twitter',
    handle: '@jameswtech',
    audienceSize: 210000,
    demographics: {
      ageRange: [25, 45],
      gender: {
        female: 0.42,
        male: 0.56,
        other: 0.02
      },
      location: 'United Kingdom, United States'
    },
    engagement: {
      avgLikes: 1800,
      avgComments: 420
    },
    pastCollaborations: ['Microsoft', 'Dell', 'Adobe'],
    isAuthentic: false,
    authenticityScore: 0.65
  },
  {
    id: 'creator5',
    name: 'Olivia Kim',
    profilePic: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    platform: 'Instagram',
    handle: '@oliviakbeauty',
    audienceSize: 320000,
    demographics: {
      ageRange: [18, 35],
      gender: {
        female: 0.82,
        male: 0.17,
        other: 0.01
      },
      location: 'South Korea, United States, Canada'
    },
    engagement: {
      avgLikes: 15000,
      avgComments: 850
    },
    pastCollaborations: ['Fenty Beauty', 'Tatcha', 'Glossier'],
    isAuthentic: true,
    authenticityScore: 0.91
  }
];

// Mock Campaigns
export const mockCampaigns: Campaign[] = [
  {
    id: 1,
    name: 'Summer Fitness Challenge',
    status: 'active',
    objective: 'engagement',
    budget: 25000,
    startDate: '2025-06-01',
    endDate: '2025-07-15',
    creators: ['creator1', 'creator3', 'creator5'],
    brief: {
      title: 'Summer Fitness Challenge',
      description: 'Promote our new fitness app with a 30-day challenge to get summer ready.',
      contentGuidelines: 'Show before/after progress, daily workout routines, and highlight app features.',
      deliverables: [
        { type: 'Instagram Post', quantity: 4 },
        { type: 'Instagram Story', quantity: 12 },
        { type: 'TikTok Video', quantity: 2 }
      ]
    },
    metrics: {
      views: 450000,
      engagement: 0.058,
      conversions: 3200,
      roi: 2.4
    }
  },
  {
    id: 3,
    name: 'Holiday Beauty Collection',
    status: 'completed',
    objective: 'sales',
    budget: 35000,
    startDate: '2024-11-01',
    endDate: '2024-12-25',
    creators: ['creator3', 'creator5'],
    brief: {
      title: 'Holiday Glam Collection',
      description: 'Showcase our limited edition holiday makeup collection with festive looks.',
      contentGuidelines: 'Create holiday-themed makeup tutorials, gift guides, and unboxing videos.',
      deliverables: [
        { type: 'Instagram Post', quantity: 3 },
        { type: 'TikTok Video', quantity: 4 },
        { type: 'Instagram Reels', quantity: 2 }
      ]
    },
    metrics: {
      views: 780000,
      engagement: 0.062,
      conversions: 5800,
      roi: 3.2
    }
  },
  {
    id: 4,
    name: 'Sustainable Fashion Line',
    status: 'paused',
    objective: 'awareness',
    budget: 30000,
    startDate: '2025-03-01',
    endDate: '2025-04-15',
    creators: ['creator1', 'creator5'],
    brief: {
      title: 'Eco-Friendly Fashion',
      description: 'Highlight our sustainable clothing line made from recycled materials.',
      contentGuidelines: 'Educate audience on sustainability practices, showcase outfit styling, and discuss eco-friendly benefits.',
      deliverables: [
        { type: 'Instagram Post', quantity: 3 },
        { type: 'Instagram Story', quantity: 6 },
        { type: 'Blog Post', quantity: 1 }
      ]
    },
    metrics: {
      views: 320000,
      engagement: 0.045,
      conversions: 1800,
      roi: 1.8
    }
  }
];

// Mock Contracts
export const mockContracts: Contract[] = [
  {
    id: 'contract1',
    campaignId: 'campaign1',
    creatorId: 'creator1',
    status: 'signed',
    amount: 5000,
    deliverables: [
      { type: 'Instagram Post', quantity: 4 },
      { type: 'Instagram Story', quantity: 12 }
    ],
    createdAt: '2025-05-15',
    updatedAt: '2025-05-18',
    pdfUrl: '/contracts/contract1.pdf',
    docusignUrl: 'https://docusign.com/sign/contract1'
  },
  {
    id: 'contract2',
    campaignId: 'campaign1',
    creatorId: 'creator3',
    status: 'pending',
    amount: 7500,
    deliverables: [
      { type: 'TikTok Video', quantity: 2 },
      { type: 'Instagram Story', quantity: 8 }
    ],
    createdAt: '2025-05-16',
    updatedAt: '2025-05-16'
  },
  {
    id: 'contract3',
    campaignId: 'campaign3',
    creatorId: 'creator5',
    status: 'completed',
    amount: 12000,
    deliverables: [
      { type: 'Instagram Post', quantity: 3 },
      { type: 'Instagram Reels', quantity: 2 }
    ],
    createdAt: '2024-10-20',
    updatedAt: '2024-12-28',
    pdfUrl: '/contracts/contract3.pdf',
    docusignUrl: 'https://docusign.com/sign/contract3'
  }
];

// Mock Outreach Contacts
export const mockOutreachContacts: OutreachContact[] = [
  {
    id: 'contact1',
    creatorId: 'creator1',
    name: 'Emma Johnson',
    email: 'emma@influencer.com',
    platform: 'Instagram',
    status: 'active',
    lastContact: '2025-05-10'
  },
  {
    id: 'contact2',
    creatorId: 'creator2',
    name: 'Alex Chen',
    email: 'alex@techinfluencer.com',
    platform: 'YouTube',
    status: 'contacted',
    lastContact: '2025-05-15'
  },
  {
    id: 'contact3',
    creatorId: 'creator3',
    name: 'Sophia Martinez',
    email: 'sophia@styleinfluencer.com',
    platform: 'TikTok',
    status: 'negotiating',
    lastContact: '2025-05-12'
  },
  {
    id: 'contact4',
    creatorId: 'creator4',
    name: 'James Wilson',
    email: 'james@techwriter.com',
    platform: 'Twitter',
    status: 'inactive',
    lastContact: '2025-04-28'
  },
  {
    id: 'contact5',
    creatorId: 'creator5',
    name: 'Olivia Kim',
    email: 'olivia@beautyinfluencer.com',
    platform: 'Instagram',
    status: 'active',
    lastContact: '2025-05-14'
  }
];

// Mock Email Templates
export const mockEmailTemplates: EmailTemplate[] = [
  {
    id: 'template1',
    name: 'Initial Outreach',
    subject: 'Collaboration Opportunity with {{brand}}',
    body: 'Hi {{firstName}},\n\nI hope this email finds you well. We at {{brand}} have been following your content and are impressed with your {{niche}} content. We would love to discuss a potential collaboration for our upcoming campaign.\n\nPlease let me know if you\'re interested in learning more.\n\nBest regards,\n{{senderName}}'
  },
  {
    id: 'template2',
    name: 'Campaign Brief',
    subject: '{{campaignName}} - Campaign Brief',
    body: 'Hi {{firstName}},\n\nThank you for your interest in our {{campaignName}} campaign. Attached is the detailed brief outlining our expectations, deliverables, and timeline.\n\nPlease review and let me know if you have any questions.\n\nLooking forward to working with you!\n\nBest,\n{{senderName}}'
  },
  {
    id: 'template3',
    name: 'Contract Follow-up',
    subject: 'Your Contract for {{campaignName}}',
    body: 'Hi {{firstName}},\n\nI hope you\'re doing well. I wanted to follow up on the contract we sent for the {{campaignName}} campaign. Have you had a chance to review it?\n\nIf you have any questions or need clarification on any points, please don\'t hesitate to reach out.\n\nBest regards,\n{{senderName}}'
  }
];

// Mock Communication Logs
export const mockCommunicationLogs: CommunicationLog[] = [
  {
    id: 'log1',
    creatorId: 'creator1',
    type: 'email',
    date: '2025-05-10T14:30:00Z',
    subject: 'Collaboration Opportunity with FitLife',
    content: 'Hi Emma, I hope this email finds you well. We at FitLife have been following your content and are impressed with your fitness content. We would love to discuss a potential collaboration for our upcoming Summer Fitness Challenge campaign. Please let me know if you\'re interested in learning more. Best regards, Sarah',
    status: 'opened'
  },
  {
    id: 'log2',
    creatorId: 'creator2',
    type: 'email',
    date: '2025-05-15T10:15:00Z',
    subject: 'Tech Product Launch - Collaboration Opportunity',
    content: 'Hi Alex, I hope you\'re doing well. We\'re launching a new smartphone next month and would love to have you create an unboxing and review video. Your tech reviews are always thorough and insightful, which is exactly what we\'re looking for. Would you be interested in discussing this further? Best, Michael',
    status: 'sent'
  },
  {
    id: 'log3',
    creatorId: 'creator3',
    type: 'message',
    date: '2025-05-12T16:45:00Z',
    subject: 'Contract Discussion',
    content: 'Hi Sophia, thank you for your interest in our campaign. Regarding your question about the deliverables, we\'re looking for 2 TikTok videos (60 seconds each) and 8 Instagram stories over a 4-week period. The total compensation would be $7,500. Does this work for you?',
    status: 'clicked'
  }
];

// Mock Payments
export const mockPayments: Payment[] = [
  {
    id: 'payment1',
    creatorId: 'creator1',
    campaignId: 'campaign1',
    amount: 2500,
    status: 'paid',
    dueDate: '2025-06-15',
    paymentDate: '2025-06-14',
    invoiceUrl: '/invoices/invoice1.pdf'
  },
  {
    id: 'payment2',
    creatorId: 'creator3',
    campaignId: 'campaign1',
    amount: 3750,
    status: 'pending',
    dueDate: '2025-06-30'
  },
  {
    id: 'payment3',
    creatorId: 'creator5',
    campaignId: 'campaign3',
    amount: 12000,
    status: 'paid',
    dueDate: '2024-12-30',
    paymentDate: '2024-12-28',
    invoiceUrl: '/invoices/invoice3.pdf'
  },
  {
    id: 'payment4',
    creatorId: 'creator1',
    campaignId: 'campaign1',
    amount: 2500,
    status: 'pending',
    dueDate: '2025-07-15'
  }
];

// Mock Milestones
export const mockMilestones: Milestone[] = [
  {
    id: 'milestone1',
    campaignId: 'campaign1',
    creatorId: 'creator1',
    title: 'Content Approval',
    amount: 2500,
    status: 'paid',
    dueDate: '2025-06-15'
  },
  {
    id: 'milestone2',
    campaignId: 'campaign1',
    creatorId: 'creator1',
    title: 'Campaign Completion',
    amount: 2500,
    status: 'not_triggered',
    dueDate: '2025-07-15'
  },
  {
    id: 'milestone3',
    campaignId: 'campaign1',
    creatorId: 'creator3',
    title: 'Content Approval',
    amount: 3750,
    status: 'triggered',
    dueDate: '2025-06-30'
  },
  {
    id: 'milestone4',
    campaignId: 'campaign1',
    creatorId: 'creator3',
    title: 'Campaign Completion',
    amount: 3750,
    status: 'not_triggered',
    dueDate: '2025-07-15'
  }
];

// Mock Analytics Data
export const mockAnalyticsData: AnalyticsData = {
  views: [
    { date: '2025-06-01', value: 15000 },
    { date: '2025-06-02', value: 18000 },
    { date: '2025-06-03', value: 22000 },
    { date: '2025-06-04', value: 20000 },
    { date: '2025-06-05', value: 25000 },
    { date: '2025-06-06', value: 30000 },
    { date: '2025-06-07', value: 28000 },
    { date: '2025-06-08', value: 32000 },
    { date: '2025-06-09', value: 35000 },
    { date: '2025-06-10', value: 40000 },
    { date: '2025-06-11', value: 38000 },
    { date: '2025-06-12', value: 42000 },
    { date: '2025-06-13', value: 45000 },
    { date: '2025-06-14', value: 50000 }
  ],
  engagement: [
    { date: '2025-06-01', value: 0.042 },
    { date: '2025-06-02', value: 0.045 },
    { date: '2025-06-03', value: 0.050 },
    { date: '2025-06-04', value: 0.048 },
    { date: '2025-06-05', value: 0.052 },
    { date: '2025-06-06', value: 0.055 },
    { date: '2025-06-07', value: 0.053 },
    { date: '2025-06-08', value: 0.058 },
    { date: '2025-06-09', value: 0.060 },
    { date: '2025-06-10', value: 0.062 },
    { date: '2025-06-11', value: 0.059 },
    { date: '2025-06-12', value: 0.063 },
    { date: '2025-06-13', value: 0.065 },
    { date: '2025-06-14', value: 0.068 }
  ],
  conversions: [
    { date: '2025-06-01', value: 120 },
    { date: '2025-06-02', value: 150 },
    { date: '2025-06-03', value: 180 },
    { date: '2025-06-04', value: 165 },
    { date: '2025-06-05', value: 200 },
    { date: '2025-06-06', value: 220 },
    { date: '2025-06-07', value: 210 },
    { date: '2025-06-08', value: 240 },
    { date: '2025-06-09', value: 260 },
    { date: '2025-06-10', value: 280 },
    { date: '2025-06-11', value: 270 },
    { date: '2025-06-12', value: 300 },
    { date: '2025-06-13', value: 320 },
    { date: '2025-06-14', value: 350 }
  ]
};

// Mock Users
export const mockUsers: User[] = [
  {
    id: 'user1',
    name: 'Sarah Johnson',
    email: 'sarah@company.com',
    role: 'admin',
    permissions: {
      createCampaigns: true,
      manageCreators: true,
      manageOutreach: true,
      viewFinances: true,
      manageUsers: true
    }
  },
  {
    id: 'user2',
    name: 'Michael Chen',
    email: 'michael@company.com',
    role: 'manager',
    permissions: {
      createCampaigns: true,
      manageCreators: true,
      manageOutreach: true,
      viewFinances: true,
      manageUsers: false
    }
  },
  {
    id: 'user3',
    name: 'Jessica Lee',
    email: 'jessica@company.com',
    role: 'viewer',
    permissions: {
      createCampaigns: false,
      manageCreators: true,
      manageOutreach: true,
      viewFinances: false,
      manageUsers: false
    }
  }
];

// Mock Integrations
export const mockIntegrations: Integration[] = [
  {
    id: 'integration1',
    name: 'Instagram',
    type: 'social',
    status: 'connected',
    lastSync: '2025-05-15T10:30:00Z'
  },
  {
    id: 'integration2',
    name: 'YouTube',
    type: 'social',
    status: 'connected',
    lastSync: '2025-05-14T14:45:00Z'
  },
  {
    id: 'integration3',
    name: 'TikTok',
    type: 'social',
    status: 'disconnected'
  },
  {
    id: 'integration4',
    name: 'Stripe',
    type: 'payment',
    status: 'connected',
    lastSync: '2025-05-16T09:15:00Z'
  },
  {
    id: 'integration5',
    name: 'SendGrid',
    type: 'email',
    status: 'connected',
    lastSync: '2025-05-15T16:20:00Z'
  },
  {
    id: 'integration6',
    name: 'OpenAI',
    type: 'ai',
    status: 'connected',
    lastSync: '2025-05-16T11:10:00Z'
  }
];

// Mock Dashboard Metrics
export const mockDashboardMetrics: DashboardMetrics = {
  totalSpend: 75000,
  creatorsEngaged: 12,
  roiEstimate: 2.8
};

// Mock Campaign Overview
export const mockCampaignOverview: CampaignOverview = {
  active: 2,
  draft: 3,
  awaiting: 1
};

// Mock Notifications

export const mockNotifications : Notification[] = [
  {
    id: 'n1',
    message: 'Emma Johnson submitted content for review in Summer Fitness Challenge',
    read: false,
    createdAt: '2025-05-30T15:00:00Z', // May 30, 2025, 3:00 PM UTC
    type: 'submission'
  },
  {
    id: 'n2',
    message: 'Payment of $3,750 to Sophia Martinez is due in 3 days',
    read: false,
    createdAt: '2025-05-29T19:45:00Z', // May 29, 2025, 7:45 PM UTC
    type: 'payment'
  },
  {
    id: 'n3',
    message: 'Tech Product Launch campaign requires your approval',
    read: false,
    createdAt: '2025-05-28T17:15:00Z', // May 28, 2025, 5:15 PM UTC
    type: 'approval'
  },
  {
    id: 'n4',
    message: 'Alex Chen replied to your contract proposal',
    read: true,
    createdAt: '2025-05-27T21:50:00Z', // May 27, 2025, 9:50 PM UTC
    type: 'message'
  },
  {
    id: 'n5',
    message: 'Olivia Kim submitted content for review in Summer Fitness Challenge',
    read: true,
    createdAt: '2025-05-26T15:40:00Z', // May 26, 2025, 3:40 PM UTC
    type: 'submission'
  },
  {
    id: 'n6',
    message: 'New creator “@jane.doe” signed up',
    read: false,
    createdAt: '2025-05-31T09:10:00Z', // May 31, 2025, 9:10 AM UTC
    type: 'signup'
  },
  {
    id: 'n7',
    message: 'Budget for Flash Sale was exceeded by 10%',
    read: true,
    createdAt: '2025-05-29T12:00:00Z', // May 29, 2025, Noon UTC
    type: 'budget'
  },
  {
    id: 'n8',
    message: 'Michael Lee approved your influencer contract',
    read: false,
    createdAt: '2025-05-30T18:25:00Z', // May 30, 2025, 6:25 PM UTC
    type: 'approval'
  },
  {
    id: 'n9',
    message: 'Reminder: “Back-to-School Promo” launch is tomorrow',
    read: false,
    createdAt: '2025-05-31T07:30:00Z', // May 31, 2025, 7:30 AM UTC
    type: 'reminder'
  },
  {
    id: 'n10',
    message: 'Payment of $1,200 to Alex Chen was processed successfully',
    read: true,
    createdAt: '2025-05-28T14:05:00Z', // May 28, 2025, 2:05 PM UTC
    type: 'payment'
  },
  {
    id: 'n11',
    message: 'Samantha Wu left feedback on “Tech Product Launch” assets',
    read: false,
    createdAt: '2025-05-31T20:15:00Z', // May 31, 2025, 8:15 PM UTC
    type: 'feedback'
  },
  {
    id: 'n12',
    message: 'Your profile was viewed by new creator @mike_stevens',
    read: true,
    createdAt: '2025-05-27T08:55:00Z', // May 27, 2025, 8:55 AM UTC
    type: 'profile'
  },
  {
    id: 'n13',
    message: 'Campaign “Holiday Promo” moved to Draft status',
    read: false,
    createdAt: '2025-05-30T11:45:00Z', // May 30, 2025, 11:45 AM UTC
    type: 'status'
  },
  {
    id: 'n14',
    message: 'James Patel commented on your performance report',
    read: true,
    createdAt: '2025-05-26T10:20:00Z', // May 26, 2025, 10:20 AM UTC
    type: 'comment'
  }
];
