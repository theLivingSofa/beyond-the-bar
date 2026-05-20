import { Resource, LegalSpecialty } from './types';

export const INITIAL_RESOURCES: Resource[] = [
  {
    id: 'res-1',
    category: 'Internship',
    title: 'Supreme Court Clerkship Application',
    organization: 'Supreme Court of India (Chamber of Justice A.K. Sharma)',
    description: "Applications are now open for the prestigious Winter clerkship under Justice A.K. Sharma. Experience high-stakes constitutional litigation and assist in researching high-stakes judgments.",
    dateRange: 'Oct 15 - Dec 15',
    deadline: '2026-09-30',
    location: 'New Delhi, India',
    linkText: 'APPLY',
    tags: ['Constitutional Law', 'Clerkship', 'Research'],
    featured: true
  },
  {
    id: 'res-2',
    category: 'Competition',
    title: 'International Commercial Arbitration Moot',
    organization: 'London Court of International Arbitration (LCIA) & King’s College',
    description: "Register your university team for the annual ICAM. This year's problem focuses on cross-border intellectual property disputes, force majeure clauses in supply chain interruptions, and the enforcement of arbitral awards in multi-jurisdictional frameworks.",
    dateRange: 'Nov 20 - Nov 22',
    deadline: '2026-10-15',
    location: 'Virtual / London, UK',
    linkText: 'REGISTER',
    tags: ['Arbitration', 'International Law', 'IP Disputes'],
    featured: true
  },
  {
    id: 'res-3',
    category: 'Judgment',
    title: 'Smith v. TechCorp: Data Privacy Implications',
    organization: 'Supreme Court (Civil Division)',
    citation: '2026 SCC 492',
    description: 'A landmark ruling on user consent frameworks within standard terms of service agreements. Establishes the requirement of granular, opt-in consent for telemetry data collection and invalidates broad liability waivers. Essential reading for corporate counsel.',
    dateRange: 'Added Today',
    deadline: 'Published',
    location: 'National Jurisdiction',
    linkText: 'READ BRIEF',
    tags: ['Privacy Law', 'Tech Regulation', 'Corporate Counsel'],
    fullTextBrief: `### Smith v. TechCorp (2026 SCC 492)
**Court:** Supreme Court, Civil Division
**Decided:** May 14, 2026
**Judges:** Hon. Chief Justice Morrison, Justice Patel, Justice Lindqvist

#### Executive Summary
In a 7-2 decision, the Supreme Court ruled that TechCorp's standard "click-wrap" Terms of Service failed to secure valid legal consent for secondary telemetry data harvesting under modern privacy principles. The judgment marks a monumental shift toward strict consent granularity.

#### Core Issues
1. Whether a single "I Accept" checkbox is legally sufficient to execute consent for both core service agreements and third-party data broker monetization.
2. The validity of "future-proofing" arbitration clauses that mandate private triage of constitutional privacy issues.

#### Court Holding
The Court held that **broad, omnibus assent forms are inherently invalid for multi-layered service features**. Telemetry data and marketing profiling require distinct, opt-in granular checkpoints. Furthermore, arbitration clauses cannot act as active shields against state statutory rights enforcement.

#### Key Takeaways for Corporate Counsel:
* **Consent Decoupling:** Re-compile your sign-up screens immediately. Do not bundle privacy consent with standard license acceptances.
* **Proactive Transparency:** Companies must display simplified, real-time alerts when transferring processing queues in the background.
* **Waiver Invalidity:** Generic "hold harmless" clauses for future algorithmic bias are legally unenforceable.`
  },
  {
    id: 'res-4',
    category: 'MUN',
    title: 'Global Policy Model UN 2024',
    organization: 'Geneva Institute of International Studies',
    description: 'Delegates will debate international climate accords, cyber-warfare rules of engagement, and global compliance enforcement mechanisms. Hosted by the Geneva Institute.',
    dateRange: 'Nov 05 - 07',
    deadline: '2026-09-01',
    location: 'Geneva, Switzerland',
    linkText: 'DETAILS',
    tags: ['Public Policy', 'Diplomacy', 'Enforcement'],
  },
  {
    id: 'res-5',
    category: 'Internship',
    title: 'Corporate M&A Legal Intern - Vance & Partners',
    organization: 'Vance & Partners LLP',
    description: 'Assist senior partners with due diligence, drafting ancillary agreements, and conducting extensive legal research for mid-market technology acquisitions.',
    dateRange: 'Rolling',
    deadline: '2026-08-01',
    location: 'New York, NY',
    linkText: 'APPLY',
    tags: ['M&A', 'Corporate Law', 'Tech Acquisitions'],
  },
  {
    id: 'res-6',
    category: 'Webinar',
    title: 'Navigating Algorithmic Liability in Fintech Contracts',
    organization: 'Financial Law Institute',
    description: 'A focused deep-dive session with risk compliance attorneys discussing boilerplate structures, credit decision liability shifts, and state statutory boundaries.',
    dateRange: 'May 28, 2026',
    location: 'Virtual Broadcast',
    linkText: 'SECURE SEAT',
    tags: ['Fintech', 'Risk Management', 'Contracts']
  },
  {
    id: 'res-7',
    category: 'Judgment',
    title: 'In re SmartContract Protocol Standard',
    organization: 'Chancery Court of Delaware',
    citation: 'Del. Ch. App. 1024',
    description: 'A precedent-setting ruling determining that automated software protocols and self-executing smart contracts satisfy the Statute of Frauds when clear cryptographic parameters are authenticated.',
    dateRange: 'May 10, 2026',
    location: 'Delaware, USA',
    linkText: 'READ BRIEF',
    tags: ['Smart Contracts', 'Web3', 'Statute of Frauds'],
    fullTextBrief: `### In re SmartContract Protocol Standard (Del. Ch. App. 1024)
**Court:** Delaware Chancery Court
**Decided:** May 10, 2026
**Judges:** Chancellor Bouchard, Vice Chancellor Laster

#### Executive Summary
The Chancery Court ruled that smart contracts executing automatically via distributed state machines constitute written instruments sufficient to satisfy Delaware's Statute of Frauds, provided cryptographic metadata shows concurrent mutual assent.

#### Core Issues
Do deterministic blockchain transactions qualify as formal "written records" where no human-readable terms exist at Execution?

#### Ruling Details
The Court held that **cryptographic protocols which encode business terms represent computer-readable declarations of intent**. By deploying a verified bytecode address, parties authorize automated execution, satisfying signatures requirements.`
  }
];

