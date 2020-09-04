import React, { Component } from 'react';
import {
    BrowserRouter,
    Switch,
    Route
} from 'react-router-dom';
import { Container } from "react-bootstrap";
import { ToastContainer } from 'react-toastify';
import AutoSignIn from './components/hoc/autoSignin';

import Home from './components/home';
import Header from './components/header';
import UserAccess from './components/userArea/access';
import UserArea from './components/userArea';
import Profile from './components/userArea/profile';
import AdminArticles from './components/userArea/articles';
import Create from './components/userArea/articles/create';

class Routes extends Component {

    render(){
        return(
            <BrowserRouter>
                <AutoSignIn>
                    <ToastContainer/>
                    <Header/>
                    <Container className="mt-4">
                        <Switch>
                            <Route path="/user_area/profile" component={Profile}/>
                            <Route path="/user_area/create" component={Create}/>
                            <Route path="/user_area/articles" component={AdminArticles}/>
                            <Route path="/user_area" component={UserArea}/>
                            <Route path="/sign_in" component={UserAccess}/>
                            <Route path="/" component={Home}/>
                        </Switch>
                    </Container>
                </AutoSignIn>
            </BrowserRouter>
        )
    }
}

export default Routes;