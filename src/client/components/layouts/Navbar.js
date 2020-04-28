import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

const Navbar = (props) => {
    const onLogoutClick = e => {
        e.preventDefault();
        props.logoutUser();
    };

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
                    <ul className="right hide-on-med-and-down">
                            <li>
                                <Link
                                    to="/"
                                    style={{
                                        fontFamily: "Verdana, Geneva, sans-serif"
                                    }}
                                    className="col s5 black-text"
                                >
                                    How To Play
                                </Link>
                            </li>
                        {!props.auth.isAuthenticated && 
                            <>
                            <li>
                                <Link
                                    to="/register"
                                    style={{
                                        fontFamily: "Verdana, Geneva, sans-serif"
                                    }}
                                    className="col s5 black-text"
                                >
                                    Register
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/login"
                                    style={{
                                        fontFamily: "Verdana, Geneva, sans-serif"
                                    }}
                                    className="col s5 black-text"
                                >
                                    Login
                                </Link>
                            </li>
                            </>
                        }
                        {props.auth.isAuthenticated &&
                            <li>
                                <Link
                                    to="/"
                                    onClick={onLogoutClick}
                                    style={{
                                        fontFamily: "Verdana, Geneva, sans-serif"
                                    }}
                                    className="col s5 black-text"
                                >
                                    Logout
                                </Link>
                            </li>
                        }
                    </ul>
                </div>
            </nav>
        </div>
    );
};

Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(Navbar);

