import Image from "next/image";
import {SearchIcon, GlobeAltIcon, MenuIcon, UserCircleIcon, UserIcon} from '@heroicons/react/solid';

function Header() {
    return (
        <header className="sticky top-0 z-50 grid grid-cols-3 bg-white shadow-md p-5 md:px-10">
            
            <div className="relative flex items-center h-10 cursor-pointer">
                <Image src="https://news.airbnb.com/wp-content/uploads/sites/4/2017/01/airbnb_vertical_lockup_web.png?fit=451%2C493" 
                layout="fill" objectFit="contain" objectPosition="left"/>
                {/* <img src="" alt=""/> */}
                {/* Next js image tag does compression and turn that image in webP */}
            </div>
            <div className="flex items-center md:border-2 rounded-full py-2 md:shadow-lg">
                <input type="text" placeholder="Start Your Search" className="flex-grow pl-5 bg-transparent outline-none text-sm text-gray-600 placeholder-gray-400"/>
                <SearchIcon className="hidden md:inline-flex h-8 bg-red-400 text-white rounded-full p-2 cursor-pointer md:mx-2" />
                
            </div>
            <div className="flex items-center space-x-4 justify-end text-gray-500">
                <p className="hidden md:inline cursor-pointer">Become a host</p>
                <GlobeAltIcon className="h-6"/>
                <div className="flex items-center space-x-2 border-2 p-2 rounded-full">
                    <MenuIcon className="h-6"/>
                    <UserCircleIcon className="h-6"/>
                </div>
            </div>
        </header>
    )
}

export default Header
