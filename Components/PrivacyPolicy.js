'use client';

import { useState } from 'react';
import { Shield, Eye, Lock, FileText, Users, Database, Globe, Clock, Mail, Phone } from 'lucide-react';

const PrivacyPolicyComponent = () => {
  const [activeSection, setActiveSection] = useState('overview');

  const sections = [
    { id: 'overview', label: 'Overview', icon: Eye },
    { id: 'collection', label: 'Information We Collect', icon: Database },
    { id: 'usage', label: 'How We Use Information', icon: FileText },
    { id: 'sharing', label: 'Information Sharing', icon: Users },
    { id: 'security', label: 'Data Security', icon: Shield },
    { id: 'rights', label: 'Your Rights', icon: Lock },
    { id: 'cookies', label: 'Cookies & Tracking', icon: Globe },
    { id: 'retention', label: 'Data Retention', icon: Clock },
    { id: 'contact', label: 'Contact Us', icon: Mail }
  ];

  const lastUpdated = 'December 10, 2024';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
        <p className="text-gray-600 mb-4">Your privacy and data security are our top priorities</p>
        <div className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg">
          <Clock className="w-4 h-4 text-blue-600" />
          <span className="text-sm text-blue-800">Last updated: {lastUpdated}</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-gray-200 p-4 sticky top-4">
            <h3 className="font-semibold text-gray-800 mb-4">Table of Contents</h3>
            <nav className="space-y-1">
              {sections.map(section => {
                const IconComponent = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left text-sm transition-colors ${
                      activeSection === section.id
                        ? 'bg-blue-100 text-blue-700 font-medium'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span>{section.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl border border-gray-200 p-8">
            
            {/* Overview */}
            {activeSection === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Privacy Policy Overview</h2>
                  <p className="text-gray-700 mb-6">
                    At AI750Credit, we understand that your personal and financial information is sensitive and valuable. 
                    This Privacy Policy explains how we collect, use, protect, and share your information when you use our 
                    credit repair and monitoring services.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-6 bg-green-50 border border-green-200 rounded-lg">
                    <Shield className="w-8 h-8 text-green-600 mb-4" />
                    <h3 className="font-semibold text-green-800 mb-2">Bank-Level Security</h3>
                    <p className="text-sm text-green-700">
                      We use 256-bit SSL encryption and SOC 2 compliance to protect your sensitive financial data.
                    </p>
                  </div>
                  <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg">
                    <Lock className="w-8 h-8 text-blue-600 mb-4" />
                    <h3 className="font-semibold text-blue-800 mb-2">Your Control</h3>
                    <p className="text-sm text-blue-700">
                      You have full control over your data with rights to access, modify, or delete your information.
                    </p>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                  <h3 className="font-semibold text-yellow-800 mb-2">Key Points:</h3>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• We only collect information necessary for credit repair services</li>
                    <li>• Your data is never sold to third parties</li>
                    <li>• You can opt out of marketing communications at any time</li>
                    <li>• We retain data only as long as legally required or useful for services</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Information Collection */}
            {activeSection === 'collection' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Information We Collect</h2>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Personal Information</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <ul className="text-gray-700 space-y-2">
                        <li>• <strong>Identity Information:</strong> Full name, date of birth, Social Security number</li>
                        <li>• <strong>Contact Information:</strong> Email address, phone number, mailing address</li>
                        <li>• <strong>Financial Information:</strong> Credit reports, account numbers, payment history</li>
                        <li>• <strong>Authentication Data:</strong> Username, password, security questions</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Automatically Collected Information</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <ul className="text-gray-700 space-y-2">
                        <li>• <strong>Usage Data:</strong> Pages visited, features used, time spent on platform</li>
                        <li>• <strong>Device Information:</strong> IP address, browser type, operating system</li>
                        <li>• <strong>Cookies:</strong> Session cookies, preference cookies, analytics cookies</li>
                        <li>• <strong>Location Data:</strong> General geographic location (city/state level)</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Third-Party Information</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <ul className="text-gray-700 space-y-2">
                        <li>• <strong>Credit Bureaus:</strong> Credit reports, scores, and monitoring data</li>
                        <li>• <strong>Identity Verification:</strong> Background check and verification services</li>
                        <li>• <strong>Payment Processors:</strong> Billing and payment transaction data</li>
                        <li>• <strong>Marketing Partners:</strong> Referral and attribution data (anonymized)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Usage */}
            {activeSection === 'usage' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Use Your Information</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800">Service Delivery</h3>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <ul className="text-sm text-blue-800 space-y-2">
                        <li>• Generate and send dispute letters</li>
                        <li>• Monitor credit report changes</li>
                        <li>• Provide credit score tracking</li>
                        <li>• Create goodwill letters</li>
                        <li>• Track FCRA violations</li>
                        <li>• Offer personalized recommendations</li>
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800">Account Management</h3>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <ul className="text-sm text-green-800 space-y-2">
                        <li>• Verify your identity</li>
                        <li>• Process payments and billing</li>
                        <li>• Provide customer support</li>
                        <li>• Send service notifications</li>
                        <li>• Maintain account security</li>
                        <li>• Comply with legal obligations</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Communication & Marketing</h3>
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <ul className="text-purple-800 space-y-2">
                      <li>• Send important service updates and alerts</li>
                      <li>• Provide educational content about credit repair</li>
                      <li>• Offer promotional materials (with your consent)</li>
                      <li>• Conduct customer satisfaction surveys</li>
                      <li>• Share success stories (anonymized, with permission)</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Legal Basis for Processing</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-700 mb-3">We process your personal information based on:</p>
                    <ul className="text-gray-700 space-y-1">
                      <li>• <strong>Contract Performance:</strong> To provide the credit repair services you've requested</li>
                      <li>• <strong>Legitimate Interest:</strong> To improve our services and prevent fraud</li>
                      <li>• <strong>Legal Compliance:</strong> To comply with financial regulations and reporting requirements</li>
                      <li>• <strong>Consent:</strong> For marketing communications and optional features</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Information Sharing */}
            {activeSection === 'sharing' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Information Sharing</h2>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                    <p className="text-red-800 font-semibold">
                      🚨 We DO NOT sell, rent, or trade your personal information to third parties for marketing purposes.
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">When We May Share Information</h3>
                    
                    <div className="space-y-4">
                      <div className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-medium text-gray-800 mb-2">Service Providers</h4>
                        <p className="text-sm text-gray-600 mb-2">
                          We share information with trusted partners who help us deliver services:
                        </p>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Credit bureaus (Equifax, TransUnion, Experian)</li>
                          <li>• Payment processors (Stripe, PayPal)</li>
                          <li>• Cloud storage providers (AWS, Google Cloud)</li>
                          <li>• Analytics services (Google Analytics)</li>
                          <li>• Customer support tools</li>
                        </ul>
                      </div>

                      <div className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-medium text-gray-800 mb-2">Legal Requirements</h4>
                        <p className="text-sm text-gray-600 mb-2">
                          We may disclose information when required by law:
                        </p>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Court orders or subpoenas</li>
                          <li>• Regulatory investigations</li>
                          <li>• Anti-money laundering compliance</li>
                          <li>• Fraud prevention and investigation</li>
                        </ul>
                      </div>

                      <div className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-medium text-gray-800 mb-2">Business Transfers</h4>
                        <p className="text-sm text-gray-600">
                          In the event of a merger, acquisition, or sale of assets, your information may be transferred 
                          to the new entity. You will be notified via email of any such change.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Data Security */}
            {activeSection === 'security' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Security</h2>
                  <p className="text-gray-700 mb-6">
                    We implement industry-leading security measures to protect your sensitive financial information.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <Shield className="w-6 h-6 text-green-600 mb-2" />
                      <h3 className="font-semibold text-green-800 mb-2">Encryption</h3>
                      <ul className="text-sm text-green-700 space-y-1">
                        <li>• 256-bit SSL/TLS encryption</li>
                        <li>• AES-256 data encryption at rest</li>
                        <li>• End-to-end encrypted communications</li>
                        <li>• Encrypted database storage</li>
                      </ul>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <Lock className="w-6 h-6 text-blue-600 mb-2" />
                      <h3 className="font-semibold text-blue-800 mb-2">Access Controls</h3>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• Multi-factor authentication</li>
                        <li>• Role-based access permissions</li>
                        <li>• Regular access reviews</li>
                        <li>• Secure API endpoints</li>
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                      <Database className="w-6 h-6 text-purple-600 mb-2" />
                      <h3 className="font-semibold text-purple-800 mb-2">Infrastructure</h3>
                      <ul className="text-sm text-purple-700 space-y-1">
                        <li>• SOC 2 Type II compliant hosting</li>
                        <li>• Regular security audits</li>
                        <li>• Automated backup systems</li>
                        <li>• 24/7 security monitoring</li>
                      </ul>
                    </div>

                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                      <Users className="w-6 h-6 text-orange-600 mb-2" />
                      <h3 className="font-semibold text-orange-800 mb-2">Employee Training</h3>
                      <ul className="text-sm text-orange-700 space-y-1">
                        <li>• Security awareness training</li>
                        <li>• Background checks</li>
                        <li>• Confidentiality agreements</li>
                        <li>• Principle of least privilege</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h3 className="font-semibold text-yellow-800 mb-2">Security Incident Response</h3>
                  <p className="text-sm text-yellow-700">
                    In the unlikely event of a security incident, we will notify affected users within 72 hours 
                    and provide detailed information about the incident, actions taken, and steps to protect your information.
                  </p>
                </div>
              </div>
            )}

            {/* Your Rights */}
            {activeSection === 'rights' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Privacy Rights</h2>
                  <p className="text-gray-700 mb-6">
                    You have important rights regarding your personal information. We're committed to helping you exercise these rights.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h3 className="font-semibold text-gray-800 mb-2">Access & Portability</h3>
                      <p className="text-sm text-gray-600 mb-2">You have the right to:</p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Access your personal information</li>
                        <li>• Download a copy of your data</li>
                        <li>• Request data in a portable format</li>
                        <li>• Understand how your data is used</li>
                      </ul>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                      <h3 className="font-semibold text-gray-800 mb-2">Correction & Updates</h3>
                      <p className="text-sm text-gray-600 mb-2">You can:</p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Correct inaccurate information</li>
                        <li>• Update your profile details</li>
                        <li>• Modify communication preferences</li>
                        <li>• Change your password</li>
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h3 className="font-semibold text-gray-800 mb-2">Deletion & Restriction</h3>
                      <p className="text-sm text-gray-600 mb-2">You can request to:</p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Delete your account and data</li>
                        <li>• Restrict processing of your data</li>
                        <li>• Object to certain data uses</li>
                        <li>• Withdraw consent at any time</li>
                      </ul>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                      <h3 className="font-semibold text-gray-800 mb-2">Marketing & Communications</h3>
                      <p className="text-sm text-gray-600 mb-2">You can:</p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Opt out of marketing emails</li>
                        <li>• Unsubscribe from newsletters</li>
                        <li>• Control notification preferences</li>
                        <li>• Choose communication channels</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-800 mb-2">How to Exercise Your Rights</h3>
                  <p className="text-sm text-blue-700 mb-2">
                    To exercise any of these rights, you can:
                  </p>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Update preferences in your account settings</li>
                    <li>• Email us at privacy@ai750credit.com</li>
                    <li>• Contact our support team through the platform</li>
                    <li>• Call our privacy hotline at 1-800-PRIVACY</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Cookies */}
            {activeSection === 'cookies' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookies & Tracking Technologies</h2>
                  <p className="text-gray-700 mb-6">
                    We use cookies and similar technologies to improve your experience, analyze usage, and provide personalized services.
                  </p>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Types of Cookies We Use</h3>
                    
                    <div className="space-y-4">
                      <div className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-medium text-gray-800 mb-2">Essential Cookies</h4>
                        <p className="text-sm text-gray-600 mb-2">
                          Required for basic platform functionality:
                        </p>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Session management and authentication</li>
                          <li>• Security and fraud prevention</li>
                          <li>• Load balancing and performance</li>
                          <li>• Form data persistence</li>
                        </ul>
                      </div>

                      <div className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-medium text-gray-800 mb-2">Analytics Cookies</h4>
                        <p className="text-sm text-gray-600 mb-2">
                          Help us understand how you use our platform:
                        </p>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Page views and user journeys</li>
                          <li>• Feature usage and popularity</li>
                          <li>• Performance metrics</li>
                          <li>• Error tracking and debugging</li>
                        </ul>
                      </div>

                      <div className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-medium text-gray-800 mb-2">Preference Cookies</h4>
                        <p className="text-sm text-gray-600 mb-2">
                          Remember your settings and preferences:
                        </p>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Language and region settings</li>
                          <li>• Theme and display preferences</li>
                          <li>• Notification preferences</li>
                          <li>• Dashboard customizations</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-800 mb-2">Managing Cookies</h3>
                    <p className="text-sm text-gray-700 mb-2">
                      You can control cookies through:
                    </p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Your browser settings (disable, delete, or block cookies)</li>
                      <li>• Our cookie preference center (coming soon)</li>
                      <li>• Opt-out links for third-party analytics</li>
                      <li>• Private/incognito browsing mode</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Data Retention */}
            {activeSection === 'retention' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Retention</h2>
                  <p className="text-gray-700 mb-6">
                    We retain your information only as long as necessary to provide services, comply with legal obligations, 
                    and protect our legitimate business interests.
                  </p>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Retention Periods</h3>
                    
                    <div className="space-y-4">
                      <div className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-medium text-gray-800 mb-2">Active Account Data</h4>
                        <p className="text-sm text-gray-600">
                          <strong>Retention:</strong> While your account is active and for up to 1 year after account closure<br/>
                          <strong>Includes:</strong> Profile information, credit reports, dispute history, payment records
                        </p>
                      </div>

                      <div className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-medium text-gray-800 mb-2">Financial Records</h4>
                        <p className="text-sm text-gray-600">
                          <strong>Retention:</strong> 7 years (required by financial regulations)<br/>
                          <strong>Includes:</strong> Billing history, payment transactions, tax records, audit trails
                        </p>
                      </div>

                      <div className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-medium text-gray-800 mb-2">Communication Records</h4>
                        <p className="text-sm text-gray-600">
                          <strong>Retention:</strong> 3 years<br/>
                          <strong>Includes:</strong> Customer support tickets, email communications, dispute correspondence
                        </p>
                      </div>

                      <div className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-medium text-gray-800 mb-2">Marketing Data</h4>
                        <p className="text-sm text-gray-600">
                          <strong>Retention:</strong> Until you opt out or 2 years of inactivity<br/>
                          <strong>Includes:</strong> Email preferences, campaign interactions, anonymized analytics
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="font-semibold text-blue-800 mb-2">Secure Deletion</h3>
                    <p className="text-sm text-blue-700">
                      When data retention periods expire, we securely delete your information using industry-standard 
                      methods including cryptographic erasure and multi-pass overwriting to ensure data cannot be recovered.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Contact */}
            {activeSection === 'contact' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
                  <p className="text-gray-700 mb-6">
                    We're here to help with any privacy questions or concerns. Contact us through any of the methods below.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <Mail className="w-5 h-5 text-blue-600" />
                        <h3 className="font-semibold text-gray-800">Email</h3>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        <strong>Privacy Questions:</strong> privacy@ai750credit.com<br/>
                        <strong>General Support:</strong> support@ai750credit.com<br/>
                        <strong>Security Issues:</strong> security@ai750credit.com
                      </p>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <Phone className="w-5 h-5 text-green-600" />
                        <h3 className="font-semibold text-gray-800">Phone</h3>
                      </div>
                      <p className="text-sm text-gray-600">
                        <strong>Privacy Hotline:</strong> 1-800-PRIVACY<br/>
                        <strong>Customer Support:</strong> 1-800-CREDIT-1<br/>
                        <strong>Hours:</strong> Monday-Friday, 9 AM - 6 PM EST
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <FileText className="w-5 h-5 text-purple-600" />
                        <h3 className="font-semibold text-gray-800">Mailing Address</h3>
                      </div>
                      <p className="text-sm text-gray-600">
                        AI750Credit, Inc.<br/>
                        Privacy Department<br/>
                        123 Financial District<br/>
                        New York, NY 10004<br/>
                        United States
                      </p>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <Clock className="w-5 h-5 text-orange-600" />
                        <h3 className="font-semibold text-gray-800">Response Times</h3>
                      </div>
                      <p className="text-sm text-gray-600">
                        <strong>Privacy Requests:</strong> 5 business days<br/>
                        <strong>Security Issues:</strong> 24 hours<br/>
                        <strong>General Inquiries:</strong> 2 business days
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-800 mb-4">Changes to This Privacy Policy</h3>
                  <p className="text-sm text-gray-700 mb-3">
                    We may update this Privacy Policy from time to time to reflect changes in our practices, 
                    technology, legal requirements, or other factors. When we make changes:
                  </p>
                  <ul className="text-sm text-gray-700 space-y-1 mb-3">
                    <li>• We'll update the "Last Modified" date at the top of this policy</li>
                    <li>• We'll notify you via email for material changes</li>
                    <li>• We'll post a notice on our platform for 30 days</li>
                    <li>• We'll maintain previous versions for your reference</li>
                  </ul>
                  <p className="text-sm text-gray-700">
                    Continued use of our services after changes constitutes acceptance of the updated Privacy Policy.
                  </p>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyComponent;
