'use client';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { If, Then, Else } from 'react-if';
import { Sun, Moon } from 'lucide-react';

const ThemeSwitch = () => {
    const [mounted, setMounted] = useState(false);
    const { resolvedTheme, setTheme } = useTheme();

    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    return (
        <If condition={resolvedTheme === 'dark'}>
            <Then>
                <button
                    onClick={() => setTheme('light')}
                    className=''
                >
                    <Sun size={24} />
                </button>
            </Then>
            <Else>
                <button
                    onClick={() => setTheme('dark')}
                    className='text-white'
                >
                    <Moon size={24} />
                </button>
            </Else>
        </If>
    );
};

export default ThemeSwitch;
