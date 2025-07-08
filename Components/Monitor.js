'use client';

import { useState, useEffect } from 'react';
import { Shield, TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Eye, Bell, CreditCard, Search, Calendar, Download, RefreshCw, Zap, Target, Lock, Users, BarChart3 } from 'lucide-react';

const MonitorComponent = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('6m');
  const [showAllAlerts, setShowAllAlerts] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // Mock credit score data
  const [creditScores] = useState({
    current: {
      equifax: 720,
      transunion: 725,
      experian: 718,
      average: 721,
      change: +12,
      lastUpdated: '2024-12-10'
    },
    history: [
      { date: '2024-06-01', equifax: 685, transunion: 680, experian: 692, average: 686 },
      { date: '2024-07-01', equifax: 695, transunion: 692, experian: 698, average: 695 },
      { date: '2024-08-01', equifax: 702, transunion: 705, experian: 700, average: 702 },
      { date: '2024-09-01', equifax: 708, transunion: 712, experian: 705, average: 708 },
      { date: '2024-10-01', equifax: 715, transunion: 718, experian: 710, average: 714 },
      { date: '2024-11-01', equifax: 718, transunion: 722, experian: 715, average: 718 },
      { date: '2024-12-01', equifax: 720, transunion: 725, experian: 718, average: 721 }
    ]
  });

  // Mock alerts data
  const [alerts] = useState([
    {
      id: '1',
      type: 'new_account',
      severity: 'medium',
      title: 'New Credit Card Account Opened',
      description: 'A new Chase Freedom credit card was opened on your credit report',
      date: '2024-12-09',
      status: 'unread',
      details: 'Account: Chase Freedom ****1234, Credit Limit: $5,000',
      action_required: true
    },
    {
      id: '2',
      type: 'hard_inquiry',
      severity: 'low',
      title: 'Hard Credit Inquiry Detected',
      description: 'Capital One performed a hard inquiry on your credit report',
      date: '2024-12-08',
      status: 'read',
      details: 'Inquiry by: Capital One Bank, Date: Dec 8, 2024',
      action_required: false
    },
    {
      id: '3',
      type: 'balance_increase',
      severity: 'medium',
      title: 'Credit Utilization Increased',
      description: 'Your credit utilization rose to 35% across all cards',
      date: '2024-12-07',
      status: 'unread',
      details: 'Previous: 22%, Current: 35%, Recommendation: Pay down balances',
      action_required: true
    },
    {
      id: '4',
      type: 'dispute_update',
      severity: 'high',
      title: 'Dispute Resolution - Successful',
      description: 'Your dispute with Capital One was resolved in your favor',
      date: '2024-12-06',
      status: 'read',
      details: 'Late payment removed from credit report, estimated +15 point impact',
      action_required: false
    },
    {
      id: '5',
      type: 'identity_alert',
      severity: 'high',
      title: 'Identity Monitoring Alert',
      description: 'Your personal information was found on the dark web',
      date: '2024-12-05',
      status: 'unread',
      details: 'Email and phone number detected in data breach',
      action_required: true
    }
  ]);

  // Credit utilization data
  const [utilizationData] = useState([
    { account: 'Chase Freedom', limit: 5000, balance: 1200, utilization: 24 },
    { account: 'Capital One', limit: 3000, balance: 1500, utilization: 50 },
    { account: 'Discover', limit: 2500, balance: 300, utilization: 12 },
    { account: 'Citi Double Cash', limit: 4000, balance: 800, utilization: 20 }
  ]);

  const totalLimit = utilizationData.reduce((sum, card) => sum + card.limit, 0);
  const totalBalance = utilizationData.reduce((sum, card) => sum + card.balance, 0);
  const overallUtilization = Math.round((totalBalance / totalLimit) * 100);

  // Payment history data
  const [paymentHistory] = useState({
    onTime: 98,
    late30: 2,
    late60: 0,
    late90: 0,
    totalAccounts: 8,
    perfectMonths: 23
  });

  const unreadAlerts = alerts.filter(alert => alert.status === 'unread').length;
  const highPriorityAlerts = alerts.filter(alert => alert.severity === 'high').length;

  const getAlertIcon = (type) => {
    switch (type) {
      case 'new_account': return CreditCard;
      case 'hard_inquiry': return Search;
      case 'balance_increase': return TrendingUp;
      case 'dispute_update': return CheckCircle;
      case 'identity_alert': return Shield;
      default: return Bell;
    }
  };

  const getAlertColor = (severity) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCreditScoreColor = (score) => {
    if (score >= 750) return 'text-green-600';
    if (score >= 700) return 'text-blue-600';
    if (score >= 650) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getCreditScoreLabel = (score) => {
    if (score >= 750) return 'Excellent';
    if (score >= 700) return 'Good';
    if (score >= 650) return 'Fair';
    return 'Poor';
  };

  // Calculate score trend
  const scoreHistory = creditScores.history;
  const currentScore = creditScores.current.average;
  const previousScore = scoreHistory[scoreHistory.length - 2]?.average || currentScore;
  const scoreChange = currentScore - previousScore;
  const monthlyChange = scoreHistory.length >= 2 ? 
    currentScore - scoreHistory[scoreHistory.length - 2].average : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Credit Monitoring</h1>
          <p className="text-gray-600">Real-time alerts and comprehensive credit health tracking</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
              <Bell className="w-4 h-4" />
              <span>Alerts</span>
              {unreadAlerts > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {unreadAlerts}
                </span>
              )}
            </button>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <RefreshCw className="w-4 h-4" />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Alert Banner */}
      {highPriorityAlerts > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <div>
              <h3 className="font-medium text-red-800">High Priority Alerts</h3>
              <p className="text-sm text-red-600">
                You have {highPriorityAlerts} high priority {highPriorityAlerts === 1 ? 'alert' : 'alerts'} requiring immediate attention
              </p>
            </div>
            <button 
              onClick={() => setActiveTab('alerts')}
              className="ml-auto px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
            >
              Review Alerts
            </button>
          </div>
        </div>
      )}

      {/* Credit Score Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 bg-white rounded-xl p-6 border border-gray-200">
          <div className="text-center">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Average Credit Score</h3>
            <div className={`text-4xl font-bold ${getCreditScoreColor(currentScore)} mb-2`}>
              {currentScore}
            </div>
            <div className="flex items-center justify-center space-x-2">
              {scoreChange > 0 ? (
                <TrendingUp className="w-4 h-4 text-green-600" />
              ) : scoreChange < 0 ? (
                <TrendingDown className="w-4 h-4 text-red-600" />
              ) : null}
              <span className={`text-sm font-medium ${
                scoreChange > 0 ? 'text-green-600' : 
                scoreChange < 0 ? 'text-red-600' : 'text-gray-600'
              }`}>
                {scoreChange > 0 ? '+' : ''}{scoreChange} this month
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-2">{getCreditScoreLabel(currentScore)}</p>
          </div>
        </div>

        <div className="lg:col-span-3 bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800">Credit Score Trend</h3>
            <select
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500"
            >
              <option value="3m">3 months</option>
              <option value="6m">6 months</option>
              <option value="1y">1 year</option>
              <option value="2y">2 years</option>
            </select>
          </div>
          
          {/* Simple Chart */}
          <div className="h-32 flex items-end justify-between space-x-2">
            {scoreHistory.map((point, index) => {
              const maxScore = Math.max(...scoreHistory.map(p => p.average));
              const minScore = Math.min(...scoreHistory.map(p => p.average));
              const height = ((point.average - minScore) / (maxScore - minScore)) * 100 + 20;
              
              return (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div 
                    className="w-full bg-blue-500 rounded-t"
                    style={{ height: `${height}px` }}
                    title={`${point.average} - ${new Date(point.date).toLocaleDateString()}`}
                  ></div>
                  <span className="text-xs text-gray-500 mt-1">
                    {new Date(point.date).toLocaleDateString('en-US', { month: 'short' })}
                  </span>
                </div>
              );
            })}
          </div>
          
          <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-200">
            <div className="text-center">
              <p className="text-sm text-gray-600">Equifax</p>
              <p className={`font-semibold ${getCreditScoreColor(creditScores.current.equifax)}`}>
                {creditScores.current.equifax}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">TransUnion</p>
              <p className={`font-semibold ${getCreditScoreColor(creditScores.current.transunion)}`}>
                {creditScores.current.transunion}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Experian</p>
              <p className={`font-semibold ${getCreditScoreColor(creditScores.current.experian)}`}>
                {creditScores.current.experian}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'alerts', label: 'Alerts', icon: Bell },
            { id: 'utilization', label: 'Utilization', icon: CreditCard },
            { id: 'identity', label: 'Identity Protection', icon: Shield }
          ].map(tab => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <IconComponent className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.id === 'alerts' && unreadAlerts > 0 && (
                  <span className="bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {unreadAlerts}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Quick Stats */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Credit Utilization</p>
                    <p className="text-2xl font-bold text-gray-900">{overallUtilization}%</p>
                  </div>
                  <div className={`p-3 rounded-lg ${overallUtilization > 30 ? 'bg-red-100' : 'bg-green-100'}`}>
                    <CreditCard className={`w-6 h-6 ${overallUtilization > 30 ? 'text-red-600' : 'text-green-600'}`} />
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  {overallUtilization > 30 ? 'Above recommended 30%' : 'Within recommended range'}
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Payment History</p>
                    <p className="text-2xl font-bold text-green-600">{paymentHistory.onTime}%</p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-lg">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">{paymentHistory.perfectMonths} consecutive months</p>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-800 mb-4">Recent Credit Activity</h3>
              <div className="space-y-3">
                {alerts.slice(0, 3).map(alert => {
                  const AlertIcon = getAlertIcon(alert.type);
                  return (
                    <div key={alert.id} className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50">
                      <AlertIcon className="w-5 h-5 text-gray-600" />
                      <div className="flex-1">
                        <p className="font-medium text-gray-800 text-sm">{alert.title}</p>
                        <p className="text-xs text-gray-600">{alert.description}</p>
                      </div>
                      <span className="text-xs text-gray-500">{new Date(alert.date).toLocaleDateString()}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="font-semibold text-gray-800 mb-4">Score Improvement Tips</h3>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Target className="w-4 h-4 text-blue-600" />
                  <span className="font-medium text-blue-800">Reduce Utilization</span>
                </div>
                <p className="text-sm text-blue-700">
                  Pay down balances to under 30% on all cards. Potential impact: +15-25 points
                </p>
              </div>

              <div className="p-4 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="font-medium text-green-800">Continue Dispute Success</span>
                </div>
                <p className="text-sm text-green-700">
                  Your disputes are working! Keep monitoring for additional items to dispute.
                </p>
              </div>

              <div className="p-4 bg-purple-50 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Calendar className="w-4 h-4 text-purple-600" />
                  <span className="font-medium text-purple-800">Age of Accounts</span>
                </div>
                <p className="text-sm text-purple-700">
                  Keep old accounts open to maintain credit history length.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'alerts' && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-800">Credit Monitoring Alerts</h3>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">{unreadAlerts} unread</span>
                <button className="text-sm text-blue-600 hover:text-blue-700">Mark all read</button>
              </div>
            </div>
          </div>

          <div className="divide-y divide-gray-200">
            {alerts.map(alert => {
              const AlertIcon = getAlertIcon(alert.type);
              return (
                <div key={alert.id} className={`p-6 ${alert.status === 'unread' ? 'bg-blue-50' : ''}`}>
                  <div className="flex items-start space-x-4">
                    <div className={`p-2 rounded-lg ${getAlertColor(alert.severity)}`}>
                      <AlertIcon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-800">{alert.title}</h4>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 text-xs rounded-full ${getAlertColor(alert.severity)}`}>
                            {alert.severity}
                          </span>
                          <span className="text-sm text-gray-500">{new Date(alert.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-2">{alert.description}</p>
                      <p className="text-sm text-gray-500 mb-3">{alert.details}</p>
                      {alert.action_required && (
                        <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                          Take Action
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeTab === 'utilization' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-gray-800">Credit Utilization by Account</h3>
              <div className="text-right">
                <p className="text-sm text-gray-600">Overall Utilization</p>
                <p className={`text-2xl font-bold ${overallUtilization > 30 ? 'text-red-600' : 'text-green-600'}`}>
                  {overallUtilization}%
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {utilizationData.map((card, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-800">{card.account}</span>
                    <div className="text-right">
                      <span className="text-sm text-gray-600">
                        ${card.balance.toLocaleString()} / ${card.limit.toLocaleString()}
                      </span>
                      <span className={`ml-2 font-medium ${
                        card.utilization > 30 ? 'text-red-600' : 'text-green-600'
                      }`}>
                        {card.utilization}%
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        card.utilization > 30 ? 'bg-red-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${Math.min(card.utilization, 100)}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-xl p-6">
            <h3 className="font-semibold text-gray-800 mb-4">💡 Utilization Optimization Tips</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Best Practices:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Keep overall utilization under 30%</li>
                  <li>• Individual cards under 30%</li>
                  <li>• Pay down highest utilization first</li>
                  <li>• Consider increasing credit limits</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Quick Wins:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Pay before statement closes</li>
                  <li>• Make multiple payments per month</li>
                  <li>• Request credit limit increases</li>
                  <li>• Spread balances across cards</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'identity' && (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center space-x-3 mb-4">
                <Shield className="w-6 h-6 text-green-600" />
                <h3 className="font-semibold text-gray-800">Identity Protection Status</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Dark Web Monitoring</span>
                  <span className="text-green-600 font-medium">Active</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Credit Freeze</span>
                  <span className="text-yellow-600 font-medium">Partial</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Fraud Alerts</span>
                  <span className="text-green-600 font-medium">Enabled</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center space-x-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-red-600" />
                <h3 className="font-semibold text-gray-800">Security Recommendations</h3>
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-red-50 rounded-lg">
                  <p className="text-sm font-medium text-red-800">Enable Full Credit Freeze</p>
                  <p className="text-xs text-red-600">Freeze all three bureaus for maximum protection</p>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <p className="text-sm font-medium text-yellow-800">Review Dark Web Alert</p>
                  <p className="text-xs text-yellow-600">Your email was found in a recent breach</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="font-semibold text-gray-800 mb-4">Identity Monitoring Timeline</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-red-100 rounded-lg">
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">Dark Web Detection</p>
                  <p className="text-sm text-gray-600">Your personal information found in data breach</p>
                  <p className="text-xs text-gray-500">December 5, 2024</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Shield className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">Fraud Alert Activated</p>
                  <p className="text-sm text-gray-600">Extended fraud alert placed on all bureaus</p>
                  <p className="text-xs text-gray-500">November 15, 2024</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MonitorComponent;
