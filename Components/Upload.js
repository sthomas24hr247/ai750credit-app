'use client';
import { useState } from 'react';import { Upload, FileText, X, AlertCircle, CheckCircle, Download, Eye, Trash2, FileImage, FileSpreadsheet, RefreshCw } from 'lucide-react';

const UploadComponent = () => {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState(() => {
    // Load from localStorage if available
    const saved = localStorage.getItem('uploadedFiles');
    return saved ? JSON.parse(saved) : [];
  });

  // Save to localStorage whenever files change
  const saveFiles = (files) => {
    setUploadedFiles(files);
    localStorage.setItem('uploadedFiles', JSON.stringify(files));
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFiles(files);
    }
  };

  const handleFileSelect = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFiles(files);
    }
  };

  const validateFile = (file) => {
    const validTypes = [
      'application/pdf',
      'image/jpeg',
      'image/png',
      'image/jpg',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    
    const maxSize = 10 * 1024 * 1024; // 10MB
    
    if (!validTypes.includes(file.type)) {
      return { valid: false, error: 'Invalid file type. Please upload PDF, JPG, PNG, or DOC files.' };
    }
    
    if (file.size > maxSize) {
      return { valid: false, error: 'File too large. Maximum size is 10MB.' };
    }
    
    return { valid: true };
  };

  const generateMockInsights = (filename) => {
    const insights = [
      'Found 3 negative accounts that may be eligible for dispute',
      'Identified 1 potential FCRA violation in account reporting',
      'Credit utilization is 45% - recommend reducing to under 30%',
      'Account age could be improved with authorized user strategy',
      '2 hard inquiries detected from last 6 months',
      'Late payment patterns suggest disputable payment history',
      'Found duplicate account entries that should be consolidated',
      'Potential identity verification issues detected',
      'Recommended goodwill letter opportunities identified'
    ];
    
    // Return 2-4 random insights
    const numInsights = Math.floor(Math.random() * 3) + 2;
    const shuffled = insights.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, numInsights);
  };

  const detectBureau = (filename) => {
    const name = filename.toLowerCase();
    if (name.includes('experian')) return 'experian';
    if (name.includes('equifax')) return 'equifax';
    if (name.includes('transunion') || name.includes('tu')) return 'transunion';
    if (name.includes('credit') && name.includes('report')) return 'multiple';
    return 'unknown';
  };

  const handleFiles = async (files) => {
    setUploading(true);
    setUploadProgress(0);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      // Validate file
      const validation = validateFile(file);
      if (!validation.valid) {
        alert(validation.error);
        continue;
      }

      // Simulate upload progress
      for (let progress = 0; progress <= 100; progress += 10) {
        setUploadProgress(progress);
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      // Create new file entry
      const newFile = {
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: file.size,
        type: file.type,
        bureau: detectBureau(file.name),
        upload_date: new Date().toISOString(),
        status: 'processed',
        insights: generateMockInsights(file.name),
        score_impact: Math.floor(Math.random() * 50) + 10, // 10-60 point potential impact
        dispute_opportunities: Math.floor(Math.random() * 5) + 1
      };

      // Add to files list
      const updatedFiles = [newFile, ...uploadedFiles];
      saveFiles(updatedFiles);
    }

    setUploading(false);
    setUploadProgress(0);
  };

  const getFileIcon = (type) => {
    if (type?.includes('pdf')) return FileText;
    if (type?.includes('image')) return FileImage;
    if (type?.includes('sheet') || type?.includes('excel')) return FileSpreadsheet;
    return FileText;
  };

  const getBureauColor = (bureau) => {
    switch(bureau) {
      case 'experian': return 'bg-green-100 text-green-800';
      case 'equifax': return 'bg-blue-100 text-blue-800';
      case 'transunion': return 'bg-purple-100 text-purple-800';
      case 'multiple': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const deleteFile = (fileId) => {
    const updatedFiles = uploadedFiles.filter(file => file.id !== fileId);
    saveFiles(updatedFiles);
  };

  const reprocessFile = async (fileId) => {
    const updatedFiles = uploadedFiles.map(file => {
      if (file.id === fileId) {
        return {
          ...file,
          status: 'processing',
          insights: [],
        };
      }
      return file;
    });
    saveFiles(updatedFiles);

    // Simulate reprocessing
    setTimeout(() => {
      const finalFiles = uploadedFiles.map(file => {
        if (file.id === fileId) {
          return {
            ...file,
            status: 'processed',
            insights: generateMockInsights(file.name),
            score_impact: Math.floor(Math.random() * 50) + 10,
            dispute_opportunities: Math.floor(Math.random() * 5) + 1
          };
        }
        return file;
      });
      saveFiles(finalFiles);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">Upload Credit Reports</h1>
        <p className="text-gray-600">Upload your credit reports to get started with AI-powered analysis</p>
      </div>

      {/* Drag and Drop Upload Area */}
      <div 
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
          dragActive 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 hover:border-gray-400 bg-white'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Drop your credit reports here
        </h3>
        <p className="text-gray-600 mb-4">
          or click to browse your files
        </p>
        <input
          type="file"
          multiple
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          onChange={handleFileSelect}
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
        >
          <Upload className="w-4 h-4 mr-2" />
          Choose Files
        </label>
        <p className="text-xs text-gray-500 mt-2">
          Supports PDF, DOC, DOCX, JPG, PNG files up to 10MB each
        </p>
      </div>

      {/* Upload Progress */}
      {uploading && (
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-800">Uploading & Analyzing...</h3>
            <span className="text-sm text-gray-600">{uploadProgress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-2">
            🤖 AI is analyzing your credit report for dispute opportunities...
          </p>
        </div>
      )}

      {/* File Upload Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="font-semibold text-blue-800 mb-3">📋 Upload Tips for Best Results</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-blue-700 mb-2">Recommended Files:</h4>
            <ul className="text-sm text-blue-600 space-y-1">
              <li>• Annual credit reports from all 3 bureaus</li>
              <li>• Recent credit monitoring reports</li>
              <li>• Dispute correspondence letters</li>
              <li>• Account statements showing errors</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-blue-700 mb-2">File Quality:</h4>
            <ul className="text-sm text-blue-600 space-y-1">
              <li>• Use high-resolution scans (300+ DPI)</li>
              <li>• Ensure all text is clearly readable</li>
              <li>• Include all pages of reports</li>
              <li>• Name files clearly (e.g., "Experian_2024.pdf")</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Uploaded Files List */}
      {uploadedFiles.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800">Uploaded Files</h3>
            <span className="text-sm text-gray-600">{uploadedFiles.length} file{uploadedFiles.length !== 1 ? 's' : ''}</span>
          </div>
          <div className="space-y-4">
            {uploadedFiles.map((file) => {
              const FileIcon = getFileIcon(file.type);
              return (
                <div key={file.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <FileIcon className="w-8 h-8 text-blue-600" />
                      <div>
                        <h4 className="font-medium text-gray-800">{file.name}</h4>
                        <p className="text-sm text-gray-600">
                          {(file.size / 1024 / 1024).toFixed(1)} MB • Uploaded {new Date(file.upload_date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs rounded-full capitalize ${getBureauColor(file.bureau)}`}>
                        {file.bureau === 'unknown' ? 'Credit Report' : file.bureau}
                      </span>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        file.status === 'processed' ? 'bg-green-100 text-green-800' :
                        file.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {file.status}
                      </span>
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => reprocessFile(file.id)}
                          className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                          title="Reprocess File"
                        >
                          <RefreshCw className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-green-600 transition-colors" title="Download">
                          <Download className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteFile(file.id)}
                          className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                          title="Delete File"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* AI Analysis Results */}
                  {file.status === 'processed' && file.insights && file.insights.length > 0 && (
                    <div className="bg-blue-50 rounded-lg p-3 mb-3">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-medium text-blue-800">🤖 AI Analysis Results</h5>
                        <div className="flex items-center space-x-3 text-sm">
                          <span className="text-green-600 font-medium">
                            +{file.score_impact} pts potential
                          </span>
                          <span className="text-blue-600 font-medium">
                            {file.dispute_opportunities} disputes
                          </span>
                        </div>
                      </div>
                      <ul className="text-sm text-blue-700 space-y-1">
                        {file.insights.map((insight, index) => (
                          <li key={index}>• {insight}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Processing Status */}
                  {file.status === 'processing' && (
                    <div className="bg-yellow-50 rounded-lg p-3 flex items-center space-x-2">
                      <RefreshCw className="w-4 h-4 text-yellow-600 animate-spin" />
                      <span className="text-sm text-yellow-800">🤖 AI is analyzing this file...</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Empty State */}
      {uploadedFiles.length === 0 && !uploading && (
        <div className="text-center py-12">
          <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-800 mb-2">No Files Uploaded Yet</h3>
          <p className="text-gray-600 mb-4">Upload your credit reports to get started with AI-powered analysis</p>
        </div>
      )}
    </div>
  );
};

export default UploadComponent;
