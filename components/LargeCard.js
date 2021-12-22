import React from 'react';
import host from '../public/images/host.jpg';
import Image from 'next/image';

function LargeCard() {
    return (
        <div className='relative py-16 cursor-pointer'>
            <div className='relative h-96 min-w-[300px]'>
                <Image src={host} layout='fill' objectFit='cover' className='rounded-2xl'/>
            </div>
            <div className='absolute top-32 left-12 w-48 '>
                <h3 className='text-4xl mb-3 w-64 text-white'>Try hosting</h3>
                <p className='text-white'>Earn extra income and unlock new oppurtunities by sharing your space.</p>
            </div>
        </div>
    )
}

export default LargeCard
