import React, { useState, useEffect } from 'react';
import { Search, Filter, PlusCircle, BookOpen, Globe, Gavel, Video, FileText, MapPin, Calendar, ArrowUpRight, HelpCircle, User, CheckCircle } from 'lucide-react';
import { Resource } from '../types';
import { INITIAL_RESOURCES } from '../data';

interface ResourceHubViewProps {
  initialCategoryFilter?: string;
  onClearFilter?: () => void;
}

export default function ResourceHubView({ initialCategoryFilter, onClearFilter }: ResourceHubViewProps) {
  // Resources state initialized from realistic data
  const [resources, setResources] = useState<Resource[]>(INITIAL_RESOURCES);

  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategoryFilter || 'All');
  const [locationTerm, setLocationTerm] = useState('');
  const [timelineFilter, setTimelineFilter] = useState('All');

  // Interactive interaction states
  const [activeBrief, setActiveBrief] = useState<Resource | null>(null);
  const [activeApplication, setActiveApplication] = useState<Resource | null>(null);
  const [applicantName, setApplicantName] = useState('');
  const [applicantUniversity, setApplicantUniversity] = useState('');
  const [applicationCompleted, setApplicationCompleted] = useState(false);

  // Contribution Form Modal State
  const [showContribute, setShowContribute] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newOrg, setNewOrg] = useState('');
  const [newCategory, setNewCategory] = useState<'Internship' | 'Competition' | 'Judgment' | 'MUN' | 'Webinar'>('Internship');
  const [newLoc, setNewLoc] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newDates, setNewDates] = useState('');
  const [newTags, setNewTags] = useState('');

  // Sorter direction state
  const [sortBy, setSortBy] = useState<'category' | 'latest'>('latest');

  // Synchronize category filter if modified from HomeView
  useEffect(() => {
    if (initialCategoryFilter) {
      setSelectedCategory(initialCategoryFilter);
    }
  }, [initialCategoryFilter]);

  // Handle resource contribution submission
  const handleContribute = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newOrg || !newDesc) return;

    const tagsArray = newTags 
      ? newTags.split(',').map(t => t.trim()) 
      : [newCategory, 'Community Added'];

    const addedResource: Resource = {
      id: `custom-${Date.now()}`,
      category: newCategory,
      title: newTitle,
      organization: newOrg,
      description: newDesc,
      dateRange: newDates || 'Rolling',
      deadline: '2026-12-31',
      location: newLoc || 'Virtual',
      linkText: newCategory === 'Judgment' ? 'READ BRIEF' : 'APPLY',
      tags: tagsArray,
      fullTextBrief: newCategory === 'Judgment' ? `### ${newTitle}\n\n**Court:** Community Added\n\n#### Summary\n${newDesc}` : undefined
    };

    setResources(prev => [addedResource, ...prev]);
    
    // Reset state
    setNewTitle('');
    setNewOrg('');
    setNewCategory('Internship');
    setNewLoc('');
    setNewDates('');
    setNewDesc('');
    setNewTags('');
    setShowContribute(false);
  };

  // Process simulated application
  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantName || !applicantUniversity) return;
    setApplicationCompleted(true);
  };

  // Category Selector tags properties mapping helper
  const getCategoryTheme = (category: string) => {
    switch(category) {
      case 'Internship':
        return { bg: 'bg-emerald-50 text-emerald-800 border-emerald-100', icon: MapPin };
      case 'Competition':
        return { bg: 'bg-amber-50 text-amber-800 border-amber-100', icon: Gavel };
      case 'Judgment':
        return { bg: 'bg-purple-50 text-purple-800 border-purple-100', icon: BookOpen };
      case 'MUN':
        return { bg: 'bg-indigo-50 text-indigo-800 border-indigo-100', icon: Globe };
      case 'Webinar':
        return { bg: 'bg-rose-50 text-rose-800 border-rose-100', icon: Video };
      default:
        return { bg: 'bg-gray-50 text-gray-800 border-gray-100', icon: FileText };
    }
  };

  // Filter logic compilation
  const filteredResources = resources.filter(res => {
    const matchesSearch = 
      res.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      res.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      res.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      res.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = selectedCategory === 'All' || res.category === selectedCategory;
    
    const matchesLocation = 
      locationTerm === '' || 
      res.location.toLowerCase().includes(locationTerm.toLowerCase());

    const matchesTimeline = timelineFilter === 'All' || 
      (timelineFilter === 'Featured' && res.featured) ||
      (timelineFilter === 'Rolling' && res.dateRange.toLowerCase().includes('rolling'));

    return matchesSearch && matchesCategory && matchesLocation && matchesTimeline;
  });

  // Sort logic compilation
  const sortedResources = [...filteredResources].sort((a, b) => {
    if (sortBy === 'category') {
      return a.category.localeCompare(b.category);
    }
    // Pull ID sequence as mock age priority
    return b.id.localeCompare(a.id);
  });

  const featuredItems = resources.filter(r => r.featured);

  return (
    <div className="animate-fadeIn font-sans bg-[#fbf9f8] py-16">
      
      {/* 1. Page Header */}
      <div className="max-w-[1440px] px-6 md:px-16 mx-auto mb-16 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-brand-navy tracking-tight mb-2">
            Resource Hub
          </h1>
          <p className="font-sans text-gray-500 text-sm md:text-base">
            Discover vetted internship placements, prestigious moot directories, and in-depth critical precedent analyses.
          </p>
        </div>

        <button
          onClick={() => setShowContribute(true)}
          className="bg-brand-navy hover:bg-[#1a2b3c] text-white font-semibold text-sm tracking-wide px-5 py-3 rounded flex items-center gap-2 shadow-sm transition-all cursor-pointer"
        >
          <PlusCircle className="w-4.5 h-4.5" />
          Contribute Opportunity
        </button>
      </div>

      {/* 2. Top-Tier Weekly Highlight Card Banner */}
      {selectedCategory === 'All' && searchTerm === '' && (
        <section className="max-w-[1440px] px-6 md:px-16 mx-auto mb-16">
          <h2 className="text-[11px] uppercase font-bold text-brand-gold tracking-widest mb-6">
            THIS WEEK'S HIGHLIGHTS
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredItems.map(item => {
              const theme = getCategoryTheme(item.category);
              return (
                <div 
                  key={item.id} 
                  className="bg-white border border-[#c4c6cd]/50 rounded-xl p-6.5 shadow-md flex justify-between gap-6 hover:shadow-xl transition-all relative overflow-hidden group"
                >
                  <div className="absolute top-0 right-0 h-1.5 w-24 bg-brand-gold" />
                  
                  <div className="flex-grow space-y-4">
                    <span className={`inline-block text-[10px] font-mono tracking-widest font-bold uppercase rounded-full border px-2.5 py-1 ${theme.bg}`}>
                      {item.category}
                    </span>
                    
                    <div className="space-y-1">
                      <h3 className="font-display text-lg md:text-xl font-bold text-brand-navy group-hover:text-brand-gold transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs font-semibold text-gray-400 font-sans">{item.organization}</p>
                    </div>

                    <p className="font-sans text-gray-500 text-xs md:text-sm line-clamp-2 leading-relaxed">
                      "{item.description}"
                    </p>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {item.tags.map(tag => (
                        <span key={tag} className="text-[10px] bg-brand-surface text-gray-400 px-2 py-0.5 rounded border border-brand-surface-highest/40 font-mono">
                          #{tag.toUpperCase()}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col justify-between items-end flex-shrink-0 min-w-[100px]">
                    <div className="text-right space-y-0.5 text-xs text-gray-400">
                      <span className="block font-mono text-[9px] uppercase tracking-wider">DEADLINE</span>
                      <span className="block font-semibold text-brand-navy whitespace-nowrap">{item.dateRange}</span>
                    </div>

                    <button
                      onClick={() => {
                        if (item.category === 'Judgment') {
                          setActiveBrief(item);
                        } else {
                          setActiveApplication(item);
                        }
                      }}
                      className="bg-brand-navy hover:bg-brand-navy-light text-white font-semibold text-xs tracking-wider px-4 py-2.5 rounded transition-all flex items-center gap-1 cursor-pointer w-full text-center justify-center shadow-sm uppercase"
                    >
                      <span>{item.category === 'Judgment' ? 'BRiEF' : 'REGISTER'}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* 3. Main Catalog Layout */}
      <div className="max-w-[1440px] px-6 md:px-16 mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Hand: Search & Filter widgets (takes 4 cols) */}
        <aside className="lg:col-span-4 bg-white border border-brand-surface-highest/60 p-6 rounded-xl shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-brand-surface-highest pb-3">
            <h3 className="font-display font-bold text-brand-navy text-[17px] flex items-center gap-2">
              <Filter className="w-5 h-5 text-brand-gold" />
              Filter Catalog
            </h3>
            
            {(searchTerm || selectedCategory !== 'All' || locationTerm || timelineFilter !== 'All') && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                  setLocationTerm('');
                  setTimelineFilter('All');
                  if (onClearFilter) onClearFilter();
                }}
                className="text-[11px] font-sans font-bold text-brand-gold hover:underline cursor-pointer"
              >
                Clear all
              </button>
            )}
          </div>

          {/* Search Term Input */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-brand-navy font-sans tracking-wide">
              SEARCH DIRECTORY
            </label>
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
              <input
                type="text"
                placeholder="Title, jurisdiction, keyword..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-brand-surface border border-brand-surface-highest rounded px-4 pl-10 py-2.5 text-sm placeholder-gray-400 focus:outline-none focus:border-brand-gold"
              />
            </div>
          </div>

          {/* Categories Selector list */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-brand-navy font-sans tracking-wide">
              CATEGORY PATH
            </label>
            <div className="flex flex-col gap-1.5">
              {['All', 'Internship', 'Competition', 'Judgment', 'MUN', 'Webinar'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`w-full text-left px-3.5 py-2 rounded text-sm font-sans flex items-center justify-between transition-colors cursor-pointer ${
                    selectedCategory === cat 
                      ? 'bg-brand-navy text-[#faf8f5] font-semibold' 
                      : 'hover:bg-[#faf8f5] text-gray-600'
                  }`}
                >
                  <span>{cat === 'All' ? 'All Currencies' : cat}</span>
                  {selectedCategory === cat && <span className="w-1.5 h-1.5 bg-brand-gold rounded-full" />}
                </button>
              ))}
            </div>
          </div>

          {/* Location lookup filter */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-brand-navy font-sans tracking-wide">
              LOCATION JURISDICTION
            </label>
            <div className="relative">
              <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
              <input
                type="text"
                placeholder="e.g. Delhi, London, Virtual..."
                value={locationTerm}
                onChange={(e) => setLocationTerm(e.target.value)}
                className="w-full bg-brand-surface border border-brand-surface-highest rounded px-4 pl-10 py-2.5 text-sm placeholder-gray-400 focus:outline-none focus:border-brand-gold"
              />
            </div>
          </div>

          {/* Timeline Dropdown */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-brand-navy font-sans tracking-wide">
              TIMELINE DURATION
            </label>
            <select
              value={timelineFilter}
              onChange={(e) => setTimelineFilter(e.target.value)}
              className="w-full bg-brand-surface border border-brand-surface-highest rounded px-3.5 py-2.5 text-sm text-gray-600 focus:outline-none focus:border-brand-gold cursor-pointer"
            >
              <option value="All">All Cycles</option>
              <option value="Featured">Vetted Highlights Only</option>
              <option value="Rolling">Rolling Admissions Only</option>
            </select>
          </div>
        </aside>

        {/* Right Hand: Core Directory catalog cards list (takes 8 cols) */}
        <main className="lg:col-span-8 space-y-6">
          
          {/* Sorting panel row */}
          <div className="flex justify-between items-center bg-[#f7f6f4]/60 border border-brand-surface-highest/50 rounded-lg px-5 py-3 h-14">
            <span className="text-xs text-gray-400 font-sans">
              Showing <span className="text-brand-navy font-bold">{sortedResources.length}</span> outcomes
            </span>

            <div className="flex items-center gap-4 text-xs font-sans">
              <span className="text-gray-400">Sort:</span>
              <button
                onClick={() => setSortBy('latest')}
                className={`font-semibold cursor-pointer ${sortBy === 'latest' ? 'text-brand-gold underline' : 'text-gray-600'}`}
              >
                Latest
              </button>
              <button
                onClick={() => setSortBy('category')}
                className={`font-semibold cursor-pointer ${sortBy === 'category' ? 'text-brand-gold underline' : 'text-gray-600'}`}
              >
                Category
              </button>
            </div>
          </div>

          {/* Directory lists */}
          {sortedResources.length === 0 ? (
            <div className="bg-white border border-[#c4c6cd]/40 rounded-xl p-16 text-center space-y-4">
              <Calendar className="w-12 h-12 text-gray-300 mx-auto" />
              <h3 className="font-display font-bold text-lg text-brand-navy">No Matches Logged</h3>
              <p className="font-sans text-gray-500 text-sm max-w-sm mx-auto">
                No active opportunities met your targeted filter values. Add your custom opportunity to share with the platform.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                  setLocationTerm('');
                  setTimelineFilter('All');
                }}
                className="text-xs font-semibold text-brand-gold hover:underline"
              >
                Reset Search Filters
              </button>
            </div>
          ) : (
            <div className="space-y-4 animate-fadeIn">
              {sortedResources.map((res) => {
                const theme = getCategoryTheme(res.category);
                const Icon = theme.icon;
                return (
                  <div 
                    key={res.id} 
                    className="bg-white border border-[#c4c6cd]/45 rounded-xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-md hover:border-brand-gold/25 transition-all"
                  >
                    {/* Left details */}
                    <div className="flex-grow space-y-3 max-w-xl">
                      
                      {/* Top tags row */}
                      <div className="flex items-center gap-2.5">
                        <span className={`inline-flex items-center gap-1.5 border text-[10px] font-mono tracking-widest font-bold uppercase rounded px-2.5 py-0.5 ${theme.bg}`}>
                          <Icon className="w-3 h-3" />
                          {res.category}
                        </span>
                        {res.citation && (
                          <span className="text-[10px] font-mono bg-brand-surface text-brand-gold font-bold border border-brand-gold/15 px-2.5 py-0.5 rounded">
                            {res.citation}
                          </span>
                        )}
                      </div>

                      {/* Opportunity description */}
                      <div className="space-y-1">
                        <h3 className="font-display font-bold text-lg text-brand-navy leading-snug">
                          {res.title}
                        </h3>
                        <p className="text-[11.5px] text-gray-400 font-sans font-medium">
                          {res.organization}
                        </p>
                      </div>

                      <p className="font-sans text-xs text-gray-500 leading-relaxed">
                        {res.description}
                      </p>

                      {/* Specs pills row */}
                      <div className="flex flex-wrap items-center gap-y-2 gap-x-4 pt-1.5">
                        <div className="text-[11px] text-gray-400 font-sans flex items-center gap-1 font-medium bg-[#faf8f5]/40 border border-brand-surface-highest/30 px-2 py-0.5 rounded">
                          <MapPin className="w-3 h-3 text-brand-navy-tint font-bold" />
                          {res.location}
                        </div>
                        <div className="text-[11px] text-gray-400 font-sans flex items-center gap-1 font-medium bg-[#faf8f5]/40 border border-brand-surface-highest/30 px-2 py-0.5 rounded">
                          <Calendar className="w-3 h-3 text-brand-navy-tint font-bold" />
                          {res.dateRange}
                        </div>
                      </div>

                    </div>

                    {/* Action Panel */}
                    <div className="flex md:flex-col justify-end md:items-end flex-shrink-0 min-w-[120px] gap-2 md:gap-4 border-t md:border-0 border-brand-surface-highest pt-4 md:pt-0">
                      
                      <button
                        onClick={() => {
                          if (res.category === 'Judgment') {
                            setActiveBrief(res);
                          } else {
                            setActiveApplication(res);
                          }
                        }}
                        className="bg-brand-navy hover:bg-[#1a2b3c] text-[#faf8f5] font-sans font-semibold text-xs tracking-wider px-5 py-3 rounded transition-colors w-full text-center shadow-xs uppercase cursor-pointer"
                      >
                        {res.category === 'Judgment' ? 'BRiEF' : 'APPLY'}
                      </button>

                    </div>

                  </div>
                );
              })}
            </div>
          )}

        </main>

      </div>

      {/* 4. High-End Landmark Brief Detail Side-Drawer / Modal */}
      {activeBrief && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-brand-navy/60 backdrop-blur-sm flex justify-center items-center p-4">
          <div className="relative bg-white max-w-2xl w-full rounded-xl border border-brand-gold/30 shadow-2xl animate-fadeIn p-6.5 md:p-10 font-sans max-h-[90vh] overflow-y-auto">
            
            {/* Header parchment alignment */}
            <div className="border-b-2 border-brand-gold/30 pb-5 mb-6.5">
              <span className="text-[10px] font-mono tracking-widest font-bold text-brand-gold bg-brand-gold/10 px-2.5 py-1 rounded inline-block mb-3 uppercase">
                Supreme Court precedent - {activeBrief.citation}
              </span>
              <h3 className="font-display font-bold text-2xl md:text-3xl text-brand-navy leading-snug">
                {activeBrief.title}
              </h3>
              <p className="text-xs text-gray-400 mt-1 font-semibold">{activeBrief.organization}</p>
            </div>

            {/* Structured legal brief markdown */}
            <div className="prose prose-sm prose-[#041627] max-w-none text-gray-700 leading-relaxed font-sans scroll-y text-sm space-y-6">
              
              {activeBrief.fullTextBrief ? (
                <div className="whitespace-pre-line bg-brand-surface p-5 border border-brand-surface-highest/60 rounded-xl font-sans text-gray-800 shadow-inner">
                  {activeBrief.fullTextBrief}
                </div>
              ) : (
                <div className="space-y-4">
                  <p><strong>Citations:</strong> {activeBrief.citation || 'Unpublished'}</p>
                  <p><strong>Decided Venue:</strong> {activeBrief.location}</p>
                  <p><strong>Key Issues:</strong> Whether procedural limitations of terms of service frameworks restrict subsequent consumer statutory protections.</p>
                  <p><strong>Detailed Holding:</strong> In validating individual consumer safety laws, standard digital click forms cannot blanket-monetize or restrict state tracking parameters where explicit opt-in components are absent.</p>
                </div>
              )}

            </div>

            {/* Footer action */}
            <div className="mt-8 pt-5 border-t border-brand-surface-highest/60 flex justify-between items-center">
              <span className="text-xs text-gray-400 font-mono">STATUS: DECIDED_PRECEDENT</span>
              <button
                onClick={() => setActiveBrief(null)}
                className="bg-brand-navy hover:bg-brand-navy-light text-white font-semibold text-xs tracking-wider px-6 py-3 rounded cursor-pointer font-sans"
              >
                DISMISS BRIEF
              </button>
            </div>

          </div>
        </div>
      )}

      {/* 5. Submitting Application / Registrations Step-Flow Dialog modal */}
      {activeApplication && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-brand-navy/60 backdrop-blur-sm flex justify-center items-center p-4">
          <div className="relative bg-white max-w-md w-full rounded-xl border border-brand-navy-light p-8 shadow-2xl animate-fadeIn">
            
            {applicationCompleted ? (
              <div className="text-center space-y-4 py-4 animate-fadeIn">
                <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex justify-center items-center mx-auto border border-emerald-100">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="font-display text-2xl font-bold text-brand-navy">Registration Confirmed</h3>
                <p className="font-sans text-gray-500 text-xs md:text-sm">
                  Congratulations <span className="font-semibold text-brand-navy">{applicantName}</span>, your credentials for <strong>"{activeApplication.title}"</strong> have been submitted.
                </p>
                
                <div className="p-4 bg-brand-surface rounded border border-brand-surface-highest/60 font-mono text-[11px] text-gray-400">
                  ASSESSMENT ID: {activeApplication.category.toUpperCase()}-{Date.now().toString().substring(7)}
                </div>

                <p className="text-xs text-gray-400">
                  Vetted placement notifications will be dispatched to your institution email index.
                </p>

                <button
                  onClick={() => {
                    setActiveApplication(null);
                    setApplicantName('');
                    setApplicantUniversity('');
                    setApplicationCompleted(false);
                  }}
                  className="w-full bg-brand-navy hover:bg-brand-navy-light text-white font-semibold py-3.5 rounded text-sm transition-colors cursor-pointer"
                >
                  DISMISS
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-widest font-bold text-brand-gold bg-brand-gold/10 px-2.5 py-0.5 rounded">
                    Registration Portal
                  </span>
                  <h3 className="font-display font-bold text-2xl text-brand-navy mt-2 leading-tight">
                    {activeApplication.title}
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">{activeApplication.organization}</p>
                </div>

                <form onSubmit={handleApplySubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label className="block text-[11px] font-bold text-brand-navy uppercase tracking-wider font-sans">
                      Applicant Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                      className="w-full bg-brand-surface border border-brand-surface-highest/80 rounded px-4 py-2.5 text-sm focus:outline-none focus:border-brand-gold"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-[11px] font-bold text-brand-navy uppercase tracking-wider font-sans">
                      University Affiliation / Law School Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Yale Law, NLS-Delhi, Oxford..."
                      value={applicantUniversity}
                      onChange={(e) => setApplicantUniversity(e.target.value)}
                      className="w-full bg-brand-surface border border-brand-surface-highest/80 rounded px-4 py-2.5 text-sm focus:outline-none focus:border-brand-gold"
                    />
                  </div>

                  <div className="bg-[#faf8f5] p-3 rounded text-[11px] text-gray-400 leading-relaxed font-sans flex gap-2">
                    <HelpCircle className="w-4 h-4 text-brand-gold flex-shrink-0" />
                    <span>This simulation processes credential verification against public lists automatically.</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setActiveApplication(null)}
                      className="w-full border border-[#c4c6cd]/55 font-semibold py-3 rounded text-xs text-gray-600 transition-colors cursor-pointer text-center"
                    >
                      CANCEL
                    </button>
                    <button
                      type="submit"
                      className="w-full bg-brand-navy hover:bg-[#1a2b3c] text-white font-semibold py-3 rounded text-xs transition-colors cursor-pointer text-center"
                    >
                      REGISTER TEAM
                    </button>
                  </div>
                </form>
              </div>
            )}
            
          </div>
        </div>
      )}

      {/* 6. Contribute Opportunity Modal popup */}
      {showContribute && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-brand-navy/60 backdrop-blur-sm flex justify-center items-center p-4">
          <div className="relative bg-white max-w-lg w-full rounded-xl border border-brand-gold/30 p-8 shadow-2xl animate-fadeIn max-h-[90vh] overflow-y-auto">
            
            <div className="mb-6">
              <h3 className="font-display font-bold text-2xl text-brand-navy">
                Contribute an Opportunity
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                Expand Beyond The Bar directory by sharing verified internships, moot court notices, or regulatory forums.
              </p>
            </div>

            <form onSubmit={handleContribute} className="space-y-4">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Opportunity name */}
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold text-brand-navy uppercase tracking-wider font-sans">
                    Title Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Winter Clerkship"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full bg-brand-surface border border-brand-surface-highest rounded px-3 py-2 text-xs focus:outline-none focus:border-brand-gold"
                  />
                </div>

                {/* Organization name */}
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold text-brand-navy uppercase tracking-wider font-sans">
                    Organization
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Chambers of Senior Advocate"
                    value={newOrg}
                    onChange={(e) => setNewOrg(e.target.value)}
                    className="w-full bg-brand-surface border border-brand-surface-highest rounded px-3 py-2 text-xs focus:outline-none focus:border-brand-gold"
                  />
                </div>

              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Category Option */}
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold text-brand-navy uppercase tracking-wider font-sans">
                    Opportunity Category
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full bg-brand-surface border border-brand-surface-highest rounded px-3 py-2 text-xs focus:outline-none focus:border-brand-gold cursor-pointer"
                  >
                    <option value="Internship">Internship/Job placement</option>
                    <option value="Competition">Moot Court competition</option>
                    <option value="Judgment">Landmark judicial breakdown</option>
                    <option value="MUN">Model United Nations (MUN)</option>
                    <option value="Webinar">Technical legal webinar</option>
                  </select>
                </div>

                {/* Location Option */}
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold text-brand-navy uppercase tracking-wider font-sans">
                    Location / Office Coordinates
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Virtual, Geneva, Brussels"
                    value={newLoc}
                    onChange={(e) => setNewLoc(e.target.value)}
                    className="w-full bg-brand-surface border border-brand-surface-highest rounded px-3 py-2 text-xs focus:outline-none focus:border-brand-gold"
                  />
                </div>

              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Date / timeframe limits */}
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold text-brand-navy uppercase tracking-wider font-sans">
                    Filing Deadlines / Event timeframe
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Nov 20 - Nov 22"
                    value={newDates}
                    onChange={(e) => setNewDates(e.target.value)}
                    className="w-full bg-brand-surface border border-[#c4c6cd]/55 rounded px-3 py-2 text-xs focus:outline-none focus:border-brand-gold"
                  />
                </div>

                {/* Tags sequence */}
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold text-brand-navy uppercase tracking-wider font-sans">
                    Filter Tags (comma list)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Privacy, Contracts, Corporate"
                    value={newTags}
                    onChange={(e) => setNewTags(e.target.value)}
                    className="w-full bg-brand-surface border border-[#c4c6cd]/55 rounded px-3 py-2 text-xs focus:outline-none focus:border-brand-gold"
                  />
                </div>

              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold text-brand-navy uppercase tracking-wider font-sans">
                  Syllabus Context / Detailed Description
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Outline key briefs or required profiles..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full bg-brand-surface border border-brand-surface-highest rounded px-3 py-2 text-xs focus:outline-none focus:border-brand-gold resize-none"
                />
              </div>

              {/* CTA row */}
              <div className="grid grid-cols-2 gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowContribute(false)}
                  className="w-full border border-gray-300 font-semibold py-3 rounded text-xs text-gray-500 cursor-pointer"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="w-full bg-brand-navy hover:bg-[#1a2b3c] text-white font-semibold py-3 rounded text-xs transition-colors cursor-pointer"
                >
                  SHARE OPPORTUNITY
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
