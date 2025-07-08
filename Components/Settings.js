'use client';

import { useState, useEffect } from 'react';
import { Settings as SettingsIcon, User, Bell, Shield, Database, Palette, Link, Eye, EyeOff, Save, RefreshCw, Download, Upload, Trash2, Key, Globe, Smartphone, Mail, Zap } from 'lucide-react';

const SettingsComponent = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [settings, setSettings] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('userSettings');
      return saved ? JSON.parse(saved) : {
        profile: {
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          phone: '+1 (555) 123-4567',
          dateOfBirth: '1990-01-15',
          ssn: '***-**-1234',
          address: {
            street: '123 Main Street',
            city: 'New York',
            state: 'NY',
            zipCode: '10001'
          }
        },
        notifications: {
          creditScore: true,
          newAccounts: true,
          disputes: true,
          goodwillLetters: false,
          fcraViolations: true,
          weeklyReports: true,
          email: true,
          sms: false,
          push: true,
          marketing: false
        },
        security: {
          twoFactor: false,
          loginAlerts: true,
          dataSharing: false,
          biometric: true,
          sessionTimeout: 30
        },
        preferences: {
          theme: 'light',
          language: 'en',
          timezone: 'America/New_York',
          currency: 'USD',
          dateFormat: 'MM/DD/YYYY',
          creditScoreProvider: 'average'
        },
        integrations: {
          adobe: false,
          microsoft: false,
          n8n: false,
          makecom: false,
          buffer: false,
          later: false,
          perplexity: false,
          thrivecart: false
        },
        privacy: {
          dataRetention: '7_years',
          analyticsOptOut: false,
          shareWithPartners: false,
          publicProfile: false,
          searchVisible: false
        }
      };
    }
    return {};
  });

  const [tempSettings, setTempSettings] = useState(settings);
  const [hasChanges, setHasChanges] = useState(false);

  // Save settings to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('userSettings', JSON.stringify(settings));
    }
  }, [settings]);

  // Check for changes
  useEffect(() => {
    setHasChanges(JSON.stringify(settings) !== JSON.stringify(tempSettings));
  }, [settings, tempSettings]);

  const handleSaveSettings = () => {
    setSettings(tempSettings);
    setHasChanges(false);
    alert('Settings saved successfully!');
  };

  const handleResetSettings = () => {
    setTempSettings(settings);
    setHasChanges(false);
  };

  const updateTempSetting = (category, key, value) => {
    setTempSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }));
  };

  const updateNestedSetting = (category, subCategory, key, value) => {
    setTempSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [subCategory]: {
          ...prev[category][subCategory],
          [key]: value
        }
      }
    }));
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'preferences', label: 'Preferences', icon: Palette },
    { id: 'integrations', label: 'Integrations', icon: Link },
    { id: 'privacy', label: 'Privacy', icon: Eye },
    { id: 'data', label: 'Data Management', icon: Database }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Settings</h1>
          <p className="text-gray-600">Manage your account preferences and security settings</p>
        </div>
        {hasChanges && (
          <div className="flex items-center space-x-3">
            <button
              onClick={handleResetSettings}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveSettings}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        )}
      </div>

      {hasChanges && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-center space-x-2">
            <RefreshCw className="w-4 h-4 text-blue-600" />
            <span className="text-blue-800 font-medium">You have unsaved changes</span>
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Settings Navigation */}
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
          </div>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            
            {/* Profile Settings */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Personal Information</h3>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                      <input
                        type="text"
                        value={tempSettings.profile?.firstName || ''}
                        onChange={(e) => updateTempSetting('profile', 'firstName', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                      <input
                        type="text"
                        value={tempSettings.profile?.lastName || ''}
                        onChange={(e) => updateTempSetting('profile', 'lastName', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                      <input
                        type="email"
                        value={tempSettings.profile?.email || ''}
                        onChange={(e) => updateTempSetting('profile', 'email', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                      <input
                        type="tel"
                        value={tempSettings.profile?.phone || ''}
                        onChange={(e) => updateTempSetting('profile', 'phone', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                      <input
                        type="date"
                        value={tempSettings.profile?.dateOfBirth || ''}
                        onChange={(e) => updateTempSetting('profile', 'dateOfBirth', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">SSN (Last 4 digits)</label>
                      <input
                        type="text"
                        value={tempSettings.profile?.ssn || ''}
                        onChange={(e) => updateTempSetting('profile', 'ssn', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="***-**-1234"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-800 mb-4">Address Information</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
                      <input
                        type="text"
                        value={tempSettings.profile?.address?.street || ''}
                        onChange={(e) => updateNestedSetting('profile', 'address', 'street', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                        <input
                          type="text"
                          value={tempSettings.profile?.address?.city || ''}
                          onChange={(e) => updateNestedSetting('profile', 'address', 'city', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                        <input
                          type="text"
                          value={tempSettings.profile?.address?.state || ''}
                          onChange={(e) => updateNestedSetting('profile', 'address', 'state', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code</label>
                        <input
                          type="text"
                          value={tempSettings.profile?.address?.zipCode || ''}
                          onChange={(e) => updateNestedSetting('profile', 'address', 'zipCode', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notification Settings */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Notification Preferences</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-700 mb-3">Credit Monitoring Alerts</h4>
                      <div className="space-y-3">
                        {[
                          { key: 'creditScore', label: 'Credit Score Changes', desc: 'Get notified when your credit score changes' },
                          { key: 'newAccounts', label: 'New Account Alerts', desc: 'Alert when new accounts are opened' },
                          { key: 'disputes', label: 'Dispute Updates', desc: 'Updates on your dispute progress' },
                          { key: 'goodwillLetters', label: 'Goodwill Letter Responses', desc: 'Responses from creditors on goodwill requests' },
                          { key: 'fcraViolations', label: 'FCRA Violation Alerts', desc: 'Notifications about potential FCRA violations' }
                        ].map(item => (
                          <div key={item.key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div>
                              <p className="font-medium text-gray-800">{item.label}</p>
                              <p className="text-sm text-gray-600">{item.desc}</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={tempSettings.notifications?.[item.key] || false}
                                onChange={(e) => updateTempSetting('notifications', item.key, e.target.checked)}
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-700 mb-3">Delivery Methods</h4>
                      <div className="grid md:grid-cols-3 gap-4">
                        {[
                          { key: 'email', label: 'Email', icon: Mail },
                          { key: 'sms', label: 'SMS/Text', icon: Smartphone },
                          { key: 'push', label: 'Push Notifications', icon: Bell }
                        ].map(method => {
                          const IconComponent = method.icon;
                          return (
                            <div key={method.key} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                              <IconComponent className="w-5 h-5 text-gray-600" />
                              <span className="flex-1 font-medium text-gray-700">{method.label}</span>
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={tempSettings.notifications?.[method.key] || false}
                                  onChange={(e) => updateTempSetting('notifications', method.key, e.target.checked)}
                                  className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                              </label>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Security Settings */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Security & Privacy</h3>
                  
                  <div className="space-y-4">
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-800">Two-Factor Authentication</h4>
                          <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                        </div>
                        <button
                          onClick={() => updateTempSetting('security', 'twoFactor', !tempSettings.security?.twoFactor)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium ${
                            tempSettings.security?.twoFactor
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                          }`}
                        >
                          {tempSettings.security?.twoFactor ? 'Enabled' : 'Enable'}
                        </button>
                      </div>
                    </div>

                    <div className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-800">Login Alerts</h4>
                          <p className="text-sm text-gray-600">Get notified of logins from new devices</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={tempSettings.security?.loginAlerts || false}
                            onChange={(e) => updateTempSetting('security', 'loginAlerts', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>

                    <div className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-800">Session Timeout</h4>
                          <p className="text-sm text-gray-600">Automatically log out after inactivity</p>
                        </div>
                        <select
                          value={tempSettings.security?.sessionTimeout || 30}
                          onChange={(e) => updateTempSetting('security', 'sessionTimeout', parseInt(e.target.value))}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        >
                          <option value={15}>15 minutes</option>
                          <option value={30}>30 minutes</option>
                          <option value={60}>1 hour</option>
                          <option value={120}>2 hours</option>
                          <option value={0}>Never</option>
                        </select>
                      </div>
                    </div>

                    <div className="p-4 border border-red-200 rounded-lg bg-red-50">
                      <h4 className="font-medium text-red-800 mb-2">Change Password</h4>
                      <p className="text-sm text-red-600 mb-3">Update your account password</p>
                      <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm">
                        Change Password
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Preferences */}
            {activeTab === 'preferences' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Display & Language</h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
                      <select
                        value={tempSettings.preferences?.theme || 'light'}
                        onChange={(e) => updateTempSetting('preferences', 'theme', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                        <option value="auto">Auto (System)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                      <select
                        value={tempSettings.preferences?.language || 'en'}
                        onChange={(e) => updateTempSetting('preferences', 'language', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="en">English</option>
                        <option value="es">Español</option>
                        <option value="fr">Français</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
                      <select
                        value={tempSettings.preferences?.timezone || 'America/New_York'}
                        onChange={(e) => updateTempSetting('preferences', 'timezone', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="America/New_York">Eastern Time</option>
                        <option value="America/Chicago">Central Time</option>
                        <option value="America/Denver">Mountain Time</option>
                        <option value="America/Los_Angeles">Pacific Time</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Date Format</label>
                      <select
                        value={tempSettings.preferences?.dateFormat || 'MM/DD/YYYY'}
                        onChange={(e) => updateTempSetting('preferences', 'dateFormat', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                        <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                        <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-800 mb-4">Credit Monitoring Preferences</h4>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Default Credit Score Display</label>
                    <select
                      value={tempSettings.preferences?.creditScoreProvider || 'average'}
                      onChange={(e) => updateTempSetting('preferences', 'creditScoreProvider', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="average">Average of All Three</option>
                      <option value="equifax">Equifax Only</option>
                      <option value="transunion">TransUnion Only</option>
                      <option value="experian">Experian Only</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Integrations */}
            {activeTab === 'integrations' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Third-Party Integrations</h3>
                  <p className="text-gray-600 mb-6">Connect your favorite tools and services to enhance your credit repair workflow</p>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      { key: 'adobe', name: 'Adobe Creative Cloud', desc: 'Generate professional dispute letters and reports', icon: '🎨' },
                      { key: 'microsoft', name: 'Microsoft Office 365', desc: 'Sync documents and calendar events', icon: '📋' },
                      { key: 'n8n', name: 'N8N Automation', desc: 'Automate your credit repair workflows', icon: '🔄' },
                      { key: 'makecom', name: 'Make.com', desc: 'Advanced automation and integrations', icon: '⚡' },
                      { key: 'buffer', name: 'Buffer', desc: 'Schedule social media updates about your progress', icon: '📱' },
                      { key: 'later', name: 'Later', desc: 'Social media scheduling and planning', icon: '📅' },
                      { key: 'perplexity', name: 'Perplexity AI', desc: 'Enhanced research for dispute strategies', icon: '🧠' },
                      { key: 'thrivecart', name: 'ThriveCart', desc: 'Billing and subscription management', icon: '💳' }
                    ].map(integration => (
                      <div key={integration.key} className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <span className="text-2xl">{integration.icon}</span>
                            <div>
                              <h4 className="font-medium text-gray-800">{integration.name}</h4>
                              <p className="text-sm text-gray-600">{integration.desc}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => updateTempSetting('integrations', integration.key, !tempSettings.integrations?.[integration.key])}
                            className={`px-3 py-1 rounded text-sm font-medium ${
                              tempSettings.integrations?.[integration.key]
                                ? 'bg-green-100 text-green-800'
                                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                            }`}
                          >
                            {tempSettings.integrations?.[integration.key] ? 'Connected' : 'Connect'}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Privacy Settings */}
            {activeTab === 'privacy' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Privacy Controls</h3>
                  
                  <div className="space-y-4">
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-800">Data Retention Period</h4>
                          <p className="text-sm text-gray-600">How long to keep your credit repair data</p>
                        </div>
                        <select
                          value={tempSettings.privacy?.dataRetention || '7_years'}
                          onChange={(e) => updateTempSetting('privacy', 'dataRetention', e.target.value)}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="1_year">1 Year</option>
                          <option value="3_years">3 Years</option>
                          <option value="7_years">7 Years (Recommended)</option>
                          <option value="10_years">10 Years</option>
                          <option value="indefinite">Indefinite</option>
                        </select>
                      </div>
                    </div>

                    {[
                      { key: 'analyticsOptOut', label: 'Opt Out of Analytics', desc: 'Disable usage analytics and tracking' },
                      { key: 'shareWithPartners', label: 'Share with Partners', desc: 'Allow sharing anonymized data with credit partners' },
                      { key: 'publicProfile', label: 'Public Profile', desc: 'Make your success story publicly visible' },
                      { key: 'searchVisible', label: 'Search Visibility', desc: 'Allow your profile to appear in search results' }
                    ].map(item => (
                      <div key={item.key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-800">{item.label}</h4>
                          <p className="text-sm text-gray-600">{item.desc}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={tempSettings.privacy?.[item.key] || false}
                            onChange={(e) => updateTempSetting('privacy', item.key, e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Data Management */}
            {activeTab === 'data' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Data Management</h3>
                  
                  <div className="space-y-4">
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <h4 className="font-medium text-gray-800 mb-2">Export Your Data</h4>
                      <p className="text-sm text-gray-600 mb-4">Download a complete copy of your credit repair data</p>
                      <button 
                        onClick={() => alert('Data export initiated. You will receive an email when ready.')}
                        className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        <Download className="w-4 h-4" />
                        <span>Export Data</span>
                      </button>
                    </div>

                    <div className="p-4 border border-gray-200 rounded-lg">
                      <h4 className="font-medium text-gray-800 mb-2">Import Data</h4>
                      <p className="text-sm text-gray-600 mb-4">Import credit repair data from another service</p>
                      <button 
                        onClick={() => alert('Data import feature coming soon!')}
                        className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                      >
                        <Upload className="w-4 h-4" />
                        <span>Import Data</span>
                      </button>
                    </div>

                    <div className="p-4 border border-red-200 rounded-lg bg-red-50">
                      <h4 className="font-medium text-red-800 mb-2">Delete Account</h4>
                      <p className="text-sm text-red-600 mb-4">Permanently delete your account and all associated data</p>
                      <button 
                        onClick={() => {
                          if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
                            alert('Account deletion initiated. You will receive a confirmation email.');
                          }
                        }}
                        className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Delete Account</span>
                      </button>
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

export default SettingsComponent;
