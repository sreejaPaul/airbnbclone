import React, { useState, useEffect, useRef } from 'react';
import Image from "next/image";
import { SearchIcon, GlobeAltIcon, MenuIcon, UserCircleIcon, UserIcon , SunIcon, MoonIcon} from '@heroicons/react/solid';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import useCustomNotificationHandler from './useCustomNotificationHandler';
import styled from "styled-components";

function Header({ placeholder }) {
    const [searchInput, setSearchInput] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [noOfAdults, setNoOfAdults] = useState(1);
    const [noOfChild, setNoOfChild] = useState(0);
    const router = useRouter();
    const [searchFocus, setSearchFocus] = useState(false);
    const [darkIcon, setDarkIcon] = useState(true);
    const placeRef = useRef(null);
    const { theme, setTheme } = useTheme();
    const { setMessage, setMessageColor, CustomNotification } = useCustomNotificationHandler(1000);
    

    const selectionRange = {
        startDate: startDate,
        endDate: endDate,
        key: 'selection',
    };
    const handleSelect = (ranges) => {
        setStartDate(ranges.selection.startDate);
        setEndDate(ranges.selection.endDate);
    }
    const resetInput = () => {
        setSearchInput("");
        setSearchFocus(false);
    }
    const search = () => {
        if (searchInput && (noOfAdults || noOfChild)) {
            setSearchFocus(false);
            router.push({
                pathname: "/search",
                query: {
                    location: searchInput,
                    startDate: startDate.toISOString(),
                    endDate: endDate.toISOString(),
                    noOfAdults,
                    noOfChild
                }
            });
        } else {
            setMessage("Insert All Fields To Proceed!");
            setMessageColor("error");
        }
    }
    const themeToggle = ()=>{
        setDarkIcon(!darkIcon)
        // console.log("click " + dark)
        // setMode(!dark);
        setTheme(theme === 'light' ? 'dark' : 'light');
    }
    useEffect(() => {
        if (searchFocus) {
            placeRef.current.focus();
        }
    }, [searchFocus])

    // useEffect(() => {
    //     localStorage.setItem("mode",JSON.stringify(dark))
    // }, [dark])

    return (
        <header className="sticky top-0 z-50 grid grid-cols-6 gap-4 bg-white shadow-md p-5 md:px-10 dark:bg-slate-700" >

            <div className="relative flex items-center h-10 cursor-pointer" onClick={() => router.push("/")}>
                <Image src="https://news.airbnb.com/wp-content/uploads/sites/4/2017/01/airbnb_vertical_lockup_web.png?fit=451%2C493"
                    layout="fill" objectFit="contain" objectPosition="left" alt="" />
                {/* <img src="" alt=""/> */}
                {/* Next js image tag does compression and turn that image in webP */}
            </div>
            <div className="flex items-center md:border-2 rounded-full py-2 md:shadow-lg bg-gray-50 col-start-2 col-span-4 max-w-xl ml-36 dark:bg-slate-700 dark:border-2 dark:border-slate-900" style={{ display: searchFocus ? "none" : "block" }}>
                <input placeholder={placeholder || "Start Your Search"} onFocus={() => setSearchFocus(true)} className="flex-grow pl-6 bg-transparent outline-none text-sm text-gray-600 placeholder:text-gray-400 m-2 placeholder:font-semibold w-9/12" />
                <button className='bg-gray-50 p-0.5 outline-none  rounded-full border-2 mr-2 float-right border-gray-50 hover:border-2 dark:bg-slate-700 dark:border-slate-700 dark:hover:border-red-400 hover:border-red-400 hover:rounded-full' onClick={() => setSearchFocus(true)} >
                    <SearchIcon className="hidden md:inline-flex h-8 bg-red-400 text-white rounded-full p-2 cursor-pointer" />
                </button>
            </div>
            <div style={{ display: searchFocus ? "block" : "none" }} className="col-start-2 col-span-4 flex items-center md:border-2 rounded-full md:shadow-lg bg-gray-50  pl-1 outline-none text-sm text-gray-600 placeholder-gray-400 max-w-2xl ml-36 mr-10 dark:bg-slate-700 dark:border-slate-900 dark:text-white ">
                
                <div className='flex-cl w-1/5 rounded-full inline-block pt-2 pb-2 relative mr-1 ml-2'>
                    {/* <label className='pl-3 mb-1'>Location</label> */}
                    <input ref={placeRef} value={searchInput} onChange={(e) => setSearchInput(e.target.value)} type="text" placeholder='Where Are You Going ?' className="text-ellipsis w-full rounded-full p-3 bg-gray-50 hover:bg-gray-200 focus:bg-gray-200 outline-none pt-7 font-semibold dark:bg-slate-900 dark:hover:bg-slate-800" />
                    <span className='invisible xl:visible absolute p-2 -ml-32 -mt-41 '>Location</span>    
                </div>
                <span className='h-4/5 border-l-2 border-gray-200 dark:border-slate-900'></span>
                <div className='flex-cl w-1/5 rounded-full inline-block relative mr-1 ml-1'>
                    <input disabled value={startDate} placeholder='Check-In' className="text-ellipsis w-full rounded-full p-3 bg-gray-50 hover:bg-gray-200 pt-7 font-semibold  dark:bg-slate-900 dark:hover:bg-slate-800" />
                    <span className='invisible xl:visible absolute p-2 -ml-32 -mt-41'>Check-In</span>
                </div>
                <span className='h-4/5 border-l-2 border-gray-200 dark:border-slate-900'></span>
                <div className='flex-cl w-1/5 rounded-full inline-block relative mr-1 ml-1'>
                    <input disabled value={endDate} placeholder='Check-Out' className="text-ellipsis w-full rounded-full p-3 bg-gray-50 hover:bg-gray-200 pt-7 font-semibold  dark:bg-slate-900 dark:hover:bg-slate-800" />
                    <span className='invisible xl:visible absolute p-2 -ml-32 -mt-41'>Check-Out</span>
                </div>
                <span className='h-4/5 border-l-2 border-gray-200  dark:border-slate-900'></span>
                <div className='flex-cl w-1/5 rounded-full inline-block relative mr-1 ml-1'>
                    <input disabled value={(noOfAdults && noOfChild) ? parseInt(noOfAdults) + parseInt(noOfChild) + " Guests" : (!noOfAdults && !noOfChild) ? "" : (noOfAdults && !noOfChild) ? noOfAdults + " Guests" : noOfChild + " Guests"} placeholder='Add Guests' className="text-ellipsis w-full rounded-full p-3 bg-gray-50 hover:bg-gray-200 pt-7 font-semibold  dark:bg-slate-900 dark:hover:bg-slate-800" />
                    <span className='invisible xl:visible absolute p-2 -ml-32 -mt-41'>Guests</span>
                </div>
                <button className='bg-gray-50 p-0.5 outline-none float-right rounded-full mr-10 mt-4 border-2 border-gray-50 hover:border-2 dark:bg-slate-700 dark:border-slate-700 dark:hover:border-red-400 hover:border-red-400 hover:rounded-full' onClick={search} >
                    <SearchIcon className="hidden lg:inline-flex h-8 bg-red-400 text-white rounded-full p-2 cursor-pointer" />
                </button>
                
            </div>
            <div className="flex items-center space-x-4 justify-end text-gray-500">
                {/* <p className="hidden md:inline cursor-pointer">Become a host</p>
                <GlobeAltIcon className="h-6" /> */}
                <div className="flex items-center space-x-2 border-2 p-2 rounded-full cursor-pointer dark:border-slate-900" onClick={themeToggle}>
                    {!darkIcon ? <SunIcon className='h-6 dark:text-white'/> : <MoonIcon className="h-6" />}
                </div>
            </div>
            {searchFocus &&
                <div className='flex flex-col col-span-6 mx-auto mt-6 max-h-[560px] overflow-auto scrollbar-hide'>
                    <h1 className='text-xl flex-grow font-semibold border-b pb-2 mb-4 dark:text-white'>{"Pick Check-in & Check-out dates"}</h1>
                    <Container>
                    <DateRangePicker
                        ranges={[selectionRange]}
                        minDate={new Date()}//this deisables past dates
                        rangeColors={["#FD5B61"]}
                        onChange={handleSelect}
                    />
                    </Container>
                    <div className=' items-center'>
                        <h2 className='text-xl font-semibold border-b mb-4 dark:text-white'>
                            <div className='flex'>
                                <div>Add Guests Here</div>
                                <div><UserIcon className='h-6 pl-3 pt-1' /></div>
                            </div>
                        </h2>
                        <div className='flex'>
                            <div className='flex-grow'>
                                <span className='text-lg font-semibold dark:text-white'>Adults</span>
                                <input type="number" className='w-12 pl-3 ml-3 text-lg outline-none text-red-400 bg-gray-200 rounded-full dark:bg-slate-900' min={1} value={noOfAdults} onChange={(e) => setNoOfAdults(e.target.value)} />
                            </div>
                            <div>
                                <span className='text-lg font-semibold dark:text-white'>Children</span>
                                <input type="number" className='w-12 pl-3 ml-3 text-lg outline-none text-red-400 bg-gray-200 rounded-full dark:bg-slate-900 ' min={0} value={noOfChild} onChange={(e) => setNoOfChild(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <div className='flex mt-5'>
                        <button className='flex-grow p-1 text-gray-500 rounded-full active:bg-gray-200 active:border-gray-500 hover:bg-gray-200 hover:border-gray-500' onClick={resetInput}>Close</button>
                        <span className='text-gray-300'>|</span>
                        <button className='flex-grow p-1 text-red-400 rounded-full active:bg-red-200 active:border-red-400 hover:bg-red-200 hover:border-red-400 ' onClick={search}>Search</button>
                    </div>
                </div>
            }
            <CustomNotification/>
        </header>
    )
}

export default Header;
const Container = styled.div`
  
  top: 0;
}
  
  .rdrDateRangePickerWrapper {
    display: flex;
    justify-content: space-between;
  }
  .rdrDateDisplayWrapper {
    background: none;
  }
  .rdrDayDisabled {
    background-color: var(--gray);
  }
  .rdrDateDisplayItem {
    border-radius: 99px;
    background-color: var(--gray);
    input {
      color: var(--black);
    }
  }
  .rdrDefinedRangesWrapper {
    border: none;
    border-radius: 1rem;
  }
  .rdrCalendarWrapper {
    background: none;
    color: var(--black);
  }
  .rdrStaticRange {
    border: none;
    background: none;
    &:hover,
    &:focus {
      .rdrStaticRangeLabel {
        background: var(--gray);
      }
    }
  }
  .rdrDefinedRangesWrapper {
    margin-right: 1.5rem;
    // padding-top: 0.75rem;
    background: var(--light);
  }
  .rdrDayNumber span {
    color: var(--dark);
  }
  .rdrDayPassive .rdrDayNumber span {
    color: var(--dark);
    opacity: 0.33;
  }
  .rdrDayToday .rdrDayNumber span:after {
    background: var(--red);
  }
  @media (max-width: 36rem) {
    padding-top: 7.5rem;
    overflow: scroll;
    height: 100vh;
    .rdrCalendarWrapper {
      font-size: 11px;
    }
    .inner {
      height: 100%;
      max-height: unset;
      overflow: scroll;
      padding-bottom: 10rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: fit-content;
    }
    h4 {
      width: 100%;
    }
    .close {
      top: auto;
      bottom: -3.5rem;
      right: 0;
      margin: 0 auto;
      display: block;
      position: relative;
    }
    .inputs {
      flex-direction: column;
      gap: 1rem;
    }
  }
  @media (min-width: 48rem) {
    .rdrDefinedRangesWrapper {
      font-size: 16px;
    }
    .rdrCalendarWrapper {
      font-size: 16px;
    }
  }
  @media (min-width: 36rem) and (max-width: 48rem) {
    .rdrCalendarWrapper {
      margin: 0 auto;
    }
  }
`;
