'use client';

import { useState, useEffect } from 'react';
import { CreditCard, DollarSign, Calendar, Download, RefreshCw, Star, Users, HelpCircle, BarChart3, AlertCircle, CheckCircle, Gift, Settings, LogOut, Crown, Zap } from 'lucide-react';

const AccountComponent = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [accountData] = useState({
    subscription: {
      plan: 'Pro',
      status: 'active',
      billingCycle: 'monthly',
      amount: 29.99,
      nextBilling: '2025-01-08',
      startDate: '2024-07-08',
      autoRenew: true
    },
    usage: {
      disputes: { used: 8, limit: 15, percentage: 53 },
      goodwillLetters: { used: 3, limit: 10, percentage: 30 },
      fcraViolations: { used: 2, limit: 5, percentage: 40 },
      creditReports: { used: 4, limit: 12, percentage: 33 },
      supportTickets: { used: 1, limit: 5, percentage: 20 }
    },
    billing: {
      nextAmount: 29.99,
      lastPayment: { amount: 29.99, date: '2024-12-08', status: 'paid' },
      paymentMethod: {
        type: 'card',
        last4: '4242',
        brand: 'Visa',
        expiry: '12/26'
      }
    },
    stats: {
      totalSaved: 1247,
      scoreIncrease: 47,
      itemsRemoved: 12,
      successRate: 78
    }
  });

  const [billingHistory] = useState([
    { id: '1', date: '2024-12-08', amount: 29.99, status: 'paid', invoice: 'INV-2024-12-001' },
    { id: '2', date: '2024-11-08', amount: 29.99, status: 'paid', invoice: 'INV-2024-11-001' },
    { id: '3', date: '2024-10-08', amount: 29.99, status: 'paid', invoice: 'INV-2024-10-001' },
    { id: '4', date: '2024-09-08', amount: 29.99, status: 'paid', invoice: 'INV-2024-09-001' },
    { id: '5', date: '2024-08-08', amount: 29.99, status: 'paid', invoice: 'INV-2024-08-001' }
  ]);

  const [supportTickets] = useState([
    { id: '1', subject: 'Question about dispute process', status: 'resolved', date: '2024-12-05', priority: 'medium' },
    { id: '2', subject: 'Billing inquiry', status: 'open', date: '2024-12-01', priority: 'low' }
  ]);

  const plans = [
    {
      name: 'Basic',
      price: 19.99,
      features: [
        '5 Disputes per month',
        '3 Goodwill letters',
        'Basic credit monitoring',
        'Email support',
        'Educational resources'
      ],
      limits: {
        disputes: 5,
        goodwillLetters: 3,
        fcraViolations: 2,
        creditReports: 3
      }
    },
    {
      name: 'Pro',
      price: 29.99,
      popular: true,
      features: [
        '15 Disputes per month',
        '10 Goodwill letters',
        'Advanced credit monitoring',
        'FCRA violation tracking',
        'Priority support',
        'Letter templates',
        'Progress tracking'
      ],
      limits: {
        disputes: 15,
        goodwillLetters: 10,
        fcraViolations: 5,
        creditReports: 12
      }
    },
    {
      name: 'Premium',
      price: 49.99,
      features: [
        'Unlimited disputes',
        'Unlimited goodwill letters',
        'Real-time monitoring',
        'Legal letter generation',
        'Personal credit advisor',
        '24/7 priority support',
        'Advanced analytics',
        'API access'
      ],
      limits: {
        disputes: 999,
        goodwillLetters: 999,
        fcraViolations: 999,
        creditReports: 999
      }
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'billing', label: 'Billing & Payments', icon: CreditCard },
    { id: 'usage', label: 'Usage & Limits', icon: Zap },
    { id: 'plans', label: 'Plans & Pricing', icon: Crown },
    { id: 'support', label: 'Support', icon: HelpCircle }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'past_due': return 'bg-red-100 text-red-800';
      case 'canceled': return 'bg-gray-100 text-gray-800';
      case 'trial': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getUsageColor = (percentage) => {
    if (percentage >= 90) return 'bg-red-500';
    if (percentage >= 75) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Account Management</h1>
          <p className="text-gray-600">Manage your subscription, billing, and account preferences</p>
        </div>
        <div className="flex items-center space-x-3">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(accountData.subscription.status)}`}>
            {accountData.subscription.plan} Plan - {accountData.subscription.status.charAt(0).toUpperCase() + accountData.subscription.status.slice(1)}
          </span>
        </div>
      </div>

      {/* Account Status Alert */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-4">
        <div className="flex items-center space-x-3">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <div>
            <h3 className="font-medium text-green-800">Account in Good Standing</h3>
            <p className="text-sm text-green-700">
              Your {accountData.subscription.plan} subscription is active and will renew on {new Date(accountData.subscription.nextBilling).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Account Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <nav className="space-y-2">
              {tabs.map(tab => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-100 text-blue-700 font-medium'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <button className="w-full flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                <Settings className="w-4 h-4" />
                <span>Account Settings</span>
              </button>
              <button className="w-full flex items-center space-x-3 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg">
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>

        {/* Account Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Account Overview</h3>
                  
                  {/* Key Metrics */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-green-600">${accountData.stats.totalSaved}</p>
                      <p className="text-sm text-green-700">Total Saved</p>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <BarChart3 className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-blue-600">+{accountData.stats.scoreIncrease}</p>
                      <p className="text-sm text-blue-700">Score Increase</p>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <CheckCircle className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-purple-600">{accountData.stats.itemsRemoved}</p>
                      <p className="text-sm text-purple-700">Items Removed</p>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <Star className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-orange-600">{accountData.stats.successRate}%</p>
                      <p className="text-sm text-orange-700">Success Rate</p>
                    </div>
                  </div>

                  {/* Subscription Info */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <h4 className="font-medium text-gray-800 mb-3">Current Subscription</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Plan:</span>
                          <span className="font-medium">{accountData.subscription.plan}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Billing:</span>
                          <span className="font-medium">{formatCurrency(accountData.subscription.amount)}/{accountData.subscription.billingCycle}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Next billing:</span>
                          <span className="font-medium">{new Date(accountData.subscription.nextBilling).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Auto-renew:</span>
                          <span className={`font-medium ${accountData.subscription.autoRenew ? 'text-green-600' : 'text-red-600'}`}>
                            {accountData.subscription.autoRenew ? 'Enabled' : 'Disabled'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border border-gray-200 rounded-lg">
                      <h4 className="font-medium text-gray-800 mb-3">Payment Method</h4>
                      <div className="flex items-center space-x-3 mb-3">
                        <CreditCard className="w-8 h-8 text-gray-400" />
                        <div>
                          <p className="font-medium">{accountData.billing.paymentMethod.brand} ****{accountData.billing.paymentMethod.last4}</p>
                          <p className="text-sm text-gray-600">Expires {accountData.billing.paymentMethod.expiry}</p>
                        </div>
                      </div>
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                        Update Payment Method
                      </button>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div>
                  <h4 className="font-medium text-gray-800 mb-4">Quick Actions</h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    <button 
                      onClick={() => setActiveTab('plans')}
                      className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition-colors text-left"
                    >
                      <Crown className="w-6 h-6 text-blue-600 mb-2" />
                      <h5 className="font-medium text-gray-800">Upgrade Plan</h5>
                      <p className="text-sm text-gray-600">Get more features and higher limits</p>
                    </button>
                    <button 
                      onClick={() => setActiveTab('billing')}
                      className="p-4 border border-gray-200 rounded-lg hover:border-green-500 transition-colors text-left"
                    >
                      <Download className="w-6 h-6 text-green-600 mb-2" />
                      <h5 className="font-medium text-gray-800">Download Invoices</h5>
                      <p className="text-sm text-gray-600">Access your billing history</p>
                    </button>
                    <button 
                      onClick={() => setActiveTab('support')}
                      className="p-4 border border-gray-200 rounded-lg hover:border-purple-500 transition-colors text-left"
                    >
                      <HelpCircle className="w-6 h-6 text-purple-600 mb-2" />
                      <h5 className="font-medium text-gray-800">Get Support</h5>
                      <p className="text-sm text-gray-600">Contact our support team</p>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Billing Tab */}
            {activeTab === 'billing' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Billing & Payments</h3>
                  
                  {/* Next Bill */}
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg mb-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-blue-800">Next Bill</h4>
                        <p className="text-blue-700">{formatCurrency(accountData.billing.nextAmount)} due on {new Date(accountData.subscription.nextBilling).toLocaleDateString()}</p>
                      </div>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        Pay Now
                      </button>
                    </div>
                  </div>

                  {/* Payment Methods */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium text-gray-800">Payment Methods</h4>
                      <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                        Add Payment Method
                      </button>
                    </div>
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <CreditCard className="w-8 h-8 text-gray-400" />
                          <div>
                            <p className="font-medium">{accountData.billing.paymentMethod.brand} ****{accountData.billing.paymentMethod.last4}</p>
                            <p className="text-sm text-gray-600">Expires {accountData.billing.paymentMethod.expiry}</p>
                          </div>
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Primary</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button className="text-blue-600 hover:text-blue-700 text-sm">Edit</button>
                          <button className="text-red-600 hover:text-red-700 text-sm">Remove</button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Billing History */}
                  <div>
                    <h4 className="font-medium text-gray-800 mb-4">Billing History</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="text-left py-3 px-4 font-medium text-gray-700">Date</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-700">Amount</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-700">Invoice</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {billingHistory.map(bill => (
                            <tr key={bill.id} className="border-b border-gray-100">
                              <td className="py-3 px-4 text-gray-600">{new Date(bill.date).toLocaleDateString()}</td>
                              <td className="py-3 px-4 font-medium">{formatCurrency(bill.amount)}</td>
                              <td className="py-3 px-4">
                                <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(bill.status)}`}>
                                  {bill.status}
                                </span>
                              </td>
                              <td className="py-3 px-4 text-gray-600">{bill.invoice}</td>
                              <td className="py-3 px-4">
                                <button 
                                  onClick={() => alert(`Downloading invoice ${bill.invoice}`)}
                                  className="text-blue-600 hover:text-blue-700 text-sm"
                                >
                                  Download
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Usage Tab */}
            {activeTab === 'usage' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Usage & Limits</h3>
                  <p className="text-gray-600 mb-6">Track your monthly usage across all features</p>
                  
                  <div className="space-y-4">
                    {Object.entries(accountData.usage).map(([feature, data]) => (
                      <div key={feature} className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium text-gray-800 capitalize">
                            {feature.replace(/([A-Z])/g, ' $1').trim()}
                          </h4>
                          <span className="text-sm text-gray-600">
                            {data.used} / {data.limit === 999 ? '∞' : data.limit}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                          <div 
                            className={`h-2 rounded-full ${getUsageColor(data.percentage)}`}
                            style={{ width: `${Math.min(data.percentage, 100)}%` }}
                          ></div>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">{data.percentage}% used</span>
                          {data.percentage >= 90 && (
                            <span className="text-red-600 font-medium">Consider upgrading</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Usage Tips */}
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6 mt-6">
                    <h4 className="font-semibold text-gray-800 mb-3">💡 Usage Tips</h4>
                    <ul className="text-sm text-gray-700 space-y-2">
                      <li>• Usage resets on the 8th of each month (your billing date)</li>
                      <li>• Upgrade anytime to get higher limits and additional features</li>
                      <li>• Unused limits don't roll over to the next month</li>
                      <li>• Contact support if you need temporary limit increases</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Plans Tab */}
            {activeTab === 'plans' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Plans & Pricing</h3>
                  <p className="text-gray-600 mb-6">Choose the plan that best fits your credit repair needs</p>
                  
                  <div className="grid md:grid-cols-3 gap-6">
                    {plans.map(plan => (
                      <div key={plan.name} className={`border-2 rounded-xl p-6 relative ${
                        plan.name === accountData.subscription.plan 
                          ? 'border-blue-500 bg-blue-50' 
                          : plan.popular 
                            ? 'border-purple-500' 
                            : 'border-gray-200'
                      }`}>
                        {plan.popular && plan.name !== accountData.subscription.plan && (
                          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                            <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                              Most Popular
                            </span>
                          </div>
                        )}
                        {plan.name === accountData.subscription.plan && (
                          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                            <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                              Current Plan
                            </span>
                          </div>
                        )}
                        
                        <div className="text-center mb-6">
                          <h4 className="text-xl font-bold text-gray-800 mb-2">{plan.name}</h4>
                          <p className="text-3xl font-bold text-gray-900">
                            {formatCurrency(plan.price)}
                            <span className="text-sm font-normal text-gray-600">/month</span>
                          </p>
                        </div>

                        <ul className="space-y-3 mb-6">
                          {plan.features.map((feature, index) => (
                            <li key={index} className="flex items-center space-x-2">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <span className="text-sm text-gray-700">{feature}</span>
                            </li>
                          ))}
                        </ul>

                        <button 
                          onClick={() => {
                            if (plan.name === accountData.subscription.plan) {
                              alert('This is your current plan');
                            } else {
                              alert(`Upgrading to ${plan.name} plan...`);
                            }
                          }}
                          className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                            plan.name === accountData.subscription.plan
                              ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                              : plan.popular
                                ? 'bg-purple-600 text-white hover:bg-purple-700'
                                : 'bg-blue-600 text-white hover:bg-blue-700'
                          }`}
                          disabled={plan.name === accountData.subscription.plan}
                        >
                          {plan.name === accountData.subscription.plan ? 'Current Plan' : `Upgrade to ${plan.name}`}
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Plan Comparison */}
                  <div className="mt-8">
                    <h4 className="font-medium text-gray-800 mb-4">Feature Comparison</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full border border-gray-200 rounded-lg">
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="text-left py-3 px-4 font-medium text-gray-700">Feature</th>
                            {plans.map(plan => (
                              <th key={plan.name} className="text-center py-3 px-4 font-medium text-gray-700">
                                {plan.name}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-t border-gray-200">
                            <td className="py-3 px-4 font-medium">Monthly Disputes</td>
                            {plans.map(plan => (
                              <td key={plan.name} className="text-center py-3 px-4">
                                {plan.limits.disputes === 999 ? 'Unlimited' : plan.limits.disputes}
                              </td>
                            ))}
                          </tr>
                          <tr className="border-t border-gray-200">
                            <td className="py-3 px-4 font-medium">Goodwill Letters</td>
                            {plans.map(plan => (
                              <td key={plan.name} className="text-center py-3 px-4">
                                {plan.limits.goodwillLetters === 999 ? 'Unlimited' : plan.limits.goodwillLetters}
                              </td>
                            ))}
                          </tr>
                          <tr className="border-t border-gray-200">
                            <td className="py-3 px-4 font-medium">FCRA Violations</td>
                            {plans.map(plan => (
                              <td key={plan.name} className="text-center py-3 px-4">
                                {plan.limits.fcraViolations === 999 ? 'Unlimited' : plan.limits.fcraViolations}
                              </td>
                            ))}
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Support Tab */}
            {activeTab === 'support' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Support & Help</h3>
                  
                  {/* Support Options */}
                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="p-6 border border-gray-200 rounded-lg">
                      <HelpCircle className="w-8 h-8 text-blue-600 mb-4" />
                      <h4 className="font-medium text-gray-800 mb-2">Knowledge Base</h4>
                      <p className="text-sm text-gray-600 mb-4">Find answers to common questions and learn how to use our platform effectively.</p>
                      <button className="text-blue-600 hover:text-blue-700 font-medium">Browse Articles</button>
                    </div>

                    <div className="p-6 border border-gray-200 rounded-lg">
                      <Users className="w-8 h-8 text-green-600 mb-4" />
                      <h4 className="font-medium text-gray-800 mb-2">Contact Support</h4>
                      <p className="text-sm text-gray-600 mb-4">Get personalized help from our credit repair experts.</p>
                      <button 
                        onClick={() => alert('Opening support ticket form...')}
                        className="text-green-600 hover:text-green-700 font-medium"
                      >
                        Create Ticket
                      </button>
                    </div>
                  </div>

                  {/* Support Tickets */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium text-gray-800">Your Support Tickets</h4>
                      <button 
                        onClick={() => alert('Creating new support ticket...')}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        New Ticket
                      </button>
                    </div>
                    
                    {supportTickets.length === 0 ? (
                      <div className="text-center py-8 border border-gray-200 rounded-lg">
                        <HelpCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600">No support tickets yet</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {supportTickets.map(ticket => (
                          <div key={ticket.id} className="p-4 border border-gray-200 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <h5 className="font-medium text-gray-800">{ticket.subject}</h5>
                              <div className="flex items-center space-x-2">
                                <span className={`px-2 py-1 text-xs rounded-full ${
                                  ticket.status === 'open' ? 'bg-yellow-100 text-yellow-800' :
                                  ticket.status === 'resolved' ? 'bg-green-100 text-green-800' :
                                  'bg-gray-100 text-gray-800'
                                }`}>
                                  {ticket.status}
                                </span>
                                <span className={`px-2 py-1 text-xs rounded-full ${
                                  ticket.priority === 'high' ? 'bg-red-100 text-red-800' :
                                  ticket.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-blue-100 text-blue-800'
                                }`}>
                                  {ticket.priority}
                                </span>
                              </div>
                            </div>
                            <p className="text-sm text-gray-600">
                              Created on {new Date(ticket.date).toLocaleDateString()}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Quick Help */}
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-6">
                    <h4 className="font-semibold text-gray-800 mb-3">🚀 Quick Help</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-medium text-gray-700 mb-2">Getting Started:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Upload your credit reports</li>
                          <li>• Create your first dispute</li>
                          <li>• Set up monitoring alerts</li>
                          <li>• Review success strategies</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-700 mb-2">Contact Info:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Email: support@creditrepair.com</li>
                          <li>• Phone: 1-800-CREDIT-1</li>
                          <li>• Hours: Mon-Fri 9AM-6PM EST</li>
                          <li>• Emergency: 24/7 chat support</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountComponent;
