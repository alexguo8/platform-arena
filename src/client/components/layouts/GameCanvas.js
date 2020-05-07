import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { downloadAssets } from "../../game-client/assets";
import { initState, resetLobbyStart } from "../../game-client/state";
import { resetRoom } from "../../actions/playerActions";
import { Client } from "../../game-client/client";

const GameCanvas = (props) => {
    const canvasRef = useRef(null);
    const client = useRef();

    useEffect(() => {
        if (props.player.room === "") {
            props.history.push("/");
            return;
        }
        downloadAssets()
            .then(() => {
                initState();
                if (canvasRef.current) {
                    client.current = new Client(canvasRef.current, props.player.room, props.network.handler);
                    client.current.start();
                }
            }).catch(console.error);
        props.resetRoom();
        resetLobbyStart();
        return () => {
            if (client.current instanceof Client) {
                client.current.stop();
            }
        }
    }, []);

    return (
        <canvas ref={canvasRef}></canvas>
    );
};

GameCanvas.propTypes = {
    resetRoom: PropTypes.func.isRequired,
    player: PropTypes.object.isRequired,
    network: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    player: state.player,
    network: state.network,
});

export default connect(
    mapStateToProps,
    { resetRoom }
)(GameCanvas);