import React, { useState } from 'react';
import { Campaign } from '../../../types';
import { mockCreators } from '../../../mockData';
import { CheckCircle, XCircle, MessageSquare, Eye, ThumbsUp } from 'lucide-react';
import Badge from '../../common/Badge';

interface ContentTabProps {
  campaign: Campaign;
}

// Mock content submissions
const mockSubmissions = [
  {
    id: 'submission1',
    creatorId: 'creator1',
    type: 'Instagram Post',
    submittedDate: '2025-06-05T14:30:00Z',
    status: 'pending',
    contentUrl: 'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    caption: 'Getting summer ready with the amazing new fitness app! Join me for the 30-day challenge. #SummerFitness #Ad',
    feedback: ''
  },
  {
    id: 'submission2',
    creatorId: 'creator3',
    type: 'TikTok Video',
    submittedDate: '2025-06-04T10:15:00Z',
    status: 'approved',
    contentUrl: 'https://images.pexels.com/photos/4662950/pexels-photo-4662950.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    caption: 'Day 1 of the fitness challenge! Watch my full routine on TikTok. #FitnessChallenge #Ad',
    feedback: 'Great energy and excellent demonstration of the app features!'
  },
  {
    id: 'submission3',
    creatorId: 'creator5',
    type: 'Instagram Story',
    submittedDate: '2025-06-03T16:45:00Z',
    status: 'revision',
    contentUrl: 'https://images.pexels.com/photos/6551144/pexels-photo-6551144.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    caption: 'Check out my workout routine using the new fitness app!',
    feedback: 'Please make sure to include the app name and hashtag in your caption.'
  }
];

const ContentTab: React.FC<ContentTabProps> = ({ campaign }) => {
  const [activeSubmission, setActiveSubmission] = useState<string | null>(null);
  
  const getCreatorById = (creatorId: string) => {
    return mockCreators.find(creator => creator.id === creatorId);
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="info" label="Pending Review" />;
      case 'approved':
        return <Badge variant="success" label="Approved" />;
      case 'revision':
        return <Badge variant="warning" label="Needs Revision" />;
      case 'rejected':
        return <Badge variant="error" label="Rejected" />;
      default:
        return null;
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-slate-800">Content Submissions</h3>
      
      <div className="overflow-hidden rounded-lg border border-slate-200">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                Creator
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                Content Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                Submitted
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {mockSubmissions.map(submission => {
              const creator = getCreatorById(submission.creatorId);
              return (
                <tr 
                  key={submission.id} 
                  className={`hover:bg-slate-50 ${activeSubmission === submission.id ? 'bg-slate-50' : ''}`}
                >
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center">
                      <div className="mr-3 h-8 w-8 flex-shrink-0 overflow-hidden rounded-full">
                        <img 
                          src={creator?.profilePic} 
                          alt={creator?.name} 
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-medium text-slate-800">{creator?.name}</div>
                        <div className="text-xs text-slate-500">{creator?.handle}</div>
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-700">
                    {submission.type}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-700">
                    {formatDate(submission.submittedDate)}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm">
                    {getStatusBadge(submission.status)}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm">
                    <div className="flex space-x-2">
                      <button 
                        className="rounded p-1 text-slate-500 hover:bg-slate-100 hover:text-primary-500"
                        onClick={() => setActiveSubmission(activeSubmission === submission.id ? null : submission.id)}
                      >
                        <Eye size={18} />
                      </button>
                      <button className="rounded p-1 text-slate-500 hover:bg-slate-100 hover:text-green-500">
                        <CheckCircle size={18} />
                      </button>
                      <button className="rounded p-1 text-slate-500 hover:bg-slate-100 hover:text-red-500">
                        <XCircle size={18} />
                      </button>
                      <button className="rounded p-1 text-slate-500 hover:bg-slate-100 hover:text-blue-500">
                        <MessageSquare size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      {/* Content Preview */}
      {activeSubmission && (
        <div className="mt-6 rounded-lg border border-slate-200 p-4">
          {(() => {
            const submission = mockSubmissions.find(s => s.id === activeSubmission);
            const creator = submission ? getCreatorById(submission.creatorId) : null;
            
            if (!submission || !creator) return null;
            
            return (
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <h4 className="text-lg font-medium text-slate-800">Content Preview</h4>
                  {getStatusBadge(submission.status)}
                </div>
                
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                  {/* Content Image/Video */}
                  <div>
                    <div className="mb-2 overflow-hidden rounded-lg">
                      <img 
                        src={submission.contentUrl} 
                        alt="Content preview" 
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center text-slate-500">
                          <ThumbsUp size={16} className="mr-1" />
                          <span className="text-sm">2.4K</span>
                        </div>
                        <div className="flex items-center text-slate-500">
                          <MessageSquare size={16} className="mr-1" />
                          <span className="text-sm">128</span>
                        </div>
                      </div>
                      <span className="text-xs text-slate-500">Estimated metrics</span>
                    </div>
                  </div>
                  
                  {/* Content Details */}
                  <div className="space-y-4">
                    <div>
                      <h5 className="mb-1 text-sm font-medium text-slate-700">Creator</h5>
                      <div className="flex items-center">
                        <div className="mr-2 h-6 w-6 overflow-hidden rounded-full">
                          <img 
                            src={creator.profilePic} 
                            alt={creator.name} 
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <span className="text-sm text-slate-800">{creator.name}</span>
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="mb-1 text-sm font-medium text-slate-700">Caption</h5>
                      <p className="text-sm text-slate-800">{submission.caption}</p>
                    </div>
                    
                    <div>
                      <h5 className="mb-1 text-sm font-medium text-slate-700">Submitted</h5>
                      <p className="text-sm text-slate-800">{formatDate(submission.submittedDate)}</p>
                    </div>
                    
                    {submission.feedback && (
                      <div>
                        <h5 className="mb-1 text-sm font-medium text-slate-700">Feedback</h5>
                        <p className="text-sm text-slate-800">{submission.feedback}</p>
                      </div>
                    )}
                    
                    {/* Action Buttons */}
                    <div className="flex space-x-2 pt-4">
                      {submission.status === 'pending' && (
                        <>
                          <button className="btn btn-primary flex-1">
                            Approve
                          </button>
                          <button className="btn btn-outline flex-1">
                            Request Changes
                          </button>
                        </>
                      )}
                      {submission.status === 'revision' && (
                        <button className="btn btn-primary flex-1">
                          Review Changes
                        </button>
                      )}
                      {submission.status === 'approved' && (
                        <button className="btn btn-outline flex-1">
                          View Analytics
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
};

export default ContentTab;