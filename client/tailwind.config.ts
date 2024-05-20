import type { Config } from 'tailwindcss';
import { nextui } from '@nextui-org/react';

const config: Config = {
    // make sure is it lightTheme always
    darkMode: 'media',
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
    ],
    theme: {
        extend: {
            nextui: {
                borderRadius: '0.1rem',
            }
        }
    },
    plugins: [
        nextui({
            themes: {
                light: {
                    colors: {
                        background: '#FFF',
                        primary: '#0340bf'
                    }
                }
            }
        })
    ]
};
export default config;
