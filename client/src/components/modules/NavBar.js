import React from "react";
import logo from "logo2.jpeg";
import "./NavBar.css";
console.log(logo);
function NavBar() {
    return (<nav className="navbar">
        <div><img src = {logo} alt = "Logo"/></div>
        <div className="navbar__name">Barbeque</div>
        <div className="navbar__search">Search</div>
        <div className="navbar__item">Notifications</div>
        <div className="navbar__item">Username</div>
    </nav>);
};

export default NavBar;