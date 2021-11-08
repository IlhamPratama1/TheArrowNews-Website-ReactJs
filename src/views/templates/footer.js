import React from 'react';
import { useLocation } from 'react-router';


export default function Footer() {
    const location = useLocation();

    return(
        !location.pathname.includes('/admin') && !location.pathname.includes('logout') &&
        <div className="w-full bg-black lg:px-32">
            <div className="lg:flex p-12 justify-between space-y-10">
                <div className="lg:flex space-y-10 lg:space-x-16">
                    <img className="w-44 h-12" src="/static/images/logo.png" alt="logo" />
                    <div className="flex space-x-12">
                        <div className="space-y-4">
                            <h1 className="font-bold font-oswald uppercase text-yellow text-lg lg:text-2xl">About</h1>
                            <div className="text-white text-md lg:text-lg font-cooper uppercase space-y-1">
                                <p className="hover:underline">Contact</p>
                                <p className="hover:underline">About</p>
                                <p className="hover:underline">Disclaimer</p>
                                <p className="hover:underline">Team</p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <h1 className="font-bold font-oswald uppercase text-yellow text-lg lg:text-2xl">Social</h1>
                            <div className="text-white text-md lg:text-lg font-cooper uppercase space-y-1">
                                <p className="hover:underline">Facebook</p>
                                <p className="hover:underline">Twitter</p>
                                <p className="hover:underline">Instagram</p>
                                <p className="hover:underline">Reddit</p>
                            </div>
                        </div>
                    </div>
                </div>
                <form className="space-y-2">
                    <label className="text-white font-cooper uppercase font-bold text-md lg:text-lg">Subscribe now</label>
                    <input className="font-mont bg-black focus:outline-none focus:border-yellow-main w-full h-12 border" />
                    <br />
                    <button className="bg-yellow font-bold w-full py-2 text-black font-oswald uppercase">Send</button>
                </form>
            </div>
        </div>
    );
}