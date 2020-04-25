import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { refreshErrors, logoutUser } from "../../actions/authActions";
import { joinRoom } from "../../actions/roomActions";
import classnames from "classnames";

const RoomSelection = (props) => {
    const [username, setUsername] = useState("");
    const [room, setRoom] = useState("");
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (props.errors) {
            setErrors(props.errors);
        }
    }, [props.errors]);

    const onLogoutClick = e => {
        e.preventDefault();
        props.logoutUser();
    };

    const onSubmit = e => {
        e.preventDefault();

        const user = {
            username: username,
            room: room,
        }

        props.joinRoom(user, props.history);
    }
    

    return (
        <div style={{ height: "75vh" }} className="container valign-wrapper">
            <div style={{ marginTop: "4rem" }} className="row">
                <div className="col s8 offset-s2 center-align">
                    <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                        <h4>
                            Join Game
                        </h4>
                    </div>
                    <form noValidate onSubmit={onSubmit}>
                        <div className="input-field col s12">
                            <input
                                onChange={e => setUsername(e.target.value)}
                                value={username}
                                error={errors.username}
                                id="name"
                                type="text"
                                className={classnames("", { invalid: errors.username })}
                            />
                            <label htmlFor="username">Username</label>
                            <span className="red-text">{errors.username}</span>
                        </div>
                        <div className="input-field col s12">
                            <input
                                onChange={e => setRoom(e.target.value)}
                                value={room}
                                error={errors.room}
                                id="email"
                                type="email"
                                className={classnames("", { invalid: errors.room })}
                            />
                            <label htmlFor="room">Room</label>
                            <span className="red-text">{errors.room}</span>
                        </div>
                        <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                            <button
                                style={{
                                    width: "150px",
                                    borderRadius: "3px",
                                    letterSpacing: "1.5px",
                                    marginTop: "1rem"
                                }}
                                type="submit"
                                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                            >
                                Play
                            </button>
                            <button
                                style={{
                                    width: "150px",
                                    borderRadius: "3px",
                                    letterSpacing: "1.5px",
                                    marginTop: "1rem"
                                }}
                                onClick={onLogoutClick}
                                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                            >
                                Logout
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

RoomSelection.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    joinRoom: PropTypes.func.isRequired,
    refreshErrors: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { joinRoom, refreshErrors, logoutUser }
)(RoomSelection);