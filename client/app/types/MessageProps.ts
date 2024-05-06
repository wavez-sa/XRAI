export interface MessageProps {
    id: number;
    content: string;
    author: string;
    type: 'TEXT' | 'IMAGE' | 'MARKDOWN';
    createdAt: string;
}

export default MessageProps;
