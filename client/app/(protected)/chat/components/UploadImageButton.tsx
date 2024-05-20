/* eslint-disable jsx-a11y/alt-text */
import { Image } from 'lucide-react';
import { MessageProps } from '@/app/types';
import { sendMessage } from '../actions';
import { set } from 'date-fns';

interface UploadImageButtonProps {
    addOptimisticMessage: (action: MessageProps) => void;
    clientToken: string;
    formRef: React.RefObject<HTMLFormElement>;
}

const UploadImageButton = ({
    addOptimisticMessage,
    clientToken,
    formRef
}: UploadImageButtonProps) => {
    async function uploadImage(
        e: React.ChangeEvent<HTMLInputElement>
    ) {
        const file = e.target.files && e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = async () => {
                addOptimisticMessage({
                    id: Date.now(),
                    content: reader.result as string,
                    author: clientToken,
                    type: 'IMAGE',
                    createdAt: new Date().toISOString()
                });
                await sendMessage({
                    image: reader.result as string
                });
            };
            reader.readAsDataURL(file);
        }
    }

    return (
        <>
            <label
                htmlFor='uploadFile'
                className='grid h-full w-10 place-content-center'
            >
                <Image className='text-slate-900'/>
            </label>
            <input
                onChange={uploadImage}
                name='image'
                type='file'
                accept='image/*'
                id='uploadFile'
                className='hidden'
            ></input>
        </>
    );
};

export default UploadImageButton;
