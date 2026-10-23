import { PortfolioContent, StoredFile } from '../types/portfolio';

const devicon = (path: string) => `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${path}`;
const publicFile = (id: string, name: string, type: string, size: number, url: string): StoredFile => ({
  id,
  name,
  type,
  size,
  url
});

export const defaultContent: PortfolioContent = {
  profile: {
    name: 'Elyka Almorfe',
    headline: 'Designing where technology meets creativity.',
    intro:
    "I'm interested in technology, graphic design, UI/UX, and multimedia — and in the creative problem-solving that connects them. I like turning ideas into work that is both useful and thoughtfully made.",
    photo: publicFile(
      'profile-photo',
      'profile-photo.jpg',
      'image/jpeg',
      533287,
      '/portfolio-media/profile-photo.jpg'
    ),
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
    role: 'Creative Intern',
    organization: 'InfinityHub Digital Agency',
    startDate: 'June 15, 2026',
    endDate: 'August 7, 2026',
    description: 'Completed my On-the-Job Training at InfinityHub Digital Agency, where I gained practical experience in a professional creative environment. The internship provided opportunities to develop my digital media skills, collaborate with creative professionals, and understand industry workflows in producing digital content.',
    responsibilities: [
      'Assisted in creating and editing digital content for creative projects.',
      'Supported video editing, graphic design, and multimedia production tasks.',
      'Collaborated with team members to complete assigned projects.',
      'Organized creative assets and project files.',
      'Applied feedback and revisions to improve content quality.'
    ],
    accomplishments: [
      'Contributed to digital content production and creative assignments.',
      'Strengthened technical skills in multimedia editing and design.',
      'Gained hands-on experience with professional creative workflows.',
      'Improved teamwork, time management, and communication skills.',
      'Successfully completed the internship training period.'
    ],
    images: []
  },
  {
    id: 'exp-placeholder-2',
    role: 'Video Editor',
    organization: 'NEMSU PAGPADAYAG 2026',
    startDate: 'February 7, 2026',
    endDate: 'February 7, 2026',
    description: 'Served as a Video Editor for NEMSU PAGPADAYAG 2026, contributing to the production of visual content for the event. This experience allowed me to apply creative storytelling, video editing techniques, and attention to detail in developing engaging multimedia content.',
    responsibilities: [
      'Edited and arranged video clips into cohesive visual presentations.',
      'Applied transitions, visual effects, and audio adjustments.',
      'Organized video footage and multimedia assets.',
      'Ensured smooth pacing, visual consistency, and content quality.',
      'Revised video outputs based on feedback and event requirements.'
    ],
    accomplishments: [
      'Contributed to the production of video content for NEMSU PAGPADAYAG 2026.',
      'Applied creative editing techniques to enhance visual storytelling.',
      'Helped produce engaging and organized event media.',
      'Strengthened skills in video editing, creative planning, and multimedia production.',
      'Gained valuable experience in event-based digital content creation.'
    ],
    images: []
  },
  {
    id: 'exp-placeholder',
    role: 'Secretary',
    organization: 'Leadership Initiatives Navigating Computer Science Students (LINCSS) ',
    startDate: 'September 2025',
    endDate: 'June 2026',
    description: 'Served as Secretary of the LINC organization, supporting administrative tasks, documentation, and communication among officers and members. This role strengthened my organizational, leadership, and teamwork skills while contributing to the successful coordination of organizational activities and initiatives.',
    responsibilities: [
      'Prepared meeting minutes and maintained organizational records.',
      'Organized documents, reports, and official correspondence.',
      'Assisted in scheduling meetings and coordinating activities.',
      'Communicated announcements and updates to organization members.',
      'Supported officers in planning and implementing organizational initiatives.'
    ],
    accomplishments: [
      'Contributed to organized documentation and record management.',
      'Supported effective communication among officers and members.',
      'Assisted in coordinating organizational meetings and activities.',
      'Helped maintain accurate records of organizational decisions.',
      'Developed leadership, communication, and time management skills.'
    ],
    images: []
  },
  ],

  achievements: [
  { id: 'ach-internship', category: 'internship', title: 'Internship', date: 'June 2026', description: 'Successfully completed my On-the-Job Training at InfinityHub Digital Agency in Davao City. During the internship, I gained hands-on experience in digital content creation, multimedia editing, and creative production. This experience strengthened my technical abilities, creativity, teamwork, and understanding of professional industry workflows.', highlights: [
      'Completed the required internship training.',
      'Gained practical experience in digital media production.',
      'Developed skills in video editing and graphic design.',  
      'Improved collaboration, communication, and time management.'
  ], files: [
    publicFile(
      'ojt-certificate',
      'ojt-certificate.png',
      'image/png',
      5717064,
      '/portfolio-media/ojt-certificate.png'
    )
  ], videoUrl: '/portfolio-media/intern-campaign-video.mp4' },
  { id: 'ach-pagpadayag', category: 'pagpadayag', title: 'NEMSU PAGPADAYAG Certificate', date: 'February 2026', description: 'Contributed as a Video Editor for NEMSU PAGPADAYAG 2026, supporting the production of engaging visual content for the university event. Applied video editing techniques, creative storytelling, and multimedia production skills to help deliver quality event presentations.', highlights: [
      'Contributed to video production for the university event.',
      'Edited and enhanced video content for visual presentations.',
      'Applied transitions, audio adjustments, and creative effects.',    
      'Developed practical experience in event-based multimedia production.'
  ], files: [
    publicFile(
      'nemsu-pagpadayag',
      'nemsu-pagpadayag.jpg',
      'image/jpeg',
      120087,
      '/portfolio-media/nemsu-pagpadayag.jpg'
    )
  ], videoUrl: '' },
  { id: 'ach-recognition', category: 'recognition', title: 'School Recognition Certificate', date: 'August 2025', description: 'Received school recognition in acknowledgment of dedication, commitment, and contributions to academic or school-related activities. This achievement reflects my motivation to continuously improve, actively participate in educational opportunities, and pursue personal and professional growth.', highlights: [
    'Recognized for academic performance or school-related contributions.',
    'Demonstrated commitment to learning and continuous improvement.',
    'Participated in activities supporting personal and academic development.'
  ], files: [
    publicFile(
      'school-recognition',
      'school-recognition.jpg',
      'image/jpeg',
      706897,
      '/portfolio-media/school-recognition.jpg'
    )
  ], videoUrl: '' },
  { id: 'ach-officer', category: 'officer', title: 'School Officer Certificate', date: '', description: 'Served as a student organization officer, gaining valuable experience in leadership, teamwork, and organizational responsibilities. This role provided opportunities to collaborate with fellow students, support school initiatives, and contribute to activities that promote student engagement and community involvement.', highlights: [
    'Supported the planning and coordination of student activities.',
    'Collaborated with fellow officers and organization members.',
    'Developed leadership, communication, and organizational skills.',  
    'Demonstrated responsibility and commitment to assigned duties.'
  ], files: [
    publicFile(
      'school-officer',
      'school-officer.jpg',
      'image/jpeg',
      144678,
      '/portfolio-media/school-officer.jpg'
    )
  ], videoUrl: '' }],

  contact: {
    email: 'almorfelyka@gmail.com',
    linkedin: 'https://www.linkedin.com/in/elyka-almorfe/',
    github: 'https://github.com/elykalmorfe',
    location: 'Tandag City, Surigao del Sur, Philippines',
    formEndpoint: ''
  }
};