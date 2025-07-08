'use client';

import { useState, useEffect } from 'react';
import { Users, Search, Filter, MoreHorizontal, Eye, Ban, UserCheck, UserX, TrendingUp, DollarSign, AlertTriangle, Calendar, Mail, Phone, CreditCard, Activity, Download, RefreshCw } from 'lucide-react';

const UserManagementComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [planFilter, setPlanFilter] = useState('all');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showUserDetails, setShowUserDetails] = useState(null);

  // Mock user data
  const [users] = useState([
    {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '+1 (555) 123-4567',
      status: 'active',
      plan: 'Pro',
      signupDate: '2024-07-15',
      lastLogin: '2024-12-10',
      totalSpent: 179.94,
      creditScore: { current: 720, change: +45 },
      disputes: { total: 12, resolved: 8, pending: 4 },
      location: 'New York, NY',
      paymentMethod: 'Visa ****4242',
      riskLevel: 'low'
    },
    {
      id: '2',
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah.j@email.com',
      phone: '+1 (555) 987-6543',
      status: 'active',
      plan: 'Premium',
      signupDate: '2024-06-20',
      lastLogin: '2024-12-09',
      totalSpent: 299.95,
      creditScore: { current: 685, change: +32 },
      disputes: { total: 18, resolved: 14, pending: 4 },
      location: 'Los Angeles, CA',
      paymentMethod: 'Mastercard ****8765',
      riskLevel: 'low'
    },
    {
      id: '3',
      firstName: 'Michael',
      lastName: 'Chen',
      email: 'mchen@gmail.com',
      phone: '+1 (555) 456-7890',
      status: 'suspended',
      plan: 'Basic',
      signupDate: '2024-08-30',
      lastLogin: '2024-11-25',
      totalSpent: 79.96,
      creditScore: { current: 595, change: +18 },
      disputes: { total: 6, resolved: 3, pending: 3 },
      location: 'Chicago, IL',
      paymentMethod: 'Visa ****1234',
      riskLevel: 'medium'
    },
    {
      id: '4',
      firstName: 'Emily',
      lastName: 'Rodriguez',
      email: 'emily.r@yahoo.com',
      phone: '+1 (555) 321-0987',
      status: 'trial',
      plan: 'Pro',
      signupDate: '2024-12-01',
      lastLogin: '2024-12-10',
      totalSpent: 0,
      creditScore: { current: 642, change: +12 },
      disputes: { total: 3, resolved: 1, pending: 2 },
      location: 'Houston, TX',
      paymentMethod: 'Trial',
      riskLevel: 'low'
    },
    {
      id: '5',
      firstName: 'David',
      lastName: 'Wilson',
      email: 'dwilson@hotmail.com',
      phone: '+1 (555) 654-3210',
      status: 'inactive',
      plan: 'Basic',
      signupDate: '2024-05-10',
      lastLogin: '2024-10-15',
      totalSpent: 159.94,
      creditScore: { current: 578, change: +25 },
      disputes: { total: 8, resolved: 5, pending: 3 },
      location: 'Phoenix, AZ',
      paymentMethod: 'Expired',
      riskLevel: 'high'
    },
    {
      id: '6',
      firstName: 'Lisa',
      lastName: 'Thompson',
      email: 'lisa.thompson@outlook.com',
      phone: '+1 (555) 789-0123',
      status: 'active',
      plan: 'Premium',
      signupDate: '2024-04-18',
      lastLogin: '2024-12-10',
      totalSpent: 449.93,
      creditScore: { current: 758, change: +67 },
      disputes: { total: 25, resolved: 22, pending: 3 },
      location: 'Miami, FL',
      paymentMethod: 'Amex ****9876',
      riskLevel: 'low'
    }
  ]);

  // Calculate metrics
  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.status === 'active').length;
  const trialUsers = users.filter(u => u.status === 'trial').length;
  const suspendedUsers = users.filter(u => u.status === 'suspended').length;
  const totalRevenue = users.reduce((sum, u) => sum + u.totalSpent, 0);
  const avgCreditScore = Math.round(users.reduce((sum, u) => sum + u.creditScore.current, 0) / users.length);

  // Filter users
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    const matchesPlan = planFilter === 'all' || user.plan === planFilter;
    
    return matchesSearch && matchesStatus && matchesPlan;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'trial': return 'bg-blue-100 text-blue-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleUserAction = (userId, action) => {
    const user = users.find(u => u.id === userId);
    switch (action) {
      case 'suspend':
        alert(`Suspending user: ${user.firstName} ${user.lastName}`);
        break;
      case 'activate':
        alert(`Activating user: ${user.firstName} ${user.lastName}`);
        break;
      case 'deactivate':
        alert(`Deactivating user: ${user.firstName} ${user.lastName}`);
        break;
      case 'view':
        setShowUserDetails(user);
        break;
      default:
        break;
    }
  };

  const handleBulkAction = (action) => {
    if (selectedUsers.length === 0) {
      alert('Please select users first');
      return;
    }
    alert(`Performing ${action} on ${selectedUsers.length} selected users`);
    setSelectedUsers([]);
  };

  const toggleUserSelection = (userId) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">User Management</h1>
          <p className="text-gray-600">Manage enrolled users, subscriptions, and account status</p>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => alert('Exporting user data...')}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
          <button 
            onClick={() => window.location.reload()}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">{totalUsers}</p>
            </div>
            <Users className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active</p>
              <p className="text-2xl font-bold text-green-600">{activeUsers}</p>
            </div>
            <UserCheck className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Trial</p>
              <p className="text-2xl font-bold text-blue-600">{trialUsers}</p>
            </div>
            <Calendar className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Suspended</p>
              <p className="text-2xl font-bold text-red-600">{suspendedUsers}</p>
            </div>
            <Ban className="w-8 h-8 text-red-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Revenue</p>
              <p className="text-2xl font-bold text-green-600">${totalRevenue.toLocaleString()}</p>
            </div>
            <DollarSign className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Score</p>
              <p className="text-2xl font-bold text-purple-600">{avgCreditScore}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 w-64"
              />
            </div>
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="trial">Trial</option>
              <option value="suspended">Suspended</option>
              <option value="inactive">Inactive</option>
            </select>

            <select
              value={planFilter}
              onChange={(e) => setPlanFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Plans</option>
              <option value="Basic">Basic</option>
              <option value="Pro">Pro</option>
              <option value="Premium">Premium</option>
            </select>
          </div>

          {selectedUsers.length > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">{selectedUsers.length} selected</span>
              <button
                onClick={() => handleBulkAction('suspend')}
                className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
              >
                Suspend
              </button>
              <button
                onClick={() => handleBulkAction('activate')}
                className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
              >
                Activate
              </button>
              <button
                onClick={() => handleBulkAction('email')}
                className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
              >
                Email
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedUsers(filteredUsers.map(u => u.id));
                      } else {
                        setSelectedUsers([]);
                      }
                    }}
                    checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                    className="rounded border-gray-300"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Credit Score</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => toggleUserSelection(user.id)}
                      className="rounded border-gray-300"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                          <span className="text-sm font-medium text-gray-700">
                            {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {user.firstName} {user.lastName}
                        </div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(user.status)}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.plan}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.creditScore.current}</div>
                    <div className={`text-xs ${user.creditScore.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {user.creditScore.change >= 0 ? '+' : ''}{user.creditScore.change} pts
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${user.totalSpent.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(user.lastLogin).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRiskColor(user.riskLevel)}`}>
                      {user.riskLevel}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleUserAction(user.id, 'view')}
                        className="text-blue-600 hover:text-blue-900"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      {user.status === 'active' ? (
                        <button
                          onClick={() => handleUserAction(user.id, 'suspend')}
                          className="text-red-600 hover:text-red-900"
                          title="Suspend User"
                        >
                          <Ban className="w-4 h-4" />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleUserAction(user.id, 'activate')}
                          className="text-green-600 hover:text-green-900"
                          title="Activate User"
                        >
                          <UserCheck className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => handleUserAction(user.id, 'deactivate')}
                        className="text-gray-600 hover:text-gray-900"
                        title="More Actions"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No users found matching your criteria</p>
          </div>
        )}
      </div>

      {/* User Details Modal */}
      {showUserDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[80vh] overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800">
                {showUserDetails.firstName} {showUserDetails.lastName}
              </h3>
              <button 
                onClick={() => setShowUserDetails(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Contact Info */}
                <div>
                  <h4 className="font-medium text-gray-800 mb-3">Contact Information</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">{showUserDetails.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">{showUserDetails.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">{showUserDetails.location}</span>
                    </div>
                  </div>
                </div>

                {/* Account Info */}
                <div>
                  <h4 className="font-medium text-gray-800 mb-3">Account Details</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Status:</span>
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(showUserDetails.status)}`}>
                        {showUserDetails.status}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Plan:</span>
                      <span className="text-sm font-medium">{showUserDetails.plan}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Signup Date:</span>
                      <span className="text-sm">{new Date(showUserDetails.signupDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Total Spent:</span>
                      <span className="text-sm font-medium">${showUserDetails.totalSpent}</span>
                    </div>
                  </div>
                </div>

                {/* Credit Progress */}
                <div>
                  <h4 className="font-medium text-gray-800 mb-3">Credit Progress</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Current Score:</span>
                      <span className="text-sm font-medium">{showUserDetails.creditScore.current}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Improvement:</span>
                      <span className={`text-sm font-medium ${showUserDetails.creditScore.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {showUserDetails.creditScore.change >= 0 ? '+' : ''}{showUserDetails.creditScore.change} points
                      </span>
                    </div>
                  </div>
                </div>

                {/* Disputes */}
                <div>
                  <h4 className="font-medium text-gray-800 mb-3">Dispute Activity</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Total Disputes:</span>
                      <span className="text-sm font-medium">{showUserDetails.disputes.total}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Resolved:</span>
                      <span className="text-sm font-medium text-green-600">{showUserDetails.disputes.resolved}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Pending:</span>
                      <span className="text-sm font-medium text-yellow-600">{showUserDetails.disputes.pending}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className={`px-3 py-1 rounded-full text-sm ${getRiskColor(showUserDetails.riskLevel)}`}>
                  {showUserDetails.riskLevel.charAt(0).toUpperCase() + showUserDetails.riskLevel.slice(1)} Risk
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => alert(`Sending email to ${showUserDetails.email}`)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Send Email
                </button>
                <button 
                  onClick={() => {
                    if (showUserDetails.status === 'active') {
                      handleUserAction(showUserDetails.id, 'suspend');
                    } else {
                      handleUserAction(showUserDetails.id, 'activate');
                    }
                    setShowUserDetails(null);
                  }}
                  className={`px-4 py-2 rounded-lg text-white ${
                    showUserDetails.status === 'active' 
                      ? 'bg-red-600 hover:bg-red-700' 
                      : 'bg-green-600 hover:bg-green-700'
                  }`}
                >
                  {showUserDetails.status === 'active' ? 'Suspend User' : 'Activate User'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Stats */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6">
        <h3 className="font-semibold text-gray-800 mb-4">📊 User Insights</h3>
        <div className="grid md:grid-cols-4 gap-4">
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Top Performing Users:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Premium users: {users.filter(u => u.plan === 'Premium').length} active</li>
              <li>• Avg credit improvement: +{Math.round(users.reduce((sum, u) => sum + u.creditScore.change, 0) / users.length)} pts</li>
              <li>• Success rate: 78% dispute resolution</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Revenue Metrics:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• MRR: ${(totalRevenue / 6).toFixed(0)}/month</li>
              <li>• ARPU: ${(totalRevenue / totalUsers).toFixed(0)}</li>
              <li>• LTV: Est. $450/user</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-700 mb-2">User Health:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Low risk: {users.filter(u => u.riskLevel === 'low').length} users</li>
              <li>• Medium risk: {users.filter(u => u.riskLevel === 'medium').length} users</li>
              <li>• High risk: {users.filter(u => u.riskLevel === 'high').length} users</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Action Required:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Payment failures: 0 users</li>
              <li>• Inactive 30+ days: {users.filter(u => u.status === 'inactive').length} users</li>
              <li>• Trial expiring: {trialUsers} users</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagementComponent;
