import React from 'react';
import {places} from '../data';
import Smallcard from './Smallcard';
import one from '../public/images/explore/1.jpg';
import two from '../public/images/explore/2.jpg';
import three from '../public/images/explore/3.jpg';
import four from '../public/images/explore/4.jpg';
import five from '../public/images/explore/5.jpg';
import six from '../public/images/explore/6.jpg';
import seven from '../public/images/explore/7.jpg';
import eight from '../public/images/explore/8.jpg';

function Explore() {
    const imageArr = [one, two, three, four, five, six, seven, eight];
    return (
        <div>
            <h2 className='text-4xl font-semibold pb-5 dark:text-white'>Explore Nearby</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                {places?.map((item, index)=><Smallcard key={index} image={imageArr[index]} name={item.name} description={item.description}/>)}
            </div>
            
        </div>
    )
}

export default Explore;
