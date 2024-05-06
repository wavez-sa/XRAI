'use server';
import { MessageProps } from '@/app/types';
import { Input, Button } from '@nextui-org/react';
import { Send } from 'lucide-react';
import { cookies } from 'next/headers';
import { ChatBubble, MessagesComponents } from './components';
import { getClientToken } from '@/app/lib';

const getMessages = async () => {
    const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL +  '/chat', {
        headers: { Cookie: cookies().toString() }
    });
    const data = (await response.json()) as MessageProps[];
    return data;
};

const page = async () => {
    const messages = await getMessages();
    const clientToken = getClientToken();

    return (
        <MessagesComponents
            messages={messages}
            clientToken={clientToken ?? ''}
        />
    );
};

export default page;
