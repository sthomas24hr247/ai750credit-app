'use client'

import { 
  Zap, Star, Shield, TrendingUp, CheckCircle, ArrowRight, 
  BarChart3, FileText, AlertTriangle
} from 'lucide-react';

const LandingPage = ({ onSignUp, onSignIn }) => {
  // rest of your component...
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Zap className="w-8 h-8 text-blue-600" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AI750Credit
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={onSignIn}
                className="text-gray-600 hover:text-gray-800 font-medium"
              >
                Sign In
              </button>
              <button
                onClick={onSignUp}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all"
              >
                Start Free Trial
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Get Your Credit Score to{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                750+
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              AI-powered credit repair that automatically generates dispute letters, monitors your progress, 
              and helps you achieve excellent credit faster than traditional methods.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={onSignUp}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all flex items-center space-x-2"
              >
                <span>Start 7-Day Free Trial</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={onSignIn}
                className="text-blue-600 hover:text-blue-700 font-medium text-lg flex items-center space-x-2"
              >
                <span>🚀 Quick Demo Login</span>
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              No credit card required • Cancel anytime • 750+ score guarantee
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Fix Your Credit
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our AI analyzes your credit reports and creates personalized strategies to boost your score.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: "AI-Powered Disputes",
                description: "Automatically generate FCRA-compliant dispute letters based on your credit report analysis.",
                color: "blue"
              },
              {
                icon: BarChart3,
                title: "Real-Time Monitoring",
                description: "Track your credit score changes across all three bureaus with instant alerts.",
                color: "green"
              },
              {
                icon: Shield,
                title: "Credit Freeze Management",
                description: "Easily freeze and unfreeze your credit with all major bureaus for identity protection.",
                color: "purple"
              },
              {
                icon: FileText,
                title: "Goodwill Letters",
                description: "Professional templates to request removal of late payments and negative items.",
                color: "orange"
              },
              {
                icon: AlertTriangle,
                title: "CFPB Complaints",
                description: "File federal complaints when credit bureaus fail to investigate disputes properly.",
                color: "red"
              },
              {
                icon: TrendingUp,
                title: "Score Optimization",
                description: "Get personalized recommendations to improve your credit utilization and payment history.",
                color: "indigo"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
                <div className={`w-12 h-12 rounded-lg bg-${feature.color}-100 flex items-center justify-center mb-4`}>
                  <feature.icon className={`w-6 h-6 text-${feature.color}-600`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              "Don&apos;t have an account? Sign up"
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                metric: "127",
                label: "Average Point Increase",
                description: "Users see significant improvement in 90 days"
              },
              {
                metric: "94%",
                label: "Success Rate",
                description: "Of users reach 750+ credit score"
              },
              {
                metric: "45",
                label: "Days Average",
                description: "To see first positive changes"
              }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">{stat.metric}</div>
                <div className="text-xl font-semibold text-gray-900 mb-2">{stat.label}</div>
                <div className="text-gray-600">{stat.description}</div>
              </div>
            ))}
          </div>

          {/* Testimonials */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah M.",
                score: "620 → 760",
                text: "AI750Credit helped me dispute errors I didn&apos;t even know existed. My score jumped 140 points in 4 months!"
              },
              {
                name: "Mike R.",
                score: "580 → 745",
                text: "The AI found inconsistencies across all three bureaus. The automated letters saved me so much time."
              },
              {
                name: "Jennifer L.",
                score: "650 → 780",
                text: "I got approved for my dream home mortgage thanks to the credit improvement. Worth every penny!"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">"{testimonial.text}"</p>
                <div className="flex justify-between items-center">
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">
                    {testimonial.score}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600">
              Start with a free trial, then just $49/month. Cancel anytime.
            </p>
          </div>

          <div className="max-w-lg mx-auto">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 border-2 border-blue-200">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">AI750Credit Pro</h3>
                <div className="flex items-baseline justify-center">
                  <span className="text-5xl font-bold text-gray-900">$49</span>
                  <span className="text-xl text-gray-600 ml-2">/month</span>
                </div>
                <p className="text-gray-600 mt-2">7-day free trial • Cancel anytime</p>
              </div>

              <div className="space-y-4 mb-8">
                {[
                  "AI-powered dispute letter generation",
                  "Credit monitoring across all 3 bureaus",
                  "Goodwill letter templates",
                  "CFPB complaint management",
                  "Credit freeze management",
                  "Progress tracking & analytics",
                  "24/7 customer support",
                  "750+ score guarantee"
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={onSignUp}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all"
              >
                Start Free Trial
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Achieve 750+ Credit?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands who've transformed their financial future with AI-powered credit repair.
          </p>
          <button
            onClick={onSignUp}
            className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all"
          >
            Start Your Free Trial Today
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Zap className="w-6 h-6 text-blue-400" />
                <span className="text-xl font-bold">AI750Credit</span>
              </div>
              <p className="text-gray-400">
                AI-powered credit repair that gets results.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Features</h3>
              <ul className="space-y-2 text-gray-400">
                <li>AI Dispute Letters</li>
                <li>Credit Monitoring</li>
                <li>Goodwill Templates</li>
                <li>CFPB Complaints</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Live Chat</li>
                <li>Resources</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>FCRA Compliance</li>
                <li>Refund Policy</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 AI750Credit. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;