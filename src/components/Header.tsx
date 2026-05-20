import React, { useState } from 'react';
import { Menu, X, Gavel, Sparkles, BookOpen, Layers } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Header({ activeTab, setActiveTab }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigationItems = [
    { id: 'resources', label: 'Resources', icon: BookOpen },
    { id: 'assistant', label: 'AI Assistant', icon: Sparkles },
    { id: 'drafting', label: 'Drafting', icon: Gavel },
  ];

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white border-b border-brand-surface-highest sticky top-0 z-50 transition-colors duration-200">
      <div className="max-w-[1440px] px-6 md:px-16 mx-auto h-20 flex justify-between items-center">
        {/* Brand Logo */}
        <button 
          onClick={() => handleTabClick('home')}
          className="flex items-center gap-2.5 font-display text-2xl font-bold text-brand-navy hover:text-brand-gold transition-colors duration-300"
        >
          <Gavel className="w-6 h-6 text-brand-gold" />
          <span className="tracking-tight">Beyond The Bar</span>
        </button>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-10">
          <button 
            onClick={() => handleTabClick('home')}
            className={`font-sans font-medium text-[15px] transition-colors py-2 relative ${
              activeTab === 'home' 
                ? 'text-brand-gold' 
                : 'text-gray-600 hover:text-brand-navy'
            }`}
          >
            Home
            {activeTab === 'home' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-gold rounded-full" />
            )}
          </button>
          
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`font-sans font-medium text-[15px] transition-colors py-2 relative flex items-center gap-1.5 ${
                  isActive 
                    ? 'text-brand-gold' 
                    : 'text-gray-600 hover:text-brand-navy'
                }`}
              >
                <Icon className="w-4 h-4 opacity-70" />
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-gold rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => handleTabClick('drafting')}
            className="hidden md:block bg-brand-navy text-white font-sans font-semibold text-sm tracking-wider px-6 py-3 rounded-md hover:bg-brand-navy-light transition-all transform hover:scale-[1.02] shadow-sm cursor-pointer"
          >
            GET STARTED
          </button>

          {/* Mobile Menu Icon */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-brand-navy hover:text-brand-gold transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 right-0 bg-white border-b border-brand-surface-highest px-6 py-6 shadow-xl transition-all z-40 animate-fadeIn">
          <div className="flex flex-col space-y-4">
            <button
              onClick={() => handleTabClick('home')}
              className={`text-left font-sans font-semibold text-lg py-2 ${
                activeTab === 'home' ? 'text-brand-gold' : 'text-gray-600'
              }`}
            >
              Home
            </button>
            
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`text-left font-sans font-semibold text-lg py-2 flex items-center gap-3 ${
                  activeTab === item.id ? 'text-brand-gold' : 'text-gray-600'
                }`}
              >
                {React.createElement(item.icon, { className: 'w-5 h-5 opacity-70' })}
                {item.label}
              </button>
            ))}

            <button
              onClick={() => handleTabClick('drafting')}
              className="mt-4 w-full bg-brand-navy text-white font-sans font-semibold tracking-wider text-center py-4 rounded hover:bg-brand-navy-light transition-all shadow-sm"
            >
              GET STARTED
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
