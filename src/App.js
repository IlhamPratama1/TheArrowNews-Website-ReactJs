import React, { useState } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import LoginView from './views/auth/login';
import RegisterView from './views/auth/register';
import SignOut from './views/auth/logout';
import Home from './views/home';
import SinglePost from './views/posts/single';
import ScrollToTop from './views/templates/scrollToTop';
import { ProvideAuth } from './auth';
import AdminIndexView from './views/admin';
import CategoryPost from './views/posts/categoryPost';
import Navbar from './views/templates/navbar';
import Sidebar from './views/templates/sidebar';
import SearchPost from './views/posts/searchPost';
import Footer from './views/templates/footer';

function App() {
  const [ sidebarOpen, setSideOpen ] = useState(false);

  function handleSidebar() {
    setSideOpen(!sidebarOpen);
  }

  return (
    <ProvideAuth>
      <Router>
          <React.StrictMode>
            <ScrollToTop
              sidebarStatus={setSideOpen}
            />
            <div className="w-full absolute z-20">
              <Navbar
                handleSidebar={handleSidebar}
              />
              <Sidebar
                sidebarOpen={sidebarOpen}
            />
            </div>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/category/:slug" component={CategoryPost} />
              <Route path="/search/:slug" component={SearchPost} />
              <Route path="/login" component={LoginView} />
              <Route path="/register" component={RegisterView} />
              <Route path="/logout" component={SignOut} />
              <Route path="/post/single/:slug" component={SinglePost} />
              <Route path="/admin" component={AdminIndexView} />
            </Switch>
            <Footer />
          </React.StrictMode>
        </Router>
    </ProvideAuth>
  );
}

export default App;
