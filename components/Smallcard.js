import React from 'react';
import Image from 'next/image';

function Smallcard(props) {
    return (
        <div className='flex items-center m-2 mt-5 space-x-4 rounded-xl cursor-pointer hover:bg-gray-100 hover:scale-105 transition transform duration-200 ease-out'>
            <div className='relative h-16 w-16'>
                <Image src={props.image} layout="fill" className='rounded-lg'/> {/*Layout fill the parent} */}
            </div>
            <div>
                <h2>{props.name}</h2>
                <h3 className='text-gray-500'>{props.time}</h3>
            </div>
        </div>
    )
}

export default Smallcard
