import React, { useState } from 'react';
import { Gavel, CheckCircle, Mail, Send } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => {
        setSubscribed(false);
      }, 5000);
    }
  };

  return (
    <footer className="bg-brand-navy text-white font-sans mt-auto border-t border-brand-navy-light relative overflow-hidden">
      {/* Decorative top gold line */}
      <div className="h-1.5 w-full bg-gradient-to-r from-brand-gold via-brand-gold-bg to-brand-gold" />
      
      <div className="max-w-[1440px] mx-auto px-6 md:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12 pb-12 border-b border-brand-navy-light">
          
          {/* Column 1: Brand Header */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5 font-display text-2xl font-bold text-white">
              <Gavel className="w-6 h-6 text-brand-gold" />
              <span>Beyond The Bar</span>
            </div>
            <p className="text-gray-400 font-sans text-[15px] leading-relaxed max-w-sm">
              Elevating the Legal Journey through precision-engineered workflows, custom AI processing logic, and premium structural representation.
            </p>
          </div>

          {/* Column 2: Quick Links Info */}
          <div className="space-y-4">
            <h4 className="text-brand-gold font-semibold text-xs uppercase tracking-wider">Practice Integration</h4>
            <ul className="space-y-2 text-gray-400 font-sans text-sm">
              <li className="hover:text-brand-gold transition-colors">Constitutional Analytics Engine</li>
              <li className="hover:text-brand-gold transition-colors">Commercial Contract Blueprints</li>
              <li className="hover:text-brand-gold transition-colors">Pre-trial Dispute Optimization</li>
              <li className="hover:text-brand-gold transition-colors">Academic Jurisprudence Syllabus</li>
            </ul>
          </div>

          {/* Column 3: Newsletter form */}
          <div className="space-y-4">
            <h4 className="text-brand-gold font-semibold text-xs uppercase tracking-wider">SUBSCRIBE FOR THE LATEST LEGAL OPPORTUNITIES</h4>
            {subscribed ? (
              <div className="bg-brand-navy-light/60 border border-brand-gold/30 rounded px-4 py-3 flex items-center gap-2 text-brand-gold-light animate-fadeIn">
                <CheckCircle className="w-5 h-5 flex-shrink-0 text-brand-gold" />
                <span className="text-sm font-medium">Briefing secured! Check your inbox soon.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <div className="relative flex-grow">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email address"
                    required
                    className="w-full bg-brand-navy-light/40 border border-brand-navy-light rounded px-4 pl-10 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-brand-gold transition-all text-sm focus:ring-1 focus:ring-brand-gold/20"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-brand-gold hover:bg-brand-gold/90 text-white font-semibold text-sm px-5 py-3 rounded transition-colors flex items-center justify-center cursor-pointer flex-shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Footer bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-gray-500 text-xs">
            © 2026 Beyond The Bar. All rights reserved. Precise corporate and educational architecture.
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-gray-400">
            <span className="hover:text-brand-gold transition-colors cursor-pointer">Terms of Service</span>
            <span className="hover:text-brand-gold transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-brand-gold transition-colors cursor-pointer">Cookie Policy</span>
            <span className="hover:text-brand-gold transition-colors cursor-pointer">Contact Us</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
