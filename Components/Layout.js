'use client';'use client';

import { useState } from 'react';
import { User, Upload, FileText, Target, Heart, Shield, BarChart3, Settings, Users, FileCheck, Monitor, Mail, Clock, AlertTriangle, TrendingUp, Zap, LogOut, Scale } from 'lucide-react';
import CreditFreeze from './CreditFreeze';
import DisputeGenerator from './DisputeGenerator';
import UploadComponent from './Upload';
import DisputesComponent from './Disputes';
import TrackComponent from './Track';
import GoodwillComponent from './Goodwill';
import MonitorComponent from './Monitor';
import MailComponent from './Mail';
import FCRAComponent from './FCRA';
import SettingsComponent from './Settings';
import AccountComponent from './Account';
import UserManagementComponent from './UserManagement';
import PrivacyPolicyComponent from './PrivacyPolicy';
import TermsConditionsComponent from './TermsConditions';

const Layout = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  // Dashboard Component
  const DashboardComponent = () => (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">Credit Dashboard</h1>
        <p className="text-gray-600">Monitor your credit scores and track your progress</p>
      </div>

      {/* Average Credit Score Card */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
        <h2 className="text-lg font-medium text-blue-100 mb-2">Average Credit Score</h2>
        <div className="text-6xl font-bold mb-2">695</div>
        <div className="flex items-center space-x-2 mb-3">
          <span className="text-blue-100">📊 Fair Credit</span>
        </div>
        <p className="text-blue-100">55 points to reach 750!</p>
      </div>

      {/* Individual Credit Bureau Cards */}
      <div className="space-y-4">
        {[
          { name: 'Equifax', score: 680, updated: '12/14/2024', progress: 68 },
          { name: 'Transunion', score: 695, updated: '12/14/2024', progress: 70 },
          { name: 'Experian', score: 710, updated: '12/14/2024', progress: 75 }
        ].map((bureau) => (
          <div key={bureau.name} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{bureau.name}</h3>
                <p className="text-sm text-gray-600">Updated {bureau.updated}</p>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-gray-400" />
              </div>
            </div>
            
            <div className="text-4xl font-bold text-gray-900 mb-4">{bureau.score}</div>
            
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-yellow-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${bureau.progress}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const OtherComponents = ({ title, description, icon: Icon }) => (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">{title}</h1>
        <p className="text-gray-600">{description}</p>
      </div>
      <div className="p-12 text-center bg-white rounded-xl border border-gray-200">
        <Icon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600">Coming Soon</p>
      </div>
    </div>
  );

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'credit-freeze', label: 'Credit Freeze', icon: Shield },
    { id: 'upload', label: 'Upload', icon: Upload },
    { id: 'disputes', label: 'Disputes', icon: FileText },
    { id: 'track', label: 'Track', icon: Clock },
    { id: 'goodwill', label: 'Goodwill', icon: Mail },
    { id: 'monitor', label: 'Monitor', icon: Target },
    { id: 'mail', label: 'Mail', icon: Mail },    { id: 'fcra', label: 'FCRA', icon: AlertTriangle },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'account', label: 'Account', icon: User },
    { id: 'users', label: 'User Management', icon: Users, adminOnly: true }
  ];

  const [userRole] = useState('admin'); // Change to 'customer' for regular users

  // Filter navigation items based on user role
  const filteredNavigation = menuItems.filter(item => {
    if (item.adminOnly && userRole !== 'admin') {
      return false;
    }
    return true;
  });
  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardComponent />;
      case 'credit-freeze': return <CreditFreeze />;
      case 'upload': return <UploadComponent />;
      case 'disputes': return <DisputesComponent />;
      case 'track': return <TrackComponent />;
      case 'goodwill': return <GoodwillComponent />;
      case 'monitor': return <MonitorComponent />;
      case 'fcra': return <FCRAComponent />;
      case 'settings': return <SettingsComponent />;
      case 'account': return <AccountComponent />;
      case 'users': return <UserManagementComponent />;
      case 'mail': return <MailComponent />;      case 'privacy': return <PrivacyPolicyComponent />;
      case 'terms': return <TermsConditionsComponent />;
      case 'track': return <OtherComponents title="Track Progress" description="Monitor your dispute timeline and progress" icon={Clock} />;
      case 'goodwill': return <OtherComponents title="Goodwill Letters" description="Request removal of negative items through goodwill" icon={Mail} />;
      case 'monitor': return <OtherComponents title="Credit Monitoring" description="Real-time credit monitoring and alerts" icon={Target} />;
      case 'fcra': return <OtherComponents title="FCRA Violations" description="Track Fair Credit Reporting Act violations" icon={AlertTriangle} />;
      case 'settings': return <OtherComponents title="Settings" description="Manage your account settings and preferences" icon={Settings} />;
      case 'account': return <OtherComponents title="Account" description="View your account details and billing information" icon={User} />;
      default: return <DashboardComponent />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Sidebar - Always Visible */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <Zap className="w-6 h-6 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">AI750Credit</span>
            {userRole === 'admin' && (
              <span className="px-2 py-1 bg-red-600 text-white text-xs rounded-full font-medium ml-2">
                ADMIN
              </span>
            )}          </div>
        </div>

        {/* User Profile */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
              S
            </div>
            <div>
              <p className="font-semibold text-gray-900">Samuel Thomas</p>
              <p className="text-sm text-gray-500">Free Trial</p>
            </div>
          </div>
        </div>

        {/* Vertical Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {filteredNavigation.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`
                  w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors
                  ${isActive 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }
                `}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Free Trial Section */}
        <div className="p-4 border-t border-gray-200">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Clock className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-900">Free Trial</span>
            </div>
            <p className="text-sm text-blue-700 mb-3">5 days left</p>
            <button className="w-full bg-blue-600 text-white text-sm py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
              Upgrade Now
            </button>
          </div>
        </div>
      </div>
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 px-6 h-16 flex items-center justify-end">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
              S
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 text-sm text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors">
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
            <button 
              onClick={() => setActiveTab('privacy')}
              className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
            >
              <FileText className="w-4 h-4" />
              <span>Privacy Policy</span>
            </button>
            <button
              onClick={() => setActiveTab('terms')}
              className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
            >
              <Scale className="w-4 h-4" />
              <span>Terms & Conditions</span>
            </button>
          </div>
        {/* Main Content */}
        </header>
        
        <main className="flex-1 p-6 overflow-y-auto">
          {renderActiveComponent()}
        </main>
      </div>
    </div>
  );
};

export default Layout;
