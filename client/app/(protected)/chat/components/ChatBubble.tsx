/* eslint-disable @next/next/no-img-element */
import React from 'react';
import classnames from 'classnames';
import { Avatar } from '@nextui-org/react';
import { formatRelative } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import { CustomWriter } from '@/app/components';
import remarkGfm from 'remark-gfm';

import '../styles/markdown.css';
import { isBase64Image } from '@/app/lib';
import Link from 'next/link';

interface ChatBubbleProps {
    message: string;
    isMe: boolean;
    type: 'TEXT' | 'IMAGE' | 'MARKDOWN';
    isLast?: boolean;
    author: string;
    createdAt: string;
}

const ChatBubble = ({
    message,
    isMe,
    type,
    isLast,
    author,
    createdAt
}: ChatBubbleProps) => {
    const avatarUrl = isMe
        ? `https://source.boringavatars.com/beam/120/${author}?colors=3955d9,01e4b2,4282e9`
        : 'https://i.imgur.com/153JLeM.png';

    return (
        <div className={classnames('flex', { 'justify-end': isMe })}>
            <div
                className={classnames('flex items-start gap-2.5', {
                    'flex-row-reverse': isMe
                })}
            >
                <Avatar
                    src={avatarUrl}
                    size='sm'
                    alt='Avatar'
                    className='h-9 w-10 rounded-full'
                />
                <div
                    className={classnames(
                        'flex w-full max-w-4xl flex-col rounded-lg p-4',
                        {
                            'bg-gray-700': isMe,
                            'bg-gray-800': !isMe,
                            'rounded-tr-none': isMe,
                            'rounded-tl-none': !isMe,
                            'border-gray-200': true
                        }
                    )}
                >
                    <div className='flex items-center space-x-2'>
                        <span className='text-sm font-semibold text-white'>
                            {isMe ? 'You' : 'XRAI'}
                        </span>
                        <span className='text-sm font-normal text-gray-400'>
                            {formatRelative(
                                new Date(createdAt),
                                new Date()
                            ).replace('about', '')}
                        </span>
                    </div>

                    {type === 'IMAGE' ? (
                        <Link
                            target='_blank'
                            href={
                                isBase64Image(message)
                                    ? message
                                    : isMe
                                      ? process.env
                                            .NEXT_PUBLIC_BASE_URL +
                                        '/uploads/' +
                                        message
                                      : process.env
                                            .NEXT_PUBLIC_BASE_URL +
                                        '/downloads/' +
                                        message
                            }
                        >
                            <img
                                className='mt-4 w-64'
                                src={
                                    isBase64Image(message)
                                        ? message
                                        : isMe
                                          ? process.env
                                                .NEXT_PUBLIC_BASE_URL +
                                            '/uploads/' +
                                            message
                                          : process.env
                                                .NEXT_PUBLIC_BASE_URL +
                                            '/downloads/' +
                                            message
                                }
                                alt='Content'
                            />
                        </Link>
                    ) : type === 'MARKDOWN' ? (
                        <ReactMarkdown
                            className=' markdown-content font-light text-white'
                            remarkPlugins={[remarkGfm]}
                        >
                            {message.replaceAll('"', '')}
                        </ReactMarkdown>
                    ) : (
                        <div>
                            {isLast && !isMe ? (
                                <CustomWriter message={message} />
                            ) : (
                                <p className='text-white'>{message}</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ChatBubble;
{
    /* <CustomWriter message={message} /> */
}
