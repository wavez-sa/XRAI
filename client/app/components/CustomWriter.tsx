'use client';
import React, { useState, useEffect, useRef } from 'react';

const CustomWriter = ({ message }: { message: string }) => {
    const newMessage = ' ' + message;
    const [typedMessage, setTypedMessage] = useState<string[]>([]);
    const index = useRef(0); // Using useRef to keep the current index across re-renders

    useEffect(() => {
        // Clear the typedMessage whenever the message changes
        setTypedMessage([]);
        const words = newMessage.split(' ');
        index.current = 0; // Resetting index on message change

        const typingInterval = setInterval(() => {
            if (index.current < words.length) {
                setTypedMessage(prevTypedMessage => {
                    // Return a new array with the new word appended
                    return [
                        ...prevTypedMessage,
                        words[index.current]
                    ];
                });
                index.current++; // Increment the ref value
            } else {
                clearInterval(typingInterval);
            }
        }, 50);

        return () => clearInterval(typingInterval);
    }, [newMessage]); // Effect dependencies

    return (
        <div>
            {typedMessage.map((word, index) => (
                <span key={`words-${index}`}>
                    {word}
                    {index !== typedMessage.length - 1 && ' '}
                </span>
            ))}
        </div>
    );
};

export default CustomWriter;
