import type { Metadata } from 'next';
import { Share_Tech } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';

import Providers from './providers';

import './globals.css';

export const metadata: Metadata = {
    title: 'XRAI',
    description: 'Pixels to Precision'
};
const share_tech = Share_Tech({
    subsets: ['latin'],
    weight: ['400']
});

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider>
        <html lang='en' suppressHydrationWarning className='dark'>
            <body
                className={share_tech.className}
                suppressHydrationWarning
                >
                <Providers>{children}</Providers>
            </body>
        </html>
                </ClerkProvider>
    );
}
