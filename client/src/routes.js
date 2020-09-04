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


class Routes extends Component {

    render(){
        return(
            <BrowserRouter>
                <AutoSignIn>
                    <ToastContainer/>
                    <Header/>
                    <Container className="mt-4">
                        <Switch>
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