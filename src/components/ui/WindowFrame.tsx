import React from 'react';

interface WindowFrameProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  bodyClassName?: string;
  barClassName?: string;
  actions?: React.ReactNode;
}

export function WindowFrame({ title, children, className = '', bodyClassName = '', barClassName = '', actions }: WindowFrameProps) {
  return (
    <div className={`overflow-hidden rounded-2xl border border-ink/10 bg-surface shadow-window ${className}`}>
      <div className={`flex items-center gap-3 border-b border-line bg-sand/60 px-4 py-2.5 transition-colors duration-200 ease-out ${barClassName}`}>
        <span className="flex shrink-0 gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
        </span>
        <span className="min-w-0 truncate font-mono text-xs text-muted">{title}</span>
        {actions && <div className="ml-auto shrink-0">{actions}</div>}
      </div>
      <div className={bodyClassName}>{children}</div>
    </div>);

}