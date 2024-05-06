'use server';
import { cookies } from 'next/headers';

const getClientToken = () => {
    const cookieStore = cookies();
    let token = cookieStore.get(
        process.env.XRAI_TOKEN as string
    )?.value;


    return token;
};

export default getClientToken;
