import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { resetErrors } from "../../actions/authActions";
import { joinRoom, resetRoom } from "../../actions/playerActions";
import { resetNetworkHandler } from "../../actions/networkActions";
import classnames from "classnames";

const RoomSelection = (props) => {
    const [username, setUsername] = useState("");
    const [room, setRoom] = useState("");
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (props.auth.isAuthenticated) {
            setUsername(props.auth.user.username);
        }
        props.resetErrors();
        props.resetRoom();
        if (Object.keys(props.network.handler).length !== 0) {
            props.network.handler.disconnect();
        }
        props.resetNetworkHandler();
    }, []);

    useEffect(() => {
        if (props.errors) {
            setErrors(props.errors);
        }
    }, [props.errors]);

    const onSubmit = e => {
        e.preventDefault();

        const user_room = {
            username: username,
            room: room,
        }

        props.joinRoom(user_room, props.history);
    }
    

    return (
        <div style={{ height: "75vh" }} className="container valign-wrapper">
            <div style={{ marginTop: "4rem" }} className="row">
                <div className="col s8 offset-s2 center-align">
                    <div className="col s12">
                        <h4>
                            <span style={{ fontFamily: "Verdana, Geneva, sans-serif" }}>Platform Arena</span>
                        </h4>
                        <p className="flow-text grey-text text-darken-1">
                            A multiplayer fighting game.
                        </p>
                        <br />
                    </div>
                    <form noValidate onSubmit={onSubmit}>
                        {props.auth.isAuthenticated 
                            ? <p className="flow-text grey-text text-darken-1">
                                Welcome back {props.auth.user.username}!
                            </p>
                            : <div className="input-field col s12">
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
                        }
                        <div className="input-field col s12">
                            <input
                                onChange={e => setRoom(e.target.value)}
                                value={room}
                                error={errors.room}
                                id="email"
                                type="text"
                                className={classnames("", { invalid: errors.room })}
                            />
                            <label htmlFor="room">Room</label>
                            <span className="red-text">{errors.room}</span>
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
                                {props.auth.isAuthenticated ? "Play" : "Play as Guest"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

RoomSelection.propTypes = {
    joinRoom: PropTypes.func.isRequired,
    resetRoom: PropTypes.func.isRequired,
    resetErrors: PropTypes.func.isRequired,
    resetNetworkHandler: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    network: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    network: state.network
});

export default connect(
    mapStateToProps,
    { joinRoom, resetErrors, resetRoom, resetNetworkHandler }
)(RoomSelection);