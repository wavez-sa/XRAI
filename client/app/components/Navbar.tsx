import { Avatar } from '@nextui-org/react';
import React from 'react';
import { getClientToken } from '../lib';
import { ThemeSwitch } from '@/app/components';

const Navbar = () => {
    const clientToken = getClientToken();
    const avatarUrl = `https://source.boringavatars.com/beam/120/${clientToken}?colors=3955d9,01e4b2,4282e9`;

    return (
        <nav className='flex w-full items-center justify-between rounded-lg bg-primary p-3 '>
            <div>
                <h1 className='text-lg font-bold'>Chat</h1>
            </div>
            <div className='flex items-center gap-4'>
                <ThemeSwitch />
                <Avatar src={avatarUrl} isBordered size='sm' />
            </div>
        </nav>
    );
};

export default Navbar;
