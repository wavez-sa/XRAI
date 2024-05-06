'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

const sendMessage = async (image: string) => {
    const response = await fetch('http://localhost:3001/chat/image', {
        method: 'POST',
        headers: {
            Cookie: cookies().toString()
        },
        body: JSON.stringify({ image })
    });

    console.log(response.status);

    revalidatePath('/chat');
};

export default sendMessage;
