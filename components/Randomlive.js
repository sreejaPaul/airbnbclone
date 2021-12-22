import React from 'react';
import {live} from '../data';
import MediumCard from './MediumCard';
import one from '../public/images/live/1.jpg';
import two from '../public/images/live/2.jpg';
import three from '../public/images/live/3.jpg';
import four from '../public/images/live/4.jpg';

function Randomlive() {
    const imageArr = [one, two, three, four];
    return (
        <div>
            <h2 className='text-4xl font-semibold py-8'>Live Anywhere</h2>
            <div className='flex space-x-4 overflow-scroll scrollbar-hide p-3 -ml-3'>
                {live.items.map((item, index)=><MediumCard key={index} title={item.title} image={imageArr[index]}/>)}
            </div>
            
            
        </div>
    )
}

export default Randomlive
