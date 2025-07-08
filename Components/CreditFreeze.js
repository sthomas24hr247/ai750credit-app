'use client';

import { useState } from 'react';
import { Shield, CheckCircle, AlertTriangle, ExternalLink, Phone } from 'lucide-react';

const CreditFreeze = () => {
  const [freezeStatus, setFreezeStatus] = useState({
    experian: 'not_frozen',
    equifax: 'not_frozen', 
    transunion: 'not_frozen',
    innovis: 'not_frozen',
    lexisnexis: 'not_frozen',
    corelogic: 'not_frozen',
    sagestream: 'not_frozen',
    microbilt: 'not_frozen'
  });

  const mainBureaus = [
    {
      id: 'experian',
      name: 'Experian',
      description: 'One of the three major credit reporting agencies',
      url: 'https://www.experian.com/help/credit-freeze/',
      phone: '1-888-397-3742',
      cost: 'Free',
      processingTime: 'Immediate online, 3 business days by phone/mail'
    },
    {
      id: 'equifax', 
      name: 'Equifax',
      description: 'Major credit reporting agency',
      url: 'https://www.equifax.com/personal/credit-report-services/credit-freeze/',
      phone: '1-800-349-9960',
      cost: 'Free',
      processingTime: 'Immediate online, 3 business days by phone/mail'
    },
    {
      id: 'transunion',
      name: 'TransUnion', 
      description: 'Major credit reporting agency',
      url: 'https://www.transunion.com/credit-freeze',
      phone: '1-888-909-8872',
      cost: 'Free',
      processingTime: 'Immediate online, 3 business days by phone/mail'
    }
  ];

  const phantomBureaus = [
    {
      id: 'innovis',
      name: 'Innovis',
      description: 'Fourth largest consumer credit reporting agency',
      url: 'https://www.innovis.com/personal/securityFreeze',
      phone: '1-800-540-2505',
      cost: 'Free',
      processingTime: '1-3 business days'
    },
    {
      id: 'lexisnexis',
      name: 'LexisNexis',
      description: 'Personal reports and risk solutions',
      url: 'https://consumer.risk.lexisnexis.com/freeze',
      phone: '1-888-497-0011',
      cost: 'Free',
      processingTime: '1-2 business days'
    },
    {
      id: 'corelogic',
      name: 'CoreLogic',
      description: 'Property and credential verification reports',
      url: 'https://www.corelogic.com/intelligence/credco-freeze-form/',
      phone: '1-877-532-8778',
      cost: 'Free',
      processingTime: '1-3 business days'
    },
    {
      id: 'sagestream',
      name: 'SageStream',
      description: 'Alternative credit and identity verification',
      url: 'https://www.sagestreamllc.com/blocking-report/',
      phone: '1-888-395-0277',
      cost: 'Free', 
      processingTime: '1-3 business days'
    },
    {
      id: 'microbilt',
      name: 'Microbilt',
      description: 'Consumer and business credit reporting',
      url: 'https://www.microbilt.com/Cms_Data/Contents/MicroBiltWeb/Media/PDFs/ConsumerFreeze.pdf',
      phone: '1-866-217-0930',
      cost: 'Free',
      processingTime: '3-5 business days'
    }
  ];

  const updateFreezeStatus = (bureauId, status) => {
    setFreezeStatus(prev => ({
      ...prev,
      [bureauId]: status
    }));
  };

  const getStatusColor = (status) => {
    if (status === 'frozen') return 'bg-green-100 text-green-800';
    if (status === 'in_progress') return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const getStatusIcon = (status) => {
    if (status === 'frozen') return '🔒';
    if (status === 'in_progress') return '⏳';
    return '🔓';
  };

  const getFrozenCount = () => {
    return Object.values(freezeStatus).filter(status => status === 'frozen').length;
  };

  const BureauCard = ({ bureau, isPhantom = false }) => {
    const status = freezeStatus[bureau.id];
    
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <h4 className="font-semibold text-gray-800">{bureau.name}</h4>
            {isPhantom && (
              <span className="px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded-full">
                Phantom
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-lg">{getStatusIcon(status)}</span>
            <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(status)}`}>
              {status.replace('_', ' ')}
            </span>
          </div>
        </div>
        
        <p className="text-sm text-gray-600 mb-3">{bureau.description}</p>
        
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Cost:</span>
            <span className="font-medium text-green-600">{bureau.cost}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Processing:</span>
            <span className="font-medium text-xs">{bureau.processingTime}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Phone:</span>
            <div className="flex items-center space-x-1">
              <Phone className="w-3 h-3 text-blue-600" />
              <span className="font-medium text-blue-600 text-xs">{bureau.phone}</span>
            </div>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <button
            onClick={() => window.open(bureau.url, '_blank')}
            className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <span>Freeze Online</span>
            <ExternalLink className="w-4 h-4" />
          </button>
          
          <div className="grid grid-cols-3 gap-1">
            <button
              onClick={() => updateFreezeStatus(bureau.id, 'frozen')}
              className={`px-2 py-1 text-xs rounded transition-colors ${
                status === 'frozen' 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Frozen
            </button>
            <button
              onClick={() => updateFreezeStatus(bureau.id, 'in_progress')}
              className={`px-2 py-1 text-xs rounded transition-colors ${
                status === 'in_progress' 
                  ? 'bg-yellow-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Processing
            </button>
            <button
              onClick={() => updateFreezeStatus(bureau.id, 'not_frozen')}
              className={`px-2 py-1 text-xs rounded transition-colors ${
                status === 'not_frozen' 
                  ? 'bg-red-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Not Frozen
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <Shield className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-800">Credit Freeze Protection</h1>
        </div>
        <p className="text-lg text-gray-600 mb-2">
          The first step before starting any credit repair
        </p>
        <p className="text-gray-500">
          Freeze your credit with all 8 bureaus for maximum protection and dispute success
        </p>
      </div>

      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white text-center">
        <h3 className="text-lg font-semibold mb-2">Credit Freeze Progress</h3>
        <div className="text-4xl font-bold mb-2">{getFrozenCount()}/8</div>
        <p className="text-blue-100 mb-4">
          {getFrozenCount() === 8 ? '🔒 Fully Protected!' : 
           getFrozenCount() >= 6 ? '🛡️ Well Protected' : 
           getFrozenCount() >= 3 ? '⚠️ Partially Protected' : 
           '🚨 Vulnerable - Freeze Immediately'}
        </p>
        <div className="w-full bg-blue-400 rounded-full h-3 mb-2">
          <div 
            className="bg-white h-3 rounded-full transition-all duration-500"
            style={{ width: `${Math.round((getFrozenCount() / 8) * 100)}%` }}
          />
        </div>
        <p className="text-blue-100 text-sm">{Math.round((getFrozenCount() / 8) * 100)}% Complete</p>
      </div>

      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-6">
        <div className="flex items-center space-x-2 mb-4">
          <AlertTriangle className="w-6 h-6 text-yellow-600" />
          <h3 className="font-semibold text-gray-800">Why Freeze Credit BEFORE Disputing?</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Strategic Benefits:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Prevents new hard inquiries during disputes</li>
              <li>• Stops identity theft attempts</li>
              <li>• Forces creditors to verify information more carefully</li>
              <li>• Creates leverage in negotiations</li>
              <li>• Protects against retaliatory credit checks</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Dispute Advantages:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 23% higher dispute success rates</li>
              <li>• Faster resolution times</li>
              <li>• Prevents verification shopping</li>
              <li>• Reduces mixed file incidents</li>
              <li>• Cleaner credit report analysis</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-white rounded border-l-4 border-yellow-400">
          <p className="text-sm text-yellow-700">
            <strong>💡 Pro Tip:</strong> Freeze all 8 bureaus before starting disputes. You can temporarily lift freezes when applying for credit, 
            but keeping them frozen during the repair process gives you maximum protection and leverage.
          </p>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <h3 className="text-xl font-semibold text-gray-800">Main Credit Bureaus (Required)</h3>
          </div>
          <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
            {mainBureaus.filter(b => freezeStatus[b.id] === 'frozen').length}/3 Frozen
          </span>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {mainBureaus.map(bureau => (
            <BureauCard key={bureau.id} bureau={bureau} />
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-purple-600" />
              <h3 className="text-xl font-semibold text-gray-800">Phantom Credit Bureaus (Critical)</h3>
            </div>
            <p className="text-sm text-gray-600">Lesser-known bureaus that can impact your credit decisions</p>
          </div>
          <span className="text-sm text-gray-600 bg-purple-100 px-3 py-1 rounded-full">
            {phantomBureaus.filter(b => freezeStatus[b.id] === 'frozen').length}/5 Frozen
          </span>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {phantomBureaus.map(bureau => (
            <BureauCard key={bureau.id} bureau={bureau} isPhantom={true} />
          ))}
        </div>
      </div>

      {getFrozenCount() >= 6 && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
          <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-green-800 mb-2">Great Progress! 🎉</h3>
          <p className="text-green-700 mb-4">
            You have frozen {getFrozenCount()}/8 bureaus. You are now well-protected and ready for the next steps in credit repair.
          </p>
          <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            Continue to Credit Analysis →
          </button>
        </div>
      )}
    </div>
  );
};

export default CreditFreeze;
