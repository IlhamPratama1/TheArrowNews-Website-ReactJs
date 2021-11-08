import React from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';

export default function NavbarDashboard({ children }) {
    const location = useLocation();

    function DashboardMenu({ pathname }) {
        if(location.pathname.includes(pathname)){
            return <Link to={`/admin/${pathname}`} className="font-mont font-bold text-md">{pathname}</Link>
        } else {
            return <Link to={`/admin/${pathname}`} className="font-mont font-bold text-md opacity-60">{pathname}</Link>
        }
    }

    return(
        <div className="h-screen grid grid-cols-1 lg:grid-cols-6">
            <div className="hidden lg:col-span-1 lg:block">
                <div className="h-full flex items-center">
                    <div className="m-auto space-y-6">
                        <div className="flex items-center space-x-4">
                            <img src='/static/icons/dashboard.svg' alt="dashboard" />
                            <DashboardMenu pathname="dashboard" />
                        </div>
                        <div className="flex items-center space-x-4">
                            <img src='/static/icons/paper.svg' alt="paper" />
                            <DashboardMenu pathname="posts" />
                        </div>
                        <div className="flex items-center space-x-4">
                            <img src='/static/icons/Group.svg' alt="dashboard" />
                            <DashboardMenu pathname="category" />
                        </div>
                        <div className="flex items-center space-x-4">
                            <img src='/static/icons/rss.svg' alt="dashboard" />
                            <DashboardMenu pathname="feed" />
                        </div>
                        <div className="flex items-center space-x-4">
                            <img src='/static/icons/Group-1.svg' alt="dashboard" />
                            <DashboardMenu pathname="profile" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="lg:col-span-5 lg:pt-10 lg:pr-16">
                {children}
            </div>
        </div>
    );
}