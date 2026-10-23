import { PortfolioContent } from '../types/portfolio';

const devicon = (path: string) => `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${path}`;

export const defaultContent: PortfolioContent = {
  profile: {
    name: 'Elyka Almorfe',
    headline: 'Designing where technology meets creativity.',
    intro:
    "I'm interested in technology, graphic design, UI/UX, and multimedia — and in the creative problem-solving that connects them. I like turning ideas into work that is both useful and thoughtfully made.",
    photo: null,
    resume: null,
    resumeUrl: '',
    portfolioUrl: ''
  },
  about: {
    introduction: '',
    education: '',
    careerInterests: '',
    goals: '',
    personalInterests: ''
  },
  tools: [
  { id: 'tool-photoshop', name: 'Adobe Photoshop', logoUrl: devicon('photoshop/photoshop-original.svg'), logoFile: null },
  { id: 'tool-figma', name: 'Figma', logoUrl: devicon('figma/figma-original.svg'), logoFile: null },
  { id: 'tool-canva', name: 'Canva', logoUrl: devicon('canva/canva-original.svg'), logoFile: null },
  { id: 'tool-capcut', name: 'CapCut', logoUrl: '/capcut-logo.png', logoFile: null },
  { id: 'tool-trello', name: 'Trello', logoUrl: devicon('trello/trello-original.svg'), logoFile: null },
  { id: 'tool-office', name: 'Microsoft Office', logoUrl: 'https://cdn.simpleicons.org/microsoftoffice/D83B01', logoFile: null },
  { id: 'tool-github', name: 'GitHub', logoUrl: devicon('github/github-original.svg'), logoFile: null },
  { id: 'tool-vscode', name: 'VS Code', logoUrl: devicon('vscode/vscode-original.svg'), logoFile: null },
  { id: 'tool-xampp', name: 'XAMPP', logoUrl: 'https://cdn.simpleicons.org/xampp/FB7A24', logoFile: null },
  { id: 'tool-htmlcss', name: 'HTML/CSS', logoUrl: devicon('html5/html5-original.svg'), logoFile: null },
  { id: 'tool-laravel', name: 'Laravel', logoUrl: devicon('laravel/laravel-original.svg'), logoFile: null },
  { id: 'tool-php', name: 'PHP', logoUrl: devicon('php/php-original.svg'), logoFile: null },
  { id: 'tool-mysql', name: 'MySQL', logoUrl: devicon('mysql/mysql-original.svg'), logoFile: null }],

  experiences: [
  {
    id: 'exp-placeholder',
    role: '',
    organization: '',
    startDate: '',
    endDate: '',
    description: '',
    responsibilities: [],
    accomplishments: [],
    images: []
  },
  {
    id: 'exp-placeholder-2',
    role: '',
    organization: '',
    startDate: '',
    endDate: '',
    description: '',
    responsibilities: [],
    accomplishments: [],
    images: []
  }],

  achievements: [
  { id: 'ach-internship', category: 'internship', title: 'Internship', date: '', description: '', highlights: [], files: [], videoUrl: '' },
  { id: 'ach-pagpadayag', category: 'pagpadayag', title: 'NEMSU PAGPADAYAG Certificate', date: '', description: '', highlights: [], files: [], videoUrl: '' },
  { id: 'ach-recognition', category: 'recognition', title: 'School Recognition Certificate', date: '', description: '', highlights: [], files: [], videoUrl: '' },
  { id: 'ach-officer', category: 'officer', title: 'School Officer Certificate', date: '', description: '', highlights: [], files: [], videoUrl: '' }],

  contact: {
    email: 'almorfelyka@gmail.com',
    linkedin: 'https://www.linkedin.com/in/elyka-almorfe/',
    github: 'https://github.com/elykalmorfe',
    location: '',
    formEndpoint: ''
  }
};