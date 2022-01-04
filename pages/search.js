import React, {useEffect, useState} from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useRouter } from 'next/router';
import { format } from 'date-fns';
import InfoCard from '../components/InfoCard';
import Map from '../components/Map';
import useCustomNotificationHandler from '../components/useCustomNotificationHandler';

function Search({ searchResults }) {
    const router = useRouter();
    console.log(searchResults)
    const { location, startDate, endDate, noOfAdults } = router.query;
    const formattedStartDate = format(new Date(startDate), "dd MMMM yy");
    const formattedEndDate = format(new Date(endDate), "dd MMMM yy");
    const range = `${formattedStartDate} - ${formattedEndDate}`;
    const [result, setResult] = useState({});
    const { setMessage, setMessageColor, CustomNotification } = useCustomNotificationHandler(1000);
    const resultClick = (res) =>{
        setResult(res);
        setMessage("Check Out The Location In Map");
        setMessageColor("error");
    }
    return (
        <div>
            <Header placeholder={`${location} | ${range} | ${noOfAdults} Adults`} />
            <main className='flex dark:bg-slate-700 dark:text-white'>
                <section className='flex-grow pt-14 px-6'>
                    <p className='text-xs'>300+ Stays - {range} - For {noOfAdults} Adults</p>
                    <h1 className='text-3xl font-semibold mt-2 mb-6'>Stays in {location}</h1>
                    <div className='hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap dark:text-white'>
                        <p className='button'>Cancelation</p>
                        <p className='button'>Types Of Place</p>
                        <p className='button'>Price</p>
                        <p className='button'>Rooms And Beds</p>
                        <p className='button'>More</p>
                    </div>
                    <div className='flex flex-col'>
                        {
                            searchResults.map((res) => (
                                <InfoCard key={res.img} res={res} img={res.img} location={res.location} title={res.title} description={res.description} star={res.star} price={res.price} total={res.total} resultClick={resultClick}/>
                            ))
                        }
                    </div>
                </section>
                <section className='hidden xl:inline-flex xl:min-w-[600px]'>
                    <Map searchResults={searchResults} result={result}/>
                </section>
            </main>
            <Footer />
            <CustomNotification/>
        </div>
    )
}

export default Search;

export async function getServerSideProps() {
    const searchResults = await fetch("https://jsonkeeper.com/b/5NPS").then((res) => res.json())
    return {
        props: {
            searchResults,
        }
    }

}
