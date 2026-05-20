import React from 'react';
import { ArrowRight, CheckCircle, Globe, BookOpen, Video, FileText, Gavel, ShieldCheck, Activity } from 'lucide-react';

interface HomeViewProps {
  setActiveTab: (tab: string) => void;
  setResourceCategoryFilter?: (category: string) => void;
}

export default function HomeView({ setActiveTab, setResourceCategoryFilter }: HomeViewProps) {
  
  const handleFeaturedClick = (category: string) => {
    if (setResourceCategoryFilter) {
      setResourceCategoryFilter(category);
    }
    setActiveTab('resources');
  };

  return (
    <div className="animate-fadeIn font-sans bg-[#fbf9f8]">
      {/* 1. Hero Section */}
      <section 
        className="relative min-h-[750px] flex items-center justify-center border-b border-brand-surface-highest/60 bg-brand-surface-low overflow-hidden" 
        style={{ 
          backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBlcjoz0P41YnPx6Yv5MZs58UBS7FHAZ3mhZz4D-oedN3gSQePpt61uscgVhbSN6xLjlqdB72BfxDJeCz9rv7wrTx1jO--fC0LJb58Pq_PW_wX3AvNdHTKxT493lN8eWCc51I7y7sD6lyQz0He1vc-aoXNcbP2CYQEbKIokM50cm1H7VvyU6yXeOZIeDgQDLgYXaHwJ37Pliy1IEL-SqSD5CCtcvmhmxuode6lx02JPGDDyAME4SSF9oLh2SsV0A7lBh3dfpejl9uk')", 
          backgroundSize: 'cover', 
          backgroundPosition: 'center', 
          backgroundBlendMode: 'overlay' 
        }}
      >
        <div className="absolute inset-0 bg-white/92 mix-blend-normal"></div>
        
        {/* Subtle background nodes simulation */}
        <div className="absolute top-24 left-10 md:left-24 opacity-15 pointer-events-none">
          <svg width="200" height="200" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="40" stroke="#775a19" strokeWidth="0.5" strokeDasharray="3 3"/>
            <circle cx="50" cy="10" r="3" fill="#775a19"/>
            <circle cx="90" cy="50" r="3" fill="#775a19"/>
            <circle cx="50" cy="90" r="3" fill="#775a19"/>
            <circle cx="10" cy="50" r="3" fill="#775a19"/>
          </svg>
        </div>
        
        <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-16 w-full text-center py-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-gold/10 text-brand-gold font-semibold text-xs tracking-wider uppercase rounded-full mb-6">
            <Activity className="w-3.5 h-3.5" />
            <span>Prestige Intelligence Platform</span>
          </div>

          <h1 className="font-display text-4xl md:text-6xl lg:text-[64px] font-bold text-brand-navy tracking-tight leading-[1.1] mb-6 max-w-4xl mx-auto">
            Elevating the Legal Journey
          </h1>
          
          <p className="font-sans text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed font-light">
            Bridging the gap between historic legal rigor and modern digital efficiency. Empowering law students and professionals with elite curated resources, server-side AI-driven insight modules, and high-stakes drafting.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto">
            <button 
              onClick={() => setActiveTab('resources')}
              className="w-full sm:w-auto bg-brand-navy text-white font-semibold text-[15px] px-8 py-4 rounded hover:bg-brand-navy-light shadow-md transition-all active:scale-[0.98] cursor-pointer"
            >
              Explore Resources
            </button>
            <button 
              onClick={() => setActiveTab('drafting')}
              className="w-full sm:w-auto border border-brand-gold text-brand-gold font-semibold text-[15px] px-8 py-4 rounded hover:bg-brand-gold/5 transition-all active:scale-[0.98] cursor-pointer"
            >
              Request Drafting Services
            </button>
          </div>
        </div>
      </section>

      {/* 2. Resource Hub Bento Grid */}
      <section className="py-24 max-w-[1440px] mx-auto px-6 md:px-16">
        <div className="mb-16">
          <div className="w-12 h-1 bg-brand-gold mb-4" />
          <h2 className="font-display text-3xl md:text-[38px] font-bold text-brand-navy mb-4">Resource Hub</h2>
          <p className="font-sans text-gray-600 text-lg max-w-2xl">
            Curated opportunities, landmark Supreme Court breakdowns, and event grids to propel your legal advocacy.
          </p>
        </div>

        {/* Responsive Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px] md:auto-rows-[270px]">
          
          {/* Large Card: Internships & Opportunities */}
          <div 
            onClick={() => handleFeaturedClick('Internship')}
            className="md:col-span-2 md:row-span-2 bg-[#f6f5f3] border border-brand-surface-highest rounded-xl p-8 flex flex-col justify-end relative overflow-hidden group hover:shadow-xl transition-all duration-300 cursor-pointer"
          >
            {/* Elegant gray-layered bento aesthetic overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#ebe9e7]/90 via-[#f3f2f0]/60 to-transparent z-0 transition-opacity duration-300 group-hover:opacity-40" />
            <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-brand-navy/5 rounded-full pointer-events-none group-hover:scale-110 transition-transform duration-500" />
            
            <div className="relative z-10">
              <span className="inline-block bg-brand-navy text-white font-sans font-semibold text-[11px] uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-4 shadow-sm">
                Featured
              </span>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-brand-navy mb-2 group-hover:text-brand-gold transition-colors">
                Internships &amp; Job Opportunities
              </h3>
              <p className="font-sans text-gray-600 text-sm md:text-base max-w-lg mb-2">
                Exclusive active placements at top-tier litigation chambers, financial compliance firms, and corporate legal groups.
              </p>
              <span className="text-xs font-semibold text-brand-navy inline-flex items-center gap-1 mt-2">
                Launch directory panel <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </div>

          {/* Card: MUN Updates */}
          <div 
            onClick={() => handleFeaturedClick('MUN')}
            className="bg-white border border-[#c4c6cd]/50 rounded-xl p-6 flex flex-col justify-between hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 cursor-pointer group"
          >
            <div className="p-3 bg-brand-surface-high/60 w-fit rounded-lg">
              <Globe className="w-6 h-6 text-brand-gold" />
            </div>
            <div>
              <h3 className="font-display text-xl font-bold text-brand-navy mb-1 mt-4 group-hover:text-brand-gold transition-colors">
                MUN Updates
              </h3>
              <p className="font-sans text-gray-500 text-xs md:text-sm">
                Latest schedules, global brief briefs, and simulation guides.
              </p>
            </div>
          </div>

          {/* Card: Moot Court Competitions */}
          <div 
            onClick={() => handleFeaturedClick('Competition')}
            className="bg-white border-t-4 border-t-brand-gold border-x border-b border-[#c4c6cd]/50 rounded-xl p-6 flex flex-col justify-between hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 cursor-pointer group"
          >
            <div className="p-3 bg-brand-gold/10 w-fit rounded-lg">
              <Gavel className="w-6 h-6 text-brand-gold" />
            </div>
            <div>
              <h3 className="font-display text-xl font-bold text-brand-navy mb-1 group-hover:text-brand-gold transition-colors">
                Moot Court Competitions
              </h3>
              <p className="font-sans text-gray-500 text-xs md:text-sm">
                National advocacy challenges and regional legal track updates.
              </p>
            </div>
          </div>

          {/* Horizontal Card: Landmark Judgments */}
          <div 
            onClick={() => handleFeaturedClick('Judgment')}
            className="md:col-span-2 bg-white border border-[#c4c6cd]/50 rounded-xl p-6 md:p-8 flex items-center justify-between hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 cursor-pointer group"
          >
            <div className="flex-grow max-w-xl">
              <h3 className="font-display text-xl md:text-2xl font-bold text-brand-navy mb-2 group-hover:text-brand-gold transition-colors">
                Landmark Judgments
              </h3>
              <p className="font-sans text-gray-600 text-sm md:text-base leading-relaxed">
                In-depth technical analysis and citation briefs of state and federal supreme court rulings.
              </p>
            </div>
            <div className="p-4 bg-brand-surface-high/60 rounded-xl ml-4 flex-shrink-0 group-hover:bg-brand-gold/10 transition-colors">
              <BookOpen className="w-8 h-8 text-brand-navy-tint group-hover:text-brand-gold transition-colors" />
            </div>
          </div>

          {/* Card: Webinars */}
          <div 
            onClick={() => handleFeaturedClick('Webinar')}
            className="bg-brand-navy border border-brand-navy-light rounded-xl p-6 flex flex-col justify-center items-center text-center text-white hover:bg-brand-navy-light hover:shadow-xl transition-all duration-300 cursor-pointer group"
          >
            <div className="p-3.5 bg-brand-navy-light rounded-full mb-3 text-brand-gold">
              <Video className="w-6 h-6" />
            </div>
            <h3 className="font-display text-lg md:text-xl font-bold text-[#faf8f5] mb-1">
              Webinars
            </h3>
            <p className="font-sans text-gray-400 text-xs max-w-sm">
              Live broadcast sessions led by litigation firm partners.
            </p>
          </div>

        </div>
      </section>

      {/* 3. Custom AI Legal Assistant Teaser */}
      <section className="py-24 bg-brand-surface border-y border-brand-surface-highest/60 relative overflow-hidden">
        {/* Subtle geometric circles matching the brand */}
        <div className="absolute right-0 top-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-[1440px] mx-auto px-6 md:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Text column */}
          <div className="lg:col-span-7">
            <h2 className="font-display text-3xl md:text-[40px] font-bold text-brand-navy leading-tight mb-6">
              Custom AI Legal Assistant
            </h2>
            <p className="font-sans text-gray-600 text-base md:text-lg leading-relaxed mb-8">
              Experience the intersection of legacy jurisprudence and predictive cloud intelligence. Our server-side chatbot executes custom prompt chains, facilitating granular contract critique, swift case law retrieval, and case logic breakdowns with verified source citations.
            </p>
            
            <ul className="space-y-4 mb-10">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5.5 h-5.5 text-brand-gold flex-shrink-0 mt-0.5" />
                <span className="font-sans text-gray-700 text-sm md:text-base">
                  <strong>Specialty Mock Models:</strong> Tailored specifically to transactional, litigation, or regulatory paths.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5.5 h-5.5 text-brand-gold flex-shrink-0 mt-0.5" />
                <span className="font-sans text-gray-700 text-sm md:text-base">
                  <strong>Document Breakdown:</strong> Isolate critical liabilities and retrieve legal references.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5.5 h-5.5 text-brand-gold flex-shrink-0 mt-0.5" />
                <span className="font-sans text-gray-700 text-sm md:text-base">
                  <strong>Secure Architecture:</strong> Keys are proxied server-side to prevent telemetry leakage.
                </span>
              </li>
            </ul>
            
            <button 
              onClick={() => setActiveTab('assistant')}
              className="bg-brand-navy text-white font-semibold text-sm tracking-wider px-8 py-3.5 rounded hover:bg-brand-navy-light shadow-md transition-all active:scale-[0.98] cursor-pointer"
            >
              Discover AI Capabilities
            </button>
          </div>

          {/* Right Interface Teaser mock */}
          <div className="lg:col-span-5 relative h-[450px] bg-white rounded-xl border border-brand-surface-highest/60 shadow-xl overflow-hidden flex items-center justify-center group">
            
            {/* Background scales of justice */}
            <img 
              alt="Scales of Justice corporate minimalist background" 
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover opacity-90 mix-blend-luminosity filter saturate-50 group-hover:scale-[1.03] transition-transform duration-700" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBqSnoCKtr3MQWIUDCubGo1E58sNlqoPkz6f7t9AuINQvGFEjrvkKoUGkVmj4wfLcV6rAXn4OF293MuIm-lpPYjBNJ5YUlNYnx-zatDgmzb7QQk1DcZj-WEqMLIVDM-Bvg4P8CYo9FOYzGyfVLfycYpbwqmksrRgGYQfrrEn--QZPc5DEJjZr7P-1h0G-zh8Cv4gZOrKzUH3mW9kD9YNUeuPNL5DiiSt7DajXWTdWMaly6wNn20jT4wzqOOm4-hQ8Wqu7FLVqqduqI" 
            />
            
            <div className="absolute inset-0 bg-brand-navy/15 mix-blend-multiply" />
            
            {/* Interactive Prompt card */}
            <div 
              onClick={() => setActiveTab('assistant')}
              className="relative z-10 bg-white/95 backdrop-blur-md p-6 border border-brand-gold/30 rounded-xl shadow-2xl w-[85%] hover:border-brand-gold transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-center gap-3 mb-4 border-b border-brand-surface-highest pb-3">
                <span className="p-1 px-2 bg-brand-navy text-white rounded text-[10px] font-mono tracking-widest uppercase">AI</span>
                <span className="font-display font-bold text-sm text-brand-navy">Beyond The Bar Assistant</span>
              </div>
              
              <div className="space-y-3">
                <div className="h-4 bg-brand-surface-high/70 rounded w-5/6 animate-pulse" />
                <div className="h-4 bg-brand-surface-high/70 rounded w-3/4 animate-pulse delay-75" />
                <div className="h-4 bg-brand-surface-high/70 rounded w-11/12 animate-pulse delay-150" />
              </div>
              
              <div className="mt-5 pt-3.5 border-t border-brand-surface-highest/60 flex justify-between items-center text-xs">
                <span className="text-gray-400 font-mono text-[10px]">STATUS: AGENT_READY</span>
                <span className="text-brand-gold font-semibold inline-flex items-center gap-1">
                  Launch Console <ArrowRight className="w-3" />
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 4. Precision Drafting Services Scope */}
      <section className="py-24 max-w-[1440px] mx-auto px-6 md:px-16">
        <div className="text-center mb-16">
          <div className="w-16 h-1 bg-brand-gold mx-auto mb-4" />
          <h2 className="font-display text-3xl md:text-[38px] font-bold text-brand-navy mb-4">Precision Drafting Services</h2>
          <p className="font-sans text-gray-600 text-[17px] max-w-2xl mx-auto">
            Expert attorney consultation and freelance support for complex agreements, briefs, and filings, delivered with total accuracy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch max-w-5xl mx-auto">
          
          {/* Left card: Service Scope (takes 7 cols) */}
          <div className="md:col-span-7 bg-white border border-[#c4c6cd]/50 rounded-xl p-8 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="font-display text-2xl font-bold text-brand-navy mb-6">Service Scope</h3>
              <div className="space-y-5">
                
                <div className="flex items-center gap-4 py-1 border-b border-[#faf8f5]/10 pb-4">
                  <div className="p-2.5 bg-brand-surface-high/50 rounded text-brand-navy-tint">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-sans font-semibold text-brand-navy text-[15px]">Commercial Contracts &amp; NDAs</h4>
                    <p className="text-xs text-gray-500">Service blueprints, enterprise vendor SLA limits.</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 py-1 border-b border-[#faf8f5]/10 pb-4">
                  <div className="p-2.5 bg-brand-surface-high/50 rounded text-brand-navy-tint">
                    <Gavel className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-sans font-semibold text-brand-navy text-[15px]">Litigation Briefs &amp; Motions</h4>
                    <p className="text-xs text-gray-500">Summary dismissal pleadings, research briefs.</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 py-1">
                  <div className="p-2.5 bg-brand-surface-high/50 rounded text-brand-navy-tint">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-sans font-semibold text-brand-navy text-[15px]">Corporate Governance Docs</h4>
                    <p className="text-xs text-gray-500">Shareholder structure declarations, bylaws.</p>
                  </div>
                </div>

              </div>
            </div>
            
            <button 
              onClick={() => setActiveTab('drafting')}
              className="text-brand-navy text-sm font-semibold hover:text-brand-gold inline-flex items-center gap-1.5 mt-8 hover:underline"
            >
              View transactional pricing tiers <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Right card: Priority Delivery (takes 5 cols) */}
          <div className="md:col-span-5 bg-brand-navy text-white rounded-xl p-8 relative overflow-hidden shadow-lg flex flex-col justify-between">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
              <Gavel className="w-48 h-48 -mr-10 -mt-10" />
            </div>
            
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="font-display text-2xl font-bold text-[#faf8f5]">Priority Delivery</h3>
                  <p className="font-sans text-gray-400 text-xs mt-1">High-stakes custom deadlines</p>
                </div>
                <div className="p-2 bg-brand-navy-light rounded-lg border border-brand-gold/35 text-brand-gold">
                  <ShieldCheck className="w-5 h-5" />
                </div>
              </div>

              {/* Estimate capsule */}
              <div className="bg-brand-navy-light/60 border border-brand-navy-light rounded-xl p-5 mb-8">
                <span className="text-[10px] uppercase font-mono tracking-widest text-brand-gold block mb-1">
                  Average Response Tier
                </span>
                <span className="font-display text-4xl font-bold text-white block">
                  48 Hours
                </span>
                <span className="text-[11px] text-gray-400 mt-2 block font-sans">
                  *Standard single filings. Advanced motions subject to scope reviews.
                </span>
              </div>
            </div>

            <button 
              onClick={() => setActiveTab('drafting')}
              className="w-full bg-brand-gold hover:bg-brand-gold/90 text-white font-sans font-semibold text-sm tracking-wide py-4 rounded-md transition-colors shadow-md transform active:scale-[0.98] text-center cursor-pointer"
            >
              Get a Quote Now
            </button>
          </div>

        </div>
      </section>

    </div>
  );
}
