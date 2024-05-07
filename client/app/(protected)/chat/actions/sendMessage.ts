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

<<<<<<< HEAD
    await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/chat', {
=======
    await fetch('https://api.xrai.dev/chat', {
>>>>>>> 9431daf407adf8c4d5ee73671722506d19ced579
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
