import React from "react";

import "./NavBar.css"
const NavBar = () => {
    return (<nav className="navbar">
        <div className="navbar__logo"></div>
        <div className="navbar__name">Barbeque</div>
        <div className="navbar__search">Search</div>
        <div className="navbar__item">Notifications</div>
        <div className="navbar__item">Username</div>
    </nav>);
};

export default NavBar;