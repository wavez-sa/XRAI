'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

import { useClerk } from '@clerk/nextjs';

interface SendMessageProps {
    message?: string;
    image?: string;
}

const sendMessage = async (
    formData: SendMessageProps,
    token: string
) => {
    const oldToken = cookies().get(
        process.env.XRAI_TOKEN as string
    )?.value;
    const { message, image } = formData;
    if (!message && !image) return;

    await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${oldToken}`
        },
        body: JSON.stringify({ message, image })
    });

    revalidatePath('/chat');
};

export default sendMessage;
