import React from 'react';
import Image from 'next/image';

function Smallcard(props) {
    return (
        <div className='flex items-center m-2 mt-5 space-x-4 rounded-xl cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-500 hover:scale-105 transition transform duration-200 ease-out'>
            <div className='relative h-16 w-16'>
                <Image src={props.image} layout="fill" className='rounded-lg' alt=""/> {/*Layout fill the parent} */}
            </div>
            <div>
                <h2 className='dark:text-white font-medium'>{props.name}</h2>
                <h3 className='text-gray-500 dark:text-gray-200'>{props.time + " hr Time To Travel"}</h3>
            </div>
        </div>
    )
}

export default Smallcard
