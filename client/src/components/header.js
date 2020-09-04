import React from 'react';
import { withRouter } from 'react-router';
import { Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

const Header = (props) =>{
    const { history } = props;
    const user = useSelector(state => state.user);


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
                            <Nav.Link> Logout </Nav.Link>

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