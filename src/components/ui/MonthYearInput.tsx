import React, { useState } from 'react';
import { inputClass } from './styles';

interface MonthYearInputProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  'aria-describedby'?: string;
  'aria-invalid'?: boolean;
}

const months = [
  ['01', 'January'],
  ['02', 'February'],
  ['03', 'March'],
  ['04', 'April'],
  ['05', 'May'],
  ['06', 'June'],
  ['07', 'July'],
  ['08', 'August'],
  ['09', 'September'],
  ['10', 'October'],
  ['11', 'November'],
  ['12', 'December']
];

export function MonthYearInput({
  id,
  value,
  onChange,
  'aria-describedby': ariaDescribedBy,
  'aria-invalid': ariaInvalid
}: MonthYearInputProps) {
  const [initialYear, initialMonth] = value.split('-');
  const [year, setYear] = useState(initialYear ?? '');
  const [month, setMonth] = useState(initialMonth ?? '');

  const updateDate = (nextYear: string, nextMonth: string) => {
    const validYear = /^\d{4}$/.test(nextYear) && Number(nextYear) > 0;
    onChange(validYear ? (nextMonth ? `${nextYear}-${nextMonth}` : nextYear) : '');
  };

  return (
    <div className="grid grid-cols-[minmax(0,1fr)_minmax(6rem,0.7fr)] gap-2">
      <div>
        <label htmlFor={`${id}-month`} className="sr-only">Month</label>
        <select
          id={`${id}-month`}
          value={month}
          onChange={(event) => {
            const nextMonth = event.target.value;
            setMonth(nextMonth);
            updateDate(year, nextMonth);
          }}
          className={inputClass}>
          <option value="">Month</option>
          {months.map(([monthValue, monthName]) => (
            <option key={monthValue} value={monthValue}>{monthName}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor={`${id}-year`} className="sr-only">Year</label>
        <input
          id={id}
          type="text"
          maxLength={4}
          pattern="\d{4}"
          inputMode="numeric"
          placeholder="Year"
          value={year}
          onChange={(event) => {
            const nextYear = event.target.value.replace(/\D/g, '').slice(0, 4);
            setYear(nextYear);
            updateDate(nextYear, month);
          }}
          aria-describedby={ariaDescribedBy}
          aria-invalid={ariaInvalid}
          className={inputClass} />
      </div>
    </div>
  );
}
