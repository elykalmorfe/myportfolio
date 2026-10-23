import { About } from '../types/portfolio';

export const aboutDetailFields: {key: keyof About;label: string;placeholder: string;}[] = [
{ key: 'education', label: 'Education', placeholder: 'Add your educational background — school, program, and year.' },
{ key: 'careerInterests', label: 'Career interests', placeholder: 'Add the roles and fields you want to grow in.' },
{ key: 'goals', label: 'Professional goals', placeholder: 'Add what you are working toward professionally.' },
{ key: 'personalInterests', label: 'Beyond the work', placeholder: 'Add personal interests related to technology and creativity.' }];