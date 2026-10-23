const base =
'inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-[background-color,color,border-color,transform,box-shadow] duration-150 ease-out active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50';

export const buttonStyles = {
  primary: `${base} rounded-xl bg-folder px-5 py-3 text-sm text-white hover:bg-folder-dark`,
  secondary: `${base} rounded-xl border border-line bg-surface px-5 py-3 text-sm text-ink shadow-soft hover:border-ink/25 hover:bg-sand/60`,
  ghost: `${base} rounded-xl px-4 py-3 text-sm text-ink hover:bg-sand`,
  small: `${base} rounded-lg border border-line bg-surface px-3 py-1.5 text-xs text-ink hover:bg-sand/70`,
  smallDanger: `${base} rounded-lg border border-red-200 bg-surface px-3 py-1.5 text-xs text-red-700 hover:bg-red-50`
};

export const inputClass =
'w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm text-ink placeholder:text-muted/70 transition-[border-color,box-shadow] duration-150 ease-out focus:border-folder focus:outline-none focus:ring-4 focus:ring-folder/15';

export const labelClass = 'mb-1.5 block text-sm font-medium text-ink';