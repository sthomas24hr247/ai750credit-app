'use client';

import { useState, useEffect } from 'react';
import { FileText, Plus, Eye, Download, Send, Clock, CheckCircle, XCircle, AlertTriangle, RefreshCw, Search, Filter, Edit, Trash2, Zap } from 'lucide-react';
import { useAuth } from './AuthContext';
import { supabase } from '../lib/supabase';

const DisputesComponent = () => {
  const { user } = useAuth();
  const [showNewDisputeForm, setShowNewDisputeForm] = useState(false);
  const [disputes, setDisputes] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const [newDispute, setNewDispute] = useState({
    creditor: '',
    account: '',
    type: '',
    bureau: '',
    reason: '',
    desiredOutcome: '',
    selectedFile: ''
  });

  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (user?.id) {
      loadUserDisputes();
      loadUserFiles();
    }
  }, [user?.id]);

  // DEBUG FUNCTION
  const debugDisputesData = async () => {
    try {
      const { data: allDisputes, error } = await supabase
        .from('disputes')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      console.log('=== DEBUG DISPUTES DATA ===');
      console.log('Raw database data:', allDisputes);
      console.log('Number of disputes:', allDisputes?.length);
      
      const mockDisputes = allDisputes?.filter(dispute => 
        dispute.account_number?.includes('****1234') || 
        dispute.account_number?.includes('****5678') || 
        dispute.account_number?.includes('****9012')
      );
      
      console.log('Suspected mock disputes:', mockDisputes);
      
    } catch (err) {
      console.error('Debug error:', err);
    }
  };

  // CLEANUP FUNCTION
  const cleanupMockData = async () => {
    if (!confirm('This will delete suspected mock/test data. Are you sure?')) {
      return;
    }

    try {
      console.log('Cleaning up mock data...');
      
      const { error: deleteError } = await supabase
        .from('disputes')
        .delete()
        .eq('user_id', user.id)
        .in('account_number', ['****1234', '****5678', '****9012']);

      if (deleteError) {
        console.error('Error deleting mock data:', deleteError);
        alert('Error cleaning up data: ' + deleteError.message);
        return;
      }

      console.log('Mock data cleaned up successfully!');
      alert('Mock data cleaned up! Refreshing...');
      
      await loadUserDisputes();
      
    } catch (err) {
      console.error('Cleanup error:', err);
      alert('Error during cleanup: ' + err.message);
    }
  };

  const loadUserDisputes = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Loading disputes for user:', user.id);
      
      const { data, error: disputeError } = await supabase
        .from('disputes')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (disputeError) {
        throw disputeError;
      }

      console.log('Found disputes:', data?.length || 0);

      if (!data || data.length === 0) {
        console.log('No disputes found - showing empty state');
        setDisputes([]);
        setLoading(false);
        return;
      }

      const transformedDisputes = data.map(dispute => ({
        id: dispute.id,
        creditor: dispute.account_name || 'Unknown Creditor',
        account: dispute.account_number || 'Unknown Account',
        status: dispute.status || 'pending',
        type: dispute.dispute_type || 'invalid_debt',
        submitted_date: dispute.created_at?.split('T')[0] || new Date().toISOString().split('T')[0],
        bureau: dispute.bureau || 'unknown',
        dispute_reason: dispute.dispute_reason || '',
        desired_outcome: dispute.desired_outcome || '',
        resolution_date: dispute.resolution_date?.split('T')[0],
        letter_content: dispute.letter_content || '',
        ai_confidence: dispute.ai_confidence || Math.floor(Math.random() * 20) + 75,
        evidence: dispute.evidence || []
      }));

      console.log('Transformed disputes:', transformedDisputes);
      setDisputes(transformedDisputes);
      
    } catch (err) {
      console.error('Error loading disputes:', err);
      setError('Failed to load disputes. Please refresh the page.');
      setDisputes([]);
    } finally {
      setLoading(false);
    }
  };

  const loadUserFiles = async () => {
    try {
      const { data, error: filesError } = await supabase
        .from('uploaded_files')
        .select('*')
        .eq('user_id', user.id)
        .order('uploaded_at', { ascending: false });

      if (filesError) {
        console.error('Error loading files:', filesError);
        return;
      }

      const transformedFiles = data.map(file => ({
        id: file.id,
        name: file.file_name,
        size: file.file_size,
        type: file.file_type,
        uploadDate: file.uploaded_at,
        insights: []
      }));

      setUploadedFiles(transformedFiles);
    } catch (err) {
      console.error('Error loading files:', err);
    }
  };

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

  const handleCreateDispute = async () => {
    if (!newDispute.creditor || !newDispute.account || !newDispute.type || !newDispute.bureau) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      setSaving(true);
      setError(null);

      const { data, error: insertError } = await supabase
        .from('disputes')
        .insert([
          {
            user_id: user.id,
            account_name: newDispute.creditor,
            account_number: newDispute.account,
            dispute_type: newDispute.type,
            bureau: newDispute.bureau,
            dispute_reason: newDispute.reason,
            desired_outcome: newDispute.desiredOutcome,
            status: 'pending',
            ai_confidence: Math.floor(Math.random() * 20) + 75,
            evidence: [],
            created_at: new Date().toISOString()
          }
        ])
        .select();

      if (insertError) {
        throw insertError;
      }

      await loadUserDisputes();

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

    } catch (err) {
      console.error('Error creating dispute:', err);
      setError('Failed to create dispute. Please try again.');
    } finally {
      setSaving(false);
    }
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

  const deleteDispute = async (disputeId) => {
    if (!confirm('Are you sure you want to delete this dispute?')) {
      return;
    }

    try {
      const { error: deleteError } = await supabase
        .from('disputes')
        .delete()
        .eq('id', disputeId)
        .eq('user_id', user.id);

      if (deleteError) {
        throw deleteError;
      }

      setDisputes(prev => prev.filter(dispute => dispute.id !== disputeId));

    } catch (err) {
      console.error('Error deleting dispute:', err);
      setError('Failed to delete dispute.');
    }
  };

  const filteredDisputes = disputes.filter(dispute => {
    const matchesSearch = dispute.creditor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dispute.account.includes(searchTerm);
    const matchesFilter = filterStatus === 'all' || dispute.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  if (loading && disputes.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your disputes...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700">{error}</p>
          <button 
            onClick={() => setError(null)}
            className="text-sm text-red-600 hover:text-red-800 mt-2"
          >
            Dismiss
          </button>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Dispute Management</h1>
          <p className="text-gray-600">Create and track AI-powered dispute letters to improve your credit</p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowNewDisputeForm(true)}
            disabled={saving}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300"
          >
            <Plus className="w-4 h-4" />
            <span>{saving ? 'Creating...' : 'New Dispute'}</span>
          </button>
          
          <button
            onClick={debugDisputesData}
            className="px-3 py-2 bg-yellow-500 text-white rounded text-sm hover:bg-yellow-600"
            title="Debug: Check database contents"
          >
            Debug DB
          </button>
          <button
            onClick={cleanupMockData}
            className="px-3 py-2 bg-orange-500 text-white rounded text-sm hover:bg-orange-600"
            title="Clean up mock data"
          >
            Clean Mock
          </button>
        </div>
      </div>

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
                disabled={saving}
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
                disabled={saving}
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
                disabled={saving}
              >
                <option value="">Select Dispute Type</option>
                {disputeTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label} ({type.success_rate}% success rate)
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Credit Bureau</label>
              <select
                value={newDispute.bureau}
                onChange={(e) => setNewDispute(prev => ({ ...prev, bureau: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                disabled={saving}
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
              placeholder="Explain why you're disputing this item..."
              disabled={saving}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Desired Outcome</label>
            <input
              type="text"
              value={newDispute.desiredOutcome}
              onChange={(e) => setNewDispute(prev => ({ ...prev, desiredOutcome: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Complete removal of account"
              disabled={saving}
            />
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleCreateDispute}
              disabled={saving}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300"
            >
              {saving ? 'Creating...' : 'Create Dispute'}
            </button>
            <button
              onClick={() => setShowNewDisputeForm(false)}
              disabled={saving}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

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

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="font-semibold text-gray-800">Your Disputes</h3>
        </div>
        
        <div className="divide-y divide-gray-200">
          {filteredDisputes.length === 0 ? (
            <div className="p-8 text-center">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h4 className="font-medium text-gray-800 mb-2">No Disputes Found</h4>
              <p className="text-gray-600 mb-4">Create your first dispute to start improving your credit score</p>
              <button
                onClick={() => setShowNewDisputeForm(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Create Your First Dispute
              </button>
            </div>
          ) : (
            filteredDisputes.map((dispute) => (
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
                      onClick={() => deleteDispute(dispute.id)}
                      className="p-1 text-gray-400 hover:text-red-600 transition-colors" 
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                  <span>Type: {disputeTypes.find(t => t.value === dispute.type)?.label || dispute.type}</span>
                  <span>•</span>
                  <span>Bureau: <span className="capitalize">{dispute.bureau}</span></span>
                  <span>•</span>
                  <span>Submitted: {new Date(dispute.submitted_date).toLocaleDateString()}</span>
                </div>

                <p className="text-sm text-gray-700">{dispute.dispute_reason}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default DisputesComponent;
