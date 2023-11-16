import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        header: '#F5F5F5',
        headerText: '#000000',
        screen: '#F5F5F5',
        screenText: '#000000',
        footer: '#FFFFFF',
        footerText: '#000000',
        primary: '#757575',
        secondary: '#B5B5B5',
        tertiary: '#DBDBDB',
      },
    },
  },
  plugins: [require('@tailwindcss/aspect-ratio')],
};
export default config;
