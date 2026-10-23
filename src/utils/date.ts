const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function formatMonth(value: string): string {
  if (!value) return '';
  const [year, month] = value.split('-');
  if (!month) return year;
  return `${MONTHS[Number(month) - 1] ?? ''} ${year}`.trim();
}

export function formatRange(start: string, end: string): string {
  const s = formatMonth(start);
  const e = end ? formatMonth(end) : start ? 'Present' : '';
  return [s, e].filter(Boolean).join(' – ');
}

export function compareByDateDesc(a: string, b: string): number {
  if (!a && !b) return 0;
  if (!a) return 1;
  if (!b) return -1;
  return b.localeCompare(a);
}

export const linesToList = (value: string) =>
value.
split('\n').
map((line) => line.trim()).
filter(Boolean);