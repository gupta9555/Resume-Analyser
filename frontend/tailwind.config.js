/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#F7F4EC',
        ink: '#1C1B19',
        inksoft: '#57534A',
        pen: {
          blue: '#2B4EFF',
          amber: '#E8A33D',
          red: '#C4432B',
          green: '#2F8F5B',
        },
        line: '#DEDAD0',
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
};
