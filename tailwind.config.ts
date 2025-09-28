import type { Config } from 'tailwindcss'
import tailwindcssAnimate from 'tailwindcss-animate'

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FFFFFF',
        primaryAccent: '#000000',
        brand: '#FFFFFF',
        background: {
          DEFAULT: '#000000',
          secondary: '#111111'
        },
        secondary: '#FFFFFF',
        border: 'rgba(255, 255, 255, 0.1)',
        accent: '#111111',
        muted: '#FFFFFF',
        destructive: '#FFFFFF',
        positive: '#FFFFFF'
      },
      fontFamily: {
        geist: 'var(--font-geist-sans)',
        dmmono: 'var(--font-dm-mono)'
      },
      borderRadius: {
        xl: '10px'
      }
    }
  },
  plugins: [tailwindcssAnimate]
} satisfies Config
