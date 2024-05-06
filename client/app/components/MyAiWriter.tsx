'use client';

import AIWriter from 'react-aiwriter';

const MyAiWriter = ({ message }: { message: string }) => (
    <AIWriter>
        <p className='text-white'>{message}</p>
    </AIWriter>
);

export default MyAiWriter;
