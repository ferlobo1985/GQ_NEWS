import React from 'react';
import { withRouter } from 'react-router';
import { Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../store/actions'

const Header = (props) =>{
    const { history } = props;
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logoutUser());
        history.push('/');
    }


    return(
        <>
            <Navbar className="bg-custom" variant="dark">
                <LinkContainer to="/">
                    <Navbar.Brand>Graph News</Navbar.Brand>
                </LinkContainer>
            </Navbar>
            <Navbar className="bg-custom-small" variant="dark">
                <Nav>
                    { user.auth ?
                        <> 
                            <Nav.Link
                                onClick={()=>handleLogout()}
                            > Logout </Nav.Link>

                            <LinkContainer to="/user_area">
                                <Nav.Link> User </Nav.Link>
                            </LinkContainer>
                        </>
                        :
                        <LinkContainer to="/sign_in">
                            <Nav.Link> Sign in </Nav.Link>
                        </LinkContainer>
                    }
                </Nav>
            </Navbar>
        </>
    )
}

export default withRouter(Header);