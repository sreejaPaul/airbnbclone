import React from 'react';
import Image from 'next/image';

function MediumCard(props) {
    return (
        <div className='cursor-pointer hover:scale-105 transform transition duration-300 ease-out'>
            <div className='relative h-80 w-80'>
                <Image src={props.image} layout='fill' className='rounded-xl' alt=""/>
            </div>
            <h3 className='text-2xl mt-3 dark:text-white'>{props.title}</h3>
        </div>
    )
}

export default MediumCard
