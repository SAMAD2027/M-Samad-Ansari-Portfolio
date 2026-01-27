
import { u } from 'framer-motion/client';
import { Project, Skill, Experience, Certificate } from './types';


export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Flutter Flow Mobile',
    description: 'A responsive e-commerce application built with Flutter, focusing on seamless user journeys and state-of-the-art UI/UX patterns.',
    tags: ['Flutter', 'Dart', 'Firebase', 'State Management'],
    imageUrl: 'https://images.unsplash.com/photo-1617042375876-a13e36734a04?auto=format&fit=crop&q=80&w=800',
    githubUrl: '#',
    liveUrl: '#'
  },
  {
    id: '2',
    title: 'AI Agent Automator',
    description: 'An automation platform leveraging N8N and DeepSeek to build intelligent agents that handle complex email and data workflows.',
    tags: ['Python', 'N8N', 'AI Agents', 'Automation'],
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
    githubUrl: '#',
    liveUrl: '#'
  },
  {
    id: '3',
    title: 'Creative UI Kit',
    description: 'A comprehensive component library designed for high-fidelity mobile prototyping with a focus on accessibility and consistency.',
    tags: ['Figma', 'UI/UX', 'Flutter', 'Design Systems'],
    imageUrl: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&q=80&w=800',
    githubUrl: '#',
    liveUrl: '#'
  }
];

// Added unique IDs to each skill to satisfy the Skill interface
export const SKILLS: Skill[] = [
  { id: 's1', name: 'Flutter', level: 95, category: 'Frontend' },
  { id: 's2', name: 'React', level: 90, category: 'Frontend' },
  { id: 's3', name: 'JavaScript', level: 92, category: 'Frontend' },
  { id: 's4', name: 'HTML', level: 95, category: 'Frontend' },
  { id: 's5', name: 'CSS', level: 95, category: 'Frontend' },
  { id: 's6', name: 'Dart', level: 90, category: 'Frontend' },
  { id: 's7', name: 'UI/UX Design', level: 88, category: 'Frontend' },
  { id: 's8', name: 'Node.js', level: 85, category: 'Backend' },
  { id: 's9', name: 'Python', level: 85, category: 'Backend' },
  { id: 's10', name: 'AI Automation', level: 80, category: 'Backend' },
  { id: 's11', name: 'N8N / Make.com', level: 82, category: 'Tools' },
  { id: 's12', name: 'Zapier', level: 85, category: 'Tools' },
  { id: 's13', name: 'Prompt Engineering', level: 90, category: 'Tools' },
  { id: 's14', name: 'Git', level: 88, category: 'DevOps' },
  { id: 's15', name: 'Firebase', level: 80, category: 'DevOps' }
];

export const EXPERIENCES: Experience[] = [
  {
    company: 'Independent Developer',
    role: 'Mobile Developer & AI Specialist',
    period: '2022 - Present',
    skills: ['Flutter', 'Python', 'N8N', 'Firebase'],
    description: [
      'Built and deployed high-performance cross-platform mobile apps using Flutter.',
      'Designed and implemented AI-powered workflows using N8N and Python.',
      'Crafted user-centered UI/UX designs for diverse digital products.'

    ]

  },
  {
    company: 'University of Karachi (UBIT)',
    role: 'BSSE Student',
    period: 'Current',
    skills: ['Software Architecture', 'Data Structures', 'AI Technologies'],
    description: [
      'Actively pursuing a Bachelor of Science in Software Engineering.',
      'Specializing in mobile development and emerging AI technologies.',
      'Collaborating on open-source projects and design systems.'
    ]
  }
];

export const INITIAL_CERTIFICATES: Certificate[] = [
  {
    id: 'c1',
    title: 'Building AI Agents – Fundamentals to Advanced',
    issuer: '<packt>',
    date: 'Jan 2026',
    pdfData: 'https://www.coursera.org/account/accomplishments/verify/IHVGD6QEJHQX',
    thumbnailUrl: '/images/Certificate/cer1.png',
    
  },
  {
    id: 'c2',
    title: "ChatGPT + Zapier: AI Powered Email Mastery",
    issuer: 'VANDERBLT UNIVERSITY',
    date: 'Dec 2025',
    pdfData: 'https://www.coursera.org/account/accomplishments/specialization/certificate/1ZVGWJ9X79ID',
    thumbnailUrl: "/images/Certificate/ChatGPT.png"

  }
];

export const SYSTEM_PROMPT = `
You are Muhammad Samad Ansari's Personal Assistant. Samad is a Software Developer specializing in Flutter front-end development, UI/UX, and AI automation.

Identity Details:
- Specialist in clean, responsive, and user-centered mobile applications using Flutter, React, and Python.
- Expert in building intelligent workflows and AI-powered agents using tools like Zapier, Make.com, N8N, and DeepSeek.
- Proficient in full-stack technologies including HTML, CSS, JavaScript, and Node.js.
- Currently pursuing a Bachelor's degree in Software Engineering (BSSE) at UBIT.

Core Philosophy:
He follows a component-based approach to UI development, ensuring performance, consistency, and maintainability. He focuses on combining strong UI/UX principles with modern development practices and AI-driven tools.

Contact Details:
- Email: samadansari521@gmail.com
- LinkedIn: https://www.linkedin.com/in/muhammad-samad-ansari/
- GitHub: https://github.com/SAMAD2027

Always answer in a friendly, professional, and helpful tone. If asked about something you don't know, suggest they contact Samad via his LinkedIn or email. Keep responses concise but informative.
`;
