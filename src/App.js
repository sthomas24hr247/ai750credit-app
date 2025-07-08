import React, { useState, useEffect, createContext, useContext } from 'react';
import { Upload, FileText, BarChart3, Clock, Target, Users, DollarSign, TrendingUp, Mail, Shield, Settings, User, LogOut, Menu, X, Download, Calendar, AlertTriangle, CheckCircle, XCircle, Plus, Search, Filter, Eye, Edit, Trash2, Send, Phone, MapPin, CreditCard, Zap, Star, Award, FileImage, FileSpreadsheet, RefreshCw } from 'lucide-react';

// Enhanced Mock Supabase Client with better data persistence
const createSupabaseClient = (url, key, options) => {
  const client = {
    auth: {
      signUp: async ({ email, password, options }) => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        if (email && password) {
          const user = { 
            id: Math.random().toString(36).substr(2, 9), 
            email, 
            user_metadata: options?.data || {} 
          };
          
          const accounts = JSON.parse(localStorage.getItem('demo_accounts') || '{}');
          accounts[email] = {
            user,
            password,
            profile: {
              id: user.id,
              first_name: options?.data?.firstName || 'User',
              last_name: options?.data?.lastName || 'Demo',
              phone: options?.data?.phone || '',
              subscription_status: 'trial',
              trial_ends_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
            }
          };
          localStorage.setItem('demo_accounts', JSON.stringify(accounts));
          localStorage.setItem('supabase_user', JSON.stringify(user));
          localStorage.setItem('supabase_session', JSON.stringify({ user }));
          return { data: { user }, error: null };
        }
        return { data: null, error: { message: 'Invalid credentials' } };
      },
      signInWithPassword: async ({ email, password }) => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const accounts = JSON.parse(localStorage.getItem('demo_accounts') || '{}');
        const account = accounts[email];
        
        if (account && account.password === password) {
          localStorage.setItem('supabase_user', JSON.stringify(account.user));
          localStorage.setItem('supabase_session', JSON.stringify({ user: account.user }));
          return { data: { user: account.user }, error: null };
        }
        
        return { data: null, error: { message: 'Invalid email or password' } };
      },
      signOut: async () => {
        localStorage.removeItem('supabase_user');
        localStorage.removeItem('supabase_session');
        return { error: null };
      },
      getSession: async () => {
        const session = localStorage.getItem('supabase_session');
        return { data: { session: session ? JSON.parse(session) : null }, error: null };
      },
      onAuthStateChange: (callback) => {
        return { data: { subscription: { unsubscribe: () => {} } } };
      }
    },
    from: (table) => ({
      select: (columns = '*') => ({
        eq: (column, value) => ({
          order: (column, options) => Promise.resolve({ data: [], error: null }),
          then: () => Promise.resolve({ data: [], error: null })
        }),
        then: () => Promise.resolve({ data: [], error: null })
      }),
      insert: (data) => ({
        select: () => ({
          single: async () => {
            await new Promise(resolve => setTimeout(resolve, 300));
            const newRecord = { 
              id: Math.random().toString(36).substr(2, 9), 
              ...data[0], 
              created_at: new Date().toISOString(), 
              updated_at: new Date().toISOString() 
            };
            
            const existing = JSON.parse(localStorage.getItem(table) || '[]');
            existing.unshift(newRecord);
            localStorage.setItem(table, JSON.stringify(existing));
            
            return { data: newRecord, error: null };
          }
        })
      }),
      update: (data) => ({
        eq: (column, value) => ({
          select: () => ({
            single: async () => {
              await new Promise(resolve => setTimeout(resolve, 300));
              return { data: { id: value, ...data, updated_at: new Date().toISOString() }, error: null };
            }
          })
        })
      })
    }),
    storage: {
      from: (bucket) => ({
        upload: async (path, file) => {
          await new Promise(resolve => setTimeout(resolve, 1000));
          return { data: { path }, error: null };
        },
        getPublicUrl: (path) => ({ data: { publicUrl: `https://demo-storage.com/${path}` } })
      })
    }
  };
  
  return client;
};

