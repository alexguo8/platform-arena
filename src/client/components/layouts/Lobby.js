import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { refreshErrors } from "../../actions/authActions";
import { joinRoom } from "../../actions/roomActions";
import classnames from "classnames";

const Lobby = (props) => {
    // const [username, setUsername] = useState("");
    // const [room, setRoom] = useState("");
    // const [errors, setErrors] = useState({});

    // useEffect(() => {
    //     if (props.auth.isAuthenticated) {
    //         setUsername(props.auth.user.username);
    //     }
    // }, []);

    // useEffect(() => {
    //     if (props.room.room === "") {
    //         props.history.push("/");
    //         return;
    //     }
    // });

    // useEffect(() => {
    //     if (props.errors) {
    //         setErrors(props.errors);
    //     }
    // }, [props.errors]);

    // const onSubmit = e => {
    //     e.preventDefault();

    //     const user_room = {
    //         username: username,
    //         room: room,
    //     }

    //     props.joinRoom(user_room, props.history);
    // }
    

    return (
        <div style={{ height: "75vh" }} className="container valign-wrapper">
            <div className="col s1">
                <Link to="/" className="btn-flat waves-effect">
                    <i className="material-icons left">
                        keyboard_backspace
                        </i>
                    Leave
                </Link>
            </div>
            <div style={{ marginTop: "4rem" }} className="row">
                
                <div className="col s12 center-align">
                    
                    <div className="col s12">
                        <h4>
                            <span style={{ fontFamily: "Verdana, Geneva, sans-serif" }}>Lobby</span>
                        </h4>
                        <br />
                    </div>

                    <div className="card">
                        <div className="card-image">
                            <img src={process.env.PUBLIC_URL + "/assets/pandaRight.png"} />
                        </div>
                        <div className="card-content">
                            Panda
                        </div>
                    </div>

                    <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                        <button
                            style={{
                                width: "250px",
                                borderRadius: "3px",
                                letterSpacing: "1.5px",
                                marginTop: "1rem"
                            }}
                            type="submit"
                            className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                        >
                            Start
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

Lobby.propTypes = {
    room: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    room: state.room
});

export default connect(
    mapStateToProps,
)(Lobby);