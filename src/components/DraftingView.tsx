import React, { useState, useEffect } from 'react';
import { FileText, Gavel, FileCheck, Mail, Check, ShieldCheck, Clock, Award, Briefcase } from 'lucide-react';
import { QuoteRequest } from '../types';

export default function DraftingView() {
  // Form state
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [docType, setDocType] = useState('');
  const [deadline, setDeadline] = useState('');
  const [description, setDescription] = useState('');

  // Submission response states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successModal, setSuccessModal] = useState<QuoteRequest | null>(null);
  const [previousQuotes, setPreviousQuotes] = useState<QuoteRequest[]>([]);

  // Select predefined tiers automatically filling document type
  const selectTier = (tierName: string, typePreset: string) => {
    setDocType(typePreset);
    setDescription(`Requesting custom drafting under the professional ${tierName} tier. Please outline specifications...`);
    const element = document.getElementById('quote-form-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Fetch previous quotes on mount
  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    try {
      const res = await fetch('/api/quotes');
      if (res.ok) {
        const data = await res.json();
        setPreviousQuotes(data);
      }
    } catch (err) {
      console.error("Error loading previous quotes:", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !docType || !description) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          email,
          documentType: docType,
          deadline,
          description
        })
      });

      if (response.ok) {
        const result: QuoteRequest = await response.json();
        setSuccessModal(result);
        
        // Reset inputs
        setFullName('');
        setEmail('');
        setDocType('');
        setDeadline('');
        setDescription('');
        
        // Refresh quotes list
        fetchQuotes();
      }
    } catch (err) {
      console.error("Error submitting quote:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="animate-fadeIn font-sans bg-[#fbf9f8] py-16">
      
      {/* 1. Page Header */}
      <div className="max-w-[1440px] px-6 md:px-16 mx-auto text-center mb-20">
        <h1 className="font-display text-4xl md:text-5xl lg:text-[54px] font-bold text-brand-navy tracking-tight leading-tight mb-6">
          Expert Legal Drafting, Delivered.
        </h1>
        <p className="font-sans text-lg text-gray-500 max-w-3xl mx-auto leading-relaxed">
          Precision-engineered docs and legal pleadings custom crafted for the modern legal professional. We bridge the structural breach between historic legal rigor and frictionless efficiency.
        </p>
      </div>

      {/* 2. Drafting Services Scope Grid */}
      <section className="max-w-[1440px] px-6 md:px-16 mx-auto mb-24">
        <h2 className="text-xs uppercase font-semibold text-brand-gold tracking-widest mb-8 border-b border-brand-surface-highest pb-2">
          Drafting Services
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Agreements */}
          <div className="bg-white border-t-4 border-t-brand-gold border-x border-b border-brand-surface-highest/60 rounded-xl p-6 hover:shadow-lg transition-all">
            <div className="p-3 bg-brand-gold/10 w-fit rounded-lg text-brand-gold mb-6">
              <FileCheck className="w-6 h-6" />
            </div>
            <h3 className="font-display text-xl font-bold text-brand-navy mb-2">Agreements</h3>
            <p className="font-sans text-gray-500 text-xs md:text-sm leading-relaxed">
              Comprehensive mutual contracts, service level NDAs, stock options, and settlement agreements designed for airtight clarity.
            </p>
          </div>

          {/* Card 2: Briefs */}
          <div className="bg-white border border-brand-surface-highest/60 rounded-xl p-6 hover:shadow-lg transition-all">
            <div className="p-3 bg-[#faf8f5] w-fit rounded-lg text-brand-navy-tint mb-6">
              <Gavel className="w-6 h-6" />
            </div>
            <h3 className="font-display text-xl font-bold text-brand-navy mb-2">Briefs</h3>
            <p className="font-sans text-gray-500 text-xs md:text-sm leading-relaxed">
              Persuasive supreme, federal-circuit, or local trial briefs engineered to present concise statutory defenses.
            </p>
          </div>

          {/* Card 3: Petitions */}
          <div className="bg-white border border-brand-surface-highest/60 rounded-xl p-6 hover:shadow-lg transition-all">
            <div className="p-3 bg-[#faf8f5] w-fit rounded-lg text-brand-navy-tint mb-6">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="font-display text-xl font-bold text-brand-navy mb-2">Petitions</h3>
            <p className="font-sans text-gray-500 text-xs md:text-sm leading-relaxed">
              Meticulously structured review pleadings or administrative petitions built for precise filings and compliance.
            </p>
          </div>

          {/* Card 4: Letters */}
          <div className="bg-white border border-brand-surface-highest/60 rounded-xl p-6 hover:shadow-lg transition-all">
            <div className="p-3 bg-[#faf8f5] w-fit rounded-lg text-brand-navy-tint mb-6">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="font-display text-xl font-bold text-brand-navy mb-2">Application Letters</h3>
            <p className="font-sans text-gray-500 text-xs md:text-sm leading-relaxed">
              Formal administrative requests, cover correspondences, and professional representations written to command immediate legal response.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Transparent Pricing Section */}
      <section className="bg-brand-surface border-y border-brand-surface-highest/60 py-24 mb-24">
        <div className="max-w-[1440px] px-6 md:px-16 mx-auto">
          <h2 className="text-xs uppercase font-semibold text-brand-gold tracking-widest text-center mb-2">
            Pricing Models
          </h2>
          <h3 className="font-display text-3xl font-bold text-brand-navy text-center mb-16">
            Transparent Pricing Structure
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
            {/* Standard: Starter */}
            <div className="bg-white border border-brand-surface-highest rounded-xl p-8 shadow-sm flex flex-col justify-between hover:border-brand-gold/30 transition-all">
              <div>
                <h4 className="font-display text-2xl font-bold text-brand-navy mb-2">Starter</h4>
                <p className="font-sans text-gray-400 text-sm mb-6">For routine, standard-form legal drafts.</p>
                
                <div className="flex items-baseline gap-1.5 mb-8 border-b border-brand-surface-highest pb-6">
                  <span className="text-4xl font-bold text-brand-navy font-display">$250</span>
                  <span className="text-gray-400 text-sm">/doc</span>
                </div>

                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3 text-sm text-gray-600">
                    <Check className="w-4 h-4 text-brand-gold" />
                    <span>Standard Boilerplate Agreements</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm text-gray-600">
                    <Check className="w-4 h-4 text-brand-gold" />
                    <span>3-Day Confirmed Delivery</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm text-gray-600">
                    <Check className="w-4 h-4 text-brand-gold" />
                    <span>1 Active Round of Revisions</span>
                  </li>
                </ul>
              </div>

              <button 
                onClick={() => selectTier('Starter', 'NDA / Professional Services SLA Contract')}
                className="w-full border border-brand-gold hover:bg-brand-gold/5 text-brand-gold font-semibold text-sm py-3.5 rounded transition-all tracking-wider uppercase cursor-pointer"
              >
                SELECT STARTER
              </button>
            </div>

            {/* Premium: Professional (Highlighted) */}
            <div className="bg-white border-2 border-brand-gold rounded-xl p-8 shadow-xl flex flex-col justify-between relative transform lg:-translate-y-2">
              <span className="absolute -top-3.5 right-6 bg-brand-gold text-white font-sans font-bold text-[10px] tracking-widest uppercase px-3 py-1 rounded">
                MOST POPULAR
              </span>
              
              <div>
                <h4 className="font-display text-2xl font-bold text-brand-navy mb-2">Professional</h4>
                <p className="font-sans text-gray-400 text-sm mb-6">For complex litigation briefs, custom clauses, or compliance.</p>
                
                <div className="flex items-baseline gap-1.5 mb-8 border-b border-[#faf8f5] pb-6">
                  <span className="text-4xl font-bold text-brand-navy font-display">$500</span>
                  <span className="text-gray-400 text-sm">/doc</span>
                </div>

                <ul className="space-y-4 mb-10">
                  <li className="flex items-center gap-3 text-sm text-gray-800 font-medium">
                    <Check className="w-4.5 h-4.5 text-brand-gold" />
                    <span>Briefs, Motions, Compliance &amp; Petitions</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm text-gray-800 font-medium">
                    <Check className="w-4.5 h-4.5 text-brand-gold" />
                    <span>48-Hour Priority Delivery</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm text-gray-800 font-medium">
                    <Check className="w-4.5 h-4.5 text-brand-gold" />
                    <span>Unlimited Active Revisions</span>
                  </li>
                </ul>
              </div>

              <button 
                onClick={() => selectTier('Professional', 'Civil litigation Appellate Brief / Motion to Dismiss')}
                className="w-full bg-brand-navy hover:bg-brand-navy-light text-white font-semibold text-sm py-4 rounded transition-all tracking-wider uppercase shadow-sm cursor-pointer"
              >
                SELECT PRO
              </button>
            </div>

            {/* Custom: Enterprise */}
            <div className="bg-white border border-brand-surface-highest rounded-xl p-8 shadow-sm flex flex-col justify-between hover:border-brand-gold/30 transition-all">
              <div>
                <h4 className="font-display text-2xl font-bold text-brand-navy mb-2">Enterprise</h4>
                <p className="font-sans text-gray-400 text-sm mb-6">High-volume transactional briefs for corporate counsel.</p>
                
                <div className="flex items-baseline gap-1.5 mb-8 border-b border-brand-surface-highest pb-6">
                  <span className="text-4xl font-bold text-brand-navy font-display">Custom</span>
                </div>

                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3 text-sm text-gray-600">
                    <Check className="w-4 h-4 text-brand-gold" />
                    <span>Dedicated Attorney Panel Assignments</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm text-gray-600">
                    <Check className="w-4 h-4 text-brand-gold" />
                    <span>Priority 24-Hour Express Queue</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm text-gray-600">
                    <Check className="w-4 h-4 text-brand-gold" />
                    <span>Active REST API Access Hooks</span>
                  </li>
                </ul>
              </div>

              <button 
                onClick={() => selectTier('Enterprise', 'Enterprise Volume SaaS / Strategic Corporate Counsel Master SLA')}
                className="w-full border border-brand-gold hover:bg-brand-gold/5 text-brand-gold font-semibold text-sm py-3.5 rounded transition-all tracking-wider uppercase cursor-pointer"
              >
                CONTACT US
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Request a Quote Form Section */}
      <section id="quote-form-section" className="max-w-[1440px] px-6 md:px-16 mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl font-bold text-brand-navy mb-2">Request a Quote</h2>
          <p className="font-sans text-sm md:text-base text-gray-500 max-w-xl mx-auto">
            Provide the details of your requested documentation below for an immediate precision scope validation and billing estimation.
          </p>
        </div>

        <div className="max-w-3xl mx-auto bg-white border border-brand-surface-highest p-8 md:p-12 rounded-xl shadow-md">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Full Name */}
              <div className="space-y-2">
                <label className="block text-xs uppercase font-semibold text-brand-navy tracking-wider font-sans">
                  FULL NAME
                </label>
                <input
                  type="text"
                  required
                  placeholder="Jane Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-[#fbf9f8] border border-brand-surface-highest/80 rounded px-4 py-3 placeholder-gray-400 focus:outline-none focus:border-brand-gold text-[15px]"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="block text-xs uppercase font-semibold text-brand-navy tracking-wider font-sans">
                  EMAIL ADDRESS
                </label>
                <input
                  type="email"
                  required
                  placeholder="jane@lawfirm.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#fbf9f8] border border-brand-surface-highest/80 rounded px-4 py-3 placeholder-gray-400 focus:outline-none focus:border-brand-gold text-[15px]"
                />
              </div>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Document Type Dropdown */}
              <div className="space-y-2">
                <label className="block text-xs uppercase font-semibold text-brand-navy tracking-wider font-sans2">
                  DOCUMENT TYPE
                </label>
                <select
                  required
                  value={docType}
                  onChange={(e) => setDocType(e.target.value)}
                  className="w-full bg-[#fbf9f8] border border-brand-surface-highest/80 rounded px-4 py-3.5 focus:outline-none focus:border-brand-gold text-[15px] cursor-pointer"
                >
                  <option value="" disabled>Select a category...</option>
                  <option value="Commercial Contract / NDA / Master Services Agreement">Commercial Contract / NDA / MSA</option>
                  <option value="Civil Court Trial Brief / Motion to Dismiss">Civil Court Trial Brief / Motion to Dismiss</option>
                  <option value="Administrative Review / Regional Petition">Administrative Review / Regional Petition</option>
                  <option value="Corporate Shareholders Agreement / Bylaws">Corporate Shareholders Agreement / Bylaws</option>
                  <option value="Formal Administrative Representation Cover Letter">Formal Administrative Review Letter</option>
                </select>
              </div>

              {/* Requested Deadline Date Picker */}
              <div className="space-y-2">
                <label className="block text-xs uppercase font-semibold text-brand-navy tracking-wider font-sans">
                  REQUESTED DEADLINE
                </label>
                <input
                  type="date"
                  required
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="w-full bg-[#fbf9f8] border border-brand-surface-highest/80 rounded px-4 py-3 text-gray-600 focus:outline-none focus:border-brand-gold text-[15px]"
                />
              </div>

            </div>

            {/* Requirements Description */}
            <div className="space-y-2">
              <label className="block text-xs uppercase font-semibold text-brand-navy tracking-wider font-sans">
                PROJECT DESCRIPTION
              </label>
              <textarea
                required
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Briefly describe the context, jurisdiction, and key requirements..."
                className="w-full bg-[#fbf9f8] border border-brand-surface-highest/80 rounded px-4 py-3 placeholder-gray-400 focus:outline-none focus:border-brand-gold text-[15px] resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-brand-navy hover:bg-[#1a2b3c] text-white font-semibold text-sm tracking-widest py-4.5 rounded uppercase transition-colors shadow-md cursor-pointer disabled:opacity-75 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Processing assessment...</span>
                </>
              ) : (
                'SUBMIT REQUEST'
              )}
            </button>

          </form>

          {/* Verification Badges Footnotes */}
          <div className="flex justify-center items-center gap-6 mt-10 pt-8 border-t border-brand-surface-highest/50">
            <div className="flex items-center gap-2 bg-[#eae8e7]/50 rounded-full px-4.5 py-2">
              <Award className="w-4 h-4 text-brand-navy-tint font-bold" />
              <span className="text-[11px] font-sans font-semibold text-gray-500 uppercase tracking-widest">
                CERTIFIED QUALITY
              </span>
            </div>
            <div className="flex items-center gap-2 bg-[#eae8e7]/50 rounded-full px-4.5 py-2">
              <Clock className="w-4 h-4 text-brand-navy-tint font-bold" />
              <span className="text-[11px] font-sans font-semibold text-gray-500 uppercase tracking-widest">
                ON-TIME DELIVERY
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Historical Quote Tracking Panel (Highly Functional) */}
      {previousQuotes.length > 0 && (
        <section className="max-w-[1440px] px-6 md:px-16 mx-auto mt-24">
          <h2 className="text-xs uppercase font-semibold text-brand-gold tracking-widest mb-6 border-b border-brand-surface-highest pb-2 flex items-center gap-2">
            <Briefcase className="w-4 h-4" />
            Your Private Active Briefs &amp; Drafts
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {previousQuotes.map((quote) => (
              <div key={quote.id} className="bg-white border border-brand-surface-highest/60 rounded-xl p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start gap-4 mb-4">
                    <span className="bg-[#eae8e7] text-brand-navy font-mono text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded">
                      {quote.id.substring(0, 9)}
                    </span>
                    <span className={`text-[11px] font-mono font-semibold uppercase px-2 py-1 rounded ${
                      quote.status === 'Pending Review' ? 'bg-amber-100 text-amber-800' :
                      quote.status === 'Analyzing Scope' ? 'bg-cyan-100 text-cyan-800' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {quote.status}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-brand-navy text-lg line-clamp-1 mb-1">
                    {quote.documentType}
                  </h3>
                  <p className="text-xs text-gray-400 mb-4 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> Requested for delivery by: {quote.deadline}
                  </p>

                  <p className="font-sans text-gray-500 text-xs leading-relaxed line-clamp-3 mb-6 bg-brand-[#faf8f5]/40 p-3 rounded border border-brand-surface-highest/30">
                    "{quote.description}"
                  </p>
                </div>

                <div className="border-t border-brand-surface-highest/40 pt-4 flex justify-between items-center bg-[#faf8f5]/20 -mx-6 -mb-6 p-6 rounded-b-xl">
                  <div>
                    <span className="text-[10px] text-gray-400 font-mono block uppercase">ESTIMATED VALUATION</span>
                    <span className="text-brand-gold font-display font-semibold text-lg">{quote.estimatedCost}</span>
                  </div>
                  <span className="text-xs font-semibold text-brand-navy hover:text-brand-gold cursor-pointer inline-flex items-center gap-1">
                    Upload credentials
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 6. High-End Transactional Receipt Confirmation Modal */}
      {successModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-brand-navy/60 backdrop-blur-sm flex justify-center items-center p-4">
          <div className="relative bg-white max-w-lg w-full rounded-xl border border-brand-gold/30 p-8 shadow-2xl animate-fadeIn">
            
            <div className="text-center space-y-3 mb-6">
              <div className="w-12 h-12 bg-brand-gold/10 text-brand-gold rounded-full flex items-center justify-center mx-auto">
                <ShieldCheck className="w-6 h-6 animate-pulse" />
              </div>
              <h3 className="font-display text-2xl font-bold text-brand-navy">
                Drafting Proposal Logged
              </h3>
              <p className="font-sans text-xs text-gray-400 uppercase tracking-widest font-mono">
                REGISTRATION ID: {successModal.id}
              </p>
            </div>

            <div className="bg-[#faf8f5] rounded-lg p-5 border border-brand-surface-highest/60 space-y-4 mb-6">
              <div className="flex justify-between text-sm py-1 border-b border-brand-surface-highest/50">
                <span className="text-gray-400 font-sans">Counsel Assignment</span>
                <span className="text-brand-navy font-semibold align-right">Beyond The Bar Senior Counsel</span>
              </div>
              <div className="flex justify-between text-sm py-1 border-b border-brand-surface-highest/50">
                <span className="text-gray-400 font-sans">Document Scope</span>
                <span className="text-brand-navy font-semibold max-w-xs truncate">{successModal.documentType}</span>
              </div>
              <div className="flex justify-between text-sm py-1 border-b border-brand-surface-highest/50">
                <span className="text-gray-400 font-sans">Target Deadline</span>
                <span className="text-brand-navy font-semibold">{successModal.deadline}</span>
              </div>
              <div className="flex justify-between text-sm pt-2">
                <span className="text-gray-500 font-sans uppercase font-bold text-xs tracking-wider">Estimated Fee</span>
                <span className="text-brand-gold font-display font-bold text-lg">{successModal.estimatedCost}</span>
              </div>
            </div>

            <p className="font-sans text-xs text-gray-500 leading-relaxed text-center mb-6">
              Our transactional triage lead has queued your request and is evaluating jurisdictional requisites. We will reach you at <span className="font-semibold text-brand-navy">{successModal.email}</span> with a definitive retainer contract.
            </p>

            <button
              onClick={() => setSuccessModal(null)}
              className="w-full bg-brand-navy hover:bg-brand-navy-light text-white font-semibold py-3 rounded transition-all text-sm tracking-wider cursor-pointer font-sans"
            >
              CONFIRM &amp; DISMISS
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
