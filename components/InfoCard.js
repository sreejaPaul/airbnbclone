import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { HeartIcon } from '@heroicons/react/outline';
import { StarIcon } from '@heroicons/react/solid';

function InfoCard({ img, location, title, description, star, price, total, resultClick, res }) {
    
    function removeTags(str) {
        if ((str===null) || (str===''))
            return false;
        else
            str = str.toString();
              
        // Regular expression to identify HTML tags in 
        // the input string. Replacing the identified 
        // HTML tag with a null string.
        return str.replace( /(<([^>]+)>)/ig, '');
    }
    return (
        <div className='flex py-7 px-2 pr-4 border-b cursor-pointer hover:opacity-80 hover:shadow-lg transition duration-200 ease-out first:border-t dark:hover:bg-slate-900 dark:border-slate-900' onClick={() => resultClick(res)}>
            <div className='relative h-24 w-40 md:h-52 md:w-80'> {/* this div relative means image will be relative to this div */}
                <img src={img} layout="fill" className='rounded-2xl h-52 w-60' />
            </div>
            <div className='flex flex-col flex-grow pl-5'>
                <div className='flex justify-between'>
                    <p>{location}</p>
                    {/* <HeartIcon className='h-7 cursor-pointer' /> */}
                </div>
                <h4 className='text-xl'>{title}</h4>
                <div className='border-b w-10 pt-2' />
                <p className='pt-2 text-sm text-gray-500 flex-grow'>{removeTags(description)}</p>
                <div className='flex justify-between items-end pt-5'>
                    <p className='flex items-center'><StarIcon className='h-5 text-red-400' />{star}</p>
                    <div>
                        <p className='text-lg font-semibold pb-2 lg:text-2xl'>{"Rs. " + price + " / Night"}</p>
                        {/* <p className='text-right font-extralight'>{total}</p> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InfoCard
