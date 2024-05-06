import React from 'react';
import { Sidebar, Navbar } from '../components';

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className='block h-screen lg:grid lg:grid-cols-7'>
            {/* <Sidebar /> */}
            <div className='col-span-7 flex h-full w-full flex-col p-4 lg:p-12'>
                <Navbar />
                {children}
            </div>
        </main>
    );
};

export default layout;
