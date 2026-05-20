import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, MessageSquare, Send, Copy, FileDown, Check, Scale, ShieldCheck, HelpCircle, GraduationCap } from 'lucide-react';
import { ChatMessage, LegalSpecialty } from '../types';
import { LEGAL_SPECIALTIES } from '../data';

export default function AssistantView() {
  // Specialties database
  const specialties = LEGAL_SPECIALTIES;
  const [selectedSpecialty, setSelectedSpecialty] = useState<LegalSpecialty>(specialties[0]);

  // Chat message logs state
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Scroll ref
  const scrollRef = useRef<HTMLDivElement>(null);

  // Load initial welcome message based on selected specialty
  useEffect(() => {
    setMessages([
      {
        id: 'welcome',
        role: 'model',
        content: `**Welcome to Beyond The Bar's AI Console.**\n\nI have initialized my weights under the **${selectedSpecialty.name}** directive.\n\n*How can I assist your workflows today? You can write any custom query or select one of the tailored presets below:*`,
        timestamp: new Date()
      }
    ]);
  }, [selectedSpecialty]);

  // Auto scroll messages to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim() || loading) return;

    // Append user message
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: textToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setLoading(true);

    try {
      // Build messages history payload
      const payloadMessages = [...messages, userMsg].map(m => ({
        role: m.role,
        content: m.content
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messages: payloadMessages,
          systemPrompt: selectedSpecialty.systemPrompt
        })
      });

      if (res.ok) {
        const data = await res.json();
        const modelMsg: ChatMessage = {
          id: `model-${Date.now()}`,
          role: 'model',
          content: data.content,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, modelMsg]);
      } else {
        const errData = await res.json();
        throw new Error(errData.error || "Failed execution");
      }
    } catch (err: any) {
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'model',
        content: `⚠️ **[Agent Connection Failure]**\n\nCould not secure communication with the Google Gemini API layer.\n\n*Error logs: ${err.message || 'Verification timed out.'}*\n\nPlease confirm your environment variables contains a valid \`GEMINI_API_KEY\` inside the Settings panel.`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, msgId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(msgId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const downloadTextFile = (text: string, title: string) => {
    const element = document.createElement("a");
    const file = new Blob([text], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${title.toLowerCase().replace(/[^a-z0-9]/g, '_')}_draft.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="animate-fadeIn font-sans bg-[#fbf9f8] py-16">
      
      {/* 1. Page Header */}
      <div className="max-w-[1440px] px-6 md:px-16 mx-auto text-center mb-16">
        <h1 className="font-display text-4xl md:text-5xl lg:text-[54px] font-bold text-brand-navy tracking-tight leading-tight mb-6 flex items-center justify-center gap-3">
          <Sparkles className="w-8 h-8 md:w-12 md:h-12 text-brand-gold animate-pulse" />
          Your Personal Legal Intelligence
        </h1>
        <p className="font-sans text-lg text-gray-500 max-w-3xl mx-auto leading-relaxed">
          A bespoke virtual practitioner assistant executing complex contract checks, judicial breakdown pipelines, and statutory summaries utilizing secure server-side proxy chains.
        </p>
      </div>

      {/* 2. Primary Workspace Grid */}
      <div className="max-w-[1440px] px-6 md:px-16 mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Side: Capabilities & Specialty selectors (takes 4 cols) */}
        <div className="lg:col-span-4 space-y-6 flex flex-col justify-between">
          <div className="space-y-6">
            
            {/* Persona Selector block */}
            <div className="bg-white border border-brand-surface-highest/60 p-6 rounded-xl shadow-sm">
              <h3 className="text-xs uppercase font-bold text-brand-gold tracking-widest mb-4 flex items-center gap-1.5">
                <Scale className="w-4 h-4" />
                Select Specialist Persona
              </h3>
              
              <div className="space-y-3">
                {specialties.map((spec) => {
                  const isSelected = selectedSpecialty.id === spec.id;
                  return (
                    <button
                      key={spec.id}
                      onClick={() => {
                        if (!loading) {
                          setSelectedSpecialty(spec);
                        }
                      }}
                      disabled={loading}
                      className={`w-full text-left p-4 rounded-lg border transition-all text-sm flex flex-col gap-1 cursor-pointer disabled:opacity-50 ${
                        isSelected 
                          ? 'border-brand-gold bg-brand-gold/5 shadow-sm' 
                          : 'border-brand-surface-highest hover:bg-brand-surface/40 hover:border-brand-navy-tint/40'
                      }`}
                    >
                      <span className="font-sans font-bold text-brand-navy text-[15px]">{spec.name}</span>
                      <span className="text-xs text-gray-500 font-sans leading-relaxed">{spec.description}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Precision Capabilities Info Card */}
            <div className="bg-brand-navy text-[#faf8f5] p-6 rounded-xl border border-brand-navy-light shadow-md">
              <h3 className="text-xs uppercase font-mono font-bold tracking-widest text-brand-gold mb-4">
                Precision Capabilities
              </h3>
              
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="text-brand-gold mt-1"><Scale className="w-4 h-4" /></div>
                  <div>
                    <h4 className="text-sm font-semibold">Deep Precedent Research</h4>
                    <p className="text-xs text-gray-400 leading-relaxed mt-0.5">Scrapes statutory codes, local rules of pleadings, and multi-layered historic court rulings.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="text-brand-gold mt-1"><GraduationCap className="w-4 h-4" /></div>
                  <div>
                    <h4 className="text-sm font-semibold">Boilerplate Translation</h4>
                    <p className="text-xs text-gray-400 leading-relaxed mt-0.5">Reformulates jargon contracts into clean, balanced readable corporate clauses.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="text-brand-gold mt-1"><ShieldCheck className="w-4 h-4" /></div>
                  <div>
                    <h4 className="text-sm font-semibold">Server-Sided Proxy Tunnel</h4>
                    <p className="text-xs text-gray-400 leading-relaxed mt-0.5">Guarantees client parameters remain entirely anonymous behind in-memory Express wrappers.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div className="text-xs text-gray-400 leading-relaxed hidden lg:block bg-[#faf8f5]/40 p-4 border border-brand-surface-highest/30 rounded-lg">
            * Disclaimer: AI console outcomes represent virtual pre-drafting mock simulations. Always validate final covenants and motions against current local practice codes.
          </div>
        </div>

        {/* Right Side: Immersive active messaging workspace (takes 8 cols) */}
        <div className="lg:col-span-8 bg-white border border-[#c4c6cd]/50 rounded-xl shadow-lg overflow-hidden flex flex-col justify-between min-h-[650px] lg:h-[720px]">
          
          {/* Header row */}
          <div className="bg-[#fcfbf9] px-6 py-4.5 border-b border-brand-surface-highest flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="p-1 px-2.5 bg-brand-navy text-white text-[10px] font-mono tracking-widest uppercase rounded">
                Console Active
              </span>
              <div className="flex flex-col">
                <span className="font-display font-bold text-sm text-brand-navy">{selectedSpecialty.name}</span>
                <span className="text-[10px] font-mono text-gray-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full inline-block animate-pulse" />
                  PERSISTENT_TUNNEL_ESTABLISHED
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                setMessages([
                  {
                    id: 'welcome',
                    role: 'model',
                    content: `**Welcome to Beyond The Bar's AI Console.**\n\nI have re-initialized my weights under the **${selectedSpecialty.name}** directive.\n\n*How can I assist your workflows today? You can write any custom query or select one of the tailored presets below:*`,
                    timestamp: new Date()
                  }
                ]);
              }}
              className="text-xs font-semibold text-gray-400 hover:text-brand-gold cursor-pointer"
            >
              Reset Session
            </button>
          </div>

          {/* Interactive prompt response messaging log */}
          <div 
            ref={scrollRef}
            className="flex-grow p-6 overflow-y-auto space-y-6 bg-[#fbfbfb]"
          >
            {messages.map((msg) => {
              const isUser = msg.role === 'user';
              return (
                <div 
                  key={msg.id} 
                  className={`flex ${isUser ? 'justify-end' : 'justify-start'} animate-fadeIn`}
                >
                  <div className={`max-w-[85%] rounded-lg p-5 border text-[14.5px] leading-relaxed relative ${
                    isUser 
                      ? 'bg-brand-navy text-white border-brand-navy shadow-sm' 
                      : 'bg-white text-gray-800 border-[#c4c6cd]/45 shadow-sm'
                  }`}>
                    
                    {/* Role header tagline */}
                    <div className="text-[10px] font-mono uppercase tracking-wider mb-2 flex items-center justify-between opacity-60">
                      <span>{isUser ? 'CLIENT REQUEST' : 'COUNSEL VERDICT'}</span>
                      <span>{msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>

                    {/* Styled text message block */}
                    <div className="whitespace-pre-line break-words font-sans selection:bg-brand-gold selection:text-white">
                      {msg.content}
                    </div>

                    {/* Actions panel underneath bots answers */}
                    {!isUser && msg.id !== 'welcome' && (
                      <div className="mt-4 pt-3 border-t border-brand-surface-highest/50 flex justify-end gap-3 text-xs">
                        <button
                          onClick={() => copyToClipboard(msg.content, msg.id)}
                          className="hover:text-brand-gold flex items-center gap-1 cursor-pointer transition-colors"
                        >
                          {copiedId === msg.id ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                              <span className="text-emerald-600 font-semibold font-sans">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span className="font-sans font-medium">Copy draft</span>
                            </>
                          )}
                        </button>
                        
                        <button
                          onClick={() => downloadTextFile(msg.content, selectedSpecialty.name)}
                          className="hover:text-brand-gold flex items-center gap-1 cursor-pointer transition-colors"
                        >
                          <FileDown className="w-3.5 h-3.5" />
                          <span className="font-sans font-medium">Export (.txt)</span>
                        </button>
                      </div>
                    )}

                  </div>
                </div>
              );
            })}

            {/* Waiting loader indicator */}
            {loading && (
              <div className="flex justify-start animate-pulse">
                <div className="bg-white text-gray-500 border border-brand-surface-highest/75 rounded-lg p-5 max-w-[80%] space-y-3">
                  <div className="text-[10px] font-mono uppercase tracking-wider opacity-60">
                    DRAFTING RESPONSE BASED ON STATUTORY PRECEDENT...
                  </div>
                  <div className="flex items-center gap-2 text-sm text-brand-gold font-medium font-sans">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-brand-gold rounded-full animate-bounce [animation-delay:-0.3s]" />
                      <div className="w-2 h-2 bg-brand-gold rounded-full animate-bounce [animation-delay:-0.15s]" />
                      <div className="w-2 h-2 bg-brand-gold rounded-full animate-bounce" />
                    </div>
                    <span>Formulating contract briefing logs...</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Interactive Preset Chips row */}
          <div className="px-6 py-3 bg-[#fcfbf9] border-t border-brand-surface-highest/60">
            <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-brand-gold block mb-2">
              Suggested Preset Statements:
            </span>
            <div className="flex flex-wrap gap-2">
              {selectedSpecialty.exampleQueries.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    if (!loading) {
                      setInputText(q);
                    }
                  }}
                  disabled={loading}
                  className="font-sans text-[11.5px] font-medium text-gray-600 bg-white border border-[#c4c6cd]/55 px-3.5 py-1.5 rounded-full hover:border-brand-gold hover:text-brand-gold transition-colors cursor-pointer text-left truncate max-w-full"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* User input console dock */}
          <div className="p-4 bg-white border-t border-brand-surface-highest">
            <div className="flex gap-2 bg-[#fbf9f8] border border-brand-surface-highest/80 rounded-lg p-1.5 focus-within:border-brand-gold transition-all">
              <input
                type="text"
                disabled={loading}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSend(inputText);
                }}
                placeholder={loading ? "Generating agent legal analysis..." : `Ask about any clauses, cases, or pre-trial tactics...`}
                className="flex-grow bg-transparent px-3 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none disabled:opacity-50"
              />
              
              <button
                onClick={() => handleSend(inputText)}
                disabled={!inputText.trim() || loading}
                className="bg-brand-navy hover:bg-[#1a2b3c] text-white p-2.5 px-4 rounded-md transition-colors flex items-center justify-center cursor-pointer disabled:opacity-40"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            
            <div className="text-[10px] text-gray-400 text-center mt-2 font-sans flex items-center justify-center gap-1">
              <HelpCircle className="w-3 h-3" />
              <span>AI-generated parameters represents reference metrics and requires dedicated professional overview.</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
