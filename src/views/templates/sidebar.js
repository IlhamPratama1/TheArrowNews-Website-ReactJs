import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../auth';


export default function Sidebar({ sidebarOpen }) {
    const auth = useAuth();
    const history = useHistory();
    const [ searchData, setSearchData ] = useState('');

    function searchHandler(e) {
        setSearchData(e.target.value);
    }

    function submitSearchForm(e) {
        e.preventDefault();
        if(searchData !== '') {
            history.push(`/search/${searchData}`);
        }
    }

    return(
        <div className={`transition-all duration-500 top-0 left-0 bg-gray p-12 w-80 h-full fixed z-30 ${sidebarOpen ? 'left-0' : '-left-80'}`}>
            <div className="space-y-5 text-black">
                <h1 className="font-bold font-oswald uppercase text-3xl">Menu</h1>
                    <form className="flex items-center space-x-2">
                        <button onClick={e => submitSearchForm(e)} className="p-3 bg-gray"><img className="w-6 h-6" src="/static/icons/search.svg" alt="search" /></button>
                        <input value={searchData} onChange={e => searchHandler(e)} className="font-mont bg-gray focus:outline-none focus:border-yellow-main w-full h-12 border" />
                    </form>
                <p className="font-mont text-lg text-yellow font-bold uppercase">Category</p>
                <div className="font-cooper uppercase text-xl">
                    <Link to="/category/digital" className="hover:underline"><p className="py-1">Digital</p></Link>
                    <Link to="/category/education" className="hover:underline"><p className="py-1">Education</p></Link>
                    <Link to="/category/social" className="hover:underline"><p className="py-1">Social</p></Link>
                    <Link to="/category/politics" className="hover:underline"><p className="py-1">politics</p></Link>
                    <Link to="/category/nature" className="hover:underline"><p className="py-1">Nature</p></Link>
                    <Link to="/category/people" className="hover:underline"><p className="py-1">People</p></Link>
                </div>
                <p className="font-mont text-lg text-yellow font-bold uppercase">User</p>
                {auth.user ?
                <div className="space-y-4">
                    <Link to="/admin" className="font-cooper uppercase font-bold lg:text-xl cursor-pointer"><p style={{
                        'textDecoration': 'underline',
                        'textDecorationColor': '#FCA311',                            
                    }}>{localStorage.getItem('user_name')}</p></Link>
                    <br />
                    <Link to="/logout" className="font-oswald font-bold bg-yellow lg:text-xl px-6 py-2 lg:py-3 lg:px-10 cursor pointer">Logout</Link>
                </div> :
                <div className="space-y-4">
                    <Link to="/login" className="font-cooper uppercase font-bold lg:text-xl cursor-pointer"><p style={{
                        'textDecoration': 'underline',
                        'textDecorationColor': '#FCA311',                            
                    }}>Login</p></Link>
                    <br />
                    <Link to="/register" className="font-oswald font-bold bg-yellow px-6 py-2 lg:text-xl lg:py-3 lg:px-10 cursor pointer">Register</Link>
                </div>
                }
            </div>
        </div>
    );
}