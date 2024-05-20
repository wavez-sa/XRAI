import { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import classNames from 'classnames';
import Image from 'next/image';

import { logo } from '@/public/images';

const inter = Inter({
    subsets: ['latin'],
    weight: ['400']
});

const layout = ({ children }: { children: ReactNode }) => {
    return (
        <section
            className={classNames(
                inter.className,
                'grid h-screen bg-[#fff] lg:grid-cols-2'
            )}
        >
            <div className='hidden flex-col items-center justify-center bg-[#3956D9] lg:flex'>
                <Image src={logo} alt='Logo' width={200} height={200} />
            </div>
            <div className='flex flex-col items-center justify-center'>
                {children}
            </div>
        </section>
    );
};

export default layout;
