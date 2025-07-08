'use client';

import { useState, useEffect } from 'react';
import { FileText, Download, Send, AlertTriangle, CheckCircle, Plus, Eye } from 'lucide-react';

const DisputeGenerator = () => {
  const [disputes, setDisputes] = useState([
    { id: '1', creditor: 'Capital One', account: '****1234', status: 'in_progress', type: 'invalid_debt', submitted_date: '2024-12-01', bureau: 'equifax' },
    { id: '2', creditor: 'Chase Bank', account: '****5678', status: 'resolved', type: 'incorrect_payment', submitted_date: '2024-11-15', bureau: 'transunion' },
  ]);

  const [showNewDisputeForm, setShowNewDisputeForm] = useState(false);
  const [newDispute, setNewDispute] = useState({
    creditor: '',
    account: '',
    type: '',
    bureau: '',
    reason: ''
  });

  const disputeTypes = [
    { value: 'invalid_debt', label: 'Invalid Debt', section: '15 U.S.C. § 1681i(a)(2)' },
    { value: 'incorrect_payment', label: 'Incorrect Payment History', section: '15 U.S.C. § 1681i(a)(2)' },
    { value: 'duplicate_account', label: 'Duplicate Account', section: '15 U.S.C. § 1681e(b)' },
    { value: 'identity_theft', label: 'Identity Theft', section: '15 U.S.C. § 1681c-2' },
    { value: 'account_not_mine', label: 'Account Not Mine', section: '15 U.S.C. § 1681e(b)' },
    { value: 'incorrect_balance', label: 'Incorrect Balance', section: '15 U.S.C. § 1681i(a)(2)' },
    { value: 'outdated_info', label: 'Outdated Information', section: '15 U.S.C. § 1681c(a)(4)' },
    { value: 'mixed_file', label: 'Mixed Credit File', section: '15 U.S.C. § 1681e(b)' }
  ];

  const generateDisputeReason = (disputeType, creditor, account) => {
    const reasons = {
      invalid_debt: `I am writing to dispute the above-referenced account appearing on my credit report. This alleged debt is invalid and inaccurate for the following reasons:

1. I have no knowledge of this debt or any agreement with ${creditor || '[Creditor Name]'}
2. This appears to be an attempt to collect on a debt that is not mine
3. No original creditor information or validation has been provided
4. The account details for ${account || '[Account Number]'} do not correspond to any account I have held

Under the Fair Credit Reporting Act, 15 U.S.C. § 1681i(a)(2), you are required to conduct a reasonable investigation of any disputed information. Since this debt cannot be verified as accurate and complete, I request immediate removal of this item from my credit report.

Please provide written confirmation of the deletion of this account from my credit file within 30 days.`,

      incorrect_payment: `I am writing to dispute inaccurate payment history information on account ${account || '[Account Number]'} with ${creditor || '[Creditor Name]'}. The payment history being reported contains the following errors:

1. Late payments are being reported that were actually made on time
2. The payment dates and/or amounts shown are incorrect  
3. My records show all payments were made according to the original agreement

Under 15 U.S.C. § 1681i(a)(2), credit reporting agencies must conduct reasonable investigations of disputed information. The incorrect payment history violates 15 U.S.C. § 1681e(b), which requires maximum possible accuracy in credit reporting.

This inaccurate information is damaging my credit score and preventing me from obtaining credit at favorable terms. Please investigate this matter and correct the payment history to accurately reflect my actual payment performance.`,

      duplicate_account: `I am writing to dispute a duplicate account appearing on my credit report. Account ${account || '[Account Number]'} with ${creditor || '[Creditor Name]'} is being reported multiple times, which violates the Fair Credit Reporting Act's accuracy requirements under 15 U.S.C. § 1681e(b).

This duplication is causing:
1. Artificial inflation of my debt-to-income ratio
2. Incorrect representation of my credit utilization
3. Multiple negative impacts from the same account

The Fair Credit Reporting Act requires that information be reported accurately and completely. Multiple entries for the same account constitute a violation of this requirement. Please consolidate these duplicate entries and ensure only one accurate entry remains on my credit report.`,

      identity_theft: `I am writing to report that account ${account || '[Account Number]'} with ${creditor || '[Creditor Name]'} is the result of identity theft. This account was opened fraudulently without my knowledge or authorization.

Under 15 U.S.C. § 1681c-2, information that results from identity theft must be blocked from appearing on credit reports. I have:
1. Never had any business relationship with ${creditor || '[Creditor Name]'}
2. Never authorized anyone to open this account in my name
3. Filed appropriate identity theft reports
4. Placed fraud alerts on my credit files as permitted under 15 U.S.C. § 1681c-1

This fraudulent account should be immediately blocked and removed from my credit report pursuant to the identity theft provisions of the FCRA. I am not responsible for any charges, fees, or negative payment history associated with this account.`,

      account_not_mine: `I am disputing account ${account || '[Account Number]'} reported by ${creditor || '[Creditor Name]'} because this account does not belong to me. Under 15 U.S.C. § 1681e(b), credit reporting agencies must follow reasonable procedures to ensure maximum possible accuracy.

This account does not belong to me for the following reasons:
1. I have never had a business relationship with ${creditor || '[Creditor Name]'}
2. I did not authorize the opening of this account
3. The account information does not match my personal records
4. This appears to be a case of mistaken identity or mixed credit files

The continued reporting of this account violates the accuracy requirements of the Fair Credit Reporting Act. Please remove this account from my credit report immediately and provide written confirmation of the deletion.`,

      incorrect_balance: `I am disputing the balance amount being reported for account ${account || '[Account Number]'} with ${creditor || '[Creditor Name]'}. The balance shown on my credit report is inaccurate and violates 15 U.S.C. § 1681i(a)(2).

The balance being reported is incorrect for the following reasons:
1. The amount exceeds what was actually owed
2. Payments made have not been properly credited
3. Unauthorized fees or charges have been added
4. The account was settled for a different amount

Under the Fair Credit Reporting Act, all information must be accurate and complete. The incorrect balance reporting violates these requirements and is damaging my creditworthiness. Please investigate and correct the balance to reflect the accurate amount.`,

      outdated_info: `I am writing to dispute outdated information on my credit report regarding account ${account || '[Account Number]'} with ${creditor || '[Creditor Name]'}. This information violates the reporting time limits established under 15 U.S.C. § 1681c(a)(4).

Specifically:
1. This account is more than 7 years old from the date of first delinquency
2. The reporting period has expired and this information should be automatically excluded
3. Continued reporting of this obsolete information violates federal law

Under 15 U.S.C. § 1681c(a)(4), most negative information cannot be reported after 7 years. Please immediately remove this obsolete information from my credit report as it is no longer legally reportable under the Fair Credit Reporting Act.`,

      mixed_file: `I am writing to dispute account ${account || '[Account Number]'} with ${creditor || '[Creditor Name]'} which appears to belong to another individual. This represents a mixed credit file situation that violates 15 U.S.C. § 1681e(b).

Evidence that this account belongs to another person:
1. The account details do not match my personal information
2. I have never resided at the addresses associated with this account  
3. The account opening date conflicts with my known financial history
4. This appears to belong to someone with similar identifying information

Under the Fair Credit Reporting Act, credit reporting agencies must maintain reasonable procedures to ensure information belongs to the correct consumer. This mixed file situation violates these requirements and must be corrected immediately.

Please remove this account from my credit file as it belongs to another individual and provide written confirmation of the correction.`
    };

    return reasons[disputeType] || '';
  };

  // Auto-generate dispute reason when dispute type changes
  useEffect(() => {
    if (newDispute.type && (newDispute.creditor || newDispute.account)) {
      const generatedReason = generateDisputeReason(newDispute.type, newDispute.creditor, newDispute.account);
      setNewDispute(prev => ({ ...prev, reason: generatedReason }));
    }
  }, [newDispute.type, newDispute.creditor, newDispute.account]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'denied': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSubmitDispute = () => {
    if (!newDispute.creditor || !newDispute.account || !newDispute.type || !newDispute.bureau) {
      alert('Please fill in all required fields');
      return;
    }

    const dispute = {
      id: Math.random().toString(36).substr(2, 9),
      ...newDispute,
      status: 'pending',
      submitted_date: new Date().toISOString().split('T')[0]
    };

    setDisputes(prev => [dispute, ...prev]);
    setNewDispute({ creditor: '', account: '', type: '', bureau: '', reason: '' });
    setShowNewDisputeForm(false);
  };

  const downloadLetter = (dispute) => {
    const letterContent = `DISPUTE LETTER - ${dispute.type.toUpperCase()}

Date: ${new Date().toLocaleDateString()}

To: ${dispute.bureau.charAt(0).toUpperCase() + dispute.bureau.slice(1)} Credit Bureau

RE: Dispute of Credit Report Information
Account: ${dispute.account}
Creditor: ${dispute.creditor}

${dispute.reason || generateDisputeReason(dispute.type, dispute.creditor, dispute.account)}

Sincerely,
[Your Name]
[Your Address]
[City, State, ZIP]
[Phone Number]

Generated by AI750Credit - Professional Credit Repair Platform`;

    const blob = new Blob([letterContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Dispute_Letter_${dispute.creditor}_${dispute.account}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <FileText className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-800">FCRA Dispute Letter Generator</h1>
          </div>
          <p className="text-lg text-gray-600">AI-powered, legally compliant dispute letters with professional FCRA citations</p>
        </div>
        <button 
          onClick={() => setShowNewDisputeForm(true)}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Generate New Dispute</span>
        </button>
      </div>

      {/* Success Stats */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-4 text-white">
          <h3 className="font-semibold mb-1">Success Rate</h3>
          <div className="text-2xl font-bold">73%</div>
          <p className="text-green-100 text-sm">FCRA-compliant letters</p>
        </div>
        <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl p-4 text-white">
          <h3 className="font-semibold mb-1">Avg Response Time</h3>
          <div className="text-2xl font-bold">18 days</div>
          <p className="text-blue-100 text-sm">Legal 30-day requirement</p>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl p-4 text-white">
          <h3 className="font-semibold mb-1">Active Disputes</h3>
          <div className="text-2xl font-bold">{disputes.length}</div>
          <p className="text-purple-100 text-sm">Professional workflow</p>
        </div>
      </div>

      {/* New Dispute Form */}
      {showNewDisputeForm && (
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-800">Generate FCRA-Compliant Dispute Letter</h3>
            <button
              onClick={() => setShowNewDisputeForm(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
          
          {/* Quick Select from Credit Report */}
          <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
            <h4 className="font-medium text-green-800 mb-3">🔍 Quick Select from Your Credit Report</h4>
            <button
              onClick={() => setNewDispute(prev => ({
                ...prev,
                creditor: 'Real Estate Mortgage Servicer',
                account: '954709037****',
                type: 'incorrect_payment'
              }))}
              className="w-full flex items-center justify-between p-4 text-left border border-green-300 rounded-lg hover:bg-green-100 transition-colors"
            >
              <div>
                <p className="font-medium text-gray-800">Real Estate Mortgage Servicer</p>
                <p className="text-sm text-gray-600">Account: 954709037****</p>
                <p className="text-xs text-green-700 mt-1">
                  💡 Shows late payments and dispute history across bureaus
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="px-2 py-1 text-xs bg-orange-100 text-orange-800 rounded-full">Mortgage</span>
                <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">Late Payments</span>
              </div>
            </button>
          </div>

          {/* Manual Entry */}
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Creditor {newDispute.creditor && <span className="text-green-600">✓</span>}
              </label>
              <input
                type="text"
                value={newDispute.creditor}
                onChange={(e) => setNewDispute(prev => ({ ...prev, creditor: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter creditor name (e.g., Capital One)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Account Number {newDispute.account && <span className="text-green-600">✓</span>}
              </label>
              <input
                type="text"
                value={newDispute.account}
                onChange={(e) => setNewDispute(prev => ({ ...prev, account: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="****1234"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dispute Type {newDispute.type && <span className="text-green-600">✓ FCRA Section Selected</span>}
              </label>
              <select
                value={newDispute.type}
                onChange={(e) => setNewDispute(prev => ({ ...prev, type: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Dispute Type</option>
                {disputeTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label} ({type.section})
                  </option>
                ))}
              </select>
              {newDispute.type && (
                <p className="text-xs text-gray-500 mt-1">
                  📖 FCRA Section: {disputeTypes.find(t => t.value === newDispute.type)?.section}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Credit Bureau</label>
              <select
                value={newDispute.bureau}
                onChange={(e) => setNewDispute(prev => ({ ...prev, bureau: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Bureau</option>
                <option value="equifax">Equifax</option>
                <option value="transunion">TransUnion</option>
                <option value="experian">Experian</option>
                <option value="all">All Three Bureaus</option>
              </select>
            </div>
          </div>

          {/* Generated Letter Preview */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Professional Dispute Letter
              {newDispute.reason && newDispute.type && (
                <span className="text-blue-600 ml-2">🤖 FCRA-Compliant Auto-Generated</span>
              )}
            </label>
            <textarea
              value={newDispute.reason}
              onChange={(e) => setNewDispute(prev => ({ ...prev, reason: e.target.value }))}
              rows={12}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              placeholder="Select a dispute type above to auto-generate FCRA-compliant dispute language..."
            />
            
            {/* FCRA Compliance Notice */}
            {newDispute.reason && newDispute.type && (
              <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <h6 className="text-sm font-medium text-blue-800 mb-2">📋 FCRA Compliance Features:</h6>
                <ul className="text-xs text-blue-700 space-y-1">
                  <li>✅ Proper legal citations from 15 U.S.C. § 1681 (Fair Credit Reporting Act)</li>
                  <li>✅ Specific violation references for your dispute type</li>
                  <li>✅ Professional business language expected by credit bureaus</li>
                  <li>✅ Request for written confirmation and specific timelines</li>
                  <li>✅ Emphasis on accuracy requirements under federal law</li>
                </ul>
                <p className="text-xs text-blue-600 mt-2 font-medium">
                  💼 This letter follows FCRA guidelines and industry best practices for maximum effectiveness.
                </p>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleSubmitDispute}
              disabled={!newDispute.creditor || !newDispute.account || !newDispute.type || !newDispute.bureau}
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Generate & Track Dispute
            </button>
            <button
              onClick={() => setShowNewDisputeForm(false)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Active Disputes */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="font-semibold text-gray-800">Your FCRA Dispute Letters</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {disputes.length === 0 ? (
            <div className="p-8 text-center">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h4 className="font-medium text-gray-800 mb-2">No Disputes Generated Yet</h4>
              <p className="text-gray-600 mb-4">Create your first FCRA-compliant dispute letter</p>
              <button
                onClick={() => setShowNewDisputeForm(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Generate Your First Dispute Letter
              </button>
            </div>
          ) : (
            disputes.map((dispute) => (
              <div key={dispute.id} className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <h4 className="font-medium text-gray-800">{dispute.creditor}</h4>
                    <span className="text-gray-500">•</span>
                    <span className="text-gray-600">{dispute.account}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(dispute.status)}`}>
                      {dispute.status.replace('_', ' ')}
                    </span>
                    <button 
                      onClick={() => downloadLetter(dispute)}
                      className="flex items-center space-x-1 px-3 py-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      <span className="text-sm">Download</span>
                    </button>
                  </div>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span>Type: {dispute.type.replace('_', ' ')}</span>
                  <span>•</span>
                  <span>Bureau: <span className="capitalize">{dispute.bureau}</span></span>
                  <span>•</span>
                  <span>Submitted: {new Date(dispute.submitted_date).toLocaleDateString()}</span>
                  <span>•</span>
                  <span className="text-blue-600 font-medium">FCRA Compliant ✓</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default DisputeGenerator;
