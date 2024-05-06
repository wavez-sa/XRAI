'use client';
import { useFormStatus } from 'react-dom';
import { Button } from '@nextui-org/react';
import { Send } from 'lucide-react';

const SendButton = () => {
    const { pending } = useFormStatus();

    return (
        <Button
            isIconOnly
            variant='shadow'
            color='primary'
            className='col-span-1 mb-1'
            type='submit'
            disabled={pending}
            isLoading={pending}
        >
            <Send className='p-0.5 text-white' />
        </Button>
    );
};

export default SendButton;
