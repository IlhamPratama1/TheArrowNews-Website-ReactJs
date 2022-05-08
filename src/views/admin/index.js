import React, { useCallback, useEffect, useState } from 'react';
import {
    Switch,
    Route,
    useRouteMatch
  } from "react-router-dom";
import AdminDashboardView from './dashboard';
import NavbarDashboard from '../templates/navbarDashboard';
import { Redirect } from 'react-router';
import PostList from './postList';
import CreatePost from './createPost';
import FeedView from './feedView';
import CreateCategory from './createCategory';
import ProfileView from './profileView';
import axiosInstance from '../../axios';
import EditPost from './editPost';
import EditUser from './editUser';


export default function AdminIndexView() {
    let { path } = useRouteMatch();
    const [ posts, setPosts ] = useState({ isLoading: true, data: [''] });
    const [ draft, setDraft ] = useState({ isLoading: true, data: [''] });
    const [ categories, setCategories ] = useState({ isLoading: true, data: [''] });
    const [ userData, setUserData ] = useState({ isLoading: true, data: {} });
    
    const fetchCategData = useCallback(async () => {
        try {
            const response = await axiosInstance.get('admin/category/');
            if (response.status === 200) {
                setCategories({
                    isLoading: false,
                    data: response.data.results
                });
            }
        } catch (error) {
            console.log(error.response);
            throw error;
        }
    }, []);

    const fetchPostData = useCallback(async () => {
        try {
            const response = await axiosInstance.get('admin/list/');
            if (response.status === 200) {
                setPosts({
                    isLoading: false,
                    data: response.data.results
                });
            }
        } catch (error) {
            console.log(error.response);
            throw error;
        }
    }, []);

    const fetchDraftData = useCallback(async () => {
        try {
            const response = await axiosInstance.get('admin/draft/');
            if (response.status === 200) {
                setDraft({
                    isLoading: false,
                    data: response.data.results
                });
            }
        } catch (error) {
            console.log(error.response);
            throw error;
        }
    }, []);

    const fetchUserData = useCallback(async () => {
        try {
            const response = await axiosInstance.get('user/myprofile/');
            if (response.status === 200) {
                setUserData({
                    isLoading: false,
                    data: response.data
                });
            }
        } catch (error) {
            console.log(error.response);
            throw error;
        }
    }, []);

    
    const fetchAllData = useCallback(async () => {
        fetchPostData();
        fetchCategData();
        fetchUserData();
        fetchDraftData();
    }, [fetchPostData,fetchCategData,fetchDraftData,fetchUserData]);

    useEffect(() => {
        fetchAllData();
    }, [fetchAllData]);

    return(
        <div className="mx-auto">
            <NavbarDashboard>
                <Switch>
                    <Route path={`${path}/dashboard`}>
                        <AdminDashboardView
                            categories={categories}
                            posts={posts}
                            userData={userData}
                        />
                    </Route>
                    <Route exact path={`${path}/posts`}>
                        <PostList
                            posts={posts}
                            draft={draft}
                            fetchData={fetchPostData}
                            fetchDraft={fetchDraftData}
                        />
                    </Route>
                    <Route path={`${path}/posts/create`}>
                        <CreatePost
                            categories={categories}
                            posts={posts}
                            draft={draft}
                            fetchData={fetchPostData}
                            fetchDraft={fetchDraftData}
                        />
                    </Route>
                    <Route path={`${path}/posts/edit/:id`}>
                        <EditPost
                            categories={categories}
                            fetchData={fetchAllData}
                        />
                    </Route>
                    <Route path={`${path}/category`}>
                        <CreateCategory
                            posts={posts}
                            draft={draft}
                            fetchCateg={fetchAllData}
                        />
                    </Route>
                    <Route path={`${path}/feed`}>
                        <FeedView />
                    </Route>
                    <Route path={`${path}/profile`}>
                        <ProfileView
                            userData={userData}
                        />
                    </Route>
                    <Route path={`${path}/myprofile/edit`}>
                        <EditUser
                            userData={userData}
                            fetchUserData={fetchUserData}
                        />
                    </Route>
                    <Redirect exact from={`${path}`} to={`${path}/dashboard`} />
                </Switch>
            </NavbarDashboard>
        </div>
    );
}