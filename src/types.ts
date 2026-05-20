export interface Resource {
  id: string;
  category: 'Internship' | 'Competition' | 'Judgment' | 'MUN' | 'Webinar';
  title: string;
  organization: string;
  description: string;
  dateRange: string;
  deadline?: string;
  location: string;
  linkText: string;
  citation?: string; // For Judgments
  fullTextBrief?: string; // Deep legal brief markup
  tags: string[];
  featured?: boolean;
}

export interface DragItem {
  id: string;
  name: string;
}

export interface QuoteRequest {
  id: string;
  fullName: string;
  email: string;
  documentType: string;
  deadline: string;
  description: string;
  timestamp: string;
  status: 'Pending Review' | 'Analyzing Scope' | 'Quote Ready' | 'Assigned To Counsel';
  estimatedCost?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: Date;
}

export interface LegalSpecialty {
  id: string;
  name: string;
  description: string;
  systemPrompt: string;
  exampleQueries: string[];
}
