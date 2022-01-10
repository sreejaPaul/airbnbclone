import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useRouter } from 'next/router';
import { format } from 'date-fns';
import InfoCard from '../components/InfoCard';
import Map from '../components/Map';
import useCustomNotificationHandler from '../components/useCustomNotificationHandler';
import PageLoader from '../components/PageLoader';

function Search({ searchResults }) {
    const router = useRouter();
    console.log(searchResults)
    const { location, startDate, endDate, noOfAdults, noOfChild } = router.query;
    const formattedStartDate = format(new Date(startDate), "dd MMMM yy");
    const formattedEndDate = format(new Date(endDate), "dd MMMM yy");
    const range = `${formattedStartDate} - ${formattedEndDate}`;
    const [result, setResult] = useState({});
    const { setMessage, setMessageColor, CustomNotification } = useCustomNotificationHandler(2000);
    const [destination, setDestination] = useState({});
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [statusCode, setStatusCode] = useState(0);
    const apiLocation = location[0].toUpperCase() + location.substring(1, location.length);


    const resultClick = (res) => {
        setResult(res);
        setMessage("Check Out The Location In Map");
        setMessageColor("error");
    }
    useEffect(() => {
        setLoading(true);
        fetch("https://booking-com.p.rapidapi.com/v1/hotels/locations?name=" + apiLocation + "&locale=en-gb", {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "booking-com.p.rapidapi.com",
                "x-rapidapi-key": "7e11e1d102msh9927bf39e3eb830p1fb315jsn9e7a5b1c6c21"
            }
        })
            .then(res => {
                console.log(res.status)
                setStatusCode(prev => res.status);
                return res.json()
            })
            .then(response => {
                console.log(response);
                setDestination(response[0]);
            })
            .catch(err => {
                console.error(err);
            });
    }, [apiLocation])
    useEffect(() => {
        console.log(destination !== {})
        console.log(statusCode === 200)
        if (destination !== {}) {
            if (statusCode === 200) {
                fetch("https://booking-com.p.rapidapi.com/v1/hotels/search?room_number=1&order_by=popularity&filter_by_currency=INR&checkout_date=2022-07-02&checkin_date=2022-07-01&units=metric&adults_number=" + noOfAdults + "&dest_id=" + destination.dest_id + "&dest_type=" + destination.dest_type + "&locale=en-gb&children_number=" + (noOfChild > 2 ? noOfChild : 2) + "&children_ages=5%2C0&page_number=0&include_adjacency=true&categories_filter_ids=class%3A%3A2%2Cclass%3A%3A4%2Cfree_cancellation%3A%3A1", {
                    "method": "GET",
                    "headers": {
                        "x-rapidapi-host": "booking-com.p.rapidapi.com",
                        "x-rapidapi-key": "7e11e1d102msh9927bf39e3eb830p1fb315jsn9e7a5b1c6c21"
                    }
                })
                    .then(res => res.json())
                    .then(response => {
                        console.log(response);
                        setHotels(response.result);
                        setLoading(false);
                    })
                    .catch(err => {
                        console.error(err);
                    });
            }else if(statusCode !== 0 && statusCode !==200){
                setHotels([]);
                setLoading(false);
                setMessage("Something Is Not Right. You Are Seeing Dummy Data!");
                setMessageColor("info");
            }
        } else {
            setHotels([]);
            setLoading(false);
            setMessage("Something Is Not Right. You Are Seeing Dummy Data!");
            setMessageColor("info");
        }
    }, [destination])

    return (
        <>
        {loading ? <PageLoader loading={loading}/> :
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
                        {(!loading) ? ((hotels !== undefined && hotels.length == 0) ?
                            searchResults.map((res) => (
                                <InfoCard key={res.img} res={res} img={res.img} location={res.location} title={res.title} description={res.description} star={res.star} price={res.price} total={res.total} resultClick={resultClick} />
                            )) :
                            (hotels !== undefined) ?

                                hotels.map((res) => (
                                    <InfoCard key={res.max_1440_photo_url} res={res} img={res.max_1440_photo_url} title={res.hotel_name} description={res.unit_configuration_label} star={res.review_score} price={parseInt(res.min_total_price)} resultClick={resultClick} />
                                ))
                                : ""
                        ) : "Loading Please Wait"

                        }
                    </div>
                </section>
                <section className='hidden xl:inline-flex xl:min-w-[600px]'>
                    {(hotels !== undefined && !loading) ?
                        <Map searchResults={searchResults} result={result} hotels={hotels} loading={loading} /> : ""}
                </section>
            </main>
            <Footer />
            <CustomNotification />
            {console.log(loading)}
        </div>
        }
        </>
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
