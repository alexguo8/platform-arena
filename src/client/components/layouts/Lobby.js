import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { setNetworkHandler } from "../../actions/networkActions";
import Type from "../../../shared/objectTypes"
import { NetworkHandler } from "../../game-client/networking";

const Lobby = (props) => {
    const networkHandler = useRef();

    // useEffect(() => {
    //     if (props.player.room === "") {
    //         props.history.push("/");
    //         return;
    //     }
    // });
    useEffect(() => {
        if (Object.keys(props.network.handler).length === 0) {
            networkHandler.current = new NetworkHandler();
            props.setNetworkHandler(networkHandler.current);
            networkHandler.current.connectToServer()
                .then(() => {
                    networkHandler.current.joinLobby(props.player.user, props.player.room);
                });
        } else {
            networkHandler.current = props.network.handler;
        }
    }, []);

    const selectCharacter = character => {
        networkHandler.current.updateLobby(character, props.player.room)
    };

    const onStart = () => {
        networkHandler.current.startGame(props.player.room);
        props.history.push("/game");
    }

    return (
        <div style={{ height: "75vh" }} className="container valign-wrapper">
            <div style={{ marginTop: "4rem" }} className="row">
                <div className="col s12 center-align">
                    <Link to="/" className="btn-flat waves-effect">
                        <i className="material-icons left">
                            keyboard_backspace
                        </i>
                        Leave
                    </Link>
                    <div className="col s12">
                        <h4>
                            <span style={{ fontFamily: "Verdana, Geneva, sans-serif" }}>Lobby</span>
                        </h4>
                        <br />
                    </div>

                    <div className="col s12 center-align">
                        <div className="card col s1 hoverable">
                            <div className="card-image" onClick={e => selectCharacter(Type.PANDA)}>
                                <img src={process.env.PUBLIC_URL + "/assets/pandaRight.png"} alt="Panda" />
                            </div>
                            Panda
                        </div>
                        <div className="card col s1 hoverable">
                            <div className="card-image" onClick={e => selectCharacter(Type.SEAL)}>
                                <img src={process.env.PUBLIC_URL + "/assets/sealRight.png"} alt="Seal" />
                            </div>
                            Seal
                        </div>
                        <div className="card col s1 hoverable">
                            <div className="card-image" onClick={e => selectCharacter(Type.DINO)}>
                                <img src={process.env.PUBLIC_URL + "/assets/dinoRight.png"} alt="Dino" />
                            </div>
                            Dino
                        </div>
                        <div className="card col s1 hoverable">
                            <div className="card-image" onClick={e => selectCharacter(Type.EAGLE)}>
                                <img src={process.env.PUBLIC_URL + "/assets/eagleRight.png"} alt="Eagle" />
                            </div>
                            Eagle
                        </div>
                    </div>

                    <div className="col s12 center-align">
                        <div className="card col s1 hoverable">
                            <div className="card-image" onClick={e => selectCharacter(Type.PANDA)}>
                                <img src={process.env.PUBLIC_URL + "/assets/pandaRight.png"} alt="Panda" />
                            </div>
                            Panda
                        </div>
                        <div className="card col s1 hoverable">
                            <div className="card-image" onClick={e => selectCharacter(Type.SEAL)}>
                                <img src={process.env.PUBLIC_URL + "/assets/sealRight.png"} alt="Seal" />
                            </div>
                            Seal
                        </div>
                        <div className="card col s1 hoverable">
                            <div className="card-image" onClick={e => selectCharacter(Type.DINO)}>
                                <img src={process.env.PUBLIC_URL + "/assets/dinoRight.png"} alt="Dino" />
                            </div>
                            Dino
                        </div>
                        <div className="card col s1 hoverable">
                            <div className="card-image" onClick={e => selectCharacter(Type.EAGLE)}>
                                <img src={process.env.PUBLIC_URL + "/assets/eagleRight.png"} alt="Eagle" />
                            </div>
                            Eagle
                        </div>
                    </div>

                    <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                        <button
                            onClick={onStart}
                            style={{
                                width: "250px",
                                borderRadius: "3px",
                                letterSpacing: "1.5px",
                                marginTop: "1rem"
                            }}
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
    setNetworkHandler: PropTypes.func.isRequired,
    player: PropTypes.object.isRequired,
    network: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    player: state.player,
    network: state.network
});

export default connect(
    mapStateToProps,
    { setNetworkHandler }
)(Lobby);