const supabaseUrl = 'https://ehspfijqzkrynadprama.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVoc3BmaWpxemtyeW5hZHByYW1hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE3NTc5NjUsImV4cCI6MjA2NzMzMzk2NX0.-YLZ58IsAlOxj7wwMCb8DZYnf0ulGOQMWfXvNTih43Y';

const supabase = createSupabaseClient(supabaseUrl, supabaseAnonKey);

// Auth Context
const AuthContext = createContext({});

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      if (session?.user) {
        setProfile({
          id: session.user.id,
          first_name: 'Samuel',
          last_name: 'Thomas',
          subscription_status: 'trial',
          trial_ends_at: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString()
        });
      }
      setLoading(false);
    };

    getInitialSession();
  }, []);

  const signUp = async (email, password, userData) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            firstName: userData.firstName,
            lastName: userData.lastName,
            phone: userData.phone
          }
        }
      });
      
      if (data?.user) {
        setUser(data.user);
        setProfile({
          id: data.user.id,
          first_name: userData.firstName,
          last_name: userData.lastName,
          phone: userData.phone,
          subscription_status: 'trial',
          trial_ends_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
        });
      }
      
      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  };

  const signIn = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (data?.user) {
        setUser(data.user);
        setProfile({
          id: data.user.id,
          first_name: 'User',
          last_name: 'Demo',
          subscription_status: 'trial',
          trial_ends_at: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString()
        });
      }
      
      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      setUser(null);
      setProfile(null);
      return { error };
    } catch (error) {
      return { error };
    }
  };

  const value = {
    user,
    profile,
    loading,
    signUp,
    signIn,
    signOut
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Authentication Page Component
const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { signUp, signIn } = useAuth();

  const handleSubmit = async () => {
    if (!email || !password) {
      setError('Please fill in all required fields');
      return;
    }
    
    if (!isLogin && (!firstName || !lastName || !phone)) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        const { data, error } = await signIn(email, password);
        if (error) throw error;
      } else {
        const { data, error } = await signUp(email, password, {
          firstName,
          lastName,
          phone
        });
        if (error) throw error;
      }
    } catch (error) {
      setError(error.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Zap className="w-8 h-8 text-blue-600" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AI750Credit
              </span>
            </div>
            <h2 className="text-xl font-semibold text-gray-800">
              {isLogin ? 'Welcome Back' : 'Start Your Journey to 750+'}
            </h2>
            <p className="text-gray-600 mt-2">
              {isLogin ? 'Sign in to your account' : 'Create your account today'}
            </p>
          </div>

          <div className="space-y-4">
            {!isLogin && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
            )}

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {error && (
              <div className="bg-red-50 text-red-800 p-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50"
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>{isLogin ? 'Signing In...' : 'Creating Account...'}</span>
                </div>
              ) : (
                <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
              )}
            </button>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
            </button>
          </div>

          {!isLogin && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">🚀 What you get:</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• AI-powered dispute letter generation</li>
                <li>• Real-time credit monitoring</li>
                <li>• FCRA violation tracking</li>
                <li>• Goodwill letter templates</li>
                <li>• 7-day free trial, then $49/month</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Main Platform Component
const AI750CreditPlatform = () => {
  const { user, profile, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Enhanced state management with localStorage persistence
  const [creditScores, setCreditScores] = useState(() => {
    const saved = localStorage.getItem('creditScores');
    return saved ? JSON.parse(saved) : [
      { id: '1', bureau: 'equifax', score: 680, score_date: '2024-12-15', created_at: new Date().toISOString() },
      { id: '2', bureau: 'transunion', score: 695, score_date: '2024-12-15', created_at: new Date().toISOString() },
      { id: '3', bureau: 'experian', score: 710, score_date: '2024-12-15', created_at: new Date().toISOString() },
    ];
  });
  
  const [disputes, setDisputes] = useState(() => {
    const saved = localStorage.getItem('disputes');
    return saved ? JSON.parse(saved) : [
      { id: '1', creditor: 'Capital One', account: '****1234', status: 'in_progress', type: 'invalid_debt', submitted_date: '2024-12-01', bureau: 'equifax' },
      { id: '2', creditor: 'Chase Bank', account: '****5678', status: 'resolved', type: 'incorrect_payment', submitted_date: '2024-11-15', bureau: 'transunion' },
      { id: '3', creditor: 'Discover', account: '****9012', status: 'pending', type: 'duplicate_account', submitted_date: '2024-12-10', bureau: 'experian' }
    ];
  });
  
  const [goodwillLetters, setGoodwillLetters] = useState(() => {
    const saved = localStorage.getItem('goodwillLetters');
    return saved ? JSON.parse(saved) : [
      { id: '1', creditor: 'Bank of America', account: '****3456', status: 'sent', sent_date: '2024-11-20', follow_up_date: '2024-12-20' },
      { id: '2', creditor: 'Wells Fargo', account: '****7890', status: 'draft', created_date: '2024-12-01' }
    ];
  });
  
  const [fcraViolations, setFcraViolations] = useState(() => {
    const saved = localStorage.getItem('fcraViolations');
    return saved ? JSON.parse(saved) : [
      { 
        id: '1', 
        violation_type: 'Failure to verify', 
        creditor: 'Equifax', 
        status: 'active', 
        discovered_date: '2024-11-30',
        description: 'Bureau failed to verify disputed account within 30 days',
        account: '****1234',
        dispute_date: '2024-11-01',
        investigation_deadline: '2024-12-01',
        evidence: ['dispute_letter.pdf', 'certified_mail_receipt.pdf'],
        potential_damages: 1000
      },
      { 
        id: '2', 
        violation_type: 'Incomplete investigation', 
        creditor: 'TransUnion', 
        status: 'resolved', 
        discovered_date: '2024-11-15',
        description: 'Bureau did not contact creditor during investigation',
        account: '****5678',
        dispute_date: '2024-10-15',
        investigation_deadline: '2024-11-15',
        evidence: ['investigation_results.pdf'],
        potential_damages: 500,
        resolution_date: '2024-12-01',
        resolution_details: 'Account removed from credit report'
      },
      {
        id: '3',
        violation_type: 'Willful noncompliance',
        creditor: 'Experian',
        status: 'pending_legal',
        discovered_date: '2024-12-01',
        description: 'Bureau refused to investigate valid dispute',
        account: '****9012',
        dispute_date: '2024-11-15',
        investigation_deadline: '2024-12-15',
        evidence: ['dispute_letter.pdf', 'bureau_response.pdf', 'legal_notice.pdf'],
        potential_damages: 2500
      }
    ];
  });
  
  const [uploadedFiles, setUploadedFiles] = useState(() => {
    const saved = localStorage.getItem('uploadedFiles');
    return saved ? JSON.parse(saved) : [];
  });

  // Enhanced data persistence
  useEffect(() => {
    localStorage.setItem('creditScores', JSON.stringify(creditScores));
  }, [creditScores]);

  useEffect(() => {
    localStorage.setItem('disputes', JSON.stringify(disputes));
  }, [disputes]);

  useEffect(() => {
    localStorage.setItem('goodwillLetters', JSON.stringify(goodwillLetters));
  }, [goodwillLetters]);

  useEffect(() => {
    localStorage.setItem('fcraViolations', JSON.stringify(fcraViolations));
  }, [fcraViolations]);

  useEffect(() => {
    localStorage.setItem('uploadedFiles', JSON.stringify(uploadedFiles));
  }, [uploadedFiles]);

  const addCreditScore = async (bureau, score) => {
    const newScore = {
      id: Math.random().toString(36).substr(2, 9),
      bureau,
      score: parseInt(score),
      score_date: new Date().toISOString().split('T')[0],
      created_at: new Date().toISOString()
    };
    setCreditScores(prev => [newScore, ...prev]);
    return newScore;
  };

  const addDispute = async (disputeData) => {
    const newDispute = {
      id: Math.random().toString(36).substr(2, 9),
      ...disputeData,
      submitted_date: new Date().toISOString().split('T')[0],
      status: 'pending',
      created_at: new Date().toISOString()
    };
    setDisputes(prev => [newDispute, ...prev]);
    return newDispute;
  };

  const addGoodwillLetter = async (letterData) => {
    const newLetter = {
      id: Math.random().toString(36).substr(2, 9),
      ...letterData,
      created_date: new Date().toISOString().split('T')[0],
      status: 'draft',
      created_at: new Date().toISOString()
    };
    setGoodwillLetters(prev => [newLetter, ...prev]);
    return newLetter;
  };

  const addFcraViolation = async (violationData) => {
    const newViolation = {
      id: Math.random().toString(36).substr(2, 9),
      ...violationData,
      discovered_date: new Date().toISOString().split('T')[0],
      status: 'active',
      evidence: [],
      created_at: new Date().toISOString()
    };
    setFcraViolations(prev => [newViolation, ...prev]);
    return newViolation;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading AI750Credit...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthPage />;
  }

  // Top Header Component
  const Header = () => {
    const { signOut } = useAuth();
    
    const handleSignOut = async () => {
      await signOut();
    };

    return (
      <header className="bg-white border-b border-gray-200 px-6 h-16 flex items-center justify-end">
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
            {(profile?.first_name || 'S')[0].toUpperCase()}
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center space-x-2 px-4 py-2 text-sm text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </header>
    );
  };

  // Enhanced Dashboard Component
  const DashboardComponent = () => {
    const [newScore, setNewScore] = useState({ bureau: '', score: '' });
    const [addingScore, setAddingScore] = useState(false);

    const getAverageScore = () => {
      if (creditScores.length === 0) return 0;
      const total = creditScores.reduce((sum, score) => sum + score.score, 0);
      return Math.round(total / creditScores.length);
    };

    const getLatestScores = () => {
      const latestByBureau = {};
      creditScores.forEach(score => {
        if (!latestByBureau[score.bureau] || 
            new Date(score.score_date) > new Date(latestByBureau[score.bureau].score_date)) {
          latestByBureau[score.bureau] = score;
        }
      });
      return latestByBureau;
    };

    const getScoreTrend = (bureau) => {
      const bureauScores = creditScores
        .filter(score => score.bureau === bureau)
        .sort((a, b) => new Date(a.score_date) - new Date(b.score_date));
      
      if (bureauScores.length < 2) return 0;
      
      const latest = bureauScores[bureauScores.length - 1];
      const previous = bureauScores[bureauScores.length - 2];
      return latest.score - previous.score;
    };

    const handleAddScore = async () => {
      if (!newScore.bureau || !newScore.score) return;
      
      setAddingScore(true);
      try {
        await addCreditScore(newScore.bureau, parseInt(newScore.score));
        setNewScore({ bureau: '', score: '' });
      } catch (error) {
        console.error('Error adding score:', error);
      } finally {
        setAddingScore(false);
      }
    };

    const latestScores = getLatestScores();
    const averageScore = getAverageScore();

    return (
      <div className="space-y-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Credit Dashboard</h1>
          <p className="text-gray-600">Monitor your credit scores and track your progress</p>
        </div>

        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
          <h2 className="text-lg font-medium text-blue-100 mb-2">Average Credit Score</h2>
          <div className="text-6xl font-bold mb-2">{averageScore || '---'}</div>
          <p className="text-blue-100 mb-3">
            {averageScore >= 750 ? '🎉 Excellent Credit!' : 
             averageScore >= 700 ? '👍 Good Credit' : 
             averageScore >= 650 ? '📈 Fair Credit' : 
             averageScore > 0 ? '🔧 Needs Work' : 'Add your scores to get started'}
          </p>
          {averageScore > 0 && averageScore < 750 && (
            <p className="text-blue-100">{750 - averageScore} points to reach 750!</p>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {['equifax', 'transunion', 'experian'].map((bureau) => {
            const score = latestScores[bureau];
            const trend = getScoreTrend(bureau);
            return (
              <div key={bureau} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 capitalize">{bureau}</h3>
                    <p className="text-sm text-gray-600">
                      {score ? `Updated ${new Date(score.score_date).toLocaleDateString()}` : 'No data yet'}
                    </p>
                  </div>
                  <div className="flex items-center space-x-1">
                    {trend > 0 ? (
                      <TrendingUp className="w-5 h-5 text-green-500" />
                    ) : trend < 0 ? (
                      <TrendingUp className="w-5 h-5 text-red-500 rotate-180" />
                    ) : (
                      <TrendingUp className="w-5 h-5 text-gray-400" />
                    )}
                    {trend !== 0 && (
                      <span className={`text-sm font-medium ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {trend > 0 ? '+' : ''}{trend}
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="text-4xl font-bold text-gray-900 mb-4">{score?.score || '---'}</div>
                
                {score && (
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-500 ${
                        score.score >= 750 ? 'bg-green-500' :
                        score.score >= 700 ? 'bg-blue-500' :
                        score.score >= 650 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${Math.max(10, (score.score - 300) / 550 * 100)}%` }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="font-semibold text-gray-800 mb-4">Add Credit Score</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Bureau</label>
              <select
                value={newScore.bureau}
                onChange={(e) => setNewScore(prev => ({ ...prev, bureau: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Bureau</option>
                <option value="equifax">Equifax</option>
                <option value="transunion">TransUnion</option>
                <option value="experian">Experian</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Score</label>
              <input
                type="number"
                min="300"
                max="850"
                value={newScore.score}
                onChange={(e) => setNewScore(prev => ({ ...prev, score: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="300-850"
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={handleAddScore}
                disabled={!newScore.bureau || !newScore.score || addingScore}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {addingScore ? 'Adding...' : 'Add Score'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Enhanced Credit Freeze Component
  const CreditFreezeComponent = () => {
    const [freezeStatus, setFreezeStatus] = useState(() => {
      const saved = localStorage.getItem('creditFreezeStatus');
      return saved ? JSON.parse(saved) : {
        experian: 'not_frozen',
        equifax: 'not_frozen', 
        transunion: 'not_frozen',
        innovis: 'not_frozen',
        lexisnexis: 'not_frozen',
        corelogic: 'not_frozen',
        sagestream: 'not_frozen',
        microbilt: 'not_frozen'
      };
    });

    const [showInstructions, setShowInstructions] = useState(false);

    // Save freeze status to localStorage
    useEffect(() => {
      localStorage.setItem('creditFreezeStatus', JSON.stringify(freezeStatus));
    }, [freezeStatus]);

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
      switch(status) {
        case 'frozen': return 'bg-green-100 text-green-800';
        case 'in_progress': return 'bg-yellow-100 text-yellow-800';
        case 'not_frozen': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
      }
    };

    const getStatusIcon = (status) => {
      switch(status) {
        case 'frozen': return '🔒';
        case 'in_progress': return '⏳';
        case 'not_frozen': return '🔓';
        default: return '❓';
      }
    };

    const getFrozenCount = () => {
      return Object.values(freezeStatus).filter(status => status === 'frozen').length;
    };

    const getProgressPercentage = () => {
      return Math.round((getFrozenCount() / 8) * 100);
    };

    const BureauCard = ({ bureau, isPhantom = false }) => (
      <div className="bg-white border border-gray-200 rounded-xl p-4">
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
            <span className="text-lg">{getStatusIcon(freezeStatus[bureau.id])}</span>
            <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(freezeStatus[bureau.id])}`}>
              {freezeStatus[bureau.id].replace('_', ' ')}
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
            <span className="font-medium">{bureau.processingTime}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Phone:</span>
            <span className="font-medium">{bureau.phone}</span>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          
            href={bureau.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <span>Freeze Online</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
          
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => updateFreezeStatus(bureau.id, 'frozen')}
              className={`px-2 py-1 text-xs rounded ${
                freezeStatus[bureau.id] === 'frozen' 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Frozen
            </button>
            <button
              onClick={() => updateFreezeStatus(bureau.id, 'in_progress')}
              className={`px-2 py-1 text-xs rounded ${
                freezeStatus[bureau.id] === 'in_progress' 
                  ? 'bg-yellow-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Processing
            </button>
            <button
              onClick={() => updateFreezeStatus(bureau.id, 'not_frozen')}
              className={`px-2 py-1 text-xs rounded ${
                freezeStatus[bureau.id] === 'not_frozen' 
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

    return (
      <div className="space-y-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Credit Freeze Protection</h1>
          <p className="text-gray-600">The first step before starting any credit repair - freeze your credit with all 8 bureaus</p>
        </div>

        {/* Progress Overview */}
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
              style={{ width: `${getProgressPercentage()}%` }}
            />
          </div>
          <p className="text-blue-100 text-sm">{getProgressPercentage()}% Complete</p>
        </div>

        {/* Main Credit Bureaus */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-gray-800">Main Credit Bureaus (Required)</h3>
            <span className="text-sm text-gray-600">
              {mainBureaus.filter(b => freezeStatus[b.id] === 'frozen').length}/3 Frozen
            </span>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {mainBureaus.map(bureau => (
              <BureauCard key={bureau.id} bureau={bureau} />
            ))}
          </div>
        </div>

        {/* Phantom Credit Bureaus */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-800">Phantom Credit Bureaus (Critical)</h3>
              <p className="text-sm text-gray-600">Lesser-known bureaus that can impact your credit decisions</p>
            </div>
            <span className="text-sm text-gray-600">
              {phantomBureaus.filter(b => freezeStatus[b.id] === 'frozen').length}/5 Frozen
            </span>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {phantomBureaus.map(bureau => (
              <BureauCard key={bureau.id} bureau={bureau} isPhantom={true} />
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Sidebar Component - Always Visible
  const Sidebar = () => {
    const menuItems = [
      { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
      { id: 'credit-freeze', label: 'Credit Freeze', icon: Shield },
      { id: 'upload', label: 'Upload', icon: Upload },
      { id: 'disputes', label: 'Disputes', icon: FileText },
      { id: 'track', label: 'Track', icon: Clock },
      { id: 'goodwill', label: 'Goodwill', icon: Mail },
      { id: 'monitor', label: 'Monitor', icon: Target },
      { id: 'fcra', label: 'FCRA', icon: AlertTriangle },
      { id: 'settings', label: 'Settings', icon: Settings },
      { id: 'account', label: 'Account', icon: User }
    ];

    return (
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <Zap className="w-6 h-6 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">AI750Credit</span>
          </div>
        </div>

        {/* User Profile */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
              {(profile?.first_name || 'S')[0].toUpperCase()}
            </div>
            <div>
              <p className="font-semibold text-gray-900">
                {profile?.first_name && profile?.last_name 
                  ? `${profile.first_name} ${profile.last_name}`
                  : 'Samuel Thomas'
                }
              </p>
              <p className="text-sm text-gray-500">
                {profile?.subscription_status === 'active' ? 'Premium Member' : 'Free Trial'}
              </p>
            </div>
          </div>
        </div>

        {/* Vertical Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
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
            <p className="text-sm text-blue-700 mb-3">
              {profile?.trial_ends_at 
                ? `${Math.max(0, Math.ceil((new Date(profile.trial_ends_at) - new Date()) / (1000 * 60 * 60 * 24)))} days left`
                : '5 days left'
              }
            </p>
            <button className="w-full bg-blue-600 text-white text-sm py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
              Upgrade Now
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardComponent />;
      case 'credit-freeze': return <CreditFreezeComponent />;
      case 'upload':
      case 'disputes':
      case 'track':
      case 'goodwill':
      case 'monitor':
      case 'fcra':
      case 'settings':
      case 'account':
      default: 
        return (
          <div className="space-y-6">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-1">
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Component
              </h1>
              <p className="text-gray-600">This feature is coming soon!</p>
            </div>
            <div className="p-12 text-center bg-white rounded-xl border border-gray-200">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Coming Soon</h3>
              <p className="text-gray-600 mb-4">We're working hard to bring you this feature</p>
              <p className="text-sm text-gray-500">Try the "Dashboard" or "Credit Freeze" tabs to see the full functionality</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <Header />
        
        <main className="flex-1 p-6 overflow-y-auto">
          {renderActiveComponent()}
        </main>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AI750CreditPlatform />
    </AuthProvider>
  );
};

export default App;
