import React from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';


export default function Navbar({ handleSidebar }) {
    const location = useLocation();
    
    function CheckLogo() {
        if(location.pathname.includes('/admin')) {
            return <Link className="w-7/12" to="/"><img  src="/static/images/logo2.png" alt="logo" /></Link>
        } else {
            return <Link className="w-7/12" to="/"><img  src="/static/images/logo.png" alt="logo" /></Link>
        }
    }

    function CheckPath() {
        if(location.pathname === '/login' || location.pathname === '/register' || location.pathname.includes('/admin')) {
            return <Link className="w-6/12 lg:w-7/12" to="/"><img src="/static/icons/ham.svg" alt="logo" /></Link>
        } else {
            return <button onClick={handleSidebar} className="w-5/12 lg:w-7/12"><img src="/static/images/ham.png" alt="logo" /></button>
        }
    }

    return(
        !location.pathname.includes('/logout') &&
        <div className="py-9 px-4 lg:px-8">
            <div className="flex justify-between">
                <div className="flex">
                    <CheckLogo />
                </div>
                <div className="flex items-center justify-end">
                    <CheckPath />
                </div>
            </div>                    
        </div>
    );
}