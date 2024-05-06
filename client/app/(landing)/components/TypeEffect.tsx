'use client';
import Typewriter from 'typewriter-effect';

const TypeEffect = () => {
    return (
        <div className='flex items-center justify-center space-x-2 text-xl font-bold uppercase text-white lg:text-3xl'>
            <h1 className='animate__animated animate__backInUp'>
                Pixels To
            </h1>
            <h1 className='animate__animated  animate__backInUp text-[#01e4b2]'>
                <Typewriter
                    onInit={typewriter => {
                        typewriter
                            .typeString('PRECISION')
                            .pauseFor(1500)
                            .deleteChars(10)
                            .typeString('Perfection')
                            .pauseFor(1500)
                            .deleteChars(10)
                            .typeString('Detection')
                            .pauseFor(1500)
                            .start();
                    }}
                    options={{
                        loop: true
                    }}
                />
            </h1>
        </div>
    );
};

export default TypeEffect;
