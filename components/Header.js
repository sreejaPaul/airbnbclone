import React, { useState, useEffect } from 'react';
import Image from "next/image";
import { SearchIcon, GlobeAltIcon, MenuIcon, UserCircleIcon, UserIcon } from '@heroicons/react/solid';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import { useRouter } from 'next/router';

function Header({placeholder}) {
    const [searchInput, setSearchInput] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [noOfAdults, setNoOfAdults] = useState(1);
    const router = useRouter();

    const selectionRange = {
        startDate: startDate,
        endDate: endDate,
        key: 'selection',
      };
    const handleSelect = (ranges)=>{
        setStartDate(ranges.selection.startDate);
        setEndDate(ranges.selection.endDate);
    }
    const resetInput = ()=>{
        setSearchInput("");
    }
    const search = () => {
        router.push({
            pathname: "/search",
            query:{
                location: searchInput,
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString(),
                noOfAdults,
            }
        });
    }
    return (
        <header className="sticky top-0 z-50 grid grid-cols-3 bg-white shadow-md p-5 md:px-10">

            <div className="relative flex items-center h-10 cursor-pointer" onClick={()=>router.push("/")}>
                <Image src="https://news.airbnb.com/wp-content/uploads/sites/4/2017/01/airbnb_vertical_lockup_web.png?fit=451%2C493"
                    layout="fill" objectFit="contain" objectPosition="left" alt="" />
                {/* <img src="" alt=""/> */}
                {/* Next js image tag does compression and turn that image in webP */}
            </div>
            <div className="flex items-center md:border-2 rounded-full py-2 md:shadow-lg">
                <input value={searchInput} onChange={(e) => setSearchInput(e.target.value)} type="text" placeholder= {placeholder || "Start Your Search"} className="flex-grow pl-5 bg-transparent outline-none text-sm text-gray-600 placeholder-gray-400" />
                <SearchIcon className="hidden md:inline-flex h-8 bg-red-400 text-white rounded-full p-2 cursor-pointer md:mx-2" />

            </div>
            <div className="flex items-center space-x-4 justify-end text-gray-500">
                <p className="hidden md:inline cursor-pointer">Become a host</p>
                <GlobeAltIcon className="h-6" />
                <div className="flex items-center space-x-2 border-2 p-2 rounded-full">
                    <MenuIcon className="h-6" />
                    <UserCircleIcon className="h-6" />
                </div>
            </div>
            {searchInput &&
                <div className='flex flex-col col-span-3 mx-auto'>
                    <DateRangePicker
                        ranges={[selectionRange]}
                        minDate={new Date()}//this deisables past dates
                        rangeColors={["#FD5B61"]}
                        onChange={handleSelect}
                    />
                    <div className='flex items-center border-b mb-4'>
                        <h2 className='text-2xl flex-grow font-semibold'>Number Of Guests</h2>
                        <UserIcon className='h-5'/>
                        <input type="number" className='w-12 pl-2 text-lg outline-none text-red-400' min={1} value={noOfAdults} onChange={(e)=>setNoOfAdults(e.target.value)}/>
                    </div>
                    <div className='flex'>
                        <button className='flex-grow text-gray-500' onClick={resetInput}>Cancel</button>
                        <button className='flex-grow text-red-400' onClick={search}>Search</button>
                    </div>
                </div>
            }
        </header>
    )
}

export default Header
