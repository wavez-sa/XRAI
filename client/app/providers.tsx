'use client';

import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

const providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <NextUIProvider>
            <NextThemesProvider
                attribute='class'
                defaultTheme='light'
                themes={['light', 'dark']}
                enableSystem={true}
            >
                {children}
            </NextThemesProvider>
        </NextUIProvider>
    );
};

export default providers;
