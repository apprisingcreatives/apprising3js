import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
  	container: {
  		center: true,
  		padding: '2rem',
  		screens: {
  			'2xl': '1400px'
  		}
  	},
  	extend: {
  		colors: {
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			},
  			teal: {
  				DEFAULT: '#0F3D3E',
  				50: '#E8F4F4',
  				100: '#C5E3E4',
  				200: '#8FC7C8',
  				300: '#5AABAD',
  				400: '#2D7778',
  				500: '#0F3D3E',
  				600: '#0C3132',
  				700: '#092526',
  				800: '#06191A',
  				900: '#030D0D',
  			},
  			cyan: {
  				DEFAULT: '#37DBDB',
  				50: '#EDFBFB',
  				100: '#D0F6F6',
  				200: '#A1EDED',
  				300: '#72E4E4',
  				400: '#37DBDB',
  				500: '#24B8B8',
  				600: '#1C9494',
  				700: '#157070',
  				800: '#0D4C4C',
  				900: '#062828',
  			},
  		},
  		fontFamily: {
  			display: ['"Space Grotesk"', 'sans-serif'],
  			body: ['"Inter"', 'sans-serif'],
  			mono: ['"JetBrains Mono"', 'monospace'],
  		},
  		fontSize: {
  			'hero': ['56px', { lineHeight: '1.2' }],
  			'hero-mobile': ['36px', { lineHeight: '1.2' }],
  			'h2': ['36px', { lineHeight: '1.2' }],
  			'h2-mobile': ['28px', { lineHeight: '1.2' }],
  			'h3': ['24px', { lineHeight: '1.2' }],
  			'h3-mobile': ['20px', { lineHeight: '1.2' }],
  			'body-lg': ['17px', { lineHeight: '1.6' }],
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: { height: '0' },
  				to: { height: 'var(--radix-accordion-content-height)' }
  			},
  			'accordion-up': {
  				from: { height: 'var(--radix-accordion-content-height)' },
  				to: { height: '0' }
  			},
  			'fade-in-up': {
  				'0%': { opacity: '0', transform: 'translateY(30px)' },
  				'100%': { opacity: '1', transform: 'translateY(0)' },
  			},
  			'fade-in': {
  				'0%': { opacity: '0' },
  				'100%': { opacity: '1' },
  			},
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
  			'fade-in': 'fade-in 0.6s ease-out forwards',
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
