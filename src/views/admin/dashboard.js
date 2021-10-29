import React from "react";
import { CategoryCard, CategoryCard2 } from "../category/cards/categoryCard";
import { MiniCategoryCard, MiniCategoryCard2, AddCategoryCard } from "../category/cards/cateogoryMini";
import { FeedCard2, FeedCard3 } from "../feed/card/feedCard";
import { AdminCard, AdminCard2, CreateAdminCard, EmptyAdminCard } from "../posts/adminCards/adminCard";

export default function AdminDashboardView({ posts, categories, userData }) {
    return(
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-y-2 gap-x-8">
            <div className="col-span-4 space-y-6">
                <div className="space-y-2">
                    <h1 className="font-oswald font-bold text-lg">Posts</h1>
                    <h1 className="font-mont font-bold opacity-60 text-md">Popular posts</h1>
                    <div className="flex space-x-6">
                        {posts.isLoading ? <div className="w-64 bg-gray rounded-sm animate-pulse"></div> :
                            posts.data.length > 0 ?
                                posts.data.map((post, i) => {
                                    return(
                                        i === 0 ?
                                        <AdminCard
                                            key={i}
                                            date={post.published}
                                            title={post.title}
                                            excerpt={post.excerpt}
                                            slug={post.slug}
                                        /> :
                                        <AdminCard2
                                            key={i}
                                            date={post.published}
                                            title={post.title}
                                            excerpt={post.excerpt}
                                            slug={post.slug}
                                        />
                                    );
                                }).slice(0, 2) : <EmptyAdminCard />
                        }
                        <CreateAdminCard />
                    </div>
                </div>
                <div className="space-y-2">
                    <h1 className="font-oswald font-bold text-lg">Categories</h1>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-4">
                        <div className="space-y-2">
                            <h1 className="font-mont font-bold opacity-60 text-md">Popular</h1>
                            <div className="space-y-4">
                                {categories.isLoading ? 
                                    <div className="space-y-4">
                                        <div className="bg-gray w-full h-24 animate-pulse rounded-sm"></div>
                                        <div className="bg-gray w-full h-24 animate-pulse rounded-sm"></div>
                                    </div> :
                                    categories.data.map((categ, i) => {
                                        return(
                                            i === 0 ?
                                            <CategoryCard
                                                key={i}
                                                title={categ.name}
                                                posts={categ.posts}
                                                likes={categ.likes}
                                                views={categ.views}
                                                about='The worldwide dominance of Canada shows no signs of abating.'
                                            /> :
                                            <CategoryCard2
                                                key={i}
                                                title={categ.name}
                                                posts={categ.posts}
                                                likes={categ.likes}
                                                views={categ.views}
                                                about='The worldwide dominance of Canada shows no signs of abating.'
                                            />
                                        );
                                    }).slice(0, 2)
                                }
                            </div>
                        </div>
                        <div className="space-y-2">
                            <h1 className="font-mont font-bold opacity-60 text-md">Used</h1>
                                {categories.isLoading ?
                                    <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                                        <div className="bg-gray w-full animate-pulse h-16 rounded-sm"></div>
                                        <div className="bg-gray w-full animate-pulse h-16 rounded-sm"></div>
                                        <div className="bg-gray w-full animate-pulse h-16 rounded-sm"></div>
                                        <div className="bg-gray w-full animate-pulse h-16 rounded-sm"></div>
                                        <div className="bg-gray w-full animate-pulse h-16 rounded-sm"></div>
                                        <div className="bg-gray w-full animate-pulse h-16 rounded-sm"></div>
                                    </div>
                                    :
                                    <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                                    {categories.data.map((categ, i) => {
                                        return(
                                            i === 0 ?
                                            <MiniCategoryCard
                                                key={i}
                                                title={categ.name}
                                                posts={categ.posts}
                                            /> :
                                            <MiniCategoryCard2
                                                key={i}
                                                title={categ.name}
                                                posts={categ.posts}
                                            />
                                        );
                                    }).slice(0, 5)}
                                    <AddCategoryCard />
                                    </div>
                                }
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-span-2 space-y-14">
                <div className="flex justify-center">
                    {userData.isLoading ? 
                    <div className="space-y-4">
                        <div className="flex justify-center">
                            <div className="h-8 w-24 bg-gray animate-pulse"></div>
                        </div>
                        <div className="flex justify-center">
                            <div className="w-16 h-16 bg-gray animate-pulse rounded-full"></div>
                        </div>
                        <div className="space-y-2">
                            <div className="h-4 w-full bg-gray animate-pulse"></div>
                            <div className="h-4 w-full bg-gray animate-pulse"></div>
                            <div className="h-4 w-full bg-gray animate-pulse"></div>
                            <div className="h-4 w-full bg-gray animate-pulse"></div>
                        </div>
                        <div className="flex justify-between space-x-20">
                            <div className="h-16 w-12 bg-gray animate-pulse"></div>
                            <div className="h-16 w-12 bg-gray animate-pulse"></div>
                            <div className="h-16 w-12 bg-gray animate-pulse"></div>
                        </div>
                    </div> :
                    <div className="text-center space-y-2">
                        <h1 className="font-oswald font-bold text-lg">My Profile</h1>
                        <h1 className="font-mont font-bold opacity-60 text-md">Student</h1>
                        <div className="flex justify-center">
                            <img alt="author" src={userData.data.profile} className="w-14 h-14 rounded-full" />
                        </div>
                        <p className="font-mont font-bold" style={{
                            'textDecoration': 'underline',
                            'textDecorationColor': '#FCA311',                            
                        }}>{userData.data.username}</p>
                        <div className="flex justify-center">
                            <p className="font-mont text-sm opacity-80">{userData.data.about}</p>
                        </div>
                        <div className="flex justify-center items-center space-x-16 pt-8">
                            <div className="space-y-1">
                                <p className="font-oswald font-bold text-5xl">{userData.data.posts}</p>
                                <p className="font-mont opacity-60 text-md">posts</p>
                            </div>
                            <div className="space-y-1">
                                <p className="font-oswald font-bold text-5xl">{userData.data.views}</p>
                                <p className="font-mont opacity-60 text-md">views</p>
                            </div>
                            <div className="space-y-1">
                                <p className="font-oswald font-bold text-5xl">{userData.data.likes}</p>
                                <p className="font-mont opacity-60 text-md">likes</p>
                            </div>
                        </div>
                    </div>
                    }
                </div>
                <div className="space-y-2">
                    <h1 className="font-oswald font-bold text-lg">Feeds</h1>
                    <h1 className="font-mont font-bold opacity-60 text-md">Recent activity</h1>
                    <FeedCard2 />
                    <FeedCard3 />
                </div>
            </div>
        </div>
    );
}