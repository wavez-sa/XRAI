'use client';
import { Input } from '@nextui-org/react';
import { useState, useRef } from 'react';
import { sendMessage } from '../actions';
import { MessageProps } from '@/app/types';
import { SendButton, UploadImageButton } from './';

interface SendMessageFormProps {
    addOptimisticMessage: (action: MessageProps) => void;
    clientToken: string;
}

const SendMessageForm = ({
    addOptimisticMessage,
    clientToken
}: SendMessageFormProps) => {
    const formRef = useRef<HTMLFormElement>(null);

    return (
        <form
            ref={formRef}
            className='flex items-center gap-4 py-4'
            onSubmit={() => formRef.current?.reset()}
            action={async formData => {
                const message = formData.get('message') as string;

                if (!message) return;

                addOptimisticMessage({
                    id: Date.now(),
                    content: message,
                    author: clientToken,
                    type: 'TEXT',
                    createdAt: new Date().toISOString()
                });

                await sendMessage({
                    message
                });
            }}
        >
            <Input
                type='text'
                name='message'
                label='Question'
                className='col-span-11 '
                errorMessage='Please enter a message'
                required
                endContent={
                    <UploadImageButton
                        addOptimisticMessage={addOptimisticMessage}
                        clientToken={clientToken}
                        formRef={formRef}
                    />
                }
            />
            <SendButton />
        </form>
    );
};

export default SendMessageForm;
