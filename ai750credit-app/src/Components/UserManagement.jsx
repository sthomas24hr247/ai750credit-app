import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Edit, 
  Trash2, 
  Plus, 
  X,
  Mail,
  Phone,
  Calendar,
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  DollarSign
} from 'lucide-react';
import { adminHelpers, activityHelpers } from '../lib/supabase';

const UserManagementComponent = ({ profile, isAdmin, user }) => {
  // ================================
  // STATE MANAGEMENT
  // ================================
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showAddAdminModal, setShowAddAdminModal] = useState(false);
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [adminList, setAdminList] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    trialUsers: 0,
    suspendedUsers: 0,
    revenue: 0
  });

  // ================================
  // EFFECTS
  // ================================
  useEffect(() => {
    if (isAdmin) {
      loadUsers();
      loadAdmins();
    }
  }, [isAdmin]);

  // ================================
  // DATA LOADING FUNCTIONS
  // ================================
  const loadUsers = async () => {
    try {
      setLoading(true);
      const { data, error } = await adminHelpers.getAllUsers();
      
      if (error) {
        console.error('Error loading users:', error);
        alert('Error loading users: ' + error.message);
        return;
      }

      console.log('Loaded users:', data);
      setUsers(data || []);
      calculateStats(data || []);
    } catch (error) {
      console.error('Error in loadUsers:', error);
      alert('Error loading users');
    } finally {
      setLoading(false);
    }
  };

  const loadAdmins = async () => {
    try {
      const { data, error } = await adminHelpers.getAdminList();
      
      if (error) {
        console.error('Error loading admins:', error);
        return;
      }

      console.log('Loaded admins:', data);
      setAdminList(data || []);
    } catch (error) {
      console.error('Error loading admins:', error);
    }
  };

  const calculateStats = (userData) => {
    const totalUsers = userData.length;
    const activeUsers = userData.filter(u => u.status === 'active').length;
    const trialUsers = userData.filter(u => u.subscription_status === 'trial').length;
    const suspendedUsers = userData.filter(u => u.status === 'suspended').length;
    
    // Calculate revenue from billing history
    const revenue = userData.reduce((total, user) => {
      if (user.billing_history) {
        return total + user.billing_history
          .filter(bill => bill.status === 'paid')
          .reduce((sum, bill) => sum + parseFloat(bill.amount || 0), 0);
      }
      return total;
    }, 0);

    setStats({
      totalUsers,
      activeUsers,
      trialUsers,
      suspendedUsers,
      revenue
    });
  };

  // ================================
  // USER MANAGEMENT FUNCTIONS
  // ================================
  const suspendUser = async (userId) => {
    if (!confirm('Are you sure you want to suspend this user?')) return;
    
    try {
      const { data, error } = await adminHelpers.updateUserStatus(userId, 'suspended');
      
      if (error) {
        console.error('Error suspending user:', error);
        alert('Error suspending user: ' + error.message);
        return;
      }

      // Log the admin action
      await activityHelpers.logActivity(user.id, 'admin_suspend_user', {
        target_user_id: userId,
        reason: 'Administrative action',
        timestamp: new Date().toISOString()
      }, 'user', userId);

      // Reload users to reflect changes
      await loadUsers();
      alert('User suspended successfully');
    } catch (error) {
      console.error('Error in suspendUser:', error);
      alert('Error suspending user');
    }
  };

  const reactivateUser = async (userId) => {
    if (!confirm('Are you sure you want to reactivate this user?')) return;
    
    try {
      const { data, error } = await adminHelpers.updateUserStatus(userId, 'active');
      
      if (error) {
        console.error('Error reactivating user:', error);
        alert('Error reactivating user: ' + error.message);
        return;
      }

      // Log the admin action
      await activityHelpers.logActivity(user.id, 'admin_reactivate_user', {
        target_user_id: userId,
        reason: 'Administrative action',
        timestamp: new Date().toISOString()
      }, 'user', userId);

      // Reload users to reflect changes
      await loadUsers();
      alert('User reactivated successfully');
    } catch (error) {
      console.error('Error in reactivateUser:', error);
      alert('Error reactivating user');
    }
  };

  const viewUserDetails = async (userId) => {
    try {
      const { data, error } = await adminHelpers.getUserById(userId);
      
      if (error) {
        console.error('Error loading user details:', error);
        alert('Error loading user details');
        return;
      }

      setSelectedUser(data);
      setShowUserModal(true);
    } catch (error) {
      console.error('Error viewing user details:', error);
      alert('Error loading user details');
    }
  };

  // ================================
  // ADMIN MANAGEMENT FUNCTIONS
  // ================================
  const addAdmin = async () => {
    if (!newAdminEmail.trim()) {
      alert('Please enter an email address');
      return;
    }

    try {
      const { data, error } = await adminHelpers.addAdmin(newAdminEmail.trim(), user.id);
      
      if (error) {
        alert('Error adding admin: ' + error.message);
        return;
      }

      // Log the admin addition
      await activityHelpers.logActivity(user.id, 'admin_added', {
        target_email: newAdminEmail.trim(),
        timestamp: new Date().toISOString()
      });

      setNewAdminEmail('');
      setShowAddAdminModal(false);
      await loadAdmins();
      alert('Admin added successfully');
    } catch (error) {
      console.error('Error adding admin:', error);
      alert('Error adding admin');
    }
  };

  const removeAdmin = async (adminId, adminEmail) => {
    if (adminEmail === user.email) {
      alert('You cannot remove yourself as admin');
      return;
    }

    if (!confirm(`Are you sure you want to remove ${adminEmail} as admin?`)) return;

    try {
      const { data, error } = await adminHelpers.removeAdmin(adminId);
      
      if (error) {
        alert('Error removing admin: ' + error.message);
        return;
      }

      // Log the admin removal
      await activityHelpers.logActivity(user.id, 'admin_removed', {
        target_admin_id: adminId,
        target_email: adminEmail,
        timestamp: new Date().toISOString()
      });

      await loadAdmins();
      alert('Admin removed successfully');
    } catch (error) {
      console.error('Error removing admin:', error);
      alert('Error removing admin');
    }
  };

  // ================================
  // EXPORT FUNCTIONS
  // ================================
  const exportUsers = async () => {
    try {
      // Get fresh data for export
      const { data, error } = await adminHelpers.getAllUsers();
      
      if (error) {
        alert('Error exporting users: ' + error.message);
        return;
      }

      // Format data for export
      const exportData = data.map(user => ({
        ID: user.id,
        'First Name': user.first_name,
        'Last Name': user.last_name,
        Email: user.email || 'N/A',
        Phone: user.phone || 'N/A',
        Status: user.status,
        'Subscription Status': user.subscription_status,
        'Created At': new Date(user.created_at).toLocaleDateString(),
        'Last Login': user.last_login_at ? new Date(user.last_login_at).toLocaleDateString() : 'Never',
        'Credit Scores': user.credit_scores?.length || 0,
        'Active Disputes': user.disputes?.length || 0,
        'Trial Ends': user.trial_ends_at ? new Date(user.trial_ends_at).toLocaleDateString() : 'N/A'
      }));

      // Create and download CSV
      const csv = convertToCSV(exportData);
      downloadCSV(csv, `users_export_${new Date().toISOString().split('T')[0]}.csv`);
      
      // Log the export action
      await activityHelpers.logActivity(user.id, 'admin_export_users', {
        exported_count: exportData.length,
        timestamp: new Date().toISOString()
      });
      
      alert(`Exported ${exportData.length} users successfully`);
    } catch (error) {
      console.error('Error in exportUsers:', error);
      alert('Error exporting users');
    }
  };

  // ================================
  // UTILITY FUNCTIONS
  // ================================
  const convertToCSV = (data) => {
    if (!data.length) return '';
    
    const headers = Object.keys(data[0]);
    const csvHeaders = headers.join(',');
    
    const csvRows = data.map(row => 
      headers.map(header => {
        const value = row[header];
        // Escape commas and quotes in CSV
        if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      }).join(',')
    );
    
    return [csvHeaders, ...csvRows].join('\n');
  };

  const downloadCSV = (csvContent, filename) => {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'active': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'suspended': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'trial': return <Clock className="w-4 h-4 text-blue-500" />;
      default: return <AlertTriangle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      case 'trial': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Filter users based on search and status
  const filteredUsers = users.filter(user => {
    const matchesSearch = searchTerm === '' || 
      user.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  // ================================
  // GUARD CLAUSES
  // ================================
  if (!isAdmin) {
    return (
      <div className="text-center py-12">
        <Shield className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Access Denied</h3>
        <p className="text-gray-600">You don't have permission to access this page.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Loading user data...</p>
      </div>
    );
  }

  // ================================
  // RENDER COMPONENT
  // ================================
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">User Management</h2>
          <p className="text-gray-600">Manage users and administrative access</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => setShowAddAdminModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Admin</span>
          </button>
          <button
            onClick={exportUsers}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid md:grid-cols-5 gap-4">
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-800">{stats.totalUsers}</p>
            </div>
            <Users className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Users</p>
              <p className="text-2xl font-bold text-green-600">{stats.activeUsers}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Trial Users</p>
              <p className="text-2xl font-bold text-blue-600">{stats.trialUsers}</p>
            </div>
            <Clock className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Suspended</p>
              <p className="text-2xl font-bold text-red-600">{stats.suspendedUsers}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Revenue</p>
              <p className="text-2xl font-bold text-purple-600">${stats.revenue.toFixed(0)}</p>
            </div>
            <DollarSign className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="suspended">Suspended</option>
                <option value="trial">Trial</option>
              </select>
            </div>
          </div>
          <div className="text-sm text-gray-600">
            Showing {filteredUsers.length} of {users.length} users
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        {users.length === 0 ? (
          <div className="p-8 text-center">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">No Users Found</h3>
            <p className="text-gray-600">No users have signed up yet. When users register, they will appear here.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-3 px-6 font-medium text-gray-700">User</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-700">Status</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-700">Subscription</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-700">Joined</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-700">Last Login</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((userData) => (
                  <tr key={userData.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                          {userData.first_name?.[0]?.toUpperCase() || 'U'}
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">
                            {userData.first_name} {userData.last_name}
                          </p>
                          <p className="text-sm text-gray-600">{userData.email || 'No email'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(userData.status)}
                        <span className={`px-2 py-1 text-xs rounded-full font-medium ${getStatusColor(userData.status)}`}>
                          {userData.status}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                        userData.subscription_status === 'trial' ? 'bg-blue-100 text-blue-800' :
                        userData.subscription_status === 'active' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {userData.subscription_status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-600">
                      {new Date(userData.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-600">
                      {userData.last_login_at 
                        ? new Date(userData.last_login_at).toLocaleDateString()
                        : 'Never'
                      }
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => viewUserDetails(userData.id)}
                          className="p-1 text-blue-600 hover:text-blue-700"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        {userData.status === 'active' ? (
                          <button
                            onClick={() => suspendUser(userData.id)}
                            className="p-1 text-red-600 hover:text-red-700"
                            title="Suspend User"
                          >
                            <AlertTriangle className="w-4 h-4" />
                          </button>
                        ) : (
                          <button
                            onClick={() => reactivateUser(userData.id)}
                            className="p-1 text-green-600 hover:text-green-700"
                            title="Reactivate User"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Admin Management Section */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="font-semibold text-gray-800 mb-4">Current Administrators</h3>
        <div className="space-y-3">
          {adminList.map((admin) => (
            <div key={admin.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <Shield className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">{admin.email}</p>
                  <p className="text-sm text-gray-600">
                    Added {new Date(admin.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded-full">
                  {admin.role}
                </span>
                {admin.email !== user.email && (
                  <button
                    onClick={() => removeAdmin(admin.id, admin.email)}
                    className="text-red-600 hover:text-red-700"
                    title="Remove Admin"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
          {adminList.length === 0 && (
            <p className="text-gray-500 text-sm">No administrators found. This might be a loading issue.</p>
          )}
        </div>
      </div>

      {/* Add Admin Modal */}
      {showAddAdminModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Add Administrator</h3>
              <button 
                onClick={() => setShowAddAdminModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={newAdminEmail}
                  onChange={(e) => setNewAdminEmail(e.target.value)}
                  placeholder="Enter user's email address"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setShowAddAdminModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={addAdmin}
                  className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Add Admin
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* User Details Modal */}
      {showUserModal && selectedUser && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-4xl mx-4 max-h-screen overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-800">User Details</h3>
              <button 
                onClick={() => setShowUserModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* User Information */}
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-800 mb-3">Personal Information</h4>
                  <div className="space-y-2 text-sm">
                    <p><strong>Name:</strong> {selectedUser.first_name} {selectedUser.last_name}</p>
                    <p><strong>Email:</strong> {selectedUser.email || 'N/A'}</p>
                    <p><strong>Phone:</strong> {selectedUser.phone || 'N/A'}</p>
                    <p><strong>Status:</strong> {selectedUser.status}</p>
                    <p><strong>Subscription:</strong> {selectedUser.subscription_status}</p>
                    <p><strong>Joined:</strong> {new Date(selectedUser.created_at).toLocaleDateString()}</p>
                    <p><strong>Last Login:</strong> {selectedUser.last_login_at ? new Date(selectedUser.last_login_at).toLocaleDateString() : 'Never'}</p>
                  </div>
                </div>

                {/* Credit Scores */}
                <div>
                  <h4 className="font-medium text-gray-800 mb-3">Credit Scores</h4>
                  {selectedUser.credit_scores && selectedUser.credit_scores.length > 0 ? (
                    <div className="space-y-2">
                      {selectedUser.credit_scores.map((score, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span className="capitalize">{score.bureau}:</span>
                          <span className="font-medium">{score.score}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-600">No credit scores recorded</p>
                  )}
                </div>
              </div>

              {/* Activity and Disputes */}
              <div className="space-y-4">
                {/* Recent Activity */}
                <div>
                  <h4 className="font-medium text-gray-800 mb-3">Recent Activity</h4>
                  {selectedUser.activity_logs && selectedUser.activity_logs.length > 0 ? (
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {selectedUser.activity_logs.slice(0, 5).map((activity, index) => (
                        <div key={index} className="text-sm">
                          <p className="font-medium">{activity.action.replace('_', ' ')}</p>
                          <p className="text-gray-600">{new Date(activity.created_at).toLocaleDateString()}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-600">No recent activity</p>
                  )}
                </div>

                {/* Disputes */}
                <div>
                  <h4 className="font-medium text-gray-800 mb-3">Disputes</h4>
                  {selectedUser.disputes && selectedUser.disputes.length > 0 ? (
                    <div className="space-y-2">
                      {selectedUser.disputes.map((dispute, index) => (
                        <div key={index} className="text-sm">
                          <p className="font-medium">{dispute.bureau} - {dispute.dispute_type}</p>
                          <p className="text-gray-600">Status: {dispute.status}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-600">No disputes filed</p>
                  )}
                </div>

                {/* Billing History */}
                <div>
                  <h4 className="font-medium text-gray-800 mb-3">Billing History</h4>
                  {selectedUser.billing_history && selectedUser.billing_history.length > 0 ? (
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {selectedUser.billing_history.slice(0, 3).map((bill, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span>{new Date(bill.created_at).toLocaleDateString()}</span>
                          <span className={`font-medium ${bill.status === 'paid' ? 'text-green-600' : 'text-red-600'}`}>
                            ${bill.amount} ({bill.status})
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-600">No billing history</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagementComponent;