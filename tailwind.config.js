export default {content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        canvas: '#F6F3EA',
        surface: '#FFFFFF',
        sand: '#ECE8DD',
        line: '#DDD8CB',
        ink: '#161616',
        muted: '#5C5850',
        clay: '#1D63C4',
        peach: '#F6D5DC',
        sage: '#DCEBD3',
        sky: '#D5E5FA',
        lilac: '#E5DFF5',
        folder: '#2A74D6',
        'folder-light': '#7FB2F0',
        'folder-dark': '#1C5BB0',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Archivo', 'Inter', 'ui-sans-serif', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        soft: '0 1px 2px rgba(22,22,22,0.05), 0 10px 26px -14px rgba(22,22,22,0.18)',
        window: '0 1px 0 rgba(22,22,22,0.04), 0 22px 44px -22px rgba(22,22,22,0.35)',
      },
    },
  },
};
