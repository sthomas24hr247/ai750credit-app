'use client';

import { useState } from 'react';
import { FileText, Scale, CreditCard, Shield, AlertTriangle, Users, Clock, Phone, Mail, CheckCircle, XCircle, DollarSign } from 'lucide-react';

const TermsConditionsComponent = () => {
  const [activeSection, setActiveSection] = useState('overview');

  const sections = [
    { id: 'overview', label: 'Overview', icon: FileText },
    { id: 'services', label: 'Our Services', icon: CheckCircle },
    { id: 'payment', label: 'Payment Terms', icon: CreditCard },
    { id: 'user-obligations', label: 'User Obligations', icon: Users },
    { id: 'limitations', label: 'Limitations & Disclaimers', icon: AlertTriangle },
    { id: 'intellectual-property', label: 'Intellectual Property', icon: Shield },
    { id: 'termination', label: 'Termination', icon: XCircle },
    { id: 'dispute-resolution', label: 'Dispute Resolution', icon: Scale },
    { id: 'contact', label: 'Contact Information', icon: Phone }
  ];

  const lastUpdated = 'December 10, 2024';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Terms and Conditions</h1>
        <p className="text-gray-600 mb-4">Legal agreement for using AI750Credit services</p>
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
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Terms and Conditions Overview</h2>
                  <p className="text-gray-700 mb-6">
                    Welcome to AI750Credit. These Terms and Conditions ("Terms") govern your use of our credit repair, 
                    monitoring, and improvement services ("Services"). By creating an account or using our Services, 
                    you agree to be bound by these Terms.
                  </p>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                  <h3 className="font-semibold text-yellow-800 mb-3">Important Legal Agreement</h3>
                  <p className="text-sm text-yellow-700 mb-3">
                    By using AI750Credit, you are entering into a legally binding agreement. Please read these Terms carefully. 
                    If you do not agree with any part of these Terms, you must not use our Services.
                  </p>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• These Terms apply to all users of AI750Credit services</li>
                    <li>• Additional terms may apply to specific features or services</li>
                    <li>• We may update these Terms from time to time with notice</li>
                    <li>• Continued use constitutes acceptance of updated Terms</li>
                  </ul>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg">
                    <Scale className="w-8 h-8 text-blue-600 mb-4" />
                    <h3 className="font-semibold text-blue-800 mb-2">Your Rights</h3>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Access to our credit repair services</li>
                      <li>• Professional dispute letter generation</li>
                      <li>• Credit monitoring and alerts</li>
                      <li>• Customer support and guidance</li>
                    </ul>
                  </div>
                  <div className="p-6 bg-green-50 border border-green-200 rounded-lg">
                    <Users className="w-8 h-8 text-green-600 mb-4" />
                    <h3 className="font-semibold text-green-800 mb-2">Your Responsibilities</h3>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• Provide accurate information</li>
                      <li>• Pay fees on time</li>
                      <li>• Follow our usage guidelines</li>
                      <li>• Respect intellectual property</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                  <h3 className="font-semibold text-red-800 mb-2">Important Disclaimers</h3>
                  <p className="text-sm text-red-700 mb-2">
                    Please understand that:
                  </p>
                  <ul className="text-sm text-red-700 space-y-1">
                    <li>• We cannot guarantee specific credit score improvements</li>
                    <li>• Results vary based on individual circumstances</li>
                    <li>• Credit repair is a process that takes time</li>
                    <li>• Some items may not be removable from credit reports</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Services */}
            {activeSection === 'services' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Services</h2>
                  <p className="text-gray-700 mb-6">
                    AI750Credit provides comprehensive credit repair and monitoring services designed to help 
                    you improve your credit profile and achieve your financial goals.
                  </p>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Service Description</h3>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="border border-gray-200 rounded-lg p-4">
                          <h4 className="font-medium text-gray-800 mb-2">Credit Repair Services</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• AI-powered credit report analysis</li>
                            <li>• Professional dispute letter generation</li>
                            <li>• Dispute tracking and management</li>
                            <li>• FCRA violation identification</li>
                            <li>• Goodwill letter creation</li>
                          </ul>
                        </div>

                        <div className="border border-gray-200 rounded-lg p-4">
                          <h4 className="font-medium text-gray-800 mb-2">Monitoring Services</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Real-time credit score monitoring</li>
                            <li>• Credit report change alerts</li>
                            <li>• Identity theft protection</li>
                            <li>• Dark web monitoring</li>
                            <li>• New account notifications</li>
                          </ul>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="border border-gray-200 rounded-lg p-4">
                          <h4 className="font-medium text-gray-800 mb-2">Educational Resources</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Credit improvement strategies</li>
                            <li>• Financial education content</li>
                            <li>• Best practices guidance</li>
                            <li>• Success tips and techniques</li>
                            <li>• Legal rights information</li>
                          </ul>
                        </div>

                        <div className="border border-gray-200 rounded-lg p-4">
                          <h4 className="font-medium text-gray-800 mb-2">Support Services</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Customer support and guidance</li>
                            <li>• Technical assistance</li>
                            <li>• Account management</li>
                            <li>• Strategy consultation</li>
                            <li>• Progress review</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <h3 className="font-semibold text-blue-800 mb-3">Service Limitations and Expectations</h3>
                    <div className="space-y-3">
                      <p className="text-sm text-blue-700">
                        <strong>No Guaranteed Results:</strong> While we use proven strategies and advanced technology, 
                        we cannot guarantee specific outcomes or credit score improvements. Results depend on many factors 
                        including your credit history, debt levels, and creditor responses.
                      </p>
                      <p className="text-sm text-blue-700">
                        <strong>Timeline Expectations:</strong> Credit repair is typically a process that takes 3-12 months. 
                        Some items may be resolved quickly, while others may take longer or may not be removable.
                      </p>
                      <p className="text-sm text-blue-700">
                        <strong>User Participation Required:</strong> Success requires your active participation, including 
                        providing accurate information, following recommendations, and maintaining good financial habits.
                      </p>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="font-semibold text-gray-800 mb-3">Service Availability</h3>
                    <p className="text-sm text-gray-700 mb-2">
                      Our services are available 24/7 through our web platform, with the following exceptions:
                    </p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Scheduled maintenance windows (with advance notice)</li>
                      <li>• Emergency maintenance for security or stability</li>
                      <li>• Force majeure events beyond our control</li>
                      <li>• Customer support during business hours (Mon-Fri, 9 AM - 6 PM EST)</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Payment Terms */}
            {activeSection === 'payment' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Payment Terms</h2>
                  <p className="text-gray-700 mb-6">
                    These payment terms govern all financial transactions related to your use of AI750Credit services.
                  </p>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Subscription Plans and Pricing</h3>
                    
                    <div className="grid md:grid-cols-3 gap-4 mb-6">
                      <div className="border border-gray-200 rounded-lg p-4 text-center">
                        <h4 className="font-semibold text-gray-800 mb-2">Basic Plan</h4>
                        <p className="text-2xl font-bold text-gray-900 mb-2">$19.99</p>
                        <p className="text-sm text-gray-600">per month</p>
                      </div>
                      <div className="border border-blue-500 rounded-lg p-4 text-center bg-blue-50">
                        <h4 className="font-semibold text-blue-800 mb-2">Pro Plan</h4>
                        <p className="text-2xl font-bold text-blue-900 mb-2">$29.99</p>
                        <p className="text-sm text-blue-700">per month</p>
                        <span className="inline-block px-2 py-1 bg-blue-600 text-white text-xs rounded-full mt-2">Most Popular</span>
                      </div>
                      <div className="border border-gray-200 rounded-lg p-4 text-center">
                        <h4 className="font-semibold text-gray-800 mb-2">Premium Plan</h4>
                        <p className="text-2xl font-bold text-gray-900 mb-2">$49.99</p>
                        <p className="text-sm text-gray-600">per month</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Billing and Payment</h3>
                    
                    <div className="space-y-4">
                      <div className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-medium text-gray-800 mb-2">Billing Cycle</h4>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Monthly subscriptions are billed every 30 days from your signup date</li>
                          <li>• Annual subscriptions are billed yearly with a 15% discount</li>
                          <li>• Billing occurs automatically on your renewal date</li>
                          <li>• Prorated charges apply for plan upgrades during billing cycles</li>
                        </ul>
                      </div>

                      <div className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-medium text-gray-800 mb-2">Accepted Payment Methods</h4>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Major credit cards (Visa, Mastercard, American Express, Discover)</li>
                          <li>• Debit cards with credit card logos</li>
                          <li>• PayPal and other digital payment methods</li>
                          <li>• Bank transfers (ACH) for annual subscriptions</li>
                        </ul>
                      </div>

                      <div className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-medium text-gray-800 mb-2">Failed Payments</h4>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• We will attempt to charge your payment method up to 3 times</li>
                          <li>• You will receive email notifications for failed payment attempts</li>
                          <li>• Services may be suspended after 7 days of non-payment</li>
                          <li>• Accounts may be cancelled after 30 days of non-payment</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Refunds and Cancellations</h3>
                    
                    <div className="space-y-4">
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <h4 className="font-semibold text-green-800 mb-2">30-Day Money-Back Guarantee</h4>
                        <p className="text-sm text-green-700 mb-2">
                          We offer a full refund within 30 days of your initial subscription if you're not satisfied 
                          with our services. To request a refund:
                        </p>
                        <ul className="text-sm text-green-700 space-y-1">
                          <li>• Contact customer support within 30 days of signup</li>
                          <li>• Provide reason for cancellation (helps us improve)</li>
                          <li>• Refund will be processed within 5-7 business days</li>
                          <li>• Refund will be credited to your original payment method</li>
                        </ul>
                      </div>

                      <div className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-medium text-gray-800 mb-2">Cancellation Policy</h4>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• You may cancel your subscription at any time</li>
                          <li>• Cancellation takes effect at the end of your current billing period</li>
                          <li>• You will retain access to services until the end of your paid period</li>
                          <li>• No refunds for partial months after the 30-day guarantee period</li>
                          <li>• Cancelled accounts and data are retained for 90 days</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h3 className="font-semibold text-yellow-800 mb-2">Price Changes</h3>
                    <p className="text-sm text-yellow-700">
                      We reserve the right to modify our pricing with 30 days advance notice. Current subscribers 
                      will be notified via email and will have the option to cancel before price changes take effect. 
                      Price increases will not affect your current billing cycle.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* User Obligations */}
            {activeSection === 'user-obligations' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">User Obligations and Responsibilities</h2>
                  <p className="text-gray-700 mb-6">
                    As a user of AI750Credit, you agree to comply with these obligations and use our services responsibly.
                  </p>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Account Responsibilities</h3>
                    
                    <div className="space-y-4">
                      <div className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-medium text-gray-800 mb-2">Account Security</h4>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Maintain the confidentiality of your login credentials</li>
                          <li>• Use strong, unique passwords and enable two-factor authentication</li>
                          <li>• Notify us immediately of any unauthorized account access</li>
                          <li>• You are responsible for all activities under your account</li>
                          <li>• Do not share your account with others or allow unauthorized access</li>
                        </ul>
                      </div>

                      <div className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-medium text-gray-800 mb-2">Information Accuracy</h4>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Provide accurate, current, and complete information</li>
                          <li>• Update your profile information when changes occur</li>
                          <li>• Verify the accuracy of information before submitting disputes</li>
                          <li>• Do not provide false or misleading information</li>
                          <li>• Ensure all uploaded documents are legitimate and yours</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Prohibited Activities</h3>
                    
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                      <p className="text-sm text-red-800 font-semibold mb-2">
                        The following activities are strictly prohibited:
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-medium text-gray-800 mb-2">Fraudulent Activities</h4>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Submitting false information or fraudulent documents</li>
                          <li>• Attempting to dispute legitimate, accurate debts</li>
                          <li>• Using someone else's identity or personal information</li>
                          <li>• Creating multiple accounts to circumvent limitations</li>
                          <li>• Engaging in identity theft or impersonation</li>
                        </ul>
                      </div>

                      <div className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-medium text-gray-800 mb-2">System Abuse</h4>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Attempting to hack, disrupt, or damage our systems</li>
                          <li>• Using automated tools to access our services</li>
                          <li>• Reverse engineering or copying our software</li>
                          <li>• Overloading our systems with excessive requests</li>
                          <li>• Attempting to access other users' accounts or data</li>
                        </ul>
                      </div>

                      <div className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-medium text-gray-800 mb-2">Legal Violations</h4>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Violating any applicable laws or regulations</li>
                          <li>• Using our services for illegal purposes</li>
                          <li>• Infringing on intellectual property rights</li>
                          <li>• Harassing or threatening our staff or other users</li>
                          <li>• Violating terms of service of connected platforms</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Compliance Requirements</h3>
                    
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-800 mb-2">Legal Compliance</h4>
                      <p className="text-sm text-blue-700 mb-2">
                        You agree to comply with all applicable laws and regulations, including:
                      </p>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• Fair Credit Reporting Act (FCRA)</li>
                        <li>• Credit Repair Organizations Act (CROA)</li>
                        <li>• State and federal consumer protection laws</li>
                        <li>• Anti-fraud and identity theft laws</li>
                        <li>• Data protection and privacy regulations</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h3 className="font-semibold text-yellow-800 mb-2">Consequences of Violations</h3>
                    <p className="text-sm text-yellow-700 mb-2">
                      Violations of these obligations may result in:
                    </p>
                    <ul className="text-sm text-yellow-700 space-y-1">
                      <li>• Warning notices and account restrictions</li>
                      <li>• Temporary or permanent suspension of services</li>
                      <li>• Termination of your account without refund</li>
                      <li>• Legal action and reporting to authorities</li>
                      <li>• Liability for damages caused by violations</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Limitations & Disclaimers */}
            {activeSection === 'limitations' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Limitations and Disclaimers</h2>
                  <p className="text-gray-700 mb-6">
                    These limitations and disclaimers are important legal protections that define the boundaries 
                    of our liability and set realistic expectations for our services.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                    <h3 className="font-semibold text-red-800 mb-3">IMPORTANT DISCLAIMERS</h3>
                    <div className="space-y-3">
                      <p className="text-sm text-red-700">
                        <strong>NO GUARANTEE OF RESULTS:</strong> We cannot and do not guarantee specific credit score 
                        improvements, successful dispute outcomes, or removal of any particular items from your credit reports. 
                        Results vary based on individual circumstances.
                      </p>
                      <p className="text-sm text-red-700">
                        <strong>SERVICES PROVIDED "AS IS":</strong> Our services are provided on an "as is" and "as available" 
                        basis without warranties of any kind, either express or implied.
                      </p>
                      <p className="text-sm text-red-700">
                        <strong>NO LEGAL ADVICE:</strong> AI750Credit does not provide legal advice. Our services are 
                        educational and administrative in nature. Consult with a qualified attorney for legal matters.
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Limitation of Liability</h3>
                    
                    <div className="space-y-4">
                      <div className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-medium text-gray-800 mb-2">Maximum Liability</h4>
                        <p className="text-sm text-gray-700 mb-2">
                          In no event shall AI750Credit's total liability exceed the amount you paid for our services 
                          in the 12 months preceding the claim. This limitation applies to all types of damages including:
                        </p>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Direct, indirect, incidental, or consequential damages</li>
                          <li>• Lost profits, revenue, or business opportunities</li>
                          <li>• Data loss or corruption</li>
                          <li>• Personal injury or property damage</li>
                          <li>• Punitive or exemplary damages</li>
                        </ul>
                      </div>

                      <div className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-medium text-gray-800 mb-2">Excluded Damages</h4>
                        <p className="text-sm text-gray-700 mb-2">
                          We are not liable for damages resulting from:
                        </p>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Your use or inability to use our services</li>
                          <li>• Third-party actions (creditors, credit bureaus, etc.)</li>
                          <li>• System downtime or technical difficulties</li>
                          <li>• Changes in credit laws or regulations</li>
                          <li>• Your failure to follow our recommendations</li>
                          <li>• Force majeure events beyond our control</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Service Limitations</h3>
                    
                    <div className="space-y-4">
                      <div className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-medium text-gray-800 mb-2">Credit Repair Limitations</h4>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• We cannot remove accurate, timely, and verifiable information</li>
                          <li>• Some negative items may be legitimate and non-removable</li>
                          <li>• Credit score improvements depend on many factors beyond our control</li>
                          <li>• Results typically take 3-12 months and vary by individual</li>
                          <li>• We cannot control creditor or credit bureau responses</li>
                        </ul>
                      </div>

                      <div className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-medium text-gray-800 mb-2">Technology Limitations</h4>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Our AI and automated systems may have limitations or errors</li>
                          <li>• System availability is not guaranteed 100% of the time</li>
                          <li>• Data accuracy depends on third-party sources</li>
                          <li>• Internet connectivity issues may affect service access</li>
                          <li>• Software updates may temporarily impact functionality</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="font-semibold text-blue-800 mb-2">Indemnification</h3>
                    <p className="text-sm text-blue-700">
                      You agree to indemnify and hold harmless AI750Credit, its officers, directors, employees, 
                      and agents from any claims, damages, losses, or expenses arising from your use of our services, 
                      violation of these Terms, or violation of any law or third-party rights.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Intellectual Property */}
            {activeSection === 'intellectual-property' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Intellectual Property Rights</h2>
                  <p className="text-gray-700 mb-6">
                    This section outlines the ownership and usage rights for all intellectual property related to AI750Credit services.
                  </p>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Our Intellectual Property</h3>
                    
                    <div className="space-y-4">
                      <div className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-medium text-gray-800 mb-2">Platform and Software</h4>
                        <p className="text-sm text-gray-700 mb-2">
                          AI750Credit owns all rights to our platform, including:
                        </p>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Software code, algorithms, and AI technology</li>
                          <li>• User interface design and functionality</li>
                          <li>• Database structures and data compilation</li>
                          <li>• Proprietary dispute letter templates</li>
                          <li>• Credit analysis and scoring methodologies</li>
                        </ul>
                      </div>

                      <div className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-medium text-gray-800 mb-2">Content and Materials</h4>
                        <p className="text-sm text-gray-700 mb-2">
                          We own all content and materials on our platform, including:
                        </p>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Educational content and articles</li>
                          <li>• Training materials and guides</li>
                          <li>• Graphics, logos, and visual elements</li>
                          <li>• Audio and video content</li>
                          <li>• Marketing and promotional materials</li>
                        </ul>
                      </div>

                      <div className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-medium text-gray-800 mb-2">Trademarks and Branding</h4>
                        <p className="text-sm text-gray-700 mb-2">
                          The following are trademarks of AI750Credit:
                        </p>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• "AI750Credit" name and logo</li>
                          <li>• Service names and taglines</li>
                          <li>• Product branding and design elements</li>
                          <li>• Domain names and web addresses</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Usage Rights</h3>
                    
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                      <h4 className="font-semibold text-green-800 mb-2">Limited License Granted</h4>
                      <p className="text-sm text-green-700">
                        We grant you a limited, non-exclusive, non-transferable license to use our platform 
                        and services for your personal credit repair needs during your subscription period.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-medium text-gray-800 mb-2">Permitted Uses</h4>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Access and use our platform for personal credit repair</li>
                          <li>• Download and use generated dispute letters for your accounts</li>
                          <li>• Access educational content for personal learning</li>
                          <li>• Print materials for your personal credit repair efforts</li>
                        </ul>
                      </div>

                      <div className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-medium text-gray-800 mb-2">Prohibited Uses</h4>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Copying, modifying, or distributing our software</li>
                          <li>• Reverse engineering or decompiling our technology</li>
                          <li>• Using our content for commercial purposes</li>
                          <li>• Creating derivative works based on our materials</li>
                          <li>• Removing copyright or trademark notices</li>
                          <li>• Sharing your account access with others</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">User Content</h3>
                    
                    <div className="space-y-4">
                      <div className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-medium text-gray-800 mb-2">Your Content Ownership</h4>
                        <p className="text-sm text-gray-700 mb-2">
                          You retain ownership of the content you provide to us, including:
                        </p>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Personal information and documents</li>
                          <li>• Credit reports and financial data</li>
                          <li>• Communications and feedback</li>
                          <li>• Custom notes and annotations</li>
                        </ul>
                      </div>

                      <div className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-medium text-gray-800 mb-2">License to Use Your Content</h4>
                        <p className="text-sm text-gray-700 mb-2">
                          By providing content to us, you grant AI750Credit a license to:
                        </p>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Use your content to provide our services</li>
                          <li>• Analyze data to improve our platform (anonymized)</li>
                          <li>• Store and process your information securely</li>
                          <li>• Share anonymized, aggregated data for research</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h3 className="font-semibold text-yellow-800 mb-2">Copyright Infringement</h3>
                    <p className="text-sm text-yellow-700">
                      If you believe our platform contains content that infringes your copyright, please contact 
                      us at legal@ai750credit.com with detailed information about the alleged infringement. 
                      We will investigate and respond according to applicable copyright laws.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Termination */}
            {activeSection === 'termination' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Termination</h2>
                  <p className="text-gray-700 mb-6">
                    This section explains how your account and access to AI750Credit services may be terminated, 
                    either by you or by us, and what happens when termination occurs.
                  </p>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Termination by You</h3>
                    
                    <div className="space-y-4">
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 className="font-semibold text-blue-800 mb-2">Voluntary Cancellation</h4>
                        <p className="text-sm text-blue-700 mb-2">
                          You may cancel your subscription at any time through:
                        </p>
                        <ul className="text-sm text-blue-700 space-y-1">
                          <li>• Your account settings page</li>
                          <li>• Contacting customer support</li>
                          <li>• Email request to support@ai750credit.com</li>
                          <li>• Phone call to our cancellation line</li>
                        </ul>
                      </div>

                      <div className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-medium text-gray-800 mb-2">Cancellation Effect</h4>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Cancellation takes effect at the end of your current billing period</li>
                          <li>• You retain access to services until your subscription expires</li>
                          <li>• No additional charges will be made after cancellation</li>
                          <li>• Your data is retained for 90 days in case you want to reactivate</li>
                          <li>• You can download your data before the retention period expires</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Termination by AI750Credit</h3>
                    
                    <div className="space-y-4">
                      <div className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-medium text-gray-800 mb-2">Grounds for Termination</h4>
                        <p className="text-sm text-gray-700 mb-2">
                          We may suspend or terminate your account for:
                        </p>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Violation of these Terms and Conditions</li>
                          <li>• Non-payment of fees for more than 30 days</li>
                          <li>• Fraudulent or illegal activity</li>
                          <li>• Abuse of our platform or staff</li>
                          <li>• Multiple violations after warnings</li>
                          <li>• Threat to system security or integrity</li>
                        </ul>
                      </div>

                      <div className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-medium text-gray-800 mb-2">Termination Process</h4>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Minor violations: Warning notice with opportunity to correct</li>
                          <li>• Serious violations: Immediate suspension pending investigation</li>
                          <li>• Severe violations: Immediate termination without notice</li>
                          <li>• You will be notified of termination via email</li>
                          <li>• You may appeal termination decisions within 30 days</li>
                        </ul>
                      </div>

                      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <h4 className="font-semibold text-red-800 mb-2">Immediate Termination</h4>
                        <p className="text-sm text-red-700 mb-2">
                          We reserve the right to immediately terminate accounts for:
                        </p>
                        <ul className="text-sm text-red-700 space-y-1">
                          <li>• Identity theft or fraud</li>
                          <li>• Hacking or system compromise attempts</li>
                          <li>• Threatening behavior toward staff or users</li>
                          <li>• Repeated serious violations after warnings</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Effect of Termination</h3>
                    
                    <div className="space-y-4">
                      <div className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-medium text-gray-800 mb-2">Immediate Effects</h4>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• All access to AI750Credit services will cease</li>
                          <li>• Active disputes and monitoring will be discontinued</li>
                          <li>• Email alerts and notifications will stop</li>
                          <li>• Customer support access will be limited</li>
                          <li>• Subscription billing will cease</li>
                        </ul>
                      </div>

                      <div className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-medium text-gray-800 mb-2">Data Handling</h4>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Your data will be retained for 90 days for voluntary cancellations</li>
                          <li>• Data may be retained longer for terminated accounts under investigation</li>
                          <li>• You can request data deletion by contacting support</li>
                          <li>• Some data may be retained for legal compliance purposes</li>
                          <li>• Financial records are retained per regulatory requirements</li>
                        </ul>
                      </div>

                      <div className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-medium text-gray-800 mb-2">Surviving Terms</h4>
                        <p className="text-sm text-gray-700 mb-2">
                          The following terms survive termination:
                        </p>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Payment obligations for services already provided</li>
                          <li>• Intellectual property rights and restrictions</li>
                          <li>• Limitation of liability and indemnification</li>
                          <li>• Dispute resolution and governing law provisions</li>
                          <li>• Data retention and privacy obligations</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h3 className="font-semibold text-green-800 mb-2">Reactivation</h3>
                    <p className="text-sm text-green-700">
                      Voluntarily cancelled accounts can be reactivated within 90 days by contacting customer support. 
                      Terminated accounts may be eligible for reactivation on a case-by-case basis after addressing 
                      the issues that led to termination.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Dispute Resolution */}
            {activeSection === 'dispute-resolution' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Dispute Resolution</h2>
                  <p className="text-gray-700 mb-6">
                    This section outlines how disputes between you and AI750Credit will be resolved, 
                    including our commitment to fair and efficient resolution processes.
                  </p>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Initial Resolution Process</h3>
                    
                    <div className="space-y-4">
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 className="font-semibold text-blue-800 mb-2">Step 1: Direct Contact</h4>
                        <p className="text-sm text-blue-700 mb-2">
                          Before pursuing formal dispute resolution, please contact us directly:
                        </p>
                        <ul className="text-sm text-blue-700 space-y-1">
                          <li>• Email: disputes@ai750credit.com</li>
                          <li>• Phone: 1-800-CREDIT-1</li>
                          <li>• Support ticket through your account</li>
                          <li>• We will respond within 2 business days</li>
                          <li>• Most issues can be resolved through direct communication</li>
                        </ul>
                      </div>

                      <div className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-medium text-gray-800 mb-2">Good Faith Resolution</h4>
                        <p className="text-sm text-gray-700 mb-2">
                          We are committed to resolving disputes fairly and efficiently:
                        </p>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• We will investigate your concerns thoroughly</li>
                          <li>• You will receive regular updates on resolution progress</li>
                          <li>• We aim to resolve most disputes within 10 business days</li>
                          <li>• Senior management reviews all unresolved disputes</li>
                          <li>• We maintain detailed records of all dispute communications</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Formal Dispute Resolution</h3>
                    
                    <div className="space-y-4">
                      <div className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-medium text-gray-800 mb-2">Mediation Process</h4>
                        <p className="text-sm text-gray-700 mb-2">
                          If direct resolution fails, disputes may proceed to mediation:
                        </p>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Voluntary mediation through a neutral third party</li>
                          <li>• Mediation costs shared equally between parties</li>
                          <li>• Conducted virtually or in New York, NY</li>
                          <li>• Non-binding process focused on mutual resolution</li>
                          <li>• Confidential proceedings with no admission of liability</li>
                        </ul>
                      </div>

                      <div className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-medium text-gray-800 mb-2">Arbitration Agreement</h4>
                        <p className="text-sm text-gray-700 mb-2">
                          If mediation is unsuccessful, disputes will be resolved through binding arbitration:
                        </p>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Arbitration conducted under American Arbitration Association rules</li>
                          <li>• Single arbitrator selected through AAA procedures</li>
                          <li>• Arbitration location: New York, NY or virtually</li>
                          <li>• Discovery limited to preserve efficiency and cost-effectiveness</li>
                          <li>• Arbitrator's decision is final and binding</li>
                        </ul>
                      </div>

                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <h4 className="font-semibold text-yellow-800 mb-2">Class Action Waiver</h4>
                        <p className="text-sm text-yellow-700">
                          You agree that disputes will be resolved on an individual basis only. You waive the right 
                          to participate in class actions, collective actions, or representative proceedings against AI750Credit.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Exceptions to Arbitration</h3>
                    
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-medium text-gray-800 mb-2">Small Claims Court</h4>
                      <p className="text-sm text-gray-700 mb-2">
                        You may pursue claims in small claims court if:
                      </p>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• The claim amount is within small claims court jurisdiction</li>
                        <li>• The claim is brought in your county of residence</li>
                        <li>• The claim seeks only monetary damages</li>
                        <li>• You do not seek class or representative relief</li>
                      </ul>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-medium text-gray-800 mb-2">Injunctive Relief</h4>
                      <p className="text-sm text-gray-700 mb-2">
                        Either party may seek injunctive or equitable relief in court for:
                      </p>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Intellectual property infringement</li>
                        <li>• Confidentiality breaches</li>
                        <li>• Security threats or system compromises</li>
                        <li>• Violations requiring immediate court intervention</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Governing Law</h3>
                    
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-700 mb-2">
                        These Terms and any disputes are governed by:
                      </p>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• <strong>State Law:</strong> Laws of the State of New York</li>
                        <li>• <strong>Federal Law:</strong> United States federal law where applicable</li>
                        <li>• <strong>Jurisdiction:</strong> New York state and federal courts</li>
                        <li>• <strong>Venue:</strong> New York County, New York</li>
                        <li>• <strong>Language:</strong> All proceedings conducted in English</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h3 className="font-semibold text-green-800 mb-2">Limitation Period</h3>
                    <p className="text-sm text-green-700">
                      Any dispute must be filed within one (1) year of when the dispute first arose. 
                      This limitation period applies to all claims regardless of the form of action.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Contact */}
            {activeSection === 'contact' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
                  <p className="text-gray-700 mb-6">
                    For questions about these Terms and Conditions or any legal matters, please contact us using the information below.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <Mail className="w-5 h-5 text-blue-600" />
                        <h3 className="font-semibold text-gray-800">Email Contacts</h3>
                      </div>
                      <div className="space-y-2 text-sm text-gray-700">
                        <p><strong>Legal Questions:</strong> legal@ai750credit.com</p>
                        <p><strong>Terms & Conditions:</strong> terms@ai750credit.com</p>
                        <p><strong>Disputes:</strong> disputes@ai750credit.com</p>
                        <p><strong>General Support:</strong> support@ai750credit.com</p>
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <Phone className="w-5 h-5 text-green-600" />
                        <h3 className="font-semibold text-gray-800">Phone Support</h3>
                      </div>
                      <div className="space-y-2 text-sm text-gray-700">
                        <p><strong>Customer Service:</strong> 1-800-CREDIT-1</p>
                        <p><strong>Legal Hotline:</strong> 1-800-LEGAL-AI</p>
                        <p><strong>Hours:</strong> Monday-Friday, 9 AM - 6 PM EST</p>
                        <p><strong>Emergency:</strong> 24/7 security issues only</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <FileText className="w-5 h-5 text-purple-600" />
                        <h3 className="font-semibold text-gray-800">Mailing Address</h3>
                      </div>
                      <div className="text-sm text-gray-700">
                        <p>AI750Credit, Inc.</p>
                        <p>Legal Department</p>
                        <p>123 Financial District, Suite 4500</p>
                        <p>New York, NY 10004</p>
                        <p>United States</p>
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <Clock className="w-5 h-5 text-orange-600" />
                        <h3 className="font-semibold text-gray-800">Response Times</h3>
                      </div>
                      <div className="space-y-2 text-sm text-gray-700">
                        <p><strong>Legal Inquiries:</strong> 5 business days</p>
                        <p><strong>Terms Questions:</strong> 3 business days</p>
                        <p><strong>Dispute Notices:</strong> 24 hours</p>
                        <p><strong>General Support:</strong> 2 business days</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="font-semibold text-blue-800 mb-4">Company Information</h3>
                  <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-700">
                    <div>
                      <p><strong>Legal Name:</strong> AI750Credit, Inc.</p>
                      <p><strong>State of Incorporation:</strong> Delaware</p>
                      <p><strong>Business License:</strong> NY-CR-2024-001</p>
                    </div>
                    <div>
                      <p><strong>Tax ID:</strong> 12-3456789</p>
                      <p><strong>D&B Number:</strong> 123456789</p>
                      <p><strong>Founded:</strong> 2024</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-800 mb-4">Updates to Terms and Conditions</h3>
                  <div className="space-y-3 text-sm text-gray-700">
                    <p>
                      We may update these Terms and Conditions from time to time. When we make material changes, we will:
                    </p>
                    <ul className="space-y-1 ml-4">
                      <li>• Update the "Last Modified" date at the top of this document</li>
                      <li>• Send email notification to all active users</li>
                      <li>• Post a prominent notice on our platform for 30 days</li>
                      <li>• Maintain previous versions for reference</li>
                    </ul>
                    <p>
                      Continued use of our services after changes constitutes acceptance of the updated Terms and Conditions.
                    </p>
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

export default TermsConditionsComponent;
