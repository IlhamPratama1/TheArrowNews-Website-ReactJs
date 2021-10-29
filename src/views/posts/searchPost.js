import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../templates/navbar';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../axios';
import LandCard from './cards/landCard';
import LandCardSkeleton from './skeleton/landCardSkeleton';

export default function SearchPost() {
    const { slug } = useParams();
    const [ posts, setPosts ] = useState({ isLoading: true, data: [], length: 5 });
    const [ pageIndex, setPageIndex ] = useState(1);
    const [ count, setCount ] = useState(0);

    const fetchData = useCallback(async () => {
        try {
            const response = await axiosInstance.get(`search/?p=${pageIndex}&search=${slug}`);
            if (response.status === 200) {
                setCount(response.data.count);
                setPosts({
                    isLoading: false,
                    data: response.data.results,
                    length: 5
                });
            }
        } catch (error) {
            throw error;
        }
    }, [pageIndex, slug]);

    function ChangePage(index) {
        if(index !== pageIndex) {
            setPageIndex(index);
            window.scrollTo(0, 125);
        }
    }

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil( count / posts.length ); i++) {
        pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
        return (
            pageIndex === number ?
            <button onClick={() => ChangePage(number)} key={number} id={number} className="px-5 py-3 bg-blue text-white text-md font-oswald font-bold uppercase">
                {number}
            </button>
            : 
            <button onClick={() => ChangePage(number)} key={number} id={number} className="border border-blue px-5 py-3 text-blue text-md font-oswald font-bold uppercase">
                {number}
            </button>
        )
    });

    return(
        <div className="mb-40 ">
            <div className="h-lg w-full absolute z-10">
                <Navbar />
                <div className="h-2/6 flex items-end px-8 lg:px-32">
                    <div className="w-44r space-y-3">
                        <Link to="/" className="text-xs	uppercase py-2 px-2 bg-yellow font-mont font-bold">search</Link>
                        <h1 className="text-4xl uppercase font-oswald font-bold text-white">{slug}</h1>
                    </div>
                </div>
            </div>
            <Link to={"/"}><img style={{filter: `brightness(50%)`}} className="object-cover h-lg w-full" src="/static/images/pexels-markus-winkler-4160060.jpg" alt="logo" /></Link>
            <div className="px-6 space-y-10 lg:px-32">
                <div className="grid grid-cols-1 lg:grid-cols-5 lg:gap-x-8">
                    <div className="col-span-4 space-y-6 mb-12">
                        <div className="pt-8 flex items-center space-x-4">
                            <h1 className="uppercase font-bold font-oswald text-2xl">Result</h1>
                            <div className="w-full h-2 bg-blue lg:w-60"></div>
                        </div>                        
                        { posts.isLoading ?
                            <div className="space-y-3">
                                <LandCardSkeleton />
                                <LandCardSkeleton />
                                <LandCardSkeleton />
                            </div> :
                            posts.data.length > 0 ? 
                                posts.data.map((post) => {
                                    return(
                                        <LandCard
                                            key={post.id}
                                            image={post.image}
                                            category={post.category_name}
                                            title={post.title}
                                            author={post.author_name}
                                            excerpt={post.excerpt}
                                            views={post.views}
                                            likes={post.likes}
                                            comments={post.comments}
                                            slug={post.slug}
                                            profile={post.author_image}
                                        />
                                    );
                                }) : <h1 className="font-oswald text-black text-xl uppercase">Post in this category is empty</h1>
                        }
                    </div>
                </div>
                <div className="space-x-3">
                    {pageIndex - 1 > 0 ?
                        <button onClick={() => ChangePage(pageIndex - 1)} className="border border-blue px-5 py-3 text-blue text-md font-oswald font-bold uppercase">
                            prev
                        </button> : null
                    }
                    {renderPageNumbers}
                    {pageIndex + 1 <= pageNumbers.length ?
                        <button onClick={() => ChangePage(pageIndex + 1)} className="border border-blue px-5 py-3 text-blue text-md font-oswald font-bold uppercase">
                            next
                        </button> : null
                    }
                </div>
            </div>
        </div>
    );
}