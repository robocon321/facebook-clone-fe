import type { Config } from 'tailwindcss'

const config: Config = {
  variants: {
    extend: {
        display: ["group-hover"]        
    },
  },
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },      
    },
  },
  safelist: [
    'text-red-900',
    'text-yellow-900',
    'text-blue-900',
    'bg-red-100',
    'bg-yellow-100',
    'bg-blue-100'
  ],  
  plugins: [],
}
export default config
