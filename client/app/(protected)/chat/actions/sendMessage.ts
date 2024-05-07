'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

interface SendMessageProps {
    message?: string;
    image?: string;
}

const sendMessage = async (formData: SendMessageProps) => {
    const { message, image } = formData;

    if (!message && !image) return;

    await fetch('https://api.xrai.dev/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Cookie: cookies().toString()
        },
        body: JSON.stringify({ message, image })
    });

    revalidatePath('/chat');
};

export default sendMessage;
