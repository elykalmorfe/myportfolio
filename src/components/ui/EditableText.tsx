import React from 'react';
import { usePortfolio } from '../../contexts/PortfolioContext';

interface EditableTextProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
  placeholder: string;
  multiline?: boolean;
  className?: string;
  as?: 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'div';
}

export function EditableText({
  value,
  onChange,
  label,
  placeholder,
  multiline = false,
  className = '',
  as: Tag = 'p'
}: EditableTextProps) {
  const { editMode } = usePortfolio();

  if (editMode) {
    const shared = `block w-full rounded-xl border border-dashed border-clay/50 bg-surface/90 px-3 py-2 placeholder:text-muted/70 focus:border-clay focus:outline-none focus:ring-4 focus:ring-clay/15 ${className}`;
    return multiline ?
    <textarea
      aria-label={label}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      rows={Math.max(3, value.split('\n').length + 1)}
      className={`${shared} resize-y`} /> :


    <input aria-label={label} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} className={shared} />;

  }

  if (!value.trim()) {
    return <Tag className={`${className} italic text-muted`}>{placeholder}</Tag>;
  }
  return <Tag className={`${className} ${multiline ? 'whitespace-pre-line' : ''}`}>{value}</Tag>;
}