'use client';

import { useState, useEffect } from 'react';
import { Calendar, Clock, TrendingUp, AlertCircle, CheckCircle, BarChart3, Target, Bell, FileText, Download, RefreshCw, Eye, ChevronRight, Zap } from 'lucide-react';

const TrackComponent = () => {
  const [disputes, setDisputes] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('disputes');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const [selectedTimeframe, setSelectedTimeframe] = useState('30');
  const [showCalendarView, setShowCalendarView] = useState(false);

  // Calculate key metrics
  const totalDisputes = disputes.length;
  const pendingDisputes = disputes.filter(d => d.status === 'pending').length;
  const inProgressDisputes = disputes.filter(d => d.status === 'in_progress').length;
  const resolvedDisputes = disputes.filter(d => d.status === 'resolved').length;
  const deniedDisputes = disputes.filter(d => d.status === 'denied').length;
  const successRate = totalDisputes > 0 ? Math.round((resolvedDisputes / totalDisputes) * 100) : 0;

  // Calculate upcoming deadlines
  const getUpcomingDeadlines = () => {
    const deadlines = [];
    disputes.forEach(dispute => {
      if (dispute.status === 'pending' || dispute.status === 'in_progress') {
        const submittedDate = new Date(dispute.submitted_date);
        const deadlineDate = new Date(submittedDate.getTime() + 30 * 24 * 60 * 60 * 1000);
        const daysRemaining = Math.ceil((deadlineDate - new Date()) / (1000 * 60 * 60 * 24));
        
        deadlines.push({
          ...dispute,
          deadline: deadlineDate,
          daysRemaining,
          isOverdue: daysRemaining < 0,
          urgency: daysRemaining <= 3 ? 'high' : daysRemaining <= 7 ? 'medium' : 'low'
        });
      }
    });
    return deadlines.sort((a, b) => a.daysRemaining - b.daysRemaining);
  };

  const upcomingDeadlines = getUpcomingDeadlines();

  // Recent activity timeline
  const getRecentActivity = () => {
    const activities = [];
    disputes.forEach(dispute => {
      activities.push({
        id: `${dispute.id}-submitted`,
        type: 'submitted',
        date: dispute.submitted_date,
        dispute,
        description: `Dispute submitted to ${dispute.bureau} for ${dispute.creditor}`
      });
      
      if (dispute.resolution_date) {
        activities.push({
          id: `${dispute.id}-resolved`,
          type: 'resolved',
          date: dispute.resolution_date,
          dispute,
          description: `Dispute resolved - ${dispute.desired_outcome}`
        });
      }
    });
    return activities.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 10);
  };

  const recentActivity = getRecentActivity();

  // Progress by bureau
  const getBureauProgress = () => {
    const bureaus = { equifax: 0, transunion: 0, experian: 0 };
    const bureauSuccess = { equifax: 0, transunion: 0, experian: 0 };
    
    disputes.forEach(dispute => {
      if (dispute.bureau !== 'all') {
        bureaus[dispute.bureau] = (bureaus[dispute.bureau] || 0) + 1;
        if (dispute.status === 'resolved') {
          bureauSuccess[dispute.bureau] = (bureauSuccess[dispute.bureau] || 0) + 1;
        }
      }
    });

    return Object.keys(bureaus).map(bureau => ({
      name: bureau.charAt(0).toUpperCase() + bureau.slice(1),
      total: bureaus[bureau],
      resolved: bureauSuccess[bureau],
      successRate: bureaus[bureau] > 0 ? Math.round((bureauSuccess[bureau] / bureaus[bureau]) * 100) : 0
    }));
  };

  const bureauProgress = getBureauProgress();

  // Monthly progress data for chart
  const getMonthlyProgress = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentMonth = new Date().getMonth();
    const data = [];

    for (let i = 5; i >= 0; i--) {
      const monthIndex = (currentMonth - i + 12) % 12;
      const monthName = months[monthIndex];
      
      // Mock data - in real app, calculate from actual dispute dates
      const disputes = Math.floor(Math.random() * 8) + 2;
      const resolved = Math.floor(disputes * (0.6 + Math.random() * 0.3));
      
      data.push({
        month: monthName,
        disputes,
        resolved,
        successRate: Math.round((resolved / disputes) * 100)
      });
    }
    return data;
  };

  const monthlyData = getMonthlyProgress();

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'submitted': return FileText;
      case 'resolved': return CheckCircle;
      case 'updated': return RefreshCw;
      default: return Bell;
    }
  };

  // Estimated credit score impact
  const estimatedScoreImpact = resolvedDisputes * 8 + inProgressDisputes * 3;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Progress Tracking</h1>
          <p className="text-gray-600">Monitor your dispute progress and credit repair journey</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
            <option value="365">Last year</option>
          </select>
          <button
            onClick={() => setShowCalendarView(!showCalendarView)}
            className={`px-4 py-2 rounded-lg border transition-colors ${
              showCalendarView 
                ? 'bg-blue-600 text-white border-blue-600' 
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
          >
            <Calendar className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Disputes</p>
              <p className="text-2xl font-bold text-gray-900">{totalDisputes}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">+{Math.floor(Math.random() * 3) + 1} this week</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Success Rate</p>
              <p className="text-2xl font-bold text-green-600">{successRate}%</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">Above average (65%)</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">In Progress</p>
              <p className="text-2xl font-bold text-blue-600">{inProgressDisputes + pendingDisputes}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <RefreshCw className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">{upcomingDeadlines.length} pending deadlines</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Est. Score Impact</p>
              <p className="text-2xl font-bold text-purple-600">+{estimatedScoreImpact}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Target className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">Points potential</p>
        </div>
      </div>

      {/* Upcoming Deadlines Alert */}
      {upcomingDeadlines.length > 0 && (
        <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-orange-600" />
              <h3 className="font-semibold text-gray-800">Upcoming Deadlines</h3>
            </div>
            <span className="text-sm text-gray-600">{upcomingDeadlines.length} items need attention</span>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {upcomingDeadlines.slice(0, 3).map((deadline) => (
              <div key={deadline.id} className={`bg-white rounded-lg p-4 border ${getUrgencyColor(deadline.urgency)}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-800">{deadline.creditor}</span>
                  <span className="text-xs font-medium">
                    {deadline.isOverdue ? 'OVERDUE' : `${deadline.daysRemaining} days`}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{deadline.account}</p>
                <p className="text-xs text-gray-500">Bureau: {deadline.bureau}</p>
                {deadline.isOverdue && (
                  <button className="mt-2 text-xs px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700">
                    Follow Up Now
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Progress Timeline */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-gray-800">Recent Activity</h3>
            <button className="text-sm text-blue-600 hover:text-blue-700">View All</button>
          </div>
          
          <div className="space-y-4">
            {recentActivity.length === 0 ? (
              <div className="text-center py-8">
                <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No recent activity</p>
                <p className="text-sm text-gray-500">Create some disputes to see your progress here</p>
              </div>
            ) : (
              recentActivity.map((activity) => {
                const ActivityIcon = getActivityIcon(activity.type);
                return (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg ${
                      activity.type === 'resolved' ? 'bg-green-100' : 
                      activity.type === 'submitted' ? 'bg-blue-100' : 'bg-gray-100'
                    }`}>
                      <ActivityIcon className={`w-4 h-4 ${
                        activity.type === 'resolved' ? 'text-green-600' : 
                        activity.type === 'submitted' ? 'text-blue-600' : 'text-gray-600'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">{activity.description}</p>
                      <p className="text-xs text-gray-500">{new Date(activity.date).toLocaleDateString()}</p>
                    </div>
                    <button className="p-1 text-gray-400 hover:text-blue-600">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Bureau Progress */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="font-semibold text-gray-800 mb-6">Bureau Progress</h3>
          
          <div className="space-y-4">
            {bureauProgress.map((bureau) => (
              <div key={bureau.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">{bureau.name}</span>
                  <span className="text-sm text-gray-600">{bureau.resolved}/{bureau.total}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${bureau.total > 0 ? (bureau.resolved / bureau.total) * 100 : 0}%` }}
                  ></div>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{bureau.successRate}% success rate</span>
                  {bureau.total > 0 && (
                    <span>{Math.round((bureau.resolved / bureau.total) * 100)}% complete</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {bureauProgress.every(b => b.total === 0) && (
            <div className="text-center py-8">
              <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 text-sm">No bureau data yet</p>
              <p className="text-xs text-gray-500">Create disputes to see progress by bureau</p>
            </div>
          )}
        </div>
      </div>

      {/* Monthly Progress Chart */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-semibold text-gray-800">Monthly Progress</h3>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded"></div>
              <span className="text-gray-600">Disputes Filed</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span className="text-gray-600">Resolved</span>
            </div>
          </div>
        </div>
        
        <div className="h-64 flex items-end justify-between space-x-2">
          {monthlyData.map((month, index) => {
            const maxDisputes = Math.max(...monthlyData.map(m => m.disputes));
            const disputeHeight = (month.disputes / maxDisputes) * 200;
            const resolvedHeight = (month.resolved / maxDisputes) * 200;
            
            return (
              <div key={index} className="flex-1 flex flex-col items-center space-y-2">
                <div className="relative w-full flex items-end justify-center space-x-1" style={{ height: '200px' }}>
                  <div 
                    className="w-4 bg-blue-500 rounded-t"
                    style={{ height: `${disputeHeight}px` }}
                    title={`${month.disputes} disputes filed`}
                  ></div>
                  <div 
                    className="w-4 bg-green-500 rounded-t"
                    style={{ height: `${resolvedHeight}px` }}
                    title={`${month.resolved} disputes resolved`}
                  ></div>
                </div>
                <span className="text-xs text-gray-600">{month.month}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Items */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6">
        <h3 className="font-semibold text-gray-800 mb-4">🎯 Recommended Actions</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {upcomingDeadlines.length > 0 && (
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center space-x-2 mb-2">
                <Clock className="w-4 h-4 text-orange-500" />
                <span className="font-medium text-gray-800">Follow Up Required</span>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                {upcomingDeadlines.filter(d => d.daysRemaining <= 3).length} disputes need immediate follow-up
              </p>
              <button className="text-sm px-3 py-1 bg-orange-600 text-white rounded hover:bg-orange-700">
                Review Deadlines
              </button>
            </div>
          )}
          
          {resolvedDisputes > 0 && (
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center space-x-2 mb-2">
                <Download className="w-4 h-4 text-green-500" />
                <span className="font-medium text-gray-800">Get Updated Reports</span>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Download fresh credit reports to confirm {resolvedDisputes} resolved items
              </p>
              <button className="text-sm px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700">
                Request Reports
              </button>
            </div>
          )}
          
          {totalDisputes < 3 && (
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center space-x-2 mb-2">
                <Zap className="w-4 h-4 text-blue-500" />
                <span className="font-medium text-gray-800">Maximize Impact</span>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Review your credit reports for additional dispute opportunities
              </p>
              <button className="text-sm px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
                Find More Issues
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrackComponent;
