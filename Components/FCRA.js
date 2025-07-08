'use client';

import { useState, useEffect } from 'react';
import { Scale, FileText, AlertTriangle, DollarSign, Calendar, Send, Download, Eye, Plus, Clock, CheckCircle, XCircle, Users, BookOpen, Target, Gavel } from 'lucide-react';

const FCRAComponent = () => {
  const [showNewViolationForm, setShowNewViolationForm] = useState(false);
  const [violations, setViolations] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('fcraViolations');
      return saved ? JSON.parse(saved) : [
        {
          id: '1',
          type: 'failure_to_investigate',
          bureau: 'equifax',
          violation_date: '2024-11-15',
          dispute_date: '2024-10-15',
          creditor: 'Capital One',
          account: '****1234',
          status: 'documented',
          severity: 'high',
          potential_damages: 1000,
          evidence: ['dispute_letter.pdf', 'certified_mail_receipt.pdf'],
          description: 'Bureau failed to complete investigation within 30-day requirement',
          next_action: 'Send 623 dispute letter',
          next_action_date: '2024-12-20'
        },
        {
          id: '2',
          type: 'continued_reporting',
          bureau: 'transunion',
          violation_date: '2024-12-01',
          dispute_date: '2024-10-30',
          creditor: 'Chase Bank',
          account: '****5678',
          status: 'investigating',
          severity: 'medium',
          potential_damages: 500,
          evidence: ['dispute_response.pdf'],
          description: 'Continued reporting inaccurate information after dispute resolution',
          next_action: 'Document second violation',
          next_action_date: '2024-12-15'
        }
      ];
    }
    return [];
  });

  const [newViolation, setNewViolation] = useState({
    type: '',
    bureau: '',
    creditor: '',
    account: '',
    disputeDate: '',
    violationDate: '',
    description: '',
    evidence: []
  });

  const [selectedViolation, setSelectedViolation] = useState(null);
  const [showLetterPreview, setShowLetterPreview] = useState(false);

  // Save to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('fcraViolations', JSON.stringify(violations));
    }
  }, [violations]);

  const violationTypes = [
    {
      id: 'failure_to_investigate',
      name: 'Failure to Investigate (30 Days)',
      description: 'Bureau failed to complete investigation within 30 days',
      severity: 'high',
      damages: { min: 500, max: 1000 },
      statute: '15 U.S.C. § 1681i(a)',
      requirements: ['Proof of dispute submission', 'Proof of delivery', 'No response after 30 days']
    },
    {
      id: 'continued_reporting',
      name: 'Continued Reporting After Dispute',
      description: 'Reporting inaccurate information after being notified',
      severity: 'high',
      damages: { min: 500, max: 1000 },
      statute: '15 U.S.C. § 1681i(a)(5)',
      requirements: ['Evidence of inaccuracy', 'Proof of notification', 'Continued reporting']
    },
    {
      id: 'failure_to_provide_notice',
      name: 'Failure to Provide Required Notice',
      description: 'Failed to provide required disclosures or notices',
      severity: 'medium',
      damages: { min: 250, max: 500 },
      statute: '15 U.S.C. § 1681g',
      requirements: ['Request for disclosure', 'No proper response', 'Documentation of request']
    },
    {
      id: 'mixed_file',
      name: 'Mixed File Violation',
      description: 'Information belonging to another person on your report',
      severity: 'high',
      damages: { min: 750, max: 1500 },
      statute: '15 U.S.C. § 1681e(b)',
      requirements: ['Proof of mixed information', 'Identity verification', 'Notification to bureau']
    },
    {
      id: 'identity_theft_procedures',
      name: 'Identity Theft Procedures Not Followed',
      description: 'Failed to follow proper identity theft procedures',
      severity: 'high',
      damages: { min: 1000, max: 2500 },
      statute: '15 U.S.C. § 1681c-2',
      requirements: ['Identity theft report', 'Police report', 'Affidavit', 'Proof of procedures not followed']
    },
    {
      id: 'willful_violation',
      name: 'Willful Non-Compliance',
      description: 'Intentional violation of FCRA requirements',
      severity: 'critical',
      damages: { min: 1000, max: 5000 },
      statute: '15 U.S.C. § 1681n',
      requirements: ['Pattern of violations', 'Evidence of intent', 'Multiple documented violations']
    },
    {
      id: 'furnisher_violation',
      name: 'Furnisher Violation',
      description: 'Creditor failed to investigate or update information',
      severity: 'medium',
      damages: { min: 300, max: 800 },
      statute: '15 U.S.C. § 1681s-2',
      requirements: ['Notice to furnisher', 'Failure to investigate', 'Continued inaccurate reporting']
    }
  ];

  const legalLetterTemplates = {
    failure_to_investigate: (violation) => `
[Date]

${violation.bureau.charAt(0).toUpperCase() + violation.bureau.slice(1)}
Legal Department
[Address]

RE: FCRA Violation - Failure to Investigate Within 30 Days
Consumer: [Your Name]
File Number: [Your File Number]

Dear Legal Department,

This letter serves as formal notice of your violation of the Fair Credit Reporting Act (FCRA), specifically 15 U.S.C. § 1681i(a)(1).

FACTUAL BACKGROUND:
On ${new Date(violation.dispute_date).toLocaleDateString()}, I submitted a dispute to your agency regarding inaccurate information on my credit report for account ${violation.account} with ${violation.creditor}.

The disputed item was submitted via certified mail with proper documentation. Your agency was required under 15 U.S.C. § 1681i(a)(1) to complete its investigation within thirty (30) days of receipt.

VIOLATION:
As of ${new Date(violation.violation_date).toLocaleDateString()}, more than thirty (30) days have elapsed since you received my dispute, and you have failed to:
1. Complete the required investigation
2. Provide the results of your investigation
3. Remove or correct the inaccurate information

This constitutes a clear violation of FCRA Section 611(a)(1), which mandates completion of investigations within thirty days.

LEGAL AUTHORITY:
The FCRA requires credit reporting agencies to complete investigations within 30 days of receipt of a dispute. Failure to do so violates federal law and subjects your company to liability under 15 U.S.C. § 1681n and § 1681o.

DAMAGES:
Your violation has caused me:
- Continued damage to my credit score and creditworthiness
- Inability to obtain credit on favorable terms
- Emotional distress and frustration
- Time and expense in pursuing this matter

DEMAND:
I hereby demand that you:
1. Immediately remove the disputed item from my credit report
2. Provide written confirmation of the removal
3. Send updated credit reports to all parties who received reports in the past 6 months
4. Compensate me for damages in the amount of $${violation.potential_damages}

If this matter is not resolved within fifteen (15) days of your receipt of this letter, I will be forced to pursue all available legal remedies, including but not limited to filing a lawsuit seeking actual damages, statutory damages up to $1,000, punitive damages, and attorney's fees under 15 U.S.C. § 1681n.

I trust you will give this matter your immediate attention and resolve it promptly.

Sincerely,

[Your Name]
[Your Address]
[Phone Number]
[Email]

CC: Consumer Financial Protection Bureau
    [State] Attorney General
    Federal Trade Commission

Enclosures:
- Copy of original dispute letter
- Certified mail receipt
- Copy of credit report showing continued reporting
`,

    continued_reporting: (violation) => `
[Date]

${violation.bureau.charAt(0).toUpperCase() + violation.bureau.slice(1)}
Legal Compliance Department
[Address]

RE: FCRA Section 1681i(a)(5) Violation - Continued Inaccurate Reporting
Consumer: [Your Name]
Reference: Account ${violation.account} - ${violation.creditor}

Dear Legal Compliance Team,

I am writing to notify you of a serious violation of the Fair Credit Reporting Act, specifically 15 U.S.C. § 1681i(a)(5)(A), regarding your continued reporting of inaccurate information after being properly notified of its inaccuracy.

VIOLATION DETAILS:
- Initial Dispute Date: ${new Date(violation.dispute_date).toLocaleDateString()}
- Account in Question: ${violation.creditor} - ${violation.account}
- Violation: Continued reporting of inaccurate information after notification

LEGAL REQUIREMENT:
FCRA Section 1681i(a)(5)(A) explicitly states that if a credit reporting agency determines that disputed information is inaccurate or cannot be verified, it must promptly delete the item from the consumer's file. Furthermore, once notified of inaccurate information, continued reporting of such information constitutes a willful violation of the FCRA.

YOUR VIOLATION:
Despite being properly notified of the inaccuracy of the above-referenced account information, your agency has continued to report this inaccurate information on my credit report. This continued reporting after notification constitutes a violation of federal law.

DAMAGES SUSTAINED:
Your violation has resulted in:
- Continued depression of my credit score
- Denial of credit applications
- Higher interest rates on approved credit
- Damage to my reputation and creditworthiness
- Emotional distress and mental anguish

STATUTORY VIOLATIONS:
Your actions violate the following FCRA provisions:
- 15 U.S.C. § 1681i(a)(5)(A) - Duty to remove inaccurate information
- 15 U.S.C. § 1681e(b) - Reasonable procedures requirement
- 15 U.S.C. § 1681n - Willful non-compliance

DEMAND FOR RESOLUTION:
To resolve this violation, I demand that you immediately:
1. Permanently remove the inaccurate information from my credit file
2. Provide written confirmation of the permanent deletion
3. Send corrected credit reports to all parties who received reports containing this information within the past 24 months
4. Compensate me $${violation.potential_damages} for damages caused by this violation

NOTICE OF INTENT TO SUE:
If this matter is not resolved within 30 days of your receipt of this letter, I will commence legal action against your company seeking:
- Actual damages pursuant to 15 U.S.C. § 1681o
- Statutory damages up to $1,000 pursuant to 15 U.S.C. § 1681n
- Punitive damages for willful violation
- Attorney's fees and costs
- Injunctive relief

This letter serves as my final attempt to resolve this matter outside of litigation.

Respectfully,

[Your Name]
[Your Information]

CC: Consumer Financial Protection Bureau
    Federal Trade Commission
`
  };

  const handleCreateViolation = () => {
    if (!newViolation.type || !newViolation.bureau || !newViolation.disputeDate) {
      alert('Please fill in all required fields');
      return;
    }

    const violationType = violationTypes.find(vt => vt.id === newViolation.type);
    const violation = {
      id: Math.random().toString(36).substr(2, 9),
      type: newViolation.type,
      bureau: newViolation.bureau,
      creditor: newViolation.creditor,
      account: newViolation.account,
      dispute_date: newViolation.disputeDate,
      violation_date: newViolation.violationDate || new Date().toISOString().split('T')[0],
      description: newViolation.description || violationType.description,
      status: 'documented',
      severity: violationType.severity,
      potential_damages: violationType.damages.min + Math.floor(Math.random() * (violationType.damages.max - violationType.damages.min)),
      evidence: [],
      next_action: 'Review evidence and send demand letter',
      next_action_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    };

    setViolations(prev => [violation, ...prev]);
    setNewViolation({
      type: '',
      bureau: '',
      creditor: '',
      account: '',
      disputeDate: '',
      violationDate: '',
      description: '',
      evidence: []
    });
    setShowNewViolationForm(false);
  };

  const generateLegalLetter = (violation) => {
    const template = legalLetterTemplates[violation.type];
    return template ? template(violation) : 'Template not available for this violation type.';
  };

  const updateViolationStatus = (violationId, newStatus) => {
    setViolations(prev => prev.map(violation => 
      violation.id === violationId 
        ? { ...violation, status: newStatus }
        : violation
    ));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'legal_action': return 'bg-purple-100 text-purple-800';
      case 'demand_sent': return 'bg-blue-100 text-blue-800';
      case 'documented': return 'bg-yellow-100 text-yellow-800';
      case 'investigating': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const totalPotentialDamages = violations.reduce((sum, v) => sum + v.potential_damages, 0);
  const activeViolations = violations.filter(v => v.status !== 'resolved').length;
  const criticalViolations = violations.filter(v => v.severity === 'critical' || v.severity === 'high').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">FCRA Violations</h1>
          <p className="text-gray-600">Track Fair Credit Reporting Act violations and generate legal demand letters</p>
        </div>
        <button
          onClick={() => setShowNewViolationForm(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Document Violation</span>
        </button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Violations</p>
              <p className="text-2xl font-bold text-red-600">{activeViolations}</p>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">{criticalViolations} critical/high severity</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Potential Damages</p>
              <p className="text-2xl font-bold text-green-600">${totalPotentialDamages.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">Statutory + actual damages</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Legal Actions</p>
              <p className="text-2xl font-bold text-purple-600">{violations.filter(v => v.status === 'legal_action').length}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Scale className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">Cases in progress</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Success Rate</p>
              <p className="text-2xl font-bold text-blue-600">78%</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Target className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">Violation resolution rate</p>
        </div>
      </div>

      {/* Critical Violations Alert */}
      {criticalViolations > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
          <div className="flex items-center space-x-3">
            <Gavel className="w-6 h-6 text-red-600" />
            <div>
              <h3 className="font-semibold text-red-800">Critical FCRA Violations Detected</h3>
              <p className="text-red-700">
                You have {criticalViolations} high-priority violations that may warrant immediate legal action. 
                Consider consulting with an FCRA attorney to maximize your recovery.
              </p>
            </div>
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 whitespace-nowrap">
              Find Attorney
            </button>
          </div>
        </div>
      )}

      {/* New Violation Form */}
      {showNewViolationForm && (
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="font-semibold text-gray-800 mb-6">Document New FCRA Violation</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Violation Type*</label>
              <select
                value={newViolation.type}
                onChange={(e) => setNewViolation(prev => ({ ...prev, type: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
              >
                <option value="">Select violation type</option>
                {violationTypes.map(type => (
                  <option key={type.id} value={type.id}>
                    {type.name} (${type.damages.min}-${type.damages.max} damages)
                  </option>
                ))}
              </select>
              {newViolation.type && (
                <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-700">{violationTypes.find(t => t.id === newViolation.type)?.description}</p>
                  <p className="text-xs text-gray-600 mt-1">
                    Statute: {violationTypes.find(t => t.id === newViolation.type)?.statute}
                  </p>
                </div>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Credit Bureau*</label>
                <select
                  value={newViolation.bureau}
                  onChange={(e) => setNewViolation(prev => ({ ...prev, bureau: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                >
                  <option value="">Select bureau</option>
                  <option value="equifax">Equifax</option>
                  <option value="transunion">TransUnion</option>
                  <option value="experian">Experian</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Original Dispute Date*</label>
                <input
                  type="date"
                  value={newViolation.disputeDate}
                  onChange={(e) => setNewViolation(prev => ({ ...prev, disputeDate: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Creditor</label>
                <input
                  type="text"
                  value={newViolation.creditor}
                  onChange={(e) => setNewViolation(prev => ({ ...prev, creditor: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                  placeholder="e.g., Capital One, Chase Bank"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Account Number</label>
                <input
                  type="text"
                  value={newViolation.account}
                  onChange={(e) => setNewViolation(prev => ({ ...prev, account: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                  placeholder="****1234"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Violation Description</label>
              <textarea
                value={newViolation.description}
                onChange={(e) => setNewViolation(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                placeholder="Describe the specific violation and how it occurred..."
              />
            </div>

            <div className="flex items-center space-x-3 pt-4">
              <button
                onClick={handleCreateViolation}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Document Violation
              </button>
              <button
                onClick={() => setShowNewViolationForm(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Violations List */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-800">Documented Violations</h3>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span>Total Damages: <span className="font-semibold text-green-600">${totalPotentialDamages.toLocaleString()}</span></span>
            </div>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {violations.length === 0 ? (
            <div className="p-8 text-center">
              <Scale className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h4 className="font-medium text-gray-800 mb-2">No FCRA Violations Documented</h4>
              <p className="text-gray-600 mb-4">Start documenting violations to build your legal case</p>
              <button
                onClick={() => setShowNewViolationForm(true)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Document First Violation
              </button>
            </div>
          ) : (
            violations.map((violation) => {
              const violationType = violationTypes.find(vt => vt.id === violation.type);
              return (
                <div key={violation.id} className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <h4 className="font-medium text-gray-800">{violationType?.name}</h4>
                      <span className="text-gray-500">•</span>
                      <span className="text-gray-600 capitalize">{violation.bureau}</span>
                      {violation.creditor && (
                        <>
                          <span className="text-gray-500">•</span>
                          <span className="text-gray-600">{violation.creditor}</span>
                        </>
                      )}
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`px-2 py-1 text-xs rounded-full border ${getSeverityColor(violation.severity)}`}>
                        {violation.severity}
                      </span>
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(violation.status)}`}>
                        {violation.status.replace('_', ' ')}
                      </span>
                      <div className="flex items-center space-x-1">
                        <button 
                          onClick={() => {
                            setSelectedViolation(violation);
                            setShowLetterPreview(true);
                          }}
                          className="p-1 text-gray-400 hover:text-blue-600 transition-colors" 
                          title="Generate Legal Letter"
                        >
                          <FileText className="w-4 h-4" />
                        </button>
                        <button 
                          className="p-1 text-gray-400 hover:text-green-600 transition-colors" 
                          title="Download Documentation"
                          onClick={() => alert('Download violation documentation')}
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        {violation.status === 'documented' && (
                          <button
                            onClick={() => updateViolationStatus(violation.id, 'demand_sent')}
                            className="p-1 text-gray-400 hover:text-blue-600 transition-colors" 
                            title="Mark Demand Sent"
                          >
                            <Send className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                    <span>Dispute Date: {new Date(violation.dispute_date).toLocaleDateString()}</span>
                    <span>•</span>
                    <span>Violation Date: {new Date(violation.violation_date).toLocaleDateString()}</span>
                    <span>•</span>
                    <span className="text-green-600 font-medium">
                      Potential Damages: ${violation.potential_damages.toLocaleString()}
                    </span>
                  </div>

                  <p className="text-sm text-gray-700 mb-3">{violation.description}</p>

                  {violation.next_action && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-blue-800">Next Action: {violation.next_action}</p>
                          <p className="text-xs text-blue-600">
                            Due: {new Date(violation.next_action_date).toLocaleDateString()}
                          </p>
                        </div>
                        <button className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700">
                          Complete Action
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Letter Preview Modal */}
      {showLetterPreview && selectedViolation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[80vh] overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="font-semibold text-gray-800">Legal Demand Letter Preview</h3>
              <button 
                onClick={() => setShowLetterPreview(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <pre className="whitespace-pre-wrap text-sm font-mono bg-gray-50 p-4 rounded-lg">
                {generateLegalLetter(selectedViolation)}
              </pre>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex items-center space-x-3">
              <button 
                onClick={() => alert('Download letter as PDF')}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Download PDF
              </button>
              <button 
                onClick={() => alert('Copy to clipboard')}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
              >
                Copy Text
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FCRA Education */}
      <div className="bg-gradient-to-r from-red-50 to-purple-50 border border-red-200 rounded-xl p-6">
        <h3 className="font-semibold text-gray-800 mb-4">⚖️ FCRA Violation Guide</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Most Common Violations:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 30-day investigation failure</li>
              <li>• Continued inaccurate reporting</li>
              <li>• Mixed file information</li>
              <li>• Identity theft procedure failures</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Required Evidence:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Certified mail receipts</li>
              <li>• Original dispute letters</li>
              <li>• Credit report copies</li>
              <li>• Response documentation</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Potential Damages:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Actual damages (provable losses)</li>
              <li>• Statutory damages ($100-$1,000)</li>
              <li>• Punitive damages (willful violations)</li>
              <li>• Attorney fees and costs</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FCRAComponent;
