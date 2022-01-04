import React from 'react'

function Footer() {
    return (
        <div className='grid grid-cols-1 md: grid-cols-4 gap-y-10 px-32 py-14 bg-gray-100 text-gray-600 dark:bg-gray-700 '>
            <div className='space-y-4 text-xs text-gray-800 dark:text-white'>
                <h5 className='font-bold'>ABOUT</h5>
                <p>How Airbnb works</p>
                <p>Newsroom</p>
                <p>Airbnb 2021</p>
                <p>Investors</p>
                <p>Airbnb Plus</p>
                <p>Airbnb Luxe</p>
            </div>
            <div className='space-y-4 text-xs text-gray-800 dark:text-white'>
                <h5 className='font-bold'>COMMUNITY</h5>
                <p>Accessebility</p>
                <p>{"Diversity & Belonging"}</p>
                <p>Airbnb Associates</p>
                <p>Frontline Stays</p>
                <p>Guest Referrals</p>
                <p>Airbnb.org</p>
            </div>
            <div className='space-y-4 text-xs text-gray-800 dark:text-white'>
                <h5 className='font-bold'>HOST</h5>
                <p>Host your home</p>
                <p>Host an Online Experience</p>
                <p>Host an Experience</p>
                <p>Responsible hosting</p>
                <p>Resource Centre</p>
                <p>Community Centre</p>
            </div>
            <div className='space-y-4 text-xs text-gray-800 dark:text-white'>
                <h5 className='font-bold'>SUPPORT</h5>
                <p>Help Centre</p>
                <p>Neighbourhood Support</p>
                <p>Cancellation options</p>
                <p>{"Trust & Safety"}</p>
                
            </div>
        </div>
    )
}

export default Footer
