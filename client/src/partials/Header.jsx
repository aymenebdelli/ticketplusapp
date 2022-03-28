import React from 'react'
import '../styles/Header.css'
import logoPartOne from '../assets/t-circle.png'
import logoPartTwo from '../assets/plus.png'
import { Navbar, Nav } from 'react-bootstrap'
import { useHistory } from "react-router-dom"
import { userLogout } from '../api/userApi'
import { LinkContainer } from 'react-router-bootstrap'

export const Header = () => {

    const history = useHistory()
    const logOut = () => {
        sessionStorage.removeItem("accessJWT");
        localStorage.removeItem("crmSite");
        userLogout();
        history.push('/');
    }

    return (
        <Navbar id="RouterNavLink" collapseOnSelect variant='dark' bg='secondary' >
            <Navbar.Brand className='brand-img'>
                <LinkContainer to='/dashboard'><Nav.Link><img src={logoPartOne} alt='brand' width="45%" />
                    <img src={logoPartTwo} alt='brand' width="45%" /></Nav.Link></LinkContainer>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className='nav-icons' >
                    <LinkContainer to='/dashboard'>
                        <Nav.Link>
                            <img src="https://img.icons8.com/flat-round/64/000000/home--v1.png" width="30%" />Dashboard</Nav.Link></LinkContainer>
                    <LinkContainer to='/tickets' style={{marginTop:"5px"}}><Nav.Link ><img src="https://img.icons8.com/external-flaticons-flat-circular-flat-icons/64/000000/external-crm-media-agency-flaticons-flat-circular-flat-icons.png" width='25%' />Ticket</Nav.Link></LinkContainer>
                    <LinkContainer to='/about'>
                        <Nav.Link><img src="https://img.icons8.com/plasticine/100/000000/about.png" width="30%"/>About</Nav.Link>
                    </LinkContainer>
                    <Nav.Link style={{marginTop:"3px"}} onClick={logOut} ><img src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/000000/external-exit-100-most-used-icons-flaticons-lineal-color-flat-icons.png" width='25%' />Logout</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}
