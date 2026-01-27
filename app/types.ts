
export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  githubUrl?: string;
  liveUrl?: string;
}

export interface Skill {
  id: string;
  name: string;
  level: number;
  category: 'Frontend' | 'Backend' | 'DevOps' | 'Tools';
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string[];
  skills?: string[];
  certificatePdf?: string; // Base64 PDF string
  certificateThumbnail?: string; // Base64 or URL image
  offerLetterPdf?: string;  // Base64 PDF string
  offerLetterThumbnail?: string; // Base64 or URL image
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date?: string;
  skills?: string[];
  pdfData?: string; // Base64 PDF string
  thumbnailUrl?: string; // Base64 or URL image for preview
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}
const saved = localStorage.getItem('portfolio_skills');
localStorage.removeItem('portfolio_skills')
