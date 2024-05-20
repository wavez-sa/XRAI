import TypeEffect from './components/TypeEffect';
import Link from 'next/link';

const page = () => {
    return (
        <div
            className='flex h-screen flex-col items-center justify-center gap-4 '
            style={{
                backgroundImage:
                    'url("https://i.imgur.com/J8gHy6I.png")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}
        >
            <h1 className=' text-5xl font-bold uppercase text-white lg:text-7xl'>
                XRAI
            </h1>
            <TypeEffect />
            <Link
                href={'/sign-in'}
                className='rounded-md border border-transparent bg-primary px-12 py-2 pt-2 text-lg text-white duration-300 hover:border-primary hover:bg-opacity-0 lg:text-2xl'
            >
                Try Now
            </Link>
        </div>
    );
};

export default page;
