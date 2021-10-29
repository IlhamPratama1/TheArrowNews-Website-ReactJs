import React, { useEffect, useState, useCallback } from 'react';
import { Link } from "react-router-dom";
import axiosInstance from '../../axios';
import MiniCard from '../posts/cards/miniCard';
import LandCard from '../posts/cards/landCard';
import { useAuth } from '../../auth';
import InfiniteScroll from 'react-infinite-scroll-component';
import LandCardSkeleton from '../posts/skeleton/landCardSkeleton';
import MiniCardSkeleton from '../posts/skeleton/miniCardSkeleton';


export default function HomeIndex() {
    const auth = useAuth();

    const [ posts, setPosts ] = useState({ isLoading: true, data: [], length: 5 });
    const [ topPosts, setTopPosts ] = useState({ isLoading: true, data: [], length: 5 });
    const [ pageIndex, setPageIndex ] = useState(1);
    const [ hasMore, setHasMore ] = useState(true);
    const [ imageLoaded, setImageLoaded ] = useState(false);

    const fetchData = useCallback(async () => {
        try {
            const response = await axiosInstance.get();
            let prevArr = [...posts.data];
            let newArr = prevArr.concat(response.data.results);
            if (response.status === 200) {
                setPosts({
                    isLoading: false,
                    data: newArr,
                    length: response.data.results.length
                });
                if(response.data.next !== null) {
                    setPageIndex(pageIndex + 1);
                    setHasMore(true);
                } else {
                    setHasMore(false);
                }
            }
        } catch (error) {
            throw error;
        }
    }, [posts.data, pageIndex]);

    const fetchTopPosts = useCallback(async () => {
        try {
            const response = await axiosInstance.get('posts/top/');
            if (response.status === 200) {
                setTopPosts({
                    isLoading: false,
                    data: response.data.results,
                    length: response.data.results.length
                });
            }
        } catch (error) {
            throw error;
        }
    }, []);
    
    function fetchNextData() {
        axiosInstance.get(`?p=${pageIndex}`)
        .then(function(response) {
            let prevArr = [...posts.data];
            let newArr = prevArr.concat(response.data.results);
            setPosts({
                isLoading: false,
                data: newArr,
                length: newArr.length
            });
            if (response.data.next !== null){
                setPageIndex(pageIndex + 1);
                setHasMore(true);
            } else {
                setHasMore(false);
            }
            console.log(pageIndex);
            console.log(hasMore);
        })
    }
    
    useEffect(() => {
        if(posts.isLoading && topPosts.isLoading){
            fetchData();
            fetchTopPosts();
        }
    }, [fetchData, fetchTopPosts, posts.isLoading, topPosts.isLoading]);

    function handleImageLoaded() {
        setImageLoaded(true);
    }

    const imageStyle = !imageLoaded ? "hidden" : "object-cover h-xl w-full";

    return(
        <div className="mb-40 ">
            <div className="h-xl w-full absolute z-10">
                <div className="h-5/6 flex items-end py-3 px-8 lg:px-32">
                    <div className="w-44r space-y-3">
                        <Link to="/" className="text-xs	uppercase py-2 px-2 bg-yellow font-mont font-bold">media</Link>
                        <h1 className="text-4xl uppercase font-oswald font-bold text-white">FACEBOOK STORIES: SOCIAL MEDIA FIRM LAUNCHES RAY-BAN SMART GLASSES</h1>
                    </div>
                </div>
            </div>
            {!imageLoaded && 
                <div className="bg-gray animate-pulse object-cover h-xl w-full"></div>
            }
            <Link to={"/"}><img style={{filter: `brightness(50%)`}} onLoad={handleImageLoaded} className={imageStyle} src="/static/images/pexels-markus-winkler-4160060.jpg" alt="logo" /></Link>
            <div className="px-6 space-y-10 lg:px-32">

                <div className="flex justify-between">
                    <div className="flex">
                        <Link to="/category/digital" className="font-mont font-semibold bg-gray text-sm py-4 px-2 lg:text-lg lg:py-7 lg:px-8">Digital</Link>
                        <Link to="/category/education" className="font-mont font-semibold bg-gray text-sm py-4 px-2 lg:text-lg lg:py-7 lg:px-8">Education</Link>
                        <Link to="/category/social" className="font-mont font-semibold bg-gray text-sm py-4 px-2 lg:text-lg lg:py-7 lg:px-8">Social</Link>
                        <Link to="/category/politics" className="font-mont font-semibold bg-gray text-sm py-4 px-2 lg:text-lg lg:py-7 lg:px-8">politics</Link>
                        <Link to="/category/nature" className="font-mont font-semibold bg-gray text-sm py-4 px-2 lg:text-lg lg:py-7 lg:px-8">Nature</Link>
                        <Link to="/category/people" className="font-mont font-semibold bg-gray text-sm py-4 px-2 lg:text-lg lg:py-7 lg:px-8">People</Link>
                    </div>
                    {auth.user ?
                    <div className="invisible flex items-center lg:visible">
                        <Link to="/admin" className="font-oswald font-bold lg:text-2xl lg:px-10 cursor-pointer"><p style={{
                            'textDecoration': 'underline',
                            'textDecorationColor': '#FCA311',                            
                            }}>{localStorage.getItem('user_name')}</p></Link>
                        <Link to="/logout" className="font-oswald font-bold bg-yellow lg:text-2xl lg:py-7 lg:px-10 cursor pointer">Logout</Link>
                    </div>
                    :
                    <div className="invisible flex items-center lg:visible">
                        <Link to="/login" className="font-oswald font-bold lg:text-2xl lg:px-10 cursor-pointer"><p style={{
                            'textDecoration': 'underline',
                            'textDecorationColor': '#FCA311',                            
                            }}>Login</p></Link>
                        <Link to="/register" className="font-oswald font-bold bg-yellow lg:text-2xl lg:py-7 lg:px-10 cursor pointer">Register</Link>
                    </div>
                    }
                </div> 

                <div className="grid grid-cols-1 lg:grid-cols-5 lg:gap-x-8">
                    <div className="col-span-4 space-y-6 mb-12">
                        <div className="flex items-center space-x-4">
                            <h1 className="uppercase font-bold font-oswald text-2xl">Headline</h1>
                            <div className="w-full lg:w-headl h-2 bg-blue"></div>
                        </div>
                        { posts.isLoading ?
                        <div className="animate-pulse grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-x-4">
                            <div className="col-span-2 bg-gray h-head object-cover"></div>
                            <div className="space-y-4">
                                <div className="h-10 bg-gray w-7/12"></div>
                                <div className="space-y-2">
                                    <div className="h-16 bg-gray"></div>
                                    <div className="h-16 bg-gray"></div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <div className="bg-gray rounded-full w-12 h-12"></div>
                                </div>
                                <div className="space-y-2">
                                    <div className="h-6 bg-gray"></div>
                                    <div className="h-6 bg-gray"></div>
                                    <div className="h-6 bg-gray"></div>
                                    <div className="h-6 bg-gray"></div>
                                    <div className="h-6 bg-gray"></div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <div className="bg-gray rounded-full w-8 h-8"></div>
                                    <div className="bg-gray rounded-full w-8 h-8"></div>
                                    <div className="bg-gray rounded-full w-8 h-8"></div>
                                </div>
                            </div>
                        </div> : 
                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-0">
                            <Link className="col-span-2" to={"/post/single/" + posts.data[0].slug}><img className="w-head h-head object-cover" alt="headline" src={posts.data[0].image} /></Link>
                            <div className="space-y-4">
                                <Link to={`/category/${posts.data[0].category_name}`} className="uppercase font-mont font-bold text-md text-yellow">{posts.data[0].category_name}</Link>
                                <Link to={"/post/single/" + posts.data[0].slug}><h1 className="font-bold font-oswald text-4xl">{posts.data[0].title}</h1></Link>
                                <div className="flex items-center space-x-4">
                                    <img alt="author" src={posts.data[0].author_image} className="w-12 h-12 rounded-full" />
                                    <p className="font-mont" style={{
                                        'textDecoration': 'underline',
                                        'textDecorationColor': '#FCA311',                            
                                    }}>{posts.data[0].author_name}</p>
                                </div>
                                <p className="font-cooper">{(posts.data[0].excerpt).slice(0, 375)}...</p>
                                <div className="flex items-center space-x-4">
                                    <img alt="like" src="/static/icons/file.svg" className="w-6	h-6" />
                                    <p>{posts.data[0].views}</p>
                                    <img alt="like" src="/static/icons/like.svg" className="w-6	h-6" />
                                    <p>{posts.data[0].likes}</p>
                                    <img alt="chat" src="/static/icons/chat.svg" className="w-6	h-6" />
                                    <p>{posts.data[0].comments}</p>
                                    <img alt="like" src="/static/icons/share.svg" className="w-6 h-6" />
                                    <p>Share</p>
                                </div>
                            </div>
                        </div> 
                        }                        
                        
                        <div className="pt-8 flex items-center space-x-4">
                            <h1 className="uppercase font-bold font-oswald text-2xl">Latest</h1>
                            <div className="w-full h-2 bg-blue lg:w-60"></div>
                        </div>                        
                        { posts.isLoading ? 
                            <div className="space-y-6">
                                <LandCardSkeleton />
                                <LandCardSkeleton />
                                <LandCardSkeleton />
                            </div> :
                            <InfiniteScroll
                                dataLength={posts.length}
                                next={fetchNextData}
                                hasMore={hasMore}
                                loader={<LandCardSkeleton />}
                                className="space-y-6"
                            >
                            {posts.data.map((post) => {
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
                            })}
                            </InfiniteScroll>
                        }
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-center space-x-4">
                            <h1 className="uppercase font-bold font-oswald text-2xl">TOP WEEK</h1>
                            <div className="w-full lg:w-3/6 h-2 bg-blue"></div>
                        </div>
                        {topPosts.isLoading ? 
                            <div className="space-y-3">
                                <MiniCardSkeleton />
                                <MiniCardSkeleton />
                                <MiniCardSkeleton />
                            </div>
                            :
                            topPosts.data.map((post) => {
                                return(
                                    <MiniCard
                                        key={post.id}
                                        img={post.image}
                                        title={post.title}
                                        category={post.category_name}
                                        author={post.author_name}
                                        slug={post.slug}
                                    />
                                );
                            })
                        }
                    </div>
                </div>
            </div>            
        </div>        
    );
}