'use client';
import { useEffect, useRef, useOptimistic, useState } from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';

import { MessageProps } from '@/app/types';
import { SendMessageForm, ChatBubble } from './';
import { useUser } from '@clerk/nextjs';

const MessagesComponents = ({
    messages,
    clientToken
}: {
    messages: MessageProps[];
    clientToken: string;
}) => {
    const [optimisticMessages, addOptimisticMessage] = useOptimistic(
        messages,
        (state, message: MessageProps) => {
            return [...state, message];
        }
    );

    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const scrollToBottom = () => {
            if (messagesEndRef.current) {
                setTimeout(() => {
                    if (messagesEndRef.current) {
                        messagesEndRef.current.scrollIntoView({
                            behavior: 'smooth'
                        });
                    }
                }, 500);
            }
        };

        scrollToBottom();
    }, [optimisticMessages]);

    const [autoAnimateRef] = useAutoAnimate();

    const { user } = useUser();

    return (
        <>
            <div className='mt-4 flex h-full w-full flex-col  overflow-y-auto'>
                <div
                    className='flex flex-col gap-4 p-4'
                    ref={autoAnimateRef}
                >
                    {optimisticMessages.map((message, index) => (
                        <ChatBubble
                            key={index}
                            message={message.content}
                            isMe={index % 2 !== 0 && message.type !== 'MARKDOWN'}
                            type={message.type}
                            isLast={
                                index ===
                                optimisticMessages.length - 1
                            }
                            author={message.author}
                            createdAt={message.createdAt}
                        />
                    ))}
                    <div ref={messagesEndRef} />
                </div>
            </div>
            <SendMessageForm
                addOptimisticMessage={addOptimisticMessage}
                clientToken={clientToken}
            />
        </>
    );
};

export default MessagesComponents;
