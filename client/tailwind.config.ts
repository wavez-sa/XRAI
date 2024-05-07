import type { Config } from 'tailwindcss';
import { nextui } from '@nextui-org/react';

const config: Config = {
    darkMode: 'class',
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
    ],
    theme: {
        extend: {
            nextui: {
                borderRadius: '0.1rem' // set the main border radius to 0.3
            }
        }
    },
    plugins: [
        nextui({
            themes: {
                light: {
                    colors: {
                        background: '#212226',
                        primary: '#0340bf'
                    }
                },
                dark: {
                    colors: {
                        background: '#212226',
                        primary: '#3955d9'
                    }
                }
            }
        })
    ]
};
export default config;
