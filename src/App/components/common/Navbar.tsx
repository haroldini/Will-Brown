import React from 'react';
import { Link, useLocation } from 'react-router-dom';


import './Navbar.css';

type NavbarProps = {
    newRecruits: boolean
}


export const Navbar = (props: NavbarProps) => {

    const location = useLocation();
    const currentPage = location.pathname;
    console.log(currentPage)

    return (
        <div className="icon-bar">
                <Link to="/" className={ currentPage == "/" ? "ActivePage" : "" }><i className="fa fa-home"></i></Link>
                { !props.newRecruits
                ? <Link to="/recruit" className={ currentPage == "/recruit" ? "ActivePage" : "" }><i className="fa fa-user-clock"></i></Link>
                : <Link to="/recruit" className={ currentPage == "/recruit" ? "ActivePage FlashingBG" : "FlashingBG" }><i className="fa-solid fa-user-plus"></i></Link> }
                <Link to="/team" className={ currentPage == "/team" ? "ActivePage" : "" }><i className="fa fa-users"></i></Link>
                <Link to="/options" className={ currentPage == "/options" ? "ActivePage" : "" }><i className="fa fa-gear"></i></Link>
                <Link to="/logout" className={ currentPage == "/logout" ? "ActivePage" : "" }><i className="fa fa-right-from-bracket"></i></Link>
            </div>
        
    );
};

