import { About } from '../types/portfolio';

export const aboutDetailFields: { key: keyof About; label: string; placeholder: string }[] = [
  {
    key: 'education',
    label: 'Education',
    placeholder: `North Eastern Mindanao State University (NEMSU) – Tandag Campus,
  Program: Bachelor of Science in Computer Science,
  Year Level: 4th Year Student`,
  },
  {
    key: 'careerInterests',
    label: 'Career interests',
    placeholder:
      'My career interests focus on software development, web development, UI/UX design, video editing, and digital media production. I aim to explore opportunities that allow me to combine programming, problem-solving, and creativity while developing innovative and user-centered digital solutions.',
  },
  {
    key: 'goals',
    label: 'Professional goals',
    placeholder:
      'My goal is to become a skilled and versatile technology professional capable of developing efficient software solutions and producing high-quality digital content. I aspire to strengthen my technical and creative expertise, gain valuable industry experience, and contribute to projects that make a meaningful impact.',
  },
  {
    key: 'personalInterests',
    label: 'Beyond the work',
    placeholder:
      'Beyond academics and professional projects, I enjoy exploring new technologies, video editing, graphic design, and experimenting with creative digital tools. I am passionate about learning new techniques, improving my creative workflow, and transforming ideas into engaging visual experiences.',
  },
];