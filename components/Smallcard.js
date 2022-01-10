import React , {useState} from 'react';
import Image from 'next/image';
import {useRouter} from 'next/router';

function Smallcard(props) {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const router = useRouter();
    
    const searchPlace = (place)=>{
        console.log(place);
        router.push({
            pathname: "/search",
            query: {
                location: place,
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString(),
                noOfAdults: 1,
                noOfChild: 2
            }
        });
    }
    return (
        <div className='flex items-center m-2 mt-5 space-x-4 rounded-xl cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-500 hover:scale-105 transition transform duration-200 ease-out' onClick={()=>searchPlace(props.name)}>
            <div className='relative h-16 w-16'>
                <Image src={props.image} layout="fill" className='rounded-lg' alt=""/> {/*Layout fill the parent} */}
            </div>
            <div>
                <h2 className='dark:text-white font-medium'>{props.name}</h2>
                <h3 className='text-gray-500 dark:text-gray-200'>{props.description}</h3>
            </div>
        </div>
    )
}

export default Smallcard
