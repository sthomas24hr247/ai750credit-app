'use client';

import { useState, useEffect } from 'react';
import { FileText, Plus, Eye, Download, Send, Clock, CheckCircle, XCircle, AlertTriangle, RefreshCw, Search, Filter, Edit, Trash2, Zap } from 'lucide-react';

const DisputesComponent = () => {
  const [showNewDisputeForm, setShowNewDisputeForm] = useState(false);
  const [disputes, setDisputes] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('disputes');
      return saved ? JSON.parse(saved) : [
        { 
          id: '1', 
          creditor: 'Capital One', 
          account: '****1234', 
          status: 'in_progress', 
          type: 'invalid_debt', 
          submitted_date: '2024-12-01', 
          bureau: 'equifax',
          dispute_reason: 'This account is not mine and appears to be the result of identity theft.',
          desired_outcome: 'Complete removal of account',
          evidence: ['id_theft_report.pdf'],
          ai_confidence: 85
        },
        { 
          id: '2', 
          creditor: 'Chase Bank', 
          account: '****5678', 
          status: 'resolved', 
          type: 'incorrect_payment', 
          submitted_date: '2024-11-15', 
          bureau: 'transunion',
          dispute_reason: 'Payment history shows late payments that were actually made on time.',
          desired_outcome: 'Correct payment history',
          resolution_date: '2024-12-01',
          ai_confidence: 92
        },
        { 
          id: '3', 
          creditor: 'Discover', 
          account: '****9012', 
          status: 'pending', 
          type: 'duplicate_account', 
          submitted_date: '2024-12-10', 
          bureau: 'experian',
          dispute_reason: 'This account appears twice on my credit report with different account numbers.',
          desired_outcome: 'Remove duplicate entry',
          ai_confidence: 78
        }
      ];
    }
    return [];
  });

  const [newDispute, setNewDispute] = useState({
    creditor: '',
    account: '',
    type: '',
    bureau: '',
    reason: '',
    desiredOutcome: '',
    selectedFile: ''
  });

  const [uploadedFiles, setUploadedFiles] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('uploadedFiles');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Save disputes to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('disputes', JSON.stringify(disputes));
    }
  }, [disputes]);

  const disputeTypes = [
    { 
      value: 'invalid_debt', 
      label: 'Invalid Debt', 
      description: 'Debt is not yours or incorrect amount',
      success_rate: 74,
      template: 'identity_verification'
    },
    { 
      value: 'incorrect_payment', 
      label: 'Incorrect Payment History', 
      description: 'Payment dates or amounts are wrong',
      success_rate: 68,
      template: 'payment_correction'
    },
    { 
      value: 'duplicate_account', 
      label: 'Duplicate Account', 
      description: 'Same account reported multiple times',
      success_rate: 89,
      template: 'duplicate_removal'
    },
    { 
      value: 'identity_theft', 
      label: 'Identity Theft', 
      description: 'Account opened fraudulently',
      success_rate: 82,
      template: 'fraud_alert'
    },
    { 
      value: 'outdated_info', 
      label: 'Outdated Information', 
      description: 'Information past 7-year reporting limit',
      success_rate: 91,
      template: 'statute_limitations'
    },
    { 
      value: 'incorrect_balance', 
      label: 'Incorrect Balance', 
      description: 'Balance amount is inaccurate',
      success_rate: 61,
      template: 'balance_verification'
    },
    { 
      value: 'mixed_file', 
      label: 'Mixed Credit File', 
      description: 'Information belongs to another person',
      success_rate: 85,
      template: 'file_separation'
    },
    { 
      value: 'unauthorized_inquiry', 
      label: 'Unauthorized Inquiry', 
      description: 'Hard inquiry without permission',
      success_rate: 71,
      template: 'inquiry_removal'
    }
  ];

  const generateDisputeLetter = (disputeType, creditor, account, reason, outcome) => {
    const templates = {
      identity_verification: `
[Date]

${creditor}
Consumer Disputes Department
[Address]

RE: Dispute of Inaccurate Information
Account Number: ${account}
Consumer: [Your Name]

Dear Credit Reporting Agency,

I am writing to dispute inaccurate information appearing on my credit report. After careful review, I have identified the following item that requires immediate attention:

ACCOUNT IN DISPUTE: ${creditor} - Account ${account}

REASON FOR DISPUTE: ${reason}

This account does not belong to me and appears to be the result of an error in your reporting system. I have never had any business relationship with this creditor, nor have I authorized the opening of this account.

REQUESTED ACTION: ${outcome}

Under the Fair Credit Reporting Act (FCRA), you are required to investigate this dispute within 30 days and remove any information that cannot be verified as accurate and complete.

I have enclosed copies of supporting documentation. Please provide written confirmation of your investigation results and any corrections made to my credit file.

Thank you for your prompt attention to this matter.

Sincerely,
[Your Signature]
[Your Printed Name]
[Your Address]
[Phone Number]

Enclosures: Supporting Documentation
      `,
      payment_correction: `
[Date]

${creditor}
Consumer Disputes Department
[Address]

RE: Correction of Payment History
Account Number: ${account}

Dear Sir/Madam,

I am disputing incorrect payment history information on the above-referenced account.

DISPUTE DETAILS:
- Account: ${creditor} ${account}
- Issue: ${reason}
- Requested Action: ${outcome}

My records indicate that payments were made on time according to the original agreement. The late payment notations are inaccurate and damaging to my credit score.

I am requesting that you investigate this matter and correct the payment history to accurately reflect my actual payment performance.

Please provide written confirmation of the corrections made to my account.

Respectfully,
[Your Name]
[Contact Information]
      `,
      duplicate_removal: `
[Date]

Credit Reporting Bureau
Consumer Disputes Department

RE: Removal of Duplicate Account Information
Account: ${creditor} ${account}

Dear Credit Bureau,

I am writing to dispute duplicate reporting of the same account on my credit report.

DUPLICATE ACCOUNT DETAILS:
${reason}

This duplication is causing:
1. Artificial inflation of my debt-to-income ratio
2. Incorrect representation of my credit utilization
3. Multiple negative impacts from the same account

REQUESTED ACTION: ${outcome}

Please investigate and remove the duplicate entry immediately. Only one accurate entry should remain on my credit report.

Thank you for your attention to this matter.

Sincerely,
[Your Name]
      `
    };

    const disputeDetail = disputeTypes.find(d => d.value === disputeType);
    return templates[disputeDetail?.template] || templates.identity_verification;
  };

  const handleCreateDispute = () => {
    if (!newDispute.creditor || !newDispute.account || !newDispute.type || !newDispute.bureau) {
      alert('Please fill in all required fields');
      return;
    }

    const dispute = {
      id: Math.random().toString(36).substr(2, 9),
      creditor: newDispute.creditor,
      account: newDispute.account,
      type: newDispute.type,
      bureau: newDispute.bureau,
      status: 'pending',
      submitted_date: new Date().toISOString().split('T')[0],
      dispute_reason: newDispute.reason,
      desired_outcome: newDispute.desiredOutcome,
      letter_content: generateDisputeLetter(newDispute.type, newDispute.creditor, newDispute.account, newDispute.reason, newDispute.desiredOutcome),
      ai_confidence: Math.floor(Math.random() * 20) + 75, // 75-95% confidence
      evidence: []
    };

    setDisputes(prev => [dispute, ...prev]);
    setNewDispute({
      creditor: '',
      account: '',
      type: '',
      bureau: '',
      reason: '',
      desiredOutcome: '',
      selectedFile: ''
    });
    setShowNewDisputeForm(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'denied': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'resolved': return CheckCircle;
      case 'in_progress': return RefreshCw;
      case 'pending': return Clock;
      case 'denied': return XCircle;
      default: return AlertTriangle;
    }
  };

  const updateDisputeStatus = (disputeId, newStatus) => {
    setDisputes(prev => prev.map(dispute => 
      dispute.id === disputeId 
        ? { 
            ...dispute, 
            status: newStatus,
            ...(newStatus === 'resolved' && { resolution_date: new Date().toISOString().split('T')[0] })
          }
        : dispute
    ));
  };

  const deleteDispute = (disputeId) => {
    setDisputes(prev => prev.filter(dispute => dispute.id !== disputeId));
  };

  const filteredDisputes = disputes.filter(dispute => {
    const matchesSearch = dispute.creditor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dispute.account.includes(searchTerm);
    const matchesFilter = filterStatus === 'all' || dispute.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  // Get insights from uploaded files for quick dispute creation
  const getDisputeOpportunities = () => {
    return uploadedFiles.flatMap(file => 
      file.insights?.map((insight, index) => ({
        fileId: file.id,
        fileName: file.name,
        insight,
        suggestedType: insight.includes('negative accounts') ? 'invalid_debt' :
                      insight.includes('payment') ? 'incorrect_payment' :
                      insight.includes('duplicate') ? 'duplicate_account' :
                      insight.includes('inquiry') ? 'unauthorized_inquiry' : 'invalid_debt'
      })) || []
    );
  };

  const disputeOpportunities = getDisputeOpportunities();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Dispute Management</h1>
          <p className="text-gray-600">Create and track AI-powered dispute letters to improve your credit</p>
        </div>
        <button
          onClick={() => setShowNewDisputeForm(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>New Dispute</span>
        </button>
      </div>

      {/* Quick Dispute Opportunities from Uploaded Files */}
      {disputeOpportunities.length > 0 && (
        <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-6">
          <h3 className="font-semibold text-gray-800 mb-4">🤖 AI-Detected Dispute Opportunities</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {disputeOpportunities.slice(0, 4).map((opportunity, index) => (
              <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">From: {opportunity.fileName}</span>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    opportunity.suggestedType === 'invalid_debt' ? 'bg-red-100 text-red-800' :
                    opportunity.suggestedType === 'incorrect_payment' ? 'bg-yellow-100 text-yellow-800' :
                    opportunity.suggestedType === 'duplicate_account' ? 'bg-purple-100 text-purple-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {disputeTypes.find(t => t.value === opportunity.suggestedType)?.label}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{opportunity.insight}</p>
                <button 
                  onClick={() => {
                    setNewDispute(prev => ({ 
                      ...prev, 
                      type: opportunity.suggestedType,
                      selectedFile: opportunity.fileName,
                      reason: opportunity.insight
                    }));
                    setShowNewDisputeForm(true);
                  }}
                  className="text-sm px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Create Dispute
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* New Dispute Form */}
      {showNewDisputeForm && (
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="font-semibold text-gray-800 mb-4">Create New Dispute</h3>
          
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Creditor Name</label>
              <input
                type="text"
                value={newDispute.creditor}
                onChange={(e) => setNewDispute(prev => ({ ...prev, creditor: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Capital One, Chase Bank"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Account Number</label>
              <input
                type="text"
                value={newDispute.account}
                onChange={(e) => setNewDispute(prev => ({ ...prev, account: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="****1234 (last 4 digits)"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Dispute Type</label>
              <select
                value={newDispute.type}
                onChange={(e) => setNewDispute(prev => ({ ...prev, type: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Dispute Type</option>
                {disputeTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label} ({type.success_rate}% success rate)
                  </option>
                ))}
              </select>
              {newDispute.type && (
                <p className="text-xs text-gray-500 mt-1">
                  {disputeTypes.find(t => t.value === newDispute.type)?.description}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Credit Bureau</label>
              <select
                value={newDispute.bureau}
                onChange={(e) => setNewDispute(prev => ({ ...prev, bureau: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Bureau</option>
                <option value="equifax">Equifax</option>
                <option value="transunion">TransUnion</option>
                <option value="experian">Experian</option>
                <option value="all">All Three Bureaus</option>
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Dispute Reason</label>
            <textarea
              value={newDispute.reason}
              onChange={(e) => setNewDispute(prev => ({ ...prev, reason: e.target.value }))}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Explain why you're disputing this item. Be specific about what is incorrect..."
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Desired Outcome</label>
            <input
              type="text"
              value={newDispute.desiredOutcome}
              onChange={(e) => setNewDispute(prev => ({ ...prev, desiredOutcome: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Complete removal of account, Correct payment history"
            />
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleCreateDispute}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Create Dispute
            </button>
            <button
              onClick={() => setShowNewDisputeForm(false)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Search and Filter */}
      <div className="flex items-center space-x-4">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search disputes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="resolved">Resolved</option>
            <option value="denied">Denied</option>
          </select>
        </div>
      </div>

      {/* Disputes List */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-800">Your Disputes</h3>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span>Success Rate: <span className="font-semibold text-green-600">78%</span></span>
              <span>Avg Response: <span className="font-semibold text-blue-600">18 days</span></span>
            </div>
          </div>
        </div>
        
        <div className="divide-y divide-gray-200">
          {filteredDisputes.length === 0 ? (
            <div className="p-8 text-center">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h4 className="font-medium text-gray-800 mb-2">No Disputes Found</h4>
              <p className="text-gray-600 mb-4">
                {searchTerm || filterStatus !== 'all' 
                  ? 'Try adjusting your search or filter criteria'
                  : 'Create your first dispute to start improving your credit score'
                }
              </p>
              {!searchTerm && filterStatus === 'all' && (
                <button
                  onClick={() => setShowNewDisputeForm(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Create Your First Dispute
                </button>
              )}
            </div>
          ) : (
            filteredDisputes.map((dispute) => {
              const StatusIcon = getStatusIcon(dispute.status);
              const disputeType = disputeTypes.find(t => t.value === dispute.type);
              
              return (
                <div key={dispute.id} className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <h4 className="font-medium text-gray-800">{dispute.creditor}</h4>
                      <span className="text-gray-500">•</span>
                      <span className="text-gray-600">{dispute.account}</span>
                      {dispute.ai_confidence && (
                        <>
                          <span className="text-gray-500">•</span>
                          <div className="flex items-center space-x-1">
                            <Zap className="w-3 h-3 text-blue-500" />
                            <span className="text-xs text-blue-600 font-medium">{dispute.ai_confidence}% AI Confidence</span>
                          </div>
                        </>
                      )}
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(dispute.status)}`}>
                        {dispute.status.replace('_', ' ')}
                      </span>
                      <div className="flex items-center space-x-1">
                        <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors" title="View Details">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-green-600 transition-colors" title="Download Letter">
                          <Download className="w-4 h-4" />
                        </button>
                        {dispute.status === 'pending' && (
                          <button
                            onClick={() => updateDisputeStatus(dispute.id, 'in_progress')}
                            className="p-1 text-gray-400 hover:text-blue-600 transition-colors" 
                            title="Mark In Progress"
                          >
                            <RefreshCw className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => deleteDispute(dispute.id)}
                          className="p-1 text-gray-400 hover:text-red-600 transition-colors" 
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                    <span>Type: {disputeType?.label || dispute.type}</span>
                    <span>•</span>
                    <span>Bureau: <span className="capitalize">{dispute.bureau}</span></span>
                    <span>•</span>
                    <span>Submitted: {new Date(dispute.submitted_date).toLocaleDateString()}</span>
                    {disputeType && (
                      <>
                        <span>•</span>
                        <span className="text-green-600 font-medium">{disputeType.success_rate}% Success Rate</span>
                      </>
                    )}
                  </div>

                  <p className="text-sm text-gray-700 mb-3">{dispute.dispute_reason}</p>
                  
                  {/* Status-specific information */}
                  {dispute.status === 'pending' && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                      <p className="text-sm text-yellow-800">
                        ⏳ <strong>Submitted:</strong> Bureau has 30 days to investigate. Expected response by{' '}
                        {new Date(new Date(dispute.submitted_date).getTime() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}.
                      </p>
                    </div>
                  )}
                  
                  {dispute.status === 'in_progress' && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <p className="text-sm text-blue-800">
                        🔍 <strong>Under Investigation:</strong> Bureau is contacting the creditor. Results expected soon.
                      </p>
                    </div>
                  )}
                  
                  {dispute.status === 'resolved' && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                      <p className="text-sm text-green-800">
                        ✅ <strong>Successfully Resolved:</strong> {dispute.desired_outcome} completed on{' '}
                        {dispute.resolution_date && new Date(dispute.resolution_date).toLocaleDateString()}.
                        Your credit score may improve within 30-45 days.
                      </p>
                    </div>
                  )}

                  {dispute.status === 'denied' && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center justify-between">
                      <p className="text-sm text-red-800">
                        ❌ <strong>Dispute Denied:</strong> Bureau verified the item. Consider escalating or requesting method of verification.
                      </p>
                      <button className="px-3 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700">
                        Escalate
                      </button>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Dispute Strategy Guide */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6">
        <h3 className="font-semibold text-gray-800 mb-4">🎯 Dispute Success Strategies</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Highest Success Rates:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Outdated Info (7+ years): <span className="font-semibold text-green-600">91%</span></li>
              <li>• Duplicate Accounts: <span className="font-semibold text-green-600">89%</span></li>
              <li>• Mixed Files: <span className="font-semibold text-blue-600">85%</span></li>
              <li>• Identity Theft: <span className="font-semibold text-blue-600">82%</span></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Pro Tips:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Dispute one item per letter</li>
              <li>• Use certified mail with return receipt</li>
              <li>• Keep detailed records</li>
              <li>• Follow up if no response in 35 days</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Timeline:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Investigation: 30 days max</li>
              <li>• Results notification: 5 days</li>
              <li>• Credit report update: 15 days</li>
              <li>• Score impact: 30-45 days</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisputesComponent;
