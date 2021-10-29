import React, { useEffect, useState, useCallback } from 'react';
import Navbar from '../templates/navbar';
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import axiosInstance from '../../axios';
import MiniCard from './cards/miniCard';
import { useAuth } from '../../auth';
import MiniCardSkeleton from './skeleton/miniCardSkeleton';
import AuthorView from './author/author';
import CommentView from './comment/comment';


export default function SinglePost() {
    const auth = useAuth();
    const { slug } = useParams();
    const [ post, setPost ] = useState({ isLoading: true, data: [''] });
    const [ comments, setComments ] = useState({ isLoading: true, data: [''] });
    const [ posts, setPosts ] = useState({ isLoading: true, data: [''] });
    const [ userData, setUserData ] = useState({ isLoading: true, data: {} });
    const [ commentPost, setCommentPost ] = useState('');
    const [ isLiked, setIsLiked ] = useState(false);
    const [ viewed, setViewed ] = useState(false);
    const [ imageLoaded, setImageLoaded ] = useState(false);

    const fetchCommentData = useCallback(async () => {
        try {
            const response = await axiosInstance.get("post/" + slug + "/comment/");
            if (response.status === 200) {
                setComments({
                    isLoading: false,
                    data: response.data.results
                });
            }
        } catch (error) {
            throw error;
        }
    }, [slug]);

    const fetchData = useCallback(async () => {
        try {
            const response = await axiosInstance.get(`category/${post.data.category_name}/`);
            if (response.status === 200) {
                setPosts({
                    isLoading: false,
                    data: response.data.results
                });
            }
        } catch (error) {
            throw error;
        }
    }, [post.data.category_name]);

    const fetchUserData = useCallback(async () => {
        try {
            const response = await axiosInstance.get(`user/profile/${post.data.author}/`);
            if (response.status === 200) {
                setUserData({
                    isLoading: false,
                    data: response.data
                });
            }
        } catch (error) {
            throw error;
        }
    }, [post.data.author]);

    const fetchDetail = useCallback(async () => {
        try {
            const response = await axiosInstance.get("post/" + slug + "/");
            if (response.status === 200) {
                setPost({
                    isLoading: false,
                    data: response.data
                });
            }
        } catch (error) {
            throw error;
        }
    }, [slug]);

    const postView = useCallback(async () => {
        axiosInstance
			.post(`post/view/`, {
				slug: slug,
			})
            .then((res) => {
                setViewed(true);
            })
            .catch((res) => {
                console.log(res);
        });
    }, [slug]);

    const checkIsLiked = useCallback(async () => {
        try {
            const response = await axiosInstance.get(`post/getlike/${slug}/`);
            if (response.status === 200) {
                if(response.data.results.length > 0) {
                    setIsLiked(true);
                }
                else {
                    setIsLiked(false);
                }
            }
        } catch (error) {
            console.log(error.response);
        }
    }, [slug]);
    
    useEffect(() => {
        if(!viewed) {
            postView();
        }
        fetchDetail();
        fetchCommentData();
        if(!post.isLoading) {
            fetchUserData();
            fetchData();
        }
        if(auth.user) {
            checkIsLiked();
        }
    }, [postView, fetchDetail, fetchCommentData, fetchData, fetchUserData, post.isLoading, checkIsLiked, auth.user, viewed]);

    function CommentHandler(e) {
        setCommentPost(e.target.value);
    }

    function PostComment(e) {
        e.preventDefault();
        axiosInstance
			.post(`post/comment/`, {
				post: post.data.id,
                author: localStorage.getItem('user_id'),
                text: commentPost
			})
			.then((res) => {				
				fetchCommentData();
                setCommentPost('');
			})
            .catch((res) => {
                console.log(res);
            });
    }

    function PostLike(e) {
        e.preventDefault();
        if(!isLiked && auth.user) {
            axiosInstance
			    .post(`post/like/${slug}/`, {
                    author: localStorage.getItem('user_id'),
                    post: post.data.id
                })
			    .then((res) => {
                    fetchDetail();
                    setIsLiked(true);
			    })
            .catch((res) => {
                console.log(res);
            });
        }
    }

    function handleImageLoaded() {
        setImageLoaded(true);
    }

    const imageStyle = !imageLoaded ? "hidden" : "object-cover h-xl w-full";

    return(
        <div className="mb-40">
            <div className="h-xl w-full absolute z-10">
                <Navbar />
            </div>
            {!imageLoaded &&
                <div className="h-xl w-full animate-pulse bg-gray"></div>
            }
            <img style={{filter: `brightness(50%)`}} onLoad={handleImageLoaded} className={imageStyle} src={post.data.image} alt="logo" />
            <div className="px-6 lg:px-96">
                { post.isLoading ? 
                    <div className="py-8 space-y-5 animate-pulse">
                        <div className="bg-gray w-16 h-8"></div>
                        <div className="space-y-2">
                            <div className="bg-gray w-full h-16"></div>
                            <div className="bg-gray w-full h-16"></div>
                        </div>
                        <div className="bg-gray w-24 h-4"></div>
                        <div className="space-y-2">
                            <div className="bg-gray w-full h-8"></div>
                            <div className="bg-gray w-full h-8"></div>
                            <div className="bg-gray w-full h-8"></div>
                        </div>
                        <div className="flex space-x-4 items-center">
                            <div className="bg-gray rounded-full w-16 h-16"></div>
                            <div className="bg-gray w-16 h-8"></div>
                        </div>
                    </div> :
                    <div className="py-8 space-y-5">
                        <Link to="/" className="text-xs	uppercase py-2 px-2 bg-yellow font-mont font-bold">{post.data.category_name}</Link>
                        <h1 className="text-4xl lg:text-6xl uppercase font-oswald font-bold text-black">{post.data.title}</h1>
                        <p className="font-cooper opacity-60 text-sm">{post.data.published}</p>
                        <p className="font-mont text-lg">{post.data.excerpt}</p>
                        <div className="flex items-center space-x-4">
                            <img alt="author" src={post.data.author_image}className="w-12 h-12 rounded-full" />
                                <p className="font-mont" style={{
                                    'textDecoration': 'underline',
                                    'textDecorationColor': '#FCA311',                            
                                }}>{post.data.author_name}</p>
                        </div>
                    </div>
                }
                { post.isLoading ? 
                    <div className="space-y-2">
                        <div className="bg-gray w-full h-6"></div>
                        <div className="bg-gray w-full h-6"></div>
                        <div className="bg-gray w-full h-6"></div>
                        <div className="bg-gray w-full h-6"></div>
                        <div className="bg-gray w-full h-6"></div>
                        <div className="bg-gray w-full h-6"></div>
                    </div> :
                    <div>
                        <div className="py-4">
                            <div className="space-y-3 font-cooper text-lg" dangerouslySetInnerHTML={{ __html: post.data.content }} />
                        </div>
                        <div className="flex items-center space-x-4 mb-4 mt-2">
                            <img alt="like" src="/static/icons/file.svg" className="w-7	h-7" />
                            <p>{post.data.views}</p>
                            {isLiked ?
                                <button><img alt="like" src="/static/icons/likec.svg" className="w-7 h-7" /></button> :
                                <button onClick={e => PostLike(e)}><img alt="like" src="/static/icons/like.svg" className="w-7 h-7" /></button>
                            }
                            <p>{post.data.likes}</p>
                            <img alt="like" src="/static/icons/share.svg" className="w-7 h-7" />
                            <p>Share</p>
                        </div>
                    </div>
                }                
                <div className="flex">
                    <div className="flex-grow flex items-center">
                        <div className="w-full h-2 bg-blue"></div>
                    </div>
                    <div className="flex-grow-0 my-4 mx-4">
                        <h1 className="uppercase font-bold font-oswald text-2xl">AUTHOR</h1>
                    </div>
                    <div className="flex-grow flex items-center">
                        <div className="w-full h-2 bg-blue"></div>
                    </div>
                </div>
                { userData.isLoading ? 
                <div className="space-y-4 mb-12">
                    <div className="flex justify-center">
                        <div className="h-8 w-24 bg-gray animate-pulse"></div>
                    </div>
                    <div className="flex justify-center">
                        <div className="w-16 h-16 bg-gray animate-pulse rounded-full"></div>
                    </div>
                    <div className="flex justify-center">
                        <div className="h-6 w-28 bg-gray animate-pulse"></div>
                    </div>
                    <div className="space-y-2 px-16">
                        <div className="h-4 w-full bg-gray animate-pulse"></div>
                        <div className="h-4 w-full bg-gray animate-pulse"></div>
                        <div className="h-4 w-full bg-gray animate-pulse"></div>
                        <div className="h-4 w-full bg-gray animate-pulse"></div>
                    </div>
                </div>
                :
                <AuthorView 
                    profile={userData.data.profile}
                    username={userData.data.user_name}
                    email={userData.data.email}
                    about={userData.data.about}
                /> 
                }
                <div className="flex items-center space-x-4 mb-6">
                    <h1 className="uppercase font-bold font-oswald text-2xl">Related</h1>
                    <div className="w-full lg:w-3/12 h-2 bg-blue"></div>
                </div>
                {posts.isLoading ? 
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
                        <MiniCardSkeleton />
                        <MiniCardSkeleton />
                        <MiniCardSkeleton />
                    </div> : 
                    posts.data.length > 1 ?
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
                        {posts.data.map((apost, i) => {
                            return(
                                apost.id !== post.data.id &&
                                <MiniCard
                                    key={i}
                                    img={apost.image}
                                    title={apost.title}
                                    category={apost.category_name}
                                    author={apost.author_name}
                                    slug={apost.slug}
                                    />
                            );                            
                        }).slice(0, 3)}
                    </div> : <h1 className="mb-12 font-oswald text-black text-xl uppercase">Related post is empty</h1>
                }
                { comments.isLoading ? 
                    <div className="flex items-center space-x-4 mb-6">
                        <div className="bg-gray rounded-full w-16 h-16"></div>
                        <div className="space-y-1">
                            <div className="bg-gray w-12 h-4"></div>
                            <div className="bg-gray w-96 h-6"></div>
                        </div>
                    </div> :
                    <div className="comments">
                        <div className="flex items-center space-x-4 mb-8">
                            <h1 className="uppercase font-bold font-oswald text-2xl">Comments ({comments.data.length})</h1>
                            <div className="w-7/12 lg:w-3/12 h-2 bg-blue"></div>
                        </div>
                        {comments.data.map((comment) => {
                            return(
                                <CommentView 
                                    id={comment.id}
                                    author_image={comment.author_image + "/"}
                                    author_name={comment.author_name}
                                    created_date={comment.created_date}
                                    text={comment.text}
                                />
                            );
                        })}
                        {auth.user ? 
                        <form className="space-y-4">
                            <div className="space-y-2">
                                <label className="font-mont uppercase font-bold text-lg">Post new comment</label>
                                <input value={commentPost} onChange={e => CommentHandler(e)} name="comment" type="text" placeholder="enter your comment" className="focus:outline-none focus:border-yellow-main p-4 w-full h-12 border"></input>
                            </div>
                            <button onClick={e => PostComment(e)} className="font-oswald font-bold bg-yellow text-xl py-2 px-8">Login</button>
                        </form>
                        : null }
                    </div>
                }
            </div>
        </div>
    );
}