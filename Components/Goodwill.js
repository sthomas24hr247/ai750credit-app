'use client';

import { useState, useEffect } from 'react';
import { Heart, Plus, Send, FileText, Download, Eye, Edit, Trash2, Clock, CheckCircle, XCircle, Mail, Target, Users, Zap, BookOpen, Star } from 'lucide-react';

const GoodwillComponent = () => {
  const [showNewLetterForm, setShowNewLetterForm] = useState(false);
  const [goodwillLetters, setGoodwillLetters] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('goodwillLetters');
      return saved ? JSON.parse(saved) : [
        {
          id: '1',
          creditor: 'Chase Bank',
          account: '****5678',
          template: 'late_payment',
          status: 'sent',
          sent_date: '2024-12-01',
          issue_type: 'Late Payment',
          reason: 'Medical emergency',
          success_rate: 68,
          follow_up_date: '2024-12-15'
        },
        {
          id: '2',
          creditor: 'Capital One',
          account: '****1234',
          template: 'charge_off',
          status: 'pending',
          created_date: '2024-12-10',
          issue_type: 'Charge-off',
          reason: 'Job loss during pandemic',
          success_rate: 45
        }
      ];
    }
    return [];
  });

  const [newLetter, setNewLetter] = useState({
    creditor: '',
    account: '',
    template: '',
    reason: '',
    personalStory: '',
    currentStatus: '',
    requestType: ''
  });

  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [previewLetter, setPreviewLetter] = useState('');

  // Save to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('goodwillLetters', JSON.stringify(goodwillLetters));
    }
  }, [goodwillLetters]);

  const letterTemplates = [
    {
      id: 'late_payment',
      name: 'Late Payment Removal',
      description: 'Request removal of late payment marks',
      success_rate: 68,
      best_for: 'Isolated late payments with good explanation',
      icon: Clock,
      color: 'blue'
    },
    {
      id: 'charge_off',
      name: 'Charge-off Removal',
      description: 'Request removal of charge-off status',
      success_rate: 45,
      best_for: 'Paid charge-offs with hardship story',
      icon: XCircle,
      color: 'red'
    },
    {
      id: 'collection',
      name: 'Collection Removal',
      description: 'Request removal from collections',
      success_rate: 52,
      best_for: 'Paid collections or payment plans',
      icon: Target,
      color: 'orange'
    },
    {
      id: 'overlimit',
      name: 'Over-limit Fee Removal',
      description: 'Request removal of over-limit penalties',
      success_rate: 75,
      best_for: 'Good payment history otherwise',
      icon: FileText,
      color: 'purple'
    },
    {
      id: 'bankruptcy',
      name: 'Post-Bankruptcy Goodwill',
      description: 'Request consideration after bankruptcy',
      success_rate: 35,
      best_for: 'Rebuilding credit post-bankruptcy',
      icon: Users,
      color: 'gray'
    },
    {
      id: 'medical',
      name: 'Medical Debt Removal',
      description: 'Request removal of medical collections',
      success_rate: 78,
      best_for: 'Medical emergencies and hardships',
      icon: Heart,
      color: 'green'
    }
  ];

  const reasonOptions = [
    'Medical emergency',
    'Job loss',
    'Divorce/separation',
    'Death in family',
    'Natural disaster',
    'Military deployment',
    'Economic hardship',
    'Identity theft',
    'Bank error',
    'Other'
  ];

  const generateGoodwillLetter = (template, creditor, account, reason, personalStory, currentStatus) => {
    const templates = {
      late_payment: `[Date]

${creditor}
Customer Relations Department
[Address]

RE: Goodwill Request for Account ${account}
Dear Customer Relations Team,

I hope this letter finds you well. I am writing to request your consideration in removing a late payment notation from my credit report for account ${account}.

I have been a loyal customer of ${creditor} and have always strived to maintain a positive relationship with your institution. Unfortunately, due to ${reason}, I experienced a temporary financial hardship that resulted in a late payment on my account.

${personalStory}

Since this incident, I have taken the following steps to ensure it doesn't happen again:
- Set up automatic payments
- Improved my financial planning
- Built an emergency fund

I understand that you are not obligated to make this adjustment, but I am hoping you will consider this request as a gesture of goodwill. This isolated incident does not reflect my true character as a responsible borrower, and I would be incredibly grateful for your assistance in removing this mark from my credit report.

Current account status: ${currentStatus}

I have learned from this experience and am committed to maintaining an excellent payment history moving forward. Your understanding and assistance would mean the world to me as I work to rebuild my credit.

Thank you for taking the time to consider my request. I look forward to your positive response and continuing our business relationship.

Sincerely,
[Your Name]
[Your Address]
[Phone Number]
[Email]

Account Information:
- Account Number: ${account}
- Name on Account: [Your Name]
- Request: Remove late payment notation from [Date]`,

      charge_off: `[Date]

${creditor}
Executive Customer Relations
[Address]

RE: Goodwill Deletion Request - Account ${account}

Dear Executive Team,

I am writing to humbly request your assistance with my credit report regarding account ${account}, which currently shows a charge-off status.

I take full responsibility for the financial difficulties that led to this situation. ${reason} created an unexpected hardship that significantly impacted my ability to meet my financial obligations during that period.

${personalStory}

I want to emphasize that this situation was truly exceptional and not representative of my normal financial behavior. Since that time, I have:
- Taken control of my finances
- Developed better budgeting skills
- ${currentStatus}

I understand that ${creditor} had every right to charge off this account, and I am not disputing the validity of the debt. However, I am respectfully requesting that you consider removing this charge-off from my credit report as an act of goodwill.

This removal would provide me with a fresh start and the opportunity to rebuild my credit responsibly. I am committed to being a better customer and managing my finances more effectively going forward.

I would be eternally grateful for your consideration of this request. Your goodwill gesture would not only help me personally but would also demonstrate ${creditor}'s commitment to helping customers during difficult times.

Thank you for your time and consideration.

Respectfully yours,
[Your Name]
[Contact Information]`,

      medical: `[Date]

${creditor}
Customer Care Department
[Address]

RE: Medical Hardship - Goodwill Removal Request
Account: ${account}

Dear Customer Care Team,

I am reaching out to request your compassionate consideration regarding negative reporting on my account ${account} due to medical circumstances beyond my control.

${personalStory}

As you may understand, medical emergencies can create unexpected financial burdens that are completely outside of one's control. Despite my best efforts to maintain all my financial obligations, the medical situation resulted in ${reason}, which temporarily affected my ability to make payments on time.

I have always been committed to honoring my financial responsibilities, and this medical situation was truly an exception to my normal payment behavior. Since recovering from this health issue, I have:
- Resumed regular payments
- ${currentStatus}
- Taken steps to prevent future payment issues

Given the medical nature of this hardship, I am respectfully requesting that ${creditor} consider removing the negative marks associated with this account as a gesture of goodwill and compassion.

Medical emergencies are among life's most challenging experiences, both physically and financially. Your understanding and assistance during this difficult time would be incredibly meaningful to me and my family.

I believe this request aligns with ${creditor}'s reputation for treating customers with compassion during their most difficult moments. I am hopeful that you will consider this request favorably.

Thank you for your time, consideration, and understanding.

With sincere gratitude,
[Your Name]
[Contact Information]

Supporting Documentation Available Upon Request:
- Medical records
- Payment history
- Current account status`
    };

    return templates[template] || templates.late_payment;
  };

  const handleCreateLetter = () => {
    if (!newLetter.creditor || !newLetter.template) {
      alert('Please fill in the required fields');
      return;
    }

    const template = letterTemplates.find(t => t.id === newLetter.template);
    const letter = {
      id: Math.random().toString(36).substr(2, 9),
      creditor: newLetter.creditor,
      account: newLetter.account,
      template: newLetter.template,
      issue_type: template.name,
      reason: newLetter.reason,
      personal_story: newLetter.personalStory,
      current_status: newLetter.currentStatus,
      status: 'draft',
      created_date: new Date().toISOString().split('T')[0],
      success_rate: template.success_rate,
      letter_content: generateGoodwillLetter(
        newLetter.template,
        newLetter.creditor,
        newLetter.account,
        newLetter.reason,
        newLetter.personalStory,
        newLetter.currentStatus
      )
    };

    setGoodwillLetters(prev => [letter, ...prev]);
    setNewLetter({
      creditor: '',
      account: '',
      template: '',
      reason: '',
      personalStory: '',
      currentStatus: '',
      requestType: ''
    });
    setShowNewLetterForm(false);
  };

  const updateLetterStatus = (letterId, newStatus) => {
    setGoodwillLetters(prev => prev.map(letter => 
      letter.id === letterId 
        ? { 
            ...letter, 
            status: newStatus,
            ...(newStatus === 'sent' && { sent_date: new Date().toISOString().split('T')[0] }),
            ...(newStatus === 'successful' && { success_date: new Date().toISOString().split('T')[0] })
          }
        : letter
    ));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'successful': return 'bg-green-100 text-green-800';
      case 'sent': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'denied': return 'bg-red-100 text-red-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const successfulLetters = goodwillLetters.filter(l => l.status === 'successful').length;
  const totalSent = goodwillLetters.filter(l => l.status !== 'draft').length;
  const overallSuccessRate = totalSent > 0 ? Math.round((successfulLetters / totalSent) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Goodwill Letters</h1>
          <p className="text-gray-600">Request creditors to remove negative items as a gesture of goodwill</p>
        </div>
        <button
          onClick={() => setShowNewLetterForm(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>New Goodwill Letter</span>
        </button>
      </div>

      {/* Success Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Letters Sent</p>
              <p className="text-2xl font-bold text-gray-900">{totalSent}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Mail className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">{goodwillLetters.filter(l => l.status === 'draft').length} drafts pending</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Success Rate</p>
              <p className="text-2xl font-bold text-green-600">{overallSuccessRate}%</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">{successfulLetters} successful removals</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Est. Score Impact</p>
              <p className="text-2xl font-bold text-purple-600">+{successfulLetters * 12}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Star className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">Points from removals</p>
        </div>
      </div>

      {/* Template Selection */}
      {showNewLetterForm && (
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="font-semibold text-gray-800 mb-6">Create New Goodwill Letter</h3>
          
          {/* Template Selection */}
          {!newLetter.template && (
            <div>
              <h4 className="font-medium text-gray-700 mb-4">Choose Letter Template</h4>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {letterTemplates.map((template) => {
                  const IconComponent = template.icon;
                  return (
                    <div
                      key={template.id}
                      onClick={() => setNewLetter(prev => ({ ...prev, template: template.id }))}
                      className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 cursor-pointer transition-colors group"
                    >
                      <div className="flex items-center space-x-3 mb-3">
                        <div className={`p-2 rounded-lg bg-${template.color}-100 group-hover:bg-${template.color}-200`}>
                          <IconComponent className={`w-5 h-5 text-${template.color}-600`} />
                        </div>
                        <div>
                          <h5 className="font-medium text-gray-800">{template.name}</h5>
                          <p className="text-xs text-green-600 font-medium">{template.success_rate}% success rate</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{template.description}</p>
                      <p className="text-xs text-gray-500">Best for: {template.best_for}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Letter Form */}
          {newLetter.template && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-gray-700">
                  {letterTemplates.find(t => t.id === newLetter.template)?.name} Letter
                </h4>
                <button
                  onClick={() => setNewLetter(prev => ({ ...prev, template: '' }))}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Change Template
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Creditor Name*</label>
                  <input
                    type="text"
                    value={newLetter.creditor}
                    onChange={(e) => setNewLetter(prev => ({ ...prev, creditor: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    placeholder="e.g., Chase Bank, Capital One"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Account Number</label>
                  <input
                    type="text"
                    value={newLetter.account}
                    onChange={(e) => setNewLetter(prev => ({ ...prev, account: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    placeholder="****1234 (last 4 digits)"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Reason for Hardship</label>
                <select
                  value={newLetter.reason}
                  onChange={(e) => setNewLetter(prev => ({ ...prev, reason: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Select reason</option>
                  {reasonOptions.map(reason => (
                    <option key={reason} value={reason}>{reason}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Personal Story</label>
                <textarea
                  value={newLetter.personalStory}
                  onChange={(e) => setNewLetter(prev => ({ ...prev, personalStory: e.target.value }))}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  placeholder="Explain your specific situation and how it affected your ability to pay. Be honest and detailed..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Account Status</label>
                <input
                  type="text"
                  value={newLetter.currentStatus}
                  onChange={(e) => setNewLetter(prev => ({ ...prev, currentStatus: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  placeholder="e.g., Account paid in full, Payment plan established"
                />
              </div>

              <div className="flex items-center space-x-3 pt-4">
                <button
                  onClick={handleCreateLetter}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Generate Letter
                </button>
                <button
                  onClick={() => setShowNewLetterForm(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Letters List */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-800">Your Goodwill Letters</h3>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span>Success Rate: <span className="font-semibold text-green-600">{overallSuccessRate}%</span></span>
            </div>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {goodwillLetters.length === 0 ? (
            <div className="p-8 text-center">
              <Heart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h4 className="font-medium text-gray-800 mb-2">No Goodwill Letters Yet</h4>
              <p className="text-gray-600 mb-4">Create your first goodwill letter to start removing negative items</p>
              <button
                onClick={() => setShowNewLetterForm(true)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Create Your First Letter
              </button>
            </div>
          ) : (
            goodwillLetters.map((letter) => {
              const template = letterTemplates.find(t => t.id === letter.template);
              return (
                <div key={letter.id} className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <h4 className="font-medium text-gray-800">{letter.creditor}</h4>
                      {letter.account && (
                        <>
                          <span className="text-gray-500">•</span>
                          <span className="text-gray-600">{letter.account}</span>
                        </>
                      )}
                      <span className="text-gray-500">•</span>
                      <span className="text-sm text-gray-600">{letter.issue_type}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(letter.status)}`}>
                        {letter.status.replace('_', ' ')}
                      </span>
                      <div className="flex items-center space-x-1">
                        <button 
                          className="p-1 text-gray-400 hover:text-blue-600 transition-colors" 
                          title="View Letter"
                          onClick={() => alert('View letter content')}
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button 
                          className="p-1 text-gray-400 hover:text-green-600 transition-colors" 
                          title="Download"
                          onClick={() => alert('Download letter')}
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        {letter.status === 'draft' && (
                          <button
                            onClick={() => updateLetterStatus(letter.id, 'sent')}
                            className="p-1 text-gray-400 hover:text-blue-600 transition-colors" 
                            title="Mark as Sent"
                          >
                            <Send className="w-4 h-4" />
                          </button>
                        )}
                        {letter.status === 'sent' && (
                          <button
                            onClick={() => updateLetterStatus(letter.id, 'successful')}
                            className="p-1 text-gray-400 hover:text-green-600 transition-colors" 
                            title="Mark Successful"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                    <span>Template: {template?.name}</span>
                    <span>•</span>
                    <span>Success Rate: <span className="text-green-600 font-medium">{letter.success_rate}%</span></span>
                    <span>•</span>
                    <span>
                      {letter.status === 'draft' ? 'Created' : 
                       letter.status === 'sent' ? 'Sent' : 'Created'}: {' '}
                      {new Date(letter.sent_date || letter.created_date).toLocaleDateString()}
                    </span>
                  </div>

                  {letter.reason && (
                    <p className="text-sm text-gray-700 mb-2">Reason: {letter.reason}</p>
                  )}

                  {/* Status-specific actions */}
                  {letter.status === 'sent' && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-3">
                      <p className="text-sm text-blue-800">
                        📬 <strong>Letter Sent:</strong> Follow up in 30-45 days if no response. 
                        Track your response and update the status when you hear back.
                      </p>
                    </div>
                  )}

                  {letter.status === 'successful' && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3 mt-3">
                      <p className="text-sm text-green-800">
                        🎉 <strong>Success!</strong> Negative item removed. Your credit score should improve in 30-45 days.
                        Consider getting an updated credit report to confirm the removal.
                      </p>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Success Tips */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-6">
        <h3 className="font-semibold text-gray-800 mb-4">💡 Goodwill Letter Success Tips</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Best Practices:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Be honest about your situation</li>
              <li>• Show you've changed your habits</li>
              <li>• Mention your loyalty as a customer</li>
              <li>• Keep the tone respectful and humble</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Timing Matters:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Send after account is current</li>
              <li>• Wait 6+ months after negative event</li>
              <li>• Follow up in 30-45 days</li>
              <li>• Try again if denied (different approach)</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Highest Success Rates:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Medical debt: <span className="font-semibold text-green-600">78%</span></li>
              <li>• Over-limit fees: <span className="font-semibold text-green-600">75%</span></li>
              <li>• Late payments: <span className="font-semibold text-blue-600">68%</span></li>
              <li>• Collections: <span className="font-semibold text-orange-600">52%</span></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoodwillComponent;
