'use client';
import { useState, useEffect } from 'react';
import { Mail, Send, MapPin, Clock, DollarSign, Eye, FileText, Truck, CheckCircle, AlertCircle, Package, Search, Filter, Calendar, Download, Printer, RefreshCw } from 'lucide-react';

const MailComponent = () => {
  const [activeTab, setActiveTab] = useState('send');
  const [selectedDispute, setSelectedDispute] = useState(null);
  const [mailingAddress, setMailingAddress] = useState('');
  const [mailOptions, setMailOptions] = useState({
    certified: true,
    returnReceipt: true,
    priority: false
  });
  const [sentMail, setSentMail] = useState(() => {
    const saved = localStorage.getItem('sentMail');
    return saved ? JSON.parse(saved) : [];
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock disputes data (would come from your existing dispute system)
  const [disputes] = useState([
    {
      id: 'disp-001',
      bureau: 'experian',
      account: 'Capital One Credit Card',
      type: 'Late Payment Error',
      status: 'draft',
      created: '2024-01-15',
      description: 'Disputing late payment that was reported in error for December 2023'
    },
    {
      id: 'disp-002', 
      bureau: 'equifax',
      account: 'Student Loan - Navient',
      type: 'Account Not Mine',
      status: 'ready',
      created: '2024-01-18',
      description: 'This account does not belong to me and should be removed'
    },
    {
      id: 'disp-003',
      bureau: 'transunion',
      account: 'Medical Collection',
      type: 'HIPAA Violation',
      status: 'ready', 
      created: '2024-01-20',
      description: 'Medical debt reported without proper HIPAA authorization'
    }
  ]);

  // Bureau addresses
  const bureauAddresses = {
    experian: {
      name: 'Experian',
      address: 'Experian National Consumer Assistance Center\nP.O. Box 4500\nAllen, TX 75013'
    },
    equifax: {
      name: 'Equifax', 
      address: 'Equifax Information Services LLC\nP.O. Box 740256\nAtlanta, GA 30374'
    },
    transunion: {
      name: 'TransUnion',
      address: 'TransUnion Consumer Solutions\nP.O. Box 2000\nChester, PA 19016'
    }
  };

  const calculateCost = () => {
    let cost = 0;
    cost += 8.95; // Certified mail base
    if (mailOptions.returnReceipt) cost += 3.05; // Return receipt
    if (mailOptions.priority) cost += 7.40; // Priority mail upgrade
    return cost;
  };

  const handleSendMail = () => {
    if (!selectedDispute) {
      alert('Please select a dispute to mail');
      return;
    }

    const bureau = bureauAddresses[selectedDispute.bureau];
    const newMail = {
      id: 'mail-' + Math.random().toString(36).substr(2, 9),
      disputeId: selectedDispute.id,
      bureau: selectedDispute.bureau,
      bureauName: bureau.name,
      account: selectedDispute.account,
      type: selectedDispute.type,
      recipientAddress: bureau.address,
      senderAddress: mailingAddress,
      options: { ...mailOptions },
      cost: calculateCost(),
      status: 'processing',
      trackingNumber: 'CL' + Math.random().toString().substr(2, 9),
      sentDate: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
      deliveryStatus: 'in_transit'
    };

    const updatedMail = [newMail, ...sentMail];
    setSentMail(updatedMail);
    localStorage.setItem('sentMail', JSON.stringify(updatedMail));

    // Reset form
    setSelectedDispute(null);
    setActiveTab('tracking');
    
    // Simulate status updates
    setTimeout(() => {
      updateMailStatus(newMail.id, 'out_for_delivery');
    }, 5000);

    setTimeout(() => {
      updateMailStatus(newMail.id, 'delivered');
    }, 10000);
  };

  const updateMailStatus = (mailId, newStatus) => {
    setSentMail(prev => {
      const updated = prev.map(mail => 
        mail.id === mailId 
          ? { ...mail, deliveryStatus: newStatus, status: newStatus === 'delivered' ? 'delivered' : 'in_transit' }
          : mail
      );
      localStorage.setItem('sentMail', JSON.stringify(updated));
      return updated;
    });
  };

  const getBureauColor = (bureau) => {
    switch(bureau) {
      case 'experian': return 'bg-green-100 text-green-800 border-green-200';
      case 'equifax': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'transunion': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'out_for_delivery': return 'bg-blue-100 text-blue-800';
      case 'in_transit': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredMail = sentMail.filter(mail => {
    const matchesSearch = mail.account.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mail.bureauName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mail.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || mail.deliveryStatus === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">Certified Mail Center</h1>
        <p className="text-gray-600">Send your dispute letters via certified mail with tracking</p>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('send')}
            className={`flex-1 px-6 py-4 text-sm font-medium ${
              activeTab === 'send'
                ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <Send className="w-4 h-4 inline mr-2" />
            Send Mail
          </button>
          <button
            onClick={() => setActiveTab('tracking')}
            className={`flex-1 px-6 py-4 text-sm font-medium ${
              activeTab === 'tracking'
                ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <Truck className="w-4 h-4 inline mr-2" />
            Track Mail ({sentMail.length})
          </button>
        </div>

        {/* Send Mail Tab */}
        {activeTab === 'send' && (
          <div className="p-6">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Left Column - Select Dispute */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">1. Select Dispute to Mail</h3>
                  <div className="space-y-3">
                    {disputes.filter(d => d.status === 'ready' || d.status === 'draft').map(dispute => (
                      <div
                        key={dispute.id}
                        onClick={() => setSelectedDispute(dispute)}
                        className={`p-4 border rounded-lg cursor-pointer transition-all ${
                          selectedDispute?.id === dispute.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className={`px-2 py-1 text-xs rounded-full ${getBureauColor(dispute.bureau)}`}>
                            {dispute.bureau.charAt(0).toUpperCase() + dispute.bureau.slice(1)}
                          </span>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            dispute.status === 'ready' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {dispute.status}
                          </span>
                        </div>
                        <h4 className="font-medium text-gray-800">{dispute.account}</h4>
                        <p className="text-sm text-gray-600">{dispute.type}</p>
                        <p className="text-xs text-gray-500 mt-1">{dispute.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sender Address */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">2. Your Mailing Address</h3>
                  <textarea
                    value={mailingAddress}
                    onChange={(e) => setMailingAddress(e.target.value)}
                    placeholder="Your Name&#10;123 Main Street&#10;City, State 12345"
                    className="w-full h-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Mail Options */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">3. Mail Options</h3>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={mailOptions.certified}
                        onChange={(e) => setMailOptions(prev => ({ ...prev, certified: e.target.checked }))}
                        className="w-4 h-4 text-blue-600 rounded"
                        disabled
                      />
                      <span className="text-sm text-gray-700">Certified Mail (Required)</span>
                      <span className="text-sm text-gray-500">$8.95</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={mailOptions.returnReceipt}
                        onChange={(e) => setMailOptions(prev => ({ ...prev, returnReceipt: e.target.checked }))}
                        className="w-4 h-4 text-blue-600 rounded"
                      />
                      <span className="text-sm text-gray-700">Return Receipt Requested</span>
                      <span className="text-sm text-gray-500">$3.05</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={mailOptions.priority}
                        onChange={(e) => setMailOptions(prev => ({ ...prev, priority: e.target.checked }))}
                        className="w-4 h-4 text-blue-600 rounded"
                      />
                      <span className="text-sm text-gray-700">Priority Mail (1-3 business days)</span>
                      <span className="text-sm text-gray-500">$7.40</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Right Column - Preview & Send */}
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Mail Preview</h3>
                  
                  {selectedDispute ? (
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-600">To:</label>
                        <div className="mt-1 p-3 bg-white rounded border text-sm">
                          {bureauAddresses[selectedDispute.bureau]?.address.split('\n').map((line, i) => (
                            <div key={i}>{line}</div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-600">From:</label>
                        <div className="mt-1 p-3 bg-white rounded border text-sm">
                          {mailingAddress || <span className="text-gray-400">Enter your address above</span>}
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-600">Contents:</label>
                        <div className="mt-1 p-3 bg-white rounded border">
                          <div className="flex items-center space-x-2 text-sm">
                            <FileText className="w-4 h-4 text-gray-600" />
                            <span>Dispute Letter - {selectedDispute.type}</span>
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            Account: {selectedDispute.account}
                          </div>
                        </div>
                      </div>

                      <div className="border-t pt-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-gray-600">Total Cost:</span>
                          <span className="text-lg font-bold text-green-600">${calculateCost().toFixed(2)}</span>
                        </div>
                        <div className="text-xs text-gray-500 space-y-1">
                          <div>Certified Mail: $8.95</div>
                          {mailOptions.returnReceipt && <div>Return Receipt: $3.05</div>}
                          {mailOptions.priority && <div>Priority Mail: $7.40</div>}
                        </div>
                      </div>

                      <button
                        onClick={handleSendMail}
                        disabled={!mailingAddress.trim()}
                        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed font-medium"
                      >
                        <Send className="w-4 h-4 inline mr-2" />
                        Send Certified Mail
                      </button>
                    </div>
                  ) : (
                    <div className="text-center text-gray-500 py-8">
                      <Mail className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                      <p>Select a dispute to preview mail details</p>
                    </div>
                  )}
                </div>

                {/* Service Info */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-800 mb-2">📮 Certified Mail Benefits</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Proof of mailing and delivery</li>
                    <li>• Legal evidence for dispute process</li>
                    <li>• Real-time tracking updates</li>
                    <li>• Digital delivery confirmation</li>
                    <li>• 15-day credit bureau response requirement</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tracking Tab */}
        {activeTab === 'tracking' && (
          <div className="p-6">
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by account, bureau, or tracking number..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Status</option>
                <option value="processing">Processing</option>
                <option value="in_transit">In Transit</option>
                <option value="out_for_delivery">Out for Delivery</option>
                <option value="delivered">Delivered</option>
              </select>
            </div>

            {/* Mail List */}
            {filteredMail.length > 0 ? (
              <div className="space-y-4">
                {filteredMail.map(mail => (
                  <div key={mail.id} className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <Package className="w-6 h-6 text-blue-600" />
                        <div>
                          <h4 className="font-semibold text-gray-800">{mail.account}</h4>
                          <p className="text-sm text-gray-600">{mail.type} • {mail.bureauName}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 text-xs rounded-full ${getBureauColor(mail.bureau)}`}>
                          {mail.bureau.charAt(0).toUpperCase() + mail.bureau.slice(1)}
                        </span>
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(mail.deliveryStatus)}`}>
                          {mail.deliveryStatus.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </span>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <label className="text-xs font-medium text-gray-500">Tracking Number</label>
                        <p className="text-sm font-mono text-gray-800">{mail.trackingNumber}</p>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-500">Sent Date</label>
                        <p className="text-sm text-gray-800">{new Date(mail.sentDate).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-500">Est. Delivery</label>
                        <p className="text-sm text-gray-800">{new Date(mail.estimatedDelivery).toLocaleDateString()}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span className="flex items-center">
                          <DollarSign className="w-4 h-4 mr-1" />
                          ${mail.cost.toFixed(2)}
                        </span>
                        {mail.options.returnReceipt && (
                          <span className="flex items-center">
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Return Receipt
                          </span>
                        )}
                        {mail.options.priority && (
                          <span className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            Priority
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors" title="Download Receipt">
                          <Download className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors" title="Print Receipt">
                          <Printer className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => updateMailStatus(mail.id, mail.deliveryStatus)}
                          className="p-2 text-gray-400 hover:text-blue-600 transition-colors" 
                          title="Refresh Status"
                        >
                          <RefreshCw className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Delivery Timeline */}
                    {mail.deliveryStatus === 'delivered' && (
                      <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                        <div className="flex items-center text-green-800">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          <span className="text-sm font-medium">Successfully Delivered</span>
                        </div>
                        <p className="text-xs text-green-600 mt-1">
                          Bureau has 15 days to respond (due: {new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toLocaleDateString()})
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Truck className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">No Mail Found</h3>
                <p className="text-gray-600 mb-4">
                  {sentMail.length === 0 
                    ? "You haven't sent any certified mail yet" 
                    : "No mail matches your search criteria"
                  }
                </p>
                <button
                  onClick={() => setActiveTab('send')}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Send Your First Letter
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MailComponent;