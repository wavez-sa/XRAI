'use client';

import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <NextUIProvider>
            <NextThemesProvider
                defaultTheme='light'
                themes={['light']}
                enableSystem={false}
                attribute='class'
                
            >
                {children}
            </NextThemesProvider>
        </NextUIProvider>
    );
};

export default Providers;
