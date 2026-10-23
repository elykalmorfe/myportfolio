import React from 'react';
import { inputClass, labelClass } from '../ui/styles';

interface FormFieldProps {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  error?: string;
  type?: 'text' | 'email';
  multiline?: boolean;
  autoComplete?: string;
  disabled?: boolean;
  onBlur?: () => void;
}

export function FormField({ id, name, label, value, onChange, placeholder, error, type = 'text', multiline = false, autoComplete, disabled, onBlur }: FormFieldProps) {
  const errorId = `${id}-error`;
  const shared = {
    id,
    name,
    value,
    placeholder,
    required: true,
    disabled,
    onBlur,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': error ? errorId : undefined,
    className: `${inputClass} ${error ? '!border-red-400' : ''}`
  };
  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label} <span className="text-clay" aria-hidden="true">*</span>
      </label>
      {multiline ?
      <textarea {...shared} rows={6} onChange={(e) => onChange(e.target.value)} /> :

      <input {...shared} type={type} autoComplete={autoComplete} onChange={(e) => onChange(e.target.value)} />
      }
      {error &&
      <p id={errorId} className="mt-1.5 text-xs text-red-700">
          {error}
        </p>
      }
    </div>);

}