export const LEGAL_SPECIALTIES: LegalSpecialty[] = [
  {
    id: 'corp',
    name: 'Corporate & Tech Transactional Counsel',
    description: 'Specializes in venture term sheets, SaaS licensing, strict NDAs, and corporate governance compliance.',
    systemPrompt: 'You are Beyond The Bar’s premier AI Corporate & Transactional Counsel. You assist law firms and startups by summarizing corporate governance, refining contract language, drafting mutual non-disclosure clauses, and evaluating venture capital structure term sheets. Align strictly with standard tech industry legal standards (like NVCA term sheets) and Delaware Chancery principles.',
    exampleQueries: [
      'Draft a standard mutual NDA clause for a SaaS startup with 12 months limitation.',
      'What are the key terms in a typical Series A VC term sheet regarding liquidation preferences?',
      'Suggest improvements to a boilerplate limitation of liability clause to make it more investor-favorable.'
    ]
  },
  {
    id: 'litigation',
    name: 'Litigation Brief & Motion Specialist',
    description: 'Focused on legal research, pre-trial motions, brief summaries, and building counter-arguments using case precedents.',
    systemPrompt: 'You are Beyond The Bar’s senior Litigation Specialist. Your focus is analyzing mock complaints, drafting legal analysis for pre-trial motions (like summary judgment and motions to dismiss), and evaluating constitutional or civil law citations. Format responses clearly, offering procedural analysis and citing relevant federal or regional precedents.',
    exampleQueries: [
      'Draft a motion to dismiss structure for a breach of contract suit based on lack of personal jurisdiction.',
      'Generate a list of case law precedents regarding what constitutes an implied-in-fact contract.',
      'Write a counter-argument to a plaintiff claiming promissory estoppel in a vendor supply dispute.'
    ]
  },
  {
    id: 'research',
    name: 'Constitutional & Landmark Case Scholar',
    description: 'Deep analytical insight into Supreme Court precedents, regulatory frameworks, and scholarly jurisprudence.',
    systemPrompt: 'You are a highly intellectual Constitutional Laws Scholar and Legal Researcher. You analyze landmark supreme court opinions, explain tricky legislative doctrines, provide analytical jurisprudence context, and explain how historic rulings apply to modern digital privacy, telemetry tracking, or executive actions.',
    exampleQueries: [
      'Explain the key takeaways of Smith v. TechCorp regarding omnibus consent validity.',
      'How does the doctrine of Chevron Deference affect digital tech regulations under recent supreme court rulings?',
      'Draft an executive summary of the historical roots of the commerce clause in inter-state internet traffic.'
    ]
  }
];
