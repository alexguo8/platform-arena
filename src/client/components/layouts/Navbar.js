import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="navbar-fixed">
            <nav className="z-depth-0">
                <div className="nav-wrapper light-blue lighten-4">
                    <Link
                        to="/"
                        style={{
                            fontFamily: "Verdana, Geneva, sans-serif"
                        }}
                        className="col s5 brand-logo center black-text"
                    >
                        <i className="material-icons">horizontal_split</i>
                        Platform Arena
                    </Link>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;

