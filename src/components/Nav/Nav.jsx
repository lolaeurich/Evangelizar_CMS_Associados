import React from "react";
import "./style.css";
import logoNav from "../../assets/logo2.png";

function Nav () {
    return (
        <div className="nav">
            <img alt="" className="logo-nav" src={logoNav} />
            <div className="btn-nav">
                <p>Logout</p>
            </div>
        </div>
    )
}

export default Nav;