'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

interface SendMessageProps {
    message?: string;
    image?: string;
}

const sendMessage = async (formData: SendMessageProps) => {
    const token = cookies().get(
        process.env.XRAI_TOKEN as string
    )?.value;
    const { message, image } = formData;
    if (!message && !image) return;

    await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ message, image })
    });

    revalidatePath('/chat');
};

export default sendMessage;
